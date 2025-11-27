import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function QueueVisualizer({ items, frontIndex, rearIndex }) {
    return (_jsx(motion.div, { className: "flex items-center justify-center gap-2 p-4 bg-slate-800/50 rounded-lg overflow-x-auto min-h-32", children: items.length === 0 ? (_jsx("div", { className: "flex items-center justify-center w-full h-full text-slate-500", children: _jsx("p", { children: "Queue is empty" }) })) : (items.map((item, index) => (_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(motion.div, { layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: `w-20 h-20 rounded-lg flex items-center justify-center font-bold text-white shadow-lg border-2 relative ${index === frontIndex
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-300 ring-2 ring-green-400"
                        : index === rearIndex
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 border-cyan-300 ring-2 ring-cyan-400"
                            : "bg-slate-700 border-slate-600"}`, children: item }), _jsxs("span", { className: "text-xs text-slate-400 font-mono", children: [index === frontIndex && _jsx("span", { className: "text-green-400", children: "FRONT" }), index === rearIndex && index !== frontIndex && (_jsx("span", { className: "text-cyan-400", children: "REAR" })), index !== frontIndex && index !== rearIndex && (_jsxs("span", { className: "text-slate-500", children: ["[", index, "]"] }))] })] }, `${index}-${item}`)))) }));
}
