import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function LinkedListVisualizer({ nodes, highlightedIndex, }) {
    return (_jsx(motion.div, { className: "flex items-center justify-center gap-0 p-4 bg-slate-800/50 rounded-lg overflow-x-auto min-h-40", children: nodes.length === 0 ? (_jsx("div", { className: "flex items-center justify-center w-full h-full text-slate-500", children: _jsx("p", { children: "List is empty" }) })) : (nodes.map((node, index) => (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "flex items-center", children: [_jsx(motion.div, { whileHover: { scale: 1.1 }, className: `w-16 h-16 rounded-lg flex items-center justify-center font-bold text-white shadow-lg border-2 flex-shrink-0 ${highlightedIndex === index
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 border-cyan-300"
                        : "bg-slate-700 border-slate-600"}`, children: node.value }), index < nodes.length - 1 && (_jsx(motion.div, { className: "w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-2 relative", children: _jsx("div", { className: "absolute right-0 w-3 h-3 border-r-2 border-t-2 border-orange-600 transform rotate-45 translate-y-1" }) }))] }, node.id)))) }));
}
