// Unified Aether Academy Tutorials Database
const TUTORIALS = [
{
    id: "ml-intro",
    title: "ML Introduction & Its Types",
    category: "Machine Learning",
    difficulty: "Beginner",
    jobHighlight: "AI Consultant / Junior Data Scientist",
    duration: "8 mins",
    analogy: `
      <div class="analogy-box">
        <h4>🐶 The Puppy Analogy</h4>
        <p>Imagine you just got a cute new puppy named Sparky. You want to teach Sparky how to behave, but he doesn't understand human language yet! How do you train him? You can't write a rigid rulebook for him. Instead, you show him examples, give him treats when he gets it right, and let him learn from experience. <strong>Machine Learning is exactly like training a puppy!</strong> Instead of writing strict lines of code telling a computer exactly what to do, we feed it data (examples) and let it learn the patterns itself.</p>
        <div style="text-align: center; margin-top: 16px;"><img src="ml_intro_puppy.png" alt="Futuristic puppy training" style="max-width: 100%; border-radius: 12px; box-shadow: 0 8px 24px rgba(79, 70, 229, 0.25); width: 260px; height: auto; border: 1px solid rgba(255, 255, 255, 0.1);"></div>
      </div>
    `,
    concept: `
      <h3>What is Machine Learning?</h3>
      <p>Traditional programming is like a baking recipe: you give the computer <strong>Data</strong> (ingredients) and <strong>Rules</strong> (steps), and it produces the <strong>Answers</strong> (cake). Machine Learning flips this! You give the computer <strong>Data</strong> (ingredients) and the <strong>Answers</strong> (cakes of various types), and it figures out the <strong>Rules</strong> (recipes) all by itself.</p>
      
      <h3>The Three Superpowers (Types of ML)</h3>
      <div class="features-grid">
        <div class="feature-card">
          <div class="icon">🏷️</div>
          <h5>1. Supervised Learning</h5>
          <p><strong>Learning with a Teacher.</strong> We give the computer labeled data (e.g., thousands of pictures of cats with the label "Cat", and dogs labeled "Dog"). The computer learns to identify the differences and can then classify new, unseen pictures. It's used for predictions like house prices or spam email detection.</p>
        </div>
        <div class="feature-card">
          <div class="icon">🔍</div>
          <h5>2. Unsupervised Learning</h5>
          <p><strong>Learning by Self-Discovery.</strong> There is no teacher and no labels. We give the computer a giant pile of unlabeled data, and ask it to find hidden patterns. For example, grouping shoppers based on their shopping habits (Clustering) so companies can target them with specific ads.</p>
        </div>
        <div class="feature-card">
          <div class="icon">🎮</div>
          <h5>3. Reinforcement Learning</h5>
          <p><strong>Learning by Trial and Error.</strong> The AI is like a video game character. It receives "rewards" (points) for good actions and "penalties" (losing lives) for bad actions. By playing millions of times, it learns the ultimate strategy. This is how self-driving cars learn to navigate or how AlphaGo beat the world chess champions.</p>
        </div>
      </div>
    `,
    math: `
      <h3>The Mathematical Intuition</h3>
      <p>Under the hood, all machine learning algorithms are trying to solve a mathematical function: </p>
      <div class="math-block">$$y = f(x)$$</div>
      <p>Where:</p>
      <ul>
        <li><strong>$x$</strong> is the Input Data (e.g., size of a house, breed of a puppy).</li>
        <li><strong>$y$</strong> is the Output Prediction (e.g., price of the house, whether Sparky will sit).</li>
        <li><strong>$f$</strong> is the Machine Learning Model (the magic formula the computer is trying to figure out).</li>
      </ul>
    `,
    code: `
# Practical Example: Classifying Iris Flowers using Supervised Learning (Scikit-Learn)
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
import numpy as np

# 1. Load the dataset (Iris flower measurements)
iris = load_iris()
X, y = iris.data, iris.target

# X represents features: Sepal length, Sepal width, Petal length, Petal width
# y represents labels: 0 (Setosa), 1 (Versicolor), 2 (Virginica)

# 2. Split data into training (80%) and testing (20%) sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Choose a model: K-Nearest Neighbors (KNN - classifies based on closest neighbors)
model = KNeighborsClassifier(n_neighbors=3)

# 4. Train the puppy! (Fit the model)
model.fit(X_train, y_train)

# 5. Test the model's intelligence
accuracy = model.score(X_test, y_test)
print(f"Model Accuracy on Test Set: {accuracy * 100:.2f}%")

# 6. Predict on a brand new, unseen flower measurements
new_flower = np.array([[5.1, 3.5, 1.4, 0.2]])
prediction = model.predict(new_flower)
print(f"Predicted species: {iris.target_names[prediction][0]}")
    
# --- ZERO TO HERO EXERCISE ---
# TODO: Try changing 'n_neighbors=3' to 'n_neighbors=50' on line 18. Does the accuracy drop? Why?
# Hint: A large neighborhood dilutes the specific local patterns!'

    `,    interview: {
      question: "Explain the difference between Supervised and Unsupervised Learning to a non-technical stakeholder.",
      answer: "Supervised learning is like studying for an exam with a booklet that has both the questions and the correct answers printed at the back. You practice, check your answers, correct your mistakes, and get better. Unsupervised learning is like being handed a box of completely random, unlabeled items (e.g., screws, bolts, and nails) and sorting them into distinct piles purely based on their visual similarities (shape, weight, or size) without knowing what they are called."
    },
    quiz: [
      {
        question: "If a computer is learning to predict the price of a stock based on historical stock charts, what type of ML is it?",
        options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Programming"],
        answer: 0,
        explanation: "Stock prediction relies on labeled historical price data as input, which is a classic Supervised Learning regression problem."
      },
      {
        question: "Which type of ML works by giving rewards and penalties, similar to training a dog with treats?",
        options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Clustering"],
        answer: 2,
        explanation: "Reinforcement learning is based on an agent interacting with an environment and learning to maximize its cumulative rewards."
      },
      {
        question: "Customer segmentation (grouping users based on similar shopping traits) without predefined labels is an example of:",
        options: ["Supervised Classification", "Unsupervised Clustering", "Neural Regressions", "Git Collaboration"],
        answer: 1,
        explanation: "Since the shoppers are grouped without predefined category labels, the algorithm has to find clusters on its own, making it Unsupervised."
      }
    ],
    hasSimulator: "ml-types-sim"
  },
    {
    courseType: "ML",
    id: "linear-regression",
    title: "2. Regression vs Classification",
    category: "Machine Learning",
    difficulty: "Beginner",
    jobHighlight: "Data Analyst",
    duration: "25 mins",
    overview: `
      <p><strong>Regression</strong> predicts a continuous number (like a price). <strong>Classification</strong> predicts a category (like Yes or No).</p>
      <div class="analogy-box" style="margin-top:1rem;">
        <h4>🍔 The Fast Food Analogy</h4>
        <p><strong>Regression:</strong> Predicting exactly how many minutes it will take for your burger to arrive (e.g., 5.4 minutes).<br><strong>Classification:</strong> Predicting if your burger will be Hot or Cold (Categories).</p>
      </div>
    `,
    coreConcept: `
      <p>The two main branches of Supervised Learning:</p>
      <ol style="padding-left:1.5rem; margin-top:1rem;">
        <li><strong>Step 1 (Identify Goal):</strong> Do you want a number or a label?</li>
        <li><strong>Step 2 (Regression Math):</strong> Fits a continuous line through data points.</li>
        <li><strong>Step 3 (Classification Math):</strong> Draws a boundary wall separating data points into groups.</li>
      </ol>
      <div style="margin-top:1rem; display:flex; gap:1rem;">
        <div style="flex:1; background:rgba(239,68,68,0.1); padding:1rem; border-left:4px solid #ef4444;">
          <strong>Wrong Approach:</strong><br>Using Classification to predict House Prices. (You can't have a category for every single dollar amount!).
        </div>
        <div style="flex:1; background:rgba(16,185,129,0.1); padding:1rem; border-left:4px solid #10b981;">
          <strong>Correct Approach:</strong><br>Using Regression for Prices, and Classification to predict if the house will sell or not.
        </div>
      </div>
    `,
    realTimeExamples: [
      {
        subTopic: "Regression",
        description: "Predicting infinite numeric values.",
        scenario: "Uber predicting your ride will cost exactly $14.23.",
        industry: "Ride Sharing"
      },
      {
        subTopic: "Classification",
        description: "Predicting discrete categories.",
        scenario: "A hospital predicting if an X-Ray shows a tumor (Yes/No).",
        industry: "Healthcare"
      }
    ],
    problemSolving: [
      {
        scenario: "You are building a weather app to tell users if they need an umbrella tomorrow.",
        wrong: "Building a Regression model to predict the exact millimeter volume of rain.",
        correct: "Building a Classification model that outputs 'Rain' or 'Clear'.",
        steps: "1. Gather historical weather data.<br>2. Label days as Rain/No Rain.<br>3. Train a Logistic Regression (Classification) model."
      }
    ],
    exercises: {
      beginner: "Is predicting a student's final GPA out of 4.0 a Regression or Classification task?",
      intermediate: "You need to predict if a stock will go UP, DOWN, or STAY FLAT. What type of model is this?",
      advanced: "Write a scikit-learn code block that imports both LinearRegression and LogisticRegression and explain when to use each."
    },
    memoryTricks: `
      <p>🧠 <strong>Memory Trick: 'Regression is a Ruler, Classification is a Cubbyhole'</strong></p>
      <p>Rulers measure infinite continuous numbers. Cubbyholes group things into distinct, separate boxes.</p>
    `,
    recap: `
      <ul style="padding-left:1.5rem;">
        <li>Both are forms of Supervised Learning.</li>
        <li>Regression predicts continuous numbers (Prices, Temperatures).</li>
        <li>Classification predicts categories (Spam/Not Spam, Cat/Dog).</li>
        <li>Linear Regression is the most basic regression model.</li>
        <li>Logistic Regression is actually a CLASSIFICATION model!</li>
      </ul>
    `,
    code: `
from sklearn.linear_model import LinearRegression, LogisticRegression

# REGRESSION (Predicting a Number)
reg = LinearRegression()
reg.fit([[1000], [2000], [3000]], [150000, 250000, 350000]) # SqFt -> Price
print("Predicted Price:", reg.predict([[2500]]))

# CLASSIFICATION (Predicting a Category 0 or 1)
clf = LogisticRegression()
clf.fit([[35], [22], [40], [18]], [1, 0, 1, 0]) # Age -> Bought Sports Car? (Yes/No)
print("Will buy?", clf.predict([[30]]))
    `,
    quiz: [
      {
        question: "Which of the following algorithms is actually used for Classification, despite its name?",
        options: ["Linear Regression", "Logistic Regression", "Polynomial Regression", "Lasso Regression"],
        answer: 1,
        explanation: "Logistic Regression outputs a probability between 0 and 1, making it a Classification algorithm."
      }
    ]
  },
  {
    courseType: "SD",
    id: "scaling",
    title: "2. Scaling: Vertical vs Horizontal",
    category: "Architecture",
    difficulty: "Beginner",
    duration: "12 mins",
    analogy: `
      <div class="analogy-box">
        <h4>🚚 The Delivery Truck Analogy</h4>
        <p>You own a delivery business, but you suddenly get twice as many orders. How do you handle it?</p>
        <p><strong>Vertical Scaling (Scaling Up):</strong> You upgrade your single truck into a massive 18-wheeler. It's easy to manage since you still only have one truck, but eventually, there's a limit to how big a single truck can be.</p>
        <p><strong>Horizontal Scaling (Scaling Out):</strong> You buy 5 more normal-sized trucks. Now you have a fleet! It's infinitely scalable, but you need someone to manage and coordinate all the drivers.</p>
      </div>
    `,
    concept: `
      <h3>When to Scale?</h3>
      <p>When a system receives more traffic than it can handle, performance drops and the server might crash. We must scale the system.</p>
      
      <div class="features-grid">
        <div class="feature-card">
          <div class="icon">⬆️</div>
          <h5>Vertical Scaling</h5>
          <p>Adding more power (CPU, RAM) to an existing machine. Good for simple applications or databases that are hard to split, but has a hard hardware limit and creates a Single Point of Failure.</p>
        </div>
        <div class="feature-card">
          <div class="icon">➡️</div>
          <h5>Horizontal Scaling</h5>
          <p>Adding more servers to a resource pool. Offers high availability and infinite scale, but adds complexity (data consistency, load balancing).</p>
        </div>
      </div>
    `,
    hasSimulator: "scaling-sim",
    interview: {
      question: "Why do modern tech giants prefer Horizontal Scaling over Vertical Scaling?",
      answer: "Vertical scaling has a hard hardware ceiling (you can only buy a server so big) and results in a single point of failure. Horizontal scaling provides infinite scalability by adding cheap commodity servers, and offers high availability/fault tolerance because if one server dies, others can take over the load."
    },
    quiz: [
      {
        question: "Which scaling method involves adding more RAM and CPU to a single server?",
        options: ["Horizontal Scaling", "Diagonal Scaling", "Vertical Scaling", "Distributed Scaling"],
        answer: 2,
        explanation: "Vertical scaling (scaling 'up') means making the existing machine more powerful."
      },
      {
        question: "What is a major disadvantage of Vertical Scaling?",
        options: ["It requires a load balancer", "It creates a single point of failure", "It is infinitely scalable", "It requires complex code changes"],
        answer: 1,
        explanation: "If the single massive server crashes, your entire application goes down."
      }
    ]
  },
  {
    courseType: "SD",
    id: "load-balancing",
    title: "3. Load Balancing",
    category: "Architecture",
    difficulty: "Intermediate",
    duration: "15 mins",
    analogy: `
      <div class="analogy-box">
        <h4>🚦 The Traffic Cop Analogy</h4>
        <p>Imagine a busy supermarket with 10 checkout lines. If all the customers blindly rush to the first register, that cashier will be overwhelmed while the other 9 cashiers stand around doing nothing. A <strong>Load Balancer</strong> is like an efficient manager standing at the front, directing new customers to the shortest line. This ensures nobody waits too long and no single cashier gets crushed.</p>
      </div>
    `,
    concept: `
      <h3>Traffic Directors of the Internet</h3>
      <p>When you use Horizontal Scaling (having multiple servers), you need a way to distribute incoming user traffic evenly across them.</p>
      
      <h3>Common Balancing Algorithms</h3>
      <ul>
        <li><strong>Round Robin:</strong> Sends request 1 to Server A, request 2 to Server B, request 3 to Server C, then starts over. Simple but blind to server capacity.</li>
        <li><strong>Least Connections:</strong> Sends the request to the server that currently has the fewest active users.</li>
        <li><strong>IP Hash:</strong> Mathematically routes a user to the exact same server every time based on their IP address (useful for keeping users logged in to a specific server).</li>
      </ul>
    `,
    hasSimulator: "lb-sim",
    interview: {
      question: "What happens if the Load Balancer itself crashes?",
      answer: "The Load Balancer becomes a single point of failure! To prevent this, we run multiple Load Balancers in an 'Active-Passive' or 'Active-Active' cluster. If the primary Load Balancer fails, the secondary one instantly detects the heartbeat failure and takes over its IP address using a protocol like VRRP."
    },
    quiz: [
      {
        question: "What is the main purpose of a Load Balancer?",
        options: ["To encrypt user traffic", "To cache database queries", "To distribute traffic evenly across multiple servers", "To compress video files"],
        answer: 2,
        explanation: "A load balancer distributes incoming network traffic across a group of backend servers."
      },
      {
        question: "Which algorithm ensures a user is always sent to the same server?",
        options: ["Round Robin", "IP Hash", "Least Connections", "Random"],
        answer: 1,
        explanation: "IP Hash uses the client's IP address to mathematically determine which server they are mapped to consistently."
      }
    ]
  },
  {
    courseType: "SD",
    id: "caching",
    title: "4. Caching Systems",
    category: "Performance",
    difficulty: "Intermediate",
    duration: "12 mins",
    analogy: `
      <div class="analogy-box">
        <h4>📚 The Desk vs The Library</h4>
        <p>Imagine you are writing a research paper. Every time you need a fact, you walk 10 minutes to the library, find the book, write down the fact, and walk 10 minutes back. This is agonizingly slow! Instead, you start bringing the most important books back to your desk. Now, when you need a fact, you just grab the book off your desk in 2 seconds.</p>
        <p>The library is the <strong>Database</strong> (massive storage, but slow). Your desk is the <strong>Cache</strong> (small storage, but blazing fast).</p>
      </div>
    `,
    concept: `
      <h3>Speeding Up the Web</h3>
      <p>A cache is a temporary storage layer that stores frequently accessed data in RAM (memory) so future requests for that data are served much faster than querying a hard drive.</p>
      
      <h3>Cache Hit vs Cache Miss</h3>
      <ul>
        <li><strong>Cache Hit:</strong> The data requested is found in the cache. Instant response!</li>
        <li><strong>Cache Miss:</strong> The data isn't in the cache. The system must query the slow Database, then save the result into the cache for next time.</li>
      </ul>
      <p><em>Popular Tools: Redis, Memcached</em></p>
    `,
    hasSimulator: "cache-sim",
    interview: {
      question: "What is Cache Invalidation, and why is it notoriously difficult?",
      answer: "Cache invalidation is the process of updating or removing cached data when the source database changes. It's difficult because if you don't invalidate properly, users will see stale, outdated data (like seeing an old profile picture after you updated it). Balancing cache lifetime (TTL) and real-time consistency is one of the hardest problems in computer science."
    },
    quiz: [
      {
        question: "Where is cached data typically stored to make it so fast?",
        options: ["Hard Disk Drives (HDD)", "Solid State Drives (SSD)", "RAM (Random Access Memory)", "Optical Disks"],
        answer: 2,
        explanation: "Caches store data in memory (RAM), which is orders of magnitude faster to read/write than disk storage."
      },
      {
        question: "What occurs during a 'Cache Miss'?",
        options: ["The user gets a 404 error", "The data is immediately found", "The system queries the slow database, then caches the result", "The cache deletes all its data"],
        answer: 2,
        explanation: "If data isn't in the cache (a miss), the system falls back to the database, fetches it, and stores a copy in the cache."
      }
    ]
  },
  {
    courseType: "SD",
    id: "databases",
    title: "5. Databases: SQL vs NoSQL",
    category: "Data Management",
    difficulty: "Intermediate",
    duration: "15 mins",
    analogy: `
      <div class="analogy-box">
        <h4>🗄️ The Filing Cabinet vs The Storage Box</h4>
        <p><strong>SQL (Relational):</strong> Like a rigid office filing cabinet. Every folder must have the exact same forms. You must fill out the 'Name', 'Date', and 'Phone' lines perfectly. It's very organized, making complex audits easy, but hard to change the form later.</p>
        <p><strong>NoSQL (Non-Relational):</strong> Like throwing items into a big storage box. You can put a toy, a book, and a shoe in the same box. It's incredibly flexible and easy to dump data into fast, but harder to perform complex cross-references.</p>
      </div>
    `,
    concept: `
      <h3>Choosing How to Store Data</h3>
      
      <div class="features-grid">
        <div class="feature-card">
          <div class="icon">📊</div>
          <h5>SQL (Relational)</h5>
          <p>Data is stored in tables with strict rows and columns. Excellent for data that relates to each other (e.g., Users, Orders, Products). Emphasizes ACID compliance (strict accuracy for things like banking). Examples: PostgreSQL, MySQL.</p>
        </div>
        <div class="feature-card">
          <div class="icon">📄</div>
          <h5>NoSQL (Non-Relational)</h5>
          <p>Data is stored as JSON documents or key-value pairs without a rigid schema. Excellent for unstructured data, rapid prototyping, and massive horizontal scaling. Examples: MongoDB, DynamoDB, Cassandra.</p>
        </div>
      </div>
    `,
    hasSimulator: "db-sim",
    interview: {
      question: "If you were building a financial banking app, would you choose SQL or NoSQL and why?",
      answer: "I would choose SQL. Financial systems require strong ACID (Atomicity, Consistency, Isolation, Durability) guarantees to ensure money isn't lost during concurrent transactions. Relational databases naturally enforce this strict consistency and schema validation."
    },
    quiz: [
      {
        question: "Which type of database is best described as having a rigid, table-based schema?",
        options: ["SQL", "NoSQL", "Graph Database", "Key-Value Store"],
        answer: 0,
        explanation: "SQL (Relational) databases require pre-defining tables with strict rows and columns."
      },
      {
        question: "Which database would you choose to store massive amounts of unstructured social media posts rapidly?",
        options: ["PostgreSQL", "MySQL", "Oracle", "MongoDB (NoSQL)"],
        answer: 3,
        explanation: "NoSQL databases excel at handling flexible, unstructured data and scaling horizontally to handle massive write volumes."
      }
    ]
  },
  {
    courseType: "SD",
    id: "message-queues",
    title: "6. Message Queues & Async",
    category: "Architecture",
    difficulty: "Advanced",
    duration: "14 mins",
    analogy: `
      <div class="analogy-box">
        <h4>☕ The Busy Coffee Shop</h4>
        <p>Imagine a coffee shop with 1 cashier and 3 baristas. If the cashier takes your order and physically goes to make your coffee before serving the next person, the line will stop moving! This is <strong>Synchronous</strong> processing.</p>
        <p>Instead, the cashier writes your order on a cup and puts it on the counter (the <strong>Message Queue</strong>). Then they immediately take the next person's order. The baristas pull cups off the queue and make drinks in the background. This is <strong>Asynchronous</strong> processing!</p>
      </div>
    `,
    concept: `
      <h3>Decoupling Systems</h3>
      <p>A Message Queue is a buffer that temporarily stores messages (tasks) between the sender and the receiver.</p>
      <ul>
        <li><strong>Producers:</strong> The servers creating the tasks (e.g., User clicks "Process Video").</li>
        <li><strong>Queue:</strong> The holding area. If the background servers are busy, tasks just wait safely in the queue.</li>
        <li><strong>Consumers:</strong> The worker servers pulling tasks off the queue and executing them at their own pace.</li>
      </ul>
      <p><em>Popular Tools: RabbitMQ, Apache Kafka, AWS SQS</em></p>
    `,
    hasSimulator: "queue-sim",
    interview: {
      question: "How do Message Queues help with traffic spikes?",
      answer: "They provide 'Load Leveling'. During a massive traffic spike (e.g., Black Friday), the frontend web servers can instantly accept millions of orders and dump them into the queue without waiting. The backend databases won't crash because they only pull messages from the queue at a safe, steady rate they can handle."
    },
    quiz: [
      {
        question: "What is the main benefit of Asynchronous processing?",
        options: ["It executes code instantly", "The user doesn't have to wait for heavy background tasks to finish", "It uses less memory", "It secures data better"],
        answer: 1,
        explanation: "Async processing allows the system to acknowledge the request immediately and do the heavy lifting in the background."
      },
      {
        question: "In the coffee shop analogy, what acts as the Message Queue?",
        options: ["The barista", "The cashier", "The counter holding the cups", "The coffee machine"],
        answer: 2,
        explanation: "The counter buffers the tasks (cups) between the Producer (cashier) and Consumers (baristas)."
      }
    ]
  },
  {
    courseType: "SD",
    id: "microservices",
    title: "7. Microservices vs Monolith",
    category: "Architecture",
    difficulty: "Advanced",
    duration: "15 mins",
    analogy: `
      <div class="analogy-box">
        <h4>🧰 Swiss Army Knife vs The Toolbox</h4>
        <p><strong>Monolith:</strong> A Swiss Army Knife. All the tools (knife, scissors, corkscrew) are tightly packed into one unit. It's easy to carry and deploy, but if the scissors break, you have to throw away the whole knife to fix it.</p>
        <p><strong>Microservices:</strong> A giant toolbox with independent tools. You have a separate hammer, screwdriver, and wrench. If the hammer breaks, you just replace the hammer without touching the other tools. Different people can work on different tools at the same time.</p>
      </div>
    `,
    concept: `
      <h3>Structuring Codebases</h3>
      <p>As engineering teams grow to hundreds of developers, having everyone work in the exact same codebase (Monolith) becomes a nightmare of merge conflicts and slow deployments.</p>
      <ul>
        <li><strong>Monolithic Architecture:</strong> The UI, business logic, and database access are all bundled into a single deployable application.</li>
        <li><strong>Microservice Architecture:</strong> Breaking the application into small, independent mini-applications (e.g., an Auth Service, a Payment Service, a Notification Service) that talk to each other over the network via APIs.</li>
      </ul>
    `,
    hasSimulator: "microservices-sim",
    interview: {
      question: "What is a major downside of moving to Microservices?",
      answer: "Increased operational complexity. Instead of deploying and monitoring one application, you are now managing 50 independent applications communicating over an unreliable network. You have to deal with distributed tracing, network latency, partial failures, and complex CI/CD pipelines."
    },
    quiz: [
      {
        question: "What is a characteristic of a Monolithic architecture?",
        options: ["All code is compiled into a single deployable unit", "Services communicate via REST APIs", "Different teams can use different programming languages easily", "It is immune to single points of failure"],
        answer: 0,
        explanation: "A monolith bundles all features into one large codebase and single deployment."
      },
      {
        question: "Why might a large company switch to Microservices?",
        options: ["To make network requests faster", "To allow separate teams to develop and deploy features independently", "To use less memory", "To simplify debugging"],
        answer: 1,
        explanation: "Microservices solve organizational scaling issues by allowing independent teams to deploy their specific services without coordinating with the whole company."
      }
    ]
  },
  {
    courseType: "SD",
    id: "cap-theorem",
    title: "8. The CAP Theorem",
    category: "Core Concepts",
    difficulty: "Advanced",
    duration: "10 mins",
    analogy: `
      <div class="analogy-box">
        <h4>🔺 The Impossible Triangle</h4>
        <p>Imagine you have two friends keeping a list of people invited to a party. They sit in different rooms. When someone RSVPs, they shout the name to the other room.</p>
        <p>Now, what if the door closes and they can't hear each other (a Network <strong>Partition</strong>)?</p>
        <p>If someone arrives to RSVP to friend A, friend A has two choices:</p>
        <p>1. Accept the RSVP, but friend B won't know. (Sacrificing <strong>Consistency</strong> for Availability).</p>
        <p>2. Refuse the RSVP until the door opens so the lists always match. (Sacrificing <strong>Availability</strong> for Consistency).</p>
      </div>
    `,
    concept: `
      <h3>Pick Two: Consistency, Availability, Partition Tolerance</h3>
      <p>In distributed systems, networks will eventually fail (Partition). When that happens, you must choose between:</p>
      <ul>
        <li><strong>Consistency (C):</strong> Every read receives the most recent write. (All nodes see the exact same data).</li>
        <li><strong>Availability (A):</strong> Every request receives a non-error response, but without the guarantee it contains the most recent write.</li>
        <li><strong>Partition Tolerance (P):</strong> The system continues to operate despite network failures dropping messages between nodes.</li>
      </ul>
      <p>Since 'P' is a fact of life on the internet, databases are usually categorized as either <strong>CP</strong> (Consistant & Partition Tolerant) or <strong>AP</strong> (Available & Partition Tolerant).</p>
    `,
    hasSimulator: "cap-sim",
    interview: {
      question: "Would a social media feed prefer an AP or CP system?",
      answer: "A social media feed prefers an AP (Available and Partition Tolerant) system. It is perfectly fine if User A sees a slightly stale version of a friend's timeline for a few seconds (Eventual Consistency), as long as the app loads fast and doesn't crash when requested."
    },
    quiz: [
      {
        question: "In the CAP Theorem, what does Consistency mean?",
        options: ["The UI looks the same on all devices", "Every read receives the most recent write across all nodes", "The server never crashes", "Data is backed up daily"],
        answer: 1,
        explanation: "Consistency ensures all clients see the exact same data at the same time, no matter which node they query."
      },
      {
        question: "If a banking app encounters a network failure between data centers, should it choose Consistency or Availability?",
        options: ["Availability (AP)", "Consistency (CP)", "Neither", "Both"],
        answer: 1,
        explanation: "Banking requires strict consistency. It is better to decline a transaction (sacrificing availability) than to process an ATM withdrawal with an outdated balance."
      }
    ]
  },
  {
    courseType: "SD",
    id: "cdns",
    title: "9. Content Delivery Networks (CDNs)",
    category: "Performance",
    difficulty: "Beginner",
    duration: "8 mins",
    analogy: `
      <div class="analogy-box">
        <h4>🌍 The Global Pizza Franchise</h4>
        <p>Imagine the best pizza shop in the world is located in New York. If someone in Tokyo orders a pizza, it takes 15 hours to fly it there, and it arrives cold.</p>
        <p>To fix this, the shop opens franchise locations in Tokyo, London, and Sydney. They give them the recipe. Now, when someone in Tokyo orders pizza, the local Tokyo branch makes it and delivers it in 20 minutes hot!</p>
        <p>A <strong>CDN</strong> does this for website data (images, videos). Instead of making a user in Tokyo fetch images from a server in New York, the images are copied to servers globally.</p>
      </div>
    `,
    concept: `
      <h3>Bringing Data Closer to the User</h3>
      <p>A Content Delivery Network (CDN) is a globally distributed network of proxy servers. Their goal is to cache static content (like HTML pages, images, Javascript, and videos) physically closer to end-users to drastically reduce latency (load times).</p>
      
      <p>When a user requests an image, the request routes to the nearest <strong>Edge Server</strong>. If the edge server has the image, it returns it instantly. If not, it requests it from the original <strong>Origin Server</strong>, caches it, and then sends it to the user.</p>
    `,
    hasSimulator: "cdn-sim",
    interview: {
      question: "How does a CDN improve system security and reliability?",
      answer: "CDNs act as a massive shield in front of your origin servers. Because they have enormous bandwidth capacity spread globally, they can absorb massive Distributed Denial of Service (DDoS) attacks. They also offload 80-90% of traffic from your origin server, preventing it from crashing under heavy load."
    },
    quiz: [
      {
        question: "What type of content is best suited for a CDN?",
        options: ["Live database queries", "Real-time chat messages", "Static images, CSS, and videos", "User passwords"],
        answer: 2,
        explanation: "CDNs excel at caching static assets that don't change frequently per user."
      },
      {
        question: "What is an Edge Server?",
        options: ["The main database server", "A CDN server physically located close to users", "A server that processes payments", "A deprecated server"],
        answer: 1,
        explanation: "Edge servers sit at the 'edge' of the network, close to the users, caching content to deliver it with low latency."
      }
    ]
  },
  {
    courseType: "SD",
    id: "design-whatsapp",
    title: "10. Capstone: Designing WhatsApp",
    category: "System Design Interview",
    difficulty: "Expert",
    duration: "20 mins",
    analogy: `
      <div class="analogy-box">
        <h4>💬 The Post Office Assembly Line</h4>
        <p>Putting it all together: To build a system that handles billions of messages, you need Load Balancers at the front door to handle the massive crowd. You need a fast Cache so people can see who is online instantly. You need Message Queues so that if someone's phone is off, their incoming letters wait in a safe box. And you need a NoSQL database to store the petabytes of chat history.</p>
      </div>
    `,
    concept: `
      <h3>High-Level Architecture</h3>
      <p>To design a massive chat application like WhatsApp:</p>
      <ol>
        <li><strong>Connection Handling:</strong> Mobile devices connect via WebSockets for real-time, two-way communication. A fleet of <em>Chat Servers</em> hold these active connections.</li>
        <li><strong>Routing:</strong> When Alice sends a message to Bob, the system must find out which Chat Server Bob is currently connected to. This mapping is stored in a fast <em>Redis Cache</em>.</li>
        <li><strong>Message Queue:</strong> If Bob is offline, the message is pushed to a <em>Message Queue</em> (like Kafka) and stored in the database.</li>
        <li><strong>Push Notifications:</strong> The queue triggers a third-party service (Apple Push / Firebase) to wake Bob's phone up.</li>
        <li><strong>Database:</strong> A highly scalable NoSQL database (like Cassandra) is used to store the trillions of chat history messages rapidly.</li>
      </ol>
    `,
    hasSimulator: "whatsapp-sim",
    interview: {
      question: "How do you scale WebSocket connections to handle 1 billion active users?",
      answer: "A single standard server can only handle around 65,000 ports. By tuning the OS, we can achieve 500k-1M connections per server. To handle 1 billion users, we horizontally scale the Chat Servers and use a dedicated 'Connection Manager' service with Redis to track which user is connected to which specific Chat Server node in the cluster."
    },
    quiz: [
      {
        question: "What technology is primarily used for real-time, bi-directional chat communication?",
        options: ["Standard HTTP GET requests", "WebSockets", "FTP", "DNS"],
        answer: 1,
        explanation: "WebSockets maintain an open, persistent connection between the client and server, allowing instant real-time data push."
      },
      {
        question: "If the recipient's phone is turned off, where should the message be held safely?",
        options: ["In a CDN", "In the Load Balancer memory", "In a Message Queue and Database", "It should be deleted"],
        answer: 2,
        explanation: "A Message Queue safely buffers the message, and it is stored in the DB until the recipient reconnects and requests it."
      }
    ]
  },

  {
    id: "neural-networks-rt",
    courseType: "DL", // OVERRIDDEN
    title: "11. Neural Networks (Real-Time: Self-Driving)",
    category: "Deep Learning",
    difficulty: "Advanced",
    duration: "25 mins",
    jobHighlight: "Autonomous Vehicle Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>🚗 The Self-Driving Car Analogy</h4>
        <p>Imagine teaching a teenager to drive. At first, they jerk the wheel too much or brake too hard. Every time they make a mistake, you correct them (backpropagation). Over time, their brain forms connections (weights) that let them steer perfectly in real-time. A Neural Network processes live video frames from a car's camera and makes instant steering decisions just like a human brain.</p>
      </div>
    `,
    concept: `
      <h3>Processing Video in Real-Time</h3>
      <p>A neural network consists of layers of interconnected "neurons". In a self-driving car:</p>
      <ul>
        <li><strong>Input Layer:</strong> Receives raw pixel data from the camera at 60 FPS.</li>
        <li><strong>Hidden Layers:</strong> Identifies edges, then shapes, then objects (like stop signs or pedestrians).</li>
        <li><strong>Output Layer:</strong> Outputs continuous control signals (Steering Angle, Throttle, Brake).</li>
      </ul>
      <p>This entire forward pass must happen in under 10 milliseconds to ensure safety at highway speeds!</p>
    `,
    math: `
      <h4>Forward Propagation</h4>
      <div class="math-block">$$z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}$$</div>
      <div class="math-block">$$a^{[l]} = g(z^{[l]})$$</div>
      <p>Where $W$ is the weight matrix, $a$ is the activation, and $g$ is an activation function like ReLU. For real-time execution, these massive matrix multiplications are accelerated using dedicated GPUs or TPUs.</p>
    `,
    code: `
# Practical Example: Simple Neural Net Forward Pass
import numpy as np

def relu(x):
    return np.maximum(0, x)

# Simulated live camera input (flattened 20x20 image)
live_frame = np.random.randn(400, 1)

# Trained weights for steering
W1 = np.random.randn(64, 400) * 0.01
b1 = np.zeros((64, 1))
W2 = np.random.randn(1, 64) * 0.01
b2 = np.zeros((1, 1))

# Real-time forward pass
layer1 = relu(np.dot(W1, live_frame) + b1)
steering_angle = np.dot(W2, layer1) + b2

print(f"Calculated Steering Angle: {steering_angle[0][0]:.2f} degrees")
    `,
    interview: {
      question: "How do you ensure a Deep Learning model meets real-time latency requirements (e.g., < 20ms) for an autonomous system?",
      answer: "You optimize the model using techniques like Quantization (reducing precision from float32 to int8), Pruning (removing near-zero weights), or using specialized lightweight architectures like MobileNet. You also run inference on specialized hardware accelerators (GPUs, TPUs, NPUs) using optimized runtimes like TensorRT."
    },
    quiz: [
      {
        question: "Why are Neural Networks well-suited for autonomous driving?",
        options: ["They are the easiest models to train", "They can process complex unstructured data like images in real-time", "They do not require any training data", "They are 100% predictable"],
        answer: 1,
        explanation: "Neural networks excel at finding complex patterns in massive, unstructured data streams like live video feeds."
      }
    ],
    hasSimulator: null
  },
  {
    id: "computer-vision-rt",
    courseType: "DL", // OVERRIDDEN
    title: "12. CNNs (Real-Time: Face ID)",
    category: "Deep Learning",
    difficulty: "Advanced",
    duration: "20 mins",
    jobHighlight: "Computer Vision Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>🔍 The Detective with a Magnifying Glass</h4>
        <p>Imagine a detective scanning a large painting. Instead of looking at the whole painting at once, they slide a magnifying glass over it inch by inch, looking for specific clues (a fingerprint, a red thread). A Convolutional Neural Network (CNN) does exactly this—sliding filters over an image to detect edges, then eyes, then a specific face, allowing your phone to unlock instantly.</p>
      </div>
    `,
    concept: `
      <h3>Facial Recognition in Milliseconds</h3>
      <p>Modern Face ID systems don't just compare raw pixels (which would fail if the lighting changed). Instead, they use CNNs to extract a "Face Embedding"—a compact mathematical representation of your facial features.</p>
      <ul>
        <li><strong>Convolutional Layers:</strong> Slide filters across the image to detect spatial patterns.</li>
        <li><strong>Pooling Layers:</strong> Shrink the image to reduce computation time.</li>
        <li><strong>Siamese Networks:</strong> Compare the live face embedding against the stored embedding in real-time. If the distance is close enough, the phone unlocks.</li>
      </ul>
    `,
    math: `
      <h4>The Convolution Operation</h4>
      <div class="math-block">$$(f * g)(t) = \int_{-\infty}^{\infty} f(\tau)g(t-\tau) d\tau$$</div>
      <p>In discrete 2D space (like an image), we slide a small weight matrix (the kernel) over the pixel grid, multiplying and summing the overlapping values to create a feature map.</p>
    `,
    code: `
# Practical Example: Applying a Edge-Detection Filter
import numpy as np

# A simplified 5x5 image patch
image_patch = np.array([
    [0, 0, 0, 10, 10],
    [0, 0, 0, 10, 10],
    [0, 0, 0, 10, 10],
    [0, 0, 0, 10, 10],
    [0, 0, 0, 10, 10]
])

# Vertical Edge Detection Kernel
kernel = np.array([
    [-1, 0, 1],
    [-1, 0, 1],
    [-1, 0, 1]
])

print("Image contains a vertical edge. A CNN learns these kernels automatically!")
    `,
    interview: {
      question: "Why do we use Convolutional Neural Networks for images instead of standard Dense/Linear layers?",
      answer: "Standard dense layers treat pixels independently and ignore the spatial relationships (e.g., that an eye is above a nose). CNNs preserve spatial structure and drastically reduce the number of parameters by sharing weights (sliding the same kernel across the image), making them faster and less prone to overfitting."
    },
    quiz: [
      {
        question: "What is the primary purpose of a Convolutional Layer?",
        options: ["To translate text", "To slide filters over an input to detect spatial patterns like edges", "To store data in a database", "To sort arrays"],
        answer: 1,
        explanation: "Convolutional layers act like sliding windows that detect specific visual patterns across an image."
      }
    ],
    hasSimulator: null
  },
  {
    courseType: "ML",
    id: "recommender-systems-rt",
    title: "13. Recommenders (Real-Time: TikTok Feeds)",
    category: "Machine Learning",
    difficulty: "Intermediate",
    duration: "18 mins",
    jobHighlight: "Personalization Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>📱 The Hyper-Attentive Waiter</h4>
        <p>Imagine a waiter who notes exactly how long you look at the dessert menu. If you stare at the chocolate cake for 3 seconds, he instantly brings you a chocolate cake. If you swipe away the salad menu instantly, he never mentions salads again. Real-time recommender systems monitor your micro-interactions (watch time, likes, shares) and update your feed in milliseconds to maximize engagement.</p>
      </div>
    `,
    concept: `
      <h3>Real-Time Collaborative Filtering</h3>
      <p>Systems like TikTok use massive two-tower neural networks:</p>
      <ul>
        <li><strong>User Tower:</strong> Encodes your real-time state (last 10 videos watched, current time of day).</li>
        <li><strong>Item Tower:</strong> Encodes the video features (audio track, hashtags, creator).</li>
      </ul>
      <p>When you swipe, the system instantly computes the dot product between your updated User Vector and millions of Item Vectors to find the next best video, re-ranking the queue dynamically.</p>
    `,
    math: `
      <h4>Dot Product Similarity</h4>
      <p>The system calculates how aligned your preferences are with a video using the Dot Product of the user embedding $u$ and the item embedding $v$:</p>
      <div class="math-block">$$Score = \mathbf{u} \cdot \mathbf{v} = \sum_{i=1}^{n} u_i v_i$$</div>
      <p>To do this for millions of videos in under 50ms, systems use Approximate Nearest Neighbor (ANN) search algorithms.</p>
    `,
    code: `
# Practical Example: Vector Similarity for Recommendations
import numpy as np

# User embedding (e.g., prefers comedy and dogs)
user_vector = np.array([0.8, 0.1, 0.9])

# Video 1: Dog playing piano (High comedy, high dog)
video1_vector = np.array([0.9, 0.2, 0.8])

# Video 2: Serious political debate
video2_vector = np.array([0.1, 0.9, 0.1])

# Calculate scores using dot product
score1 = np.dot(user_vector, video1_vector)
score2 = np.dot(user_vector, video2_vector)

print(f"Score for Dog Video: {score1:.2f}")
print(f"Score for Debate Video: {score2:.2f}")
print("System instantly queues the Dog Video next!")
    `,
    interview: {
      question: "How do you serve recommendations in real-time when comparing against millions of items is too slow?",
      answer: "We use a two-stage pipeline: Retrieval and Ranking. Retrieval uses Approximate Nearest Neighbor (ANN) algorithms (like Faiss or HNSW) to quickly fetch the top 1,000 candidates. Then, a heavier, more accurate Ranking model sorts those 1,000 items in real-time before sending the top 10 to the user."
    },
    quiz: [
      {
        question: "What is the two-stage pipeline commonly used in real-time recommenders?",
        options: ["Data collection and Cleaning", "Retrieval and Ranking", "Training and Validation", "Frontend and Backend"],
        answer: 1,
        explanation: "Retrieval quickly narrows down millions of items to hundreds, and Ranking precisely sorts those hundreds in real-time."
      }
    ],
    hasSimulator: null
  },
  {
    id: "generative-ai-rt",
    courseType: "AI", // OVERRIDDEN
    title: "14. Gen AI (Real-Time: ChatGPT)",
    category: "Generative AI",
    difficulty: "Advanced",
    duration: "30 mins",
    jobHighlight: "LLM Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>✍️ The Autocomplete on Steroids</h4>
        <p>Have you ever used predictive text on your phone? You type "I am going to the" and it suggests "store". A Large Language Model (LLM) is doing the same thing, but it has read the entire internet. It generates responses in real-time by predicting the absolute most mathematically probable *next word*, over and over again, incredibly fast, creating the illusion of reasoning.</p>
      </div>
    `,
    concept: `
      <h3>Transformers & Autoregressive Generation</h3>
      <p>When you talk to ChatGPT, it streams the answer back to you word-by-word. This is called Autoregressive Generation.</p>
      <ul>
        <li><strong>Self-Attention:</strong> The model looks at all previous words to understand context. E.g., the word "bank" means something different if preceded by "river" versus "money".</li>
        <li><strong>KV Caching:</strong> To generate words in real-time without re-reading the entire conversation every single millisecond, the system caches past calculations in memory (the KV cache).</li>
      </ul>
    `,
    math: `
      <h4>The Attention Mechanism</h4>
      <div class="math-block">$$Attention(Q, K, V) = softmax\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$</div>
      <p>This legendary formula allows the model to assign "weight" or "attention" to different words in a sentence, drastically outperforming older sequential models like RNNs.</p>
    `,
    code: `
# Practical Example: How LLMs generate text token-by-token
import time

vocabulary = {"The": 0.1, "cat": 0.4, "sat": 0.3, "on": 0.2, "the": 0.5, "mat": 0.8}
prompt = "The cat sat on the "

print(f"User Prompt: '{prompt}'")
print("LLM predicting next token...")
time.sleep(1) # Simulating compute

# The model picks the token with the highest probability given the context
next_token = max(vocabulary, key=vocabulary.get)
print(f"Generated Token: '{next_token}'")
print(f"Final Sentence: '{prompt + next_token}'")
    `,
    interview: {
      question: "What is KV Caching and why is it essential for real-time LLM inference?",
      answer: "In autoregressive generation, generating the Nth token requires processing all previous N-1 tokens. Instead of recalculating the Attention Key (K) and Value (V) matrices for the whole sequence every time a new token is generated, we store the K and V matrices of past tokens in a memory cache. This prevents redundant compute and drastically lowers latency, making real-time streaming possible."
    },
    quiz: [
      {
        question: "How do LLMs like ChatGPT generate text?",
        options: ["They search a database of pre-written answers", "They predict and generate text one token (word) at a time", "They write the entire paragraph at once before showing it", "They rely purely on human operators"],
        answer: 1,
        explanation: "LLMs are autoregressive, meaning they predict the very next token based on all previously seen tokens, over and over."
      }
    ],
    hasSimulator: null
  },
  {
    courseType: "ML",
    id: "reinforcement-learning-rt",
    title: "15. RL (Real-Time: Trading Bots)",
    category: "Machine Learning",
    difficulty: "Advanced",
    duration: "25 mins",
    jobHighlight: "Quantitative Researcher",
    analogy: `
      <div class="analogy-box">
        <h4>🎮 Training a Dog with Treats</h4>
        <p>If you want a dog to sit, you give it a treat when it sits. If it jumps on the couch, you scold it. Over time, the dog learns to maximize treats. Reinforcement Learning (RL) works exactly the same way. An agent explores an environment (like the stock market) and receives rewards (profits) or punishments (losses). It learns a "Policy" to make real-time decisions that maximize long-term rewards.</p>
      </div>
    `,
    concept: `
      <h3>High-Frequency Trading with RL</h3>
      <p>In algorithmic trading, an RL bot monitors live market data and must make buy/sell decisions in microseconds.</p>
      <ul>
        <li><strong>State:</strong> The current market conditions (prices, volume, order book depth).</li>
        <li><strong>Action:</strong> Buy, Sell, or Hold.</li>
        <li><strong>Reward:</strong> Realized profit or loss after a trade.</li>
      </ul>
      <p>The bot learns a mapping from States to Actions that historically yielded the highest rewards, adapting instantly to live order book changes.</p>
    `,
    math: `
      <h4>The Bellman Equation</h4>
      <p>The foundation of Q-learning. It updates the expected value (Q-value) of taking a specific action in a specific state:</p>
      <div class="math-block">$$Q(s, a) = Q(s, a) + \alpha \left[ R + \gamma \max_{a'} Q(s', a') - Q(s, a) \right]$$</div>
      <p>This allows the agent to value long-term delayed rewards, not just immediate gains.</p>
    `,
    code: `
# Practical Example: Simple Trading Agent Logic
current_state_price_trend = "UP"
q_table = {
    "UP": {"BUY": 10.5, "SELL": -2.0, "HOLD": 1.0},
    "DOWN": {"BUY": -5.0, "SELL": 8.0, "HOLD": 2.0}
}

# The agent observes the real-time state and picks the action with highest Q-value
best_action = max(q_table[current_state_price_trend], key=q_table[current_state_price_trend].get)

print(f"Market Trend is {current_state_price_trend}")
print(f"RL Agent instantly executes: {best_action} Order!")
    `,
    interview: {
      question: "What is the Exploration vs Exploitation tradeoff in Reinforcement Learning?",
      answer: "Exploitation means the agent chooses the action it currently believes yields the highest reward based on past experience. Exploration means the agent tries a random new action to discover potentially better strategies. Balancing this is critical; too much exploration loses money, but too much exploitation means the bot might miss a more profitable strategy."
    },
    quiz: [
      {
        question: "What does the Bellman Equation help an RL agent do?",
        options: ["Categorize images", "Value long-term delayed rewards", "Predict exact stock prices", "Format text"],
        answer: 1,
        explanation: "The Bellman equation calculates the expected future reward of an action, allowing the agent to plan long-term rather than being greedy for immediate reward."
      }
    ],
    hasSimulator: null
  },

  {
    courseType: "SD",
    id: "api-gateways-rt",
    title: "11. API Gateways (Real-Time: Uber)",
    category: "Architecture",
    difficulty: "Intermediate",
    duration: "15 mins",
    analogy: `
      <div class="analogy-box">
        <h4>🏢 The Ultimate Receptionist</h4>
        <p>Imagine a massive corporate building with 100 different departments. If visitors just wandered inside, it would be chaos. Instead, there is a master receptionist at the front door. They check your ID (Authentication), limit how many people go in (Rate Limiting), and give you directions to the exact room you need (Routing). An API Gateway does this for web traffic.</p>
      </div>
    `,
    concept: `
      <h3>Routing Live Traffic</h3>
      <p>When you open the Uber app, your phone makes dozens of requests (get location, get prices, find drivers). Instead of your phone talking to 50 different microservices directly, it talks to ONE single entry point: The API Gateway.</p>
      <ul>
        <li><strong>Routing:</strong> Forwards the '/price' request to the Pricing Service, and '/driver' to the Dispatch Service.</li>
        <li><strong>Authentication:</strong> Validates your JWT token before letting traffic into the internal network.</li>
        <li><strong>Aggregation:</strong> Combines responses from 5 services into a single payload to save the mobile app battery.</li>
      </ul>
    `
  },
  {
    courseType: "SD",
    id: "websockets-rt",
    title: "12. WebSockets (Real-Time: Stock Tickers)",
    category: "Communication",
    difficulty: "Advanced",
    duration: "20 mins",
    analogy: `
      <div class="analogy-box">
        <h4>📞 The Open Phone Line</h4>
        <p>Normally on the web (HTTP), you send a letter and wait for a reply. If you want updates, you have to keep sending letters asking "Are we there yet?" (Polling). WebSockets are like keeping a phone call open. Once connected, either side can speak instantly at any time. This is how live chat, stock tickers, and multiplayer games work!</p>
      </div>
    `,
    concept: `
      <h3>Full-Duplex Communication</h3>
      <p>WebSockets start with an HTTP Handshake, then "upgrade" the connection to a persistent TCP stream. This enables extremely low-latency, bidirectional communication.</p>
      <div class="features-grid">
        <div class="feature-card">
          <h5>Polling (Bad)</h5>
          <p>Client asks server every 1 second: "Any new messages?". Wastes massive amounts of server CPU and bandwidth.</p>
        </div>
        <div class="feature-card">
          <h5>WebSockets (Good)</h5>
          <p>Connection stays open. Server pushes data to the client exactly the millisecond an event occurs. Highly efficient.</p>
        </div>
      </div>
    `
  },
  {
    courseType: "SD",
    id: "event-streaming-rt",
    title: "13. Event Streaming (Real-Time: Fraud)",
    category: "Data Pipelines",
    difficulty: "Advanced",
    duration: "25 mins",
    analogy: `
      <div class="analogy-box">
        <h4>📻 The Radio Broadcast</h4>
        <p>Instead of a Message Queue (where a cook takes a ticket and throws it away), Event Streaming (like Apache Kafka) is like a radio broadcast. The radio station plays a song (publishes an event). Millions of listeners (consumers) can tune in and hear the song. If a listener joined late, they can rewind the tape and listen to history! Kafka stores a permanent log of all events.</p>
      </div>
    `,
    concept: `
      <h3>Catching Fraud in Milliseconds</h3>
      <p>When you swipe your credit card, an event is published to a Kafka "Topic". Instantly, multiple independent systems "listen" to this event:</p>
      <ul>
        <li><strong>Fraud Service:</strong> Instantly evaluates the transaction and blocks it if suspicious.</li>
        <li><strong>Ledger Service:</strong> Updates your bank account balance.</li>
        <li><strong>Analytics Service:</strong> Updates a live dashboard for bank administrators.</li>
      </ul>
      <p>Because Kafka is an immutable append-only log, it can handle millions of events per second with near-zero latency.</p>
    `
  },
  {
    courseType: "SD",
    id: "rate-limiting-rt",
    title: "14. Rate Limiting (Real-Time: Ticketmaster)",
    category: "Architecture",
    difficulty: "Intermediate",
    duration: "15 mins",
    analogy: `
      <div class="analogy-box">
        <h4>🎟️ The Nightclub Bouncer</h4>
        <p>If Taylor Swift concert tickets go on sale, millions of people rush the doors at the exact same second. If everyone storms in, the building collapses (server crash). The bouncer at the door implements Rate Limiting: "Only 100 people allowed in per second. Everyone else, wait in line!" This guarantees the servers stay healthy during massive spikes.</p>
      </div>
    `,
    concept: `
      <h3>Algorithms for Survival</h3>
      <p>API Gateways use rate limiting algorithms to drop excess traffic instantly:</p>
      <ul>
        <li><strong>Token Bucket:</strong> You have a bucket of 10 tokens. Every request costs 1 token. The bucket refills at 1 token per second. If empty, you are blocked!</li>
        <li><strong>Fixed Window:</strong> You are allowed 100 requests per minute. Resets at the top of the minute. (Can cause spikes exactly at 12:01).</li>
      </ul>
      <p>By returning HTTP Status Code 429 (Too Many Requests), the system survives real-time DDoS attacks or viral traffic spikes.</p>
    `
  },
  {
    courseType: "SD",
    id: "geospatial-dbs-rt",
    title: "15. Geospatial DBs (Real-Time: Uber Drivers)",
    category: "Databases",
    difficulty: "Advanced",
    duration: "20 mins",
    analogy: `
      <div class="analogy-box">
        <h4>🗺️ The City Grid</h4>
        <p>If you want to find an Uber driver, the app doesn't calculate the distance between you and every single driver on Earth (that would take hours!). Instead, it divides the world map into a grid of squares. It first looks in your square. If there are no drivers, it checks the neighboring squares. This is how Geospatial Databases work!</p>
      </div>
    `,
    concept: `
      <h3>QuadTrees and Geohashes</h3>
      <p>Real-time location matching relies on spatial indexing:</p>
      <ul>
        <li><strong>Geohash:</strong> Converts a 2D latitude/longitude into a 1D string (e.g., '9q8yy'). Drivers with matching prefixes are guaranteed to be physically close!</li>
        <li><strong>QuadTrees:</strong> A tree data structure that recursively subdivides the map into four quadrants based on driver density.</li>
      </ul>
      <p>Redis Geospatial commands (like GEOSEARCH) store driver locations in RAM and return matches in sub-milliseconds.</p>
    `
  }
