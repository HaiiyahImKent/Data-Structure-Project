import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Zap } from "lucide-react";

interface PlaybackControlsProps {
	isAnimating: boolean;
	onPlay: () => void;
	onPause: () => void;
	onReset: () => void;
	speed: number;
	onSpeedChange: (speed: number) => void;
	onUndo: () => void;
	onRedo: () => void;
	canUndo: boolean;
	canRedo: boolean;
	onPreviousStep?: () => void;
	onNextStep?: () => void;
	canPreviousStep?: boolean;
	canNextStep?: boolean;
	showStepControls?: boolean;
}

export default function PlaybackControls({
	isAnimating,
	onPlay,
	onPause,
	onReset,
	speed,
	onSpeedChange,
	onUndo,
	onRedo,
	canUndo,
	canRedo,
	onPreviousStep,
	onNextStep,
	canPreviousStep = true,
	canNextStep = true,
	showStepControls = false,
}: PlaybackControlsProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="glass-dark p-6 rounded-xl space-y-5 bg-gradient-to-br from-slate-800/60 to-slate-900/40 border border-slate-700/50 backdrop-blur-md shadow-xl"
		>
			{/* Main Controls */}
			<div className="space-y-3">
				<label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
					Playback
				</label>
				<div className="flex items-center justify-center gap-3">
					{/* Play/Pause Button */}
					<motion.button
						whileHover={{ scale: 1.08 }}
						whileTap={{ scale: 0.95 }}
						onClick={isAnimating ? onPause : onPlay}
						className={`relative p-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center ${
							isAnimating
								? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/50"
								: "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50"
						}`}
						aria-label={isAnimating ? "Pause" : "Play"}
					>
						{isAnimating ? <Pause size={22} /> : <Play size={22} />}
					</motion.button>

					{/* Reset Button */}
					<motion.button
						whileHover={{ scale: 1.08, rotate: 180 }}
						whileTap={{ scale: 0.95 }}
						onClick={onReset}
						className="p-4 rounded-full bg-slate-700/60 hover:bg-slate-700 text-slate-200 hover:text-blue-400 transition-all duration-300 border border-slate-600/50 hover:border-blue-500/50"
						aria-label="Reset"
						title="Reset to initial state"
					>
						<RotateCcw size={20} />
					</motion.button>

					{/* Divider */}
					<div className="border-l border-slate-600/50 h-8"></div>

					{/* Undo Button */}
					<motion.button
						whileHover={{ scale: 1.08 }}
						whileTap={{ scale: 0.95 }}
						onClick={onUndo}
						disabled={!canUndo}
						className={`p-4 rounded-full font-semibold transition-all duration-300 border border-slate-600/50 ${
							canUndo
								? "bg-slate-700/60 hover:bg-slate-700 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50 cursor-pointer"
								: "bg-slate-800/40 text-slate-600 cursor-not-allowed opacity-50"
						}`}
						aria-label="Undo"
						title="Undo previous operation"
					>
						↶
					</motion.button>

					{/* Redo Button */}
					<motion.button
						whileHover={{ scale: 1.08 }}
						whileTap={{ scale: 0.95 }}
						onClick={onRedo}
						disabled={!canRedo}
						className={`p-4 rounded-full font-semibold transition-all duration-300 border border-slate-600/50 ${
							canRedo
								? "bg-slate-700/60 hover:bg-slate-700 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50 cursor-pointer"
								: "bg-slate-800/40 text-slate-600 cursor-not-allowed opacity-50"
						}`}
						aria-label="Redo"
						title="Redo next operation"
					>
						↷
					</motion.button>
				</div>
			</div>

			{/* Step Controls (Algorithm Steps) */}
			{showStepControls && (onPreviousStep || onNextStep) && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="space-y-3 pt-4 border-t border-slate-700/50"
				>
					<label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
						Algorithm Steps
					</label>
					<div className="flex items-center justify-center gap-3">
						<motion.button
							whileHover={{ scale: 1.08 }}
							whileTap={{ scale: 0.95 }}
							onClick={onPreviousStep}
							disabled={!canPreviousStep}
							className={`p-3 rounded-lg font-semibold transition-all duration-300 border border-slate-600/50 ${
								canPreviousStep
									? "bg-slate-700/60 hover:bg-slate-700 text-slate-200 hover:text-violet-400 hover:border-violet-500/50"
									: "bg-slate-800/40 text-slate-600 cursor-not-allowed opacity-50"
							}`}
							aria-label="Previous Step"
							title="Go to previous step"
						>
							<ChevronLeft size={20} />
						</motion.button>

						<div className="flex-1 h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
							<motion.div
								className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
								initial={{ width: 0 }}
								animate={{ width: `${canPreviousStep ? 50 : 0}%` }}
								transition={{ duration: 0.3 }}
							/>
						</div>

						<motion.button
							whileHover={{ scale: 1.08 }}
							whileTap={{ scale: 0.95 }}
							onClick={onNextStep}
							disabled={!canNextStep}
							className={`p-3 rounded-lg font-semibold transition-all duration-300 border border-slate-600/50 ${
								canNextStep
									? "bg-slate-700/60 hover:bg-slate-700 text-slate-200 hover:text-violet-400 hover:border-violet-500/50"
									: "bg-slate-800/40 text-slate-600 cursor-not-allowed opacity-50"
							}`}
							aria-label="Next Step"
							title="Go to next step"
						>
							<ChevronRight size={20} />
						</motion.button>
					</div>
				</motion.div>
			)}

			{/* Speed Control */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.1 }}
				className="space-y-3 pt-4 border-t border-slate-700/50"
			>
				<div className="flex items-center justify-between">
					<label
						htmlFor="speed"
						className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest"
					>
						<Zap size={14} className="text-yellow-400" />
						Speed
					</label>
					<motion.span
						key={speed}
						initial={{ scale: 1.2, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className="text-sm font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
					>
						{speed.toFixed(1)}x
					</motion.span>
				</div>

				<div className="relative">
					<input
						id="speed"
						type="range"
						min="0.5"
						max="2"
						step="0.1"
						value={speed}
						onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
						className="w-full h-2 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg appearance-none cursor-pointer accent-yellow-500 transition-all"
						style={{
							backgroundImage: `linear-gradient(to right, rgb(29, 78, 139), rgb(59, 130, 246))`,
						}}
					/>

					{/* Speed indicators */}
					<div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
						<span>0.5x</span>
						<span>1.0x</span>
						<span>1.5x</span>
						<span>2.0x</span>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
