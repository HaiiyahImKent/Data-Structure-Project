import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { DATA_STRUCTURES } from "@data/structures";
import StructureCard from "@components/StructureCard";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const documentationSectionRef = useRef(null);
    const documentationResources = [
        {
            title: "Getting Started",
            description: "Understand the AlgoVisual experience and navigation tips",
            badge: "Basics",
            cta: "View guide",
            href: "/guides/getting-started",
            disabled: false,
        },
        {
            title: "Operations Reference",
            description: "In-depth look at operations, complexities, and animations",
            badge: "Deep Dive",
            cta: "Read docs",
            href: "/docs/operations",
            disabled: false,
        },
        {
            title: "Visualization Controls",
            description: "Learn how to drive the timeline, playback, and logging tools",
            badge: "How-To",
            cta: "Explore",
            href: "/explore/visualization-controls",
            disabled: false,
        },
        {
            title: "API & Data",
            description: "Hook into datasets and extend visualizations for projects",
            badge: "Advanced",
            cta: "Integrate",
            href: null,
            disabled: true,
            disabledLabel: "Coming soon",
        },
    ];
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
    const scrollToDocumentation = () => {
        if (documentationSectionRef.current) {
            documentationSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    return (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "min-h-screen", children: [_jsxs("section", { className: "relative overflow-hidden py-32", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-blue-500/10 via-slate-900 to-slate-900" }), " ", _jsxs("div", { className: "container mx-auto px-4 relative z-10", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "text-center max-w-3xl mx-auto mb-12", children: [_jsx("div", { className: "flex items-center justify-center gap-2 mb-6", children: _jsx("span", { className: "badge", children: "Learn Data Structures" }) }), _jsx("h1", { className: "text-7xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent leading-tight", children: "AlgoVisual" }), " ", _jsx("p", { className: "text-xl text-slate-300 mb-8", children: "Master fundamental data structures through interactive visualizations, step-by-step animations, and hands-on learning" }), _jsxs("div", { className: "flex gap-4 justify-center flex-wrap", children: [_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "btn-primary text-lg px-8 py-3", onClick: () => navigate("/learn/array"), children: "Start Learning" }), _jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "btn-secondary text-lg px-8 py-3", onClick: scrollToDocumentation, children: "Documentation" })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
                                    { label: "8+ Data Structures", value: "Complete Coverage" },
                                    { label: "50+ Algorithms", value: "Step-by-Step" },
                                    { label: "Interactive", value: "Real-Time Viz" },
                                ].map((stat, idx) => (_jsxs(motion.div, { whileHover: { scale: 1.02 }, className: "card-base text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-400", children: stat.label }), _jsx("div", { className: "text-slate-400 text-sm", children: stat.value })] }, idx))) })] })] }), _jsx("section", { className: "container mx-auto px-4 py-8", children: _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.3 }, className: "flex gap-2 justify-center flex-wrap", children: categories.map((cat) => (_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => setSelectedCategory(cat.id), className: `px-6 py-2 rounded-full font-semibold transition ${selectedCategory === cat.id
                            ? "btn-primary"
                            : "btn-secondary hover:bg-slate-600"}`, children: cat.label }, cat.id))) }) }), _jsxs("section", { className: "container mx-auto px-4 py-12", children: [_jsx(motion.h2, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-3xl font-bold mb-8 text-center", children: "Data Structures" }), _jsx(motion.div, { layout: true, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredStructures.map((structure, idx) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: idx * 0.05 }, children: _jsx(StructureCard, { structure: structure, onLearnClick: () => navigate(`/learn/${structure.id}`), onVisualizeClick: () => navigate(`/visualize/${structure.id}`), onQuizClick: () => navigate(`/quiz/${structure.id}`) }) }, structure.id))) })] }), _jsxs("section", { ref: documentationSectionRef, className: "container mx-auto px-4 py-12", id: "documentation", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-8", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-blue-400 mb-2", children: "Documentation" }), _jsx("h2", { className: "text-3xl font-bold mb-3", children: "Guided knowledge base" }), _jsx("p", { className: "text-slate-400 max-w-2xl mx-auto", children: "Dive deeper with curated documentation covering platform usage, data structure theory, and integrations." })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: documentationResources.map((resource, idx) => (_jsxs(motion.article, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: idx * 0.05 }, className: `card-base h-full flex flex-col justify-between border border-slate-700/40 ${resource.disabled ? "opacity-60" : "hover:border-blue-500/60"}`, children: [_jsxs("div", { children: [_jsx("span", { className: "text-xs font-semibold tracking-wide uppercase text-blue-300", children: resource.badge }), _jsx("h3", { className: "text-xl font-semibold mt-2 mb-3", children: resource.title }), _jsx("p", { className: "text-slate-400 text-sm", children: resource.description })] }), !resource.disabled ? (_jsxs("button", { onClick: () => resource.href && navigate(resource.href), className: "mt-6 text-sm font-semibold text-blue-400 hover:text-blue-200 flex items-center gap-2", children: [resource.cta, _jsx("span", { "aria-hidden": "true", children: "\u2192" })] })) : (_jsxs("button", { disabled: true, className: "mt-6 text-sm font-semibold text-slate-500 cursor-not-allowed flex items-center gap-2", children: [resource.disabledLabel, _jsx("span", { "aria-hidden": "true", children: "\u2192" })] }))] }, resource.title))) })] }), _jsx("section", { className: "py-16 border-t border-slate-700/50", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsx(motion.h2, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-3xl font-bold mb-12 text-center", children: "Why AlgoVisual?" }), _jsx(motion.div, { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
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