,

  {
    courseType: "ML",
    id: "capstone-spotify-ml",
    title: "16. Capstone: Spotify Discover Weekly",
    category: "Generative AI",
    difficulty: "Advanced",
    duration: "45 mins",
    jobHighlight: "Machine Learning Engineer at Spotify",
    analogy: `
      <div class="analogy-box">
        <h4>🎧 The Ultimate DJ</h4>
        <p>Imagine a DJ who has memorized every mixtape ever created by 500 million people. If the DJ notices that thousands of people put "Song A" and "Song B" on the same mixtape, they realize those songs are deeply connected. But what if "Song C" was just released today and has zero plays? The DJ actually listens to the raw audio of Song C, realizes the guitar riff sounds exactly like Song A, and instantly recommends it to you. That's how Spotify works.</p>
      </div>
    `,
    concept: `
      <h3>The Three Pillars of Discover Weekly</h3>
      <p>Spotify doesn't rely on just one ML model. It uses a massive ensemble of three distinct systems:</p>
      <ul>
        <li><strong>1. Collaborative Filtering (Matrix Factorization):</strong> Spotify maps users and songs into a giant mathematical grid. If User A and User B have similar tastes, Spotify recommends User B's favorite songs to User A.</li>
        <li><strong>2. Natural Language Processing (NLP):</strong> Spotify constantly scrapes music blogs, Wikipedia, and news articles to understand the cultural context of a song (e.g., tagging it as "chill indie pop" based on internet chatter).</li>
        <li><strong>3. Audio Convolutional Neural Networks (CNNs):</strong> To solve the "Cold Start Problem" for brand new artists, Spotify converts raw mp3 files into visual <strong>spectrograms</strong>. It runs image-recognition CNNs on the audio visualization to detect tempo, key, and instruments!</li>
      </ul>
    `,
    math: `
      <h4>Matrix Factorization</h4>
      <p>Spotify decomposes a giant, sparse User-Item interaction matrix $R$ into two smaller, dense matrices: User Embeddings $U$ and Item Embeddings $V$.</p>
      <div class="math-block">$$R \approx U \times V^T$$</div>
      <p>By finding the dot product of your user vector and a song's vector, Spotify predicts exactly how much you will like a song.</p>
    `,
    code: `
# Practical Example: Collaborative Filtering Intuition
import numpy as np

# Let's say we learned 2 latent features for users: [Preference for Rock, Preference for Pop]
user_alice = np.array([0.9, 0.1])
user_bob = np.array([0.2, 0.8])

# Let's say we learned 2 latent features for songs: [Is Rock, Is Pop]
song_stairway = np.array([0.95, 0.05])
song_toxic = np.array([0.1, 0.9])

# Predict ratings using Dot Product
alice_stairway_score = np.dot(user_alice, song_stairway)
alice_toxic_score = np.dot(user_alice, song_toxic)

print(f"Alice's predicted affinity for Stairway to Heaven: {alice_stairway_score:.2f}")
print(f"Alice's predicted affinity for Toxic: {alice_toxic_score:.2f}")
    `,
    interview: {
      question: "What is the 'Cold Start' problem in Recommender Systems, and how does Spotify solve it?",
      answer: "The cold start problem occurs when a new item (song) or new user enters the system with zero historical interaction data, meaning Collaborative Filtering fails. Spotify solves this using Content-Based Filtering: they use NLP on web articles to understand the song's cultural context, and CNNs on the raw audio spectrograms to understand its acoustic properties, allowing them to recommend songs that have never been played before."
    },
    quiz: [
      {
        question: "Why does Spotify use Convolutional Neural Networks (CNNs), which are usually for images?",
        options: ["To analyze album artwork", "To process audio spectrograms (visual representations of sound)", "To track user mouse movements on the screen", "To compress the database"],
        answer: 1,
        explanation: "By converting audio into a visual spectrogram, Spotify can use powerful image-recognition CNNs to analyze the acoustic properties of a song."
      }
    ],
    hasSimulator: null
  },
  {
    id: "capstone-tesla-autopilot",
    courseType: "DL", // OVERRIDDEN
    title: "17. Capstone: Tesla Autopilot Vision",
    category: "Deep Learning",
    difficulty: "Expert",
    duration: "50 mins",
    jobHighlight: "Autonomous Driving Researcher",
    analogy: `
      <div class="analogy-box">
        <h4>👁️ The Million-Eyed Driver</h4>
        <p>Imagine if every time you made a driving mistake, millions of other drivers instantly learned from it. Tesla's advantage isn't just their algorithms; it's their "Fleet". If an Autopilot system gets confused by a weirdly shaped truck on a highway, human intervention takes over. That exact video clip is sent to a supercomputer, automatically labeled, and the neural network is retrained. The car wakes up the next day smarter.</p>
      </div>
    `,
    concept: `
      <h3>The Data Engine & HydraNets</h3>
      <p>Tesla completely abandoned Radar and Lidar in favor of "Pure Vision". This requires incredibly advanced ML architectures:</p>
      <ul>
        <li><strong>The Data Engine:</strong> When the car's ML model is unsure (low confidence), it triggers a snapshot. This "edge case" data (e.g., a stop sign held by a construction worker) is beamed back to Tesla's servers, manually labeled, and added to the training set.</li>
        <li><strong>HydraNets:</strong> A massive neural network architecture. Instead of running 50 separate models (one for lane lines, one for cars, one for traffic lights), Tesla runs one giant "Backbone" (the body) that processes the 8 camera feeds. This backbone then splits into dozens of "Heads" that output specific predictions simultaneously. This drastically reduces compute latency.</li>
        <li><strong>Vector Space:</strong> The cameras capture 2D pixels, but the car needs to drive in a 3D world. The neural net projects 2D image data into a 3D "Bird's Eye View" vector space in real-time.</li>
      </ul>
    `,
    math: `
      <h4>Multi-Task Loss Functions</h4>
      <p>Because a HydraNet predicts multiple things at once, it optimizes a combined loss function:</p>
      <div class="math-block">$$L_{total} = w_1 L_{lanes} + w_2 L_{vehicles} + w_3 L_{lights} + ...$$</div>
      <p>Where $w$ are dynamically tuned weights ensuring the network doesn't prioritize detecting lane lines over avoiding a pedestrian.</p>
    `,
    code: `
# Practical Example: Multi-Task Learning (HydraNet Architecture concept)
import torch.nn as nn

class SimpleHydraNet(nn.Module):
    def __init__(self):
        super().__init__()
        # The 'Backbone' processes the raw image
        self.shared_backbone = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=3),
            nn.ReLU(),
            nn.MaxPool2d(2)
        )
        
        # 'Heads' branch off to do specific tasks
        self.lane_detection_head = nn.Linear(64, 2) # Outputs lane coordinates
        self.vehicle_detection_head = nn.Linear(64, 4) # Outputs bounding boxes

    def forward(self, x):
        features = self.shared_backbone(x)
        features = features.view(features.size(0), -1) # Flatten
        
        lanes = self.lane_detection_head(features)
        vehicles = self.vehicle_detection_head(features)
        
        return lanes, vehicles
    `,
    interview: {
      question: "Why do companies like Tesla use a single 'HydraNet' (Multi-Task Learning) instead of running separate Neural Networks for different tasks?",
      answer: "Running separate networks for lane detection, object detection, and traffic lights would require processing the same high-resolution camera feeds multiple times, which is too slow and power-hungry for edge devices (the car's computer). A HydraNet uses a shared backbone to extract visual features once, and then lightweight heads make the final predictions, vastly improving real-time latency and power efficiency."
    },
    quiz: [
      {
        question: "What is Tesla's 'Data Engine' primarily used for?",
        options: ["Cooling the battery packs", "Sourcing and fixing rare 'edge case' driving scenarios from the fleet", "Selling user data to advertisers", "Generating synthetic maps"],
        answer: 1,
        explanation: "The data engine is a closed-loop system where edge cases (where the AI fails) are automatically uploaded by the fleet, labeled, and used to retrain the AI."
      }
    ],
    hasSimulator: null
  },

  {
    courseType: "SD",
    id: "capstone-netflix-architecture",
    title: "16. Capstone: Netflix Architecture",
    category: "Architecture",
    difficulty: "Expert",
    duration: "55 mins",
    analogy: `
      <div class="analogy-box">
        <h4>🍿 The Global Multiplex</h4>
        <p>Imagine if 100 million people all tried to rent a DVD from a single blockbuster store in California. The highways would collapse! Instead, Netflix builds a secret mini-Blockbuster store inside your own neighborhood (your local Internet Service Provider) and stocks it with the most popular movies. When you hit play, the movie travels 5 miles instead of 5,000 miles.</p>
      </div>
    `,
    concept: `
      <h3>How Netflix Streams Terabytes a Second</h3>
      <p>Netflix's architecture is divided into three massive, distinct components:</p>
      <ul>
        <li><strong>1. The Control Plane (AWS):</strong> When you open the app, you connect to Amazon Web Services. This handles login, billing, your profile, and the Machine Learning recommendation engine. No actual video files are stored here!</li>
        <li><strong>2. Open Connect (The CDN):</strong> Netflix's custom Content Delivery Network. They install physical red server boxes directly inside ISPs (like Comcast or AT&T) all around the world. These boxes hold the actual video files.</li>
        <li><strong>3. The Encoding Pipeline:</strong> When Netflix finishes a movie, it's a massive master file. Their pipeline slices the movie into thousands of tiny chunks, encoding each chunk at different bitrates (1080p, 4K, low-res for mobile) and formats so that it can adapt to your internet speed in real-time.</li>
      </ul>
      <p>If your internet slows down, the Netflix player instantly requests the next 5-second chunk of video from the lower-quality encoded file, preventing buffering.</p>
    `
  },
  {
    courseType: "SD",
    id: "capstone-twitter-timeline",
    title: "17. Capstone: Twitter/X Timeline",
    category: "Architecture",
    difficulty: "Expert",
    duration: "45 mins",
    analogy: `
      <div class="analogy-box">
        <h4>📰 The Printing Press vs. The Bulletin Board</h4>
        <p>If you have 10 friends, it's easy to print 10 letters and mail them to their houses (Push). But what if Justin Bieber tweets, and he has 100 million followers? Trying to print and mail 100 million letters instantly will crash the printing press. Instead, you put his tweet on a public bulletin board, and his followers come to look at it when they open the app (Pull).</p>
      </div>
    `,
    concept: `
      <h3>Fan-Out Architecture</h3>
      <p>Generating a timeline for millions of users in real-time is one of the hardest problems in System Design. Twitter solves this using a hybrid "Fan-Out" model:</p>
      <ul>
        <li><strong>Fan-Out on Write (Push):</strong> For normal users (e.g., 500 followers). When you tweet, the backend instantly "pushes" that tweet into a Redis cache for each of your 500 followers. When they open the app, their timeline is already pre-computed and loads instantly in O(1) time.</li>
        <li><strong>Fan-Out on Read (Pull):</strong> For celebrities (e.g., millions of followers). Pushing to millions of Redis caches would overwhelm the database. Instead, when Elon Musk tweets, it is simply saved to a central database. When you open your app, the system "pulls" tweets from celebrities you follow and merges them with your pre-computed timeline in real-time.</li>
      </ul>
      <p>This Hybrid approach balances instantaneous load times with server stability.</p>
    `
  }
