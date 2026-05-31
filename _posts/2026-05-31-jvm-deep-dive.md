---
layout: post
title: "JVM Deep Dive — From Zero to Pro"
date: 2026-05-31
categories: [java, jvm, performance]
tags: [java, jvm, garbage-collection, jit, memory, bytecode, java21, java17, java11, java8]
excerpt: "A complete guide to understanding the Java Virtual Machine — what it is, how it works internally, how it has evolved across versions, and how to use that knowledge to write faster, more reliable Java applications."
---

If you've been writing Java for a while, you've probably heard "it's the JVM's job" when something mysterious happens — an unexpected pause, a memory error, a sudden slowdown. This article is your guide to understanding exactly what the JVM is, how it works under the hood, and how to use that knowledge practically. We'll start from zero and work all the way up to tuning and troubleshooting like a pro.

---

## Part 1 — What Is the JVM?

The **Java Virtual Machine (JVM)** is a runtime engine that executes Java programs. When you write Java code and compile it, you don't get machine code directly — you get **bytecode** (`.class` files). The JVM takes that bytecode and runs it on whatever operating system and hardware it's installed on.

This is the foundation of Java's famous promise: **Write Once, Run Anywhere (WORA)**.

```
Your Java Code (.java)
       ↓  javac (compiler)
   Bytecode (.class)
       ↓  JVM
  Native Machine Code
       ↓
   Runs on OS/Hardware
```

The key insight: **your code never directly touches the hardware**. The JVM is the translator between your program and the machine.

### JVM vs JRE vs JDK

These three are constantly confused by beginners. Here's the simple breakdown:

| Term | What it contains | Who needs it |
|------|-----------------|--------------|
| **JVM** | The runtime engine that runs bytecode | Part of JRE |
| **JRE** | JVM + standard libraries (like `java.util`) | End users running Java apps |
| **JDK** | JRE + compiler (`javac`) + dev tools | Developers writing Java code |

Think of it like a car: JVM is the engine, JRE is the full car, JDK is the car plus the workshop tools.

---

## Part 2 — JVM Architecture: Inside the Machine

The JVM has several core subsystems. Understanding these is what separates average Java developers from strong ones.

```
┌─────────────────────────────────────────────────┐
│                    JVM                          │
│                                                 │
│  ┌──────────────┐    ┌────────────────────┐    │
│  │ Class Loader │───▶│   Runtime Data     │    │
│  │  Subsystem   │    │   Areas (Memory)   │    │
│  └──────────────┘    └────────────────────┘    │
│                               │                 │
│                    ┌──────────▼──────────┐      │
│                    │  Execution Engine   │      │
│                    │  (Interpreter + JIT)│      │
│                    └─────────────────────┘      │
│                               │                 │
│                    ┌──────────▼──────────┐      │
│                    │   Native Interface  │      │
│                    │       (JNI)         │      │
│                    └─────────────────────┘      │
└─────────────────────────────────────────────────┘
```

### 2.1 Class Loader Subsystem

Before your code can run, the JVM needs to load it. The class loader is responsible for finding `.class` files, loading them into memory, and preparing them for execution.

It works in three steps:

**Loading** — reads the `.class` file (from disk, network, or JAR) and creates a `Class` object in memory.

**Linking** — three sub-steps:
- *Verification*: confirms the bytecode is valid and safe
- *Preparation*: allocates memory for static variables and sets default values
- *Resolution*: replaces symbolic references (like class names) with direct memory references

**Initialisation** — executes static initialisers and assigns values to static fields.

Java uses a **parent delegation model** for class loading. When a class needs to be loaded, the request goes up the chain before the current loader tries:

```
Bootstrap ClassLoader     ← loads core Java classes (java.lang, java.util)
       ↑
Extension ClassLoader     ← loads from ext/ directory
       ↑
Application ClassLoader   ← loads your application's classes
```

This is why you can't accidentally replace `java.lang.String` — the Bootstrap loader always loads it first.

### 2.2 Runtime Data Areas (Memory)

This is one of the most important things to understand. The JVM divides memory into distinct regions, each with a specific purpose.

