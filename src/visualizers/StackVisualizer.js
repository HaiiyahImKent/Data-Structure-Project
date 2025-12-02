import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function StackVisualizer({ items, topIndex }) {
    return (_jsxs(motion.div, { className: "flex flex-col-reverse items-center justify-start gap-2 p-4 bg-slate-800/50 rounded-lg min-w-48 max-h-80 overflow-y-auto", children: [items.map((item, index) => (_jsxs(motion.div, { layout: true, initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: `w-40 py-4 rounded-lg flex items-center justify-center font-bold text-white shadow-lg border-2 relative ${index === topIndex
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 border-cyan-300 ring-2 ring-cyan-400"
                    : "bg-slate-700 border-slate-600"}`, children: [item, index === topIndex && (_jsx("span", { className: "absolute -right-12 text-sm text-yellow-400 font-semibold whitespace-nowrap", children: "\u2190 TOP" })), index === items.length - 1 && index !== topIndex && (_jsx("span", { className: "absolute -right-16 text-sm text-green-400 font-semibold whitespace-nowrap", children: "\u2190 BOTTOM" }))] }, `${item}-${index}`))), items.length === 0 && (_jsx("div", { className: "flex items-center justify-center w-full py-12 text-slate-500", children: _jsx("p", { children: "Stack is empty" }) }))] }));
}