,

  {
    courseType: "MCP",
    id: "mcp-intro",
    title: "1. Intro to Model Context Protocol",
    category: "Architecture",
    difficulty: "Beginner",
    duration: "20 mins",
    jobHighlight: "AI Integration Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>🔌 The Universal Power Adapter</h4>
        <p>Imagine buying a new laptop, but the charger only works in Europe. You travel to the US and have to buy a special adapter. You go to Asia and need another adapter. This is how AI models used to interact with external tools (databases, APIs, files)—every model needed a custom integration. MCP (Model Context Protocol) is like a universal power adapter. It provides one standard way for ANY AI model to securely access ANY data source.</p>
      </div>
    `,
    concept: `
      <h3>Standardizing AI Tool Use</h3>
      <p>MCP standardizes the architecture of AI agents:</p>
      <ul>
        <li><strong>MCP Clients:</strong> The AI application (like Claude Desktop or an IDE). It initiates connections.</li>
        <li><strong>MCP Servers:</strong> Lightweight programs that expose specific capabilities (like reading a local file, searching GitHub, or querying a SQL database).</li>
        <li><strong>The Protocol:</strong> A standardized JSON-RPC communication layer that lets the client discover what tools the server has and execute them securely.</li>
      </ul>
      <p>Because of this standard, you can write an MCP Server once, and it will immediately work with Claude, OpenAI, Antigravity, and any other MCP-compliant client!</p>
    `,
    quiz: [
      {
        question: "What is the primary benefit of the Model Context Protocol?",
        options: ["It trains models faster", "It provides a universal standard for connecting AI models to external data sources", "It reduces the cost of API calls to zero", "It replaces the need for System Design"],
        answer: 1,
        explanation: "MCP acts as a universal adapter, allowing AI models to easily discover and use external tools and data."
      }
    ]
  },
  {
    courseType: "RAG",
    id: "rag-intro",
    title: "1. Intro to RAG Systems",
    category: "Generative AI",
    difficulty: "Intermediate",
    duration: "30 mins",
    jobHighlight: "AI Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>📖 The Open-Book Exam</h4>
        <p>Imagine a student taking an exam. A standard LLM is taking a closed-book exam relying purely on its memorized knowledge (which might be outdated or hallucinated). RAG (Retrieval-Augmented Generation) turns it into an open-book exam. When asked a question, the AI first searches a massive library (Retrieval) for the exact paragraph with the answer, reads it (Context), and then writes the final answer (Generation).</p>
      </div>
    `,
    concept: `
      <h3>How RAG Works Under the Hood</h3>
      <p>A typical RAG pipeline has three major steps:</p>
      <ul>
        <li><strong>1. Indexing:</strong> You split your company's massive PDF documents into small "chunks". You convert these chunks into vector embeddings and store them in a Vector Database (like Pinecone or Milvus).</li>
        <li><strong>2. Retrieval:</strong> When a user asks "What is our company's refund policy?", the system converts that question into a vector and performs a similarity search in the Vector DB to find the top 3 most relevant document chunks.</li>
        <li><strong>3. Generation:</strong> The system takes the user's prompt AND the 3 retrieved chunks, feeds them both to an LLM (like GPT-4), and says: "Answer the user's question using ONLY the provided context."</li>
      </ul>
      <p>RAG eliminates hallucinations and allows the AI to answer questions about private, proprietary data it was never trained on.</p>
    `,
    quiz: [
      {
        question: "In a RAG system, what is the purpose of the Vector Database?",
        options: ["To store user passwords securely", "To store document chunks as vectors for fast similarity search during retrieval", "To train a new language model from scratch", "To render the web UI"],
        answer: 1,
        explanation: "Vector Databases store embeddings, allowing the system to instantly find the text chunks that are semantically most similar to the user's query."
      }
    ]
  }
,

  // ==========================================
  // DEEP LEARNING (DL) TRACK ADDITIONS
  // ==========================================
  {
    courseType: "DL",
    id: "rnn-lstm-deepdive",
    title: "4. LSTMs & Sequence Models",
    category: "Deep Learning",
    difficulty: "Advanced",
    duration: "45 mins",
    jobHighlight: "Speech AI Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>🗣️ The Note-Taking Assistant</h4>
        <p>A standard neural network is like a goldfish; it processes every word in a sentence individually without remembering the previous words. An LSTM (Long Short-Term Memory) network is like an assistant taking notes. It has a "conveyor belt" of memory. It learns what to write down (store), what to erase (forget), and what to read (output) so that by the end of a long sentence, it still remembers the subject from the very beginning.</p>
      </div>
    `,
    concept: `
      <h3>Understanding Recurrent Neural Networks (RNNs) & LSTMs</h3>
      <p>RNNs are designed for sequential data (time-series, text, audio). However, vanilla RNNs suffer from the <strong>Vanishing Gradient Problem</strong>—they forget early inputs in long sequences.</p>
      <p>LSTMs solve this using three distinct gates:</p>
      <ul>
        <li><strong>Forget Gate:</strong> Decides what information from the past cell state should be thrown away (e.g., if the subject changes from singular to plural).</li>
        <li><strong>Input Gate:</strong> Decides what new information from the current input should be stored in the cell state.</li>
        <li><strong>Output Gate:</strong> Decides what the next hidden state should be, based on the newly updated cell state.</li>
      </ul>
      <p><strong>Real-World Usage:</strong> Apple's Siri uses LSTMs to process streaming audio chunks. It remembers the context of your speech sequence to accurately transcribe spoken phonemes into words.</p>
    `,
    code: `
# PyTorch Example: A simple LSTM for Sequence Classification
import torch
import torch.nn as nn

class LSTMClassifier(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_dim, output_dim):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        # LSTM layer: input is embedding, output is hidden state
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, batch_first=True)
        self.fc = nn.Linear(hidden_dim, output_dim)
        
    def forward(self, text):
        embedded = self.embedding(text)
        # lstm returns output and a tuple of (hidden state, cell state)
        lstm_out, (hidden, cell) = self.lstm(embedded)
        
        # We only care about the final hidden state for classification
        final_hidden_state = hidden[-1]
        return self.fc(final_hidden_state)

