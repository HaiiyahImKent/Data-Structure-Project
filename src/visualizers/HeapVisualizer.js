import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function HeapVisualizer({ items, highlightedIndex }) {
    const renderHeapTree = () => {
        const getPosition = (depth, position) => {
            const y = 40 + depth * 80;
            const itemsAtDepth = Math.pow(2, depth);
            const x = (position + 0.5) * (400 / itemsAtDepth);
            return [x, y];
        };
        const getDepth = (index) => {
            return Math.floor(Math.log2(index + 1));
        };
        const getPositionInLevel = (index) => {
            const depth = getDepth(index);
            const itemsBeforeLevel = Math.pow(2, depth) - 1;
            return index - itemsBeforeLevel;
        };
        return (_jsxs("svg", { width: "100%", height: "400", style: { minHeight: "400px" }, children: [items.map((_, index) => {
                    if (index === 0)
                        return null;
                    const parentIndex = Math.floor((index - 1) / 2);
                    const [parentX, parentY] = getPosition(getDepth(parentIndex), getPositionInLevel(parentIndex));
                    const [childX, childY] = getPosition(getDepth(index), getPositionInLevel(index));
                    return (_jsx("line", { x1: parentX, y1: parentY, x2: childX, y2: childY, stroke: "#94a3b8", strokeWidth: "2" }, `line-${index}`));
                }), items.map((value, index) => {
                    const [x, y] = getPosition(getDepth(index), getPositionInLevel(index));
                    return (_jsxs(motion.g, { children: [_jsx(motion.circle, { cx: x, cy: y, r: "24", fill: highlightedIndex === index ? "#06b6d4" : "#3b82f6", stroke: highlightedIndex === index ? "#0284c7" : "#0ea5e9", strokeWidth: "2", initial: { scale: 0 }, animate: { scale: 1 } }), _jsx(motion.text, { x: x, y: y, textAnchor: "middle", dy: "0.3em", fill: "white", fontSize: "12", fontWeight: "bold", initial: { opacity: 0 }, animate: { opacity: 1 }, children: value })] }, `node-${index}`));
                })] }));
    };
    return (_jsx(motion.div, { className: "bg-slate-800/50 rounded-lg p-4 overflow-auto", children: items.length === 0 ? (_jsx("div", { className: "flex items-center justify-center h-96 text-slate-500", children: _jsx("p", { children: "Heap is empty. Add elements!" }) })) : (renderHeapTree()) }));
}
