import { motion } from "framer-motion";
import type { ReactElement } from "react";

interface HeapVisualizerProps {
	items: number[];
	highlightedIndex?: number | null;
}

export default function HeapVisualizer({ items, highlightedIndex }: HeapVisualizerProps) {
	const renderHeapTree = (): ReactElement => {
		const getPosition = (depth: number, position: number): [number, number] => {
			const y = 40 + depth * 80;
			const itemsAtDepth = Math.pow(2, depth);
			const x = (position + 0.5) * (400 / itemsAtDepth);
			return [x, y];
		};

		const getDepth = (index: number): number => {
			return Math.floor(Math.log2(index + 1));
		};

		const getPositionInLevel = (index: number): number => {
			const depth = getDepth(index);
			const itemsBeforeLevel = Math.pow(2, depth) - 1;
			return index - itemsBeforeLevel;
		};

		return (
			<svg width="100%" height="400" style={{ minHeight: "400px" }}>
				{/* Lines */}
				{items.map((_, index) => {
					if (index === 0) return null;
					const parentIndex = Math.floor((index - 1) / 2);
					const [parentX, parentY] = getPosition(
						getDepth(parentIndex),
						getPositionInLevel(parentIndex)
					);
					const [childX, childY] = getPosition(
						getDepth(index),
						getPositionInLevel(index)
					);

					return (
						<line
							key={`line-${index}`}
							x1={parentX}
							y1={parentY}
							x2={childX}
							y2={childY}
							stroke="#94a3b8"
							strokeWidth="2"
						/>
					);
				})}

				{/* Nodes */}
				{items.map((value, index) => {
					const [x, y] = getPosition(getDepth(index), getPositionInLevel(index));

					return (
						<motion.g key={`node-${index}`}>
							<motion.circle
								cx={x}
								cy={y}
								r="24"
								fill={highlightedIndex === index ? "#06b6d4" : "#3b82f6"}
								stroke={highlightedIndex === index ? "#0284c7" : "#0ea5e9"}
								strokeWidth="2"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
							/>
							<motion.text
								x={x}
								y={y}
								textAnchor="middle"
								dy="0.3em"
								fill="white"
								fontSize="12"
								fontWeight="bold"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
							>
								{value}
							</motion.text>
						</motion.g>
					);
				})}
			</svg>
		);
	};

	return (
		<motion.div className="bg-slate-800/50 rounded-lg p-4 overflow-auto">
			{items.length === 0 ? (
				<div className="flex items-center justify-center h-96 text-slate-500">
					<p>Heap is empty. Add elements!</p>
				</div>
			) : (
				renderHeapTree()
			)}
		</motion.div>
	);
}
