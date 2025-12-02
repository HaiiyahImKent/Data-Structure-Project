import { motion } from "framer-motion";

interface GraphNode {
	id: string;
	value: number;
	x: number;
	y: number;
}

interface GraphEdge {
	from: number;
	to: number;
}

interface GraphVisualizerProps {
	nodes: GraphNode[];
	edges: GraphEdge[];
	highlightedNodes?: number[];
	highlightedEdges?: Array<[number, number]>;
}

export default function GraphVisualizer({
	nodes,
	edges,
	highlightedNodes = [],
	highlightedEdges = [],
}: GraphVisualizerProps) {
	return (
		<motion.div className="bg-slate-800/50 rounded-lg p-4 overflow-auto">
			{nodes.length === 0 ? (
				<div className="flex items-center justify-center h-96 text-slate-500">
					<p>No graph data. Create a graph!</p>
				</div>
			) : (
				<svg
					width="100%"
					height="400"
					viewBox="0 0 400 400"
					preserveAspectRatio="xMidYMid meet"
					style={{ minHeight: "400px" }}
				>
					{/* Edges */}
					{edges.map((edge, idx) => {
						const fromNode = nodes[edge.from];
						const toNode = nodes[edge.to];
						if (!fromNode || !toNode) return null;

						const isHighlighted = highlightedEdges.some(
							(e) =>
								(e[0] === edge.from && e[1] === edge.to) ||
								(e[0] === edge.to && e[1] === edge.from)
						);

						return (
							<line
								key={`edge-${idx}`}
								x1={fromNode.x}
								y1={fromNode.y}
								x2={toNode.x}
								y2={toNode.y}
								stroke={isHighlighted ? "#06b6d4" : "#94a3b8"}
								strokeWidth={isHighlighted ? "3" : "2"}
								markerEnd="url(#arrowhead)"
							/>
						);
					})}

					{/* Arrow marker definition */}
					<defs>
						<marker
							id="arrowhead"
							markerWidth="10"
							markerHeight="10"
							refX="9"
							refY="3"
							orient="auto"
						>
							<polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
						</marker>
					</defs>

					{/* Nodes */}
					{nodes.map((node, idx) => (
						<motion.g key={node.id}>
							<motion.circle
								cx={node.x}
								cy={node.y}
								r="28"
								fill={highlightedNodes.includes(idx) ? "#06b6d4" : "#3b82f6"}
								stroke={highlightedNodes.includes(idx) ? "#0284c7" : "#0ea5e9"}
								strokeWidth="2"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
							/>
							<motion.text
								x={node.x}
								y={node.y}
								textAnchor="middle"
								dy="0.3em"
								fill="white"
								fontSize="14"
								fontWeight="bold"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
							>
								{node.value}
							</motion.text>
						</motion.g>
					))}
				</svg>
			)}
		</motion.div>
	);
}
