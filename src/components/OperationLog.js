import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
const formatValue = (value) => {
    if (value === null)
        return "null";
    if (typeof value === "object") {
        try {
            return JSON.stringify(value);
        }
        catch {
            return "{...}";
        }
    }
    return String(value);
};
export default function OperationLog({ logs, onClear }) {
    return (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "glass-dark rounded-lg flex flex-col h-full", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-slate-700", children: [_jsx("h3", { className: "font-bold text-lg", children: "Operation Log" }), _jsx(motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, onClick: onClear, disabled: logs.length === 0, className: "btn-secondary p-2 rounded-lg text-sm disabled:opacity-50", "aria-label": "Clear logs", children: "Clear" })] }), _jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-2", children: logs.length === 0 ? (_jsx("p", { className: "text-slate-500 text-sm italic", children: "No operations yet" })) : (logs
                    .slice()
                    .reverse()
                    .map((log) => (_jsxs(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, className: "bg-slate-700/30 rounded p-2 text-sm border-l-2 border-blue-500", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("span", { className: "font-semibold text-blue-300", children: log.operation }), log.value !== undefined && (_jsxs("span", { className: "ml-2 text-slate-400", children: ["(", formatValue(log.value), ")"] }))] }), log.complexity && (_jsx("code", { className: "bg-slate-800 px-2 py-1 rounded text-xs text-cyan-300 ml-2 font-mono", children: log.complexity }))] }), _jsx("div", { className: "text-xs text-slate-500 mt-1", children: new Date(log.timestamp).toLocaleTimeString() })] }, log.id)))) })] }));
}
