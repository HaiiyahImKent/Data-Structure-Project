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
		<motion.div className="bg-slate-800/50 rounded-lg overflow-x-auto min-h-40">
			{nodes.length === 0 ? (
				<div className="flex h-full items-center justify-center p-6 text-slate-500">
					<p>List is empty</p>
				</div>
			) : (
				<div className="flex items-center gap-4 px-6 py-4 min-w-max">
					{nodes.map((node, index) => (
						<motion.div
							key={node.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="flex items-center gap-4"
						>
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

							{index < nodes.length - 1 && (
								<div className="relative flex items-center">
									<div className="h-1 w-12 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"></div>
									<div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-t-2 border-r-2 border-green-400"></div>
								</div>
							)}
						</motion.div>
					))}
				</div>
			)}
		</motion.div>
	);
}