```
┌──────────────────────────────────────────────────┐
│                  JVM Memory                      │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │              Heap (shared)                 │  │
│  │  ┌──────────────┐  ┌─────────────────────┐│  │
│  │  │  Young Gen   │  │     Old Gen          ││  │
│  │  │ ┌──┐ ┌──┐    │  │  (long-lived objects)││  │
│  │  │ │E0│ │E1│ S0/S1│  └─────────────────────┘│  │
│  │  └──────────────┘                           │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌─────────────┐  ┌──────────┐  ┌────────────┐  │
│  │  Metaspace  │  │  Stack   │  │  PC Reg.   │  │
│  │(class meta) │  │(per thread)│  │(per thread)│  │
│  └─────────────┘  └──────────┘  └────────────┘  │
└──────────────────────────────────────────────────┘
```

**Heap** — where all objects live. Shared across all threads. This is where garbage collection happens. Divided into:
- *Young Generation* (Eden + two Survivor spaces): newly created objects start here
- *Old Generation* (Tenured): objects that have survived multiple GC cycles

**Stack** — one per thread. Stores method call frames, local variables, and references to heap objects. When you call a method, a new frame is pushed; when it returns, the frame is popped. Stack overflow happens when you recurse too deeply.

**Metaspace** (Java 8+, replaced PermGen) — stores class metadata, method information, and static variables. Unlike the old PermGen, Metaspace grows dynamically and is allocated in native memory.

**PC Register** — per thread. Keeps track of which instruction the thread is currently executing.

**Native Method Stack** — supports native (non-Java) method calls via JNI.

> **Pro tip:** `OutOfMemoryError: Java heap space` means your heap is full. `OutOfMemoryError: Metaspace` means class metadata is consuming too much native memory — often a classloader leak.

### 2.3 Execution Engine

Once the class is loaded and memory is allocated, the execution engine runs the bytecode.

**Interpreter** — executes bytecode instructions one at a time. Simple and starts fast, but slow for frequently executed code.

**JIT Compiler (Just-In-Time)** — the secret weapon. The JVM monitors which methods are called frequently ("hot" methods). Once a method crosses a threshold, the JIT compiles it to native machine code. That native code runs directly on the CPU — no interpretation overhead.

```
Method called 1st time   → Interpreter runs it
Method called 10,000x    → JIT kicks in, compiles to native code
Method called 10,001x    → Native code runs directly (much faster)
```

This is why Java applications often feel slow at startup but become very fast after a warm-up period — the JIT is learning and optimising.

**HotSpot JVM** (the standard Oracle/OpenJDK JVM) has two JIT compilers:
- **C1 (Client compiler)** — fast compilation, lighter optimisations. Good for short-lived applications.
- **C2 (Server compiler)** — slower compilation, aggressive optimisations. Best for long-running server apps.

Modern JVMs use **tiered compilation**: start with C1 for quick startup, then recompile hot methods with C2 for maximum performance.

---

## Part 3 — Garbage Collection

Garbage collection (GC) is how the JVM automatically frees memory occupied by objects your program no longer needs. You don't `free()` memory in Java — the GC does it for you.

### The Generational Hypothesis

GC design is based on one key observation: **most objects die young**. Think about all the temporary strings, request objects, and local variables your code creates — most are discarded within milliseconds. The JVM exploits this with generational collection.

### How a Minor GC Works (Young Generation)

1. New objects are created in the **Eden** space
2. When Eden fills up, a **Minor GC** triggers
3. Live objects from Eden are copied to a **Survivor** space (S0 or S1)
4. Objects that have survived enough GC cycles (default: 15) are promoted to **Old Gen**
5. Eden is wiped clean — very fast because most objects are dead

### How a Major/Full GC Works (Old Generation)

When Old Gen fills up, a **Major GC** triggers. This is slower because there are more live objects to scan. A **Full GC** collects both Young and Old Gen — this is the pause you want to avoid in production.

### Garbage Collectors Available

| GC | Best For | Key Characteristic |
|----|----------|-------------------|
| **Serial GC** | Single-threaded apps, small heaps | Simple, stop-the-world |
| **Parallel GC** | Throughput-focused batch apps | Multi-threaded, stop-the-world pauses |
| **G1 GC** (default Java 9+) | Most server apps | Balanced latency and throughput |
| **ZGC** (Java 15+ production) | Low-latency apps | Sub-millisecond pauses, scalable |
| **Shenandoah** (OpenJDK) | Low-latency apps | Concurrent compaction |

### G1 GC — The Modern Default

G1 (Garbage First) divides the heap into equal-sized **regions** rather than fixed Young/Old areas. It can collect any region, prioritising those with the most garbage (hence "Garbage First").

