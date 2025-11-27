import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";

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
}: PlaybackControlsProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="glass-dark p-4 rounded-lg space-y-4"
		>
			{/* Main Controls */}
			<div className="flex items-center justify-center gap-2">
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={isAnimating ? onPause : onPlay}
					className="btn-primary p-3 rounded-full"
					aria-label={isAnimating ? "Pause" : "Play"}
				>
					{isAnimating ? <Pause size={20} /> : <Play size={20} />}
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onReset}
					className="btn-secondary p-3 rounded-full"
					aria-label="Reset"
				>
					<RotateCcw size={20} />
				</motion.button>

				{/* Undo/Redo */}
				<div className="border-l border-slate-600 mx-2 h-6"></div>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onUndo}
					disabled={!canUndo}
					className={`btn-secondary p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed`}
					aria-label="Undo"
				>
					↶
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onRedo}
					disabled={!canRedo}
					className={`btn-secondary p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed`}
					aria-label="Redo"
				>
					↷
				</motion.button>
			</div>

			{/* Speed Control */}
			<div className="space-y-2">
				<div className="flex items-center justify-between text-sm">
					<label htmlFor="speed" className="flex items-center gap-2 text-slate-300">
						<Volume2 size={16} />
						Speed
					</label>
					<span className="text-blue-400 font-semibold">{speed.toFixed(1)}x</span>
				</div>
				<input
					id="speed"
					type="range"
					min="0.5"
					max="2"
					step="0.1"
					value={speed}
					onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
					className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
				/>
			</div>
		</motion.div>
	);
}
