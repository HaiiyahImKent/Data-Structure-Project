import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

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
		if (complexity === "O(1)") return "text-green-400";
		if (complexity === "O(log n)") return "text-yellow-400";
		if (complexity === "O(n)") return "text-orange-400";
		if (complexity.includes("²")) return "text-red-400";
		return "text-gray-400";
	};

	const entries = Object.entries(complexities).filter(([, v]) => v !== undefined);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="glass-dark rounded-lg overflow-hidden"
		>
			<div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-b border-slate-700 p-4">
				<div className="flex items-center gap-2 text-lg font-bold">
					<TrendingUp size={20} className="text-blue-400" />
					Time Complexity
				</div>
			</div>

			<div className="divide-y divide-slate-700">
				{entries.map(([operation, complexity]) => (
					<div
						key={operation}
						className="px-4 py-3 flex justify-between items-center hover:bg-slate-700/30 transition"
					>
						<span className="text-slate-300 font-medium capitalize">
							{operation.replace(/_/g, " ")}
						</span>
						<code
							className={`font-mono font-bold text-sm ${getComplexityColor(
								complexity
							)}`}
						>
							{complexity}
						</code>
					</div>
				))}
			</div>
		</motion.div>
	);
}
