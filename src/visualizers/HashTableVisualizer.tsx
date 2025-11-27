import { motion } from "framer-motion";

interface HashTableVisualizerProps {
	entries: Array<{ key: string; value: number }>;
}

export default function HashTableVisualizer({ entries }: HashTableVisualizerProps) {
	const buckets = 16;
	const getBucketIndex = (key: string): number => {
		return key.charCodeAt(0) % buckets;
	};

	const bucketsMap = Array.from({ length: buckets }, (_, i) =>
		entries.filter((e) => getBucketIndex(e.key) === i)
	);

	return (
		<motion.div className="space-y-2">
			{bucketsMap.map((bucket, idx) => (
				<motion.div
					key={`bucket-${idx}`}
					layout
					className="glass-dark rounded-lg p-4 flex items-center gap-2"
				>
					<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white min-w-12">
						{idx}
					</div>

					<div className="flex-1 flex flex-wrap gap-2">
						{bucket.length === 0 ? (
							<span className="text-slate-500 text-sm italic">Empty</span>
						) : (
							bucket.map((entry, entryIdx) => (
								<motion.div
									key={`${idx}-${entryIdx}`}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded px-3 py-1 text-sm"
								>
									<span className="text-green-300 font-semibold">
										{entry.key}
									</span>
									<span className="text-slate-400 mx-1">→</span>
									<span className="text-cyan-300 font-mono">{entry.value}</span>
								</motion.div>
							))
						)}
					</div>
				</motion.div>
			))}
		</motion.div>
	);
}
