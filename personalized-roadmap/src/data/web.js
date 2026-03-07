export const webCurriculum = {
  title: "Full Stack Web Architecture",
  totalModules: 25,
  phases: [
    {
      phaseNumber: 1,
      title: "The Anatomy of the Web",
      modules: [
        { id: "w1", title: "The Client-Server Architecture", desc: "Understand what happens when you type a URL. Master the Client-Server model.", type: "standard", resources: ["Docs", "Diagrams"] },
        { id: "w2", title: "HTML5: The Skeleton", desc: "Learn to write semantic markup to structure your web pages for browsers.", type: "standard", resources: ["Minigame", "Docs"] },
        { id: "w3", title: "CSS3: The Beauty", desc: "Add styling, colors, and layouts to turn a boring HTML skeleton into a beautiful interface.", type: "standard", resources: ["Minigame", "Docs"] }
      ]
    },
    {
      phaseNumber: 2,
      title: "The Core JavaScript Engine",
      modules: [
        { id: "w4", title: "Variables & The Temporal Dead Zone", desc: "Dive into let, const, hoisting, and the invisible rules of JS memory.", type: "standard", resources: ["Docs", "Diagrams"] },
        { id: "w5", title: "Operators & Type Coercion", desc: "Master strict equality and the weird quirks of JS where adding a string and a number yields wild results.", type: "standard", resources: ["Minigame", "Docs"] },
        { id: "w6", title: "Control Flow", desc: "Master the 'if/else' brain of your app. Learn switch cases and early returns.", type: "standard", resources: ["Docs"] },
        { id: "w7", title: "The Loop Engine", desc: "Automate repetitive tasks using For, While, and Do-While loops.", type: "standard", resources: ["Lab", "Docs"] },
        { id: "w8", title: "Function Architecture", desc: "Understand standard declarations, arrow functions, and IIFEs.", type: "standard", resources: ["Docs"] },
        { id: "w9", title: "Scopes & Closures", desc: "The hardest concept in JS. Learn how functions remember the variables around them.", type: "standard", resources: ["Diagrams", "Docs"] },
        { id: "w10", title: "Arrays & High-Order Methods", desc: "Manipulate data lists like a senior engineer using map, filter, and reduce.", type: "standard", resources: ["Minigame", "Docs"] },
        { id: "w11", title: "Object Mastery", desc: "Store complex data, use the 'this' keyword, and learn deep cloning.", type: "standard", resources: ["Docs"] },
        { id: "w12", title: "The Logic Engine Exam", desc: "BRIDGE EXAM: Prove your mastery of core JavaScript logic before moving to UI frameworks.", type: "bridge", resources: ["Exam"] }
      ]
    },
    {
      phaseNumber: 3,
      title: "The React Ecosystem",
      modules: [
        { id: "w13", title: "React 19 & The Virtual DOM", desc: "Why is React so popular? Learn how it updates the UI at lightning speed.", type: "standard", resources: ["Docs", "Diagrams"] },
        { id: "w14", title: "State Management & Hooks", desc: "The memory of React. Learn how components remember things without crashing.", type: "standard", resources: ["Minigame", "Docs"] },
        { id: "w15", title: "Component Architecture", desc: "Break your UI down into reusable Lego blocks and pass data seamlessly using props.", type: "standard", resources: ["Docs"] },
        { id: "w16", title: "Styling at Speed", desc: "Use Tailwind CSS v4 to style a beautiful dashboard in record time.", type: "standard", resources: ["Docs", "Lab"] }
      ]
    },
    {
      phaseNumber: 4,
      title: "Full-Stack Integration",
      modules: [
        { id: "w17", title: "Backend-as-a-Service", desc: "Set up Appwrite to give your app a professional, scalable backend instantly.", type: "standard", resources: ["Docs"] },
        { id: "w18", title: "User Authentication", desc: "Implement secure passwordless OTP login so users can have private accounts.", type: "standard", resources: ["Docs", "Diagrams"] },
        { id: "w19", title: "Database Design", desc: "Design a schema and relate users to their files securely.", type: "standard", resources: ["Docs"] },
        { id: "w20", title: "Frontend-Backend Sync", desc: "Connect your React UI directly to your cloud database for live data mutations.", type: "standard", resources: ["Minigame", "Docs"] },
        { id: "w21", title: "The Full-Stack Exam", desc: "BRIDGE EXAM: Test your knowledge of React rendering and cloud database management.", type: "bridge", resources: ["Exam"] }
      ]
    },
    {
      phaseNumber: 5,
      title: "Enterprise Architecture",
      modules: [
        { id: "w22", title: "Next.js 15 & SSR", desc: "Level up React with Server-Side Rendering to make your apps load instantly.", type: "standard", resources: ["Docs", "Diagrams"] },
        { id: "w23", title: "Server Actions", desc: "Write secure backend code directly inside your frontend components.", type: "standard", resources: ["Docs"] },
        { id: "w24", title: "Production Error Tracking", desc: "Integrate Sentry to automatically catch and report bugs before your users see them.", type: "standard", resources: ["Docs"] },
        { id: "w25", title: "Deployment Operations", desc: "FINAL OPERATION: Deploy your AI-powered Travel Agency SaaS to the internet.", type: "bridge", resources: ["Final Project"] }
      ]
    }
  ]
};
