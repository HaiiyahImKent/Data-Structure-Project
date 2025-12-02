import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Zap, TrendingUp, Clock, Database } from "lucide-react";
export default function DocsPage() {
    const sections = [
        {
            id: "array",
            title: "Array",
            icon: "📦",
            description: "A contiguous collection of elements indexed by position.",
            complexity: { access: "O(1)", search: "O(n)", insert: "O(n)", delete: "O(n)" },
            features: [
                "Random access in constant time",
                "Cache-friendly memory layout",
                "Fixed or dynamic size (depending on language)",
            ],
        },
        {
            id: "stack",
            title: "Stack",
            icon: "📚",
            description: "LIFO (Last In First Out) structure for managing nested operations.",
            complexity: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
            features: [
                "Push and pop at the top",
                "Used in function call stacks",
                "Essential for undo/redo systems",
            ],
        },
        {
            id: "queue",
            title: "Queue",
            icon: "🚦",
            description: "FIFO (First In First Out) structure for ordered processing.",
            complexity: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
            features: [
                "Enqueue at rear, dequeue at front",
                "Critical for task scheduling",
                "Foundation for BFS algorithms",
            ],
        },
        {
            id: "linked-list",
            title: "Linked List",
            icon: "🔗",
            description: "Chain of nodes where each points to the next.",
            complexity: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
            features: [
                "Dynamic size without reallocation",
                "Efficient insertion/deletion at known positions",
                "Extra memory for pointers",
            ],
        },
        {
            id: "tree",
            title: "Binary Search Tree",
            icon: "🌳",
            description: "Hierarchical structure maintaining sorted property.",
            complexity: {
                access: "O(log n) avg",
                search: "O(log n) avg",
                insert: "O(log n) avg",
                delete: "O(log n) avg",
            },
            features: [
                "Enables fast searching in sorted data",
                "Foundation for databases and file systems",
                "Can degrade to O(n) if unbalanced",
            ],
        },
        {
            id: "graph",
            title: "Graph",
            icon: "🕸️",
            description: "Nodes connected by edges, representing relationships.",
            complexity: { access: "O(V+E)", search: "O(V+E)", insert: "O(1)", delete: "O(1)" },
            features: [
                "Models networks, social graphs, maps",
                "Supports directed and undirected edges",
                "Enables traversal (DFS, BFS) algorithms",
            ],
        },
        {
            id: "heap",
            title: "Heap",
            icon: "📊",
            description: "Complete binary tree satisfying heap property.",
            complexity: { access: "O(1)", search: "O(n)", insert: "O(log n)", delete: "O(log n)" },
            features: [
                "Min/Max heap variants",
                "Efficient priority queue implementation",
                "Powers heap sort algorithm",
            ],
        },
        {
            id: "hash-table",
            title: "Hash Table",
            icon: "🔑",
            description: "Key-value store using hash function for fast lookup.",
            complexity: {
                access: "O(1) avg",
                search: "O(1) avg",
                insert: "O(1) avg",
                delete: "O(1) avg",
            },
            features: [
                "Near-constant time operations (on average)",
                "Collision resolution strategies",
                "Foundation for dictionaries and maps",
            ],
        },
    ];
    return (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900", children: [_jsx("section", { className: "container mx-auto px-4 py-20", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "text-center max-w-3xl mx-auto mb-16", children: [_jsx("h1", { className: "text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent", children: "Operations Reference" }), _jsx("p", { className: "text-xl text-slate-300", children: "Deep-dive documentation on all data structures: complexities, operations, and real-world applications." })] }) }), _jsx("section", { className: "bg-slate-900/50 border-y border-slate-700/50 py-12", children: _jsx("div", { className: "container mx-auto px-4", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [
                            { label: "Access", icon: _jsx(Zap, { size: 20 }), color: "text-yellow-400" },
                            {
                                label: "Search",
                                icon: _jsx(TrendingUp, { size: 20 }),
                                color: "text-blue-400",
                            },
                            {
                                label: "Insert",
                                icon: _jsx(Database, { size: 20 }),
                                color: "text-green-400",
                            },
                            { label: "Delete", icon: _jsx(Clock, { size: 20 }), color: "text-red-400" },
                        ].map((op, i) => (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.1 }, className: "text-center", children: [_jsx("div", { className: `flex justify-center mb-2 ${op.color}`, children: op.icon }), _jsx("p", { className: "font-semibold text-slate-200", children: op.label })] }, i))) }) }) }), _jsx("section", { className: "container mx-auto px-4 py-20", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: sections.map((structure, i) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.05 }, className: "card-base p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/40 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer", children: [_jsx("div", { className: "text-4xl mb-3", children: structure.icon }), _jsx("h3", { className: "text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors", children: structure.title }), _jsx("p", { className: "text-sm text-slate-400 mb-4", children: structure.description }), _jsxs("div", { className: "bg-slate-900/50 rounded p-3 mb-4 space-y-1 text-xs", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-400", children: "Access:" }), _jsx("span", { className: "text-yellow-400 font-mono font-bold", children: structure.complexity.access })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-400", children: "Search:" }), _jsx("span", { className: "text-blue-400 font-mono font-bold", children: structure.complexity.search })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-400", children: "Insert:" }), _jsx("span", { className: "text-green-400 font-mono font-bold", children: structure.complexity.insert })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-400", children: "Delete:" }), _jsx("span", { className: "text-red-400 font-mono font-bold", children: structure.complexity.delete })] })] }), _jsx("ul", { className: "space-y-2 text-xs text-slate-300", children: structure.features.map((feature, j) => (_jsxs("li", { className: "flex gap-2", children: [_jsx("span", { className: "text-cyan-400", children: "\u25B8" }), _jsx("span", { children: feature })] }, j))) })] }, structure.id))) }) }), _jsx("section", { className: "bg-slate-900/50 border-y border-slate-700/50 py-20", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold mb-2", children: "Performance Comparison" }), _jsx("p", { className: "text-slate-400", children: "Compare time complexities across all structures at a glance." })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-700", children: [_jsx("th", { className: "text-left p-4 font-bold text-blue-400", children: "Structure" }), _jsx("th", { className: "text-center p-4 font-bold text-yellow-400", children: "Access" }), _jsx("th", { className: "text-center p-4 font-bold text-blue-400", children: "Search" }), _jsx("th", { className: "text-center p-4 font-bold text-green-400", children: "Insert" }), _jsx("th", { className: "text-center p-4 font-bold text-red-400", children: "Delete" }), _jsx("th", { className: "text-center p-4 font-bold text-purple-400", children: "Space" })] }) }), _jsx("tbody", { children: [
                                            {
                                                name: "Array",
                                                access: "O(1)",
                                                search: "O(n)",
                                                insert: "O(n)",
                                                delete: "O(n)",
                                                space: "O(n)",
                                            },
                                            {
                                                name: "Stack",
                                                access: "O(n)",
                                                search: "O(n)",
                                                insert: "O(1)",
                                                delete: "O(1)",
                                                space: "O(n)",
                                            },
                                            {
                                                name: "Queue",
                                                access: "O(n)",
                                                search: "O(n)",
                                                insert: "O(1)",
                                                delete: "O(1)",
                                                space: "O(n)",
                                            },
                                            {
                                                name: "Linked List",
                                                access: "O(n)",
                                                search: "O(n)",
                                                insert: "O(1)*",
                                                delete: "O(1)*",
                                                space: "O(n)",
                                            },
                                            {
                                                name: "BST",
                                                access: "O(log n)",
                                                search: "O(log n)",
                                                insert: "O(log n)",
                                                delete: "O(log n)",
                                                space: "O(n)",
                                            },
                                            {
                                                name: "Hash Table",
                                                access: "O(1)*",
                                                search: "O(1)*",
                                                insert: "O(1)*",
                                                delete: "O(1)*",
                                                space: "O(n)",
                                            },
                                            {
                                                name: "Heap",
                                                access: "O(1)",
                                                search: "O(n)",
                                                insert: "O(log n)",
                                                delete: "O(log n)",
                                                space: "O(n)",
                                            },
                                            {
                                                name: "Graph",
                                                access: "O(V)",
                                                search: "O(V+E)",
                                                insert: "O(1)",
                                                delete: "O(1)",
                                                space: "O(V+E)",
                                            },
                                        ].map((row, i) => (_jsxs("tr", { className: "border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors", children: [_jsx("td", { className: "text-left p-4 font-semibold", children: row.name }), _jsx("td", { className: "text-center p-4 text-yellow-400 font-mono", children: row.access }), _jsx("td", { className: "text-center p-4 text-blue-400 font-mono", children: row.search }), _jsx("td", { className: "text-center p-4 text-green-400 font-mono", children: row.insert }), _jsx("td", { className: "text-center p-4 text-red-400 font-mono", children: row.delete }), _jsx("td", { className: "text-center p-4 text-purple-400 font-mono", children: row.space })] }, i))) })] }) }), _jsx("p", { className: "text-xs text-slate-400 mt-4", children: "* Average case. Worst case may be O(n) due to collisions or unbalanced structures." })] }) }), _jsxs("section", { className: "container mx-auto px-4 py-20", children: [_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-2", children: "When to Use Each Structure" }), _jsx("p", { className: "text-slate-400", children: "Choose the right tool for your problem." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
                            {
                                title: "Use Array When",
                                items: [
                                    "You need fast indexed access",
                                    "Memory is limited (contiguous)",
                                    "Data is fixed-size or rarely changes",
                                ],
                            },
                            {
                                title: "Use Stack When",
                                items: [
                                    "Building undo/redo systems",
                                    "Parsing expressions (brackets matching)",
                                    "Depth-first search (DFS)",
                                ],
                            },
                            {
                                title: "Use Queue When",
                                items: [
                                    "Breadth-first search (BFS)",
                                    "Task scheduling",
                                    "Producer-consumer patterns",
                                ],
                            },
                            {
                                title: "Use Linked List When",
                                items: [
                                    "Frequent insertions/deletions",
                                    "Don't know size in advance",
                                    "Don't need random access",
                                ],
                            },
                            {
                                title: "Use BST When",
                                items: ["Need sorted access", "Frequent searches", "Database indexing"],
                            },
                            {
                                title: "Use Hash Table When",
                                items: [
                                    "Fast average-case lookup",
                                    "Key-value mappings",
                                    "Caching and memoization",
                                ],
                            },
                            {
                                title: "Use Heap When",
                                items: [
                                    "Priority queue needed",
                                    "Finding min/max efficiently",
                                    "Heap sort algorithm",
                                ],
                            },
                            {
                                title: "Use Graph When",
                                items: [
                                    "Modeling networks/relationships",
                                    "Finding shortest paths",
                                    "Social networks and maps",
                                ],
                            },
                        ].map((section, i) => (_jsxs(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: i * 0.05 }, className: "card-base p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50", children: [_jsx("h3", { className: "text-lg font-bold mb-4 text-green-400", children: section.title }), _jsx("ul", { className: "space-y-3", children: section.items.map((item, j) => (_jsxs("li", { className: "flex gap-2 text-slate-300", children: [_jsx("span", { className: "text-green-400 flex-shrink-0", children: "\u2713" }), _jsx("span", { children: item })] }, j))) })] }, i))) })] })] }));
}
