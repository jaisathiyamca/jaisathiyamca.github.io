---
layout: post
title: "JVM Deep Dive — From Zero to Pro"
date: 2026-05-31
categories: [java, jvm, performance]
tags: [java, jvm, garbage-collection, jit, memory, bytecode, java21, java17, java11, java8]
excerpt: "A story-driven, production-tested guide to understanding the JVM — from how bytecode runs to tuning GC pauses in live systems. Every concept backed by real incidents."
---

<style>
.article-body { font-family: 'Inter', system-ui, sans-serif; line-height: 1.8; color: #1e293b; }
.story-box { background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 0 10px 10px 0; padding: 18px 22px; margin: 24px 0; }
.story-box .story-label { font-size: 0.7rem; font-weight: 800; color: #d97706; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
.story-box p { margin: 0; font-size: 0.9rem; color: #78350f; line-height: 1.7; }
.prod-box { background: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 0 10px 10px 0; padding: 18px 22px; margin: 24px 0; }
.prod-box .prod-label { font-size: 0.7rem; font-weight: 800; color: #16a34a; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
.prod-box p { margin: 0; font-size: 0.9rem; color: #14532d; line-height: 1.7; }
.warn-box { background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 0 10px 10px 0; padding: 18px 22px; margin: 24px 0; }
.warn-box .warn-label { font-size: 0.7rem; font-weight: 800; color: #dc2626; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
.warn-box p { margin: 0; font-size: 0.9rem; color: #7f1d1d; line-height: 1.7; }
.info-box { background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 0 10px 10px 0; padding: 18px 22px; margin: 24px 0; }
.info-box p { margin: 0; font-size: 0.9rem; color: #1e3a5f; line-height: 1.7; }
.diagram-wrap { background: #0f172a; border-radius: 12px; padding: 24px; margin: 24px 0; overflow-x: auto; }
.diagram-wrap pre { color: #e2e8f0; font-family: 'Courier New', monospace; font-size: 0.8rem; line-height: 1.7; margin: 0; white-space: pre; }
.version-card { border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin: 24px 0; }
.version-header { background: #1e293b; padding: 16px 22px; display: flex; align-items: center; gap: 12px; }
.version-badge { background: #6366f1; color: white; font-size: 0.75rem; font-weight: 800; padding: 4px 12px; border-radius: 20px; }
.version-lts { background: #10b981; }
.version-title { color: white; font-size: 1rem; font-weight: 700; margin: 0; }
.version-year { color: #94a3b8; font-size: 0.8rem; }
.version-body { padding: 20px 22px; background: white; }
.version-body p { font-size: 0.88rem; color: #334155; line-height: 1.7; margin-bottom: 12px; }
.feature-list { list-style: none; padding: 0; margin: 0 0 12px 0; }
.feature-list li { font-size: 0.85rem; color: #334155; padding: 5px 0; padding-left: 20px; position: relative; border-bottom: 1px solid #f1f5f9; }
.feature-list li:last-child { border-bottom: none; }
.feature-list li::before { content: '→'; position: absolute; left: 0; color: #6366f1; font-weight: 700; }
.code-snippet { background: #0f172a; border-radius: 8px; padding: 16px 20px; margin: 12px 0; overflow-x: auto; }
.code-snippet pre { color: #e2e8f0; font-family: 'Courier New', monospace; font-size: 0.78rem; line-height: 1.7; margin: 0; }
.code-snippet .c { color: #64748b; }
.code-snippet .k { color: #a5b4fc; }
.code-snippet .s { color: #86efac; }
.code-snippet .t { color: #67e8f9; }
.code-snippet .n { color: #fbbf24; }
.part-divider { text-align: center; margin: 40px 0 32px; }
.part-divider .part-num { display: inline-block; background: #6366f1; color: white; font-size: 0.7rem; font-weight: 800; padding: 4px 14px; border-radius: 20px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
.part-divider h2 { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin: 0; }
.part-divider p { font-size: 0.85rem; color: #64748b; margin: 6px 0 0; }
.toc { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px; margin: 24px 0; }
.toc h3 { font-size: 0.85rem; font-weight: 700; color: #0f172a; margin: 0 0 12px; }
.toc ol { margin: 0; padding-left: 20px; }
.toc li { font-size: 0.82rem; color: #6366f1; padding: 3px 0; font-weight: 500; }
.metric-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 20px 0; }
.metric-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; text-align: center; }
.metric-n { font-size: 1.6rem; font-weight: 800; color: #6366f1; }
.metric-l { font-size: 0.7rem; color: #64748b; font-weight: 500; margin-top: 2px; }
.gc-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 20px 0; }
.gc-card { border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; }
.gc-card .gc-head { padding: 12px 16px; font-size: 0.82rem; font-weight: 700; color: white; }
.gc-card .gc-body { padding: 12px 16px; font-size: 0.78rem; color: #334155; line-height: 1.6; background: white; }
.g1-head { background: #6366f1; }
.zgc-head { background: #10b981; }
.summary-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; margin: 20px 0; }
.summary-table th { background: #1e293b; color: white; padding: 10px 14px; text-align: left; font-weight: 600; }
.summary-table td { padding: 9px 14px; border-bottom: 1px solid #f1f5f9; color: #334155; }
.summary-table tr:last-child td { border-bottom: none; }
.summary-table tr:nth-child(even) td { background: #f8fafc; }
</style>

<div class="article-body">

<div class="story-box">
  <div class="story-label">🕐 3:14 AM — Production Alert</div>
  <p>It's 3:14 AM. Your phone buzzes. The monitoring dashboard is red. Your Spring Boot service — the one handling 50,000 requests per minute for an automotive platform — is throwing <code>OutOfMemoryError: Java heap space</code> and crashing every 20 minutes. Users are getting 503s. Your team lead is on the call. You've got one hour to fix it without a full rollback.</p>
  <p style="margin-top:8px;">This isn't hypothetical. This happened to our team at Renault Nissan. And the reason we could fix it in 47 minutes — not hours — was because we understood the JVM deeply enough to read a heap dump, spot the leak, and push a targeted fix. This article is everything we wish we had read before that night.</p>
</div>

<div class="toc">
  <h3>📖 What You'll Learn</h3>
  <ol>
    <li>What the JVM actually is — and why it matters in production</li>
    <li>JVM Architecture: Class Loader, Memory, and Execution Engine</li>
    <li>Garbage Collection — how it works, when it fails, and how to fix it</li>
    <li>JIT Compilation — the secret behind Java's speed</li>
    <li>Java 8 → 21: Every major version with real production impact</li>
    <li>JVM tuning flags that matter in real deployments</li>
    <li>Reading thread dumps and diagnosing deadlocks</li>
    <li>Production monitoring — what to watch and why</li>
  </ol>
</div>

---

<div class="part-divider">
  <div class="part-num">Part 1</div>
  <h2>What Is the JVM — And Why Should You Care?</h2>
  <p>The foundation everything else builds on</p>
</div>

Most developers learn that "JVM runs Java code" and move on. But that single sentence hides a system sophisticated enough to manage millions of live objects, compile code on the fly, and reclaim memory — all while your application is serving requests.

Here's the honest explanation.

When you write Java and run `javac`, you don't get machine code for your CPU. You get **bytecode** — a compact, platform-neutral instruction set stored in `.class` files. The JVM reads that bytecode and translates it to native instructions your CPU actually understands.

<div class="diagram-wrap"><pre>
  Your Code (.java)
        │
        ▼  javac
  Bytecode (.class)  ← platform-neutral, inspectable, portable
        │
        ▼  JVM
  Native Machine Code  ← specific to your OS + CPU
        │
        ▼
  Runs on hardware
</pre></div>

This gives you **Write Once, Run Anywhere (WORA)** — the same JAR runs on Linux, Windows, macOS, ARM, x86, without recompilation.

### JVM vs JRE vs JDK — The Confusion Ends Here

<table class="summary-table">
  <thead><tr><th>Term</th><th>What it includes</th><th>Analogy</th><th>Who needs it</th></tr></thead>
  <tbody>
    <tr><td><strong>JVM</strong></td><td>The bytecode execution engine</td><td>The engine in a car</td><td>Ships inside JRE</td></tr>
    <tr><td><strong>JRE</strong></td><td>JVM + standard library (java.util, java.io, etc.)</td><td>The complete car</td><td>End users running Java apps</td></tr>
    <tr><td><strong>JDK</strong></td><td>JRE + javac + javap + jstack + jmap + jfr + more</td><td>Car + full mechanic workshop</td><td>Developers building Java apps</td></tr>
  </tbody>
</table>

<div class="prod-box">
  <div class="prod-label">🏭 Production Reality</div>
  <p>In Docker-based deployments (like our Kubernetes pods at Renault Nissan), we ship the JRE — not the full JDK — to keep image sizes small. But when a production incident happens and you need <code>jstack</code>, <code>jmap</code>, or <code>jfr</code>, those tools are in the JDK. This is why we run a debug sidecar with JDK tools attached to the same pod namespace — so we can diagnose without redeploying. Always have a plan for production diagnostics.</p>
</div>

---

<div class="part-divider">
  <div class="part-num">Part 2</div>
  <h2>JVM Architecture: What's Actually Happening When Your Code Runs</h2>
  <p>Three subsystems. One very smart runtime.</p>
</div>

<div class="diagram-wrap"><pre>
┌─────────────────────────────────────────────────────────────┐
│                        JVM                                  │
│                                                             │
│  ┌─────────────────┐                                        │
│  │  Class Loader   │  Finds, loads, verifies .class files   │
│  │  Subsystem      │  Bootstrap → Extension → App loader    │
│  └────────┬────────┘                                        │
│           │ loads into                                      │
│  ┌────────▼─────────────────────────────────────────────┐  │
│  │              Runtime Data Areas (Memory)              │  │
│  │                                                       │  │
│  │  ┌──────────────────────────────────┐  ┌──────────┐  │  │
│  │  │           HEAP (shared)          │  │  STACK   │  │  │
│  │  │  ┌────────────┐  ┌────────────┐  │  │ per      │  │  │
│  │  │  │ Young Gen  │  │  Old Gen   │  │  │ thread   │  │  │
│  │  │  │ Eden S0 S1 │  │ (Tenured)  │  │  └──────────┘  │  │
│  │  │  └────────────┘  └────────────┘  │                 │  │
│  │  └──────────────────────────────────┘  ┌──────────┐  │  │
│  │  ┌──────────────────┐                  │Metaspace │  │  │
│  │  │    PC Register   │ (per thread)     │(class    │  │  │
│  │  └──────────────────┘                  │metadata) │  │  │
│  └──────────────────────────────────────────────────────┘  │
│           │ feeds                                           │
│  ┌────────▼─────────────────────────────────────────────┐  │
│  │               Execution Engine                        │  │
│  │                                                       │  │
│  │  Interpreter → JIT C1 (fast) → JIT C2 (optimised)    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
</pre></div>

### 2.1 The Class Loader — Your App's First Gatekeeper

<div class="story-box">
  <div class="story-label">🔍 Real Scenario</div>
  <p>A junior developer on our team once added two different versions of a library to the classpath accidentally — both had a class with the same fully-qualified name. The app started but threw mysterious <code>NoSuchMethodError</code> at runtime. Understanding how the class loader works is the only way to debug this class.</p>
</div>

When your app starts, the JVM doesn't load everything at once. Classes are loaded **lazily** — only when first referenced. The process has three phases:

**1. Loading** — The class loader reads the `.class` file bytes and creates a `java.lang.Class` object in memory.

**2. Linking** — Three sub-steps:
- *Verification*: Is this bytecode structurally valid? Could it corrupt the JVM? (This is why Java is memory-safe — bytecode is verified before it runs.)
- *Preparation*: Static variables get default values (`int` = 0, `Object` = null).
- *Resolution*: Symbolic references like class names get resolved to actual memory addresses.

**3. Initialisation** — Static blocks run. Static fields get their real values.

The JVM uses a **parent delegation model** — when your `ApplicationClassLoader` is asked to load `java.lang.String`, it first asks `BootstrapClassLoader`. Bootstrap loads it from the JDK's `rt.jar`. Your code never gets a chance to override it. This is a security model, not just a convention.

<div class="diagram-wrap"><pre>
Request to load "com.yourapp.Service"
         │
         ▼
  AppClassLoader.loadClass("com.yourapp.Service")
         │ first asks parent
         ▼
  ExtClassLoader.loadClass("com.yourapp.Service")
         │ first asks parent
         ▼
  BootstrapClassLoader.loadClass("com.yourapp.Service")
         │ "I don't have this"
         ▼  (back down)
  ExtClassLoader → "I don't have this either"
         ▼  (back down)
  AppClassLoader → "Found it in app classpath!" ✓
</pre></div>

<div class="prod-box">
  <div class="prod-label">🏭 Production Use Case — Classloader Leak</div>
  <p>We once saw <code>OutOfMemoryError: Metaspace</code> in a long-running Java app. Thread dump showed nothing unusual. Heap dump showed thousands of <code>ClassLoader</code> instances still alive. The cause: a custom <code>URLClassLoader</code> being created on every API request (to load a plugin JAR dynamically) but never closed. Each loader held class metadata in Metaspace. Fix: close the classloader after use, or cache it. Lesson: classloaders are resources — treat them like <code>InputStream</code>s.</p>
</div>

### 2.2 Runtime Data Areas — The JVM's Memory Map

This is the most important thing to understand for debugging production issues.

**The Heap** is where every object your code creates lives. It's shared across all threads — which means it needs garbage collection and thread-safe access patterns.

<div class="diagram-wrap"><pre>
                        HEAP
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌─────────────────────────────┐  ┌──────────────────┐  │
│  │       Young Generation      │  │  Old Generation  │  │
│  │                             │  │   (Tenured)      │  │
│  │  ┌──────────┐  ┌──┐  ┌──┐  │  │                  │  │
│  │  │  Eden    │  │S0│  │S1│  │  │  Long-lived       │  │
│  │  │  (new    │  │  │  │  │  │  │  objects          │  │
│  │  │  objects)│  │  │  │  │  │  │  (survived 15+    │  │
│  │  └──────────┘  └──┘  └──┘  │  │   GC cycles)      │  │
│  │                             │  │                  │  │
│  └─────────────────────────────┘  └──────────────────┘  │
│         Minor GC happens here        Major GC here       │
└─────────────────────────────────────────────────────────┘

METASPACE (native memory — NOT in heap)
┌──────────────────────────────────────────────┐
│  Class metadata · Method info · Static fields │
│  Grows dynamically · No fixed cap (by default)│
└──────────────────────────────────────────────┘

STACK (one per thread)
┌──────────────────────────────────┐
│  Frame: processRequest()         │  ← current method
│  Frame: handlePayment()          │
│  Frame: main()                   │  ← bottom of stack
└──────────────────────────────────┘
</pre></div>

**The Stack** is where method calls live. Each time you call a method, a new **frame** is pushed containing local variables and a reference to the object. When the method returns, the frame is popped. This is fast and automatic — no GC needed for stack memory.

<div class="warn-box">
  <div class="warn-label">⚠️ StackOverflowError Explained</div>
  <p>When you write infinite recursion (or very deep call chains), you keep pushing frames onto the thread's stack until it has no space left. That's a <code>StackOverflowError</code>. The default stack size is 512KB–1MB per thread. You can increase it with <code>-Xss2m</code>, but that's rarely the right fix — review your recursion logic instead.</p>
</div>

### 2.3 The Execution Engine — Where Your Code Becomes Speed

<div class="story-box">
  <div class="story-label">🤔 Why Does Java Feel Slow at Startup?</div>
  <p>We deployed a new microservice in our GKE cluster and set health check timeout to 15 seconds. It kept failing. The service was starting, but under load tests it was responding in 800ms — 4x slower than steady state. The reason: JIT hadn't warmed up yet. Once we understood JIT, we implemented a warm-up routine that pre-loaded critical code paths before marking the pod as ready. Health checks passed. Response times were fast from the first real request.</p>
</div>

The execution engine has two modes working together:

**The Interpreter** starts immediately. It reads bytecode instructions one by one and executes them. Simple, but not fast for hot paths.

**The JIT Compiler** is the smart part. The JVM tracks how many times each method is called. When a method crosses a threshold (~10,000 calls by default), it's flagged as "hot" and compiled to native machine code. After that, the native code runs directly — no interpretation overhead.

<div class="diagram-wrap"><pre>
Method lifecycle in the JVM:

First 1–100 calls:
  bytecode → Interpreter → result  (simple, moderate speed)

100–10,000 calls (Tiered C1):
  bytecode → C1 Compiler → native code  (fast compilation, moderate optimisation)

10,000+ calls (Tiered C2):
  bytecode → C2 Compiler → highly optimised native code  (slow compilation, maximum speed)
  C2 can: inline methods, eliminate dead code, unroll loops, use CPU-specific instructions

Result: Java code in steady state is often as fast as C++
</pre></div>

<div class="prod-box">
  <div class="prod-label">🏭 Production Use Case — JIT Warm-up in Kubernetes</div>
  <p>In our Renault Nissan microservices, we noticed that the first batch of requests after a pod restart were 3–5x slower. This was JIT at work — the interpreter was running cold code. Our fix: added a <code>/actuator/warmup</code> endpoint that fires synthetic requests through critical code paths on startup. We call it from the Kubernetes <code>postStart</code> lifecycle hook before the pod joins the load balancer. Result: first real user request gets the same performance as the 10,000th.</p>
</div>

---

<div class="part-divider">
  <div class="part-num">Part 3</div>
  <h2>Garbage Collection — The Art of Knowing When to Let Go</h2>
  <p>The system that keeps your app alive and your memory clean</p>
</div>

<div class="story-box">
  <div class="story-label">📖 The 3:14 AM Story Continues</div>
  <p>Back to that Renault Nissan incident. When the <code>OutOfMemoryError</code> hit, the first question was: is this a GC problem or a leak? We ran <code>jstat -gcutil &lt;pid&gt; 1000</code> and watched Old Gen fill up from 40% to 100% over 20 minutes with GC unable to free it. That told us: something was holding references — objects were surviving GC because live references to them existed. That's not a GC problem. That's a memory leak. Different diagnosis, different fix.</p>
</div>

### The Generational Hypothesis — Why GC Is Designed This Way

Decades of research produced one key insight: **most objects die young**. A web request creates hundreds of objects — HttpServletRequest, response wrappers, intermediate strings, DTO instances — and nearly all of them are dead within 100 milliseconds. Only a few objects live a long time: connection pools, caches, application context, static data.

GC is designed around this fact. Don't spend time scanning old, stable objects when you can just sweep through the nursery and reclaim almost everything quickly.

### How a Minor GC Works — Step by Step

<div class="diagram-wrap"><pre>
STEP 1: Eden fills up
┌─────────────────────────────────────────────────┐
│  Young Generation                               │
│  ┌───────────────────┐  ┌────────┐  ┌────────┐  │
│  │ Eden (FULL 🔴)    │  │  S0   │  │  S1   │  │
│  │ obj1 obj2 obj3    │  │(empty)│  │(empty)│  │
│  │ obj4 obj5 obj6... │  │       │  │       │  │
│  └───────────────────┘  └────────┘  └────────┘  │
└─────────────────────────────────────────────────┘

STEP 2: Minor GC triggers — scan Eden for live objects
obj1: still referenced → COPY to S0
obj2: no references   → DEAD, reclaimed
obj3: still referenced → COPY to S0
... (most are dead — this is fast)

STEP 3: After Minor GC
┌─────────────────────────────────────────────────┐
│  Young Generation                               │
│  ┌───────────────────┐  ┌────────┐  ┌────────┐  │
│  │ Eden (EMPTY ✅)   │  │  S0   │  │  S1   │  │
│  │                   │  │obj1   │  │(empty)│  │
│  │                   │  │obj3   │  │       │  │
│  └───────────────────┘  └────────┘  └────────┘  │
└─────────────────────────────────────────────────┘

STEP 4: After 15 Minor GCs — objects promoted to Old Gen
Objects in S0/S1 that survived 15 cycles move to Old Generation
</pre></div>

<div class="prod-box">
  <div class="prod-label">🏭 Production Use Case — Promotion Failure</div>
  <p>One of our services started throwing frequent Full GC pauses during peak load (12pm–2pm daily). GC logs showed "to-space overflow" — objects surviving Minor GC couldn't fit in Survivor spaces and were being directly promoted to Old Gen en masse. Old Gen then filled fast. Fix: increased Survivor space ratio (<code>-XX:SurvivorRatio=6</code>) and total heap size. This is why GC logs are not optional in production — without them, this looks like a random slowdown.</p>
</div>

### Choosing the Right GC — Real Tradeoffs

<div class="gc-compare">
  <div class="gc-card">
    <div class="gc-head g1-head">G1 GC — The Balanced Default</div>
    <div class="gc-body">
      <strong>Use when:</strong> most Spring Boot / enterprise apps<br><br>
      G1 divides the heap into ~2048 equal regions (1–32MB each). Instead of fixed Young/Old areas, any region can be Young, Old, or Humongous (for large objects). G1 collects regions with the most garbage first — hence "Garbage First".<br><br>
      <strong>Key tuning:</strong><br>
      <code>-XX:+UseG1GC</code> (default Java 9+)<br>
      <code>-XX:MaxGCPauseMillis=200</code> (pause target)<br>
      <code>-XX:G1HeapRegionSize=16m</code><br><br>
      <strong>Typical pause:</strong> 50–200ms<br>
      <strong>Overhead:</strong> Low–medium
    </div>
  </div>
  <div class="gc-card">
    <div class="gc-head zgc-head">ZGC — The Low-Latency Choice</div>
    <div class="gc-body">
      <strong>Use when:</strong> latency-sensitive APIs, trading, real-time systems<br><br>
      ZGC does almost all work concurrently while your app runs. It uses coloured pointers and load barriers to track object state. Heap can be terabytes. Pauses are sub-millisecond regardless of heap size.<br><br>
      <strong>Key tuning:</strong><br>
      <code>-XX:+UseZGC</code> (production-ready Java 15+)<br>
      <code>-Xmx16g</code><br>
      <code>-XX:ConcGCThreads=4</code><br><br>
      <strong>Typical pause:</strong> &lt;1ms<br>
      <strong>Overhead:</strong> 5–15% CPU for concurrent work
    </div>
  </div>
</div>

<div class="prod-box">
  <div class="prod-label">🏭 Production Use Case — Switching from G1 to ZGC</div>
  <p>Our vehicle validation API (OneVAL) had a strict 200ms p99 SLA. With G1, we were seeing occasional 180–220ms GC pauses that violated the SLA 3–5 times per hour. We switched to ZGC on Java 17. GC pauses dropped to 2–4ms. p99 latency dropped from 195ms to 140ms. The tradeoff: CPU usage went up ~8% due to concurrent GC work. For a latency-critical service, completely worth it.</p>
</div>

---

<div class="part-divider">
  <div class="part-num">Part 4</div>
  <h2>Java Versions — What Changed, Why It Matters in Production</h2>
  <p>Every major release has a production story behind it</p>
</div>

<div class="version-card">
  <div class="version-header">
    <span class="version-badge version-lts">LTS</span>
    <div>
      <div class="version-title">Java 8 — The One That Changed Everything</div>
      <div class="version-year">Released March 2014 · Still the most-used Java version in the world</div>
    </div>
  </div>
  <div class="version-body">
    <p>Java 8 was a paradigm shift. For the first time, Java developers could write functional-style code. The Spring Boot ecosystem was built around it. It's been in production everywhere for a decade.</p>
    <ul class="feature-list">
      <li><strong>Lambda expressions</strong> — anonymous functions without boilerplate anonymous classes</li>
      <li><strong>Stream API</strong> — functional pipeline processing: filter, map, collect</li>
      <li><strong>Optional&lt;T&gt;</strong> — explicit null handling without NullPointerException landmines</li>
      <li><strong>Default methods in interfaces</strong> — evolve APIs without breaking implementations</li>
      <li><strong>New Date/Time API (java.time)</strong> — finally replaced the broken Calendar class</li>
      <li><strong>PermGen removed → Metaspace introduced</strong> — biggest JVM memory change in years</li>
    </ul>
    <div class="story-box">
      <div class="story-label">💥 The PermGen Death — A Real Migration Story</div>
      <p>Before Java 8, we had a fixed <code>-XX:MaxPermSize=256m</code>. Long-running apps that dynamically loaded classes (think application servers, hot-reload scenarios, OSGi) would hit <code>OutOfMemoryError: PermGen space</code> and there was no good fix — just restart the server. Java 8 replaced PermGen with Metaspace, which lives in native memory and grows dynamically. We migrated a legacy app from Java 7 to Java 8 at CAMS, removed all PermGen flags, and those mysterious weekend restarts vanished.</p>
    </div>
    <div class="code-snippet"><pre><span class="c">// Before Java 8 — verbose, hard to read</span>
List&lt;String&gt; result = new ArrayList&lt;&gt;();
for (String name : names) {
    if (name.startsWith("S")) {
        result.add(name.toUpperCase());
    }
}

<span class="c">// Java 8 — streams + lambdas — clear, composable</span>
List&lt;String&gt; result = names.stream()
    .filter(name -&gt; name.startsWith("S"))
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());

<span class="c">// Optional — no more silent NullPointerExceptions</span>
Optional&lt;User&gt; user = userRepository.findById(id);
String email = user
    .map(User::getEmail)
    .orElse("unknown@domain.com");</pre></div>
    <div class="prod-box">
      <div class="prod-label">🏭 Production Impact</div>
      <p>At CAMS, migrating reporting modules from Java 7 to Java 8 streams cut the code size by ~40% and made logic far easier to review in PRs. More importantly, Optional adoption across our service layer reduced NullPointerExceptions in production logs by over 60% within 3 months of the migration.</p>
    </div>
  </div>
</div>

<div class="version-card">
  <div class="version-header">
    <span class="version-badge">v9</span>
    <div>
      <div class="version-title">Java 9 — Modules, G1 Default, and the JShell</div>
      <div class="version-year">Released September 2017</div>
    </div>
  </div>
  <div class="version-body">
    <p>Java 9's headline feature was the Module System (Project Jigsaw), which broke the JDK itself into modules. More practically: G1 replaced Parallel GC as the default, which was a significant production improvement for most apps.</p>
    <ul class="feature-list">
      <li><strong>Java Platform Module System (JPMS)</strong> — explicit module dependencies, strong encapsulation</li>
      <li><strong>G1 becomes default GC</strong> — better latency out of the box for most apps</li>
      <li><strong>JShell</strong> — interactive REPL for exploring Java code without boilerplate</li>
      <li><strong>Collection factory methods</strong> — <code>List.of()</code>, <code>Map.of()</code>, <code>Set.of()</code></li>
      <li><strong>Process API improvements</strong> — better control over OS processes</li>
    </ul>
    <div class="code-snippet"><pre><span class="c">// Java 9: immutable collection factories</span>
List&lt;String&gt; frameworks = List.of("Spring Boot", "Quarkus", "Micronaut");
Map&lt;String, Integer&gt; ports = Map.of("http", 8080, "https", 8443);

<span class="c">// Note: these throw UnsupportedOperationException on add/remove</span>
<span class="c">// Great for constants and test data — stops accidental mutation</span></pre></div>
    <div class="prod-box">
      <div class="prod-label">🏭 Production Impact — G1 as Default</div>
      <p>When we moved a batch processing service from Java 8 (Parallel GC) to Java 9, without changing a single GC flag, our p99 response time improved from 850ms to 380ms during heavy load. The Parallel GC was optimised for throughput — it would process everything then stop the world for a long GC. G1's shorter, more frequent pauses were a better fit for a service that also handles user requests.</p>
    </div>
  </div>
</div>

<div class="version-card">
  <div class="version-header">
    <span class="version-badge version-lts">LTS</span>
    <div>
      <div class="version-title">Java 11 — The New Enterprise Baseline</div>
      <div class="version-year">Released September 2018 · Most common LTS in enterprise today</div>
    </div>
  </div>
  <div class="version-body">
    <p>Java 11 is the version most enterprise teams standardised on. Oracle changed its licensing model here — you needed a commercial license for Oracle JDK in production, which pushed most teams to OpenJDK. The features themselves were highly practical.</p>
    <ul class="feature-list">
      <li><strong>HTTP Client API (standard)</strong> — finally replaced the ancient HttpURLConnection</li>
      <li><strong>String new methods</strong> — <code>isBlank()</code>, <code>strip()</code>, <code>lines()</code>, <code>repeat()</code></li>
      <li><strong>Local variable type inference in lambdas</strong> — <code>var</code> in lambda params</li>
      <li><strong>ZGC introduced (experimental)</strong> — the low-latency GC future begins</li>
      <li><strong>Flight Recorder (JFR) free for all</strong> — was previously commercial-only in Oracle JDK</li>
      <li><strong>Running single-file source</strong> — <code>java Hello.java</code> without compiling first</li>
    </ul>
    <div class="code-snippet"><pre><span class="c">// Java 11: HTTP Client — clean, async, supports HTTP/2</span>
HttpClient client = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(10))
    .build();

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.vehicle-registry.com/validate"))
    .header("Authorization", "Bearer " + token)
    .POST(HttpRequest.BodyPublishers.ofString(payload))
    .build();

HttpResponse&lt;String&gt; response = client.send(request,
    HttpResponse.BodyHandlers.ofString());

<span class="c">// Java 11: String methods — genuinely useful</span>
"  \t  ".isBlank();          <span class="c">// true (unicode-aware)</span>
"  hello  ".strip();         <span class="c">// "hello" (better than trim())</span>
"line1\nline2\nline3"
    .lines()
    .count();                <span class="c">// 3</span>
"ha".repeat(3);             <span class="c">// "hahaha"</span></pre></div>
    <div class="prod-box">
      <div class="prod-label">🏭 Production Use Case — JFR Saves the Day</div>
      <p>On Java 11, Java Flight Recorder became free. This was a game-changer for us. JFR is a built-in, ultra-low-overhead profiler that records CPU, memory allocation, GC events, I/O, and lock contention — continuously, in production. When our PUCE service had intermittent latency spikes every few hours, we enabled JFR with a rolling 5-minute buffer. The next spike occurred, we dumped the buffer, loaded it in JDK Mission Control, and found the culprit in 10 minutes: a third-party library doing synchronised HTTP connection pool management. We wouldn't have found that with application-level metrics alone.</p>
    </div>
  </div>
</div>

<div class="version-card">
  <div class="version-header">
    <span class="version-badge">v14-16</span>
    <div>
      <div class="version-title">Java 14–16 — The Quality-of-Life Revolution</div>
      <div class="version-year">Released 2020–2021</div>
    </div>
  </div>
  <div class="version-body">
    <p>These releases felt like the Java team finally fixing things that had annoyed developers for 20 years. Records, text blocks, helpful NPEs, pattern matching — each one small but genuinely impactful day-to-day.</p>
    <ul class="feature-list">
      <li><strong>Records (Java 16 final)</strong> — immutable data classes without getters, equals, hashCode, toString boilerplate</li>
      <li><strong>Text Blocks (Java 15 final)</strong> — multiline strings that don't require escape gymnastics</li>
      <li><strong>Helpful NullPointerExceptions (Java 14)</strong> — JVM now tells you exactly which variable was null</li>
      <li><strong>Pattern Matching instanceof (Java 16)</strong> — no more redundant casts after type check</li>
    </ul>
    <div class="code-snippet"><pre><span class="c">// Records — before (Java 8): a full class with 50 lines of boilerplate</span>
<span class="k">public class</span> <span class="t">VehicleValidationResult</span> {
    <span class="k">private final</span> String vehicleId;
    <span class="k">private final</span> String status;
    <span class="k">private final</span> LocalDateTime timestamp;
    <span class="c">// constructor, getters, equals, hashCode, toString...</span>
}

<span class="c">// Records — Java 16: one line. Immutable. Done.</span>
<span class="k">record</span> <span class="t">VehicleValidationResult</span>(String vehicleId, String status, LocalDateTime timestamp) {}

<span class="c">// Text Blocks — writing JSON for REST clients or test data</span>
String requestBody = <span class="s">"""
    {
        "vehicleId": "RN-2024-001",
        "testType": "EMISSIONS",
        "region": "EU"
    }
    """</span>;

<span class="c">// Helpful NPE — Java 14+</span>
<span class="c">// Before: "NullPointerException at VehicleService.java:42"</span>
<span class="c">// After:  "Cannot invoke 'Vehicle.getEngineSpec()' because 'vehicle' is null"</span>

<span class="c">// Pattern matching instanceof — no redundant cast</span>
<span class="k">if</span> (event <span class="k">instanceof</span> ValidationCompletedEvent e) {
    processResult(e.getResult()); <span class="c">// no (ValidationCompletedEvent) cast needed</span>
}</pre></div>
    <div class="prod-box">
      <div class="prod-label">🏭 Production Impact — Helpful NPEs in Real Debugging</div>
      <p>Before Java 14, a NullPointerException in a complex expression like <code>order.getCustomer().getAddress().getCity()</code> told you the line number but not which part was null. After upgrading to Java 14 in our GST compliance service, NPEs in production logs became immediately actionable — no need to add debug logs, redeploy, and reproduce. Our mean time to diagnose NPE-class bugs dropped from ~45 minutes to under 5 minutes.</p>
    </div>
  </div>
</div>

<div class="version-card">
  <div class="version-header">
    <span class="version-badge version-lts">LTS</span>
    <div>
      <div class="version-title">Java 17 — The Modern Production Standard</div>
      <div class="version-year">Released September 2021 · Recommended for most teams today</div>
    </div>
  </div>
  <div class="version-body">
    <p>Java 17 is the sweet spot — mature, long-term supported, and packed with features that make complex domain modelling cleaner. Spring Boot 3.x requires Java 17. If you're starting a new service today, this is your baseline.</p>
    <ul class="feature-list">
      <li><strong>Sealed classes</strong> — restrict which classes can implement/extend a type, enabling exhaustive pattern matching</li>
      <li><strong>Switch expressions (standard)</strong> — switch as a value-returning expression, with arrow syntax</li>
      <li><strong>Strong encapsulation of JDK internals</strong> — `sun.misc.Unsafe` and friends now require explicit `--add-opens`</li>
      <li><strong>Context-specific deserialization filters</strong> — JVM-level protection against deserialization attacks</li>
    </ul>
    <div class="code-snippet"><pre><span class="c">// Sealed classes — model your domain precisely</span>
<span class="c">// Only these three can implement DiagnosticResult — nothing else</span>
<span class="k">sealed interface</span> <span class="t">DiagnosticResult</span>
    <span class="k">permits</span> PassResult, FailResult, PendingResult {}

<span class="k">record</span> <span class="t">PassResult</span>(String vehicleId, LocalDate validUntil) <span class="k">implements</span> DiagnosticResult {}
<span class="k">record</span> <span class="t">FailResult</span>(String vehicleId, List&lt;String&gt; faultCodes) <span class="k">implements</span> DiagnosticResult {}
<span class="k">record</span> <span class="t">PendingResult</span>(String vehicleId, String reason) <span class="k">implements</span> DiagnosticResult {}

<span class="c">// Switch expression — exhaustive, returns a value</span>
<span class="c">// Compiler FORCES you to handle all cases — no missed branches</span>
String action = <span class="k">switch</span> (result) {
    <span class="k">case</span> PassResult p  -&gt; "Issue certificate for " + p.vehicleId();
    <span class="k">case</span> FailResult f  -&gt; "Schedule repair: " + String.join(", ", f.faultCodes());
    <span class="k">case</span> PendingResult r -&gt; "Waiting: " + r.reason();
}; <span class="c">// No default needed — sealed class is exhaustive</span></pre></div>
    <div class="prod-box">
      <div class="prod-label">🏭 Production Use Case — Sealed Classes for State Machines</div>
      <p>Our OneVAL vehicle validation platform has a complex lifecycle: SUBMITTED → IN_PROGRESS → BLOCKED → COMPLETED or REJECTED. Before Java 17, this was an enum plus instanceof checks scattered everywhere — and we'd regularly find a code path that forgot to handle BLOCKED state. With sealed classes, the compiler enforces exhaustiveness. We moved our validation state machine to sealed classes in Java 17 and eliminated an entire category of "unhandled state" bugs that had appeared in production 3 times in 18 months.</p>
    </div>
  </div>
</div>

<div class="version-card">
  <div class="version-header">
    <span class="version-badge version-lts">LTS</span>
    <div>
      <div class="version-title">Java 21 — The Biggest JVM Leap in a Decade</div>
      <div class="version-year">Released September 2023 · The future is here</div>
    </div>
  </div>
  <div class="version-body">
    <p>Java 21 is the most exciting release since Java 8. Virtual Threads alone justify the upgrade for any I/O-heavy service. This is Project Loom — a multi-year effort to fundamentally change how Java handles concurrency.</p>
    <ul class="feature-list">
      <li><strong>Virtual Threads (Project Loom)</strong> — millions of lightweight threads managed by the JVM, not the OS</li>
      <li><strong>Pattern Matching for Switch (standard)</strong> — combine sealed classes with switch for exhaustive type dispatch</li>
      <li><strong>Record Patterns</strong> — destructure records directly in pattern matching</li>
      <li><strong>Sequenced Collections</strong> — unified interface for ordered collections with first/last access</li>
      <li><strong>String Templates (preview)</strong> — safe, readable string interpolation</li>
    </ul>

<div class="story-box">
  <div class="story-label">🧵 The Threading Problem Virtual Threads Solve</div>
  <p>Traditional Java thread: maps 1-to-1 with an OS thread. Each OS thread uses ~1MB of stack memory. Context switching between OS threads is expensive — the kernel has to save/restore registers, flush TLB, etc. This is why a Tomcat server with 200 threads can handle 200 concurrent requests. Want 10,000 concurrent? You need async/reactive programming — callbacks, CompletableFuture, WebFlux. The code becomes hard to read, hard to debug, hard to maintain.</p>
  <p style="margin-top:8px;">Virtual threads are JVM-managed lightweight threads. They're parked on a small pool of OS "carrier" threads. When a virtual thread blocks on I/O (database call, HTTP request, file read), the carrier thread is released to run another virtual thread. You can have millions of virtual threads. And they write exactly like regular blocking code.</p>
</div>

<div class="diagram-wrap"><pre>
Traditional Threads (Java &lt; 21):

  Request 1 → OS Thread 1  [blocked waiting for DB] ← OS thread is WASTED
  Request 2 → OS Thread 2  [blocked waiting for API] ← OS thread is WASTED
  Request 3 → OS Thread 3  [blocked waiting for Redis] ← OS thread is WASTED
  ...
  Request 201 → QUEUE (waiting for a free thread) ← user waits

  Max concurrency = number of OS threads = ~200–500 practical limit


Virtual Threads (Java 21):

  Request 1   → Virtual Thread 1  [blocked on DB]
  Request 2   → Virtual Thread 2  [blocked on API]
  ...while VT1 and VT2 are blocked, carrier threads run other VTs...
  Request 10,000 → Virtual Thread 10,000  [no queue, no wait]

  VT1 and VT2 wake up when their I/O completes, resume on a carrier thread
  Max concurrency = millions (limited by memory, not OS thread limit)
</pre></div>

<div class="code-snippet"><pre><span class="c">// Traditional approach — need thread pool sizing, tuning, monitoring</span>
ExecutorService pool = Executors.newFixedThreadPool(200); <span class="c">// 200 OS threads</span>
<span class="k">for</span> (VehicleValidationRequest req : requests) {
    pool.submit(() -&gt; validateVehicle(req)); <span class="c">// blocks OS thread during DB call</span>
}

<span class="c">// Java 21: Virtual Threads — same code, massive concurrency</span>
<span class="k">try</span> (ExecutorService vExecutor = Executors.newVirtualThreadPerTaskExecutor()) {
    <span class="k">for</span> (VehicleValidationRequest req : requests) {
        vExecutor.submit(() -&gt; validateVehicle(req));
        <span class="c">// DB call blocks the virtual thread, NOT the OS thread</span>
        <span class="c">// 10,000 concurrent validations with simple blocking code</span>
    }
}

<span class="c">// Spring Boot 3.2+ — enable with one property</span>
<span class="c">// spring.threads.virtual.enabled=true</span>
<span class="c">// That's it. All request handling moves to virtual threads.</span>

<span class="c">// Pattern matching for switch — Java 21 (combining with sealed classes)</span>
String summary = <span class="k">switch</span> (result) {
    <span class="k">case</span> PassResult(String id, LocalDate date) -&gt;
        "Vehicle " + id + " certified until " + date;
    <span class="k">case</span> FailResult(String id, List&lt;String&gt; faults) -&gt;
        id + " failed: " + faults.size() + " faults found";
    <span class="k">case</span> PendingResult(String id, String reason) -&gt;
        id + " pending: " + reason;
};</pre></div>
    <div class="prod-box">
      <div class="prod-label">🏭 Production Use Case — Virtual Threads on the OneVAL API</div>
      <p>Our vehicle validation API handles requests that each make 3–5 downstream calls: database lookup, rules engine API, certificate service, audit log write. Each request blocked a thread for ~80ms total wait time. With a fixed thread pool of 200, we could handle ~2,500 requests/second before queuing. After upgrading to Java 21 and enabling virtual threads in Spring Boot, we ran load tests: the same server handled 18,000 requests/second with the same 80ms latency per request. No reactive programming. No callback hell. Just <code>spring.threads.virtual.enabled=true</code> and simple blocking code.</p>
    </div>
  </div>
</div>

---

<div class="part-divider">
  <div class="part-num">Part 5</div>
  <h2>JVM Flags That Matter in Production</h2>
  <p>What to set, what to never forget, and what to avoid</p>
</div>

<div class="story-box">
  <div class="story-label">😬 The -Xmx Mistake Everyone Makes</div>
  <p>A developer set <code>-Xmx4g</code> but left <code>-Xms</code> at default (which is proportional to total RAM, often 256m). The JVM started with a 256MB heap and grew it slowly to 4GB. Each heap resize caused a full GC pause. During peak load, the heap was resizing 3–4 times, causing 500–800ms stalls. Fix: set <code>-Xms</code> equal to <code>-Xmx</code> in production so the JVM allocates the full heap at startup. Predictable memory, no resize pauses.</p>
</div>

### The Must-Have Flags

<div class="diagram-wrap"><pre>
# ── HEAP SIZING ─────────────────────────────────────────────────────
-Xms512m                    # Initial heap — set equal to Xmx in production
-Xmx512m                    # Max heap — tune based on your app's working set
-Xss512k                    # Stack size per thread (reduce for apps with many threads)

# ── GC SELECTION ────────────────────────────────────────────────────
-XX:+UseG1GC                # Balanced: latency + throughput (default Java 9+)
-XX:+UseZGC                 # Low latency (Java 15+ production)
-XX:MaxGCPauseMillis=200    # G1: target max pause time (not a hard limit)

# ── GC LOGGING (non-negotiable in production) ────────────────────────
-Xlog:gc*:file=/var/log/gc.log:time,uptime:filecount=5,filesize=20m

# ── CRASH DIAGNOSTICS ───────────────────────────────────────────────
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/var/log/heapdump.hprof
-XX:+ExitOnOutOfMemoryError  # Kill the pod on OOM instead of limping along

# ── METASPACE ───────────────────────────────────────────────────────
-XX:MetaspaceSize=256m       # Initial size (avoid early resizing)
-XX:MaxMetaspaceSize=512m    # Cap it — catches classloader leaks early

# ── STARTUP PERFORMANCE ─────────────────────────────────────────────
-Djava.security.egd=file:/dev/./urandom   # Faster SecureRandom on Linux
</pre></div>

### Our Production JVM Config at Renault Nissan

<div class="diagram-wrap"><pre>
# Spring Boot microservice on GKE — Java 17, ZGC
java \
  -Xms1g -Xmx1g \
  -XX:+UseZGC \
  -XX:+HeapDumpOnOutOfMemoryError \
  -XX:HeapDumpPath=/var/log/app/ \
  -XX:+ExitOnOutOfMemoryError \
  -Xlog:gc*:file=/var/log/app/gc.log:time,uptime:filecount=3,filesize=10m \
  -XX:MetaspaceSize=128m \
  -XX:MaxMetaspaceSize=256m \
  -Djava.security.egd=file:/dev/./urandom \
  -Dspring.profiles.active=production \
  -jar app.jar
</pre></div>

---

<div class="part-divider">
  <div class="part-num">Part 6</div>
  <h2>Reading Thread Dumps — Diagnosing Hangs and Deadlocks</h2>
  <p>What a stuck application is actually trying to tell you</p>
</div>

<div class="story-box">
  <div class="story-label">🧊 The Frozen Service</div>
  <p>Our VESPA diagnostic service stopped responding every few days. Memory was fine. CPU was near zero. But requests just... hung. No errors. No timeouts. A thread dump showed exactly what was happening in 30 seconds: two threads each holding a lock and waiting for the other. Classic deadlock. Without the thread dump, we'd have been guessing for hours.</p>
</div>

Generate a thread dump:

<div class="diagram-wrap"><pre>
# Option 1: kill -3 (sends SIGQUIT — prints thread dump to stdout/logs)
kill -3 $(pgrep -f app.jar)

# Option 2: jstack (cleanest output)
jstack -l $(pgrep -f app.jar) > threaddump.txt

# Option 3: jcmd (modern, preferred)
jcmd $(pgrep -f app.jar) Thread.print > threaddump.txt

# In Kubernetes:
kubectl exec -it pod-name -- jstack 1 > threaddump.txt
</pre></div>

### Decoding a Thread Dump Entry

<div class="diagram-wrap"><pre>
"http-nio-8080-exec-3" #47 daemon prio=5 os_prio=0 tid=0x00007f cpu=1234ms
   java.lang.Thread.State: BLOCKED (on object monitor)
    at com.renault.validation.VehicleService.validate(VehicleService.java:142)
    - waiting to lock &lt;0x00000007c1234abc&gt; (a java.util.HashMap)
    at com.renault.validation.RequestHandler.handle(RequestHandler.java:89)

│                        │
│ Thread name            │ State: what it's doing right now
│
Thread States:
  RUNNABLE      → executing or ready to run (normal)
  WAITING       → waiting indefinitely (Object.wait(), LockSupport.park())
  TIMED_WAITING → waiting with timeout (Thread.sleep(), Future.get(timeout))
  BLOCKED       → waiting to acquire a monitor lock ← 🚨 investigate this

Dead Lock Pattern to spot:
  Thread A: BLOCKED waiting on lock X — held by Thread B
  Thread B: BLOCKED waiting on lock Y — held by Thread A
  ↑ JStack will report "Found one Java-level deadlock" automatically
</pre></div>

<div class="prod-box">
  <div class="prod-label">🏭 Production Fix — The VESPA Deadlock</div>
  <p>The deadlock in our VESPA service was caused by two methods: <code>updateDiagnosticStatus()</code> acquired lock A then lock B. <code>archiveDiagnosticRecord()</code> acquired lock B then lock A. When they ran concurrently, each got one lock and waited for the other. Fix: always acquire locks in the same order. We refactored both methods to use a single coarser lock on the diagnostic record ID. Deadlock eliminated. Lesson: <code>java.util.concurrent</code> classes (ConcurrentHashMap, ReentrantLock with tryLock) are almost always better than raw <code>synchronized</code>.</p>
</div>

---

<div class="part-divider">
  <div class="part-num">Part 7</div>
  <h2>The 5 Most Common JVM Production Problems</h2>
  <p>What they look like, how to find them, how to fix them</p>
</div>

<table class="summary-table">
  <thead>
    <tr>
      <th>Problem</th><th>Symptoms</th><th>Diagnosis Tool</th><th>Root Cause</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Heap OOM</strong></td>
      <td>OutOfMemoryError: Java heap space, crashes</td>
      <td>Heap dump + Eclipse MAT</td>
      <td>Memory leak — objects kept alive by references</td>
    </tr>
    <tr>
      <td><strong>Metaspace OOM</strong></td>
      <td>OutOfMemoryError: Metaspace, slow class loading</td>
      <td>jcmd + heap dump</td>
      <td>Classloader leak — dynamic class gen, unclosed URLClassLoader</td>
    </tr>
    <tr>
      <td><strong>High GC overhead</strong></td>
      <td>Slow responses, high CPU, frequent pauses</td>
      <td>GC logs + JFR</td>
      <td>Excessive allocation, undersized heap, wrong GC for workload</td>
    </tr>
    <tr>
      <td><strong>Thread deadlock</strong></td>
      <td>Service hangs, requests never complete, zero CPU</td>
      <td>Thread dump (jstack)</td>
      <td>Circular lock acquisition order</td>
    </tr>
    <tr>
      <td><strong>Thread leak</strong></td>
      <td>Thread count grows unboundedly, eventual OOM</td>
      <td>Thread dump, JMX metrics</td>
      <td>ExecutorService not shut down, threads not returned to pool</td>
    </tr>
  </tbody>
</table>

### The 3:14 AM Fix — What We Actually Did

<div class="prod-box">
  <div class="prod-label">🏭 The Full Renault Nissan Incident — From Alert to Fix</div>
  <p><strong>Step 1 (T+0min):</strong> OOM alert fires. We add <code>-XX:+HeapDumpOnOutOfMemoryError</code> to the next restart and trigger a heap dump manually on the surviving pod using <code>jcmd 1 GC.heap_dump /tmp/heap.hprof</code>.</p>
  <p style="margin-top:8px;"><strong>Step 2 (T+8min):</strong> Download the 1.2GB heap dump. Open in Eclipse Memory Analyzer (MAT). Run "Leak Suspects Report". MAT immediately flags: one instance of <code>LinkedHashMap</code> holding 847MB — 71% of the heap.</p>
  <p style="margin-top:8px;"><strong>Step 3 (T+14min):</strong> Trace the reference chain. The map is a field in <code>ValidationRuleCache</code>. It's an LRU cache we added 3 weeks ago. But the eviction policy was set to 10,000 entries with no TTL. The rules cache was accumulating vehicle IDs as keys — unboundedly — because each unique vehicleId got its own cache entry.</p>
  <p style="margin-top:8px;"><strong>Step 4 (T+31min):</strong> Fix: add TTL eviction (Caffeine cache, <code>expireAfterWrite(10, MINUTES)</code>), reduce max size to 500. Test locally.</p>
  <p style="margin-top:8px;"><strong>Step 5 (T+47min):</strong> Deploy fix via GitOps. Rolling restart. Memory stable. Alert resolves. Post-incident: added heap used % as a Grafana alert at 80% threshold so we catch it before OOM next time.</p>
</div>

---

<div class="part-divider">
  <div class="part-num">Part 8</div>
  <h2>Monitoring the JVM in Production</h2>
  <p>What to watch, what it means, and how to act on it</p>
</div>

<table class="summary-table">
  <thead><tr><th>Metric</th><th>Alert threshold</th><th>What it means when breached</th></tr></thead>
  <tbody>
    <tr><td>Heap used %</td><td>&gt; 80%</td><td>GC pressure rising, potential OOM approaching</td></tr>
    <tr><td>GC pause time (p99)</td><td>&gt; 500ms</td><td>GC is causing user-visible latency spikes</td></tr>
    <tr><td>GC frequency</td><td>Full GC &gt; 1/hour</td><td>Old Gen filling too fast — allocation or retention issue</td></tr>
    <tr><td>Thread count</td><td>Growing &gt; 10%/day</td><td>Thread leak — executor not being shut down</td></tr>
    <tr><td>Metaspace used</td><td>&gt; 80% of MaxMetaspaceSize</td><td>Classloader leak in progress</td></tr>
    <tr><td>JIT compilation rate</td><td>Drops to 0 after warmup</td><td>Normal — expected steady state</td></tr>
  </tbody>
</table>

### JFR — Your Always-On Production Profiler

Java Flight Recorder (free since Java 11) is the most underused tool in the Java ecosystem. It records everything — with less than 1% overhead.

<div class="diagram-wrap"><pre>
# Start a continuous recording (low overhead — safe for production)
jcmd $(pgrep -f app.jar) JFR.start \
    name=prod-monitoring \
    settings=default \
    maxsize=200m \
    maxage=30m

# When incident occurs — dump the last 30 minutes
jcmd $(pgrep -f app.jar) JFR.dump \
    name=prod-monitoring \
    filename=/tmp/incident.jfr

# Open in JDK Mission Control
# See: CPU hotspots, memory allocation heatmap, GC events,
#      lock contention, I/O waits, exception frequency
</pre></div>

### Spring Boot + Micrometer — The Production Standard

<div class="diagram-wrap"><pre>
# pom.xml — add Prometheus registry
&lt;dependency&gt;
    &lt;groupId&gt;io.micrometer&lt;/groupId&gt;
    &lt;artifactId&gt;micrometer-registry-prometheus&lt;/artifactId&gt;
&lt;/dependency&gt;

# application.properties
management.endpoints.web.exposure.include=health,metrics,prometheus
management.metrics.enable.jvm=true

# Exposes /actuator/prometheus with:
# jvm_memory_used_bytes{area="heap"}
# jvm_gc_pause_seconds_max
# jvm_threads_live_threads
# jvm_classes_loaded_classes
# ... and 40+ more JVM metrics

# Prometheus scrapes every 15s → Grafana dashboard → PagerDuty alerts
</pre></div>

---

## Summary: Your JVM Mastery Path

<table class="summary-table">
  <thead><tr><th>Level</th><th>What you know</th><th>What you can do</th></tr></thead>
  <tbody>
    <tr>
      <td><strong>Beginner</strong></td>
      <td>JVM vs JRE vs JDK, bytecode, what GC does, heap vs stack</td>
      <td>Understand errors like OOM and StackOverflow. Know what -Xmx does.</td>
    </tr>
    <tr>
      <td><strong>Intermediate</strong></td>
      <td>Class loading, GC algorithms, thread states, Java 8–17 features</td>
      <td>Read GC logs. Pick the right GC. Use records, streams, Optional effectively.</td>
    </tr>
    <tr>
      <td><strong>Advanced</strong></td>
      <td>JIT tiers, heap dump analysis, tuning flags, thread dump reading</td>
      <td>Diagnose memory leaks. Fix deadlocks. Tune GC for your workload.</td>
    </tr>
    <tr>
      <td><strong>Pro</strong></td>
      <td>JFR profiling, virtual threads, custom class loaders, ZGC internals</td>
      <td>Root-cause production incidents in minutes. Design systems around JVM constraints.</td>
    </tr>
  </tbody>
</table>

The JVM is 30 years of engineering. Every feature — GC generations, JIT tiers, virtual threads — exists because real production systems ran into real problems and smarter people than any of us found elegant solutions. The more you understand why these systems work the way they do, the better your intuition will be when things go wrong at 3 AM.

---

*Written by Sathiyaraj Venkatachalapathy — Lead Java Developer & Associate Architect at Renault Nissan Technology Business Center India. The production incidents and solutions described here are from real systems.*

*Questions? Found something worth discussing? Connect on [LinkedIn](https://www.linkedin.com/in/sathiyaraj-venkatachalapathy-706569188/).*

</div>
