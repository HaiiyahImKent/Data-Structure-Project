import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Play, RotateCcw, Volume2, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
export default function ExplorePage() {
    const features = [
        {
            icon: _jsx(Play, { size: 32 }),
            title: "Playback Controls",
            description: "Play and pause animations at your own pace. Watch each operation unfold step-by-step.",
            color: "text-green-400",
        },
        {
            icon: _jsx(Zap, { size: 32 }),
            title: "Speed Control",
            description: "Adjust animation speed from 0.5x to 2x. Fast-forward complex operations or slow down to learn details.",
            color: "text-yellow-400",
        },
        {
            icon: _jsx(RotateCcw, { size: 32 }),
            title: "Reset & Undo",
            description: "Reset to initial state or undo the last operation. Experiment risk-free without losing your data.",
            color: "text-blue-400",
        },
        {
            icon: _jsx(Volume2, { size: 32 }),
            title: "Algorithm Steps",
            description: "Follow along with detailed step-by-step breakdowns of every operation. Understand the 'how' and 'why'.",
            color: "text-purple-400",
        },
        {
            icon: _jsx(TrendingUp, { size: 32 }),
            title: "Complexity Analysis",
            description: "View time & space complexity for each operation. Compare performance across different data structures.",
            color: "text-red-400",
        },
        {
            icon: _jsx(Volume2, { size: 32 }),
            title: "Operation Logs",
            description: "Track every operation you perform. See a history of actions with timestamps and complexity info.",
            color: "text-cyan-400",
        },
    ];
    const tutorials = [
        {
            structure: "Array",
            icon: "📦",
            description: "Master fundamental indexing, insertion, and searching. See how arrays organize data in memory.",
            path: "/visualize/array",
        },
        {
            structure: "Stack",
            icon: "📚",
            description: "Learn LIFO principles. Explore undo/redo, expression parsing, and call stacks.",
            path: "/visualize/stack",
        },
        {
            structure: "Queue",
            icon: "🚦",
            description: "Understand FIFO behavior. Watch BFS traversal and task scheduling in action.",
            path: "/visualize/queue",
        },
        {
            structure: "Linked List",
            icon: "🔗",
            description: "See how nodes connect. Experience dynamic insertion and deletion without reallocation.",
            path: "/visualize/linked-list",
        },
        {
            structure: "Binary Tree",
            icon: "🌳",
            description: "Navigate hierarchical structures. Visualize tree traversals and the power of sorted data.",
            path: "/visualize/tree",
        },
        {
            structure: "Graph",
            icon: "🕸️",
            description: "Model networks and relationships. Run DFS and BFS on connected components.",
            path: "/visualize/graph",
        },
        {
            structure: "Heap",
            icon: "📊",
            description: "Explore priority queues. See min/max extraction and heap properties in real-time.",
            path: "/visualize/heap",
        },
        {
            structure: "Hash Table",
            icon: "🔑",
            description: "Understand hashing and collision resolution. Achieve near-constant lookup times.",
            path: "/visualize/hash-table",
        },
    ];
    const tips = [
        {
            title: "Start with the Visualizer",
            description: "Jump straight into hands-on learning. Add elements, remove them, and watch the magic happen.",
        },
        {
            title: "Pause and Analyze",
            description: "When things move fast, hit pause. Study each step carefully before moving to the next one.",
        },
        {
            title: "Compare Operations",
            description: "Insert into an Array vs. a Linked List. See why some structures excel at certain tasks.",
        },
        {
            title: "Check the Logs",
            description: "Every action is tracked. The Operation Log shows what happened, when, and why it matters.",
        },
        {
            title: "Use Random Data",
            description: "Generate random data to see how structures behave with diverse input patterns.",
        },
        {
            title: "Read Descriptions",
            description: "Each algorithm step includes a human-readable description. Understand not just what, but why.",
        },
    ];
    return (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900", children: [_jsx("section", { className: "container mx-auto px-4 py-20", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-3xl mx-auto mb-16", children: [_jsx("h1", { className: "text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent", children: "Visualization Controls & Features" }), _jsx("p", { className: "text-xl text-slate-300", children: "Learn to harness the power of AlgoVisual's interactive tools. Master controls, understand animations, and deep-dive into algorithms." })] }) }), _jsxs("section", { className: "container mx-auto px-4 py-20", children: [_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-2", children: "Core Features" }), _jsx("p", { className: "text-slate-400", children: "Everything you need to visualize, control, and understand data structures." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature, i) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 }, className: "card-base p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/40 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group", children: [_jsx("div", { className: `mb-4 ${feature.color} group-hover:scale-110 transition-transform duration-300`, children: feature.icon }), _jsx("h3", { className: "text-xl font-bold mb-3", children: feature.title }), _jsx("p", { className: "text-slate-300 leading-relaxed", children: feature.description })] }, i))) })] }), _jsx("section", { className: "bg-slate-900/50 border-y border-slate-700/50 py-20", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-2", children: "Interactive Guide" }), _jsx("p", { className: "text-slate-400", children: "See each control in action. Click on a structure to explore." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: tutorials.map((tutorial, i) => (_jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: i * 0.06 }, className: "group relative", children: _jsx(Link, { to: tutorial.path, className: "block h-full", children: _jsxs("div", { className: "card-base p-6 h-full bg-gradient-to-br from-slate-800/50 to-slate-900/40 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform group-hover:scale-105", children: [_jsx("div", { className: "text-5xl mb-3", children: tutorial.icon }), _jsx("h3", { className: "text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors", children: tutorial.structure }), _jsx("p", { className: "text-sm text-slate-400", children: tutorial.description }), _jsx("div", { className: "mt-4 text-blue-400 text-sm font-semibold group-hover:translate-x-1 transition-transform", children: "Explore \u2192" })] }) }) }, tutorial.structure))) })] }) }), _jsxs("section", { className: "container mx-auto px-4 py-20", children: [_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-2", children: "Pro Tips & Tricks" }), _jsx("p", { className: "text-slate-400", children: "Get the most out of your learning experience." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: tips.map((tip, i) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: i * 0.08 }, className: "card-base p-6 bg-gradient-to-r from-slate-800/40 to-slate-900/40 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300", children: [_jsx("h3", { className: "text-lg font-bold mb-3 text-cyan-400", children: tip.title }), _jsx("p", { className: "text-slate-300", children: tip.description })] }, i))) })] }), _jsx("section", { className: "bg-slate-900/50 border-y border-slate-700/50 py-20", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "max-w-2xl", children: [_jsx("h2", { className: "text-3xl font-bold mb-4", children: "Advanced Topics" }), _jsx("div", { className: "space-y-6", children: [
                                    {
                                        title: "Understanding Time Complexity",
                                        description: "Each operation displays its time complexity. Learn why O(1) is faster than O(n) and how Big O notation guides your choices.",
                                    },
                                    {
                                        title: "Space Complexity Trade-offs",
                                        description: "See how different structures use memory. Understand the balance between speed and space when choosing a data structure.",
                                    },
                                    {
                                        title: "Algorithm Animations",
                                        description: "Watch real-time animations of complex algorithms. See how elements move, sort, and reorganize during operations.",
                                    },
                                    {
                                        title: "Step-by-Step Breakdowns",
                                        description: "Pause and analyze each step. Hover over operations to see detailed descriptions of what's happening under the hood.",
                                    },
                                ].map((topic, i) => (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: i * 0.1 }, className: "p-6 bg-slate-800/40 border border-slate-700/50 rounded-lg hover:border-purple-500/50 transition-all duration-300", children: [_jsx("h3", { className: "text-lg font-bold mb-2 text-purple-400", children: topic.title }), _jsx("p", { className: "text-slate-300", children: topic.description })] }, i))) })] }) }) }), _jsx("section", { className: "container mx-auto px-4 py-20 text-center", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.3 }, children: [_jsx("h2", { className: "text-3xl font-bold mb-4", children: "Ready to Explore?" }), _jsx("p", { className: "text-slate-400 mb-8 max-w-2xl mx-auto", children: "Pick a data structure and dive in. Experiment, learn, and master the fundamentals through hands-on visualization." }), _jsxs(Link, { to: "/learn/array", className: "inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-lg shadow-lg shadow-blue-500/50 transition-all duration-300 transform hover:scale-105", children: ["Start Exploring ", _jsx(Play, { size: 20 })] })] }) })] }));
}
