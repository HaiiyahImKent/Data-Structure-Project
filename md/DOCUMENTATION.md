# AlgoVisual - Data Structures Visualizer

## 📚 Comprehensive System Documentation

> **Version:** 1.0.0  
> **Last Updated:** December 2, 2025  
> **Author:** Software Engineer  
> **License:** MIT

---

## 📋 Table of Contents

1. [About the System](#about-the-system)
2. [Objectives](#objectives)
3. [Tech Stack](#tech-stack)
4. [System Architecture](#system-architecture)
5. [Folder Structure](#folder-structure)
6. [Core Features](#core-features)
7. [State Management](#state-management)
8. [Data Flow](#data-flow)
9. [Performance & Scalability](#performance--scalability)
10. [Usage Examples](#usage-examples)
11. [API Reference](#api-reference)
12. [Future Roadmap](#future-roadmap)

---

## 🎯 About the System

**AlgoVisual** is a production-grade, interactive web application designed to teach fundamental data structures through immersive visualizations and step-by-step animations. Built with modern web technologies, it provides an intuitive learning experience for students, educators, and developers preparing for technical interviews.

### Problem Statement

Understanding data structures through static textbook diagrams or code alone can be challenging. Learners often struggle to visualize how operations like insertion, deletion, and traversal affect the underlying structure in real-time.

### Solution

AlgoVisual bridges this gap by providing:

-   **Real-time animated visualizations** of 8 core data structures
-   **Step-by-step algorithm execution** with playback controls
-   **Time complexity analysis** for each operation
-   **Interactive quiz mode** for self-assessment
-   **Code snippets** for practical implementation reference

---

## 🎯 Objectives

### Primary Objectives

| Objective                    | Description                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------ |
| **Educational Excellence**   | Provide clear, animated visualizations that make abstract concepts tangible    |
| **Interactive Learning**     | Enable hands-on manipulation of data structures with immediate visual feedback |
| **Complexity Understanding** | Display Big-O notation for every operation to build algorithmic thinking       |
| **Self-Assessment**          | Offer quiz functionality to test and reinforce knowledge                       |

### Secondary Objectives

-   Deliver a responsive, accessible UI that works on all devices
-   Maintain high performance with smooth 60fps animations
-   Support dark mode for extended learning sessions
-   Provide extensible architecture for adding new data structures

---

## 🛠️ Tech Stack

### Frontend Framework

| Technology     | Version | Purpose                                                       |
| -------------- | ------- | ------------------------------------------------------------- |
| **React**      | 18.3    | Component-based UI library with hooks and concurrent features |
| **TypeScript** | 5.3+    | Static type checking for robust, maintainable code            |
| **Vite**       | 5.0     | Next-generation build tool with HMR and optimized bundling    |

### Styling & Animation

| Technology                | Version | Purpose                                              |
| ------------------------- | ------- | ---------------------------------------------------- |
| **Tailwind CSS**          | 3.4     | Utility-first CSS framework for rapid UI development |
| **Framer Motion**         | 10.16   | Production-ready animation library for React         |
| **clsx + tailwind-merge** | 2.0+    | Dynamic class name composition utilities             |

### State Management & Routing

| Technology           | Version | Purpose                                    |
| -------------------- | ------- | ------------------------------------------ |
| **Zustand**          | 4.4     | Lightweight, flexible state management     |
| **React Router DOM** | 6.20    | Declarative routing for React applications |

### Development Tools

| Technology                 | Purpose                                        |
| -------------------------- | ---------------------------------------------- |
| **ESLint**                 | Code linting and quality enforcement           |
| **PostCSS + Autoprefixer** | CSS processing and cross-browser compatibility |
| **Lucide React**           | Beautiful, consistent icon set                 |

### Dependency Graph

```
┌──────────────────────────────────────────────────────────────┐
│                         ALGOVISUAL                           │
├──────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │
│  │   React     │  │  Zustand    │  │   React Router      │   │
│  │   18.3      │  │   4.4       │  │       6.20          │   │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘   │
│         │                │                    │              │
│         ▼                ▼                    ▼              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Component Layer (TSX/JSX)                 │  │
│  └────────────────────────────────────────────────────────┘  │
│         │                                                    │
│         ▼                                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │
│  │ Tailwind    │  │   Framer    │  │   Lucide Icons      │   │
│  │   CSS 3.4   │  │  Motion     │  │                     │   │
│  └─────────────┘  └─────────────┘  └─────────────────────┘   │
│         │                │                    │              │
│         ▼                ▼                    ▼              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                  Vite Build System                     │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER INTERFACE                             │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────────────┐ │
│  │  Navbar   │  │   Pages   │  │ Visualizers│  │   Components     │ │
│  └───────────┘  └───────────┘  └───────────┘  └───────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         STATE MANAGEMENT                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │
│  │ visualizationStore│  │dataStructureStores│  │   themeStore     │  │
│  │   - operations   │  │  - arrayStore    │  │   - darkMode      │  │
│  │   - animation    │  │  - stackStore    │  │   - theme toggle  │  │
│  │   - playback     │  │  - queueStore    │  │                   │  │
│  │   - algorithm    │  │  - hashTableStore│  │                   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          UTILITIES                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │
│  │   helpers.ts    │  │  complexity.ts  │  │ algorithmSteps.ts  │  │
│  │  - generateData │  │  - O(n) calc    │  │  - step generation │  │
│  │  - sleep        │  │  - formatters   │  │  - action tracking │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           DATA LAYER                                │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                     structures.ts                            │   │
│  │   - DataStructureInfo definitions                            │   │
│  │   - Complexity metadata                                      │   │
│  │   - Real-world use cases                                     │   │
│  │   - Code snippets                                            │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
App.tsx
├── BrowserRouter
│   ├── Navbar (global navigation)
│   ├── Routes
│   │   ├── "/" → HomePage
│   │   │   ├── Hero Section
│   │   │   ├── Category Filter
│   │   │   ├── StructureCard[] (8 cards)
│   │   │   └── Documentation Section
│   │   │
│   │   ├── "/learn/:structureId" → LearnPage
│   │   │   ├── Structure Details
│   │   │   ├── Code Snippets
│   │   │   └── Real-World Examples
│   │   │
│   │   ├── "/visualize/:structureId" → VisualizePage
│   │   │   ├── Input Controls
│   │   │   ├── Visualizer Component
│   │   │   ├── PlaybackControls
│   │   │   ├── ComplexityTable
│   │   │   ├── AlgorithmStepsDisplay
│   │   │   └── OperationLog
│   │   │
│   │   └── "/quiz/:structureId" → QuizPage
│   │       ├── Question Display
│   │       ├── Answer Options
│   │       └── Score Tracker
│   │
│   └── Footer (global footer)
```

### Visualizer Components

Each data structure has a dedicated visualizer:

| Visualizer             | Data Structure  | Visual Representation          |
| ---------------------- | --------------- | ------------------------------ |
| `ArrayVisualizer`      | Array           | Horizontal blocks with indices |
| `StackVisualizer`      | Stack           | Vertical cards (LIFO)          |
| `QueueVisualizer`      | Queue           | Horizontal flow (FIFO)         |
| `LinkedListVisualizer` | Linked List     | Nodes with pointer arrows      |
| `TreeVisualizer`       | Binary Tree/BST | Hierarchical node layout       |
| `GraphVisualizer`      | Graph           | Nodes with edge connections    |
| `HashTableVisualizer`  | Hash Table      | Key-value bucket visualization |
| `HeapVisualizer`       | Heap            | Tree-based priority structure  |

---

## 📁 Folder Structure

```
data-structures-proj/
│
├── 📄 index.html                 # Entry HTML file
├── 📄 package.json               # Dependencies and scripts
├── 📄 tsconfig.json              # TypeScript configuration
├── 📄 vite.config.ts             # Vite build configuration
├── 📄 tailwind.config.js         # Tailwind CSS configuration
├── 📄 postcss.config.js          # PostCSS plugins
├── 📄 eslint.config.js           # ESLint rules
│
├── 📁 public/                    # Static assets
│   └── (favicon, images, etc.)
│
└── 📁 src/                       # Source code
    │
    ├── 📄 App.tsx                # Root component with routing
    ├── 📄 main.tsx               # Application entry point
    ├── 📄 vite-env.d.ts          # Vite type declarations
    │
    ├── 📁 components/            # Reusable UI components
    │   ├── 📄 AlgorithmStepsDisplay.tsx  # Step-by-step algorithm viewer
    │   ├── 📄 ComplexityTable.tsx        # O(n) complexity display
    │   ├── 📄 Footer.tsx                 # Global footer
    │   ├── 📄 Navbar.tsx                 # Navigation bar
    │   ├── 📄 OperationLog.tsx           # Operation history log
    │   ├── 📄 PlaybackControls.tsx       # Animation controls
    │   └── 📄 StructureCard.tsx          # Data structure card
    │
    ├── 📁 pages/                 # Page-level components
    │   ├── 📄 HomePage.tsx       # Landing page with structure grid
    │   ├── 📄 LearnPage.tsx      # Educational content page
    │   ├── 📄 VisualizePage.tsx  # Interactive visualization page
    │   └── 📄 QuizPage.tsx       # Quiz/assessment page
    │
    ├── 📁 visualizers/           # Data structure visualizers
    │   ├── 📄 ArrayVisualizer.tsx
    │   ├── 📄 StackVisualizer.tsx
    │   ├── 📄 QueueVisualizer.tsx
    │   ├── 📄 LinkedListVisualizer.tsx
    │   ├── 📄 TreeVisualizer.tsx
    │   ├── 📄 GraphVisualizer.tsx
    │   ├── 📄 HashTableVisualizer.tsx
    │   └── 📄 HeapVisualizer.tsx
    │
    ├── 📁 store/                 # Zustand state management
    │   ├── 📄 visualizationStore.ts    # Animation & playback state
    │   ├── 📄 dataStructureStores.ts   # Per-structure data stores
    │   └── 📄 themeStore.ts            # Dark/light mode state
    │
    ├── 📁 data/                  # Static data definitions
    │   └── 📄 structures.ts      # Data structure metadata
    │
    ├── 📁 utils/                 # Utility functions
    │   ├── 📄 helpers.ts         # Random generators, sleep, etc.
    │   ├── 📄 complexity.ts      # Complexity calculation/formatting
    │   └── 📄 algorithmSteps.ts  # Step-by-step algorithm definitions
    │
    └── 📁 styles/                # Global styles
        └── 📄 globals.css        # Tailwind imports & custom CSS
```

---

## ⚡ Core Features

### 1. Interactive Visualizations

Each data structure features a dedicated visualizer with:

-   **Animated operations**: Watch insert, delete, and search in real-time
-   **Color-coded states**: Highlighted (blue), active (green), default (gray)
-   **Responsive layout**: Adapts to container size
-   **Hover interactions**: Scale effects on elements

```tsx
// Example: ArrayVisualizer rendering
<motion.div
	animate={{
		backgroundColor:
			highlightedIndex === index
				? "rgb(59, 130, 246)" // Blue - highlighted
				: activeIndices.includes(index)
				? "rgb(34, 197, 94)" // Green - active
				: "rgb(100, 116, 139)", // Gray - default
	}}
	className="w-12 h-12 rounded-lg flex items-center justify-center"
>
	{item}
</motion.div>
```

### 2. Playback Controls

Full control over animation playback:

| Control     | Function                  |
| ----------- | ------------------------- |
| ▶️ Play     | Start/resume animation    |
| ⏸️ Pause    | Pause current animation   |
| 🔄 Reset    | Clear algorithm steps     |
| ⏮️ Previous | Step backward             |
| ⏭️ Next     | Step forward              |
| ↩️ Undo     | Revert last operation     |
| ↪️ Redo     | Re-apply undone operation |
| ⚡ Speed    | Adjust 0.5x - 2x          |

### 3. Algorithm Step Tracking

Real-time step-by-step execution display:

```typescript
interface AlgorithmStep {
	action: string; // "Initialize", "Compare", "Swap", etc.
	description: string; // Human-readable explanation
	highlightedIndices?: number[];
	highlightedValues?: number[];
	activeIndex?: number;
	status: "in-progress" | "completed" | "pending";
	newValue?: number;
}
```

### 4. Complexity Analysis

Automatic Big-O complexity display:

| Operation | Array | Stack | Queue | Linked List | BST      | Hash Table | Heap     |
| --------- | ----- | ----- | ----- | ----------- | -------- | ---------- | -------- |
| Access    | O(1)  | O(1)  | O(n)  | O(n)        | O(log n) | O(1)       | O(1)     |
| Search    | O(n)  | O(n)  | O(n)  | O(n)        | O(log n) | O(1)       | O(n)     |
| Insertion | O(n)  | O(1)  | O(1)  | O(1)        | O(log n) | O(1)       | O(log n) |
| Deletion  | O(n)  | O(1)  | O(1)  | O(1)        | O(log n) | O(1)       | O(log n) |

### 5. Operation Logging

Track all performed operations with timestamps:

```typescript
interface OperationLog {
	id: string;
	operation: string; // "push", "pop", "insert", etc.
	timestamp: number;
	value?: OperationValue;
	duration?: number;
	complexity?: string; // "O(1)", "O(n)", etc.
}
```

---

## 🗄️ State Management

### Zustand Store Architecture

AlgoVisual uses Zustand for lightweight, performant state management:

```typescript
// visualizationStore.ts - Core animation state
export const useVisualization = create<VisualizationStore>((set, get) => ({
	// State
	operations: [],
	isAnimating: false,
	animationSpeed: 1,
	algorithmSteps: [],
	currentStepIndex: 0,
	history: [[]],
	historyIndex: 0,

	// Actions
	addOperation: (operation) =>
		set((state) => ({
			operations: [...state.operations, operation],
			history: [...state.history.slice(0, state.historyIndex + 1), newOperations],
			historyIndex: state.historyIndex + 1,
		})),

	setAnimating: (animating) => set({ isAnimating: animating }),
	setAnimationSpeed: (speed) => set({ animationSpeed: Math.max(0.5, Math.min(2, speed)) }),
	nextStep: () => {
		/* advance step index */
	},
	previousStep: () => {
		/* decrement step index */
	},
	undoLastOperation: () => {
		/* revert to previous history */
	},
	redoLastOperation: () => {
		/* advance to next history */
	},
}));
```

### Store Separation

| Store                 | Purpose              | Key State                                      |
| --------------------- | -------------------- | ---------------------------------------------- |
| `visualizationStore`  | Animation & playback | `isAnimating`, `algorithmSteps`, `operations`  |
| `dataStructureStores` | Per-structure data   | `arrayItems`, `stackItems`, `queueItems`, etc. |
| `themeStore`          | UI theming           | `isDarkMode`, `toggleTheme()`                  |

---

## 🔄 Data Flow

### Operation Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER ACTION                              │
│                  (Click "Add" / "Remove")                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    handleAdd / handleRemove                      │
│  1. Validate input                                              │
│  2. Generate algorithm steps                                    │
│  3. Set animating = true                                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    runAlgorithmAnimation                        │
│  1. Iterate through steps                                       │
│  2. Update currentStepIndex                                     │
│  3. sleep(delay / animationSpeed)                               │
│  4. Update visual highlights                                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    UPDATE DATA STRUCTURE                        │
│  - Modify array/stack/queue/etc.                                │
│  - Log operation to operationLog                                │
│  - Calculate complexity                                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VISUALIZER RE-RENDER                         │
│  - Framer Motion animates changes                               │
│  - Highlighted indices update                                   │
│  - AlgorithmStepsDisplay shows progress                         │
└─────────────────────────────────────────────────────────────────┘
```

### Example: Stack Push Operation

```typescript
// 1. User clicks "Push" with value 42
handleAdd();

// 2. Generate algorithm steps
const steps = getStackPushSteps(42, currentItems);
// Returns:
// [
//   { action: "Initialize", description: "Prepare to push 42...", status: "in-progress" },
//   { action: "Add to Top", description: "Add 42 to the top...", status: "pending" },
//   { action: "Complete", description: "Successfully pushed 42", status: "pending" }
// ]

// 3. Run animation
visualization.setAlgorithmSteps(steps);
await runAlgorithmAnimation();

// 4. Update state
setStackItems([...stackItems, 42]);

// 5. Log operation
visualization.addOperation({
	id: crypto.randomUUID(),
	operation: "push",
	value: 42,
	timestamp: Date.now(),
	complexity: "O(1)",
});
```

---

## 🚀 Performance & Scalability

### Performance Optimizations

| Optimization                   | Implementation               | Impact                          |
| ------------------------------ | ---------------------------- | ------------------------------- |
| **Code Splitting**             | React.lazy() for all pages   | Reduced initial bundle by ~60%  |
| **Memoization**                | useCallback for handlers     | Prevents unnecessary re-renders |
| **CSS-in-JS Avoidance**        | Tailwind utility classes     | Zero runtime CSS overhead       |
| **Animation GPU Acceleration** | Framer Motion transforms     | Smooth 60fps animations         |
| **Minimal Re-renders**         | Zustand's shallow comparison | Only affected components update |

### Lazy Loading Strategy

```tsx
// App.tsx - Route-based code splitting
const HomePage = lazy(() => import("@pages/HomePage"));
const LearnPage = lazy(() => import("@pages/LearnPage"));
const VisualizePage = lazy(() => import("@pages/VisualizePage"));
const QuizPage = lazy(() => import("@pages/QuizPage"));
```

### Bundle Analysis

```
Build Output (Production):
────────────────────────────────
dist/assets/
├── index-[hash].js      ~45KB (gzipped)
├── HomePage-[hash].js   ~12KB (gzipped)
├── VisualizePage-[hash].js ~28KB (gzipped)
├── LearnPage-[hash].js  ~8KB (gzipped)
├── QuizPage-[hash].js   ~6KB (gzipped)
└── index-[hash].css     ~8KB (gzipped)

Total: ~107KB gzipped (first load)
```

### Scalability Considerations

| Aspect                   | Current Implementation | Scaling Strategy                                |
| ------------------------ | ---------------------- | ----------------------------------------------- |
| **New Data Structures**  | 8 visualizers          | Modular visualizer pattern - add new components |
| **Large Datasets**       | Up to ~100 elements    | Virtual scrolling for 1000+ elements            |
| **Multiple Users**       | Client-only            | Add backend API for persistence/sharing         |
| **Mobile Performance**   | CSS animations         | Reduce animation complexity on mobile           |
| **Internationalization** | English only           | i18n library integration ready                  |

### Memory Management

```typescript
// Cleanup on unmount to prevent memory leaks
useEffect(() => {
	return () => {
		visualization.clearAlgorithmSteps();
		visualization.clearOperations();
	};
}, [structureId]);
```

---

## 💡 Usage Examples

### Example 1: Visualizing a Stack Push Operation

```tsx
// Navigate to /visualize/stack

// 1. Enter a value (e.g., 42) in the input field
// 2. Click the "Push" button
// 3. Watch the step-by-step animation:
//    - Step 1: "Initialize" - Prepare to push value
//    - Step 2: "Add to Top" - Element appears at top
//    - Step 3: "Complete" - Operation finished

// The visualization shows:
// ┌─────────┐
// │   42    │  ← New element (highlighted blue)
// ├─────────┤
// │   30    │
// ├─────────┤
// │   20    │
// ├─────────┤
// │   10    │
// └─────────┘
```

### Example 2: Binary Search Tree Insertion

```tsx
// Navigate to /visualize/tree

// Insert sequence: 50, 30, 70, 20, 40, 60, 80

// Resulting visualization:
//           ┌───────┐
//           │  50   │
//           └───┬───┘
//        ┌──────┴──────┐
//    ┌───┴───┐     ┌───┴───┐
//    │  30   │     │  70   │
//    └───┬───┘     └───┬───┘
//   ┌────┴────┐   ┌────┴────┐
// ┌─┴─┐   ┌─┴─┐ ┌─┴─┐   ┌─┴─┐
// │20 │   │40 │ │60 │   │80 │
// └───┘   └───┘ └───┘   └───┘

// Each insertion shows:
// - Path traversal (nodes light up)
// - Comparison at each node
// - Final placement with animation
```

### Example 3: Queue Operations

```tsx
// Navigate to /visualize/queue

// Enqueue: 10, 20, 30
// Dequeue: removes 10 (FIFO)

// Visualization:
// Front                              Rear
//   ↓                                  ↓
// ┌────┐    ┌────┐    ┌────┐    ┌────┐
// │ 10 │ ─→ │ 20 │ ─→ │ 30 │ ─→ │    │
// └────┘    └────┘    └────┘    └────┘
//   ▲
//   └── Dequeue removes this element

// After dequeue:
// Front              Rear
//   ↓                  ↓
// ┌────┐    ┌────┐    ┌────┐
// │ 20 │ ─→ │ 30 │ ─→ │    │
// └────┘    └────┘    └────┘
```

### Example 4: Using Playback Controls

```tsx
// After performing an operation:

// 1. Adjust speed slider to 0.5x for slow-motion
// 2. Use Step buttons to manually control:
//    ⏮️ Previous Step - Go back one step
//    ⏭️ Next Step - Advance one step
// 3. Use Undo/Redo for operation history:
//    ↩️ Undo - Revert the last operation
//    ↪️ Redo - Re-apply an undone operation
// 4. Reset clears all steps and returns to initial state
```

---

## 📖 API Reference

### Data Structure Store Interface

```typescript
interface ArrayStore {
	items: number[];
	setItems: (items: number[]) => void;
	addItem: (item: number) => void;
	removeItem: (index: number) => void;
	clearItems: () => void;
}

interface StackStore {
	items: number[];
	push: (item: number) => void;
	pop: () => number | undefined;
	peek: () => number | undefined;
	clear: () => void;
}

interface QueueStore {
	items: number[];
	enqueue: (item: number) => void;
	dequeue: () => number | undefined;
	front: () => number | undefined;
	clear: () => void;
}

interface HashTableStore {
	entries: Map<string, number>;
	set: (key: string, value: number) => void;
	get: (key: string) => number | undefined;
	remove: (key: string) => boolean;
	clear: () => void;
}
```

### Visualization Store Interface

```typescript
interface VisualizationStore {
	// State
	operations: OperationLog[];
	isAnimating: boolean;
	animationSpeed: number;
	algorithmSteps: AlgorithmStep[];
	currentStepIndex: number;
	history: OperationLog[][];
	historyIndex: number;

	// Actions
	addOperation: (operation: OperationLog) => void;
	clearOperations: () => void;
	setAnimating: (animating: boolean) => void;
	setAnimationSpeed: (speed: number) => void;
	setAlgorithmSteps: (steps: AlgorithmStep[]) => void;
	setCurrentStepIndex: (index: number) => void;
	clearAlgorithmSteps: () => void;
	nextStep: () => void;
	previousStep: () => void;
	undoLastOperation: () => void;
	redoLastOperation: () => void;
}
```

### Helper Functions

```typescript
// Generate random array
function generateRandomArray(size: number, min: number, max: number): number[];

// Generate graph data
function generateGraphData(nodeCount: number): {
	nodes: GraphNodeData[];
	edges: GraphEdgeData[];
};

// Generate tree data
function generateTreeData(nodeCount: number): TreeNodeData;

// Async delay
function sleep(ms: number): Promise<void>;
```

---

## 🔮 Future Roadmap

### Phase 1: Enhanced Features (Q1 2026)

-   [ ] Add more data structures (Trie, AVL Tree, Red-Black Tree)
-   [ ] Implement sorting algorithm visualizations
-   [ ] Add search algorithm animations (BFS, DFS, Dijkstra)
-   [ ] Mobile-optimized touch controls

### Phase 2: Learning Enhancements (Q2 2026)

-   [ ] Video tutorials integration
-   [ ] Guided learning paths
-   [ ] Achievement/badge system
-   [ ] Export visualizations as GIF/video

### Phase 3: Collaboration (Q3 2026)

-   [ ] User accounts and progress tracking
-   [ ] Shareable visualization links
-   [ ] Classroom/educator mode
-   [ ] Custom data structure builder

### Phase 4: Advanced Features (Q4 2026)

-   [ ] Real-time collaboration
-   [ ] AI-powered learning assistant
-   [ ] Performance benchmarking tools
-   [ ] Plugin system for custom visualizers

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

-   **React Team** - For the incredible UI library
-   **Framer Motion** - For butter-smooth animations
-   **Tailwind CSS** - For utility-first styling
-   **Zustand** - For elegant state management
-   **Vite** - For blazing-fast development experience

---

<div align="center">

**Built with ❤️ by a passionate Software Engineer**

_Making data structures fun, one animation at a time._

</div>