```
Heap divided into regions (~2048 regions by default):
┌──┬──┬──┬──┬──┬──┬──┬──┐
│E │S │O │E │H │O │E │S │
├──┼──┼──┼──┼──┼──┼──┼──┤
│O │E │E │O │S │E │O │H │
└──┴──┴──┴──┴──┴──┴──┴──┘
E=Eden  S=Survivor  O=Old  H=Humongous (large objects)
```

G1 aims to meet a **pause time target** you specify (`-XX:MaxGCPauseMillis=200`). It does concurrent marking while your application runs, then pauses briefly to collect.

### ZGC — The Future of Low-Latency

ZGC was introduced in Java 11 as experimental and became production-ready in Java 15. It performs most of its work **concurrently** (while your app runs), resulting in pauses typically under 1 millisecond — regardless of heap size.

```bash
# Enable ZGC
java -XX:+UseZGC -Xmx16g MyApplication
```

---

## Part 4 — JVM Versions and Key Features

Java has evolved dramatically. Here's what each major version brought to the JVM and the language.

### Java 8 (LTS) — The Game Changer (2014)

Java 8 was the most impactful release in Java's history. For developers, it introduced:
- **Lambda expressions** — anonymous functions: `(x) -> x * 2`
- **Stream API** — functional pipeline processing of collections
- **Optional** — a better way to handle null values
- **Default methods** in interfaces
- **New Date/Time API** (`java.time`)

For the JVM:
- **PermGen removed, Metaspace introduced** — no more `OutOfMemoryError: PermGen space`

```java
// Java 8: streams + lambdas
List<String> filtered = names.stream()
    .filter(n -> n.startsWith("S"))
    .sorted()
    .collect(Collectors.toList());
```

### Java 9 — The Module System (2017)

- **Java Platform Module System (JPMS)** — broke the JDK into modules, enabling smaller deployments
- **JShell** — interactive REPL for Java
- **G1 became the default GC** (replacing Parallel GC)
- **HTTP/2 Client** (incubating)
- `List.of()`, `Map.of()` factory methods

```java
// Java 9: immutable collections
List<String> names = List.of("Sathiyaraj", "Java", "JVM");
```

### Java 11 (LTS) — The New Baseline (2018)

Java 11 is still widely used in production today. Key additions:
- **`var` in lambda parameters**
- **`String` new methods**: `isBlank()`, `strip()`, `lines()`, `repeat()`
- **HTTP Client API** (standard, replacing old HttpURLConnection)
- **ZGC introduced** (experimental)
- Free Oracle JDK for production use ended — OpenJDK became the standard

```java
// Java 11: new String methods
"  hello  ".strip();          // "hello" (unicode-aware)
"line1\nline2".lines().count(); // 2
"ha".repeat(3);               // "hahaha"

// Java 11: HTTP Client
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/data"))
    .build();
HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());
```

### Java 14/15 — Preview Features

- **Records** (preview → standard in 16) — immutable data classes without boilerplate
- **Pattern Matching for `instanceof`** (preview)
- **Text Blocks** (standard in 15) — multiline strings without escape characters
- **Helpful NullPointerExceptions** — the JVM now tells you exactly which variable was null

```java
// Text blocks (Java 15+)
String json = """
    {
        "name": "Sathiyaraj",
        "role": "Lead Java Developer"
    }
    """;

// Helpful NPE — before Java 14:
// NullPointerException at line 42
// After Java 14:
// Cannot invoke "String.length()" because "user.name" is null
```

### Java 16 — Records Go Standard (2021)

- **Records** finalized — concise immutable data carriers
- **Pattern Matching `instanceof`** finalized
- **Stream `toList()`** — shorter than `collect(Collectors.toList())`

```java
// Records: replaces a full POJO class
record Point(int x, int y) {}

Point p = new Point(3, 7);
System.out.println(p.x()); // 3
System.out.println(p);     // Point[x=3, y=7]

// Pattern matching instanceof
if (obj instanceof String s) {
    System.out.println(s.toUpperCase()); // no cast needed
}
```

### Java 17 (LTS) — The Modern Baseline (2021)

Java 17 is the current recommended LTS for most teams. It brought:
- **Sealed Classes** — restrict which classes can extend/implement a type
- **Switch Expressions** (standard) — switch as an expression that returns a value
- **Strong encapsulation** of JDK internals