model = LSTMClassifier(vocab_size=10000, embedding_dim=100, hidden_dim=256, output_dim=2)
print(model)
    `,
    interview: {
      question: "Interview Question: How does an LSTM solve the vanishing gradient problem compared to a vanilla RNN?",
      answer: "A vanilla RNN applies matrix multiplication repeatedly at every time step, causing gradients to shrink exponentially during backpropagation through time (BPTT). An LSTM solves this by introducing a 'cell state' that runs straight down the entire chain with only minor linear interactions. The gradients can flow unimpeded backward through this cell state, mitigating the vanishing gradient issue."
    },
    quiz: [
      {
        question: "Which gate in an LSTM is responsible for throwing away old, irrelevant information?",
        options: ["Input Gate", "Output Gate", "Forget Gate", "Cell Gate"],
        answer: 2,
        explanation: "The Forget Gate uses a sigmoid activation function to output a number between 0 and 1 for each number in the cell state, where 0 completely drops the information and 1 keeps it."
      }
    ]
  },
  {
    courseType: "DL",
    id: "autoencoders-deepdive",
    title: "5. Autoencoders & Anomaly Detection",
    category: "Deep Learning",
    difficulty: "Advanced",
    duration: "40 mins",
    jobHighlight: "Fraud Detection Data Scientist",
    analogy: `
      <div class="analogy-box">
        <h4>🧳 The Suitcase Packer</h4>
        <p>Imagine you have to pack a massive wardrobe into a tiny carry-on suitcase. You must learn to compress your clothes (Encoder) into the tiny space (Bottleneck), and when you arrive, you unpack them to look exactly as they did before (Decoder). An Autoencoder does exactly this with data. If someone tries to sneak a giant sombrero into your suitcase, the packing process fails miserably. That failure indicates an 'anomaly'.</p>
      </div>
    `,
    concept: `
      <h3>How Autoencoders Detect Fraud</h3>
      <p>An Autoencoder is an unsupervised neural network that aims to copy its input to its output. It has a bottleneck layer (latent space) that forces the network to learn a compressed representation of the data.</p>
      <p><strong>The Anomaly Detection Architecture:</strong></p>
      <ul>
        <li>Train the Autoencoder ONLY on normal, legitimate credit card transactions.</li>
        <li>The network learns how to compress and reconstruct normal behavior perfectly.</li>
        <li>In production, when a fraudulent transaction occurs, you pass it through the model. Because the network has never seen this pattern, it reconstructs it very poorly.</li>
        <li>You measure the <strong>Reconstruction Error</strong> (MSE between input and output). If the error is above a threshold, you flag the transaction as fraud in milliseconds!</li>
      </ul>
    `,
    interview: {
      question: "Interview Question: Why use an Autoencoder for fraud detection instead of a standard binary classifier (Random Forest/Logistic Regression)?",
      answer: "Fraud detection suffers from extreme class imbalance (e.g., 99.9% normal, 0.1% fraud). A standard classifier will struggle to learn the 'fraud' class because there aren't enough examples, and fraudsters constantly invent new methods. An Autoencoder uses unsupervised learning—it only needs the abundant 'normal' data to learn. Any new, unseen fraud method will naturally produce a high reconstruction error, making it robust against novel attacks."
    },
    quiz: [
      {
        question: "In an Autoencoder used for anomaly detection, how is an anomaly identified?",
        options: ["The encoder outputs a 1", "The bottleneck layer expands", "The Reconstruction Error is unusually high", "The decoder fails to compile"],
        answer: 2,
        explanation: "Because the model only learned to compress 'normal' data, 'abnormal' data will be reconstructed poorly, resulting in a massive Mean Squared Error (MSE)."
      }
    ]
  },
  {
    courseType: "DL",
    id: "gans-deepdive",
    title: "6. GANs & Generative Adversarial Networks",
    category: "Deep Learning",
    difficulty: "Expert",
    duration: "50 mins",
    jobHighlight: "Generative AI Researcher",
    analogy: `
      <div class="analogy-box">
        <h4>🎨 The Art Forger vs. The Detective</h4>
        <p>A Generative Adversarial Network (GAN) is a game between two AI models. The <strong>Generator</strong> is a master art forger trying to paint fake Mona Lisas. The <strong>Discriminator</strong> is a police detective trying to spot the fakes from the real ones. Initially, the fakes are terrible. But as they play against each other millions of times, the detective gets better at spotting fakes, forcing the forger to paint indistinguishable masterpieces.</p>
      </div>
    `,
    concept: `
      <h3>The Architecture of GANs</h3>
      <p>GANs introduced a novel way to train models without explicit loss functions like MSE. Instead, the loss function is literally another neural network.</p>
      <ul>
        <li><strong>The Generator (G):</strong> Takes random noise as input and outputs a synthetic image. Its goal is to maximize the Discriminator's error rate.</li>
        <li><strong>The Discriminator (D):</strong> Takes an image (either real from the dataset or fake from the Generator) and outputs a probability (0 to 1) of it being real. Its goal is to minimize its own error rate.</li>
      </ul>
      <p>This is a <strong>Minimax Game</strong>. Training GANs is notoriously difficult due to <em>Mode Collapse</em> (where the Generator learns to output just one single perfect image to fool the Discriminator) and non-convergence.</p>
    `,
    interview: {
      question: "Interview Question: What is 'Mode Collapse' in GAN training, and how do you mitigate it?",
      answer: "Mode collapse occurs when the Generator discovers a single output (or small set of outputs) that consistently fools the Discriminator. Instead of learning the entire data distribution, it collapses into generating that one mode repeatedly. Mitigations include using Wasserstein GANs (WGAN) which use Earth Mover's Distance to provide smoother gradients, Unrolled GANs, or minibatch discrimination to penalize the generator if all outputs in a batch are identical."
    },
    quiz: [
      {
        question: "What is the primary objective of the Generator network in a GAN?",
        options: ["To classify real images accurately", "To compress input data into a latent space", "To produce outputs that the Discriminator classifies as 'real'", "To minimize the Reconstruction Error"],
        answer: 2,
        explanation: "The Generator's sole purpose is to fool the Discriminator into believing its synthetic outputs are actually from the real dataset."
      }
    ]
  },

  // ==========================================
  // ARTIFICIAL INTELLIGENCE (AI) TRACK ADDITIONS
  // ==========================================
  {
    courseType: "AI",
    id: "agentic-workflows",
    title: "2. Agentic Workflows & AutoGPT",
    category: "Artificial Intelligence",
    difficulty: "Advanced",
    duration: "40 mins",
    jobHighlight: "AI Systems Architect",
    analogy: `
      <div class="analogy-box">
        <h4>🤖 The Intern with a To-Do List</h4>
        <p>A standard LLM prompt is like asking an intern a single question: "What is the capital of France?" An Agentic Workflow is like giving an intern a goal ("Build a website"), a web browser, a code editor, and a notepad. The AI enters a loop: it thinks about the goal, uses a tool, observes the result, writes notes, and repeats until the website is built. It has agency.</p>
      </div>
    `,
    concept: `
      <h3>The ReAct Architecture (Reasoning + Acting)</h3>
      <p>Autonomous AI agents do not just generate text; they execute loops. The most popular architecture is <strong>ReAct</strong>.</p>
      <ol>
        <li><strong>Thought:</strong> The LLM reasons about what it needs to do next.</li>
        <li><strong>Action:</strong> The LLM decides to invoke a specific tool (e.g., \`search_web("Python tutorial")\`).</li>
        <li><strong>Observation:</strong> The system executes the tool and feeds the raw result back into the LLM's context.</li>
      </ol>
      <p>This loop continues until the LLM outputs an action like \`FINISH_TASK\`. Frameworks like LangChain and AutoGPT orchestrate these massive while-loops behind the scenes.</p>
    `,
    interview: {
      question: "Interview Question: How do you prevent an autonomous AI agent from getting stuck in an infinite loop?",
      answer: "Agents easily get stuck repeating the same failed tool call. Solutions include: 1) Hardcoded max-iteration limits (e.g., max 10 steps). 2) Passing execution history into the prompt so the LLM explicitly sees 'I have tried this 3 times and it failed'. 3) Using a secondary 'Critic' LLM to evaluate the agent's progress and interrupt it if it goes off track."
    },
    quiz: [
      {
        question: "In the ReAct framework, what is the role of the 'Observation' step?",
        options: ["The LLM looking at a picture", "Feeding the result of an executed tool back into the LLM's context", "The user reading the final output", "The LLM calculating loss gradients"],
        answer: 1,
        explanation: "Observation is the step where the external system (e.g., Python runtime, search engine) returns its result back to the LLM so it can reason about what to do next."
      }
    ]
  },
  {
    courseType: "AI",
    id: "advanced-prompting",
    title: "3. Prompt Engineering & Few-Shot",
    category: "Artificial Intelligence",
    difficulty: "Intermediate",
    duration: "30 mins",
    jobHighlight: "Prompt Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>🎭 The Method Actor</h4>
        <p>If you tell an actor "be angry", they might yell. But if you give an actor a detailed backstory, set the scene, provide a script of exactly how they should yell, and give them examples of previous angry scenes, you get an Oscar-winning performance. Advanced prompting is about meticulously setting the 'context window' so the LLM behaves exactly as your software requires.</p>
      </div>
    `,
    concept: `
      <h3>Few-Shot Learning & Structured Outputs</h3>
      <p>In enterprise software, you don't want an LLM to reply with conversational text; you usually want a strict JSON object to pass to an API. Advanced prompt engineering achieves this via:</p>
      <ul>
        <li><strong>System Prompts:</strong> The foundational instructions (e.g., "You are a strict data extraction API. Return ONLY valid JSON.").</li>
        <li><strong>Few-Shot Examples:</strong> Providing 3 to 5 explicit Input/Output pairs inside the prompt. LLMs are incredible pattern matchers; few-shot examples force the model to adopt the exact formatting of the examples.</li>
        <li><strong>Chain of Thought (CoT):</strong> Forcing the model to output its reasoning step-by-step BEFORE outputting the final JSON. This dramatically improves logic accuracy.</li>
      </ul>
    `,
    code: `
# Example: Forcing JSON output via Few-Shot Prompting
prompt = '''
System: Extract entities from the text into strict JSON format.

Input: "Apple released the iPhone 15 in California."
Output: {"company": "Apple", "product": "iPhone 15", "location": "California"}

Input: "Tesla's Model S is manufactured in Texas."
Output: {"company": "Tesla", "product": "Model S", "location": "Texas"}

Input: "Microsoft announced Copilot in Washington."
Output:
'''
# The LLM will now perfectly pattern-match the JSON format!
    `,
    interview: {
      question: "Interview Question: Why does 'Chain of Thought' prompting improve an LLM's performance on math or logic tasks?",
      answer: "LLMs generate tokens sequentially; they cannot 'think ahead' before outputting a token. By prompting them to output their reasoning step-by-step (e.g., 'Let's think step by step'), you force them to generate intermediate tokens. These intermediate tokens serve as a 'scratchpad' in the context window, allowing the next tokens to be conditioned on the logical steps rather than forcing the model to guess the final answer immediately."
    },
    quiz: [
      {
        question: "What is Few-Shot Prompting?",
        options: ["Training the model on a few new images", "Providing examples of input-output pairs inside the prompt to establish a pattern", "Using a smaller LLM that requires less compute", "Prompting the model quickly"],
        answer: 1,
        explanation: "Few-shot prompting leverages the LLM's in-context learning abilities by showing it examples of the desired output format directly in the prompt text."
      }
    ]
  },

  // ==========================================
  // RAG SYSTEMS TRACK ADDITIONS
  // ==========================================
  {
    courseType: "RAG",
    id: "advanced-chunking",
    title: "2. Advanced Semantic Chunking",
    category: "RAG Systems",
    difficulty: "Advanced",
    duration: "40 mins",
    jobHighlight: "Search & Retrieval Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>✂️ Slicing the Encyclopedia</h4>
        <p>If you chop a book into equal 500-word pieces (Standard Chunking), you might slice a paragraph in half. The first chunk has the problem, the second chunk has the solution. When the AI searches for the solution, it finds the second chunk but lacks the context! Semantic Chunking is like a human carefully cutting the book only at chapter breaks, section headers, and complete thoughts so no meaning is lost.</p>
      </div>
    `,
    concept: `
      <h3>Strategies Beyond Character Splitting</h3>
      <p>Basic RAG splits text blindly by character count. Enterprise RAG uses advanced strategies:</p>
      <ul>
        <li><strong>Recursive Character Splitting:</strong> Tries to split by double-newlines (paragraphs), then single newlines, then spaces, to keep logical units together.</li>
        <li><strong>Parent-Child (Small-to-Big) Chunking:</strong> You embed very small chunks (sentences) for highly accurate retrieval. But when a small chunk is retrieved, you actually feed its entire 'Parent' paragraph to the LLM to provide maximum context.</li>
        <li><strong>Semantic Chunking:</strong> Uses an embedding model to calculate the semantic difference between adjacent sentences. When the topic shifts dramatically, it creates a split.</li>
      </ul>
    `,
    interview: {
      question: "Interview Question: What is the 'Lost in the Middle' phenomenon in LLMs, and how does chunking strategy affect it?",
      answer: "LLMs heavily weight information located at the very beginning and very end of their context window. Information buried in the middle is often ignored ('Lost in the Middle'). If your chunking strategy retrieves 20 large chunks, the crucial answer might end up in the middle of the context window. It's often better to retrieve fewer, highly dense chunks, or to re-rank the chunks so the most relevant ones are placed at the edges of the prompt."
    },
    quiz: [
      {
        question: "What is the primary advantage of 'Parent-Child' chunking in a RAG system?",
        options: ["It saves database storage space", "It uses small chunks for precise search, but passes large parent chunks to the LLM for better context", "It prevents the LLM from hallucinating entirely", "It replaces the need for vector embeddings"],
        answer: 1,
        explanation: "Small chunks ensure high accuracy during the vector similarity search, while passing the surrounding 'parent' text ensures the LLM has enough context to formulate a good answer."
      }
    ]
  },
  {
    courseType: "RAG",
    id: "vector-db-deepdive",
    title: "3. Vector Databases Deep Dive",
    category: "RAG Systems",
    difficulty: "Expert",
    duration: "50 mins",
    jobHighlight: "Database Architect",
    analogy: `
      <div class="analogy-box">
        <h4>🌌 The Galaxy Map</h4>
        <p>A relational database (SQL) organizes data like a spreadsheet. A Vector Database organizes data like stars in a 3D galaxy map. Words that mean similar things (like "King" and "Queen") are placed as stars physically close to each other. When you ask a question, the database doesn't scan the whole galaxy; it just finds the coordinate of your question and grabs the closest stars.</p>
      </div>
    `,
    concept: `
      <h3>Inside the Vector Engine (HNSW)</h3>
      <p>Embeddings are arrays of floats (e.g., 1536 dimensions for OpenAI). To find similar vectors, you calculate Cosine Similarity or Euclidean Distance. But comparing your query vector against 1 billion stored vectors is mathematically too slow.</p>
      <p>Vector DBs (like Pinecone, Milvus, Qdrant) use <strong>Approximate Nearest Neighbor (ANN)</strong> algorithms. The most famous is <strong>HNSW (Hierarchical Navigable Small World)</strong>:</p>
      <ul>
        <li>It builds a multi-layered graph of vectors.</li>
        <li>The top layer has very few nodes (long-distance highways).</li>
        <li>The search starts at the top, quickly zooms into the correct neighborhood, and then drops to lower, denser layers to find the exact nearest neighbors in logarithmic time O(log N).</li>
      </ul>
    `,
    interview: {
      question: "Interview Question: Why would you use Cosine Similarity over Euclidean Distance for text embeddings?",
      answer: "In text embeddings, the magnitude (length) of the vector is often less important than the angle. For example, a very long document about 'dogs' might have a larger vector magnitude than a short tweet about 'dogs', but their semantic meaning is the same. Cosine similarity only measures the angle between the vectors, making it scale-invariant and ideal for comparing text embeddings of different lengths."
    },
    quiz: [
      {
        question: "How does the HNSW algorithm achieve high-speed vector search?",
        options: ["By comparing the query vector to every single vector in the database using a GPU", "By converting vectors into SQL tables", "By building a hierarchical graph structure that allows logarithmic O(log N) traversal", "By hashing the text into 256-bit strings"],
        answer: 2,
        explanation: "HNSW builds layers of graphs, allowing the search to quickly jump across the vector space at high levels before zooming into the exact neighborhood at the bottom level."
      }
    ]
  },
  {
    courseType: "RAG",
    id: "reranking-cross-encoders",
    title: "4. Re-Ranking & Cross-Encoders",
    category: "RAG Systems",
    difficulty: "Advanced",
    duration: "40 mins",
    jobHighlight: "Machine Learning Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>🕵️‍♂️ The Intern and the Senior Editor</h4>
        <p>A Vector DB is like an intern who rapidly grabs 100 files that "look somewhat relevant" from the archives (Bi-Encoder). But the intern isn't very smart. A Cross-Encoder Re-ranker is the Senior Editor. They take those 100 files, read them deeply alongside the actual user question, and re-order them so the absolute best 5 files are handed to the CEO (the LLM) for the final answer.</p>
      </div>
    `,
    concept: `
      <h3>The Two-Stage Retrieval Pipeline</h3>
      <p>Standard Vector Search (Bi-Encoders) is fast because it calculates embeddings separately and caches them. However, it misses deep semantic nuance.</p>
      <p><strong>Stage 1 (Retrieval):</strong> Use a fast Vector DB to retrieve the top 50 chunks. (High Recall, Low Precision).</p>
      <p><strong>Stage 2 (Re-Ranking):</strong> Pass the query AND the 50 chunks into a <strong>Cross-Encoder</strong> (like Cohere ReRank). A Cross-Encoder runs self-attention across both the query and the document simultaneously, yielding an incredibly accurate relevance score. You then take the top 5 scores and feed ONLY those to the final LLM. (High Precision).</p>
    `,
    interview: {
      question: "Interview Question: Why don't we just use a Cross-Encoder for the entire database search to get perfect accuracy?",
      answer: "Cross-Encoders require the Query and the Document to be processed together through the transformer layers. This means you cannot pre-compute or cache document embeddings. If you have 1 million documents, running a Cross-Encoder for a single query would require running the heavy transformer model 1 million times, which would take hours. Bi-Encoders allow pre-computing, making them fast enough for Stage 1."
    },
    quiz: [
      {
        question: "In a two-stage RAG pipeline, what is the role of the Cross-Encoder?",
        options: ["To translate the document into another language", "To quickly search the entire 1-billion row database", "To re-rank a small subset of retrieved documents with high precision", "To generate the final conversational response to the user"],
        answer: 2,
        explanation: "Cross-Encoders are too slow to search a whole database, so they are used in Stage 2 to re-rank the top 50 or 100 results returned by the fast Vector DB."
      }
    ]
  },

  // ==========================================
  // MCP TRACK ADDITIONS
  // ==========================================
  {
    courseType: "MCP",
    id: "building-mcp-server",
    title: "2. Building an MCP Server",
    category: "Model Context Protocol",
    difficulty: "Intermediate",
    duration: "45 mins",
    jobHighlight: "Integration Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>📜 Writing the API Manual</h4>
        <p>If you want a chef (the LLM) to use your new fancy blender (your local database), you can't just hand them the blender. You have to write an instruction manual explaining what buttons it has, what ingredients it accepts, and what it produces. Building an MCP server is simply writing a standardized JSON-RPC manual that tells any AI exactly what tools you are exposing and what arguments they require.</p>
      </div>
    `,
    concept: `
      <h3>The Technical Implementation</h3>
      <p>An MCP Server communicates via JSON-RPC 2.0 over standard streams (stdio) or HTTP/SSE.</p>
      <p>To build a server, you must implement specific protocol methods:</p>
      <ul>
        <li><code>tools/list</code>: Returns a JSON schema of all tools your server has (e.g., <code>read_customer_data</code>, requiring a <code>customer_id</code> string).</li>
        <li><code>tools/call</code>: The actual execution endpoint. When the LLM decides to use your tool, the client sends a <code>tools/call</code> request with the arguments. Your Python/Node code runs the logic and returns a string response.</li>
      </ul>
      <p>You can run MCP servers locally alongside Claude Desktop, or host them remotely.</p>
    `,
    code: `
# Simple Python MCP Server using stdio
import sys
import json

def handle_request(req):
    if req["method"] == "tools/list":
        return {
            "jsonrpc": "2.0", "id": req["id"],
            "result": {
                "tools": [{
                    "name": "get_weather",
                    "description": "Get weather for a city",
                    "inputSchema": { "type": "object", "properties": { "city": { "type": "string" } } }
                }]
            }
        }
    elif req["method"] == "tools/call":
        city = req["params"]["arguments"]["city"]
        # Execute local logic here!
        return {
            "jsonrpc": "2.0", "id": req["id"],
            "result": { "content": [{"type": "text", "text": f"The weather in {city} is sunny!"}] }
        }

for line in sys.stdin:
    request = json.loads(line)
    response = handle_request(request)
    print(json.dumps(response), flush=True)
    `,
    interview: {
      question: "Interview Question: Why does MCP support both 'stdio' (standard input/output) and 'SSE' (Server-Sent Events) transports?",
      answer: "Stdio is designed for local, sidecar execution. An AI IDE (like Cursor or Claude Desktop) can spawn the MCP server as a subprocess on the user's local machine, allowing it to read local files securely without network overhead. SSE over HTTP is used for remote integration, allowing an AI model in the cloud to connect to an enterprise's secure backend API over the web."
    },
    quiz: [
      {
        question: "Which MCP method tells the client (the LLM) what capabilities the server possesses?",
        options: ["tools/execute", "tools/list", "server/init", "resources/read"],
        answer: 1,
        explanation: "tools/list returns the JSON schema defining all available tools, which the client then injects into the LLM's system prompt so the LLM knows what it can do."
      }
    ]
  },
  {
    courseType: "MCP",
    id: "mcp-security",
    title: "3. MCP Security & Compliance",
    category: "Model Context Protocol",
    difficulty: "Advanced",
    duration: "35 mins",
    jobHighlight: "DevSecOps Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>🛡️ The Bouncer at the Club</h4>
        <p>You wouldn't let a random person walk into your bank vault. Similarly, if an enterprise connects an LLM to their HR database via MCP, there must be strict security. The MCP server acts as the bouncer. It doesn't trust the AI. It checks the user's ID, verifies their permissions, and ensures the AI is only allowed to see data belonging to that specific user.</p>
      </div>
    `,
    concept: `
      <h3>Securing AI Integrations</h3>
      <p>Because LLMs are prone to Prompt Injections (where a user tricks the AI into performing unauthorized actions), the security boundary MUST exist at the MCP Server level, not the LLM level.</p>
      <ul>
        <li><strong>Never Trust the AI:</strong> If the AI sends a request to \`delete_database\`, the MCP server must validate if the human user driving the AI session has admin rights.</li>
        <li><strong>Human in the Loop (HITL):</strong> For destructive actions (writes, deletes, emails), the client application should prompt the human user with an "Approve/Reject" dialog before sending the \`tools/call\` to the MCP server.</li>
        <li><strong>Data Masking:</strong> The MCP server should scrub PII (Personally Identifiable Information) before returning the text back to the LLM.</li>
      </ul>
    `,
    interview: {
      question: "Interview Question: An attacker uses prompt injection to tell your enterprise LLM to 'Use the MCP SQL tool to DROP TABLE customers'. How do you prevent this?",
      answer: "You never give the MCP server a god-mode database credential. The MCP server should run using the exact RBAC (Role-Based Access Control) credentials of the authenticated user using the chat interface. If the user doesn't have DROP permissions, the database will reject the MCP server's query. Furthermore, high-risk tools should require explicit Human-in-the-Loop UI approval within the client before the network request is even sent."
    },
    quiz: [
      {
        question: "Where should the ultimate security boundary (authorization checks) live in an MCP architecture?",
        options: ["In the LLM's system prompt", "Inside the MCP Server implementation", "In the Vector Database", "In the user's web browser"],
        answer: 1,
        explanation: "LLMs can be tricked via prompt injection. Therefore, the execution layer (the MCP server) must perform strict authorization checks before executing any command."
      }
    ]
  },
  {
    courseType: "MCP",
    id: "mcp-tool-chaining",
    title: "4. Complex Tool Chaining",
    category: "Model Context Protocol",
    difficulty: "Expert",
    duration: "50 mins",
    jobHighlight: "AI Automation Architect",
    analogy: `
      <div class="analogy-box">
        <h4>🏭 The Assembly Line</h4>
        <p>A single tool is like a hammer. But tool chaining is like a robotic assembly line. An AI doesn't just hit one nail. It uses the GitHub MCP to read an issue, then uses the local Bash MCP to run a grep search for the bug, then uses the File Edit MCP to fix the code, then uses the Bash MCP to run tests. It chains multiple independent tools together to accomplish massive workflows.</p>
      </div>
    `,
    concept: `
      <h3>Orchestrating Multiple MCP Servers</h3>
      <p>Clients (like Claude Desktop) can connect to multiple MCP servers simultaneously. The LLM receives a massive unified list of all tools from all servers.</p>
      <p><strong>The Chaining Workflow:</strong></p>
      <ol>
        <li>LLM calls \`github_search\` (Server A).</li>
        <li>Observation returned. LLM realizes it needs to read the specific file.</li>
        <li>LLM calls \`read_local_file\` (Server B).</li>
        <li>Observation returned. LLM writes a fix and calls \`bash_execute\` to run unit tests (Server B).</li>
      </ol>
      <p>The beauty of MCP is that the LLM figures out the routing and chaining dynamically based on the tool descriptions you provided in \`tools/list\`!</p>
    `,
    interview: {
      question: "Interview Question: How do you design tool descriptions so the LLM knows exactly when and how to chain them together?",
      answer: "Tool descriptions must be highly explicit. Don't just write 'Searches code'. Write: 'Use this tool FIRST to find file paths containing the bug. Once you have the path, you MUST use the read_file tool to view the contents before making edits.' By baking workflow instructions directly into the JSON schema descriptions, you guide the LLM's ReAct loop to chain the tools in the correct logical order."
    },
    quiz: [
      {
        question: "How does the LLM know which MCP server to send a tool call to when multiple servers are connected?",
        options: ["It sends the call to all servers and waits to see which one answers", "The client handles routing; the LLM just specifies the unique tool name it wants to use", "The user has to manually select the server in a dropdown", "MCP does not support multiple servers"],
        answer: 1,
        explanation: "The MCP Client aggregates all tools from all connected servers into one list for the LLM. When the LLM calls a tool name, the client routes the JSON-RPC call to the specific server that registered that tool."
      }
    ]
  }
