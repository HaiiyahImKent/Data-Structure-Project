import { motion } from "framer-motion";
import type { ReactElement } from "react";

interface TreeNode {
	value: number;
	left?: TreeNode;
	right?: TreeNode;
	x?: number;
	y?: number;
}

interface TreeVisualizerProps {
	root?: TreeNode;
}

export default function TreeVisualizer({ root }: TreeVisualizerProps) {
	const calculatePositions = (
		node: TreeNode | undefined,
		x: number,
		y: number,
		offset: number
	): void => {
		if (!node) return;
		node.x = x;
		node.y = y;
		if (node.left) calculatePositions(node.left, x - offset, y + 80, offset / 2);
		if (node.right) calculatePositions(node.right, x + offset, y + 80, offset / 2);
	};

	if (root) {
		calculatePositions(root, 200, 20, 100);
	}

	const renderLines = (node: TreeNode | undefined): ReactElement[] => {
		if (!node || node.x === undefined || node.y === undefined) return [];

		const lines: ReactElement[] = [];

		if (node.left && node.left.x !== undefined && node.left.y !== undefined) {
			lines.push(
				<line
					key={`line-left-${node.value}`}
					x1={node.x}
					y1={node.y}
					x2={node.left.x}
					y2={node.left.y}
					stroke="#94a3b8"
					strokeWidth="2"
				/>
			);
		}

		if (node.right && node.right.x !== undefined && node.right.y !== undefined) {
			lines.push(
				<line
					key={`line-right-${node.value}`}
					x1={node.x}
					y1={node.y}
					x2={node.right.x}
					y2={node.right.y}
					stroke="#94a3b8"
					strokeWidth="2"
				/>
			);
		}

		if (node.left) lines.push(...renderLines(node.left));
		if (node.right) lines.push(...renderLines(node.right));

		return lines;
	};

	const renderNodes = (node: TreeNode | undefined): ReactElement[] => {
		if (!node || node.x === undefined || node.y === undefined) return [];

		const nodes: ReactElement[] = [
			<motion.circle
				key={`node-${node.value}`}
				cx={node.x}
				cy={node.y}
				r="24"
				fill="#3b82f6"
				stroke="#0ea5e9"
				strokeWidth="2"
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
			/>,
			<motion.text
				key={`text-${node.value}`}
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
			</motion.text>,
		];

		if (node.left) nodes.push(...renderNodes(node.left));
		if (node.right) nodes.push(...renderNodes(node.right));

		return nodes;
	};

	return (
		<motion.div className="bg-slate-800/50 rounded-lg p-4 overflow-auto">
			{root ? (
				<svg width="100%" height="400" style={{ minHeight: "400px" }}>
					{renderLines(root)}
					{renderNodes(root)}
				</svg>
			) : (
				<div className="flex items-center justify-center h-96 text-slate-500">
					<p>No tree data. Add some nodes!</p>
				</div>
			)}
		</motion.div>
	);
}