```java
// Sealed classes
sealed interface Shape permits Circle, Rectangle, Triangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}

// Switch expression
double area = switch (shape) {
    case Circle c    -> Math.PI * c.radius() * c.radius();
    case Rectangle r -> r.w() * r.h();
    case Triangle t  -> 0.5 * t.base() * t.height();
};
```

### Java 21 (LTS) — The Future is Now (2023)

Java 21 is the latest LTS and the most exciting release in years.

- **Virtual Threads** (Project Loom) — lightweight threads managed by the JVM, not the OS
- **Pattern Matching for Switch** (standard)
- **Record Patterns**
- **Sequenced Collections**

#### Virtual Threads — The Biggest Change in Java in a Decade

Traditional Java threads map 1:1 to OS threads. OS threads are expensive — each consumes ~1MB of stack memory, and context switching is costly. This is why frameworks like Spring WebFlux went reactive (non-blocking), accepting complex programming models in exchange for better throughput.

Virtual threads flip this. They're managed by the JVM itself, scheduled onto a small pool of OS "carrier" threads. You can run **millions of virtual threads** simultaneously.

```java
// Java 21: Virtual threads — simple blocking code, massive concurrency
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 1_000_000).forEach(i ->
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1)); // blocks virtual thread, not OS thread
            return i;
        })
    );
}
// 1 million concurrent tasks — no reactive programming needed
```

This means you can write simple, readable blocking code and still get the throughput of reactive systems. For Spring Boot users: add `spring.threads.virtual.enabled=true` and you're done.

---

## Part 5 — JVM Flags You Should Know

The JVM exposes hundreds of tuning flags. Here are the most important ones:

### Heap Sizing
```bash
-Xms512m          # Initial heap size
-Xmx2g            # Maximum heap size
-Xss512k          # Stack size per thread
```
> **Rule of thumb:** set `-Xms` equal to `-Xmx` in production to avoid heap resizing pauses.

### GC Selection
```bash
-XX:+UseG1GC           # Use G1 (default Java 9+)
-XX:+UseZGC            # Use ZGC (recommended for low latency, Java 15+)
-XX:+UseShenandoahGC   # Use Shenandoah
-XX:MaxGCPauseMillis=200  # G1: target max pause time
```

### GC Logging (Essential for Debugging)
```bash
-Xlog:gc*:file=gc.log:time,uptime:filecount=5,filesize=20m
```

### Diagnostic Flags
```bash
-XX:+HeapDumpOnOutOfMemoryError      # Dump heap on OOM
-XX:HeapDumpPath=/tmp/heapdump.hprof # Where to write the dump
-XX:+PrintCompilation                # See what JIT is compiling
```

### JIT Tuning
```bash
-XX:+TieredCompilation              # Use both C1 and C2 (default)
-XX:CompileThreshold=10000          # Method calls before JIT compilation
-Xcomp                              # Force JIT compile everything (not recommended)
```

---

## Part 6 — Reading a JVM Thread Dump

When your application hangs or slows down, a thread dump is your first tool. Generate one with:

```bash
kill -3 <pid>         # On Linux/Mac — prints to stdout
jstack <pid>          # Outputs thread dump to terminal
jcmd <pid> Thread.print  # Modern approach
```

A thread dump entry looks like this:

```
"http-nio-8080-exec-1" #25 daemon prio=5 os_prio=0 tid=0x... nid=0x...
   java.lang.Thread.State: WAITING (on object monitor)
    at java.lang.Object.wait(Native Method)
    at java.util.concurrent.LinkedBlockingQueue.take(LinkedBlockingQueue.java:442)
    at org.apache.tomcat.util.threads.TaskQueue.take(TaskQueue.java:146)
```

Key thread states:
- `RUNNABLE` — thread is running or ready to run
- `WAITING` — thread is waiting indefinitely (for a notify)
- `TIMED_WAITING` — waiting with a timeout (e.g., `Thread.sleep()`)
- `BLOCKED` — waiting to acquire a monitor lock (potential deadlock)

If you see many threads in `BLOCKED` state waiting on the same lock — you've found a contention issue.

---

## Part 7 — Common JVM Problems and How to Fix Them

### Problem 1: OutOfMemoryError: Java heap space

**Cause:** Too many live objects, memory leak, or heap is undersized.

