import { motion } from "framer-motion";
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

export default function OperationLog({ logs, onClear }: OperationLogProps) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="glass-dark rounded-lg flex flex-col h-full"
		>
			<div className="flex items-center justify-between p-4 border-b border-slate-700">
				<h3 className="font-bold text-lg">Operation Log</h3>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					onClick={onClear}
					disabled={logs.length === 0}
					className="btn-secondary p-2 rounded-lg text-sm disabled:opacity-50"
					aria-label="Clear logs"
				>
					Clear
				</motion.button>
			</div>

			<div className="flex-1 overflow-y-auto p-4 space-y-2">
				{logs.length === 0 ? (
					<p className="text-slate-500 text-sm italic">No operations yet</p>
				) : (
					logs
						.slice()
						.reverse()
						.map((log) => (
							<motion.div
								key={log.id}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								className="bg-slate-700/30 rounded p-2 text-sm border-l-2 border-blue-500"
							>
								<div className="flex justify-between items-start">
									<div>
										<span className="font-semibold text-blue-300">
											{log.operation}
										</span>
										{log.value !== undefined && (
											<span className="ml-2 text-slate-400">
												({formatValue(log.value)})
											</span>
										)}
									</div>
									{log.complexity && (
										<code className="bg-slate-800 px-2 py-1 rounded text-xs text-cyan-300 ml-2 font-mono">
											{log.complexity}
										</code>
									)}
								</div>
								<div className="text-xs text-slate-500 mt-1">
									{new Date(log.timestamp).toLocaleTimeString()}
								</div>
							</motion.div>
						))
				)}
			</div>
		</motion.div>
	);
}
