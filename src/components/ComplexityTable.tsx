import { motion } from "framer-motion";
import { TrendingUp, Zap } from "lucide-react";

interface ComplexityTableProps {
	complexities: {
		access?: string;
		search?: string;
		insertion?: string;
		insertion_at_end?: string;
		insertion_at_start?: string;
		deletion?: string;
		deletion_at_end?: string;
		deletion_at_start?: string;
	};
}

export default function ComplexityTable({ complexities }: ComplexityTableProps) {
	const getComplexityColor = (complexity: string) => {
		if (complexity === "O(1)") return "from-green-500 to-emerald-600";
		if (complexity === "O(log n)") return "from-yellow-500 to-orange-600";
		if (complexity === "O(n)") return "from-orange-500 to-red-600";
		if (complexity.includes("²")) return "from-red-500 to-red-700";
		return "from-slate-500 to-slate-600";
	};

	const getComplexityTextColor = (complexity: string) => {
		if (complexity === "O(1)") return "text-green-300";
		if (complexity === "O(log n)") return "text-yellow-300";
		if (complexity === "O(n)") return "text-orange-300";
		if (complexity.includes("²")) return "text-red-300";
		return "text-slate-300";
	};

	const entries = Object.entries(complexities).filter(([, v]) => v !== undefined);

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="rounded-xl overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-900/40 border border-slate-700/50 backdrop-blur-sm shadow-xl"
		>
			{/* Header */}
			<div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-b border-slate-700/50 p-5">
				<div className="flex items-center gap-3">
					<motion.div
						animate={{ rotate: [0, 360] }}
						transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
					>
						<TrendingUp size={22} className="text-blue-400" />
					</motion.div>
					<div>
						<h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
							Time Complexity Analysis
						</h3>
						<p className="text-xs text-slate-400 mt-1">Performance characteristics</p>
					</div>
				</div>
			</div>

			{/* Operations List */}
			<div className="divide-y divide-slate-700/50 p-2">
				{entries.map(([operation, complexity], index) => (
					<motion.div
						key={operation}
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: index * 0.05 }}
						className="group relative px-4 py-3.5 hover:bg-slate-700/30 transition-all duration-300 rounded-lg"
					>
						{/* Background gradient on hover */}
						<div className="absolute inset-0 bg-gradient-to-r from-slate-700/0 via-slate-600/10 to-slate-700/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

						<div className="relative flex justify-between items-center gap-4">
							{/* Operation Name */}
							<div className="flex-1">
								<p className="text-sm font-semibold text-slate-200 capitalize group-hover:text-white transition-colors">
									{operation.replace(/_/g, " ")}
								</p>
							</div>

							{/* Complexity Badge */}
							<motion.div
								whileHover={{ scale: 1.05 }}
								className={`px-4 py-2 rounded-lg bg-gradient-to-r ${getComplexityColor(
									complexity
								)} shadow-lg relative overflow-hidden`}
							>
								<motion.div
									className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
									animate={{ x: [-200, 200] }}
									transition={{ duration: 3, repeat: Infinity }}
								/>
								<code
									className={`font-mono font-bold text-sm relative z-10 ${getComplexityTextColor(
										complexity
									)}`}
								>
									{complexity}
								</code>
							</motion.div>
						</div>
					</motion.div>
				))}
			</div>

			{/* Footer Info */}
			<div className="bg-slate-800/40 border-t border-slate-700/50 px-5 py-3">
				<div className="flex items-start gap-2 text-xs text-slate-400">
					<Zap size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" />
					<span>
						Green indicates optimal performance. Red indicates linear or worse time
						complexity.
					</span>
				</div>
			</div>
		</motion.div>
	);
}
