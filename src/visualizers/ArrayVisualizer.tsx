import { motion } from "framer-motion";

interface ArrayVisualizerProps {
	items: number[];
	highlightedIndex?: number | null;
	activeIndices?: number[];
}

export default function ArrayVisualizer({
	items,
	highlightedIndex,
	activeIndices = [],
}: ArrayVisualizerProps) {
	return (
		<motion.div layout className="h-64 bg-slate-800/50 rounded-lg overflow-x-auto">
			{items.length === 0 ? (
				<div className="flex h-full items-center justify-center p-6 text-slate-500">
					<p>Array is empty. Add some elements!</p>
				</div>
			) : (
				<div className="flex items-end gap-3 px-6 py-4 min-w-max">
					{items.map((item, index) => (
						<motion.div
							key={`${index}-${item}`}
							layout
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							whileHover={{ scale: 1.1 }}
							className="flex flex-col items-center gap-2 min-w-12"
						>
							<motion.div
								animate={{
									backgroundColor:
										highlightedIndex === index
											? "rgb(59, 130, 246)"
											: activeIndices.includes(index)
											? "rgb(34, 197, 94)"
											: "rgb(100, 116, 139)",
								}}
								className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white shadow-lg node-base border-2 border-slate-600"
							>
								{item}
							</motion.div>
							<span className="text-xs text-slate-400 font-mono">[{index}]</span>
						</motion.div>
					))}
				</div>
			)}
		</motion.div>
	);
}
