export const pythonNodes = [
  // --- MODULE 1: BEGINNER (Placement Test Score < 3) ---
  { 
    id: '1', 
    type: 'input', 
    label: '🐍 Python Basics', 
    position: { x: 250, y: 0 }, 
    class: 'node-beginner' 
  },
  { 
    id: '2', 
    label: 'Variables & Types', 
    position: { x: 100, y: 100 }, 
    class: 'node-beginner' 
  },
  { 
    id: '3', 
    label: 'Control Flow (If/Else)', 
    position: { x: 400, y: 100 }, 
    class: 'node-beginner' 
  },

  // --- MODULE 2: INTERMEDIATE (Placement Test Score 3-4) ---
  { 
    id: '4', 
    label: '📦 Data Structures', 
    position: { x: 250, y: 200 }, 
    class: 'node-intermediate' 
  },
  { 
    id: '5', 
    label: 'Functions & Loops', 
    position: { x: 250, y: 300 }, 
    class: 'node-intermediate' 
  },

  // --- MODULE 3: ADVANCED (Placement Test Score 5) ---
  { 
    id: '6', 
    type: 'output', 
    label: '🤖 AI & Automation', 
    position: { x: 250, y: 450 }, 
    class: 'node-advanced' 
  }
];

// The Lines Connecting Them
export const pythonEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-6', source: '5', target: '6' }
];

