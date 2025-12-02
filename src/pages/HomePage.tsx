import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { DATA_STRUCTURES } from "@data/structures";
import StructureCard from "@components/StructureCard";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
	const navigate = useNavigate();
	const [selectedCategory, setSelectedCategory] = useState("all");
	const documentationSectionRef = useRef<HTMLDivElement | null>(null);

	const documentationResources = [
		{
			title: "Getting Started",
			description: "Understand the AlgoVisual experience and navigation tips",
			badge: "Basics",
			cta: "View guide",
			href: "/guides/getting-started",
			disabled: false,
		},
		{
			title: "Operations Reference",
			description: "In-depth look at operations, complexities, and animations",
			badge: "Deep Dive",
			cta: "Read docs",
			href: "/docs/operations",
			disabled: false,
		},
		{
			title: "Visualization Controls",
			description: "Learn how to drive the timeline, playback, and logging tools",
			badge: "How-To",
			cta: "Explore",
			href: "/explore/visualization-controls",
			disabled: false,
		},
		{
			title: "API & Data",
			description: "Hook into datasets and extend visualizations for projects",
			badge: "Advanced",
			cta: "Integrate",
			href: null,
			disabled: true,
			disabledLabel: "Coming soon",
		},
	];

	const categories = [
		{ id: "all", label: "All Structures" },
		{ id: "linear", label: "Linear" },
		{ id: "tree", label: "Trees" },
		{ id: "graph", label: "Graphs" },
		{ id: "hash", label: "Hash" },
	];

	const getCategoryId = (id: string): string => {
		if (id === "array" || id === "stack" || id === "queue" || id === "linked-list")
			return "linear";
		if (id === "tree") return "tree";
		if (id === "graph") return "graph";
		if (id === "hash-table" || id === "heap") return "hash";
		return "all";
	};

	const filteredStructures =
		selectedCategory === "all"
			? DATA_STRUCTURES
			: DATA_STRUCTURES.filter((ds) => getCategoryId(ds.id) === selectedCategory);

	const scrollToDocumentation = () => {
		if (documentationSectionRef.current) {
			documentationSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen">
			{/* Hero Section */}
			<section className="relative overflow-hidden py-32">
				<div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-slate-900 to-slate-900"></div>{" "}
				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="text-center max-w-3xl mx-auto mb-12"
					>
						<div className="flex items-center justify-center gap-2 mb-6">
							<span className="badge">Learn Data Structures</span>
						</div>
						<h1 className="text-7xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent leading-tight">
							AlgoVisual
						</h1>{" "}
						<p className="text-xl text-slate-300 mb-8">
							Master fundamental data structures through interactive visualizations,
							step-by-step animations, and hands-on learning
						</p>
						<div className="flex gap-4 justify-center flex-wrap">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="btn-primary text-lg px-8 py-3"
								onClick={() => navigate("/learn/array")}
							>
								Start Learning
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="btn-secondary text-lg px-8 py-3"
								onClick={scrollToDocumentation}
							>
								Documentation
							</motion.button>
						</div>
					</motion.div>

					{/* Stats */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="grid grid-cols-1 md:grid-cols-3 gap-4"
					>
						{[
							{ label: "8+ Data Structures", value: "Complete Coverage" },
							{ label: "50+ Algorithms", value: "Step-by-Step" },
							{ label: "Interactive", value: "Real-Time Viz" },
						].map((stat, idx) => (
							<motion.div
								key={idx}
								whileHover={{ scale: 1.02 }}
								className="card-base text-center"
							>
								<div className="text-2xl font-bold text-blue-400">{stat.label}</div>
								<div className="text-slate-400 text-sm">{stat.value}</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Category Filter */}
			<section className="container mx-auto px-4 py-8">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
					className="flex gap-2 justify-center flex-wrap"
				>
					{categories.map((cat) => (
						<motion.button
							key={cat.id}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setSelectedCategory(cat.id)}
							className={`px-6 py-2 rounded-full font-semibold transition ${
								selectedCategory === cat.id
									? "btn-primary"
									: "btn-secondary hover:bg-slate-600"
							}`}
						>
							{cat.label}
						</motion.button>
					))}
				</motion.div>
			</section>

			{/* Structures Grid */}
			<section className="container mx-auto px-4 py-12">
				<motion.h2
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-3xl font-bold mb-8 text-center"
				>
					Data Structures
				</motion.h2>

				<motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredStructures.map((structure, idx) => (
						<motion.div
							key={structure.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.05 }}
						>
							<StructureCard
								structure={structure}
								onLearnClick={() => navigate(`/learn/${structure.id}`)}
								onVisualizeClick={() => navigate(`/visualize/${structure.id}`)}
								onQuizClick={() => navigate(`/quiz/${structure.id}`)}
							/>
						</motion.div>
					))}
				</motion.div>
			</section>

			{/* Documentation Section */}
			<section
				ref={documentationSectionRef}
				className="container mx-auto px-4 py-12"
				id="documentation"
			>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-8"
				>
					<p className="text-sm uppercase tracking-[0.3em] text-blue-400 mb-2">
						Documentation
					</p>
					<h2 className="text-3xl font-bold mb-3">Guided knowledge base</h2>
					<p className="text-slate-400 max-w-2xl mx-auto">
						Dive deeper with curated documentation covering platform usage, data
						structure theory, and integrations.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
				>
					{documentationResources.map((resource, idx) => (
						<motion.article
							key={resource.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.05 }}
							className={`card-base h-full flex flex-col justify-between border border-slate-700/40 ${
								resource.disabled ? "opacity-60" : "hover:border-blue-500/60"
							}`}
						>
							<div>
								<span className="text-xs font-semibold tracking-wide uppercase text-blue-300">
									{resource.badge}
								</span>
								<h3 className="text-xl font-semibold mt-2 mb-3">
									{resource.title}
								</h3>
								<p className="text-slate-400 text-sm">{resource.description}</p>
							</div>
							{!resource.disabled ? (
								<button
									onClick={() => resource.href && navigate(resource.href)}
									className="mt-6 text-sm font-semibold text-blue-400 hover:text-blue-200 flex items-center gap-2"
								>
									{resource.cta}
									<span aria-hidden="true">→</span>
								</button>
							) : (
								<button
									disabled
									className="mt-6 text-sm font-semibold text-slate-500 cursor-not-allowed flex items-center gap-2"
								>
									{resource.disabledLabel}
									<span aria-hidden="true">→</span>
								</button>
							)}
						</motion.article>
					))}
				</motion.div>
			</section>

			{/* Features Section */}
			<section className="py-16 border-t border-slate-700/50">
				<div className="container mx-auto px-4">
					<motion.h2
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-3xl font-bold mb-12 text-center"
					>
						Why AlgoVisual?
					</motion.h2>

					<motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{
								icon: "🎨",
								title: "Visual Learning",
								desc: "See data structures in action with beautiful animations",
							},
							{
								icon: "⚡",
								title: "Interactive",
								desc: "Control the pace and operations with intuitive controls",
							},
							{
								icon: "📊",
								title: "Complexity Analysis",
								desc: "Understand time and space complexity of each operation",
							},
							{
								icon: "🧪",
								title: "Practice Quizzes",
								desc: "Test your understanding with interactive quizzes",
							},
						].map((feature, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.1 }}
								className="card-base text-center group hover:bg-slate-700/50"
							>
								<div className="text-4xl mb-3">{feature.icon}</div>
								<h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition">
									{feature.title}
								</h3>
								<p className="text-sm text-slate-400">{feature.desc}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>
		</motion.div>
	);
}
