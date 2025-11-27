import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
export default function ComplexityTable({ complexities }) {
    const getComplexityColor = (complexity) => {
        if (complexity === "O(1)")
            return "text-green-400";
        if (complexity === "O(log n)")
            return "text-yellow-400";
        if (complexity === "O(n)")
            return "text-orange-400";
        if (complexity.includes("²"))
            return "text-red-400";
        return "text-gray-400";
    };
    const entries = Object.entries(complexities).filter(([, v]) => v !== undefined);
    return (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "glass-dark rounded-lg overflow-hidden", children: [_jsx("div", { className: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-b border-slate-700 p-4", children: _jsxs("div", { className: "flex items-center gap-2 text-lg font-bold", children: [_jsx(TrendingUp, { size: 20, className: "text-blue-400" }), "Time Complexity"] }) }), _jsx("div", { className: "divide-y divide-slate-700", children: entries.map(([operation, complexity]) => (_jsxs("div", { className: "px-4 py-3 flex justify-between items-center hover:bg-slate-700/30 transition", children: [_jsx("span", { className: "text-slate-300 font-medium capitalize", children: operation.replace(/_/g, " ") }), _jsx("code", { className: `font-mono font-bold text-sm ${getComplexityColor(complexity)}`, children: complexity })] }, operation))) })] }));
}
