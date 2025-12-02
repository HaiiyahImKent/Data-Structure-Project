import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle, ChevronRight, Clock, Zap } from "lucide-react";
import type { AlgorithmStep } from "@utils/algorithmSteps";

interface AlgorithmStepsDisplayProps {
	steps: AlgorithmStep[];
	currentStepIndex: number;
	isPlaying: boolean;
	orientation?: "vertical" | "horizontal";
}

export default function AlgorithmStepsDisplay({
	steps,
	currentStepIndex,
	isPlaying,
	orientation = "vertical",
}: AlgorithmStepsDisplayProps) {
	if (steps.length === 0) {
		return null;
	}

	const progressPercent = ((currentStepIndex + 1) / steps.length) * 100;
	const isHorizontal = orientation === "horizontal";

	const containerClasses = isHorizontal
		? "space-y-4"
		: "space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900";

	const headerClasses = isHorizontal
		? "space-y-3"
		: "sticky top-0 space-y-3 bg-gradient-to-b from-slate-800/80 to-transparent pb-3";

	const listWrapperClasses = isHorizontal
		? "flex gap-4 overflow-x-auto pb-2 pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
		: "space-y-4";

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className={containerClasses}
		>
			<div className={headerClasses}>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<motion.div
							animate={{ rotate: [0, 360] }}
							transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
						>
							<Zap size={18} className="text-yellow-400" />
						</motion.div>
						<h3 className="text-sm font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-wider">
							Algorithm Steps
						</h3>
					</div>
					<motion.span
						key={currentStepIndex}
						initial={{ scale: 1.2, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
					>
						{currentStepIndex + 1} / {steps.length}
					</motion.span>
				</div>

				<div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/50">
					<motion.div
						className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 shadow-lg shadow-blue-500/50"
						initial={{ width: 0 }}
						animate={{ width: `${progressPercent}%` }}
						transition={{ duration: 0.5, ease: "easeOut" }}
					/>
				</div>
			</div>

			<div className={listWrapperClasses}>
				<AnimatePresence mode="wait">
					{steps.map((step, index) => {
						const isActive = index === currentStepIndex;
						const isCompleted = index < currentStepIndex;

						return (
							<motion.div
								key={`step-${index}`}
								initial={{ opacity: 0, x: -15 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 15 }}
								transition={{
									delay: isActive ? 0.15 : 0,
									type: "spring",
									stiffness: 100,
								}}
								className={`relative rounded-xl border transition-all duration-300 overflow-hidden group ${
									isActive
										? "bg-gradient-to-r from-blue-600/30 to-cyan-600/20 border-cyan-500/60 ring-2 ring-cyan-500/30 shadow-xl shadow-cyan-500/20"
										: isCompleted
										? "bg-gradient-to-r from-green-600/20 to-emerald-600/10 border-green-500/40 opacity-75 hover:opacity-100"
										: "bg-slate-700/30 border-slate-600/40 opacity-60 hover:opacity-80"
								} ${isHorizontal ? "min-w-[220px]" : ""}`}
							>
								{isActive && (
									<motion.div
										className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-transparent to-blue-400/10"
										animate={{ x: [-100, 100] }}
										transition={{
											duration: 3,
											repeat: Infinity,
											ease: "linear",
										}}
									/>
								)}

								<div className="relative p-4 flex items-start gap-4">
									<div className="flex-shrink-0 relative">
										{isCompleted ? (
											<motion.div
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												transition={{ type: "spring", stiffness: 150 }}
											>
												<CheckCircle
													size={24}
													className="text-green-400 drop-shadow-lg"
												/>
											</motion.div>
										) : isActive ? (
											<motion.div
												animate={{ scale: [1, 1.2, 1] }}
												transition={{ duration: 1.5, repeat: Infinity }}
												className="relative"
											>
												<Clock
													size={24}
													className="text-cyan-400 drop-shadow-lg"
												/>
												<motion.div
													className="absolute inset-0 bg-cyan-400/30 rounded-full blur-lg"
													animate={{ scale: [1, 1.5] }}
													transition={{ duration: 1.5, repeat: Infinity }}
												/>
											</motion.div>
										) : (
											<motion.div
												initial={{ opacity: 0.5 }}
												animate={{ opacity: 1 }}
												transition={{
													duration: 1,
													repeat: Infinity,
													repeatType: "reverse",
												}}
											>
												<ChevronRight
													size={24}
													className="text-slate-400"
												/>
											</motion.div>
										)}
									</div>

									<div className="flex-1 min-w-0">
										<h4
											className={`font-bold text-sm transition-all ${
												isActive
													? "text-cyan-300 text-base"
													: isCompleted
													? "text-green-300"
													: "text-slate-400"
											}`}
										>
											{step.action}
										</h4>
										<p
											className={`text-xs mt-1.5 leading-relaxed transition-all ${
												isActive
													? "text-cyan-200/90 font-medium"
													: isCompleted
													? "text-green-300/80"
													: "text-slate-500"
											}`}
										>
											{step.description}
										</p>

										{isActive && isPlaying && (
											<motion.div
												initial={{ scaleX: 0 }}
												animate={{ scaleX: 1 }}
												transition={{ duration: 1.5 }}
												className="h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 mt-3 rounded-full origin-left shadow-lg shadow-cyan-500/50"
											/>
										)}

										{isActive && (
											<motion.div
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												className="inline-flex items-center gap-1.5 mt-2.5 px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/50"
											>
												<motion.div
													animate={{ scale: [1, 1.3, 1] }}
													transition={{ duration: 1, repeat: Infinity }}
													className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
												/>
												<span className="text-xs font-semibold text-cyan-300">
													Current
												</span>
											</motion.div>
										)}
									</div>
								</div>
							</motion.div>
						);
					})}
				</AnimatePresence>
			</div>

			{currentStepIndex === steps.length - 1 && (
				<motion.div
					initial={{ opacity: 0, scale: 0.9, y: 10 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ type: "spring", stiffness: 100 }}
					className="p-4 rounded-xl bg-gradient-to-r from-green-600/30 to-emerald-600/20 border-2 border-green-500/50 relative overflow-hidden"
				>
					<motion.div
						className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-green-400/0"
						animate={{ x: [-100, 100] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
					<div className="relative flex items-start gap-3">
						<motion.div
							animate={{ rotate: [0, 360] }}
							transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
						>
							<AlertCircle size={20} className="text-green-400 flex-shrink-0" />
						</motion.div>
						<div>
							<p className="text-sm font-bold text-green-300">
								Algorithm Complete! 🎉
							</p>
							<p className="text-xs text-green-300/70 mt-1">
								All steps executed successfully
							</p>
						</div>
					</div>
				</motion.div>
			)}
		</motion.div>
	);
}
