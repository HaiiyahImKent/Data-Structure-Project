import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { DATA_STRUCTURES } from "@data/structures";
import StructureCard from "@components/StructureCard";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const categories = [
        { id: "all", label: "All Structures" },
        { id: "linear", label: "Linear" },
        { id: "tree", label: "Trees" },
        { id: "graph", label: "Graphs" },
        { id: "hash", label: "Hash" },
    ];
    const getCategoryId = (id) => {
        if (id === "array" || id === "stack" || id === "queue" || id === "linked-list")
            return "linear";
        if (id === "tree")
            return "tree";
        if (id === "graph")
            return "graph";
        if (id === "hash-table" || id === "heap")
            return "hash";
        return "all";
    };
    const filteredStructures = selectedCategory === "all"
        ? DATA_STRUCTURES
        : DATA_STRUCTURES.filter((ds) => getCategoryId(ds.id) === selectedCategory);
    return (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "min-h-screen", children: [_jsxs("section", { className: "relative overflow-hidden py-20", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-blue-500/10 via-slate-900 to-slate-900" }), _jsxs("div", { className: "container mx-auto px-4 relative z-10", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "text-center max-w-3xl mx-auto mb-12", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 mb-4", children: [_jsx(Sparkles, { className: "text-yellow-400" }), _jsx("span", { className: "badge", children: "Learn Data Structures" }), _jsx(Sparkles, { className: "text-yellow-400" })] }), _jsx("h1", { className: "text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent", children: "AlgoVisual" }), _jsx("p", { className: "text-xl text-slate-300 mb-8", children: "Master fundamental data structures through interactive visualizations, step-by-step animations, and hands-on learning" }), _jsxs("div", { className: "flex gap-4 justify-center flex-wrap", children: [_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "btn-primary text-lg px-8 py-3", children: "Start Learning" }), _jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "btn-secondary text-lg px-8 py-3", children: "Documentation" })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
                                    { label: "8+ Data Structures", value: "Complete Coverage" },
                                    { label: "50+ Algorithms", value: "Step-by-Step" },
                                    { label: "Interactive", value: "Real-Time Viz" },
                                ].map((stat, idx) => (_jsxs(motion.div, { whileHover: { scale: 1.02 }, className: "card-base text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-400", children: stat.label }), _jsx("div", { className: "text-slate-400 text-sm", children: stat.value })] }, idx))) })] })] }), _jsx("section", { className: "container mx-auto px-4 py-8", children: _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.3 }, className: "flex gap-2 justify-center flex-wrap", children: categories.map((cat) => (_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => setSelectedCategory(cat.id), className: `px-6 py-2 rounded-full font-semibold transition ${selectedCategory === cat.id
                            ? "btn-primary"
                            : "btn-secondary hover:bg-slate-600"}`, children: cat.label }, cat.id))) }) }), _jsxs("section", { className: "container mx-auto px-4 py-12", children: [_jsx(motion.h2, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-3xl font-bold mb-8 text-center", children: "Data Structures" }), _jsx(motion.div, { layout: true, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredStructures.map((structure, idx) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: idx * 0.05 }, children: _jsx(StructureCard, { structure: structure, onLearnClick: () => navigate(`/learn/${structure.id}`), onVisualizeClick: () => navigate(`/visualize/${structure.id}`), onQuizClick: () => navigate(`/quiz/${structure.id}`) }) }, structure.id))) })] }), _jsx("section", { className: "py-16 border-t border-slate-700/50", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsx(motion.h2, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-3xl font-bold mb-12 text-center", children: "Why AlgoVisual?" }), _jsx(motion.div, { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
                                {
                                    icon: "🎨",
                                    title: "Visual Learning",
                                    desc: "See data structures in action with beautiful animations",
                                },
                                {
                                    icon: "⚡",
                                    title: "Interactive",
                                    desc: "Control the pace and operations with intuitive controls",
                                },
                                {
                                    icon: "📊",
                                    title: "Complexity Analysis",
                                    desc: "Understand time and space complexity of each operation",
                                },
                                {
                                    icon: "🧪",
                                    title: "Practice Quizzes",
                                    desc: "Test your understanding with interactive quizzes",
                                },
                            ].map((feature, idx) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: idx * 0.1 }, className: "card-base text-center group hover:bg-slate-700/50", children: [_jsx("div", { className: "text-4xl mb-3", children: feature.icon }), _jsx("h3", { className: "text-lg font-bold mb-2 group-hover:text-blue-400 transition", children: feature.title }), _jsx("p", { className: "text-sm text-slate-400", children: feature.desc })] }, idx))) })] }) })] }));
}