**Diagnosis:**
```bash
# Add these JVM flags, reproduce the issue, then analyse the dump
-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/

# Analyse with Eclipse MAT or VisualVM
```

**Fix:** Find what's holding references. Common culprits: static collections that grow unbounded, caches without eviction, event listeners never removed.

### Problem 2: High GC Overhead

**Symptom:** Application is slow, CPU high, GC logs show frequent long pauses.

**Diagnosis:**
```bash
# Enable GC logging
-Xlog:gc*:file=gc.log:time,uptime

# Look for: long pause times, frequent Full GCs, promotion failures
```

**Fix:** Increase heap (`-Xmx`), switch to G1 or ZGC, reduce object allocation rate, tune GC settings.

### Problem 3: Metaspace OOM

**Symptom:** `OutOfMemoryError: Metaspace`

**Cause:** Usually a classloader leak — classes being loaded but never unloaded. Common in applications that use dynamic class generation (reflection, proxies, hot reload).

**Fix:**
```bash
-XX:MetaspaceSize=256m         # Initial size
-XX:MaxMetaspaceSize=512m      # Cap it to catch leaks early
```

### Problem 4: Thread Deadlock

**Symptom:** Application hangs, requests time out.

**Diagnosis:** Take a thread dump. Look for threads in `BLOCKED` state. JStack will often detect deadlocks and report them explicitly:

```
Found one Java-level deadlock:
"Thread-1" is waiting to lock <0x...> held by "Thread-2"
"Thread-2" is waiting to lock <0x...> held by "Thread-1"
```

**Fix:** Always acquire locks in the same order across threads. Use `java.util.concurrent` classes instead of `synchronized` where possible.

---

## Part 8 — Monitoring the JVM in Production

Don't wait for problems — instrument your JVM from the start.

### JVM Metrics to Always Monitor

| Metric | Why it matters |
|--------|---------------|
| Heap used / max | Is memory growing unboundedly? |
| GC pause time (p99) | Are you causing latency spikes? |
| GC frequency | How often is GC running? |
| Thread count | Growing threads = possible leak |
| Class count | Growing classes = classloader leak |
| CPU usage | JIT or GC consuming too much? |

### Tools

**JConsole / VisualVM** — attach to a running JVM locally. Good for development.

**JFR (Java Flight Recorder)** — built into the JVM since Java 11 (free). Extremely low-overhead profiling:

```bash
# Record 60 seconds of JFR data
jcmd <pid> JFR.start duration=60s filename=recording.jfr
# Open in JDK Mission Control
```

**Micrometer + Prometheus + Grafana** — the production standard for Spring Boot apps:

```xml
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
```

Then expose JVM metrics at `/actuator/prometheus` and scrape with Prometheus.

---

## Putting It All Together

Here's a production-ready JVM configuration for a typical Spring Boot microservice:

```bash
java \
  -Xms512m -Xmx512m \                           # Fixed heap size
  -XX:+UseZGC \                                  # Low-latency GC
  -XX:+HeapDumpOnOutOfMemoryError \              # Capture OOM dumps
  -XX:HeapDumpPath=/var/log/app/heapdump.hprof \
  -Xlog:gc*:file=/var/log/app/gc.log:time,uptime:filecount=5,filesize=10m \
  -Djava.security.egd=file:/dev/./urandom \      # Faster SecureRandom
  -jar app.jar
```

---

## Summary: Your JVM Learning Path

| Level | What you should know |
|-------|---------------------|
| **Beginner** | JVM vs JRE vs JDK, bytecode, heap vs stack, what GC does |
| **Intermediate** | Class loading, GC algorithms (G1 vs ZGC), thread states, reading GC logs |
| **Advanced** | JIT compilation, heap dump analysis, tuning flags, thread dump diagnosis |
| **Pro** | JFR profiling, custom class loaders, GC tuning for specific workloads, virtual threads |

The JVM is one of the most sophisticated pieces of software in existence — it's been optimised by thousands of engineers over 30 years. The more you understand it, the better your Java code will be. Not just in performance, but in how you design systems, handle errors, and debug production issues.

---

*Written by Sathiyaraj Venkatachalapathy — Lead Java Developer at Renault Nissan Technology Business Center India. 12+ years of building production Java systems.*

*Have a question or found something worth adding? Reach out on [LinkedIn](https://www.linkedin.com/in/sathiyaraj-venkatachalapathy-706569188/).*
