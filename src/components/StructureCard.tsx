import { motion } from "framer-motion";
import { Activity, Code, Book, Award } from "lucide-react";
import { DataStructureInfo } from "@data/structures";

interface StructureCardProps {
	structure: DataStructureInfo;
	onLearnClick: () => void;
	onVisualizeClick: () => void;
	onQuizClick: () => void;
}

export default function StructureCard({
	structure,
	onLearnClick,
	onVisualizeClick,
	onQuizClick,
}: StructureCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			whileHover={{ y: -5 }}
			className={`card-base group overflow-hidden`}
		>
			{/* Header with gradient */}
			<div
				className={`bg-gradient-to-r ${structure.color} h-12 mb-4 rounded-lg flex items-center px-4 gap-2 text-white font-bold text-lg`}
			>
				<span className="text-2xl">{structure.icon}</span>
				{structure.name}
			</div>

			{/* Description */}
			<p className="text-slate-300 text-sm mb-4 line-clamp-3">{structure.description}</p>

			{/* Complexity badges */}
			<div className="mb-4 grid grid-cols-2 gap-2">
				{Object.entries(structure.complexity).map(([key, value]) => (
					<div
						key={key}
						className="bg-slate-700/50 rounded px-2 py-1 text-xs text-slate-300 flex justify-between"
					>
						<span className="capitalize">{key}:</span>
						<code className="font-mono font-bold text-blue-300">{value}</code>
					</div>
				))}
			</div>

			{/* Real-world uses */}
			<div className="mb-4">
				<h4 className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-1">
					<Activity size={14} />
					Real-World Uses
				</h4>
				<ul className="text-xs text-slate-400 space-y-1">
					{structure.realWorldUses.slice(0, 3).map((use, idx) => (
						<li key={idx} className="line-clamp-1">
							• {use}
						</li>
					))}
				</ul>
			</div>

			{/* Action buttons */}
			<div className="grid grid-cols-3 gap-2 mt-6">
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onLearnClick}
					className="btn-secondary text-sm py-2 px-2 rounded-lg flex items-center justify-center gap-1 min-h-10"
					title="Learn theory"
				>
					<Book size={14} />
					<span className="hidden sm:inline">Learn</span>
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onVisualizeClick}
					className="btn-primary text-sm py-2 px-2 rounded-lg flex items-center justify-center gap-1 min-h-10"
					title="Interactive visualizer"
				>
					<Code size={14} />
					<span className="hidden sm:inline">Viz</span>
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onQuizClick}
					className="btn-secondary text-sm py-2 px-2 rounded-lg flex items-center justify-center gap-1 min-h-10"
					title="Test your knowledge"
				>
					<Award size={14} />
					<span className="hidden sm:inline">Quiz</span>
				</motion.button>
			</div>
		</motion.div>
	);
}
