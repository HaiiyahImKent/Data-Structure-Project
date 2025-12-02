import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function ArrayVisualizer({ items, highlightedIndex, activeIndices = [], }) {
    return (_jsx(motion.div, { layout: true, className: "h-64 bg-slate-800/50 rounded-lg overflow-x-auto", children: items.length === 0 ? (_jsx("div", { className: "flex h-full items-center justify-center p-6 text-slate-500", children: _jsx("p", { children: "Array is empty. Add some elements!" }) })) : (_jsx("div", { className: "flex items-end gap-3 px-6 py-4 min-w-max", children: items.map((item, index) => (_jsxs(motion.div, { layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, whileHover: { scale: 1.1 }, className: "flex flex-col items-center gap-2 min-w-12", children: [_jsx(motion.div, { animate: {
                            backgroundColor: highlightedIndex === index
                                ? "rgb(59, 130, 246)"
                                : activeIndices.includes(index)
                                    ? "rgb(34, 197, 94)"
                                    : "rgb(100, 116, 139)",
                        }, className: "w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white shadow-lg node-base border-2 border-slate-600", children: item }), _jsxs("span", { className: "text-xs text-slate-400 font-mono", children: ["[", index, "]"] })] }, `${index}-${item}`))) })) }));
}
