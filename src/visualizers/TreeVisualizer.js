import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function TreeVisualizer({ root }) {
    const calculatePositions = (node, x, y, offset) => {
        if (!node)
            return;
        node.x = x;
        node.y = y;
        if (node.left)
            calculatePositions(node.left, x - offset, y + 80, offset / 2);
        if (node.right)
            calculatePositions(node.right, x + offset, y + 80, offset / 2);
    };
    if (root) {
        calculatePositions(root, 200, 20, 100);
    }
    const renderLines = (node) => {
        if (!node || node.x === undefined || node.y === undefined)
            return [];
        const lines = [];
        if (node.left && node.left.x !== undefined && node.left.y !== undefined) {
            lines.push(_jsx("line", { x1: node.x, y1: node.y, x2: node.left.x, y2: node.left.y, stroke: "#94a3b8", strokeWidth: "2" }, `line-left-${node.value}`));
        }
        if (node.right && node.right.x !== undefined && node.right.y !== undefined) {
            lines.push(_jsx("line", { x1: node.x, y1: node.y, x2: node.right.x, y2: node.right.y, stroke: "#94a3b8", strokeWidth: "2" }, `line-right-${node.value}`));
        }
        if (node.left)
            lines.push(...renderLines(node.left));
        if (node.right)
            lines.push(...renderLines(node.right));
        return lines;
    };
    const renderNodes = (node) => {
        if (!node || node.x === undefined || node.y === undefined)
            return [];
        const nodes = [
            _jsx(motion.circle, { cx: node.x, cy: node.y, r: "24", fill: "#3b82f6", stroke: "#0ea5e9", strokeWidth: "2", initial: { scale: 0 }, animate: { scale: 1 } }, `node-${node.value}`),
            _jsx(motion.text, { x: node.x, y: node.y, textAnchor: "middle", dy: "0.3em", fill: "white", fontSize: "14", fontWeight: "bold", initial: { opacity: 0 }, animate: { opacity: 1 }, children: node.value }, `text-${node.value}`),
        ];
        if (node.left)
            nodes.push(...renderNodes(node.left));
        if (node.right)
            nodes.push(...renderNodes(node.right));
        return nodes;
    };
    return (_jsx(motion.div, { className: "bg-slate-800/50 rounded-lg p-4 overflow-auto", children: root ? (_jsxs("svg", { width: "100%", height: "400", style: { minHeight: "400px" }, children: [renderLines(root), renderNodes(root)] })) : (_jsx("div", { className: "flex items-center justify-center h-96 text-slate-500", children: _jsx("p", { children: "No tree data. Add some nodes!" }) })) }));
}
