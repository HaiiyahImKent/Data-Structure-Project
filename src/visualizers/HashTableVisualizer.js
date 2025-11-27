import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function HashTableVisualizer({ entries }) {
    const buckets = 16;
    const getBucketIndex = (key) => {
        return key.charCodeAt(0) % buckets;
    };
    const bucketsMap = Array.from({ length: buckets }, (_, i) => entries.filter((e) => getBucketIndex(e.key) === i));
    return (_jsx(motion.div, { className: "space-y-2", children: bucketsMap.map((bucket, idx) => (_jsxs(motion.div, { layout: true, className: "glass-dark rounded-lg p-4 flex items-center gap-2", children: [_jsx("div", { className: "w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white min-w-12", children: idx }), _jsx("div", { className: "flex-1 flex flex-wrap gap-2", children: bucket.length === 0 ? (_jsx("span", { className: "text-slate-500 text-sm italic", children: "Empty" })) : (bucket.map((entry, entryIdx) => (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, className: "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded px-3 py-1 text-sm", children: [_jsx("span", { className: "text-green-300 font-semibold", children: entry.key }), _jsx("span", { className: "text-slate-400 mx-1", children: "\u2192" }), _jsx("span", { className: "text-cyan-300 font-mono", children: entry.value })] }, `${idx}-${entryIdx}`)))) })] }, `bucket-${idx}`))) }));
}
