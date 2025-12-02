import { motion } from "framer-motion";
import { BookOpen, Zap, Target, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function GettingStartedPage() {
	const steps = [
		{
			icon: <Zap className="w-8 h-8" />,
			title: "Select a Data Structure",
			description:
				"Choose from 8 fundamental data structures (Array, Stack, Queue, Linked List, Tree, Graph, Heap, Hash Table)",
		},
		{
			icon: <Target className="w-8 h-8" />,
			title: "Explore with Visualizer",
			description:
				"Watch real-time animations as you perform operations. See how data moves, reorganizes, and evolves.",
		},
		{
			icon: <CheckCircle className="w-8 h-8" />,
			title: "Learn the Concepts",
			description:
				"Read detailed explanations of time/space complexity, use cases, and implementation strategies.",
		},
		{
			icon: <BookOpen className="w-8 h-8" />,
			title: "Test Your Knowledge",
			description:
				"Take interactive quizzes to solidify your understanding and track your progress.",
		},
	];

	const quickTips = [
		{
			title: "Use Playback Controls",
			description:
				"Pause, play, and step through algorithms at your own pace. Adjust animation speed for comfort.",
		},
		{
			title: "Check Operation Logs",
			description:
				"Every action is logged. Review what happened in the Operation Log sidebar for clarity.",
		},
		{
			title: "Read Complexity Info",
			description:
				"See time & space complexity for each operation. Understand the trade-offs of each structure.",
		},
		{
			title: "Experiment Freely",
			description:
				"No limits—try adding/removing elements, use Random Data, or Clear All to start fresh.",
		},
	];

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
		>
			{/* Hero */}
			<section className="container mx-auto px-4 py-20">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center max-w-3xl mx-auto mb-16"
				>
					<h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
						Getting Started
					</h1>
					<p className="text-xl text-slate-300 mb-2">
						Master data structures through interactive visualization and hands-on
						learning.
					</p>
				</motion.div>

				{/* 4-Step Journey */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
					{steps.map((step, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.1 }}
							className="group relative"
						>
							<div className="card-base p-6 h-full bg-gradient-to-br from-slate-800/60 to-slate-900/40 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
								<div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
									{i + 1}
								</div>
								<div className="mb-4 text-cyan-400 group-hover:text-blue-400 transition-colors">
									{step.icon}
								</div>
								<h3 className="text-lg font-bold mb-2">{step.title}</h3>
								<p className="text-sm text-slate-400">{step.description}</p>
							</div>
						</motion.div>
					))}
				</div>

				{/* CTA */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.4 }}
					className="text-center mb-20"
				>
					<Link
						to="/learn/array"
						className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-lg shadow-lg shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
					>
						Start Learning <ArrowRight size={20} />
					</Link>
				</motion.div>
			</section>

			{/* Quick Tips */}
			<section className="bg-slate-900/50 border-y border-slate-700/50 py-20">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl font-bold mb-2">Quick Tips for Success</h2>
						<p className="text-slate-400">
							Make the most of AlgoVisual with these helpful pointers.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{quickTips.map((tip, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: i * 0.1 }}
								className="card-base p-6 bg-gradient-to-r from-slate-800/40 to-slate-900/40 border border-slate-700/50 hover:border-green-500/50 transition-all duration-300"
							>
								<h3 className="text-lg font-bold mb-2 text-green-400">
									{tip.title}
								</h3>
								<p className="text-slate-300">{tip.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* FAQ-style Section */}
			<section className="container mx-auto px-4 py-20">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl font-bold mb-2">Common Questions</h2>
				</motion.div>

				<div className="max-w-2xl mx-auto space-y-6">
					{[
						{
							q: "Do I need prior programming experience?",
							a: "Not necessarily! AlgoVisual is designed for beginners and experienced developers alike. Start with the Learn page for foundations.",
						},
						{
							q: "Can I use AlgoVisual on mobile?",
							a: "Yes, AlgoVisual is fully responsive. However, desktop offers a better experience for complex visualizations.",
						},
						{
							q: "Is there a way to export or save my progress?",
							a: "Currently, visualizations are session-based. We're working on persistence features for future releases.",
						},
						{
							q: "How do I report a bug or suggest a feature?",
							a: "Visit our GitHub repository or contact us through the footer links. We'd love your feedback!",
						},
					].map((faq, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: i * 0.1 }}
							className="card-base p-6 bg-slate-800/40 border border-slate-700/50"
						>
							<h3 className="text-lg font-bold mb-2 text-blue-400">{faq.q}</h3>
							<p className="text-slate-300">{faq.a}</p>
						</motion.div>
					))}
				</div>
			</section>
		</motion.div>
	);
}
