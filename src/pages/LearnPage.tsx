import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getStructureById } from "@data/structures";
import { AlertCircle, Code, BookOpen, Award } from "lucide-react";

export default function LearnPage() {
	const { structureId } = useParams<{ structureId: string }>();
	const structure = getStructureById(structureId || "");

	if (!structure) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="container mx-auto px-4 py-12 flex items-center justify-center min-h-96"
			>
				<div className="card-base text-center">
					<AlertCircle className="mx-auto mb-4 text-yellow-400" size={48} />
					<h1 className="text-2xl font-bold mb-2">Not Found</h1>
					<p className="text-slate-400">This data structure doesn&apos;t exist.</p>
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="container mx-auto px-4 py-12"
		>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className={`card-base mb-12 bg-gradient-to-r ${structure.gradient} border-b-2 border-blue-500`}
			>
				<div className="flex items-start justify-between mb-4">
					<div>
						<h1 className="text-5xl font-bold mb-2 flex items-center gap-3">
							<span className="text-6xl">{structure.icon}</span>
							{structure.name}
						</h1>
						<p className="text-xl text-slate-300">{structure.description}</p>
					</div>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
					{/* Overview */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="card-base"
					>
						<h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
							<BookOpen size={24} className="text-blue-400" />
							Overview
						</h2>
						<div className="space-y-4 text-slate-300">
							<p>{structure.description}</p>
							<div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-blue-500">
								<h3 className="font-semibold mb-2 text-blue-300">Key Concept:</h3>
								<p className="text-sm">{structure.visualization}</p>
							</div>
						</div>
					</motion.div>

					{/* Complexity Analysis */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="card-base"
					>
						<h2 className="text-2xl font-bold mb-4">Time Complexity</h2>
						<div className="grid grid-cols-2 gap-4">
							{Object.entries(structure.complexity).map(([op, complexity]) => (
								<div
									key={op}
									className="bg-slate-700/50 rounded-lg p-3 flex justify-between items-center"
								>
									<span className="capitalize text-slate-300">{op}:</span>
									<code className="text-sm font-mono font-bold text-cyan-300">
										{complexity}
									</code>
								</div>
							))}
						</div>
					</motion.div>

					{/* Code Implementation */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="card-base"
					>
						<h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
							<Code size={24} className="text-green-400" />
							TypeScript Implementation
						</h2>
						<pre className="bg-slate-800/80 rounded-lg p-4 overflow-x-auto text-sm text-slate-200 border border-slate-700">
							<code>{structure.codeSnippet}</code>
						</pre>
					</motion.div>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Real-World Uses */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="card-base"
					>
						<h3 className="text-xl font-bold mb-4 flex items-center gap-2">
							<Award size={20} className="text-yellow-400" />
							Real-World Uses
						</h3>
						<ul className="space-y-2">
							{structure.realWorldUses.map((use, idx) => (
								<motion.li
									key={idx}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.3 + idx * 0.05 }}
									className="flex items-start gap-2 text-slate-300"
								>
									<span className="text-blue-400 mt-1">▸</span>
									<span>{use}</span>
								</motion.li>
							))}
						</ul>
					</motion.div>

					{/* Quick Facts */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="card-base"
					>
						<h3 className="text-xl font-bold mb-4">Quick Facts</h3>
						<div className="space-y-3 text-sm">
							<div className="flex justify-between">
								<span className="text-slate-400">Best Case:</span>
								<span className="text-green-400 font-mono">
									{structure.complexity.search}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-slate-400">Average Case:</span>
								<span className="text-yellow-400 font-mono">
									{structure.complexity.insertion}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-slate-400">Worst Case:</span>
								<span className="text-red-400 font-mono">
									{structure.complexity.deletion}
								</span>
							</div>
						</div>
					</motion.div>

					{/* CTA Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className="space-y-2"
					>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="btn-primary w-full py-3 rounded-lg font-semibold"
						>
							Visualize It
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="btn-secondary w-full py-3 rounded-lg font-semibold"
						>
							Take Quiz
						</motion.button>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
}