,

  // ==========================================
  // APPLIED HANDS-ON PROJECTS (PROJECTS) TRACK
  // ==========================================
  {
    courseType: "PROJECTS",
    id: "proj-churn-prediction",
    title: "1. Beginner: Customer Churn Prediction",
    category: "Machine Learning Projects",
    difficulty: "Beginner",
    duration: "1 hour",
    jobHighlight: "Data Analyst",
    analogy: `
      <div class="analogy-box">
        <h4>📉 The Leaky Bucket</h4>
        <p>Imagine your company is a bucket, and customers are water. You're constantly pouring new water in (marketing), but there's a hole at the bottom (churn). This project teaches you to build an ML model that predicts exactly which drops of water are about to leak out, allowing your marketing team to plug the hole by offering those specific customers a discount before they leave.</p>
      </div>
    `,
    concept: `
      <h3>Project Overview</h3>
      <p><strong>Goal:</strong> Build a binary classification model to predict whether a telecommunications customer will cancel their subscription.</p>
      <p><strong>Key Skills:</strong> Data preprocessing, handling missing values, encoding categorical data (One-Hot Encoding), Logistic Regression, and evaluating models using ROC-AUC and Confusion Matrices.</p>
      <p><strong>Frameworks:</strong> Pandas, Scikit-Learn, Matplotlib.</p>
    `,
    code: `
# Step-by-Step Implementation Guide
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# 1. Load Data
# url = "https://raw.githubusercontent.com/IBM/telco-customer-churn-on-icp4d/master/data/Telco-Customer-Churn.csv"
# df = pd.read_csv(url)

# 2. Preprocess
# Convert TotalCharges to numeric, drop missing
# df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
# df = df.dropna()

# 3. Encode Categorical Variables (One-Hot Encoding)
# X = pd.get_dummies(df.drop(['customerID', 'Churn'], axis=1), drop_first=True)
# y = df['Churn'].map({'Yes': 1, 'No': 0})

# 4. Train/Test Split
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5. Train Model
# clf = RandomForestClassifier(n_estimators=100, random_state=42)
# clf.fit(X_train, y_train)

# 6. Evaluate
# preds = clf.predict(X_test)
# print(classification_report(y_test, preds))
print("Project 1: Customer Churn Prediction pipeline ready to build!")
    `,
    interview: {
      question: "Project Interview Question: In a customer churn prediction project, the dataset is often heavily imbalanced (e.g., 90% don't churn, 10% do). Why is relying on 'Accuracy' a terrible idea?",
      answer: "If a model simply guesses 'No Churn' for every single customer, it will achieve 90% accuracy, but it will have failed completely at identifying the 10% who actually churn. In churn prediction, you must use metrics like Recall (to capture as many churners as possible) or the F1-Score, and you should consider using techniques like SMOTE to balance the training data."
    },
    quiz: [
      {
        question: "Which metric is most important if you want to ensure you catch as many churning customers as possible, even if it means accidentally giving discounts to a few loyal customers?",
        options: ["Precision", "Recall", "Accuracy", "Mean Squared Error"],
        answer: 1,
        explanation: "High Recall ensures you capture the maximum number of true positives (actual churners), minimizing false negatives."
      }
    ]
  },
  {
    courseType: "PROJECTS",
    id: "proj-cancer-risk",
    title: "2. Beginner: Cancer Risk Prediction",
    category: "Machine Learning Projects",
    difficulty: "Beginner",
    duration: "1 hour",
    jobHighlight: "Healthcare Data Scientist",
    analogy: `
      <div class="analogy-box">
        <h4>🔬 The Medical Detective</h4>
        <p>A doctor looks at 5 different blood test results to determine if a tumor is benign (safe) or malignant (dangerous). A machine learning model looks at 30 different geometric measurements of a cell nucleus simultaneously. It acts as a super-detective, finding microscopic patterns humans miss to predict cancer risk.</p>
      </div>
    `,
    concept: `
      <h3>Project Overview</h3>
      <p><strong>Goal:</strong> Use the Wisconsin Breast Cancer Dataset to classify tumors as benign or malignant based on cell features.</p>
      <p><strong>Key Skills:</strong> Predictive modeling, identifying Feature Importance (which cellular traits matter most), and using Support Vector Machines (SVM) or Random Forests.</p>
      <p><strong>Frameworks:</strong> Pandas, Scikit-Learn, Seaborn.</p>
    `,
    interview: {
      question: "Project Interview Question: When building healthcare models, why is 'Explainability' (Feature Importance) often just as important as high accuracy?",
      answer: "Doctors will not trust a 'black box' model that simply outputs 'Malignant'. They need to know *why* the model made that prediction. Using Random Forest feature importance or SHAP values allows the data scientist to explain to medical professionals that the model flagged the tumor because the 'cell perimeter' and 'concavity' features were abnormally high."
    },
    quiz: [
      {
        question: "What does 'Feature Importance' tell you after training a Random Forest model on cancer data?",
        options: ["Which patient will get cancer next", "Which specific measurements (e.g., cell radius, texture) contributed the most to the model's predictions", "The accuracy of the model on the test set", "How fast the model trained"],
        answer: 1,
        explanation: "Feature importance ranks the input variables by how useful they were in reducing uncertainty (gini impurity) during the creation of the decision trees."
      }
    ]
  },
  {
    courseType: "PROJECTS",
    id: "proj-student-performance",
    title: "3. Beginner: Student Performance Prediction",
    category: "Machine Learning Projects",
    difficulty: "Beginner",
    duration: "1 hour",
    jobHighlight: "EdTech ML Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>🎓 The Academic Crystal Ball</h4>
        <p>Teachers usually wait until the final exam to see if a student fails. This project builds a crystal ball that predicts a student's final grade halfway through the semester based on their attendance, past test scores, and study hours, allowing teachers to intervene early.</p>
      </div>
    `,
    concept: `
      <h3>Project Overview</h3>
      <p><strong>Goal:</strong> Build a Multiple Linear Regression model to predict a continuous variable (Final Grade) instead of a category.</p>
      <p><strong>Key Skills:</strong> Linear regression, assessing R-Squared, plotting residuals, and detecting multicollinearity.</p>
      <p><strong>Frameworks:</strong> Scikit-Learn, Statsmodels, Matplotlib.</p>
    `,
    interview: {
      question: "Project Interview Question: When predicting student grades using Multiple Linear Regression, how do you evaluate if your model is actually performing well?",
      answer: "You evaluate regression models using continuous error metrics. Mean Absolute Error (MAE) tells you on average how many points off your predictions are (e.g., +/- 5 points). R-Squared tells you what percentage of the variance in the final grades is explained by your input features."
    },
    quiz: [
      {
        question: "If your model is predicting a student's final exam score (from 0 to 100), what type of Machine Learning problem is this?",
        options: ["Binary Classification", "Clustering", "Regression", "Reinforcement Learning"],
        answer: 2,
        explanation: "Because the target variable is a continuous number (0-100), it is a Regression problem."
      }
    ]
  },
  {
    courseType: "PROJECTS",
    id: "proj-text-summarization",
    title: "4. Inter: Text Summarization (Hugging Face)",
    category: "NLP Projects",
    difficulty: "Intermediate",
    duration: "2 hours",
    jobHighlight: "NLP Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>📝 The Executive Assistant</h4>
        <p>CEOs don't have time to read 50-page reports. They have assistants who read the report and write a 1-page summary. This project trains an AI to be the ultimate executive assistant, capable of reading thousands of customer service chat logs and instantly writing concise, human-like summaries.</p>
      </div>
    `,
    concept: `
      <h3>Project Overview</h3>
      <p><strong>Goal:</strong> Build an Abstractive Text Summarization pipeline using pre-trained Transformer models.</p>
      <p><strong>Key Skills:</strong> Utilizing Hugging Face Transformers, Tokenization, working with the SAMSum dataset (messenger-like conversations), and fine-tuning models like Pegasus or BART.</p>
      <p><strong>Frameworks:</strong> Hugging Face Transformers, Datasets, PyTorch.</p>
    `,
    interview: {
      question: "Project Interview Question: What is the difference between Extractive and Abstractive text summarization?",
      answer: "Extractive summarization acts like a highlighter; it simply selects and copies the most important existing sentences from the original text. Abstractive summarization (which modern LLMs use) acts like a human; it comprehends the text and generates entirely new sentences to summarize the concepts, which reads much more naturally."
    },
    quiz: [
      {
        question: "Which Hugging Face library makes it incredibly easy to download massive pre-trained models like Pegasus or BART?",
        options: ["Scikit-Learn", "Pandas", "Transformers", "Keras"],
        answer: 2,
        explanation: "The Hugging Face 'Transformers' library provides an API to easily download and use state-of-the-art pre-trained NLP models."
      }
    ]
  },
  {
    courseType: "PROJECTS",
    id: "proj-heart-murmur",
    title: "5. Inter: AI Heart Murmur Detection",
    category: "Deep Learning Projects",
    difficulty: "Intermediate",
    duration: "2.5 hours",
    jobHighlight: "Biomedical AI Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>🩺 The Digital Stethoscope</h4>
        <p>A cardiologist listens to a heartbeat to detect a "whoosh" sound indicating a murmur. But what if we convert that audio recording into an image (a spectrogram) that shows the sound waves? We can then use an Image-Recognizing Neural Network (CNN) to "look" at the sound and diagnose the heart condition!</p>
      </div>
    `,
    concept: `
      <h3>Project Overview</h3>
      <p><strong>Goal:</strong> Detect heart murmurs from raw audio stethoscope recordings (PCG data).</p>
      <p><strong>Key Skills:</strong> Audio signal processing, converting audio to Mel-Spectrograms, and training a 2D Convolutional Neural Network (CNN) to classify the audio images.</p>
      <p><strong>Frameworks:</strong> Librosa (Audio), TensorFlow/Keras, PyTorch.</p>
    `,
    interview: {
      question: "Project Interview Question: Why do we convert audio into a spectrogram and use a CNN instead of feeding raw audio waves directly into a dense neural network?",
      answer: "Raw audio data is incredibly dense (e.g., 44,100 data points per second) and contains complex temporal patterns. By converting it into a Mel-Spectrogram, we transform time and frequency into a 2D image. CNNs are highly optimized to detect spatial patterns, edges, and textures in 2D grids, allowing them to easily 'see' the frequency anomalies associated with a heart murmur."
    },
    quiz: [
      {
        question: "What does the library 'Librosa' do in this project?",
        options: ["Trains the neural network", "Extracts features from audio files, such as generating Mel-Spectrograms", "Queries a SQL database", "Deploys the model to AWS"],
        answer: 1,
        explanation: "Librosa is the industry standard Python library for audio and music signal processing."
      }
    ]
  },
  {
    courseType: "PROJECTS",
    id: "proj-loan-approval",
    title: "6. Inter: 2-Stage Loan Approval System",
    category: "Machine Learning Projects",
    difficulty: "Intermediate",
    duration: "2 hours",
    jobHighlight: "FinTech ML Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>🏦 The Strict Banker</h4>
        <p>When you apply for a massive loan, the bank doesn't just do one calculation. First, the security guard checks if your ID is valid and you aren't bankrupt (Stage 1). If you pass, you go to the Vault Manager who calculates exactly how much money you are allowed to borrow based on your salary (Stage 2). This project builds that exact 2-stage automated pipeline.</p>
      </div>
    `,
    concept: `
      <h3>Project Overview</h3>
      <p><strong>Goal:</strong> Build an end-to-end pipeline that first classifies if a user is eligible for a loan, and if yes, predicts the exact loan amount they qualify for.</p>
      <p><strong>Key Skills:</strong> Pipeline chaining, combining Classification (XGBoost/Random Forest) with Regression, handling missing financial data, and deploying the combined model.</p>
      <p><strong>Frameworks:</strong> Scikit-Learn Pipelines, XGBoost.</p>
    `,
    interview: {
      question: "Project Interview Question: In a 2-stage model (Classification then Regression), what happens to the training data for the Regression model?",
      answer: "The Regression model (Stage 2) MUST be trained exclusively on the subset of data that represents approved loans. If you train the regression model on customers who were rejected (who received $0), it will severely skew the model's ability to accurately predict high loan amounts for approved customers."
    },
    quiz: [
      {
        question: "What is the purpose of Stage 1 and Stage 2 in this project?",
        options: ["Stage 1 translates text; Stage 2 generates images", "Stage 1 classifies True/False for approval; Stage 2 performs Regression to predict the dollar amount", "Both stages are unsupervised clustering", "Stage 1 is the frontend UI; Stage 2 is the backend database"],
        answer: 1,
        explanation: "This mirrors real FinTech pipelines: a binary classifier acts as a gatekeeper, and a regressor determines the continuous value (loan amount)."
      }
    ]
  },
  {
    courseType: "PROJECTS",
    id: "proj-e2e-chatbot",
    title: "7. Adv: End-to-End Chatbot (KV Caching)",
    category: "GenAI Projects",
    difficulty: "Advanced",
    duration: "4 hours",
    jobHighlight: "LLM Infrastructure Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>📚 The Fast Reader</h4>
        <p>Imagine reading a 1,000-page book to answer a question. If someone asks a follow-up question, you don't read the 1,000 pages again from page 1! You keep the memory in your head. Standard LLM architectures recalculate the entire chat history every single time you send a new message. This project implements "KV Caching" to store previous calculations in RAM, making the chatbot 10x faster.</p>
      </div>
    `,
    concept: `
      <h3>Project Overview</h3>
      <p><strong>Goal:</strong> Build a custom conversational LLM interface that handles real-time inference efficiently using Key-Value (KV) caching.</p>
      <p><strong>Key Skills:</strong> Deep understanding of Transformer Self-Attention mechanics, managing GPU VRAM, token streaming, and optimizing autoregressive generation.</p>
      <p><strong>Frameworks:</strong> Hugging Face Accelerate, PyTorch, vLLM.</p>
    `,
    interview: {
      question: "Project Interview Question: Explain mathematically or conceptually why KV Caching speeds up autoregressive generation.",
      answer: "During autoregressive generation, a transformer predicts one token at a time. To predict token N, the attention mechanism needs to compare it against all previous N-1 tokens. Without caching, the model completely recalculates the Key and Value matrices for tokens 1 to N-1 every single step. KV caching stores the Key and Value matrices for all past tokens in memory. Therefore, to generate token N, the model only computes the Query, Key, and Value for token N, and simply retrieves the past K and V from RAM, turning an O(N^2) operation into an O(N) operation per step."
    },
    quiz: [
      {
        question: "What is the trade-off of using KV Caching in LLM inference?",
        options: ["It makes the model hallucinate more", "It heavily consumes GPU VRAM/Memory to store the matrices", "It prevents the model from speaking English", "It forces the model to use an API"],
        answer: 1,
        explanation: "While it saves massive amounts of compute time, storing the Key and Value matrices for every token in every concurrent user session requires massive amounts of GPU memory."
      }
    ]
  },
  {
    courseType: "PROJECTS",
    id: "proj-stateful-agent",
    title: "8. Adv: Stateful Agentic AI (LangGraph)",
    category: "AI Agent Projects",
    difficulty: "Advanced",
    duration: "3.5 hours",
    jobHighlight: "AI Systems Architect",
    analogy: `
      <div class="analogy-box">
        <h4>🕸️ The Flowchart Brain</h4>
        <p>Standard LLMs operate in a straight line. But complex tasks require loops, conditions, and memory. LangGraph allows you to build an AI that operates like a giant state machine flowchart. "If search fails, go back to step 1. If code throws an error, loop back to the coding node and fix it." It gives the AI persistent state and cyclic reasoning.</p>
      </div>
    `,
    concept: `
      <h3>Project Overview</h3>
      <p><strong>Goal:</strong> Build a production-ready AI agent that can browse the web, write code, and loop through error-correction cycles using LangGraph and Llama-3.</p>
      <p><strong>Key Skills:</strong> Building cyclic computation graphs, managing AI state/memory, tool-augmented agents, and deploying production AI workflows.</p>
      <p><strong>Frameworks:</strong> LangGraph, LangChain, Ollama (for local Llama 3).</p>
    `,
    interview: {
      question: "Project Interview Question: Why use LangGraph over standard LangChain 'Agents'?",
      answer: "Standard LangChain agents execute a hidden, linear while-loop that is hard to debug and hard to customize. LangGraph models the agent explicitly as a graph (nodes and edges). This allows you to introduce strict human-in-the-loop approval steps, complex cyclic branching (e.g., specific error handling loops), and persistent state across massive multi-turn executions."
    },
    quiz: [
      {
        question: "What computer science concept is LangGraph based on to manage complex AI workflows?",
        options: ["Binary Trees", "Graphs (Nodes and Edges) representing a state machine", "Linked Lists", "Hash Maps"],
        answer: 1,
        explanation: "LangGraph defines agents as cyclical graphs, where nodes are functions/LLM calls, and edges determine the flow of state based on conditions."
      }
    ]
  },
  {
    courseType: "PROJECTS",
    id: "proj-autogen-team",
    title: "9. Adv: AutoGen Data Analyzer Team",
    category: "AI Agent Projects",
    difficulty: "Expert",
    duration: "4 hours",
    jobHighlight: "Principal AI Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>👔 The AI Boardroom</h4>
        <p>Instead of relying on one AI to do everything, what if you hired a team? You create one AI prompted as a "Python Developer", one prompted as a "Code Reviewer", and one as the "Project Manager". You give them a task, step back, and watch them chat with each other in a virtual boardroom until the task is complete. This is the power of Microsoft's AutoGen.</p>
      </div>
    `,
    concept: `
      <h3>Project Overview</h3>
      <p><strong>Goal:</strong> Orchestrate a multi-agent system where specialized AI agents collaborate, debate, and write code to analyze a massive dataset automatically.</p>
      <p><strong>Key Skills:</strong> Multi-agent orchestration, conversational programming, Dockerized code execution, and using Microsoft AutoGen.</p>
      <p><strong>Frameworks:</strong> Microsoft AutoGen, Docker, OpenAI API.</p>
    `,
    interview: {
      question: "Project Interview Question: How does AutoGen safely execute the code that its agents generate during their conversation?",
      answer: "AutoGen utilizes an 'Executor' agent. When the Developer agent writes Python code, the Executor agent extracts that code and runs it in a secure, isolated Docker container. It then captures the terminal output (or error traceback) and pastes it back into the chat so the Developer agent can fix any bugs."
    },
    quiz: [
      {
        question: "In a Multi-Agent system like AutoGen, why is it beneficial to have a 'Critic' or 'Reviewer' agent?",
        options: ["To save API costs", "Because LLMs suffer from confirmation bias and a separate persona is much better at spotting errors in generated code", "To make the UI look cooler", "To query SQL databases faster"],
        answer: 1,
        explanation: "A separate Critic agent, prompted exclusively to find flaws, breaks the LLM's natural tendency to blindly agree with its own outputs."
      }
    ]
  },
  {
    courseType: "PROJECTS",
    id: "proj-cv-forecasting-genai",
    title: "10. Adv: Vision + Forecasting + GenAI",
    category: "Full Stack ML Projects",
    difficulty: "Expert",
    duration: "5 hours",
    jobHighlight: "Chief AI Architect",
    analogy: `
      <div class="analogy-box">
        <h4>🏭 The Omni-Mind Factory</h4>
        <p>This is the ultimate capstone. A camera watches a factory floor and detects broken parts (Computer Vision). It sends that data to a statistical model to predict how many parts will break next month (Time-Series Forecasting). Finally, an LLM reads those predictions and writes a professional email to the supply chain manager explaining exactly what to order (GenAI). You are connecting three entirely different ML domains into one God-tier pipeline.</p>
      </div>
    `,
    concept: `
      <h3>Project Overview</h3>
      <p><strong>Goal:</strong> Build an end-to-end multi-modal pipeline integrating Object Detection, Time-Series forecasting, and an LLM report generator.</p>
      <p><strong>Key Skills:</strong> YOLO (Object Detection), Prophet/ARIMA (Forecasting), LangChain (GenAI Orchestration), and FastAPI (Deployment).</p>
      <p><strong>Frameworks:</strong> Ultralytics YOLOv8, Prophet, LangChain, FastAPI.</p>
    `,
    interview: {
      question: "Project Interview Question: How do you handle the architectural latency when combining a heavy CNN (Vision), a statistical model, and an LLM API in a real-time system?",
      answer: "You must decouple the pipeline using an event-driven architecture (like Kafka or RabbitMQ) and microservices. The Vision model runs continuously on edge GPUs, pushing detections to a message queue. A cron-job runs the forecasting model nightly based on aggregated queue data. Finally, the LLM is triggered asynchronously only when the forecasting model flags a critical anomaly, rather than running synchronously in a single monolithic script."
    },
    quiz: [
      {
        question: "Which of the following architectures is required to build this project?",
        options: ["Just a single massive Neural Network", "A pipeline combining CNNs (Vision), Statistical Models (Time-Series), and Transformers (LLM)", "Only a Vector Database", "Only HTML and CSS"],
        answer: 1,
        explanation: "This project requires chaining multiple different types of machine learning models together to solve a complex real-world business problem."
      }
    ]
  }
,

  // ==========================================
  // MATH & PROGRAMMING TRACK
  // ==========================================
    {
    courseType: "MATH",
    id: "math-linear-algebra-pandas",
    title: "1. Linear Algebra & Pandas",
    category: "Mathematical Foundations",
    difficulty: "Beginner",
    jobHighlight: "Data Analyst / ML Engineer",
    duration: "30 mins",
    
    // NEW 7 SECTION FORMAT
    overview: `
      <p><strong>Linear Algebra</strong> is the math of organizing numbers into grids so a computer can process millions of them instantly.</p>
      <div class="analogy-box" style="margin-top:1rem;">
        <h4>📊 The Excel Spreadsheet Analogy</h4>
        <p>Imagine doing math on one cell in Excel at a time. It's slow. Linear Algebra allows you to grab an entire column (a Vector) or a whole table (a Matrix) and do math on all the numbers simultaneously!</p>
      </div>
      <p style="color:#a5b4fc; margin-top:1rem; font-style:italic;">[GIF: Animated diagram showing a slow loop processing one number turning into a massive grid where all numbers light up and calculate instantly.]</p>
    `,
    
    coreConcept: `
      <p>Here is how a computer uses Linear Algebra to learn:</p>
      <ol style="padding-left:1.5rem; margin-top:1rem;">
        <li><strong>Step 1 (The Vector):</strong> A 1D list of numbers. <em>(Like a single column in a spreadsheet representing 'Age').</em></li>
        <li><strong>Step 2 (The Matrix):</strong> A 2D grid of numbers. <em>(Like a full spreadsheet with rows of people and columns of features).</em></li>
        <li><strong>Step 3 (Dot Product):</strong> Multiplying two matrices together. <em>(Like calculating the total cost of a shopping cart instantly).</em></li>
      </ol>
      <div style="margin-top:1rem; display:flex; gap:1rem;">
        <div style="flex:1; background:rgba(239,68,68,0.1); padding:1rem; border-left:4px solid #ef4444;">
          <strong>Before (For Loop):</strong><br>Calculates one row at a time. Takes 5 seconds.
        </div>
        <div style="flex:1; background:rgba(16,185,129,0.1); padding:1rem; border-left:4px solid #10b981;">
          <strong>After (Linear Algebra):</strong><br>Calculates 1 million rows at once. Takes 0.01 seconds.
        </div>
      </div>
    `,
    
    realTimeExamples: [
      {
        subTopic: "Vectors (1D Tensor)",
        description: "A single array or list of numbers representing one feature.",
        scenario: "Netflix storing your movie ratings as a list: [5, 3, 4, 1].",
        industry: "Entertainment"
      },
      {
        subTopic: "Matrices (2D Tensor)",
        description: "A grid of numbers with rows and columns.",
        scenario: "A bank storing transactions for 10,000 users over 12 months.",
        industry: "Banking"
      },
      {
        subTopic: "Dot Product",
        description: "Multiplying two vectors to find their correlation.",
        scenario: "Spotify calculating how similar your music taste is to your friend's.",
        industry: "Audio Streaming"
      }
    ],
    
    problemSolving: [
      {
        scenario: "You have 10 million housing records and need to multiply every 'Square Footage' by 'Price per SqFt'.",
        wrong: "Writing a Python <code>for row in data:</code> loop. Your computer will freeze for 10 minutes.",
        correct: "Using Pandas/NumPy vectorization (Linear Algebra) to multiply the entire column simultaneously.",
        steps: "1. Load data into Pandas DataFrame.<br>2. <code>df['Total'] = df['SqFt'] * df['Price']</code><br>3. The C-backend executes the math in milliseconds."
      }
    ],
    
    exercises: {
      beginner: "Write a Pandas code snippet to create a DataFrame with columns 'Name' and 'Age'.<br><em>Hint: Use <code>pd.DataFrame({'Name': ['A'], 'Age': [20]})</code></em>",
      intermediate: "Load a CSV file called 'housing.csv' and filter out rows where 'Price' is less than 100,000.<br><em>Steps: 1. pd.read_csv 2. df[df['Price'] > 100000]</em>",
      advanced: "Take two NumPy matrices representing image pixels and compute their Dot Product to apply a visual filter."
    },
    
    memoryTricks: `
      <p>🧠 <strong>Memory Acronym: V.M.T.</strong></p>
      <ul>
        <li><strong>V</strong>ector (1 Dimension - Line)</li>
        <li><strong>M</strong>atrix (2 Dimensions - Square)</li>
        <li><strong>T</strong>ensor (3+ Dimensions - Cube)</li>
      </ul>
      <p style="color:#fcd34d; margin-top:0.5rem; font-style:italic;">[IMAGE: A cartoon Memory Palace where a magical wand (Vector) points to a painting (Matrix) which turns into a 3D Rubik's cube (Tensor)]</p>
    `,
    
    recap: `
      <ul style="padding-left:1.5rem;">
        <li>Linear Algebra is the math of matrices.</li>
        <li>Vectors are 1D arrays, Matrices are 2D arrays.</li>
        <li>Dot Products calculate similarity and combinations fast.</li>
        <li>For-loops are slow; Vectorization is blazing fast.</li>
        <li>Pandas is the Python library that makes this easy.</li>
      </ul>
    `,
    
        code: `
import pandas as pd # Import Pandas for table manipulation
import numpy as np # Import NumPy for mathematical operations

# Create a dictionary of data representing users and their ages
data = {'User': ['Alice', 'Bob', 'Charlie'], 'Age': [25, 30, 35]}

# Convert the dictionary into a Pandas DataFrame (a 2D mathematical table)
df = pd.DataFrame(data)

# Print the original Dataframe
print("Original Data:\n", df)

# Vectorized Operation: Add 5 to every single age simultaneously!
# This is Linear Algebra in action - no 'for loops' are needed.
df['Age_in_5_Years'] = df['Age'] + 5

# Print the final result showing the new column
print("\nUpdated Data:\n", df)
    `,
    quiz: [
      {
        question: "What is a 1D Tensor commonly called?",
        options: ["Matrix", "Vector", "Scalar", "Tuple"],
        answer: 1,
        explanation: "A 1D array of numbers is a Vector."
      }
    ]
  },

  // ==========================================
  // NLP & CV TRACK
  // ==========================================
  {
    courseType: "NLP_CV",
    id: "nlp-tokenization",
    title: "1. NLP: Tokenization & Embeddings",
    category: "Natural Language Processing",
    difficulty: "Intermediate",
    duration: "40 mins",
    jobHighlight: "NLP Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>🔠 The Dictionary Translator</h4>
        <p>A computer has absolutely no idea what the word "Apple" means. It only understands numbers. Tokenization is the process of chopping a sentence into syllables (tokens) and giving each token a unique ID number. Embeddings take those ID numbers and map them to coordinates in a 3D space, so the computer mathematically understands that the number for "Apple" is very close to the number for "Banana".</p>
      </div>
    `,
    concept: `
      <h3>The Core Pipeline of NLP</h3>
      <p>Modern NLP (using Hugging Face and spaCy) follows a strict pipeline before data hits a Transformer:</p>
      <ul>
        <li><strong>Tokenization:</strong> Splitting text using BPE (Byte-Pair Encoding). "ChatGPT" might be split into ["Chat", "G", "PT"].</li>
        <li><strong>Embeddings:</strong> Converting those discrete tokens into dense, continuous vectors (arrays of floats) that capture semantic meaning.</li>
        <li><strong>Language Models:</strong> Feeding those vectors into a Transformer to predict the next token, translate text, or classify sentiment.</li>
      </ul>
    `,
    interview: {
      question: "Interview Question: Why do modern LLMs use Sub-word Tokenization (like BPE) instead of Word-level Tokenization?",
      answer: "Word-level tokenization requires an absolutely massive vocabulary to account for every word, punctuation mark, and misspelling in existence, leading to many 'Out of Vocabulary' (OOV) errors. Sub-word tokenization breaks rare words down into common sub-components (e.g., 'unbelievable' -> 'un', 'believ', 'able'). This keeps the vocabulary size manageable (around 50k-100k tokens) while completely eliminating OOV errors."
    },
    quiz: [
      {
        question: "What is the primary purpose of an Embedding layer in NLP?",
        options: ["To translate English to French", "To convert integer token IDs into dense vectors that capture semantic meaning", "To remove stop-words from the text", "To spell-check the input"],
        answer: 1,
        explanation: "Embeddings map discrete words to a continuous vector space where words with similar meanings are physically closer together."
      }
    ]
  },
  {
    courseType: "NLP_CV",
    id: "cv-object-detection",
    title: "2. CV: Object Detection & OpenCV",
    category: "Computer Vision",
    difficulty: "Intermediate",
    duration: "45 mins",
    jobHighlight: "Computer Vision Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>🖼️ The Bounding Box Artist</h4>
        <p>Image classification just tells you "There is a dog in this photo". Object detection goes a step further—it draws a precise rectangle (a bounding box) around the dog, and a box around the cat, and tells you exactly where they are located. It's the difference between knowing a friend is at the stadium, versus having their exact seat number.</p>
      </div>
    `,
    concept: `
      <h3>Seeing the World through Pixels</h3>
      <p>Computer Vision relies on <strong>Feature Extraction</strong> using Convolutional Neural Networks (CNNs).</p>
      <ul>
        <li><strong>OpenCV:</strong> The industry standard library for raw image manipulation (resizing, grayscaling, edge detection).</li>
        <li><strong>Object Detection (YOLO):</strong> "You Only Look Once" models divide an image into a grid and predict bounding boxes and class probabilities simultaneously in real-time.</li>
        <li><strong>Image Segmentation:</strong> Instead of drawing a box, segmentation colors every single pixel that belongs to the dog, perfectly outlining its shape.</li>
      </ul>
    `,
    interview: {
      question: "Interview Question: What is IoU (Intersection over Union) and why is it crucial for Object Detection?",
      answer: "IoU is the metric used to evaluate how accurate a predicted bounding box is compared to the true, human-labeled ground-truth box. It calculates the area of overlap between the two boxes divided by their combined total area. An IoU of 1.0 is a perfect match. Models typically use IoU thresholds (like >0.5) to decide if a detection was 'correct'."
    },
    quiz: [
      {
        question: "What is the difference between Object Detection and Image Segmentation?",
        options: ["Detection draws bounding boxes; Segmentation classifies every individual pixel to form an exact outline", "Detection is for video; Segmentation is for photos", "Segmentation is faster than Detection", "Detection uses Audio; Segmentation uses Images"],
        answer: 0,
        explanation: "Object detection locates objects using rectangles (bounding boxes), while segmentation creates pixel-perfect masks of the object's exact shape."
      }
    ]
  },

  // ==========================================
  // MLOPS & BIG DATA TRACK
  // ==========================================
  {
    courseType: "MLOPS",
    id: "mlops-deployment-docker",
    title: "1. MLOps: Docker, AWS & MLflow",
    category: "Big Data & Deployment",
    difficulty: "Advanced",
    duration: "50 mins",
    jobHighlight: "MLOps Engineer",
    analogy: `
      <div class="analogy-box">
        <h4>🚢 The Shipping Container</h4>
        <p>Imagine you invent a brilliant new engine in your garage, but when you send it to Ford, it won't fit in their cars. This is the "It works on my machine" problem. Docker solves this by packing your Machine Learning model, the exact version of Python it needs, and all its dependencies into a standardized digital 'Shipping Container'. You can hand that container to AWS, and it will run perfectly every time.</p>
      </div>
    `,
    concept: `
      <h3>Productionizing Machine Learning</h3>
      <p>A Jupyter Notebook on your laptop is useless to a company. You must deploy it.</p>
      <ul>
        <li><strong>Docker:</strong> Containerizes your FastAPI model server so it runs consistently anywhere.</li>
        <li><strong>MLflow:</strong> Tracks model experiments. When you train 50 versions of a model, MLflow records the hyperparameters and accuracy of each one, ensuring you deploy the best version.</li>
        <li><strong>Apache Spark & Ray:</strong> When your dataset is 5 Terabytes, Pandas will crash your computer. Spark and Ray distribute the data and the model training across dozens of AWS servers simultaneously.</li>
      </ul>
    `,
    interview: {
      question: "Interview Question: What is 'Data Drift' and 'Concept Drift' in MLOps, and how do you handle it?",
      answer: "Data drift occurs when the input data changes over time (e.g., users start uploading 4K images instead of 1080p). Concept drift occurs when the actual target variable's relationship changes (e.g., a spam filter breaks because spammers invent a new tactic). MLOps engineers handle this by implementing continuous monitoring pipelines that track model accuracy in production. When accuracy drops below a threshold, the system automatically triggers a retraining pipeline (CI/CD for ML) using the freshest data."
    },
    quiz: [
      {
        question: "What is the primary purpose of MLflow in a Machine Learning lifecycle?",
        options: ["To speed up matrix multiplication", "To track experiments, parameters, metrics, and manage model versions", "To containerize the application", "To query Big Data databases"],
        answer: 1,
        explanation: "MLflow acts as a ledger and registry for ML models, ensuring data scientists can perfectly reproduce experiments and push the correct model versions to production."
      }
    ]
  }
