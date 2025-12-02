import { motion } from "framer-motion";
import { Trash2, Clock, AlertCircle } from "lucide-react";
import type { OperationValue } from "@store/visualizationStore";

interface OperationLogProps {
	logs: Array<{
		id: string;
		operation: string;
		value?: OperationValue;
		complexity?: string;
		timestamp: number;
	}>;
	onClear: () => void;
}

const formatValue = (value: OperationValue) => {
	if (value === null) return "null";
	if (typeof value === "object") {
		try {
			return JSON.stringify(value);
		} catch {
			return "{...}";
		}
	}
	return String(value);
};

const getOperationColor = (operation: string) => {
	if (operation.includes("Add") || operation.includes("Push") || operation.includes("Insert"))
		return "from-green-500 to-emerald-600";
	if (operation.includes("Remove") || operation.includes("Pop") || operation.includes("Delete"))
		return "from-red-500 to-rose-600";
	if (operation.includes("Search") || operation.includes("Find"))
		return "from-blue-500 to-cyan-600";
	return "from-purple-500 to-indigo-600";
};

export default function OperationLog({ logs, onClear }: OperationLogProps) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="rounded-xl flex flex-col max-h-64 bg-gradient-to-br from-slate-800/60 to-slate-900/40 border border-slate-700/50 backdrop-blur-sm shadow-xl overflow-hidden"
		>
			{/* Header */}
			<div className="flex items-center justify-between p-5 border-b border-slate-700/50 bg-gradient-to-r from-blue-600/20 to-cyan-600/20">
				<div className="flex items-center gap-3">
					<motion.div
						animate={{ rotate: [0, 360] }}
						transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
					>
						<Clock size={20} className="text-blue-400" />
					</motion.div>
					<div>
						<h3 className="font-bold text-lg bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
							Operation Log
						</h3>
						<p className="text-xs text-slate-400 mt-0.5">
							{logs.length} operation{logs.length !== 1 ? "s" : ""}
						</p>
					</div>
				</div>
				<motion.button
					whileHover={{ scale: 1.08 }}
					whileTap={{ scale: 0.95 }}
					onClick={onClear}
					disabled={logs.length === 0}
					className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
						logs.length > 0
							? "bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 hover:border-red-500 cursor-pointer"
							: "bg-slate-700/40 text-slate-500 cursor-not-allowed opacity-50"
					}`}
					aria-label="Clear logs"
					title="Clear all operation logs"
				>
					<Trash2 size={16} />
					<span className="hidden sm:inline">Clear</span>
				</motion.button>
			</div>

			{/* Logs Container */}
			<div className="flex-1 min-h-0 overflow-auto max-h-96 p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
				{logs.length === 0 ? (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						className="h-full flex items-center justify-center"
					>
						<div className="text-center space-y-3">
							<motion.div
								animate={{ y: [0, -5, 0] }}
								transition={{ duration: 2, repeat: Infinity }}
							>
								<AlertCircle size={40} className="text-slate-600 mx-auto" />
							</motion.div>
							<p className="text-slate-400 text-sm font-medium">No operations yet</p>
							<p className="text-slate-500 text-xs">
								Start adding elements to see the log
							</p>
						</div>
					</motion.div>
				) : (
					logs
						.slice()
						.reverse()
						.map((log, idx) => (
							<motion.div
								key={log.id}
								initial={{ opacity: 0, x: -15, y: 10 }}
								animate={{ opacity: 1, x: 0, y: 0 }}
								transition={{ delay: idx * 0.05 }}
								className={`rounded-lg bg-gradient-to-r ${getOperationColor(
									log.operation
								)} bg-opacity-10 border-l-4 border-l-current hover:bg-opacity-20 transition-all duration-300 group overflow-hidden relative`}
							>
								{/* Shimmer effect on hover */}
								<motion.div
									className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
									animate={{ x: [-200, 200] }}
									transition={{ duration: 3, repeat: Infinity }}
									initial={false}
								/>

								<div className="relative p-3 space-y-1.5 overflow-auto max-h-96">
									<div className="flex justify-between items-start gap-2 overflow-auto max-h-96">
										<div className="flex-1 min-w-0">
											<motion.span
												initial={{ opacity: 0.7 }}
												animate={{ opacity: 1 }}
												className={`font-bold text-sm ${
													getOperationColor(log.operation).split(" ")[1]
												}`}
											>
												{log.operation}
											</motion.span>
											{log.value !== undefined && (
												<div className="text-xs text-slate-300 mt-1 break-all font-mono">
													<span className="text-slate-500">value:</span>{" "}
													<span className="text-cyan-300 font-semibold">
														{formatValue(log.value)}
													</span>
												</div>
											)}
										</div>
										{log.complexity && (
											<motion.code
												initial={{ scale: 0.8 }}
												animate={{ scale: 1 }}
												className="bg-slate-900/60 px-2.5 py-1 rounded-md text-xs text-cyan-300 font-mono font-bold border border-cyan-500/30 flex-shrink-0 whitespace-nowrap"
											>
												{log.complexity}
											</motion.code>
										)}
									</div>
									<motion.div
										initial={{ opacity: 0.5 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.2 }}
										className="text-xs text-white flex items-center gap-1.5"
									>
										<Clock size={12} />
										{new Date(log.timestamp).toLocaleTimeString()}
									</motion.div>
								</div>
							</motion.div>
						))
				)}
			</div>
		</motion.div>
	);
}
