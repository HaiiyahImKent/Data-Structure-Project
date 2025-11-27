import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function GraphVisualizer({ nodes, edges, highlightedNodes = [], highlightedEdges = [], }) {
    return (_jsx(motion.div, { className: "bg-slate-800/50 rounded-lg p-4 overflow-auto", children: nodes.length === 0 ? (_jsx("div", { className: "flex items-center justify-center h-96 text-slate-500", children: _jsx("p", { children: "No graph data. Create a graph!" }) })) : (_jsxs("svg", { width: "100%", height: "400", style: { minHeight: "400px" }, children: [edges.map((edge, idx) => {
                    const fromNode = nodes[edge.from];
                    const toNode = nodes[edge.to];
                    if (!fromNode || !toNode)
                        return null;
                    const isHighlighted = highlightedEdges.some((e) => (e[0] === edge.from && e[1] === edge.to) ||
                        (e[0] === edge.to && e[1] === edge.from));
                    return (_jsx("line", { x1: fromNode.x, y1: fromNode.y, x2: toNode.x, y2: toNode.y, stroke: isHighlighted ? "#06b6d4" : "#94a3b8", strokeWidth: isHighlighted ? "3" : "2", markerEnd: "url(#arrowhead)" }, `edge-${idx}`));
                }), _jsx("defs", { children: _jsx("marker", { id: "arrowhead", markerWidth: "10", markerHeight: "10", refX: "9", refY: "3", orient: "auto", children: _jsx("polygon", { points: "0 0, 10 3, 0 6", fill: "#94a3b8" }) }) }), nodes.map((node, idx) => (_jsxs(motion.g, { children: [_jsx(motion.circle, { cx: node.x, cy: node.y, r: "28", fill: highlightedNodes.includes(idx) ? "#06b6d4" : "#3b82f6", stroke: highlightedNodes.includes(idx) ? "#0284c7" : "#0ea5e9", strokeWidth: "2", initial: { scale: 0 }, animate: { scale: 1 } }), _jsx(motion.text, { x: node.x, y: node.y, textAnchor: "middle", dy: "0.3em", fill: "white", fontSize: "14", fontWeight: "bold", initial: { opacity: 0 }, animate: { opacity: 1 }, children: node.value })] }, node.id)))] })) }));
}