,

  // ==========================================
  // MATH & PROGRAMMING TRACK (Additions)
  // ==========================================
    {
    courseType: "MATH",
    id: "math-python-basics",
    title: "2. Python Control Flow",
    category: "Programming Foundations",
    difficulty: "Beginner",
    jobHighlight: "Data Scientist",
    duration: "20 mins",
    
    overview: `
      <p><strong>Python Control Flow</strong> is how you give a computer conditional instructions (If this, do that) and tell it to repeat tasks (Loops).</p>
      <div class="analogy-box" style="margin-top:1rem;">
        <h4>🚦 The Traffic Light Analogy</h4>
        <p>If the light is RED, stop. If the light is GREEN, go. This is an <code>if/else</code> statement. If you have 50 cars, repeat this rule for every car. That is a <code>for-loop</code>.</p>
      </div>
    `,
    
    coreConcept: `
      <p>The core building blocks of Python:</p>
      <ol style="padding-left:1.5rem; margin-top:1rem;">
        <li><strong>Variables:</strong> Boxes that hold data (e.g., <code>age = 25</code>).</li>
        <li><strong>If/Else:</strong> Decision making (e.g., If user is VIP, give discount).</li>
        <li><strong>Loops:</strong> Repeating tasks automatically without copying and pasting code.</li>
      </ol>
      <div style="margin-top:1rem; display:flex; gap:1rem;">
        <div style="flex:1; background:rgba(239,68,68,0.1); padding:1rem; border-left:4px solid #ef4444;">
          <strong>Before (Manual):</strong><br>Writing <code>print(car)</code> 1,000 times for 1,000 cars.
        </div>
        <div style="flex:1; background:rgba(16,185,129,0.1); padding:1rem; border-left:4px solid #10b981;">
          <strong>After (Loop):</strong><br>Writing <code>for car in cars: print(car)</code> once!
        </div>
      </div>
    `,
    
    realTimeExamples: [
      {
        subTopic: "If/Else Statements",
        description: "Branching logic based on conditions.",
        scenario: "Amazon checking if your cart > $25 to apply Free Shipping.",
        industry: "E-Commerce"
      },
      {
        subTopic: "While Loops",
        description: "Repeating code until a condition is false.",
        scenario: "A server listening for new messages until the app is closed.",
        industry: "Social Media"
      }
    ],
    
    problemSolving: [
      {
        scenario: "You need to send an email to 500 subscribed users, but not to unsubscribed users.",
        wrong: "Manually checking the database 500 times and clicking 'send'.",
        correct: "Writing a Python <code>for</code> loop with an <code>if</code> statement.",
        steps: "1. <code>for user in users:</code><br>2. <code>if user.subscribed: send_email()</code>"
      }
    ],
    
    exercises: {
      beginner: "Create a variable called <code>is_admin</code> and set it to True.",
      intermediate: "Write a for-loop that prints numbers from 1 to 5.",
      advanced: "Write a function that accepts a list of ages, and returns a new list containing only ages >= 18."
    },
    
    memoryTricks: `
      <p>🧠 <strong>Memory Chant: IF it's true, FOR everyone, WHILE we wait!</strong></p>
    `,
    
    recap: `
      <ul style="padding-left:1.5rem;">
        <li>Variables store data.</li>
        <li>If/Else controls logic flows.</li>
        <li>For-loops iterate over lists.</li>
        <li>While-loops run until stopped.</li>
        <li>Python relies on indentation (spaces) to group blocks!</li>
      </ul>
    `,
    
        code: `
# Define a standard Python function that takes 'name' as an argument
def greet_user(name):
    # Use an if-statement to check if the name is 'Admin'
    if name == 'Admin':
        # Return a special greeting for the Admin
        return "Welcome back, Creator!"
    # The 'else' block catches all other names
    else:
        # Use an f-string to insert the variable 'name' into the string
        return f"Hello, {name}! Let's learn ML."

# Call the function with 'Admin' and print the result
print(greet_user('Admin'))

# Call the function with a standard name and print the result
print(greet_user('Alice'))
    `,
    quiz: [
      {
        question: "Which keyword is used to iterate over items in a list?",
        options: ["if", "while", "for", "loop"],
        answer: 2,
        explanation: "The 'for' loop is specifically designed to iterate over sequences like lists."
      }
    ]
  },
  {
    courseType: "MATH",
    id: "math-r-programming",
    title: "8. R Programming Foundations",
    category: "Programming Foundations",
    difficulty: "Beginner",
    jobHighlight: "Statistician / Data Scientist",
    duration: "25 mins",
    analogy: `
      <div class="analogy-box">
        <h4>🔬 The Scientist's Notebook</h4>
        <p>If Python is the Swiss Army Knife of programming (good at everything), <strong>R</strong> is the specialized surgical scalpel built specifically for statisticians and data miners. It comes pre-loaded with massive statistical tools natively built-in.</p>
      </div>
    `,
    concept: `<h3>Why Learn R?</h3>
    <p>While Python is the king of general Machine Learning and Deep Learning, R dominates academic research, bioinformatics, and pure statistical modeling. Understanding R syntax (like DataFrames, vectors, and the famous ggplot2 library) makes you a dual-threat Data Scientist.</p>`,
    code: `
# R Programming Example: Analyzing a Dataset
# R natively understands DataFrames without needing to import Pandas!

# 1. Create a simple DataFrame
students <- data.frame(
  Name = c("Alice", "Bob", "Charlie", "David"),
  Age = c(22, 25, 23, 24),
  Score = c(88, 92, 85, 95)
)

# 2. View the summary statistics natively
print(summary(students))

# 3. Filter data natively (Find students scoring > 90)
top_students <- subset(students, Score > 90)
print("Top Students:")
print(top_students)

# --- ZERO TO HERO EXERCISE ---
# TODO: Change the subset filter to find students older than 23!
# Hint: Use the Age column.
    `,
    interview: {
      question: "When would you choose R over Python for a project?",
      answer: "I would choose R if the project is heavily focused on complex statistical analysis, bioinformatics, or requires extremely highly-customized academic visualizations (using ggplot2). For building scalable ML production APIs, I would choose Python."
    },
    quiz: [
      {
        question: "What is the primary advantage of R?",
        options: ["Building fast web servers", "Native statistical modeling and visualization", "Writing operating systems", "Game development"],
        answer: 1,
        explanation: "R was designed by statisticians, for statisticians, making statistical operations native to the language."
      }
    ]
  },
    {
    courseType: "MATH",
    id: "math-matplotlib",
    title: "3. Data Visualization (Matplotlib)",
    category: "Mathematical Foundations",
    difficulty: "Intermediate",
    jobHighlight: "Data Analyst",
    duration: "25 mins",
    
    overview: `
      <p><strong>Matplotlib</strong> is the paintbrush of Data Science. It turns thousands of boring rows of text into beautiful, instantly understandable visual graphs.</p>
      <div class="analogy-box" style="margin-top:1rem;">
        <h4>📊 The Dashboard Analogy</h4>
        <p>If looking at a raw database is like staring at a car's engine to see how fast you are going, Matplotlib is the dashboard speedometer. It summarizes complex internal data into a simple visual gauge.</p>
      </div>
    `,
    
    coreConcept: `
      <p>The core elements of a Matplotlib chart:</p>
      <ol style="padding-left:1.5rem; margin-top:1rem;">
        <li><strong>Figure:</strong> The blank canvas (the window that pops up).</li>
        <li><strong>Axes:</strong> The actual plot (the grid, X/Y axes, and data).</li>
        <li><strong>Markers/Lines:</strong> The data representation (dots, lines, bars).</li>
      </ol>
      <div style="margin-top:1rem; display:flex; gap:1rem;">
        <div style="flex:1; background:rgba(239,68,68,0.1); padding:1rem; border-left:4px solid #ef4444;">
          <strong>Before (Raw Data):</strong><br>Staring at an Excel sheet of 500 rows trying to find a trend.
        </div>
        <div style="flex:1; background:rgba(16,185,129,0.1); padding:1rem; border-left:4px solid #10b981;">
          <strong>After (Matplotlib):</strong><br>A sharp line graph showing revenue going up!
        </div>
      </div>
    `,
    
    realTimeExamples: [
      {
        subTopic: "Line Charts",
        description: "Connecting data points over time.",
        scenario: "Robinhood showing a stock price history over 5 years.",
        industry: "Finance"
      },
      {
        subTopic: "Scatter Plots",
        description: "Plotting individual dots to find clusters or correlations.",
        scenario: "Zillow mapping housing prices vs. square footage to find outliers.",
        industry: "Real Estate"
      }
    ],
    
    problemSolving: [
      {
        scenario: "You need to present a Q3 revenue report to the CEO. You have 10,000 rows of transaction data.",
        wrong: "Sending the CEO the CSV file and hoping they figure it out.",
        correct: "Plotting a clean Bar Chart summarizing revenue per month.",
        steps: "1. Group data by month in Pandas.<br>2. <code>plt.bar(months, revenue)</code><br>3. Add labels: <code>plt.title('Q3 Revenue')</code>"
      }
    ],
    
    exercises: {
      beginner: "Import matplotlib.pyplot as plt and create a simple line plot using <code>plt.plot([1,2,3], [4,5,6])</code>.",
      intermediate: "Create a scatter plot of random X and Y coordinates and color them red.",
      advanced: "Create a Figure with 2 Subplots: a Bar Chart on the left and a Pie Chart on the right."
    },
    
    memoryTricks: `
      <p>🧠 <strong>Memory Trick: 'P.L.T. - Plot, Labels, Title'</strong></p>
      <p>Always remember the holy trinity of a good chart: Draw the PLOT, add the LABELS (X and Y), and give it a TITLE!</p>
    `,
    
    recap: `
      <ul style="padding-left:1.5rem;">
        <li>Matplotlib is the core charting library in Python.</li>
        <li>Always use <code>import matplotlib.pyplot as plt</code>.</li>
        <li><code>plt.plot()</code> draws lines, <code>plt.scatter()</code> draws dots.</li>
        <li>Never forget to call <code>plt.show()</code> at the end to display the chart!</li>
      </ul>
    `,
    
        code: `
import matplotlib.pyplot as plt # Import the plotting engine
import numpy as np # Import numpy to generate mathematical numbers

# Create an array of 100 evenly spaced numbers between 0 and 10 for the X-axis
x = np.linspace(0, 10, 100)

# Apply the mathematical sine function to every X value to get the Y-axis
y = np.sin(x)

# Create the line plot, connecting X and Y with a blue line
plt.plot(x, y, color='blue', label='Sine Wave')

# Add a title to the top of the chart
plt.title('My First AI Math Plot')

# Label the X and Y axes
plt.xlabel('Time (X)')
plt.ylabel('Amplitude (Y)')

# Display the legend (which reads the 'label' from the plot command)
plt.legend()

# Render the graph to the screen
plt.show()
    `,
    quiz: [
      {
        question: "Which function is used to physically display the graph window?",
        options: ["plt.draw()", "plt.show()", "plt.display()", "plt.render()"],
        answer: 1,
        explanation: "plt.show() triggers the rendering engine to open the window and display your figure."
      }
    ]
  },
  {
    courseType: "MATH",
    id: "math-scipy",
    title: "10. Advanced Math (SciPy)",
    category: "Mathematical Foundations",
    difficulty: "Intermediate",
    jobHighlight: "ML Engineer / Research Scientist",
    duration: "25 mins",
    analogy: `
      <div class="analogy-box">
        <h4>🚀 The Rocket Engine</h4>
        <p>If NumPy is the car engine that performs basic vector math, <strong>SciPy</strong> is the rocket engine built on top of NumPy. It contains advanced mathematical modules for optimization, linear algebra, and calculus that are too complex to code from scratch.</p>
      </div>
    `,
    concept: `<h3>What is SciPy?</h3>
    <p>While we wrote a manual Gradient Descent loop in a previous lesson, in the real world, you never write calculus by hand. You use the <code>scipy.optimize</code> library. SciPy (Scientific Python) gives you access to advanced solvers, eigenvalue decomposition, fast fourier transforms, and complex statistical distribution models.</p>`,
    code: `
# Practical Example: Finding the minimum of a curve using SciPy
from scipy.optimize import minimize

# 1. Define a mathematical function: f(x) = x^2 + 5x + 10
# This represents our "Error Curve" that we want to minimize.
def error_function(x):
    return x**2 + 5*x + 10

# 2. Start with an initial random guess for x
initial_guess = 0.0

# 3. Let SciPy use advanced Calculus (BFGS algorithm) to find the minimum!
result = minimize(error_function, initial_guess)

print(f"The minimum error occurs when x = {result.x[0]:.4f}")
print(f"The minimum error value is: {result.fun:.4f}")

# Output: 
# The minimum error occurs when x = -2.5000
# The minimum error value is: 3.7500

# --- ZERO TO HERO EXERCISE ---
# TODO: Change the function to f(x) = x^2 - 10x + 5. What is the new minimum?
    `,
    interview: {
      question: "What is the relationship between NumPy and SciPy?",
      answer: "SciPy is built directly on top of NumPy. NumPy handles the fast, low-level array manipulation and vector math. SciPy provides higher-level, complex mathematical algorithms (like integration and optimization) that operate on those NumPy arrays."
    },
    quiz: [
      {
        question: "Which SciPy sub-module is used to find the minimum or maximum of a mathematical function?",
        options: ["scipy.stats", "scipy.linalg", "scipy.optimize", "scipy.fft"],
        answer: 2,
        explanation: "scipy.optimize provides functions for minimizing (or maximizing) objective functions, finding roots, and curve fitting."
      }
    ]
  }
  ,{
    courseType: "ML",
    id: "ml-supervised-unsupervised",
    title: "1. Supervised vs Unsupervised Learning",
    category: "Machine Learning",
    difficulty: "Beginner",
    jobHighlight: "Data Scientist",
    duration: "30 mins",
    overview: `
      <p><strong>Supervised Learning</strong> is giving a computer the answers so it learns a pattern. <strong>Unsupervised Learning</strong> is giving a computer data without answers and asking it to find hidden patterns itself.</p>
      <div class="analogy-box" style="margin-top:1rem;">
        <h4>🧑‍🏫 The Teacher Analogy</h4>
        <p><strong>Supervised:</strong> A teacher gives you flashcards with dog pictures. The back says "Dog". You learn what a dog looks like. <br><strong>Unsupervised:</strong> You are given 100 random animal photos. You aren't told what they are, but you group all the dogs together because they look similar.</p>
      </div>
      <p style="color:#a5b4fc; margin-top:1rem; font-style:italic;">[GIF: Animation showing a machine sorting labeled apples and oranges vs a machine grouping mysterious shapes by color without labels.]</p>
    `,
    coreConcept: `
      <p>How machines learn from data:</p>
      <ol style="padding-left:1.5rem; margin-top:1rem;">
        <li><strong>Step 1 (Gather Data):</strong> Collect thousands of examples (e.g., house prices).</li>
        <li><strong>Step 2 (Labeling):</strong> In supervised, you attach the "True Price" to each house. In unsupervised, you skip this.</li>
        <li><strong>Step 3 (Training):</strong> The algorithm processes the data to build a mathematical rule.</li>
      </ol>
      <div style="margin-top:1rem; display:flex; gap:1rem;">
        <div style="flex:1; background:rgba(239,68,68,0.1); padding:1rem; border-left:4px solid #ef4444;">
          <strong>Before (Hardcoding):</strong><br>Writing 1,000 IF statements to guess if an email is spam based on keywords.
        </div>
        <div style="flex:1; background:rgba(16,185,129,0.1); padding:1rem; border-left:4px solid #10b981;">
          <strong>After (ML):</strong><br>Showing the ML model 10,000 past spam emails and letting it write the rules itself.
        </div>
      </div>
    `,
    realTimeExamples: [
      {
        subTopic: "Supervised Learning",
        description: "Learning from labeled historical data to predict future labels.",
        scenario: "Gmail marking an email as SPAM because you manually marked similar ones in the past.",
        industry: "Cybersecurity"
      },
      {
        subTopic: "Unsupervised Learning",
        description: "Finding hidden clusters or anomalies in raw data.",
        scenario: "Spotify creating a 'Discover Weekly' playlist by grouping users with similar listening habits.",
        industry: "Audio Streaming"
      }
    ],
    problemSolving: [
      {
        scenario: "You have 500,000 credit card transactions and need to stop fraudsters.",
        wrong: "Writing an IF statement that blocks transactions over $10,000. (Hackers will just steal $9,999).",
        correct: "Using Unsupervised Learning (Anomaly Detection) to flag any purchase that deviates from a user's normal mathematical cluster.",
        steps: "1. Feed all transactions into an ML model.<br>2. Model clusters normal behavior.<br>3. Any transaction landing outside the cluster is flagged."
      }
    ],
    exercises: {
      beginner: "Fill in the blank: Predicting tomorrow's temperature based on historical weather records is an example of _________ Learning.",
      intermediate: "You are given a dataset of MRI brain scans, but none of them say whether a tumor is present. Which ML approach must you use to group similar scans?",
      advanced: "Design a hybrid system for a bank that uses both Supervised and Unsupervised learning to approve loans."
    },
    memoryTricks: `
      <p>🧠 <strong>Memory Trick: 'Supervise the Student, Unsupervise the Explorer'</strong></p>
      <p>Supervised = Has an Answer Key (Labels).<br>Unsupervised = No Answer Key, just exploring clusters.</p>
    `,
    recap: `
      <ul style="padding-left:1.5rem;">
        <li>Supervised Learning requires labeled data (X -> Y).</li>
        <li>Unsupervised Learning uses unlabeled data to find hidden structure.</li>
        <li>Supervised is used for prediction (Spam, Prices).</li>
        <li>Unsupervised is used for grouping (Customer Segmentation).</li>
        <li>Data quality is more important than the algorithm used.</li>
      </ul>
    `,
        code: `
# Import the Logistic Regression model from scikit-learn
from sklearn.linear_model import LogisticRegression

# Define our Features (X): [[Contains_Discount_Word, Contains_Urgent_Word]]
# 1 means 'Yes', 0 means 'No'
X = [[0, 1], [1, 1], [0, 0], [1, 0]]

# Define our Labels (Y): The 'Answer Key' for Supervised Learning
# 1 = Spam, 0 = Not Spam
y = [1, 1, 0, 0]

# Instantiate the Logistic Regression algorithm
model = LogisticRegression()

# Train (fit) the model so it learns the mathematical pattern linking X to Y
model.fit(X, y)

# Ask the model to predict a brand new email: [[Contains_Discount, Contains_Urgent]]
# Here, we pass [1, 1] which has both keywords
prediction = model.predict([[1, 1]])

# Print out the model's prediction
print("Prediction (1=Spam, 0=Safe):", prediction)
    `,
    quiz: [
      {
        question: "Which of the following requires labeled data?",
        options: ["Clustering", "Supervised Learning", "Unsupervised Learning", "Dimensionality Reduction"],
        answer: 1,
        explanation: "Supervised learning explicitly requires an 'answer key' or labels to train the model."
      }
    ]
  }  ,{
    courseType: "ML",
    id: "decision-trees-random-forests",
    title: "3. Decision Trees & Random Forests",
    category: "Machine Learning",
    difficulty: "Intermediate",
    jobHighlight: "ML Engineer",
    duration: "35 mins",
    overview: `
      <p><strong>Decision Trees</strong> are flowchart-like models that ask Yes/No questions to make a prediction. <strong>Random Forests</strong> combine hundreds of Decision Trees to make a super-accurate prediction through a majority vote.</p>
      <div class="analogy-box" style="margin-top:1rem;">
        <h4>👨‍⚖️ The Jury Analogy</h4>
        <p>A Decision Tree is like asking one person for advice. They might have a strong bias. A Random Forest is like a jury of 100 people. They all vote, and the majority wins, eliminating individual bias and errors.</p>
      </div>
    `,
    coreConcept: `
      <p>How a Forest learns:</p>
      <ol style="padding-left:1.5rem; margin-top:1rem;">
        <li><strong>Step 1 (The Root Node):</strong> The algorithm finds the most important question to split the data (e.g., "Is age > 30?").</li>
        <li><strong>Step 2 (The Leaves):</strong> It keeps splitting until it reaches a final prediction (Leaf).</li>
        <li><strong>Step 3 (The Forest):</strong> It trains 100 different trees on slightly different subsets of the data, and averages their predictions (Ensembling).</li>
      </ol>
      <div style="margin-top:1rem; display:flex; gap:1rem;">
        <div style="flex:1; background:rgba(239,68,68,0.1); padding:1rem; border-left:4px solid #ef4444;">
          <strong>Before (Single Tree):</strong><br>The tree memorizes the training data perfectly, but fails horribly on new data (Overfitting).
        </div>
        <div style="flex:1; background:rgba(16,185,129,0.1); padding:1rem; border-left:4px solid #10b981;">
          <strong>After (Random Forest):</strong><br>100 trees vote. The overfitting cancels out, yielding massive accuracy.
        </div>
      </div>
    `,
    realTimeExamples: [
      {
        subTopic: "Decision Trees",
        description: "Simple, interpretable rule-based predictions.",
        scenario: "A doctor using a flowchart of symptoms to diagnose a cold.",
        industry: "Healthcare"
      },
      {
        subTopic: "Random Forests",
        description: "Ensemble of trees for high accuracy.",
        scenario: "Banks combining hundreds of risk factors to approve or deny a mortgage.",
        industry: "Banking"
      }
    ],
    problemSolving: [
      {
        scenario: "You trained a Decision Tree to predict stock prices. It got 100% accuracy on past data, but lost all your money in the real market.",
        wrong: "Trusting a single Decision Tree. It 'memorized' the past instead of learning logic (Overfitting).",
        correct: "Using a Random Forest Regressor to average out the noise and prevent overfitting.",
        steps: "1. Import RandomForestRegressor.<br>2. Set n_estimators=100 (100 trees).<br>3. Train and deploy the ensemble."
      }
    ],
    exercises: {
      beginner: "What is the term for combining multiple ML models together to get a better result? (Hint: starts with E).",
      intermediate: "Write code to instantiate a RandomForestClassifier with 50 trees.",
      advanced: "Explain mathematically how a Random Forest calculates 'Feature Importance' across its trees."
    },
    memoryTricks: `
      <p>🧠 <strong>Memory Trick: 'A Tree falls over in the wind, but a Forest stands strong.'</strong></p>
      <p>Single trees are weak to Overfitting (the wind). Forests average out the errors and remain robust.</p>
    `,
    recap: `
      <ul style="padding-left:1.5rem;">
        <li>Decision Trees split data using Yes/No questions based on Information Gain (Gini/Entropy).</li>
        <li>Trees are highly interpretable but prone to Overfitting.</li>
        <li>Random Forests are an 'Ensemble' method.</li>
        <li>They use 'Bagging' (Bootstrap Aggregating) to train trees on different data subsets.</li>
        <li>Random Forests are currently one of the most powerful algorithms for tabular (CSV) data.</li>
      </ul>
    `,
        code: `
# Import both a single Decision Tree and a Random Forest ensemble
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier

# Feature Data: [[Age, Income]]
X = [[25, 50000], [45, 100000], [22, 20000], [50, 120000]]

# Labels: 1 = Bought a House, 0 = Did not buy
y = [0, 1, 0, 1]

# 1. Single Tree (Prone to memorizing data / overfitting)
tree = DecisionTreeClassifier()
# Train the single tree
tree.fit(X, y)

# 2. Random Forest (A jury of 100 trees voting together to prevent overfitting)
forest = RandomForestClassifier(n_estimators=100)
# Train the forest
forest.fit(X, y)

# Make a prediction for a 30-year-old making $80,000 using the Forest
prediction = forest.predict([[30, 80000]])

# Print the result
print("Forest Prediction (1=Bought, 0=No):", prediction)
    `,
    quiz: [
      {
        question: "Why is a Random Forest generally better than a single Decision Tree?",
        options: ["It trains faster", "It requires less memory", "It reduces overfitting by averaging predictions", "It is easier to interpret visually"],
        answer: 2,
        explanation: "By averaging the predictions of many trees, a Random Forest cancels out the overfitting 'noise' of individual trees."
      }
    ]
  }  ,{
    courseType: "ML",
    id: "kmeans-clustering",
    title: "4. K-Means Clustering",
    category: "Machine Learning",
    difficulty: "Intermediate",
    jobHighlight: "Data Analyst / Marketing Data Scientist",
    duration: "20 mins",
    overview: `
      <p><strong>K-Means Clustering</strong> is an Unsupervised algorithm that automatically groups similar data points into 'K' distinct buckets.</p>
      <div class="analogy-box" style="margin-top:1rem;">
        <h4>👕 The T-Shirt Sizing Analogy</h4>
        <p>Imagine you have heights and weights for 10,000 customers, and you need to create exactly 3 t-shirt sizes: Small, Medium, and Large. K-Means looks at the raw data and automatically finds the 3 best 'center points' (centroids) to group the customers perfectly.</p>
      </div>
    `,
    coreConcept: `
      <p>How K-Means finds clusters:</p>
      <ol style="padding-left:1.5rem; margin-top:1rem;">
        <li><strong>Step 1 (Choose K):</strong> Tell the algorithm how many groups you want (e.g., K=3).</li>
        <li><strong>Step 2 (Drop Centroids):</strong> It randomly drops 3 'centroids' (center points) onto the data map.</li>
        <li><strong>Step 3 (Adjust):</strong> Points attach to the nearest centroid. The centroid then moves to the exact center of its attached points. It repeats until the centroids stop moving!</li>
      </ol>
      <div style="margin-top:1rem; display:flex; gap:1rem;">
        <div style="flex:1; background:rgba(239,68,68,0.1); padding:1rem; border-left:4px solid #ef4444;">
          <strong>Before (Manual):</strong><br>Manually trying to guess the boundary between "Medium" and "Large" customers.
        </div>
        <div style="flex:1; background:rgba(16,185,129,0.1); padding:1rem; border-left:4px solid #10b981;">
          <strong>After (K-Means):</strong><br>The algorithm mathematically finds the perfect cluster centers in milliseconds.
        </div>
      </div>
    `,
    realTimeExamples: [
      {
        subTopic: "Customer Segmentation",
        description: "Grouping users based on spending habits.",
        scenario: "Amazon grouping shoppers into 'Bargain Hunters', 'Whales', and 'Occasional' without labels.",
        industry: "Retail / E-Commerce"
      },
      {
        subTopic: "Image Compression",
        description: "Reducing millions of colors to a small palette.",
        scenario: "Grouping all similar shades of blue into a single blue to save file size.",
        industry: "Computer Graphics"
      }
    ],
    problemSolving: [
      {
        scenario: "You want to send 3 different marketing emails tailored to your userbase, but you don't know who is who.",
        wrong: "Guessing segments based on age (e.g., <20 gets email A).",
        correct: "Using K-Means to cluster users based on multiple hidden variables.",
        steps: "1. Extract user features (time spent, money spent).<br>2. Run K-Means with K=3.<br>3. Send a tailored email to each mathematical cluster."
      }
    ],
    exercises: {
      beginner: "If you want to group your data into 5 distinct categories, what should you set 'K' to?",
      intermediate: "Write the code to instantiate a KMeans model from scikit-learn with 4 clusters.",
      advanced: "Explain what the 'Elbow Method' is and how it helps you find the optimal value for K."
    },
    memoryTricks: `
      <p>🧠 <strong>Memory Trick: 'K is the King, Means is the Middle'</strong></p>
      <p>You choose 'K' Kings (centroids). They march to the 'Mean' (middle) of their loyal subjects (data points).</p>
    `,
    recap: `
      <ul style="padding-left:1.5rem;">
        <li>K-Means is Unsupervised (no labels needed).</li>
        <li>K stands for the number of clusters you want.</li>
        <li>Centroids are the center points of the clusters.</li>
        <li>The algorithm stops when the centroids stop shifting.</li>
        <li>You can use the 'Elbow Method' to figure out the best number for K.</li>
      </ul>
    `,
        code: `
# Import KMeans, which is an Unsupervised algorithm
from sklearn.cluster import KMeans
import numpy as np # Import numpy to structure the data

# Unlabeled Data: [[Spending_Score, Income]]
# Notice there is NO 'y' array here. The data has no answers!
X = np.array([[10, 20], [12, 22], [80, 90], [85, 95], [15, 25]])

# Instantiate KMeans and tell it we want exactly 2 distinct groups (clusters)
kmeans = KMeans(n_clusters=2, random_state=42)

# Fit the algorithm (find centroids) and assign each point to a cluster in one step
clusters = kmeans.fit_predict(X)

# Print the array of assignments (0 for cluster A, 1 for cluster B)
print("Cluster assignments:", clusters)
# Notice how the algorithm perfectly grouped the low numbers (0) and high numbers (1)!
    `,
    quiz: [
      {
        question: "In K-Means, what does 'K' represent?",
        options: ["The number of iterations", "The number of features", "The number of clusters/groups", "The learning rate"],
        answer: 2,
        explanation: "K dictates exactly how many groups or clusters the algorithm will attempt to find."
      }
    ]
  }  ,{
    courseType: "ML",
    id: "model-evaluation-metrics",
    title: "5. Model Evaluation Metrics",
    category: "Machine Learning",
    difficulty: "Advanced",
    jobHighlight: "MLOps Engineer",
    duration: "25 mins",
    overview: `
      <p><strong>Evaluation Metrics</strong> are mathematical scorecards that tell you if your ML model is actually smart, or just cheating.</p>
      <div class="analogy-box" style="margin-top:1rem;">
        <h4>🧟 The Zombie Detector Analogy</h4>
        <p>If you build an alarm to detect zombies entering a school, and the alarm says 'Human' 100% of the time, it is 99% accurate (since zombies are rare). But that 1% error means a zombie gets in! <strong>Accuracy is a terrible metric.</strong> You need Precision and Recall to measure the real danger.</p>
      </div>
    `,
    coreConcept: `
      <p>The Golden Trio of Metrics:</p>
      <ol style="padding-left:1.5rem; margin-top:1rem;">
        <li><strong>Precision:</strong> When the model cries 'Wolf!', was there actually a wolf? (Quality of positives).</li>
        <li><strong>Recall (Sensitivity):</strong> Out of all the real wolves, how many did the model catch? (Quantity of positives).</li>
        <li><strong>F1-Score:</strong> The harmonic balance between Precision and Recall.</li>
      </ol>
      <div style="margin-top:1rem; display:flex; gap:1rem;">
        <div style="flex:1; background:rgba(239,68,68,0.1); padding:1rem; border-left:4px solid #ef4444;">
          <strong>Before (Accuracy only):</strong><br>Boasting a 99% accurate cancer-detection model that actually misses 50% of real tumors.
        </div>
        <div style="flex:1; background:rgba(16,185,129,0.1); padding:1rem; border-left:4px solid #10b981;">
          <strong>After (Recall):</strong><br>Measuring 'Recall' to ensure the model catches 100% of tumors, even if it triggers a few false alarms.
        </div>
      </div>
    `,
    realTimeExamples: [
      {
        subTopic: "High Precision Priority",
        description: "When False Positives are expensive.",
        scenario: "A spam filter blocking a highly important email from your boss (False Positive).",
        industry: "Email Providers"
      },
      {
        subTopic: "High Recall Priority",
        description: "When False Negatives are deadly.",
        scenario: "An airplane sensor failing to detect an engine fire (False Negative).",
        industry: "Aviation"
      }
    ],
    problemSolving: [
      {
        scenario: "Your fraud-detection model catches 10 fraudsters, but blocks 5,000 innocent customers in the process.",
        wrong: "Looking at 'Recall' (You caught the fraudsters, but destroyed user experience).",
        correct: "Looking at 'Precision' and tuning the threshold to stop falsely flagging humans.",
        steps: "1. Calculate Precision.<br>2. Adjust decision threshold from 0.5 to 0.8.<br>3. Block fewer innocent people."
      }
    ],
    exercises: {
      beginner: "If catching every single sick patient is your goal, do you want high Precision or high Recall?",
      intermediate: "Write the code to calculate the F1-Score using scikit-learn metrics.",
      advanced: "Draw a Confusion Matrix table and label True Positive, True Negative, False Positive, and False Negative."
    },
    memoryTricks: `
      <p>🧠 <strong>Memory Trick: 'Precision is being Picky, Recall is Recalling everyone'</strong></p>
      <p>A picky bouncer (Precision) only lets 100% true VIPs in. A net that recalls everyone (Recall) catches all the VIPs, but drags in some normal people too.</p>
    `,
    recap: `
      <ul style="padding-left:1.5rem;">
        <li>Never trust Accuracy on an imbalanced dataset.</li>
        <li>Precision = True Positives / (True Positives + False Positives).</li>
        <li>Recall = True Positives / (True Positives + False Negatives).</li>
        <li>The Confusion Matrix displays all 4 prediction states.</li>
        <li>The F1-Score averages Precision and Recall to give you one master score.</li>
      </ul>
    `,
        code: `
# Import all the necessary evaluation metrics
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# The ground truth: The actual labels in reality (1 = Zombie, 0 = Human)
y_true = [0, 1, 0, 0, 1, 1, 0]

# What our AI model predicted
y_pred = [0, 1, 1, 0, 1, 0, 0]

# Accuracy: The overall percentage of correct guesses (Can be misleading!)
print(f"Accuracy: {accuracy_score(y_true, y_pred):.2f}")

# Precision: When the model yelled 'Zombie!', how often was it actually a Zombie?
print(f"Precision: {precision_score(y_true, y_pred):.2f}")

# Recall (Sensitivity): Out of all the real Zombies, how many did the model catch?
print(f"Recall: {recall_score(y_true, y_pred):.2f}")

# F1-Score: The harmonic mean (perfect balance) between Precision and Recall
print(f"F1-Score: {f1_score(y_true, y_pred):.2f}")
    `,
    quiz: [
      {
        question: "Which metric tells us the percentage of actual positive cases that the model successfully caught?",
        options: ["Precision", "Recall", "Accuracy", "F1-Score"],
        answer: 1,
        explanation: "Recall (Sensitivity) measures how well the model 'recalls' or catches the true positive cases."
      }
    ]
  }
  ,{
    courseType: "DL",
    id: "dl-neural-networks",
    title: "1. Neural Networks (The Brain)",
    category: "Deep Learning",
    difficulty: "Beginner",
    jobHighlight: "Deep Learning Researcher",
    duration: "40 mins",
    overview: `
      <p><strong>Neural Networks</strong> are computing systems inspired by the biological neural networks that constitute human brains.</p>
      <div class="analogy-box" style="margin-top:1rem;">
        <h4>🧠 The Brain Cell Analogy</h4>
        <p>Imagine a committee of people trying to guess the price of a house. The first row of people looks at the size and passes their guess to the second row. The second row combines that guess with the location, and passes it to the boss. The boss makes the final decision. An Artificial Neural Network works the exact same way with mathematical 'neurons' layered on top of each other.</p>
      </div>
    `,
    coreConcept: `
      <p>The Architecture of a Neural Network:</p>
      <ol style="padding-left:1.5rem; margin-top:1rem;">
        <li><strong>Input Layer:</strong> Receives the raw data (pixels of an image, text).</li>
        <li><strong>Hidden Layers:</strong> The 'magic' layers where the network extracts features (edges, shapes, eyes, faces).</li>
        <li><strong>Output Layer:</strong> The final prediction (e.g., "It's a Dog!").</li>
      </ol>
      <div style="margin-top:1rem; display:flex; gap:1rem;">
        <div style="flex:1; background:rgba(239,68,68,0.1); padding:1rem; border-left:4px solid #ef4444;">
          <strong>Before (Traditional ML):</strong><br>A human engineer manually writes code to detect fur and floppy ears to classify a dog.
        </div>
        <div style="flex:1; background:rgba(16,185,129,0.1); padding:1rem; border-left:4px solid #10b981;">
          <strong>After (Deep Learning):</strong><br>The Neural Network automatically learns what fur and floppy ears look like by analyzing 10,000 photos.
        </div>
      </div>
    `,
    realTimeExamples: [
      {
        subTopic: "Predictive Pricing",
        description: "Estimating complex non-linear prices.",
        scenario: "Zillow predicting the precise market value of a home using 500 different features.",
        industry: "Real Estate"
      },
      {
        subTopic: "Voice Assistants",
        description: "Processing sequential data.",
        scenario: "Siri converting your voice audio waves into text.",
        industry: "Consumer Electronics"
      }
    ],
    problemSolving: [
      {
        scenario: "Your neural network is outputting random garbage predictions.",
        wrong: "Training it for 100 more hours on the same random garbage.",
        correct: "Checking if you normalized/scaled the input data and if the learning rate is too high.",
        steps: "1. Scale input features to [0,1].<br>2. Lower the learning rate.<br>3. Retrain and watch the loss drop."
      }
    ],
    exercises: {
      beginner: "Which layer of the neural network interacts directly with the final user?",
      intermediate: "Write a TensorFlow/Keras code snippet to add a 'Dense' hidden layer with 64 neurons.",
      advanced: "Explain the mathematical difference between the Sigmoid and ReLU activation functions."
    },
    memoryTricks: `
      <p>🧠 <strong>Memory Trick: 'Inputs, Hiddens, Outputs'</strong></p>
      <p>Inputs = Eyes (Seeing the data). Hidden = Brain (Thinking about data). Outputs = Mouth (Speaking the prediction).</p>
    `,
    recap: `
      <ul style="padding-left:1.5rem;">
        <li>Deep Learning is a subfield of ML using multi-layered Neural Networks.</li>
        <li>The network learns by adjusting 'Weights' and 'Biases' via Backpropagation.</li>
        <li>Activation functions (like ReLU) give the network the power to learn non-linear patterns.</li>
        <li>Loss functions measure how wrong the network is.</li>
        <li>Optimizers (like Adam) update the weights to minimize the loss.</li>
      </ul>
    `,
        code: `
import tensorflow as tf # Import TensorFlow, the core deep learning framework
from tensorflow.keras.models import Sequential # Import Sequential to stack layers
from tensorflow.keras.layers import Dense # Import Dense for fully connected neurons

# 1. Build the Brain! Stacking layers sequentially
model = Sequential([
    # Input layer + Hidden Layer 1 (128 neurons). 'relu' adds non-linearity
    Dense(128, activation='relu', input_shape=(10,)), 
    
    # Hidden Layer 2 (64 neurons). Further extracts complex patterns
    Dense(64, activation='relu'),
    
    # Output Layer (1 neuron). 'sigmoid' squashes the output between 0 and 1 (Probability)
    Dense(1, activation='sigmoid')
])

# 2. Compile the Brain (Tell it how to learn)
# 'adam' is the optimizer that updates the weights
# 'binary_crossentropy' calculates the error for Yes/No predictions
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# 3. Print the architecture of the neural network
model.summary()
    `,
    quiz: [
      {
        question: "What is the purpose of an Activation Function in a neural network?",
        options: ["To make the network run faster", "To introduce non-linearity, allowing the network to learn complex patterns", "To randomly turn off neurons to prevent overfitting", "To download data from the internet"],
        answer: 1,
        explanation: "Without activation functions, a neural network is just a giant linear regression model. Activation functions like ReLU allow the network to curve and bend its decision boundaries."
      }
    ]
  }  ,{
    courseType: "DL",
    id: "dl-cnns",
    title: "2. Convolutional Neural Networks (CNNs)",
    category: "Deep Learning",
    difficulty: "Intermediate",
    jobHighlight: "Computer Vision Engineer",
    duration: "45 mins",
    overview: `
      <p><strong>CNNs</strong> are specialized neural networks designed to process visual imagery. They are the eyes of Artificial Intelligence.</p>
      <div class="analogy-box" style="margin-top:1rem;">
        <h4>🔍 The Magnifying Glass Analogy</h4>
        <p>Imagine looking at a massive painting through a tiny magnifying glass. You scan the top-left corner, look at the brush strokes, and move the glass slightly to the right. You keep scanning the entire painting. <strong>A CNN does exactly this!</strong> It slides a mathematical 'filter' over an image to detect edges, curves, and eventually entire faces.</p>
      </div>
    `,
    coreConcept: `
      <p>How CNNs see the world:</p>
      <ol style="padding-left:1.5rem; margin-top:1rem;">
        <li><strong>Convolutional Layer:</strong> Slides filters over the image to detect features (e.g., vertical lines, corners).</li>
        <li><strong>Pooling Layer (Max Pooling):</strong> Shrinks the image to reduce computation and prevent overfitting.</li>
        <li><strong>Fully Connected Layer:</strong> Flatten the extracted features into a standard neural network to make the final prediction.</li>
      </ol>
      <div style="margin-top:1rem; display:flex; gap:1rem;">
        <div style="flex:1; background:rgba(239,68,68,0.1); padding:1rem; border-left:4px solid #ef4444;">
          <strong>Before (Standard NN):</strong><br>Feeding a 1000x1000 image into a standard NN requires 1 million input neurons, crashing the computer.
        </div>
        <div style="flex:1; background:rgba(16,185,129,0.1); padding:1rem; border-left:4px solid #10b981;">
          <strong>After (CNN):</strong><br>Using shared filters (Convolution) drops the required parameters by 99%, making image processing lightning fast.
        </div>
      </div>
    `,
    realTimeExamples: [
      {
        subTopic: "Facial Recognition",
        description: "Detecting specific human features.",
        scenario: "Apple FaceID scanning your face to unlock your phone.",
        industry: "Mobile Security"
      },
      {
        subTopic: "Medical Imaging",
        description: "Detecting anomalies in X-Rays.",
        scenario: "An AI scanning an MRI to highlight potential tumors faster than a human doctor.",
        industry: "Healthcare"
      }
    ],
    problemSolving: [
      {
        scenario: "Your CNN is taking 3 weeks to train on a dataset of 100,000 images.",
        wrong: "Buying a $50,000 supercomputer.",
        correct: "Adding Max Pooling layers to aggressively downsample the image dimensions.",
        steps: "1. Add a Conv2D layer.<br>2. Add a MaxPooling2D layer.<br>3. Repeat to shrink the spatial dimensions."
      }
    ],
    exercises: {
      beginner: "What type of data are CNNs primarily used for?",
      intermediate: "What does a 'MaxPooling2D' layer do to an image tensor?",
      advanced: "Calculate the output dimension of a 28x28 image passed through a 3x3 Conv2D filter with stride 1 and no padding."
    },
    memoryTricks: `
      <p>🧠 <strong>Memory Trick: 'Conv, Pool, Flat'</strong></p>
      <p>First you Convolve (extract features). Then you Pool (shrink the image). Finally, you Flatten (convert to a 1D array for the final prediction).</p>
    `,
    recap: `
      <ul style="padding-left:1.5rem;">
        <li>CNNs are the gold standard for Computer Vision.</li>
        <li>Filters/Kernels are small matrices that detect specific patterns like edges.</li>
        <li>Early layers detect simple lines; deep layers detect complex objects (dogs, cars).</li>
        <li>Max Pooling reduces the size of the data, speeding up training.</li>
        <li>Flattening bridges the visual features into a standard classification network.</li>
      </ul>
    `,
        code: `
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense

# Building a CNN for Image Classification (like detecting Cats vs Dogs)
model = Sequential([
    # 1. Convolutional Layer: Slides 32 small 3x3 filters over the image to detect edges
    Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)),
    
    # 2. Pooling Layer: Shrinks the image dimensions by half, keeping only the most important pixels
    MaxPooling2D(pool_size=(2, 2)),
    
    # 3. Second Conv Layer: Uses 64 filters to detect complex shapes (like eyes or ears)
    Conv2D(64, kernel_size=(3, 3), activation='relu'),
    
    # Another Pooling layer to shrink the data further
    MaxPooling2D(pool_size=(2, 2)),
    
    # 4. Flatten: Unrolls the 2D image matrices into a flat 1D array of numbers
    Flatten(),
    
    # 5. Standard Dense Neural Network to make the final decision based on the extracted features
    Dense(128, activation='relu'),
    
    # Output layer: 'softmax' outputs percentages for 10 different categories (e.g., digits 0-9)
    Dense(10, activation='softmax') 
])

# Print the blueprint of the CNN
model.summary()
    `,
    quiz: [
      {
        question: "What is the primary function of a MaxPooling layer in a CNN?",
        options: ["To increase the number of filters", "To reduce the spatial dimensions (width and height) of the image tensor", "To add colors to the image", "To convert the image into text"],
        answer: 1,
        explanation: "Max Pooling slides over the tensor and only keeps the maximum value in a given window, effectively downsampling the image size and reducing computational load."
      }
    ]
  }  ,{
    courseType: "DL",
    id: "dl-rnns",
    title: "3. Recurrent Neural Networks (RNNs)",
    category: "Deep Learning",
    difficulty: "Advanced",
    jobHighlight: "NLP Engineer",
    duration: "40 mins",
    overview: `
      <p><strong>RNNs</strong> are neural networks designed to process sequential data, like text, audio, and stock prices. They have 'memory'.</p>
      <div class="analogy-box" style="margin-top:1rem;">
        <h4>📖 The Reading Analogy</h4>
        <p>When you read a sentence, you understand the current word based on your memory of the previous words. You don't throw everything away and start thinking from scratch every second. <strong>Standard Neural Networks have amnesia. RNNs have memory!</strong> They pass information from the previous word to help understand the next word.</p>
      </div>
    `,
    coreConcept: `
      <p>How an RNN remembers:</p>
      <ol style="padding-left:1.5rem; margin-top:1rem;">
        <li><strong>The Loop:</strong> RNNs have a loop in them. They output a prediction, but also output a 'hidden state' (memory) that is fed back into itself for the next step.</li>
        <li><strong>LSTMs (Long Short-Term Memory):</strong> Standard RNNs forget things quickly (vanishing gradient). LSTMs fix this by adding 'memory gates' to remember things for a long time.</li>
      </ol>
      <div style="margin-top:1rem; display:flex; gap:1rem;">
        <div style="flex:1; background:rgba(239,68,68,0.1); padding:1rem; border-left:4px solid #ef4444;">
          <strong>Before (Standard NN):</strong><br>Trying to predict the next word in "I grew up in France, so I speak fluent ___". The network forgot 'France' 6 words ago.
        </div>
        <div style="flex:1; background:rgba(16,185,129,0.1); padding:1rem; border-left:4px solid #10b981;">
          <strong>After (LSTM):</strong><br>The LSTM opens its 'memory gate' to store the word 'France', carries it all the way to the end, and correctly predicts 'French'.
        </div>
      </div>
    `,
    realTimeExamples: [
      {
        subTopic: "Language Translation",
        description: "Translating sentences word by word.",
        scenario: "Google Translate converting an English paragraph into Japanese.",
        industry: "Global Communications"
      },
      {
        subTopic: "Stock Market Prediction",
        description: "Predicting future prices based on historical sequences.",
        scenario: "Hedge funds analyzing the past 30 days of stock prices to predict Day 31.",
        industry: "Finance"
      }
    ],
    problemSolving: [
      {
        scenario: "You are training an RNN on a 1,000-page book, but the gradients 'vanish' and the model stops learning entirely.",
        wrong: "Increasing the learning rate.",
        correct: "Swapping the basic RNN layers for LSTM (Long Short-Term Memory) or GRU layers.",
        steps: "1. Delete SimpleRNN.<br>2. Import LSTM.<br>3. Train the network without vanishing gradients."
      }
    ],
    exercises: {
      beginner: "If a CNN is for images, what type of data is an RNN for?",
      intermediate: "Explain what the 'Forget Gate' does in an LSTM cell.",
      advanced: "Write a Keras script to build an LSTM that takes sequences of length 50."
    },
    memoryTricks: `
      <p>🧠 <strong>Memory Trick: 'Recurrent means Repeating'</strong></p>
      <p>The network repeats its own hidden state over and over, carrying the memory of the past into the present.</p>
    `,
    recap: `
      <ul style="padding-left:1.5rem;">
        <li>RNNs are for Time Series and Sequential Data (Text, Audio, Video).</li>
        <li>They suffer from the Vanishing Gradient Problem on long sequences.</li>
        <li>LSTMs and GRUs are advanced RNNs that use gates to control memory flow.</li>
        <li>Transformers have largely replaced RNNs for modern NLP, but RNNs are still heavily used for Time Series forecasting.</li>
      </ul>
    `,
        code: `
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Embedding

# Define the size of our dictionary (10,000 words)
vocab_size = 10000
# Define the size of the dense mathematical vector for each word
embedding_dim = 64

# Build the Recurrent model
model = Sequential([
    # 1. Embedding Layer: Converts raw word integers into dense mathematical vectors
    Embedding(input_dim=vocab_size, output_dim=embedding_dim),
    
    # 2. The Memory Brain: An LSTM (Long Short-Term Memory) layer with 128 memory cells
    # This layer remembers the context of previous words in the sentence!
    LSTM(128, return_sequences=False),
    
    # 3. Final Prediction: A single neuron to predict Sentiment (1=Positive, 0=Negative)
    Dense(1, activation='sigmoid')
])

# Print the model blueprint
model.summary()
    `,
    quiz: [
      {
        question: "Why were LSTMs invented as an upgrade to standard RNNs?",
        options: ["To process images faster", "To solve the Vanishing Gradient Problem and allow the network to remember long-term dependencies", "To use less RAM", "To output multiple languages simultaneously"],
        answer: 1,
        explanation: "Standard RNNs 'forget' early information in a long sequence because the gradients vanish during backpropagation. LSTMs solve this using gating mechanisms."
      }
    ]
  }  ,{
    courseType: "DL",
    id: "dl-transfer-learning",
    title: "4. Transfer Learning",
    category: "Deep Learning",
    difficulty: "Advanced",
    jobHighlight: "AI Developer",
    duration: "30 mins",
    overview: `
      <p><strong>Transfer Learning</strong> is taking a massive, pre-trained AI brain and slightly tweaking it for your own specific problem.</p>
      <div class="analogy-box" style="margin-top:1rem;">
        <h4>🎸 The Guitar to Ukulele Analogy</h4>
        <p>If you already spent 10 years mastering the acoustic guitar, you don't need to start from 'absolute zero' to learn the ukulele. You already know about strings, frets, rhythm, and chords. You just 'transfer' that knowledge and learn the specific ukulele chords in a weekend! <strong>Transfer Learning lets AI do this!</strong></p>
      </div>
    `,
    coreConcept: `
      <p>How to steal a Google Brain:</p>
      <ol style="padding-left:1.5rem; margin-top:1rem;">
        <li><strong>Step 1 (The Base Model):</strong> Download a model (like VGG16 or ResNet) that Google trained on 14 million images for 3 weeks on supercomputers.</li>
        <li><strong>Step 2 (Freeze):</strong> Freeze the 'Base' so you don't accidentally destroy its knowledge of detecting edges and shapes.</li>
        <li><strong>Step 3 (Attach new Head):</strong> Add a brand new output layer (e.g., predicting 'Hotdog' or 'Not Hotdog').</li>
        <li><strong>Step 4 (Fine-Tune):</strong> Train the model for 5 minutes on your laptop. Boom! World-class accuracy!</li>
      </ol>
      <div style="margin-top:1rem; display:flex; gap:1rem;">
        <div style="flex:1; background:rgba(239,68,68,0.1); padding:1rem; border-left:4px solid #ef4444;">
          <strong>Before (Training from Scratch):</strong><br>Training a CNN to detect hotdogs takes 100,000 images and $500 in cloud GPU bills.
        </div>
        <div style="flex:1; background:rgba(16,185,129,0.1); padding:1rem; border-left:4px solid #10b981;">
          <strong>After (Transfer Learning):</strong><br>Using pre-trained MobileNetV2 takes 500 images and trains on a 2015 Macbook in 2 minutes.
        </div>
      </div>
    `,
    realTimeExamples: [
      {
        subTopic: "Custom Image Classification",
        description: "Detecting highly specific items with low data.",
        scenario: "A factory using Transfer Learning to detect microscopic cracks in pipes using only 200 reference photos.",
        industry: "Manufacturing"
      },
      {
        subTopic: "NLP Fine-Tuning",
        description: "Adapting large language models.",
        scenario: "Fine-tuning a massive Open-Source LLM to talk like a specific medical doctor.",
        industry: "Healthcare Software"
      }
    ],
    problemSolving: [
      {
        scenario: "You have only 50 images of diseased plant leaves, and your CNN keeps overfitting.",
        wrong: "Using Data Augmentation to stretch 50 images into 50,000. (The model will still memorize them).",
        correct: "Using Transfer Learning from ResNet50, freezing the base, and training only the final dense layer.",
        steps: "1. Load ResNet50(include_top=False).<br>2. Freeze layers.<br>3. Add Dense(1, activation='sigmoid').<br>4. Train."
      }
    ],
    exercises: {
      beginner: "What is it called when you stop a neural network layer's weights from updating during training?",
      intermediate: "Write the Keras code to load the MobileNetV2 base model without its top classification layer.",
      advanced: "Explain the difference between Feature Extraction and Fine-Tuning in the context of Transfer Learning."
    },
    memoryTricks: `
      <p>🧠 <strong>Memory Trick: 'Don't reinvent the wheel, just change the tires.'</strong></p>
      <p>The base model is the wheel. Your custom output layer is the tires.</p>
    `,
    recap: `
      <ul style="padding-left:1.5rem;">
        <li>Transfer Learning saves massive amounts of time, money, and data.</li>
        <li>You typically freeze the early layers (which detect generic edges/shapes).</li>
        <li>You train a new 'Head' (the final dense layers) on your specific dataset.</li>
        <li>Fine-Tuning is an advanced step where you unfreeze the top layers of the base model and train them at an extremely low learning rate.</li>
      </ul>
    `,
        code: `
from tensorflow.keras.applications import MobileNetV2 # Import a pre-trained Google model
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D

# 1. Load the Pre-Trained Base Model (trained on 14 million images from ImageNet)
# include_top=False means we chop off the final classification layer (the 'head')
base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# 2. FREEZE the base model so we don't destroy its pre-trained knowledge during training
base_model.trainable = False

# 3. Create our custom model by stacking a brand new head on top of the frozen base
model = Sequential([
    # The frozen Google brain (extracts features)
    base_model,
    
    # Pool the features into a 1D vector
    GlobalAveragePooling2D(),
    
    # Add a custom Dense layer
    Dense(128, activation='relu'),
    
    # Add a custom Output layer (e.g., predicting exactly 1 thing: Hotdog vs Not Hotdog)
    Dense(1, activation='sigmoid') 
])

# Print the architecture
model.summary()
    `,
    quiz: [
      {
        question: "When applying Transfer Learning, why do we set `base_model.trainable = False`?",
        options: ["To make the model run in the cloud", "To freeze the pre-trained weights so they aren't destroyed by large gradient updates from our untrained custom head", "To delete the base model from memory", "To change the activation function"],
        answer: 1,
        explanation: "If you don't freeze the base model, the large, random errors from your newly initialized custom head will backpropagate into the base model and destroy the delicate weights it spent weeks learning."
      }
    ]
  }  ,{
    courseType: "DL",
    id: "dl-autoencoders",
    title: "5. Autoencoders",
    category: "Deep Learning",
    difficulty: "Advanced",
    jobHighlight: "AI Research Scientist",
    duration: "35 mins",
    overview: `
      <p><strong>Autoencoders</strong> are neural networks that learn to compress data into a tiny bottleneck, and then decompress it back to the original format.</p>
      <div class="analogy-box" style="margin-top:1rem;">
        <h4>🧳 The Suitcase Packing Analogy</h4>
        <p>Imagine going on a trip. You take 50 shirts and compress them into vacuum-sealed bags to fit into a tiny suitcase (The Encoder). When you arrive at the hotel, you open the bags, and the shirts expand back to their original size (The Decoder). If an autoencoder can successfully compress and decompress an image, it has learned the absolute fundamental 'essence' of that image!</p>
      </div>
    `,
    coreConcept: `
      <p>The Autoencoder Architecture:</p>
      <ol style="padding-left:1.5rem; margin-top:1rem;">
        <li><strong>Encoder:</strong> A network that compresses the input data into a tiny, dense mathematical vector called the 'Latent Space'.</li>
        <li><strong>Bottleneck:</strong> The extremely compressed representation of the data.</li>
        <li><strong>Decoder:</strong> A network that attempts to reconstruct the original data from the tiny bottleneck.</li>
      </ol>
      <div style="margin-top:1rem; display:flex; gap:1rem;">
        <div style="flex:1; background:rgba(239,68,68,0.1); padding:1rem; border-left:4px solid #ef4444;">
          <strong>Before (Standard Compression):</strong><br>Using ZIP files to compress images, which uses strict mathematical algorithms without understanding what the image actually is.
        </div>
        <div style="flex:1; background:rgba(16,185,129,0.1); padding:1rem; border-left:4px solid #10b981;">
          <strong>After (Autoencoders):</strong><br>The AI learns to compress faces by only saving key features (eye distance, skin tone), allowing for intelligent reconstruction and denoising.
        </div>
      </div>
    `,
    realTimeExamples: [
      {
        subTopic: "Image Denoising",
        description: "Removing noise from images.",
        scenario: "Feeding a blurry, grainy nighttime photo into an Autoencoder, and having it output a crystal-clear image.",
        industry: "Photography & Forensics"
      },
      {
        subTopic: "Anomaly Detection",
        description: "Finding things that don't belong.",
        scenario: "A bank trains an autoencoder on normal transactions. When a fraudulent transaction is fed in, the autoencoder fails to reconstruct it properly, raising an alarm!",
        industry: "Banking Security"
      }
    ],
    problemSolving: [
      {
        scenario: "Your factory cameras capture photos of metal parts. You need an AI to flag 'defective' parts, but you only have photos of perfect parts.",
        wrong: "Training a binary classification CNN (You have 0 examples of defective parts to train on, so supervised learning is impossible!).",
        correct: "Train an Autoencoder purely on the perfect parts. If you feed it a defective part later, the 'reconstruction error' will spike, flagging the defect.",
        steps: "1. Train Autoencoder on Perfect Parts.<br>2. Input test part.<br>3. Measure difference between input and output.<br>4. If difference > threshold, flag as Defect!"
      }
    ],
    exercises: {
      beginner: "What is the compressed middle layer of an Autoencoder called?",
      intermediate: "How does an Autoencoder calculate its 'Loss'? (Hint: What is it comparing the output to?)",
      advanced: "Write a Keras script to build a simple Encoder that compresses a 784-pixel image into a 32-neuron bottleneck."
    },
    memoryTricks: `
      <p>🧠 <strong>Memory Trick: 'The Hourglass Shape'</strong></p>
      <p>An autoencoder looks like an hourglass. Wide at the input (Encoder), tiny in the middle (Bottleneck), and wide at the output (Decoder).</p>
    `,
    recap: `
      <ul style="padding-left:1.5rem;">
        <li>Autoencoders are an Unsupervised Learning technique (they don't need labels!).</li>
        <li>They learn by setting the target output to be identical to the input (Output = Input).</li>
        <li>They are incredibly powerful for Denoising (removing grain/static from audio and images).</li>
        <li>They are the secret weapon for Anomaly Detection when you have highly imbalanced datasets.</li>
      </ul>
    `,
        code: `
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense

# The size of our original image (e.g., 28x28 = 784 pixels)
input_dim = 784
# The tiny compressed bottleneck size (compressing 784 pixels down to just 32 numbers!)
encoding_dim = 32

# 1. The Input Layer: Receives the raw 784 pixels
input_img = Input(shape=(input_dim,))

# 2. The ENCODER: Compresses the 784 pixels into a tiny 32-neuron latent space
encoded = Dense(encoding_dim, activation='relu')(input_img)

# 3. The DECODER: Attempts to decompress the 32 numbers back into 784 pixels
decoded = Dense(input_dim, activation='sigmoid')(encoded)

# 4. Build the full Autoencoder Model linking the Input directly to the Decoder
autoencoder = Model(input_img, decoded)

# Compile the model. The 'loss' measures how perfectly the output matches the original input
autoencoder.compile(optimizer='adam', loss='binary_crossentropy')

# Print the blueprint. Notice how the output shape exactly matches the input shape!
autoencoder.summary()
    `,
    quiz: [
      {
        question: "Why are Autoencoders excellent for Anomaly Detection (like detecting credit card fraud)?",
        options: ["Because they use random forests", "Because if you train them only on normal data, they will fail horribly at reconstructing anomalous data, causing a massive spike in error that triggers an alarm", "Because they compress the database size", "Because they use Reinforcement Learning"],
        answer: 1,
        explanation: "An autoencoder trained exclusively on 'normal' patterns learns to recreate those patterns perfectly. When an anomaly is passed through, the decoder doesn't know what to do with it, resulting in a huge reconstruction error."
      }
    ]
  }

  ,
  {
    id: "nlp-text-processing",
    courseType: "NLP",
    title: "1. Text Processing & Tokenization",
    overview: "How AI reads human language by chopping paragraphs into tiny, understandable tokens (words or syllables).<br><br><b>Analogy:</b> Imagine breaking a Lego castle into individual bricks so you can understand what it's made of.",
    coreConcept: `
      Natural Language Processing (NLP) models cannot read English directly. 
      They must convert words into numbers. The first step is <b>Tokenization</b>—splitting text into tokens.
      Then, we apply techniques like <b>Stemming</b> (chopping off word endings) or <b>Lemmatization</b> (finding the dictionary root word).
      <div style="margin-top:20px;" class="univ-sandbox-container">
        <div class="univ-sandbox-header">NLP Tokenization Sandbox</div>
        <div class="univ-nlp-container">
          <input type="text" class="univ-nlp-input" value="The quick brown foxes jump!" disabled>
          <div class="univ-nlp-tokens">
            <span class="univ-nlp-token" style="animation-delay: 0.1s">The <span class="univ-nlp-vector">[01]</span></span>
            <span class="univ-nlp-token" style="animation-delay: 0.3s">quick <span class="univ-nlp-vector">[89]</span></span>
            <span class="univ-nlp-token" style="animation-delay: 0.5s">brown <span class="univ-nlp-vector">[45]</span></span>
            <span class="univ-nlp-token" style="animation-delay: 0.7s">fox <span class="univ-nlp-vector">[root]</span></span>
            <span class="univ-nlp-token" style="animation-delay: 0.9s">jump <span class="univ-nlp-vector">[root]</span></span>
          </div>
        </div>
      </div>
    `,
    realTimeExamples: [
      { subTopic: "Spam Filters", description: "Finding keyword patterns", scenario: "Gmail detecting 'Buy Now' or 'Free'", industry: "Cybersecurity" },
      { subTopic: "Sentiment Analysis", description: "Judging emotion", scenario: "Twitter tracking if product reviews are angry or happy", industry: "Marketing" }
    ],
    math: `
      <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px;">
        <h4>Bag of Words (BoW) Matrix</h4>
        <p>Sentence 1: "I love cats" = [1, 1, 1, 0]<br>Sentence 2: "I love dogs" = [1, 1, 0, 1]</p>
        <p>The matrix simply counts the frequency of words!</p>
      </div>
    `,
    code: `
import nltk # Natural Language Toolkit
from nltk.tokenize import word_tokenize # Function to split sentences into words

# A sample text string from a user
text = "AI is revolutionizing the world!"

# Tokenize the text: chops it into a list of individual words and punctuation
tokens = word_tokenize(text)

# Print the resulting list of tokens
print(tokens) # Output: ['AI', 'is', 'revolutionizing', 'the', 'world', '!']
    `,
    memoryTricks: "<b>Token</b> = A single Ticket. The AI needs a ticket for every single word to enter the brain.",
    recap: "NLP starts by breaking messy human text into clean, mathematical tokens."
  },
  {
    id: "nlp-word-embeddings",
    courseType: "NLP",
    title: "2. Word Embeddings (Word2Vec)",
    overview: "Mapping words into a 3D mathematical space where similar words cluster together.<br><br><b>Analogy:</b> Imagine a huge galaxy where the 'King' star and 'Queen' star are right next to each other, but the 'Apple' star is a million lightyears away.",
    coreConcept: `
      Word embeddings capture the <b>meaning</b> of words. 
      Instead of just assigning a random ID to a word, we assign it an array of numbers (a vector) that represent its coordinates in space.
      If two words often appear in the same sentences (like 'dog' and 'puppy'), their mathematical coordinates will be very close together!
      <br><br>Famous Equation: <code>King - Man + Woman = Queen</code>
    `,
    realTimeExamples: [
      { subTopic: "Search Engines", description: "Semantic Search", scenario: "Googling 'sneakers' also shows 'running shoes'", industry: "E-Commerce" },
      { subTopic: "Recommendation", description: "Content clustering", scenario: "Netflix recommending movies with similar plot descriptions", industry: "Entertainment" }
    ],
    math: `
      <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px;">
        <h4>Vector Similarity (Cosine Similarity)</h4>
        <p>How do we know if two words are similar? We measure the angle between their vectors!</p>
        <p>Angle of 0° = Exact same meaning.<br>Angle of 90° = Totally unrelated.</p>
      </div>
    `,
    code: `
import gensim.downloader as api # Import the Gensim library to load pre-trained embeddings

# Load a massive Google Word2Vec model (trained on Google News)
# Warning: This downloads a very large file!
model = api.load("word2vec-google-news-300")

# Ask the model: "What words are mathematically closest to 'puppy'?"
similar_words = model.most_similar("puppy")

# Print the list of similar words (e.g., 'dog', 'pup', 'kitten')
print(similar_words)
    `,
    memoryTricks: "<b>Embeddings</b> = Embedding a word onto a map. Close map points = similar meanings.",
    recap: "Embeddings turn words into mathematical coordinates so computers can understand context and meaning."
  },
  {
    id: "nlp-transformers",
    courseType: "NLP",
    title: "3. The Transformer Architecture",
    overview: "The revolutionary AI architecture that powers ChatGPT, able to read entire sentences all at once using 'Self-Attention'.<br><br><b>Analogy:</b> Instead of reading a book word-by-word like a human, a Transformer looks at the entire page simultaneously and instantly figures out how every word connects to every other word.",
    coreConcept: `
      Before 2017, AI read text sequentially (one word at a time using RNNs). 
      Google invented the <b>Transformer</b>, which introduced the <b>Attention Mechanism</b>.
      When predicting a word, Attention allows the model to "focus" on the most important words in the surrounding sentence, regardless of how far apart they are.
    `,
    realTimeExamples: [
      { subTopic: "Large Language Models", description: "ChatGPT / Gemini", scenario: "Answering complex questions with perfect grammar", industry: "Every Industry" },
      { subTopic: "Real-time Translation", description: "DeepL / Google Translate", scenario: "Translating full paragraphs without losing the gender or tense context", industry: "Global Communications" }
    ],
    math: `
      <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px;">
        <h4>Attention = Softmax(Q * K.T / sqrt(d)) * V</h4>
        <p>The mathematical heart of modern AI. It compares Queries (what I'm looking for) with Keys (what other words offer) to extract Values (the meaning).</p>
      </div>
    `,
    code: `
from transformers import pipeline # Import Hugging Face's ultra-easy pipeline

# Instantiate a pre-trained Transformer model specifically for Sentiment Analysis
# This downloads a tiny BERT-based model automatically
classifier = pipeline('sentiment-analysis')

# Ask the Transformer to analyze a sentence
result = classifier('I absolutely loved the new Batman movie, the cinematography was stunning!')

# Print the output (e.g., [{'label': 'POSITIVE', 'score': 0.99}])
print(result)
    `,
    memoryTricks: "<b>Attention</b> = Just like you pay 'Attention' to specific keywords when skimming an article, the AI assigns attention weights to important words.",
    recap: "Transformers process language in parallel using Self-Attention, making them incredibly fast and the backbone of modern Generative AI."
  },
  {
    id: "cv-image-processing",
    courseType: "CV",
    title: "1. Image Processing & Filters",
    overview: "Using math to manipulate pixels to detect edges, blur backgrounds, or enhance colors.<br><br><b>Analogy:</b> Instagram filters on steroids. We slide a mathematical magnifying glass over an image to change how it looks.",
    coreConcept: `
      Images to a computer are just massive 2D grids of numbers (0-255).
      <b>Convolution</b> is the process of sliding a small grid of numbers (called a Kernel or Filter) over the image. 
      If we use an Edge Detection kernel, we multiply the pixels to highlight sharp changes in color (which represent physical edges of objects).
      <div style="margin-top:20px;" class="univ-sandbox-container">
        <div class="univ-sandbox-header">Convolution Sandbox</div>
        <div class="univ-cv-canvas">
          <div class="univ-cv-filter" style="animation: slideFilter 4s infinite linear;"></div>
          <!-- 100 pixels generated by CSS grid -->
          ${Array(100).fill('<div class="univ-cv-pixel" onmouseover="this.classList.toggle(\'active\')"></div>').join('')}
        </div>
        <style>
          @keyframes slideFilter {
            0% { top: 0; left: 0; }
            25% { top: 0; left: 140px; }
            50% { top: 140px; left: 140px; }
            75% { top: 140px; left: 0; }
            100% { top: 0; left: 0; }
          }
        </style>
      </div>
    `,
    realTimeExamples: [
      { subTopic: "Medical Imaging", description: "Enhancing X-Rays", scenario: "Applying contrast filters to highlight tumors in MRI scans", industry: "Healthcare" },
      { subTopic: "Self-Driving Cars", description: "Lane detection", scenario: "Using edge-detection to find the white lines on the road", industry: "Automotive" }
    ],
    math: `
      <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px;">
        <h4>Sobel Edge Detection</h4>
        <p>A matrix of [-1, 0, 1] detects vertical lines by subtracting the left pixel from the right pixel. If the colors are identical, the result is 0 (pitch black). If there's a sharp contrast, the result is high (bright white edge!).</p>
      </div>
    `,
    code: `
import cv2 # Import OpenCV, the standard library for Computer Vision
import matplotlib.pyplot as plt # Import plotting library to show the image

# 1. Read an image from the computer (assuming 'cat.jpg' exists)
image = cv2.imread('cat.jpg')

# 2. Convert the image from BGR (Blue-Green-Red) to Grayscale (Black & White)
# Grayscale is easier to process because it's only 1 channel instead of 3
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# 3. Apply the Canny Edge Detection algorithm!
# Any pixel gradient between 100 and 200 is considered a solid 'edge'
edges = cv2.Canny(gray_image, 100, 200)

# Display the resulting neon-like edges
plt.imshow(edges, cmap='gray')
plt.show()
    `,
    memoryTricks: "<b>Kernel</b> = A popcorn kernel hopping across the image, popping out new pixel colors.",
    recap: "Image processing uses math (kernels) to manipulate pixel arrays, serving as the foundational step before feeding images into Deep Learning."
  },
  {
    id: "cv-object-detection",
    courseType: "CV",
    title: "2. Object Detection (YOLO)",
    overview: "Teaching AI not just 'what' is in the image, but 'where' it is by drawing bounding boxes.<br><br><b>Analogy:</b> Playing 'Where's Waldo?', but the AI can instantly point to Waldo, a dog, and a bicycle all in 10 milliseconds.",
    coreConcept: `
      Image Classification just says "This is a dog picture."
      <b>Object Detection</b> finds the exact X and Y coordinates of the dog and draws a box around it.
      Modern algorithms like <b>YOLO (You Only Look Once)</b> split the image into a grid and predict bounding boxes for every grid cell simultaneously, making it fast enough for real-time video!
    `,
    realTimeExamples: [
      { subTopic: "Retail Security", description: "Shoplifting detection", scenario: "Tracking customers' hands crossing shelf boundaries in Amazon Go stores", industry: "Retail" },
      { subTopic: "Traffic Cameras", description: "Smart Cities", scenario: "Counting the number of cars vs buses at an intersection", industry: "Urban Planning" }
    ],
    math: `
      <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px;">
        <h4>Intersection over Union (IoU)</h4>
        <p>How do we score the AI's bounding box? We divide the Area of Overlap (between the AI's box and the true box) by the Area of Union. A score of 1.0 means perfect alignment!</p>
      </div>
    `,
    code: `
# Import the ultralytics library, which contains the YOLOv8 models
from ultralytics import YOLO

# 1. Load a pre-trained YOLOv8 Nano model (super lightweight and fast)
model = YOLO('yolov8n.pt') 

# 2. Ask the model to analyze an image ('street.jpg')
# It will automatically find all cars, people, traffic lights, etc.
results = model('street.jpg')

# 3. For every single bounding box it found in the first image...
for box in results[0].boxes:
    # Print the confidence score (e.g., 0.95 = 95% sure it's a person)
    print("Confidence:", box.conf)
    # Print the coordinates of the box [x_min, y_min, x_max, y_max]
    print("Coordinates:", box.xyxy)

# Automatically show the image with the beautiful boxes drawn on it!
results[0].show()
    `,
    memoryTricks: "<b>YOLO</b> = You Only Look Once. Unlike older models that scanned images 100 times, YOLO does the math in a single sweep.",
    recap: "Object detection locates multiple items in an image using bounding boxes, powered by blazing-fast algorithms like YOLO."
  },
  {
    id: "genai-gans",
    courseType: "GENAI",
    title: "1. Generative Adversarial Networks (GANs)",
    overview: "Two AI networks battling each other: one tries to forge fake images, and the other plays the detective trying to catch the fakes.<br><br><b>Analogy:</b> An Art Forger (Generator) trying to paint fake Monas Lisas, and a Police Detective (Discriminator) trying to spot the fakes. They both get better over time until the forgeries are flawless.",
    coreConcept: `
      A GAN is composed of two Neural Networks competing:
      <ol>
        <li><b>The Generator:</b> Starts with pure random noise and tries to mathematically craft an image (e.g., a human face).</li>
        <li><b>The Discriminator:</b> Looks at real human faces and the Generator's fake faces, and guesses which is which.</li>
      </ol>
      As they battle, the Generator learns to create hyper-realistic images that completely fool the Discriminator. This is how Deepfakes were born.
    `,
    realTimeExamples: [
      { subTopic: "Deepfakes", description: "Face swapping", scenario: "De-aging actors in Hollywood movies", industry: "Film" },
      { subTopic: "Video Game Assets", description: "Texture generation", scenario: "Generating infinite realistic landscapes and alien textures", industry: "Gaming" }
    ],
    math: `
      <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px;">
        <h4>Minimax Loss Game</h4>
        <p>The Generator tries to MINIMIZE the Discriminator's accuracy, while the Discriminator tries to MAXIMIZE its own accuracy. It is a mathematical tug-of-war!</p>
      </div>
    `,
    code: `
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LeakyReLU

# 1. Build the FORGER (Generator)
generator = Sequential([
    # Takes in 100 random numbers (noise)
    Dense(128, input_shape=(100,)), 
    LeakyReLU(alpha=0.2), # Special activation function
    # Outputs 784 pixels (a 28x28 image)
    Dense(784, activation='tanh') 
])

# 2. Build the DETECTIVE (Discriminator)
discriminator = Sequential([
    # Takes in 784 pixels (the generated image or a real image)
    Dense(128, input_shape=(784,)),
    LeakyReLU(alpha=0.2),
    # Outputs exactly 1 number: Probability of being FAKE (0) or REAL (1)
    Dense(1, activation='sigmoid') 
])

# Print the architectures
generator.summary()
discriminator.summary()
    `,
    memoryTricks: "<b>Adversarial</b> = Adversaries or Enemies fighting. The networks learn by fighting each other.",
    recap: "GANs pit two neural networks against each other to generate hyper-realistic synthetic data, from faces to voices."
  },
  {
    id: "genai-diffusion",
    courseType: "GENAI",
    title: "2. Diffusion Models (Midjourney / DALL-E)",
    overview: "The magic behind modern AI art. It destroys images by adding TV static, then learns to reverse the process to sculpt masterpieces out of pure static.<br><br><b>Analogy:</b> Imagine dropping a drop of ink in water and watching it diffuse. Now imagine an AI so smart it can watch the cloudy water and perfectly pull the ink back out into a drop.",
    coreConcept: `
      GANs are unstable. Today, we use <b>Diffusion</b>.
      <b>Forward Process:</b> We take a beautiful image and slowly add mathematical noise (static) step-by-step until it is 100% pure noise.
      <b>Reverse Process:</b> We train a U-Net neural network to remove the noise step-by-step. 
      Once trained, we can give the AI pure random static, give it a text prompt like 'Astronaut on a horse', and it will 'denoise' the static into that exact picture!
    `,
    realTimeExamples: [
      { subTopic: "Concept Art", description: "Midjourney / Stable Diffusion", scenario: "Architects generating futuristic building concepts in seconds", industry: "Design" },
      { subTopic: "Marketing", description: "Ad generation", scenario: "Generating infinite product backgrounds without photoshoots", industry: "Advertising" }
    ],
    math: `
      <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px;">
        <h4>Markov Chain Noise</h4>
        <p>In each step (t), the image x(t) is created by adding a tiny fraction of Gaussian noise to the previous image x(t-1).</p>
      </div>
    `,
    code: `
from diffusers import StableDiffusionPipeline # Import Hugging Face Diffusers library
import torch # Import PyTorch, the engine running the model

# 1. Download and load the massive Stable Diffusion model into memory
# (Requires a very powerful GPU in reality!)
pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5", torch_dtype=torch.float16)
pipe = pipe.to("cuda") # Move the model to the Graphics Card

# 2. Define the creative text prompt
prompt = "A highly detailed cyberpunk city skyline at sunset, neon lights, 4k"

# 3. Generate the image! The AI sculpts the image out of noise
image = pipe(prompt).images[0]

# 4. Save the generated masterpiece to your hard drive
image.save("cyberpunk_city.png")
    `,
    memoryTricks: "<b>Diffusion</b> = Like mist diffusing. We add mist to a photo until it's gone, then learn to clear the mist.",
    recap: "Diffusion models generate state-of-the-art images by learning to reverse the process of adding noise to pictures."
  },
  {
    id: "genai-llms",
    courseType: "GENAI",
    title: "3. Large Language Models (LLMs)",
    overview: "The ultimate autocorrect. Massive neural networks that have read the entire internet and simply predict the most logical next word.<br><br><b>Analogy:</b> An insanely smart smartphone autocomplete. If you type 'The sky is', it has read a trillion books and knows the next word should probably be 'blue'.",
    coreConcept: `
      Models like GPT-4 or Claude 3 are built on the Transformer architecture.
      They are trained on massive datasets (Petabytes of text) with hundreds of billions of parameters (synapses).
      Their only mathematical goal during training is <b>Next-Token Prediction</b>. 
      Because they must perfectly predict the next word in Wikipedia articles, coding forums, and biology textbooks, they end up accidentally learning reasoning, logic, and coding!
    `,
    realTimeExamples: [
      { subTopic: "Coding Assistants", description: "GitHub Copilot", scenario: "Writing an entire Python app based on a single comment", industry: "Software Engineering" },
      { subTopic: "Customer Support", description: "AI Agents", scenario: "Resolving complex billing issues without human intervention", industry: "Customer Service" }
    ],
    math: `
      <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px;">
        <h4>Temperature</h4>
        <p>A math variable controlling creativity. Temperature = 0 means the AI always picks the highest probability word (boring, factual). Temperature = 1.0 means it rolls the dice and picks slightly lower probability words (creative, hallucinations).</p>
      </div>
    `,
    code: `
import openai # Import the OpenAI API library
import os

# 1. Securely set your API key (your password to access the supercomputer)
openai.api_key = os.getenv("OPENAI_API_KEY")

# 2. Send a request to the GPT-4 API
response = openai.ChatCompletion.create(
    model="gpt-4", # Specify the model version
    messages=[
        # Define the AI's persona
        {"role": "system", "content": "You are a helpful programming tutor."},
        # Define the user's actual prompt
        {"role": "user", "content": "Explain what a variable is in 1 sentence."}
    ],
    temperature=0.7 # Set creativity to 70%
)

# 3. Extract and print the text from the massive JSON response object
print("AI Says:", response.choices[0].message['content'])
    `,
    memoryTricks: "<b>LLM</b> = Large (Billions of parameters), Language (Reads text), Model (Mathematical brain).",
    recap: "LLMs are massive next-word-prediction engines that have developed reasoning capabilities due to their sheer scale."
  }

];

