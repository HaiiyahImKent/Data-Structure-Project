import { motion } from "framer-motion";

interface LinkedListNode {
	id: string;
	value: number;
}

interface LinkedListVisualizerProps {
	nodes: LinkedListNode[];
	highlightedIndex?: number | null;
}

export default function LinkedListVisualizer({
	nodes,
	highlightedIndex,
}: LinkedListVisualizerProps) {
	return (
		<motion.div className="flex items-center justify-center gap-0 p-4 bg-slate-800/50 rounded-lg overflow-x-auto min-h-40">
			{nodes.length === 0 ? (
				<div className="flex items-center justify-center w-full h-full text-slate-500">
					<p>List is empty</p>
				</div>
			) : (
				nodes.map((node, index) => (
					<motion.div
						key={node.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="flex items-center"
					>
						{/* Node */}
						<motion.div
							whileHover={{ scale: 1.1 }}
							className={`w-16 h-16 rounded-lg flex items-center justify-center font-bold text-white shadow-lg border-2 flex-shrink-0 ${
								highlightedIndex === index
									? "bg-gradient-to-r from-blue-500 to-cyan-500 border-cyan-300"
									: "bg-slate-700 border-slate-600"
							}`}
						>
							{node.value}
						</motion.div>

						{/* Arrow */}
						{index < nodes.length - 1 && (
							<motion.div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-2 relative">
								<div className="absolute right-0 w-3 h-3 border-r-2 border-t-2 border-orange-600 transform rotate-45 translate-y-1"></div>
							</motion.div>
						)}
					</motion.div>
				))
			)}
		</motion.div>
	);
}
