// src/curriculum.js

export const CURRICULUM_DATA = {
  web: {
    title: "Full Stack Development",
    steps: [
      // PHASE 1
      { title: "HTML5 Semantic Architecture", description: "Mastering the DOM, SEO-friendly structures, and accessibility standards." },
      { title: "CSS3 & Responsive Design", description: "Flexbox, Grid, Media Queries, and mobile-first methodologies." },
      { title: "JavaScript Core (ES6+)", description: "Variables, Hoisting, Closures, and Asynchronous programming." },
      { title: "Git & Version Control", description: "Branching strategies, Pull Requests, and collaborative workflows." },
      { title: "Package Managers & Tooling", description: "NPM, Yarn, Webpack, and Vite configuration." },
      // PHASE 2
      { title: "Frontend Frameworks (React/Vue)", description: "Component lifecycles, Hooks, and Virtual DOM rendering." },
      { title: "State Management", description: "Redux, Pinia, or Context API for complex data flows." },
      { title: "REST API Design", description: "HTTP methods, status codes, and endpoint architecture." },
      { title: "Node.js & Express Runtime", description: "Building scalable server-side applications and middleware." },
      { title: "Relational Databases (SQL)", description: "PostgreSQL schema design, indexing, and complex joins." },
      // PHASE 3
      { title: "NoSQL & Document Stores", description: "MongoDB aggregation pipelines and schema-less design." },
      { title: "Authentication & Security", description: "JWT, OAuth2, Session management, and OWASP protection." },
      { title: "Testing Methodologies", description: "Unit (Jest), Integration, and E2E (Cypress) testing." },
      { title: "CI/CD Pipelines", description: "Automating deployment with GitHub Actions and Docker." },
      { title: "Cloud Architecture (AWS)", description: "EC2, S3, Lambda, and serverless infrastructure design." }
    ]
  },
  cyber: {
    title: "Cyber Security Ops",
    steps: [
      // PHASE 1
      { title: "Computer Networking", description: "TCP/IP, OSI Model, Subnetting, and packet analysis." },
      { title: "Linux Administration", description: "Bash scripting, permissions, and kernel manipulation." },
      { title: "Windows Internals", description: "Registry, Active Directory, and PowerShell scripting." },
      { title: "Python for Security", description: "Automating reconnaissance and writing custom exploits." },
      { title: "Cryptography Basics", description: "Symmetric/Asymmetric encryption, Hashing, and PKI." },
      // PHASE 2
      { title: "Reconnaissance (OSINT)", description: "Passive gathering, Shodan, and footprinting targets." },
      { title: "Scanning & Enumeration", description: "Nmap, Wireshark, and identifying service vulnerabilities." },
      { title: "Web App Hacking", description: "SQLi, XSS, CSRF, and Burp Suite mastery." },
      { title: "Network Exploitation", description: "Metasploit, buffer overflows, and privilege escalation." },
      { title: "Wireless Security", description: "Cracking WPA2, Aircrack-ng, and Evil Twin attacks." },
      // PHASE 3
      { title: "Active Directory Attacks", description: "Kerberoasting, Golden Ticket, and lateral movement." },
      { title: "Cloud Security (Azure/AWS)", description: "Misconfigurations, IAM escalation, and container escapes." },
      { title: "Malware Analysis", description: "Reverse engineering binaries with Ghidra and IDA Pro." },
      { title: "Incident Response", description: "Digital forensics, log analysis, and containment strategies." },
      { title: "Red Team Operations", description: "Full-scope simulated APT campaigns and reporting." }
    ]
  },
  ai: {
    title: "AI & Data Science",
    steps: [
      // PHASE 1
      { title: "Python Advanced Syntax", description: "Decorators, Generators, and Memory Management in Python." },
      { title: "Linear Algebra & Calculus", description: "The mathematics behind gradient descent and vectors." },
      { title: "NumPy & Scientific Computing", description: "High-performance array manipulation and broadcasting." },
      { title: "Data Wrangling (Pandas)", description: "Cleaning, merging, and reshaping messy datasets." },
      { title: "Data Visualization", description: "Storytelling with Matplotlib, Seaborn, and Plotly." },
      // PHASE 2
      { title: "Statistical Analysis", description: "Hypothesis testing, distributions, and A/B testing logic." },
      { title: "Supervised Learning", description: "Regression, Decision Trees, and Random Forests." },
      { title: "Unsupervised Learning", description: "K-Means Clustering, PCA, and anomaly detection." },
      { title: "Model Evaluation", description: "Cross-validation, ROC-AUC, and hyperparameter tuning." },
      { title: "Feature Engineering", description: "Encoding, scaling, and creating synthetic features." },
      // PHASE 3
      { title: "Neural Networks (PyTorch)", description: "Building perceptrons, backpropagation, and activation functions." },
      { title: "Computer Vision (CNNs)", description: "Image classification, object detection (YOLO), and segmentation." },
      { title: "NLP & Transformers", description: "Tokenization, Embeddings, BERT, and GPT architectures." },
      { title: "LLM Engineering", description: "Fine-tuning, RAG (Retrieval Augmented Generation), and LangChain." },
      { title: "MLOps & Deployment", description: "Serving models via FastAPI, Docker, and monitoring drift." }
    ]
  },
  game: {
    title: "Game Engineering",
    steps: [
      // PHASE 1
      { title: "C# Programming Patterns", description: "OOP, Singletons, Observers, and Event systems." },
      { title: "Unity Interface Mastery", description: "Scene view, Inspector, and managing Assets." },
      { title: "Game Physics 101", description: "Rigidbodies, Colliders, and gravity manipulation." },
      { title: "Input Systems", description: "Handling Keyboard, Mouse, and Gamepad controllers." },
      { title: "UI & UX Design", description: "Canvas scaler, Anchors, Health bars, and Menus." },
      // PHASE 2
      { title: "3D Math & Vectors", description: "Dot products, Cross products, and Quaternions." },
      { title: "Animation State Machines", description: "Blend trees, rigging, and inverse kinematics." },
      { title: "AI & Navigation", description: "NavMesh, Pathfinding, and Enemy behavior trees." },
      { title: "Audio Systems", description: "Spatial sound, Mixers, and adaptive music logic." },
      { title: "Particle Systems (VFX)", description: "Creating fire, smoke, magic, and explosions." },
      // PHASE 3
      { title: "Save/Load Systems", description: "JSON serialization, PlayerPrefs, and binary data." },
      { title: "Multiplayer (Netcode)", description: "Client-side prediction, Server logic, and Lag compensation." },
      { title: "Mobile Optimization", description: "Draw calls, Texture atlasing, and memory management." },
      { title: "Shader Graph", description: "Creating custom water, dissolve effects, and lighting." },
      { title: "Publishing & Monetization", description: "App Store guidelines, Ads, and Analytics integration." }
    ]
  }
}
