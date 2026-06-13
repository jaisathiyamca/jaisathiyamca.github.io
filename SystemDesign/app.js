/* ==========================================================================
   AETHER ML ACADEMY — INTERACTIVE CORE CONTROLLER
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Application State
  
  const COURSES = [
    { id: "MATH", icon: "🧮", title: "Math & Programming" },
    { id: "ML", icon: "🤖", title: "Machine Learning" },
    { id: "DL", icon: "🧠", title: "Deep Learning" },
    { id: "NLP_CV", icon: "👁️", title: "NLP & Vision" },
    { id: "AI", icon: "✨", title: "GenAI & LLMs" },
    { id: "RAG", icon: "📚", title: "RAG Systems" },
    { id: "MCP", icon: "🔌", title: "MCP" },
    { id: "MLOPS", icon: "⚙️", title: "MLOps & Big Data" },
    { id: "SD", icon: "🌐", title: "System Design" },
    { id: "PROJECTS", icon: "🛠️", title: "Applied Projects" }
  ];


const COURSE_GUIDES = {
  "MATH": {
    timeline: "2 Weeks (1 hour/day)",
    stage: "Absolute Beginner",
    learnFirst: ["Python basics", "NumPy arrays", "Pandas DataFrames"],
    learnNext: ["Vectorized operations", "Matplotlib charting", "Basic Statistics (Mean, Variance)"],
    ignoreUntilLater: ["Calculus derivations", "Advanced SciPy optimization functions"]
  },
  "ML": {
    timeline: "4 Weeks (1 hour/day)",
    stage: "Beginner to Intermediate",
    learnFirst: ["Supervised Learning", "Linear/Logistic Regression", "Train/Test Splits"],
    learnNext: ["Decision Trees", "Random Forests", "Cross-Validation"],
    ignoreUntilLater: ["Deep Neural Networks", "Complex Hyperparameter Tuning (Optuna)"]
  },
  "DL": {
    timeline: "5 Weeks (1 hour/day)",
    stage: "Intermediate",
    learnFirst: ["Backpropagation concepts", "Basic Neural Networks", "PyTorch or Keras Basics"],
    learnNext: ["Convolutional Neural Nets (CNNs)", "Recurrent Neural Nets (RNNs)", "LSTMs"],
    ignoreUntilLater: ["Generative Adversarial Networks (GANs)", "Transformers"]
  },
  "NLP_CV": {
    timeline: "3 Weeks (1 hour/day)",
    stage: "Intermediate",
    learnFirst: ["Tokenization (BPE)", "OpenCV Basics", "Image Grayscaling & Resizing"],
    learnNext: ["Word Embeddings", "YOLO Object Detection", "spaCy NLP pipelines"],
    ignoreUntilLater: ["Transformer Math", "Real-time Edge TPU deployment"]
  },
  "AI": {
    timeline: "4 Weeks (1 hour/day)",
    stage: "Advanced",
    learnFirst: ["What is an LLM?", "OpenAI/HuggingFace APIs", "Basic Prompt Engineering"],
    learnNext: ["Few-Shot Prompting", "Chain-of-Thought", "Agentic Workflows (AutoGPT)"],
    ignoreUntilLater: ["KV Caching", "Pre-training LLMs from scratch"]
  },
  "RAG": {
    timeline: "3 Weeks (1 hour/day)",
    stage: "Advanced",
    learnFirst: ["What is RAG?", "Basic Vector Search", "Character Chunking"],
    learnNext: ["Semantic Chunking", "Parent-Child Retrieval", "Vector Databases (Pinecone/Milvus)"],
    ignoreUntilLater: ["Cross-Encoder Re-ranking", "Graph RAG"]
  },
  "MCP": {
    timeline: "2 Weeks (1 hour/day)",
    stage: "Advanced",
    learnFirst: ["JSON-RPC protocols", "stdio vs SSE", "Building a basic local server"],
    learnNext: ["Tool Chaining", "Exposing local databases to LLMs"],
    ignoreUntilLater: ["Enterprise RBAC Security", "Remote cloud MCP hosting"]
  },
  "MLOPS": {
    timeline: "4 Weeks (1 hour/day)",
    stage: "Expert",
    learnFirst: ["Dockerizing ML models", "FastAPI model serving", "Git for Data Science"],
    learnNext: ["MLflow for experiment tracking", "Apache Spark for big data", "AWS S3/EC2 basics"],
    ignoreUntilLater: ["Kubernetes (K8s)", "Ray distributed training", "Complex CI/CD pipelines"]
  },
  "SD": {
    timeline: "5 Weeks (1 hour/day)",
    stage: "Expert",
    learnFirst: ["Vertical vs Horizontal Scaling", "SQL vs NoSQL", "Load Balancers"],
    learnNext: ["Caching (Redis)", "Message Queues (Kafka)", "Microservices Architecture"],
    ignoreUntilLater: ["Consensus algorithms (Paxos/Raft)", "Extreme multi-region sharding"]
  },
  "PROJECTS": {
    timeline: "1 Project per Week (2-5 hours each)",
    stage: "Applied Practice",
    learnFirst: ["Tabular data projects (Churn, Student Performance)"],
    learnNext: ["Audio/Text projects (Heart Murmur, Summarization)"],
    ignoreUntilLater: ["Multi-Agent systems (AutoGen)", "End-to-end multi-modal pipelines"]
  }
};

  const state = {
    currentTopicId: null, // null means Homepage Dashboard
    completedTopics: [],
    quizAnswers: {}, // key: qIndex, val: selectedOptionIndex
    gitRepoInitialized: false,
    gitStagedFiles: [],
    gitCommits: [],
    gitBranch: "main",
    pyodideInstance: null,
    isPyodideLoading: false
  };

  // 2. DOM Elements Cache
  const DOM = {
    sidebar: document.getElementById("sidebar"),
    dynamicSidebarContainer: document.getElementById("dynamic-sidebar-container"),
    dynamicRoadmapTabs: document.getElementById("dynamic-roadmap-tabs"),
    dynamicRoadmapContainer: document.getElementById("dynamic-roadmap-container"),
    
    
    
    
    
    
    mobileMenuBtn: document.getElementById("mobile-menu-btn"),
    mobileCloseBtn: document.getElementById("mobile-close-btn"),
    breadcrumbs: document.getElementById("breadcrumbs"),
    completedCount: document.getElementById("completed-count"),
    globalProgressFill: document.getElementById("global-progress-fill"),
    themeToggle: document.getElementById("theme-toggle"),
    
    // Views
    dashboardView: document.getElementById("dashboard-view"),
    tutorialView: document.getElementById("tutorial-view"),
    
    // Dashboard Specifics
    startLearningBtn: document.getElementById("start-learning-btn"),
    dashboardCircleProgress: document.getElementById("dashboard-circle-progress"),
    dashboardProgressPct: document.getElementById("dashboard-progress-pct"),
    userTier: document.getElementById("user-tier"),
    roadmapCards: document.querySelectorAll(".clickable-roadmap"),

    // Tutorial Specifics
    tutTitle: document.getElementById("tut-title"),
    tutDifficulty: document.getElementById("tut-difficulty"),
    tutDuration: document.getElementById("tut-duration"),
    tutJobHighlight: document.getElementById("tut-job-highlight"),
    tutAnalogyContainer: document.getElementById("tut-analogy-container"),
    tutConceptContainer: document.getElementById("tut-concept-container"),
    tutMathContainer: document.getElementById("tut-math-container"),
    tutCodeContainer: document.getElementById("tut-code-container"),
    tutInterviewQuestion: document.getElementById("tut-interview-question"),
    tutInterviewAnswer: document.getElementById("tut-interview-answer"),
    revealInterviewBtn: document.getElementById("reveal-interview-btn"),
    copyCodeBtn: document.getElementById("copy-code-btn"),
    
    // Quiz & Navigation
    quizContainer: document.getElementById("quiz-container"),
    quizResultsCard: document.getElementById("quiz-results-card"),
    nextLessonNavBtn: document.getElementById("next-lesson-nav-btn"),
    simulatorMount: document.getElementById("simulator-mount"),
    
    // Pyodide Playground
    tutCodeEditor: document.getElementById("tut-code-editor"),
    tutConsoleOutput: document.getElementById("tut-console-output"),
    runCodeBtn: document.getElementById("run-code-btn"),
    
    // Scroll progress bar
    scrollProgress: document.getElementById("scroll-progress")
  };

  // 3. Initialize Application
  function init() {
    if (window.mermaid) {
      mermaid.initialize({ startOnLoad: false, theme: 'dark' });
    }
    buildRoadmap();
    loadCompletedState();
    buildSidebarTopics();
    setupEventListeners();
    updateGlobalProgress();
    
    // Handle URL Deep-Linking
    const hash = window.location.hash.replace("#", "");
    if (hash && TUTORIALS.some(t => t.id === hash)) {
      loadTopic(hash);
    } else {
      loadDashboard();
    }

    // Initialize Pyodide for live code execution
    initPyodide();

    // Scroll Progress bar Fallback for unsupported browsers
    if (!CSS.supports("animation-timeline", "scroll()")) {
      window.addEventListener("scroll", handleScrollProgressFallback);
    }

    // Load theme preference
    const savedTheme = localStorage.getItem("aether-theme") || "dark";
    if (savedTheme === "light") {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      toggleThemeIcons(true);
    }
  }

  // 4. Persistence & Progress Tracking
  function loadCompletedState() {
    const saved = localStorage.getItem("aether-completed-topics");
    state.completedTopics = saved ? JSON.parse(saved) : [];
  }

  function saveCompletedState() {
    localStorage.setItem("aether-completed-topics", JSON.stringify(state.completedTopics));
    updateGlobalProgress();
  }

  function markTopicComplete(topicId) {
    if (!state.completedTopics.includes(topicId)) {
      state.completedTopics.push(topicId);
      saveCompletedState();
      buildSidebarTopics(); // Refresh checkmarks
      
      // Upgrade user tier based on progress
      updateUserTier();
    }
  }

  function updateUserTier() {
    const completedCount = state.completedTopics.length;
    let tier = "Novice";
    if (completedCount >= 75) {
      tier = "Aether Grandmaster 🌌";
    } else if (completedCount >= 50) {
      tier = "Principal Architect 🏆";
    } else if (completedCount >= 35) {
      tier = "Senior Engineer";
    } else if (completedCount >= 20) {
      tier = "Mid-Level Developer";
    } else if (completedCount >= 1) {
      tier = "Junior Apprentice";
    }
    DOM.userTier.innerText = tier;
    localStorage.setItem("aether-user-tier", tier);
  }

  function updateGlobalProgress() {
    const total = TUTORIALS.length;
    const completed = state.completedTopics.length;
    const percentage = Math.round((completed / total) * 100);
    
    DOM.completedCount.innerText = `${completed}/${total}`;
    DOM.globalProgressFill.style.width = `${percentage}%`;

    if (DOM.dashboardProgressPct) {
      DOM.dashboardProgressPct.innerText = `${percentage}%`;
    }

    // Update circular SVG progress on dashboard
    if (DOM.dashboardCircleProgress) {
      // Circumference of R=80 circle is 2 * PI * 80 ≈ 502.6
      const circ = 502.6;
      const offset = circ - (completed / total) * circ;
      DOM.dashboardCircleProgress.style.strokeDashoffset = offset;
    }

    // Update roadmap cards status
    DOM.roadmapCards.forEach(card => {
      const topicId = card.getAttribute("data-topic");
      const statusEl = card.querySelector(".roadmap-status");
      
      if (state.completedTopics.includes(topicId)) {
        card.classList.add("completed");
        card.classList.remove("active");
        statusEl.innerText = "Mastered ✓";
      } else if (state.completedTopics.length === TUTORIALS.findIndex(t => t.id === topicId)) {
        card.classList.add("active");
        card.classList.remove("completed");
        statusEl.innerText = "Active";
      } else {
        card.classList.remove("completed", "active");
        statusEl.innerText = "Locked 🔒";
      }
    });
  }

  // 5. Sidebar & Navigation UI Building

  
  function buildSidebarTopics() {
    if (!DOM.dynamicSidebarContainer) return;
    
    // Check if we need to initialize the DOM elements
    if (DOM.dynamicSidebarContainer.children.length === 0) {
      COURSES.forEach(course => {
        const group = document.createElement("div");
        group.className = "nav-category-group";
        
        const courseTopics = TUTORIALS.filter(t => t.courseType === course.id);
        const count = courseTopics.length;
        
        group.innerHTML = `
          <div class="nav-category-title" id="sidebar-title-${course.id}" style="cursor: pointer;">
            <span>${course.icon} ${course.title}</span>
            <span class="badge">${count} Topics</span>
          </div>
          <ul class="topic-list" id="sidebar-list-${course.id}" style="display: ${course.id === 'ML' ? 'block' : 'none'};">
          </ul>
        `;
        DOM.dynamicSidebarContainer.appendChild(group);
        
        const titleEl = document.getElementById(`sidebar-title-${course.id}`);
        const listEl = document.getElementById(`sidebar-list-${course.id}`);
        
        titleEl.addEventListener("click", () => {
          listEl.style.display = listEl.style.display === "none" ? "block" : "none";
        });
      });
    }

    // Populate or update the lists
    COURSES.forEach(course => {
      const listEl = document.getElementById(`sidebar-list-${course.id}`);
      if (!listEl) return;
      listEl.innerHTML = "";
      
      const courseTopics = TUTORIALS.filter(t => t.courseType === course.id);
      
      courseTopics.forEach((topic, idx) => {
        const isCompleted = state.completedTopics.includes(topic.id);
        const li = document.createElement("li");
        li.className = `topic-item ${isCompleted ? "completed-item" : ""} ${state.currentTopicId === topic.id ? "active" : ""}`;
        li.setAttribute("data-topic-id", topic.id);
        
        li.innerHTML = `
          <span class="topic-number">${isCompleted ? "✓" : (idx + 1)}</span>
          <span class="topic-name">${topic.title.replace(/^[0-9.]+\s*/, '')}</span>
        `;
        
        li.addEventListener("click", () => {
          loadTopic(topic.id);
          if (window.innerWidth <= 1024) {
            DOM.sidebar.classList.remove("mobile-open");
          }
        });
        
        listEl.appendChild(li);
      });
    });
  }


  
  function buildRoadmap() {
    if (!DOM.dynamicRoadmapTabs || !DOM.dynamicRoadmapContainer) return;

    // Check if we need to initialize the DOM elements
    if (DOM.dynamicRoadmapTabs.children.length === 0) {
      COURSES.forEach((course, index) => {
        // Tab
        const tab = document.createElement("button");
        tab.className = `btn ${index === 0 ? 'btn-primary' : 'btn-secondary'} btn-sm`;
        tab.innerText = course.title;
        tab.id = `tab-${course.id}`;
        DOM.dynamicRoadmapTabs.appendChild(tab);
        
        // Grid Container (holds banner + grid)
        const gridContainer = document.createElement("div");
        gridContainer.id = `grid-${course.id}`;
        gridContainer.style.display = index === 0 ? "block" : "none";
        
        // Inject Mentor Banner
        const guide = COURSE_GUIDES[course.id];
        if (guide) {
          const banner = document.createElement("div");
          banner.className = "mentor-banner glass-panel";
          banner.style.marginBottom = "2rem";
          banner.style.padding = "1.5rem";
          banner.style.borderLeft = "4px solid var(--primary-color)";
          banner.style.borderRadius = "8px";
          banner.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="margin: 0; color: var(--text-color); font-size: 1.2rem;">🧑‍🏫 Curriculum Mentor Guide</h3>
              <span style="background: rgba(14, 165, 233, 0.2); color: var(--primary-color); padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: bold; font-size: 0.9rem;">
                ⏱️ Timeline: ${guide.timeline}
              </span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; font-size: 0.95rem;">
              <div style="background: rgba(34, 197, 94, 0.1); padding: 1rem; border-radius: 6px; border: 1px solid rgba(34, 197, 94, 0.2);">
                <strong style="color: #22c55e; display: block; margin-bottom: 0.5rem;">🟢 Learn First (Absolute Zero):</strong>
                <ul style="margin: 0; padding-left: 1.2rem; color: var(--text-muted);">
                  ${guide.learnFirst.map(i => `<li>${i}</li>`).join('')}
                </ul>
              </div>
              <div style="background: rgba(234, 179, 8, 0.1); padding: 1rem; border-radius: 6px; border: 1px solid rgba(234, 179, 8, 0.2);">
                <strong style="color: #eab308; display: block; margin-bottom: 0.5rem;">🟡 Learn Next (Intermediate):</strong>
                <ul style="margin: 0; padding-left: 1.2rem; color: var(--text-muted);">
                  ${guide.learnNext.map(i => `<li>${i}</li>`).join('')}
                </ul>
              </div>
              <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.2);">
                <strong style="color: #ef4444; display: block; margin-bottom: 0.5rem;">🔴 Ignore Until Later:</strong>
                <ul style="margin: 0; padding-left: 1.2rem; color: var(--text-muted);">
                  ${guide.ignoreUntilLater.map(i => `<li>${i}</li>`).join('')}
                </ul>
              </div>
            </div>
          `;
          gridContainer.appendChild(banner);
        }

        // The actual topic Grid
        const grid = document.createElement("div");
        grid.className = "roadmap-grid";
        gridContainer.appendChild(grid);
        
        DOM.dynamicRoadmapContainer.appendChild(gridContainer);
        
        // Event Listener for Tab
        tab.addEventListener("click", () => {
          COURSES.forEach(c => {
            document.getElementById(`grid-${c.id}`).style.display = "none";
            document.getElementById(`tab-${c.id}`).className = "btn btn-secondary btn-sm";
          });
          grid.style.display = "grid";
          tab.className = "btn btn-primary btn-sm";
        });
      });
    }

    // Populate or update the grids
    COURSES.forEach(course => {
      const gridEl = document.getElementById(`grid-${course.id}`);
      if (!gridEl) return;
      gridEl.innerHTML = "";
      
      const courseTopics = TUTORIALS.filter(t => t.courseType === course.id);
      
      courseTopics.forEach((topic, idx) => {
        const isCompleted = state.completedTopics.includes(topic.id);
        let statusText = "Start";
        let statusClass = "roadmap-status start-btn";
        
        if (isCompleted) {
          statusText = "Mastered ✓";
          statusClass = "roadmap-status mastered";
        }
        
        const card = document.createElement("div");
        card.className = "roadmap-card card clickable-roadmap";
        if (isCompleted) card.classList.add("completed");
        card.setAttribute("data-topic", topic.id);
        
        card.innerHTML = `
          <span class="step-num">${(idx + 1).toString().padStart(2, '0')}</span>
          <h5>${topic.title.replace(/^[0-9.]+\s*/, '')}</h5>
          <p>${topic.category}</p>
          <span class="${statusClass}">${statusText}</span>
        `;
        
        card.addEventListener("click", () => {
          // Check if previous topic is completed
          const globalTopicIndex = TUTORIALS.findIndex(t => t.id === topic.id);
          if (globalTopicIndex === 0 || state.completedTopics.includes(TUTORIALS[globalTopicIndex - 1].id) || state.completedTopics.includes(topic.id)) {
            loadTopic(topic.id);
          } else {
            card.classList.add("shake-locked");
            setTimeout(() => card.classList.remove("shake-locked"), 500);
          }
        });
        
        gridEl.appendChild(card);
      });
    });

    // Re-bind DOM.roadmapCards since they are dynamic now
    DOM.roadmapCards = document.querySelectorAll(".clickable-roadmap");
  }


  // 6. Navigation Routers
  function loadDashboard() {
    buildRoadmap();
    state.currentTopicId = null;
    window.location.hash = "";
    
    // UI toggles
    DOM.dashboardView.style.display = "block";
    DOM.tutorialView.style.display = "none";
    DOM.breadcrumbs.innerHTML = `<span class="breadcrumb-item active">Dashboard</span>`;
    
    buildSidebarTopics();
    updateGlobalProgress();
    updateUserTier();
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function loadTopic(topicId) {
    const topic = TUTORIALS.find(t => t.id === topicId);
    if (!topic) return;

    state.currentTopicId = topicId;
    window.location.hash = topicId;
    
    // UI toggles
    DOM.dashboardView.style.display = "none";
    DOM.tutorialView.style.display = "block";
    
    // Breadcrumbs
    DOM.breadcrumbs.innerHTML = `
      <span class="breadcrumb-item clickable-breadcrumb" id="bc-dashboard">Dashboard</span>
      <span class="breadcrumb-separator"> / </span>
      <span class="breadcrumb-item active">${topic.title}</span>
    `;
    document.getElementById("bc-dashboard").addEventListener("click", loadDashboard);

    // Populate Headers
    DOM.tutTitle.innerText = topic.title;
    DOM.tutDifficulty.innerText = topic.difficulty || "N/A";
    DOM.tutDuration.innerText = topic.duration || "N/A";
    
    const jobHighlightEl = DOM.tutJobHighlight.closest('.job-highlight-tag') || DOM.tutJobHighlight.parentElement;
    if (topic.jobHighlight) {
      DOM.tutJobHighlight.innerText = topic.jobHighlight;
      jobHighlightEl.style.display = "";
    } else {
      jobHighlightEl.style.display = "none";
    }

    // Populate contents
    DOM.tutAnalogyContainer.innerHTML = topic.analogy || "";
    
    // --- DYNAMIC VISUAL DIAGRAM GENERATOR ---
    let mermaidDef = "";
    if (topic.courseType === "MATH") {
      mermaidDef = `graph LR
        A[(Raw Data)] --> B{Pandas DataFrame}
        B -->|Filter/Clean| C[Vectorized Ops]
        C --> D((Matrix Multiplication))`;
    } else if (topic.courseType === "ML") {
      mermaidDef = `graph TD
        A[Dataset] --> B{Pre-Processing}
        B -->|Train Set 80%| C[Model Training]
        B -->|Test Set 20%| D[Model Evaluation]
        C --> E((Trained Model))
        D --> E`;
    } else if (topic.courseType === "DL") {
      mermaidDef = `graph LR
        I1((Input X1)) --> H1((Hidden 1))
        I2((Input X2)) --> H1
        I1 --> H2((Hidden 2))
        I2 --> H2
        H1 --> O1((Output Y))
        H2 --> O1`;
    } else if (topic.courseType === "NLP_CV") {
      mermaidDef = `graph LR
        A[Raw Text/Image] --> B[Tokenization/Resizing]
        B --> C[Feature Extraction (CNN/Embeddings)]
        C --> D{Classification/Detection}`;
    } else if (topic.courseType === "AI" || topic.courseType === "PROJECTS") {
      mermaidDef = `graph TD
        User((User)) --> A[Agent Workflow]
        A -->|Thought| B{Decision Logic}
        B -->|Action| C[External Tool/API]
        C -->|Observation| A
        A --> D[Final Response]`;
    } else if (topic.courseType === "RAG") {
      mermaidDef = `graph TD
        A[PDF Document] --> B[Semantic Chunking]
        B --> C[Embedding Model]
        C --> D[(Vector DB)]
        E[User Query] --> C
        D -->|Top K Results| F[LLM Prompt]
        F --> G((Final Answer))`;
    } else if (topic.courseType === "MCP") {
      mermaidDef = `sequenceDiagram
        participant Client as LLM/Claude
        participant Server as MCP Server
        Client->>Server: tools/list
        Server-->>Client: Returns JSON Schema
        Client->>Server: tools/call (arguments)
        Server-->>Client: Returns Tool Observation`;
    } else if (topic.courseType === "MLOPS" || topic.courseType === "SD") {
      mermaidDef = `graph LR
        A[Local Code] -->|Git Push| B(CI/CD Pipeline)
        B --> C[Docker Container]
        C --> D{Load Balancer}
        D --> E[Server Node 1]
        D --> F[Server Node 2]
        E --> G[(Database Cluster)]`;
    }

    let visualSection = "";
    if (mermaidDef) {
      visualSection = `
        <div style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; text-align: center;">
          <h4 style="color: #0ea5e9; margin-top: 0;">📊 Architecture Flow</h4>
          <div class="mermaid" style="font-size: 14px;">
            ${mermaidDef}
          </div>
        </div>
      `;
    }

    const rawConcept = topic.concept || "No conceptual text provided.";
    
    // DYNAMIC 7-SECTION FORMAT OR LEGACY FALLBACK
    if (topic.overview) {
      // It's the new advanced 7-section format
      let html = `<div class="sec7-container">`;
      
      // SECTION 1: Overview
      html += `
        <div class="sec7-section">
          <h3 class="sec7-title">🗺️ Section 1: Topic Overview</h3>
          <div class="sec7-text">${topic.overview}</div>
          ${visualSection}
        </div>
      `;
      
      // SECTION 2: Core Concept
      if (topic.coreConcept) {
        html += `
          <div class="sec7-section">
            <h3 class="sec7-title">🎬 Section 2: Core Concept & Animation</h3>
            <div class="sec7-text">${topic.coreConcept}</div>
          </div>
        `;
      }
      
      // SECTION 3: Examples
      if (topic.realTimeExamples && topic.realTimeExamples.length > 0) {
        let rows = topic.realTimeExamples.map((ex, i) => `
          <tr>
            <td>${i+1}</td>
            <td><strong>${ex.subTopic}</strong><br><span style="font-size:0.8rem">${ex.description}</span></td>
            <td>${ex.scenario}</td>
            <td><span class="badge" style="background:rgba(255,255,255,0.1);">${ex.industry}</span></td>
          </tr>
        `).join('');
        html += `
          <div class="sec7-section">
            <h3 class="sec7-title">📋 Section 3: Real-Time Examples</h3>
            <table class="sec7-table">
              <thead><tr><th>#</th><th>Sub-Topic</th><th>Real-World Scenario</th><th>Industry</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        `;
      }
      
      // SECTION 4: Problem Solving
      if (topic.problemSolving && topic.problemSolving.length > 0) {
        let psHtml = topic.problemSolving.map(ps => `
          <div style="margin-bottom: 1.5rem;">
            <p><strong>Scenario:</strong> ${ps.scenario}</p>
            <div class="sec7-problem-box">
              <div class="sec7-problem-side sec7-wrong">
                <h4 style="margin:0; color:#ef4444;">❌ Wrong Approach</h4>
                <p style="font-size:0.9rem; margin-top:0.5rem;">${ps.wrong}</p>
              </div>
              <div class="sec7-problem-side sec7-correct">
                <h4 style="margin:0; color:#10b981;">✅ Correct Approach</h4>
                <p style="font-size:0.9rem; margin-top:0.5rem;">${ps.correct}</p>
              </div>
            </div>
            <div style="margin-top: 0.5rem; font-size: 0.9rem;">
              <strong>Step-by-Step Solution:</strong><br>${ps.steps}
            </div>
          </div>
        `).join('');
        html += `
          <div class="sec7-section">
            <h3 class="sec7-title">🔧 Section 4: Real-Time Problem Solving</h3>
            ${psHtml}
          </div>
        `;
      }
      
      // SECTION 5: Exercises
      if (topic.exercises) {
        html += `
          <div class="sec7-section">
            <h3 class="sec7-title">🧪 Section 5: Hands-On Exercises</h3>
            ${topic.exercises.beginner ? `<div class="sec7-exercise-box sec7-ex-beginner"><strong>🟢 Beginner:</strong> ${topic.exercises.beginner}</div>` : ''}
            ${topic.exercises.intermediate ? `<div class="sec7-exercise-box sec7-ex-intermediate"><strong>🟡 Intermediate:</strong> ${topic.exercises.intermediate}</div>` : ''}
            ${topic.exercises.advanced ? `<div class="sec7-exercise-box sec7-ex-advanced"><strong>🔴 Advanced:</strong> ${topic.exercises.advanced}</div>` : ''}
          </div>
        `;
      }
      
      // SECTION 6: Memory Tricks
      if (topic.memoryTricks) {
        html += `
          <div class="sec7-section">
            <h3 class="sec7-title">🧠 Section 6: Memory Tricks</h3>
            <div class="sec7-text">${topic.memoryTricks}</div>
          </div>
        `;
      }
      
      // SECTION 7: Recap
      if (topic.recap) {
        html += `
          <div class="sec7-section">
            <h3 class="sec7-title">✅ Section 7: Quick Recap</h3>
            <div class="sec7-text">${topic.recap}</div>
          </div>
        `;
      }
      
      
      // SECTION 8: Code & GIF Output
      if (topic.code) {
        let simOutput = "[Process Started]\nLoading dependencies...\nModel initialized.\nTraining Step 1/10... Loss: 0.89\nTraining Step 5/10... Loss: 0.45\nTraining Step 10/10... Loss: 0.12\n[Success] Execution Complete.";
        if (topic.courseType === "MATH") simOutput = "Index | A | B\n0     | 1 | 5\n1     | 2 | 6\n2     | 3 | 7\n[Success] DataFrame Processed.";
        if (topic.courseType === "ML") simOutput = "Loading data...\nTraining model...\nAccuracy: 95.4%\n[Success] Model Exported.";
        if (topic.courseType === "DL") simOutput = "Epoch 1/10\n32/32 [======] - 2s 15ms/step - loss: 0.69 - accuracy: 0.50\nEpoch 10/10\n32/32 [======] - 1s 14ms/step - loss: 0.10 - accuracy: 0.98\n[Success] Brain Trained.";
        
        html += `
          <div class="sec7-section">
            <h3 class="sec7-title">💻 Section 8: Code Implementation & Animated Output</h3>
            <div class="sec8-code-container">
              <div class="sec8-code-block">${highlightCode(topic.code)}</div>
              
              <h4 style="margin: 1rem 0 0.5rem 0; color:#a5b4fc;">🎥 Live Output Animation (GIF)</h4>
              <div class="sec8-gif-output">
                <div class="sec8-gif-header"><span>Terminal Simulation</span><span>Auto-Replay GIF</span></div>
                <div class="typewriter-text">${simOutput}</div>
              </div>
            </div>
          </div>
        `;
      }

      html += `</div>`;

      DOM.tutConceptContainer.innerHTML = html;
      
    } else {
      // Legacy Format Fallback
      DOM.tutConceptContainer.innerHTML = `
        ${visualSection}
        <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #6366f1; margin-bottom: 2rem;">
          <h4 style="margin-top: 0; color: #a5b4fc;">📖 Core Concept</h4>
          <div style="margin-top: 1rem; font-size: 0.95rem; line-height: 1.6; color: var(--text-color);">
            ${rawConcept}
          </div>
        </div>
      `;
    }


    // Render Mermaid diagrams dynamically
    if (window.mermaid) {
      setTimeout(() => {
        mermaid.init(undefined, document.querySelectorAll('.mermaid'));
      }, 100);
    }
    
    const mathDetailsEl = document.querySelector(".math-details");
    if (topic.math) {
      DOM.tutMathContainer.innerHTML = topic.math;
      if (mathDetailsEl) mathDetailsEl.style.display = "block";
    } else {
      if (mathDetailsEl) mathDetailsEl.style.display = "none";
    }

    if (DOM.tutCodeContainer && topic.code) {
      // Basic raw code fallback
      DOM.tutCodeContainer.innerText = topic.code.trim();
      
      // --- DYNAMIC INTERACTIVE WALKTHROUGH GENERATOR ---
      const rawCode = topic.code.trim();
      
      // 1. Infer Libraries & Setup
      let setupCmd = "pip install ";
      let frameworks = [];
      if (rawCode.includes("torch")) { setupCmd += "torch torchvision "; frameworks.push("PyTorch"); }
      if (rawCode.includes("tensorflow") || rawCode.includes("keras")) { setupCmd += "tensorflow "; frameworks.push("TensorFlow/Keras"); }
      if (rawCode.includes("sklearn")) { setupCmd += "scikit-learn "; frameworks.push("Scikit-Learn"); }
      if (rawCode.includes("pandas")) { setupCmd += "pandas numpy "; frameworks.push("Pandas & NumPy"); }
      if (rawCode.includes("transformers")) { setupCmd += "transformers datasets "; frameworks.push("Hugging Face Transformers"); }
      if (rawCode.includes("langchain")) { setupCmd += "langchain "; frameworks.push("LangChain"); }
      if (rawCode.includes("cv2")) { setupCmd += "opencv-python "; frameworks.push("OpenCV"); }
      if (setupCmd === "pip install ") { setupCmd = "npm install express cors"; frameworks.push("Node.js Core"); }

      // 2. Infer Best Practices
      let practices = "Focus on clean code, modular design, and robust error handling.";
      if (topic.courseType === "DL" || topic.courseType === "ML") practices = "Always scale your features (StandardScaler) before training. Prevent data leakage by splitting train/test sets BEFORE preprocessing. Monitor for overfitting using a validation set.";
      if (topic.courseType === "AI" || topic.courseType === "RAG") practices = "Log all LLM inputs/outputs. Implement exponential backoff for API rate limits. Ensure strict validation of JSON outputs using Pydantic or similar schemas.";
      if (topic.courseType === "SD" || topic.courseType === "MLOPS") practices = "Containerize all environments using Docker. Implement CI/CD pipelines. Ensure heavy API routes are cached via Redis and massive data processing is offloaded to async queues.";

      // 3. Generate Step-by-Step Code Walkthrough
      let walkthroughHTML = "";
      const lines = rawCode.split('\n');
      let currentStepCode = [];
      let currentStepDesc = "Initialization & Setup";
      
      let stepCount = 1;
      lines.forEach(line => {
        if (line.trim().startsWith("#") || line.trim().startsWith("//")) {
          if (currentStepCode.length > 0) {
            walkthroughHTML += `
              <details style="margin-bottom: 0.5rem; background: rgba(255,255,255,0.05); padding: 0.5rem; border-radius: 6px;">
                <summary style="cursor: pointer; font-weight: bold; color: var(--primary-color);">Step ${stepCount}: ${currentStepDesc}</summary>
                <pre style="margin-top: 0.5rem; font-size: 0.85rem; background: #1e1e1e; padding: 1rem; border-radius: 4px; overflow-x: auto;"><code>${currentStepCode.join('\n').replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
              </details>
            `;
            stepCount++;
            currentStepCode = [];
          }
          currentStepDesc = line.replace(/^[#\/]+\s*/, '').trim();
        } else if (line.trim() !== "") {
          currentStepCode.push(line);
        }
      });
      
      if (currentStepCode.length > 0) {
        walkthroughHTML += `
          <details style="margin-bottom: 0.5rem; background: rgba(255,255,255,0.05); padding: 0.5rem; border-radius: 6px;">
            <summary style="cursor: pointer; font-weight: bold; color: var(--primary-color);">Step ${stepCount}: ${currentStepDesc}</summary>
            <pre style="margin-top: 0.5rem; font-size: 0.85rem; background: #1e1e1e; padding: 1rem; border-radius: 4px; overflow-x: auto;"><code>${currentStepCode.join('\n').replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
          </details>
        `;
      }

      // 4. Inject into DOM
      let enhancedUI = document.getElementById("enhanced-ui-container");
      if (!enhancedUI) {
        enhancedUI = document.createElement("div");
        enhancedUI.id = "enhanced-ui-container";
        // Insert right above the Pyodide/raw code container
        DOM.tutCodeContainer.parentNode.insertBefore(enhancedUI, DOM.tutCodeContainer);
      }

      enhancedUI.innerHTML = `
        <hr style="border-color: rgba(255,255,255,0.1); margin: 2rem 0;">
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          <div style="background: rgba(14, 165, 233, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--primary-color);">
            <h4 style="margin-top: 0; color: var(--primary-color);">🛠️ Development Setup</h4>
            <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">Run this in your terminal:</p>
            <code style="background: #1e1e1e; padding: 0.5rem; border-radius: 4px; display: block; color: #a6e22e; font-family: monospace;">$ ${setupCmd}</code>
          </div>
          <div style="background: rgba(168, 85, 247, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #a855f7;">
            <h4 style="margin-top: 0; color: #a855f7;">📚 Core Frameworks Used</h4>
            <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.9rem;">
              ${frameworks.map(f => `<li><strong>${f}</strong></li>`).join('')}
            </ul>
          </div>
        </div>

        <div style="background: rgba(34, 197, 94, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #22c55e; margin-bottom: 2rem;">
          <h4 style="margin-top: 0; color: #22c55e;">✨ Industry Best Practices & Usage</h4>
          <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">${practices}</p>
        </div>

        <h3 style="color: var(--primary-color); margin-top: 2rem;">🧑‍🏫 Interactive Code Walkthrough</h3>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">Click the steps below to reveal and understand the code line-by-line.</p>
        <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 2rem;">
          ${walkthroughHTML}
        </div>
      `;
    } else {
      let enhancedUI = document.getElementById("enhanced-ui-container");
      if (enhancedUI) enhancedUI.innerHTML = "";
    }
    if (DOM.tutConsoleOutput && state.pyodideInstance) {
      DOM.tutConsoleOutput.innerText = "Ready to run code. Click 'Run Code'.";
    }
    
    const interviewSectionEl = document.querySelector(".interview-section");
    if (topic.interview && topic.interview.question) {
      DOM.tutInterviewQuestion.innerText = topic.interview.question;
      DOM.tutInterviewAnswer.innerText = topic.interview.answer;
      if (interviewSectionEl) interviewSectionEl.style.display = "block";
    } else {
      if (interviewSectionEl) interviewSectionEl.style.display = "none";
    }

    // Hide reveal answer panel initially
    DOM.tutInterviewAnswer.style.display = "none";
    DOM.revealInterviewBtn.style.display = "block";

    // Setup Sidebar active items
    buildSidebarTopics();

    // Reset details drawer
    const details = document.querySelector(".math-details");
    if (details) details.removeAttribute("open");

    // Initialize Quiz & Simulator
    setupQuiz(topic);
    mountSimulator(topic);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- PYODIDE INITIALIZATION & EXECUTION ---
  async function initPyodide() {
    if (state.isPyodideLoading || state.pyodideInstance) return;
    state.isPyodideLoading = true;
    try {
      if (DOM.tutConsoleOutput) DOM.tutConsoleOutput.innerText = "Loading Pyodide environment... Please wait.";
      state.pyodideInstance = await loadPyodide({
        stdout: (text) => {
          if (DOM.tutConsoleOutput) DOM.tutConsoleOutput.innerText += text + "\\n";
        },
        stderr: (text) => {
          if (DOM.tutConsoleOutput) DOM.tutConsoleOutput.innerText += "[ERROR] " + text + "\\n";
        }
      });
      await state.pyodideInstance.loadPackage("micropip");
      const micropip = state.pyodideInstance.pyimport("micropip");
      if (DOM.tutConsoleOutput) DOM.tutConsoleOutput.innerText = "Installing core ML packages (numpy, scikit-learn). This may take a minute...\\n";
      await micropip.install('scikit-learn');
      if (DOM.tutConsoleOutput) DOM.tutConsoleOutput.innerText = "Pyodide Environment Ready! 🚀\\n\\n";
    } catch (err) {
      if (DOM.tutConsoleOutput) DOM.tutConsoleOutput.innerText = "Failed to load Pyodide: " + err;
      console.error(err);
    }
  }

  // 7. Event Handlers & Core Interactions
  function setupEventListeners() {
    // Mobile Navigation triggers
    DOM.mobileMenuBtn.addEventListener("click", () => {
      DOM.sidebar.classList.add("mobile-open");
    });

    DOM.mobileCloseBtn.addEventListener("click", () => {
      DOM.sidebar.classList.remove("mobile-open");
    });

    // Theme Toggle
    DOM.themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-theme");
      if (isDark) {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        localStorage.setItem("aether-theme", "light");
        toggleThemeIcons(true);
      } else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        localStorage.setItem("aether-theme", "dark");
        toggleThemeIcons(false);
      }
    });

    // Copy Code Block Button
    if (DOM.copyCodeBtn) {
      DOM.copyCodeBtn.addEventListener("click", () => {
        const code = DOM.tutCodeContainer ? DOM.tutCodeContainer.innerText : (DOM.tutCodeEditor ? DOM.tutCodeEditor.value : "");
        navigator.clipboard.writeText(code).then(() => {
          const originalText = DOM.copyCodeBtn.innerHTML;
          DOM.copyCodeBtn.innerHTML = "✓ Copied!";
          setTimeout(() => {
            DOM.copyCodeBtn.innerHTML = originalText;
          }, 2000);
        });
      });
    }

    // Run Code Button (Pyodide Execution)
    if (DOM.runCodeBtn) {
      DOM.runCodeBtn.addEventListener("click", async () => {
        if (!state.pyodideInstance) {
          DOM.tutConsoleOutput.innerText = "Environment still loading, please wait...";
          return;
        }
        
        DOM.tutConsoleOutput.innerText = "Running...\\n\\n";
        const code = DOM.tutCodeEditor.value;
        try {
          // Clear any previous plt.show() outputs if matplotlib was used (optional, but good practice)
          await state.pyodideInstance.runPythonAsync(code);
        } catch (err) {
          DOM.tutConsoleOutput.innerText += "\\n\\n[RUNTIME ERROR]:\\n" + err;
        }
      });
    }

    // Interview Prep Reveal
    DOM.revealInterviewBtn.addEventListener("click", () => {
      DOM.tutInterviewAnswer.style.display = "block";
      DOM.revealInterviewBtn.style.display = "none";
    });

    // Homepage dashboard Start Learning Action
    DOM.startLearningBtn.addEventListener("click", () => {
      loadTopic(TUTORIALS[0].id);
    });

    // Roadmap click handlers are now bound in buildRoadmap()
  }

  function toggleThemeIcons(isLight) {
    const sun = DOM.themeToggle.querySelector(".sun-icon");
    const moon = DOM.themeToggle.querySelector(".moon-icon");
    if (isLight) {
      sun.style.display = "none";
      moon.style.display = "block";
    } else {
      sun.style.display = "block";
      moon.style.display = "none";
    }
  }

  function handleScrollProgressFallback() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const pct = scrollable > 0 ? (scrolled / scrollable) : 0;
    DOM.scrollProgress.style.transform = `scaleX(${pct})`;
  }

  // 8. Quiz Engine
  function setupQuiz(topic) {
    state.quizAnswers = {};
    DOM.quizResultsCard.style.display = "none";
    DOM.quizContainer.innerHTML = "";
    
    const quizSectionEl = document.querySelector(".quiz-section");
    
    if (!topic.quiz || topic.quiz.length === 0) {
      if (quizSectionEl) quizSectionEl.style.display = "none";
      return;
    }
    if (quizSectionEl) quizSectionEl.style.display = "block";

    topic.quiz.forEach((q, qIndex) => {
      const qCard = document.createElement("div");
      qCard.className = "quiz-card";
      
      const optionsHtml = q.options.map((opt, oIndex) => `
        <button class="quiz-option" data-q="${qIndex}" data-opt="${oIndex}">
          ${opt}
        </button>
      `).join("");

      qCard.innerHTML = `
        <div class="quiz-q-text">Q${qIndex + 1}: ${q.question}</div>
        <div class="quiz-options">
          ${optionsHtml}
        </div>
        <div class="quiz-explanation" id="exp-${qIndex}" style="display: none;"></div>
      `;

      DOM.quizContainer.appendChild(qCard);
    });

    // Attach click listeners to options
    const optionBtns = DOM.quizContainer.querySelectorAll(".quiz-option");
    optionBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const qIndex = parseInt(btn.getAttribute("data-q"));
        const optIndex = parseInt(btn.getAttribute("data-opt"));
        handleQuizSubmit(qIndex, optIndex, topic);
      });
    });
  }

  function handleQuizSubmit(qIndex, selectedOpt, topic) {
    if (state.quizAnswers[qIndex] !== undefined) return; // Prevent double answer submission

    state.quizAnswers[qIndex] = selectedOpt;
    const correctOpt = topic.quiz[qIndex].answer;
    const explanationEl = document.getElementById(`exp-${qIndex}`);

    // Highlight selected button
    const siblings = DOM.quizContainer.querySelectorAll(`.quiz-option[data-q="${qIndex}"]`);
    siblings.forEach(sib => {
      const oIndex = parseInt(sib.getAttribute("data-opt"));
      if (oIndex === correctOpt) {
        sib.classList.add("correct");
      } else if (oIndex === selectedOpt) {
        sib.classList.add("incorrect");
      } else {
        sib.classList.add("disabled");
      }
    });

    // Reveal explanation with beautiful micro-animation
    explanationEl.innerHTML = `<strong>${selectedOpt === correctOpt ? "Correct!" : "Keep Trying!"}</strong> ${topic.quiz[qIndex].explanation}`;
    explanationEl.style.display = "block";
    explanationEl.style.opacity = "0";
    setTimeout(() => {
      explanationEl.style.transition = "opacity 0.4s ease";
      explanationEl.style.opacity = "1";
    }, 50);

    // Check if the whole quiz was completed successfully
    const totalQuestions = topic.quiz.length;
    const answeredCount = Object.keys(state.quizAnswers).length;

    if (answeredCount === totalQuestions) {
      let score = 0;
      for (let i = 0; i < totalQuestions; i++) {
        if (state.quizAnswers[i] === topic.quiz[i].answer) score++;
      }

      if (score === totalQuestions) {
        // High score! Complete the module!
        markTopicComplete(topic.id);
        
        // Show proceed buttons
        DOM.quizResultsCard.style.display = "block";
        DOM.quizResultsCard.scrollIntoView({ behavior: "smooth", block: "nearest" });

        // Bind next lesson navigator
        const topicIndex = TUTORIALS.findIndex(t => t.id === topic.id);
        if (topicIndex < TUTORIALS.length - 1) {
          DOM.nextLessonNavBtn.innerText = `Proceed to Lesson: ${TUTORIALS[topicIndex + 1].title}`;
          DOM.nextLessonNavBtn.onclick = () => {
            loadTopic(TUTORIALS[topicIndex + 1].id);
          };
        } else {
          DOM.nextLessonNavBtn.innerText = "Congratulations! Back to Dashboard";
          DOM.nextLessonNavBtn.onclick = () => {
            loadDashboard();
          };
        }
      } else {
        // Did not pass all questions, offer a reset
        const resetBtn = document.createElement("button");
        resetBtn.className = "btn btn-secondary btn-medium";
        resetBtn.style.marginTop = "20px";
        resetBtn.innerText = "Retry Quiz Checkpoint";
        resetBtn.onclick = () => {
          setupQuiz(topic);
        };
        DOM.quizContainer.appendChild(resetBtn);
      }
    }
  }

  // 9. Simulator Mount Dispatcher & Universal Sandboxes
  function mountSimulator(topic) {
    DOM.simulatorMount.innerHTML = "";
    
    // If it has a custom hardcoded simulator, use it
    if (topic.hasSimulator) {
      switch (topic.hasSimulator) {
        case "ml-types-sim": mountMLTypesSim(); return;
        case "linear-reg-sim": mountLinearRegressionSim(); return;
        case "logistic-reg-sim": mountLogisticRegressionSim(); return;
        case "eval-metrics-sim": mountEvalMetricsSim(); return;
        case "decision-tree-sim": mountDecisionTreeSim(); return;
        case "ensemble-sim": mountEnsembleSim(); return;
        case "model-eval-sim": mountModelEvalSim(); return;
        case "data-prep-sim": mountDataPrepSim(); return;
        case "git-sim": mountGitSim(); return;
        case "adaboost-sim": mountAdaBoostSim(); return;
        // SD simulators
        case "scaling-sim": mountScalingSim(); return;
        case "load-balancer-sim": mountLoadBalancerSim(); return;
        case "caching-sim": mountCachingSim(); return;
        case "database-sim": mountDatabaseSim(); return;
        case "message-queue-sim": mountMessageQueueSim(); return;
        case "microservices-sim": mountMicroservicesSim(); return;
        case "cap-theorem-sim": mountCapTheoremSim(); return;
        case "cdn-sim": mountCdnSim(); return;
      }
    }
    
    // Otherwise, mount a UNIVERSAL SANDBOX based on courseType!
    mountUniversalSandbox(topic);
  }

  function mountUniversalSandbox(topic) {
    const cType = topic.courseType;
    let html = "";
    
    if (cType === "MATH" || cType === "ML" || cType === "DL") {
      // MATH / ML Plotter Sandbox
      html = `
        <div class="univ-sandbox-container">
          <div class="univ-sandbox-header">
            <span>📈 Interactive Data Sandbox (${topic.title})</span>
            <button id="univ-math-btn" class="btn btn-primary" style="padding: 4px 12px; font-size:0.8rem;">Run Algorithm</button>
          </div>
          <div class="univ-math-canvas" id="univ-math-canvas">
            <!-- Dynamic dots and line will be injected here -->
          </div>
          <p style="font-size:0.8rem; color:#9ca3af; margin-top:8px;">Click anywhere on the canvas to add data points, then run the algorithm to find the line of best fit!</p>
        </div>
      `;
      DOM.simulatorMount.innerHTML = html;
      
      const canvas = document.getElementById("univ-math-canvas");
      const btn = document.getElementById("univ-math-btn");
      
      canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dot = document.createElement("div");
        dot.className = "univ-math-dot";
        dot.style.left = x + "px";
        dot.style.top = y + "px";
        canvas.appendChild(dot);
      });
      
      btn.addEventListener("click", () => {
        // Remove existing lines
        const existingLines = canvas.querySelectorAll('.univ-math-line');
        existingLines.forEach(l => l.remove());
        
        const line = document.createElement("div");
        line.className = "univ-math-line";
        line.style.width = "0%";
        line.style.top = "50%";
        line.style.left = "0px";
        canvas.appendChild(line);
        
        // Animate line
        setTimeout(() => {
          line.style.width = "100%";
          line.style.transform = "rotate(" + (Math.random() * 40 - 20) + "deg)";
        }, 50);
      });
      
    } else if (cType === "SD" || cType === "MLOPS" || cType === "PROJECTS") {
      // ARCHITECTURE Sandbox
      html = `
        <div class="univ-sandbox-container">
          <div class="univ-sandbox-header">
            <span>🌐 Architecture Sandbox (${topic.title})</span>
            <button id="univ-arch-btn" class="btn btn-primary" style="padding: 4px 12px; font-size:0.8rem;">Simulate Traffic</button>
          </div>
          <div class="univ-arch-canvas" id="univ-arch-canvas">
            <div class="univ-arch-node">Client</div>
            <div class="univ-arch-node" style="border-color:#3b82f6;">API / LB</div>
            <div class="univ-arch-node" style="border-color:#10b981;">Database</div>
          </div>
          <p style="font-size:0.8rem; color:#9ca3af; margin-top:8px;">Click 'Simulate Traffic' to watch data packets flow through the generic architecture.</p>
        </div>
      `;
      DOM.simulatorMount.innerHTML = html;
      
      document.getElementById("univ-arch-btn").addEventListener("click", () => {
        const canvas = document.getElementById("univ-arch-canvas");
        for(let i=0; i<5; i++) {
          setTimeout(() => {
            const packet = document.createElement("div");
            packet.className = "univ-arch-packet";
            packet.style.top = (Math.random() * 40 + 80) + "px";
            packet.style.animation = "packetFlow 2s linear forwards";
            canvas.appendChild(packet);
            setTimeout(() => packet.remove(), 2000);
          }, i * 300);
        }
      });
      
    } else if (cType === "AI" || cType === "RAG" || cType === "MCP") {
      // NLP / GENAI Tokenizer Sandbox
      html = `
        <div class="univ-sandbox-container">
          <div class="univ-sandbox-header">
            <span>🧠 LLM Tokenization Sandbox (${topic.title})</span>
          </div>
          <div class="univ-nlp-container">
            <input type="text" id="univ-nlp-input" class="univ-nlp-input" placeholder="Type a sentence here to tokenize it..." value="Machine Learning is fascinating!">
            <button id="univ-nlp-btn" class="btn btn-primary" style="width: 100%; margin-bottom: 1rem;">Tokenize & Embed</button>
            <div class="univ-nlp-tokens" id="univ-nlp-tokens"></div>
          </div>
        </div>
      `;
      DOM.simulatorMount.innerHTML = html;
      
      document.getElementById("univ-nlp-btn").addEventListener("click", () => {
        const input = document.getElementById("univ-nlp-input").value;
        const container = document.getElementById("univ-nlp-tokens");
        container.innerHTML = "";
        
        // Simple mock tokenizer (split by spaces/punctuation)
        const tokens = input.match(/\w+|\s+|[^\s\w]+/g) || [];
        tokens.forEach((t, i) => {
          if (t.trim() === "") return;
          setTimeout(() => {
            const tokDiv = document.createElement("div");
            tokDiv.className = "univ-nlp-token";
            tokDiv.innerHTML = `${t}<br><span class="univ-nlp-vector">[0.${Math.floor(Math.random()*99)}, ...]</span>`;
            container.appendChild(tokDiv);
          }, i * 150);
        });
      });
      
    } else if (cType === "NLP_CV") {
      // CV Pixel Canvas Sandbox
      html = `
        <div class="univ-sandbox-container">
          <div class="univ-sandbox-header">
            <span>👁️ Computer Vision Sandbox (${topic.title})</span>
            <button id="univ-cv-btn" class="btn btn-primary" style="padding: 4px 12px; font-size:0.8rem;">Apply Convolution</button>
          </div>
          <div class="univ-cv-canvas" id="univ-cv-canvas">
            <div class="univ-cv-filter" id="univ-cv-filter"></div>
          </div>
          <p style="font-size:0.8rem; color:#9ca3af; margin-top:8px; text-align:center;">Click pixels to draw. Run convolution to see how CNN filters scan images.</p>
        </div>
      `;
      DOM.simulatorMount.innerHTML = html;
      
      const canvas = document.getElementById("univ-cv-canvas");
      // Add 100 pixels
      for(let i=0; i<100; i++) {
        const p = document.createElement("div");
        p.className = "univ-cv-pixel";
        p.addEventListener("mousedown", () => p.classList.toggle("active"));
        p.addEventListener("mouseenter", (e) => { if(e.buttons === 1) p.classList.add("active"); });
        canvas.appendChild(p);
      }
      
      document.getElementById("univ-cv-btn").addEventListener("click", () => {
        const filter = document.getElementById("univ-cv-filter");
        filter.style.opacity = "1";
        filter.style.top = "0px";
        filter.style.left = "0px";
        
        let step = 0;
        const interval = setInterval(() => {
          if (step >= 64) {
            clearInterval(interval);
            filter.style.opacity = "0";
            return;
          }
          const row = Math.floor(step / 8);
          const col = step % 8;
          filter.style.top = (row * 20) + "px";
          filter.style.left = (col * 20) + "px";
          step++;
        }, 50);
      });
    }
  }

  function mountMLTypesSim() {
    DOM.simulatorMount.innerHTML = `
      <div class="pipeline-sim-frame">
        <h5 style="text-transform: uppercase; font-size: 12px; color: var(--text-muted);">Interactive Game: Drag the cards to their correct ML category!</h5>
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
          <div class="pipeline-source-panel" id="ml-cards" style="flex: 1; min-width: 250px;">
            <h5>📋 Learning Tasks</h5>
            <div class="pipeline-item" draggable="true" id="card-1" data-cat="supervised">Predict tomorrow's rain score (Regression)</div>
            <div class="pipeline-item" draggable="true" id="card-2" data-cat="unsupervised">Find customer purchasing groups (Clustering)</div>
            <div class="pipeline-item" draggable="true" id="card-3" data-cat="reinforcement">Teach robotic arm to catch a ball (Trial & Error)</div>
            <div class="pipeline-item" draggable="true" id="card-4" data-cat="supervised">Classify MRI scan as healthy/unhealthy</div>
          </div>
          
          <div style="flex: 1.5; display: flex; flex-direction: column; gap: 12px;">
            <div class="pipeline-target-panel" id="cat-supervised" style="min-height: 80px; padding: 12px;">
              <h5 style="color: var(--color-primary);">🏷️ Supervised Learning (Labeled Data)</h5>
            </div>
            <div class="pipeline-target-panel" id="cat-unsupervised" style="min-height: 80px; padding: 12px;">
              <h5 style="color: var(--color-accent);">🔍 Unsupervised Learning (Self-Discovery)</h5>
            </div>
            <div class="pipeline-target-panel" id="cat-reinforcement" style="min-height: 80px; padding: 12px;">
              <h5 style="color: var(--color-secondary);">🎮 Reinforcement Learning (Rewards)</h5>
            </div>
          </div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
          <button class="btn btn-primary btn-medium" id="check-ml-types">Verify Classification</button>
          <div id="ml-types-feedback" style="font-size: 13px; font-weight: 600;"></div>
        </div>
      </div>
    `;

    // Make elements draggable
    const items = DOM.simulatorMount.querySelectorAll(".pipeline-item");
    const dropzones = DOM.simulatorMount.querySelectorAll(".pipeline-target-panel, .pipeline-source-panel");

    items.forEach(item => {
      item.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", item.id);
      });
    });

    dropzones.forEach(zone => {
      zone.addEventListener("dragover", (e) => e.preventDefault());
      zone.addEventListener("drop", (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text");
        const dragged = document.getElementById(id);
        if (dragged) zone.appendChild(dragged);
      });
    });

    document.getElementById("check-ml-types").addEventListener("click", () => {
      const supZone = document.getElementById("cat-supervised");
      const unsupZone = document.getElementById("cat-unsupervised");
      const reinZone = document.getElementById("cat-reinforcement");
      const feedback = document.getElementById("ml-types-feedback");

      let correct = true;
      
      // Verify Supervised Zone
      supZone.querySelectorAll(".pipeline-item").forEach(item => {
        if (item.getAttribute("data-cat") !== "supervised") correct = false;
      });
      // Verify Unsupervised
      unsupZone.querySelectorAll(".pipeline-item").forEach(item => {
        if (item.getAttribute("data-cat") !== "unsupervised") correct = false;
      });
      // Verify Reinforcement
      reinZone.querySelectorAll(".pipeline-item").forEach(item => {
        if (item.getAttribute("data-cat") !== "reinforcement") correct = false;
      });

      // Verify nothing is left in the draft panel
      if (document.getElementById("ml-cards").querySelectorAll(".pipeline-item").length > 0) {
        correct = false;
        feedback.innerHTML = `<span style="color: var(--color-warning);">Please categorize all tasks first!</span>`;
        return;
      }

      if (correct) {
        feedback.innerHTML = `<span style="color: var(--color-success);">🎯 Brilliant! 100% Correct. You understand the types of ML!</span>`;
      } else {
        feedback.innerHTML = `<span style="color: var(--color-danger);">❌ Some tasks are sorted incorrectly. Give it another try!</span>`;
      }
    });
  }

  /* ==========================================================================
     SIMULATOR 2: LINEAR REGRESSION LEAST SQUARES CANVAS
     ========================================================================== */
  function mountLinearRegressionSim() {
    DOM.simulatorMount.innerHTML = `
      <div class="canvas-sim-container">
        <div class="sim-controls">
          <div class="sim-label-group">
            <span>Points: <strong id="lr-pts-cnt">0</strong></span>
            <span>Formula: <strong>y = <span id="lr-slope">0.00</span>x + <span id="lr-intercept">0</span></strong></span>
            <span>Error (MSE): <strong id="lr-mse" style="color: var(--color-danger);">0.00</strong></span>
          </div>
          <button class="btn btn-secondary btn-medium" id="lr-clear-btn">Clear Canvas</button>
        </div>
        <div class="canvas-wrapper">
          <canvas id="lr-canvas"></canvas>
          <div class="canvas-hint" id="lr-hint">Click inside this graph to add data points!</div>
        </div>
      </div>
    `;

    const canvas = document.getElementById("lr-canvas");
    const ctx = canvas.getContext("2d");
    const clearBtn = document.getElementById("lr-clear-btn");
    const ptsCntEl = document.getElementById("lr-pts-cnt");
    const slopeEl = document.getElementById("lr-slope");
    const interceptEl = document.getElementById("lr-intercept");
    const mseEl = document.getElementById("lr-mse");
    const hintEl = document.getElementById("lr-hint");

    let points = [];

    // Resize canvas
    function resize() {
      const rect = canvas.parentNode.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      draw();
    }

    // Least Squares calculation
    function calculateRegression() {
      if (points.length < 2) {
        slopeEl.innerText = "0.00";
        interceptEl.innerText = "0";
        mseEl.innerText = "0.00";
        return null;
      }

      let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
      const n = points.length;

      points.forEach(p => {
        sumX += p.x;
        sumY += p.y;
        sumXY += p.x * p.y;
        sumXX += p.x * p.x;
      });

      const meanX = sumX / n;
      const meanY = sumY / n;

      let num = sumXY - n * meanX * meanY;
      let den = sumXX - n * meanX * meanX;

      let m = den === 0 ? 0 : num / den;
      let c = meanY - m * meanX;

      // Calculate MSE
      let totalSqError = 0;
      points.forEach(p => {
        const predY = m * p.x + c;
        totalSqError += Math.pow(p.y - predY, 2);
      });
      const mse = totalSqError / n;

      // Render formulas (flip Y screen coordinates to normal Cartesian for neatness)
      // Height scale is usually 0 to canvas.height. Let's make it look mathematically standard
      const scaledSlope = -m; 
      const scaledIntercept = canvas.height - c;

      slopeEl.innerText = scaledSlope.toFixed(2);
      interceptEl.innerText = Math.round(scaledIntercept);
      mseEl.innerText = mse.toFixed(0);

      return { m, c };
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines
      ctx.strokeStyle = document.body.classList.contains("light-theme") ? "rgba(0,0,0,0.05)" : "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      const grid = 40;
      for (let x = 0; x < canvas.width; x += grid) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += grid) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Draw points
      points.forEach(p => {
        ctx.fillStyle = "var(--color-secondary)";
        ctx.shadowColor = "rgba(219, 39, 119, 0.5)";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Regression line
      const fit = calculateRegression();
      if (fit) {
        ctx.strokeStyle = "var(--color-accent)";
        ctx.lineWidth = 3;
        ctx.shadowColor = "rgba(6, 182, 212, 0.5)";
        ctx.shadowBlur = 10;
        
        ctx.beginPath();
        ctx.moveTo(0, fit.c);
        ctx.lineTo(canvas.width, fit.m * canvas.width + fit.c);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    canvas.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      points.push({ x, y });
      ptsCntEl.innerText = points.length;
      
      if (points.length > 0) hintEl.style.display = "none";
      draw();
    });

    clearBtn.addEventListener("click", () => {
      points = [];
      ptsCntEl.innerText = "0";
      hintEl.style.display = "block";
      draw();
    });

    // Watch for window resize and DOM mount delays
    setTimeout(resize, 100);
    window.addEventListener("resize", resize);
  }

  /* ==========================================================================
     SIMULATOR 3: LOGISTIC REGRESSION CLASSIFICATION & SLIDERS
     ========================================================================== */
  function mountLogisticRegressionSim() {
    DOM.simulatorMount.innerHTML = `
      <div class="matrix-sim-grid">
        <div class="matrix-controls-panel">
          <h5>⚙️ Sigmoid Controller</h5>
          <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">Adjust the sliders below to manual-tune the boundary weights.</p>
          
          <div class="slider-group">
            <div class="slider-info">
              <span class="slider-lbl">Slope Weight (w)</span>
              <span class="slider-val" id="log-w-val">1.0</span>
            </div>
            <input type="range" class="slider-input" id="log-w" min="-10" max="10" step="0.2" value="1.5">
          </div>

          <div class="slider-group">
            <div class="slider-info">
              <span class="slider-lbl">Bias Intercept (b)</span>
              <span class="slider-val" id="log-b-val">0</span>
            </div>
            <input type="range" class="slider-input" id="log-b" min="-200" max="200" step="5" value="-10">
          </div>

          <div style="border-top: 1px dashed var(--border-color); padding-top: 12px; margin-top: 8px;">
            <div style="font-size: 12px; font-weight: 600; display: flex; justify-content: space-between;">
              <span>Model Accuracy:</span>
              <strong id="log-accuracy" style="color: var(--color-success);">100%</strong>
            </div>
          </div>
        </div>

        <div class="canvas-wrapper" style="aspect-ratio: 1.2 / 1; min-height: 250px;">
          <canvas id="log-canvas"></canvas>
          <div class="canvas-hint" style="background: rgba(0,0,0,0.85); bottom: 10px; font-size: 10px;">
            Red Dots = Class 0 | Blue Dots = Class 1
          </div>
        </div>
      </div>
    `;

    const canvas = document.getElementById("log-canvas");
    const ctx = canvas.getContext("2d");
    const sliderW = document.getElementById("log-w");
    const sliderB = document.getElementById("log-b");
    const valW = document.getElementById("log-w-val");
    const valB = document.getElementById("log-b-val");
    const accuracyEl = document.getElementById("log-accuracy");

    // Static custom points representing two clusters
    const dataPoints = [
      { x: 50, y: 180, class: 0 },
      { x: 90, y: 220, class: 0 },
      { x: 120, y: 150, class: 0 },
      { x: 60, y: 120, class: 0 },
      
      { x: 180, y: 80, class: 1 },
      { x: 210, y: 50, class: 1 },
      { x: 250, y: 110, class: 1 },
      { x: 190, y: 140, class: 1 }
    ];

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = parseFloat(sliderW.value);
      const b = parseFloat(sliderB.value);

      valW.innerText = w.toFixed(1);
      valB.innerText = Math.round(b);

      // Draw background probability gradient (Sigmoid color mapping)
      // To keep it performant, we render custom columns
      const step = 8;
      for (let x = 0; x < canvas.width; x += step) {
        // z = w * x + b
        // sigmoid(z) = 1 / (1 + exp(-z))
        // Map normal relative X coordinates (0 to 1) for stable calculation
        const relX = (x - canvas.width / 2) / 10;
        const z = w * relX + (b / 10);
        const prob = 1 / (1 + Math.exp(-z));

        // Interpolate colors: red (Class 0) to blue (Class 1)
        ctx.fillStyle = `rgba(${Math.round((1 - prob)*219 + prob*79)}, ${Math.round((1 - prob)*39 + prob*70)}, ${Math.round((1 - prob)*119 + prob*229)}, 0.12)`;
        ctx.fillRect(x, 0, step, canvas.height);
      }

      // Draw decision boundary line (where probability = 0.5, i.e., z = 0)
      // z = w * relX + b/10 = 0 => relX = -b / (10 * w)
      // x = relX * 10 + canvas.width/2
      if (w !== 0) {
        const relXBoundary = -b / (10 * w);
        const xBoundary = relXBoundary * 10 + canvas.width / 2;

        ctx.strokeStyle = "var(--color-primary)";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(xBoundary, 0);
        ctx.lineTo(xBoundary, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw points & count correctness
      let correct = 0;
      dataPoints.forEach(p => {
        // Map screen X to relative coordinate
        const relX = (p.x - canvas.width / 2) / 10;
        const z = w * relX + (b / 10);
        const prob = 1 / (1 + Math.exp(-z));
        const predClass = prob >= 0.5 ? 1 : 0;

        if (predClass === p.class) correct++;

        // Draw dot
        ctx.fillStyle = p.class === 1 ? "#3b82f6" : "#ef4444";
        ctx.shadowColor = p.class === 1 ? "rgba(59, 130, 246, 0.4)" : "rgba(239, 68, 68, 0.4)";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Update Accuracy
      const acc = Math.round((correct / dataPoints.length) * 100);
      accuracyEl.innerText = `${acc}%`;
    }

    sliderW.addEventListener("input", draw);
    sliderB.addEventListener("input", draw);

    function resize() {
      const rect = canvas.parentNode.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Rescale data points coordinate to fit the canvas proportionally
      dataPoints.forEach(p => {
        p.x = (p.x / 300) * canvas.width;
        p.y = (p.y / 250) * canvas.height;
      });

      draw();
    }

    setTimeout(resize, 100);
  }

  /* ==========================================================================
     SIMULATOR 4: CONFUSION MATRIX & METRICS SLIDERS
     ========================================================================== */
  function mountConfusionMatrixSim() {
    DOM.simulatorMount.innerHTML = `
      <div class="matrix-sim-grid">
        <div class="matrix-controls-panel">
          <h5>🧟 The Zombie Detector</h5>
          <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">Slide values to simulate zombie encounters and examine the metric equations!</p>
          
          <div class="slider-group">
            <div class="slider-info">
              <span class="slider-lbl" style="color: var(--color-success);">True Positives (TP - Caught Zombie)</span>
              <span class="slider-val" id="tp-val">10</span>
            </div>
            <input type="range" class="slider-input" id="slide-tp" min="0" max="50" step="1" value="12">
          </div>

          <div class="slider-group">
            <div class="slider-info">
              <span class="slider-lbl" style="color: var(--color-warning);">False Positives (FP - Spray Citizen)</span>
              <span class="slider-val" id="fp-val">2</span>
            </div>
            <input type="range" class="slider-input" id="slide-fp" min="0" max="50" step="1" value="3">
          </div>

          <div class="slider-group">
            <div class="slider-info">
              <span class="slider-lbl" style="color: var(--color-danger);">False Negatives (FN - Zombie Slips In)</span>
              <span class="slider-val" id="fn-val">1</span>
            </div>
            <input type="range" class="slider-input" id="slide-fn" min="0" max="50" step="1" value="1">
          </div>

          <div class="slider-group">
            <div class="slider-info">
              <span class="slider-lbl" style="color: var(--color-accent);">True Negatives (TN - Citizen Ignored)</span>
              <span class="slider-val" id="tn-val">80</span>
            </div>
            <input type="range" class="slider-input" id="slide-tn" min="0" max="200" step="5" value="85">
          </div>
        </div>

        <div class="matrix-visual-panel">
          <div class="confusion-matrix-box">
            <div class="matrix-cell tn-cell">
              <span>TN (Citizen Safe)</span>
              <strong id="m-tn">85</strong>
            </div>
            <div class="matrix-cell fp-cell">
              <span>FP (False Alarm)</span>
              <strong id="m-fp">3</strong>
            </div>
            <div class="matrix-cell fn-cell">
              <span>FN (Missed Zombie)</span>
              <strong id="m-fn">1</strong>
            </div>
            <div class="matrix-cell tp-cell">
              <span>TP (Zombie Caught)</span>
              <strong id="m-tp">12</strong>
            </div>
          </div>

          <div class="metrics-results-panel">
            <div class="metric-result-card">
              <div class="lbl">Accuracy</div>
              <div class="val" id="met-accuracy">96.0%</div>
            </div>
            <div class="metric-result-card" style="background-color: var(--color-accent-glow);">
              <div class="lbl">Precision</div>
              <div class="val" id="met-precision" style="color: var(--color-accent);">80.0%</div>
            </div>
            <div class="metric-result-card" style="background-color: var(--color-success-bg);">
              <div class="lbl">Recall</div>
              <div class="val" id="met-recall" style="color: var(--color-success);">92.3%</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const slideTp = document.getElementById("slide-tp");
    const slideFp = document.getElementById("slide-fp");
    const slideFn = document.getElementById("slide-fn");
    const slideTn = document.getElementById("slide-tn");

    const valTp = document.getElementById("tp-val");
    const valFp = document.getElementById("fp-val");
    const valFn = document.getElementById("fn-val");
    const valTn = document.getElementById("tn-val");

    const mTp = document.getElementById("m-tp");
    const mFp = document.getElementById("m-fp");
    const mFn = document.getElementById("m-fn");
    const mTn = document.getElementById("m-tn");

    const metAcc = document.getElementById("met-accuracy");
    const metPrec = document.getElementById("met-precision");
    const metRec = document.getElementById("met-recall");

    function calculateMetrics() {
      const tp = parseInt(slideTp.value);
      const fp = parseInt(slideFp.value);
      const fn = parseInt(slideFn.value);
      const tn = parseInt(slideTn.value);

      // Set label values
      valTp.innerText = tp;
      valFp.innerText = fp;
      valFn.innerText = fn;
      valTn.innerText = tn;

      // Set matrix box values
      mTp.innerText = tp;
      mFp.innerText = fp;
      mFn.innerText = fn;
      mTn.innerText = tn;

      // Compute equations
      const total = tp + fp + fn + tn;
      const acc = total > 0 ? ((tp + tn) / total) * 100 : 0;
      const prec = (tp + fp) > 0 ? (tp / (tp + fp)) * 100 : 0;
      const rec = (tp + fn) > 0 ? (tp / (tp + fn)) * 100 : 0;

      metAcc.innerText = `${acc.toFixed(1)}%`;
      metPrec.innerText = `${prec.toFixed(1)}%`;
      metRec.innerText = `${rec.toFixed(1)}%`;
    }

    [slideTp, slideFp, slideFn, slideTn].forEach(slide => {
      slide.addEventListener("input", calculateMetrics);
    });

    calculateMetrics();
  }

  /* ==========================================================================
     SIMULATOR 5: DECISION TREE FLOWCHART SPLITTER GAME
     ========================================================================== */
  function mountDecisionTreeSim() {
    DOM.simulatorMount.innerHTML = `
      <div class="tree-sim-frame">
        <h5 style="text-transform: uppercase; font-size: 12px; color: var(--text-muted);">Interactive game: Guide the tree to build outdoor adventure flowchart!</h5>
        <div class="tree-flow-chart" id="tree-canvas">
          <!-- Initial Root State -->
          <div class="tree-node active-question" id="tree-root">
            🤔 Question 1: What should we check first?
            <div style="display: flex; gap: 8px; justify-content: center; margin-top: 10px;">
              <button class="btn btn-primary tree-action-btn" id="split-rain">Is it Raining?</button>
              <button class="btn btn-secondary tree-action-btn" id="split-tues">Is it Tuesday?</button>
            </div>
          </div>
          <div id="tree-split-level-1" style="display: none; width: 100%; flex-direction: column; align-items: center; gap: 12px;">
            <div class="tree-line"></div>
            <div class="tree-branches">
              <div class="tree-branch" style="flex: 1;">
                <span style="font-size: 11px; color: var(--color-secondary); font-weight: 700;">YES</span>
                <div class="tree-node" style="border-color: var(--color-secondary);">📺 Leaf Node: Stay Indoors & Play Video Games</div>
              </div>
              <div class="tree-branch" style="flex: 1;">
                <span style="font-size: 11px; color: var(--color-success); font-weight: 700;">NO</span>
                <div class="tree-node active-question" id="tree-sub-right">
                  🤔 Question 2: Rain is clear! Now check what?
                  <div style="display: flex; gap: 8px; justify-content: center; margin-top: 10px;">
                    <button class="btn btn-primary tree-action-btn" id="split-temp">Is it very Hot (>35°C)?</button>
                    <button class="btn btn-secondary tree-action-btn" id="split-day">What day is it?</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="tree-split-level-2" style="display: none; width: 100%; flex-direction: column; align-items: center; gap: 12px;">
            <div class="tree-branches" style="width: 50%; margin-left: 50%;">
              <div class="tree-branch" style="flex: 1;">
                <span style="font-size: 11px; color: var(--color-secondary); font-weight: 700;">YES</span>
                <div class="tree-node" style="border-color: var(--color-secondary);">❄️ Leaf Node: Stay Indoors (AC On)</div>
              </div>
              <div class="tree-branch" style="flex: 1;">
                <span style="font-size: 11px; color: var(--color-success); font-weight: 700;">NO</span>
                <div class="tree-node" style="border-color: var(--color-success);">🎾 Leaf Node: Go Play Tennis outside!</div>
              </div>
            </div>
          </div>
        </div>
        <div id="tree-feedback" style="font-size: 13px; font-weight: 600; text-align: center;"></div>
      </div>
    `;

    const btnRain = document.getElementById("split-rain");
    const btnTues = document.getElementById("split-tues");
    const btnTemp = document.getElementById("split-temp");
    const btnDay = document.getElementById("split-day");

    const lvl1 = document.getElementById("tree-split-level-1");
    const lvl2 = document.getElementById("tree-split-level-2");
    const feedback = document.getElementById("tree-feedback");

    btnRain.addEventListener("click", () => {
      lvl1.style.display = "flex";
      feedback.innerHTML = `<span style="color: var(--color-success);">✓ Awesome choice! Checking rain yields high **Information Gain** (clean entropy split)!</span>`;
      btnRain.disabled = true;
      btnTues.disabled = true;
    });

    btnTues.addEventListener("click", () => {
      feedback.innerHTML = `<span style="color: var(--color-danger);">❌ Low Information Gain! Friends play tennis on Tuesdays too, so checking 'Tuesday' splits data messily. Try 'Is it Raining'!</span>`;
    });

    btnTemp.addEventListener("click", () => {
      lvl2.style.display = "flex";
      feedback.innerHTML = `<span style="color: var(--color-success);">🎉 Brilliant! Flowchart complete. You split the data cleanly and modeled the choices perfectly!</span>`;
      btnTemp.disabled = true;
      btnDay.disabled = true;
    });

    btnDay.addEventListener("click", () => {
      feedback.innerHTML = `<span style="color: var(--color-danger);">❌ Wrong choice! 'Day of week' does not matter. Checking 'Temperature' splits the outdoor conditions cleanly. Try that!</span>`;
    });
  }

  /* ==========================================================================
     SIMULATOR 6: ENSEMBLE PARALLEL RUNNER
     ========================================================================== */
  function mountEnsembleSim() {
    DOM.simulatorMount.innerHTML = `
      <div class="pipeline-sim-frame">
        <h5 style="text-transform: uppercase; font-size: 12px; color: var(--text-muted);">Visualizer: Simulating a Random Forest voting parallel system</h5>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px;" id="ensemble-voter-grid">
          <div class="tree-node" style="opacity: 0.5;">Tree 1: Waiting</div>
          <div class="tree-node" style="opacity: 0.5;">Tree 2: Waiting</div>
          <div class="tree-node" style="opacity: 0.5;">Tree 3: Waiting</div>
          <div class="tree-node" style="opacity: 0.5;">Tree 4: Waiting</div>
          <div class="tree-node" style="opacity: 0.5;">Tree 5: Waiting</div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 14px; border-top: 1px dashed var(--border-color); padding-top: 14px;">
          <button class="btn btn-primary btn-medium" id="run-ensemble">Perform Parallel Voting</button>
          <div id="ensemble-result" style="font-size: 14px; font-weight: 700;"></div>
        </div>
      </div>
    `;

    const runBtn = document.getElementById("run-ensemble");
    const grid = document.getElementById("ensemble-voter-grid");
    const resultEl = document.getElementById("ensemble-result");

    runBtn.addEventListener("click", () => {
      runBtn.disabled = true;
      resultEl.innerHTML = `Voting in progress...`;
      
      const votes = [];
      const nodes = grid.querySelectorAll(".tree-node");
      
      nodes.forEach((node, index) => {
        node.style.opacity = "0.5";
        node.style.transform = "none";
        node.innerText = `Tree ${index + 1}: Calculating...`;
      });

      // Animate votes sequential cascade
      nodes.forEach((node, index) => {
        setTimeout(() => {
          const voteVal = Math.random() >= 0.35 ? "Class 1 (Spam)" : "Class 0 (Normal)";
          votes.push(voteVal);
          
          node.innerText = `Tree ${index + 1}: Voted ${voteVal}`;
          node.style.opacity = "1";
          node.style.borderColor = voteVal.includes("Spam") ? "var(--color-secondary)" : "var(--color-success)";
          node.style.transform = "scale(1.05)";
          
          // Complete check
          if (votes.length === nodes.length) {
            const spamCount = votes.filter(v => v.includes("Spam")).length;
            const normalCount = votes.length - spamCount;
            const winner = spamCount > normalCount ? "Class 1 (Spam)" : "Class 0 (Normal)";
            
            resultEl.innerHTML = `
              <span>Majority Winner: <strong style="color: ${winner.includes("Spam") ? "var(--color-secondary)" : "var(--color-success)"}">${winner}</strong> (${spamCount} vs ${normalCount} votes)</span>
            `;
            runBtn.disabled = false;
          }
        }, (index + 1) * 350);
      });
    });
  }

  /* ==========================================================================
     SIMULATOR 7: MODEL EVALUATION SHUFFLE
     ========================================================================== */
  function mountModelEvalSim() {
    DOM.simulatorMount.innerHTML = `
      <div class="pipeline-sim-frame">
        <h5 style="text-transform: uppercase; font-size: 12px; color: var(--text-muted);">Visualizer: 5-Fold Cross Validation Rotating Splits</h5>
        <div style="display: flex; flex-direction: column; gap: 8px;" id="kfold-container">
          <div style="display: flex; gap: 4px; height: 26px;">
            <div style="flex: 4; background-color: var(--color-primary); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: white;">TRAINING FOLDS (80%)</div>
            <div style="flex: 1; background-color: var(--color-secondary); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: white;">TEST FOLD (20%)</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 14px; border-top: 1px dashed var(--border-color); padding-top: 14px;">
          <button class="btn btn-primary btn-medium" id="rotate-folds">Rotate Test Fold (Run K-Fold)</button>
          <div id="kfold-score" style="font-size: 13px; font-weight: 600; color: var(--color-accent);">Click to simulate evaluation</div>
        </div>
      </div>
    `;

    const container = document.getElementById("kfold-container");
    const rotateBtn = document.getElementById("rotate-folds");
    const scoreEl = document.getElementById("kfold-score");
    let foldRound = 0;

    rotateBtn.addEventListener("click", () => {
      container.innerHTML = "";
      foldRound = (foldRound + 1) % 5;
      
      for (let i = 0; i < 5; i++) {
        const foldRow = document.createElement("div");
        foldRow.style.display = "flex";
        foldRow.style.gap = "4px";
        foldRow.style.height = "24px";
        
        for (let j = 0; j < 5; j++) {
          const block = document.createElement("div");
          block.style.flex = "1";
          block.style.borderRadius = "4px";
          block.style.fontSize = "9px";
          block.style.fontWeight = "700";
          block.style.display = "flex";
          block.style.alignItems = "center";
          block.style.justify = "center";
          block.style.color = "white";

          if (j === foldRound) {
            block.style.backgroundColor = "var(--color-secondary)";
            block.innerText = `TEST`;
          } else {
            block.style.backgroundColor = "var(--color-primary)";
            block.innerText = `TRAIN`;
          }
          foldRow.appendChild(block);
        }
        container.appendChild(foldRow);
      }

      // Generate a mock validation score for this specific split
      const mockAcc = (85 + Math.random() * 12).toFixed(1);
      scoreEl.innerText = `Fold ${foldRound + 1} Accuracy: ${mockAcc}%`;
    });

    // Populate initial rendering
    rotateBtn.click();
  }

  /* ==========================================================================
     SIMULATOR 8: DATA PREPROCESSING PIPELINE
     ========================================================================== */
  function mountPreprocessingSim() {
    DOM.simulatorMount.innerHTML = `
      <div class="pipeline-sim-frame">
        <h5 style="text-transform: uppercase; font-size: 12px; color: var(--text-muted);">Interactive Pipeline: Arrange preprocessing steps in the correct order!</h5>
        <div class="pipeline-containers">
          <div class="pipeline-source-panel" id="source-pipeline">
            <h5>📚 Operations Available</h5>
            <div class="pipeline-item" draggable="true" id="prep-2" data-order="2">Feature Scaling (Scale variables)</div>
            <div class="pipeline-item" draggable="true" id="prep-1" data-order="1">Median Imputation (Clean missing values)</div>
            <div class="pipeline-item" draggable="true" id="prep-3" data-order="3">One-Hot Encoding (Convert text to numbers)</div>
          </div>
          <div class="pipeline-target-panel" id="target-pipeline">
            <h5>📋 Cleaning Queue (Drop steps here)</h5>
          </div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
          <button class="btn btn-primary btn-medium" id="run-pipeline-btn">Execute Preprocessing</button>
          <div id="pipeline-feedback" style="font-size: 13px; font-weight: 600;"></div>
        </div>
      </div>
    `;

    const targetPanel = document.getElementById("target-pipeline");
    const sourcePanel = document.getElementById("source-pipeline");
    const items = DOM.simulatorMount.querySelectorAll(".pipeline-item");

    items.forEach(item => {
      item.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", item.id);
      });
    });

    [sourcePanel, targetPanel].forEach(panel => {
      panel.addEventListener("dragover", (e) => e.preventDefault());
      panel.addEventListener("drop", (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text");
        const dragged = document.getElementById(id);
        if (dragged) panel.appendChild(dragged);
      });
    });

    document.getElementById("run-pipeline-btn").addEventListener("click", () => {
      const placed = targetPanel.querySelectorAll(".pipeline-item");
      const feedback = document.getElementById("pipeline-feedback");

      if (placed.length < 3) {
        feedback.innerHTML = `<span style="color: var(--color-warning);">Please drag all 3 preprocessing steps to the queue!</span>`;
        return;
      }

      // Check order
      const order = Array.from(placed).map(item => parseInt(item.getAttribute("data-order")));
      const isCorrect = order[0] === 1 && order[1] === 2 && order[2] === 3;

      if (isCorrect) {
        feedback.innerHTML = `<span style="color: var(--color-success);">🎯 Perfect order! 1. Clean blanks first, 2. Scale features, 3. Encode text. Pipeline ran successfully!</span>`;
      } else {
        feedback.innerHTML = `<span style="color: var(--color-danger);">❌ Incorrect sequence. You should always Impute blanks FIRST before scaling or encoding features! Reset and try again.</span>`;
      }
    });
  }

  /* ==========================================================================
     SIMULATOR 9: VIRTUAL GIT TERMINAL
     ========================================================================== */
  function mountGitSim() {
    DOM.simulatorMount.innerHTML = `
      <div class="git-sim-container">
        <div class="git-terminal">
          <div class="git-term-header">
            <span class="term-dot dot-red"></span>
            <span class="term-dot dot-yellow"></span>
            <span class="term-dot dot-green"></span>
            <span style="font-size: 10px; color: var(--text-muted); font-family: sans-serif; font-weight: 700; margin-left: 8px;">bash — git interactive sandbox</span>
          </div>
          <div class="git-term-body" id="git-term-body">
            <div class="term-line term-output">Type 'help' to see available git commands!</div>
            <div class="term-input-line">
              <span class="term-prompt">user@aether-pc:~/ML$</span>
              <input type="text" class="term-input" id="git-term-input" autocomplete="off" autofocus>
            </div>
          </div>
        </div>
        <div class="git-tree-viz">
          <div class="git-tree-header">📂 Git Version History Tree</div>
          <div class="git-tree-nodes" id="git-tree-nodes">
            <div style="font-size: 11px; color: var(--text-muted); text-align: center; margin-top: 30px;">No commits found. Run 'git init' and 'git commit' to begin!</div>
          </div>
        </div>
      </div>
    `;

    const termInput = document.getElementById("git-term-input");
    const termBody = document.getElementById("git-term-body");
    const treeNodesEl = document.getElementById("git-tree-nodes");

    termInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = termInput.value.trim();
        termInput.value = "";
        
        if (cmd) {
          executeGitCommand(cmd);
        }
      }
    });

    function executeGitCommand(command) {
      const line = document.createElement("div");
      line.className = "term-line";
      line.innerHTML = `<span class="term-prompt">user@aether-pc:~/ML$</span> <span style="color: #ffffff;">${command}</span>`;
      
      // Insert user prompt line
      termBody.insertBefore(line, termInput.parentNode);

      const output = document.createElement("div");
      output.className = "term-line term-output";

      const tokens = command.split(" ");
      const baseCmd = tokens[0];

      if (baseCmd === "help") {
        output.innerHTML = `
          Available mock commands:<br>
          - <strong>git init</strong>: Initialize mock local Git repository<br>
          - <strong>git status</strong>: View status of tracked files<br>
          - <strong>git add &lt;file&gt;</strong>: Add files to staging area (e.g. 'git add model.py')<br>
          - <strong>git commit -m "&lt;msg&gt;"</strong>: Snapshot staged files (e.g. 'git commit -m "initial"')<br>
          - <strong>clear</strong>: Clean the terminal window
        `;
      } else if (baseCmd === "clear") {
        termBody.innerHTML = "";
        termBody.appendChild(termInput.parentNode);
        termInput.focus();
        return;
      } else if (baseCmd === "git") {
        const sub = tokens[1];
        
        if (sub === "init") {
          state.gitRepoInitialized = true;
          output.innerHTML = `Initialized empty Git repository in /Users/sathiyarajvenkatachalapathy/learning1/ML/.git/`;
        } else if (!state.gitRepoInitialized) {
          output.innerHTML = `<span style="color: var(--color-danger);">fatal: not a git repository (or any of the parent directories): .git</span>`;
        } else {
          // Repo is initialized
          if (sub === "status") {
            if (state.gitStagedFiles.length === 0) {
              output.innerHTML = `On branch main<br>Untracked files:<br>&nbsp;&nbsp;<span style="color: var(--color-danger);">model.py</span><br>&nbsp;&nbsp;<span style="color: var(--color-danger);">data.csv</span><br>nothing added to commit but untracked files present (use "git add" to track)`;
            } else {
              const stagedList = state.gitStagedFiles.map(f => `&nbsp;&nbsp;<span style="color: var(--color-success);">${f}</span>`).join("<br>");
              output.innerHTML = `On branch main<br>Changes to be committed:<br>${stagedList}`;
            }
          } else if (sub === "add") {
            const file = tokens[2] || ".";
            if (file === "model.py" || file === "data.csv" || file === ".") {
              if (file === ".") {
                state.gitStagedFiles = ["model.py", "data.csv"];
              } else if (!state.gitStagedFiles.includes(file)) {
                state.gitStagedFiles.push(file);
              }
              output.innerHTML = `staged ${file} successfully.`;
            } else {
              output.innerHTML = `<span style="color: var(--color-danger);">error: pathspec '${file}' did not match any files.</span>`;
            }
          } else if (sub === "commit") {
            const flag = tokens[2];
            const rawMsg = command.substring(command.indexOf("-m") + 2).trim().replace(/"/g, "");
            
            if (flag !== "-m" || !rawMsg) {
              output.innerHTML = `<span style="color: var(--color-danger);">error: switch 'm' requires a value (use git commit -m "your message")</span>`;
            } else if (state.gitStagedFiles.length === 0) {
              output.innerHTML = `On branch main<br>nothing to commit, working tree clean`;
            } else {
              // Create commit
              const hash = Math.random().toString(16).substring(2, 9);
              const commitObj = { hash, msg: rawMsg };
              state.gitCommits.push(commitObj);
              state.gitStagedFiles = [];

              output.innerHTML = `[main ${hash}] ${rawMsg}<br> ${state.gitCommits.length} files changed, 47 insertions(+)`;
              updateGitTree();
            }
          } else {
            output.innerHTML = `git command '${sub}' not supported in this mock simulation. Try git init, add, status, commit!`;
          }
        }
      } else {
        output.innerHTML = `Command '${command}' not recognized. Type 'help' for instructions.`;
      }

      termBody.insertBefore(output, termInput.parentNode);
      
      // Auto Scroll
      termBody.scrollTop = termBody.scrollHeight;
    }

    function updateGitTree() {
      if (state.gitCommits.length === 0) return;
      
      treeNodesEl.innerHTML = "";
      state.gitCommits.forEach(commit => {
        const node = document.createElement("div");
        node.className = "git-commit-node";
        node.innerHTML = `
          <div class="avatar" style="width: 24px; height: 24px; font-size: 11px;">💾</div>
          <div>
            <div class="commit-hash">[commit ${commit.hash}]</div>
            <div class="commit-msg">"${commit.msg}"</div>
          </div>
        `;
        treeNodesEl.appendChild(node);
      });
      treeNodesEl.scrollTop = treeNodesEl.scrollHeight;
    }
  }

  /* ==========================================================================
     SIMULATOR 10: ADABOOST SEQUENTIAL LEARNING
     ========================================================================== */
  function mountAdaBoostSim() {
    DOM.simulatorMount.innerHTML = `
      <div class="adaboost-sim-frame">
        <h5 style="text-transform: uppercase; font-size: 12px; color: var(--text-muted);">Visualizer: Simulating AdaBoost Sequential weight inflation</h5>
        <div class="adaboost-grid">
          
          <div class="adaboost-viz-area">
            <canvas id="ada-canvas" width="280" height="220" style="width:100%; height:100%; display:block;"></canvas>
            <div class="canvas-hint" style="background: rgba(0,0,0,0.85); bottom: 10px; font-size: 10.5px;" id="ada-hint">
              Stump 1: Equal weights. Splits the middle.
            </div>
          </div>

          <div class="adaboost-steps">
            <div class="adaboost-step-card active" data-step="0">
              <h6>Round 1: Stump 1 (Equal Weights)</h6>
              <p>All points are size 8. Stump draws vertical line, misclassifies 2 circles.</p>
            </div>
            <div class="adaboost-step-card" data-step="1">
              <h6>Round 2: Stump 2 (Weighted Underdogs)</h6>
              <p>Incorrect circles inflate to size 20! New stump splits horizontally to correct them.</p>
            </div>
            <div class="adaboost-step-card" data-step="2">
              <h6>Round 3: Strong Combined Classifier</h6>
              <p>Stump 1 & Stump 2 combine their weighted says to form a strong boundary!</p>
            </div>
          </div>

        </div>
      </div>
    `;

    const canvas = document.getElementById("ada-canvas");
    const ctx = canvas.getContext("2d");
    const stepCards = DOM.simulatorMount.querySelectorAll(".adaboost-step-card");
    const hintEl = document.getElementById("ada-hint");

    // Static data points: X, Y, Class (+1 vs -1)
    const points = [
      { x: 50, y: 70, class: 1 },
      { x: 80, y: 150, class: 1 },
      { x: 140, y: 60, class: -1 },
      { x: 220, y: 140, class: -1 },
      { x: 230, y: 50, class: -1 }
    ];

    let currentStep = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Grid
      ctx.strokeStyle = document.body.classList.contains("light-theme") ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;
      const grid = 30;
      for (let x = 0; x < canvas.width; x += grid) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }

      // 2. Draw stumps and regions
      if (currentStep === 0) {
        // Draw split vertical boundary in the center
        ctx.fillStyle = "rgba(79, 70, 229, 0.05)";
        ctx.fillRect(0, 0, 110, canvas.height);
        ctx.fillStyle = "rgba(219, 39, 119, 0.05)";
        ctx.fillRect(110, 0, canvas.width - 110, canvas.height);

        ctx.strokeStyle = "var(--color-primary)";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(110, 0); ctx.lineTo(110, canvas.height); ctx.stroke();
        ctx.setLineDash([]);
      } else if (currentStep === 1) {
        // Draw split horizontal boundary
        ctx.fillStyle = "rgba(79, 70, 229, 0.05)";
        ctx.fillRect(0, 100, canvas.width, canvas.height - 100);
        ctx.fillStyle = "rgba(219, 39, 119, 0.05)";
        ctx.fillRect(0, 0, canvas.width, 100);

        ctx.strokeStyle = "var(--color-accent)";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(0, 100); ctx.lineTo(canvas.width, 100); ctx.stroke();
        ctx.setLineDash([]);
      } else {
        // Combined boundary (Stump 1 vertical + Stump 2 horizontal)
        // Shading complex combined regions
        ctx.fillStyle = "rgba(79, 70, 229, 0.08)";
        ctx.fillRect(0, 0, 110, canvas.height);
        ctx.fillRect(110, 100, canvas.width - 110, canvas.height - 100);
        
        ctx.fillStyle = "rgba(219, 39, 119, 0.08)";
        ctx.fillRect(110, 0, canvas.width - 110, 100);

        // Combined boundaries
        ctx.strokeStyle = "var(--color-success)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(110, 0); ctx.lineTo(110, 100);
        ctx.lineTo(canvas.width, 100);
        ctx.stroke();
      }

      // 3. Draw points with step-wise weights (sizes)
      points.forEach((p, index) => {
        let size = 8;
        if (currentStep === 1) {
          // Stump 1 (vertical at X=110) misclassifies:
          // Point at index 1 (80, 150, class +1) which is left of 110 (correct)
          // Point at index 2 (140, 60, class -1) which is right of 110 (correct)
          // If stump 1 splits vertical at X=110:
          // X < 110 predicts +1. X > 110 predicts -1.
          // Let's adjust weight inflation for data visual clarity!
          // We inflate points that are hard to classify for Stump 1 so they are giant underdogs!
          if (index === 1 || index === 2) {
            size = 18;
          }
        } else if (currentStep === 2) {
          size = 10;
        }

        ctx.fillStyle = p.class === 1 ? "#3b82f6" : "#ef4444";
        ctx.shadowColor = p.class === 1 ? "rgba(59, 130, 246, 0.5)" : "rgba(239, 68, 68, 0.5)";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw symbol
        ctx.fillStyle = "white";
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.class === 1 ? "+" : "-", p.x, p.y);
      });
    }

    stepCards.forEach(card => {
      card.addEventListener("click", () => {
        stepCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        
        currentStep = parseInt(card.getAttribute("data-step"));
        
        if (currentStep === 0) {
          hintEl.innerText = "Stump 1: Equal weights. Vertical boundary splits left vs right.";
        } else if (currentStep === 1) {
          hintEl.innerText = "Stump 2: Misclassified points inflate! New stump fits horizontally.";
        } else {
          hintEl.innerText = "Round 3: Stumps combine to form a robust, correct decision boundary!";
        }

        draw();
      });
    });

    draw();
  }

  // Execute App!
  init();
});


// --- SD SIMULATOR LOGIC ---
function loadSDSimulator(simId) {
  const mount = document.getElementById("interactive-simulator-area");
  if (!mount) return;
  mount.innerHTML = "";

  let html = "";
  if (simId === "dns-sim") {
    html = `
      <div class="sim-container" style="text-align:center;">
        <h3>🌐 DNS Simulator</h3>
        <button class="btn btn-primary" onclick="this.nextElementSibling.style.display='block'">Type www.google.com</button>
        <div class="dns-animation" style="display:none; margin-top:20px;">
          <p>📡 Browser -> DNS Resolver</p>
          <p>✅ DNS Resolver -> IP: 142.250.190.46</p>
          <p>🚀 Browser -> 142.250.190.46</p>
          <div style="width: 50px; height: 50px; background: var(--color-primary); border-radius: 50%; margin: 0 auto; animation: pulse 1s infinite;"></div>
        </div>
      </div>
    `;
  } else if (simId === "scaling-sim") {
    html = `
      <div class="sim-container" style="text-align:center;">
        <h3>🚚 Scaling Simulator</h3>
        <p>Traffic is increasing! How do you scale?</p>
        <div style="display:flex; justify-content: center; gap: 20px; margin-top: 20px;">
          <button class="btn btn-secondary" onclick="alert('Vertical Scale: Upgraded Server to 128GB RAM. (Warning: Single Point of Failure)')">Scale Vertically (Upgrade)</button>
          <button class="btn btn-primary" onclick="alert('Horizontal Scale: Added 3 new web servers to the cluster. High Availability achieved!')">Scale Horizontally (Add Servers)</button>
        </div>
      </div>
    `;
  } else if (simId === "lb-sim") {
    html = `
      <div class="sim-container" style="text-align:center;">
        <h3>🚦 Load Balancer</h3>
        <p>Distributing traffic using Round Robin.</p>
        <button class="btn btn-primary" onclick="document.getElementById('server-target').innerText = 'Server ' + (Math.floor(Math.random() * 3) + 1)">Send User Request</button>
        <h1 style="margin-top: 30px; color: var(--color-success);" id="server-target">Waiting for traffic...</h1>
      </div>
    `;
  } else if (simId === "cache-sim") {
    html = `
      <div class="sim-container" style="text-align:center;">
        <h3>📚 Cache hit/miss Simulator</h3>
        <button class="btn btn-primary" onclick="let el=document.getElementById('cache-res'); if(el.innerText.includes('Miss')){ el.innerText='Cache HIT! Response time: 2ms'; el.style.color='var(--color-success)';} else { el.innerText='Cache Miss! Queried DB. Response time: 200ms'; el.style.color='var(--color-danger)'; }">Fetch User Profile</button>
        <h3 id="cache-res" style="margin-top:20px;">Ready</h3>
      </div>
    `;
  } else {
    html = `
      <div class="sim-container" style="text-align:center;">
        <h3 style="color: var(--color-primary);">Interactive Architecture Explorer</h3>
        <p style="color: var(--text-muted); margin-top: 10px;">Select a tool to explore this system component visually.</p>
        <div class="pulsing-network" style="margin-top: 30px; width: 100px; height: 100px; border: 2px dashed var(--color-primary); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; animation: spin 10s linear infinite;">
          ⚙️
        </div>
      </div>
    `;
  }
  mount.innerHTML = html;
}


// Basic Syntax Highlighter function
function highlightCode(code) {
  if (!code) return "";
  let html = code.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
  html = html.replace(/(#.*$)/gm, '<span style="color: #6b7280; font-style: italic;">$1</span>');
  html = html.replace(/("(?:\\"|[^"])*"|'(?:\\'|[^'])*')/g, '<span style="color: #fca5a5;">$1</span>');
  const keywords = ['import', 'from', 'def', 'class', 'return', 'if', 'else', 'elif', 'for', 'while', 'print', 'True', 'False', 'None'];
  const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  html = html.replace(keywordRegex, '<span style="color: #c084fc;">$1</span>');
  const mlWords = ['Sequential', 'Dense', 'Conv2D', 'MaxPooling2D', 'Flatten', 'model', 'kmeans', 'fit', 'predict', 'compile', 'summary', 'RandomForestClassifier', 'DecisionTreeClassifier', 'LogisticRegression', 'accuracy_score', 'precision_score', 'recall_score', 'f1_score'];
  const mlRegex = new RegExp(`\\b(${mlWords.join('|')})\\b`, 'g');
  html = html.replace(mlRegex, '<span style="color: #60a5fa;">$1</span>');
  html = html.replace(/\b(\d+(\.\d+)?)\b/g, '<span style="color: #fbbf24;">$1</span>');
  return html;
}
