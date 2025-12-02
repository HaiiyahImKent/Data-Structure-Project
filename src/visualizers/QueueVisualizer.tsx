import { motion } from "framer-motion";

interface QueueVisualizerProps {
	items: number[];
	frontIndex: number;
	rearIndex: number;
}

export default function QueueVisualizer({ items, frontIndex, rearIndex }: QueueVisualizerProps) {
	return (
		<motion.div className="bg-slate-800/50 rounded-lg overflow-x-auto min-h-32">
			{items.length === 0 ? (
				<div className="flex h-full items-center justify-center p-6 text-slate-500">
					<p>Queue is empty</p>
				</div>
			) : (
				<div className="flex items-center gap-4 px-6 py-4 min-w-max">
					{items.map((item, index) => (
						<div key={`${index}-${item}`} className="flex flex-col items-center gap-2">
							<motion.div
								layout
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className={`w-20 h-20 rounded-lg flex items-center justify-center font-bold text-white shadow-lg border-2 relative ${
									index === frontIndex
										? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-300 ring-2 ring-green-400"
										: index === rearIndex
										? "bg-gradient-to-r from-blue-500 to-cyan-500 border-cyan-300 ring-2 ring-cyan-400"
										: "bg-slate-700 border-slate-600"
								}`}
							>
								{item}
							</motion.div>
							<span className="text-xs text-slate-400 font-mono">
								{index === frontIndex && (
									<span className="text-green-400">FRONT</span>
								)}
								{index === rearIndex && index !== frontIndex && (
									<span className="text-cyan-400">REAR</span>
								)}
								{index !== frontIndex && index !== rearIndex && (
									<span className="text-slate-500">[{index}]</span>
								)}
							</span>
						</div>
					))}
				</div>
			)}
		</motion.div>
	);
}
