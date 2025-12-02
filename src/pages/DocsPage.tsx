import { motion } from "framer-motion";
import {  Zap, TrendingUp, Clock, Database } from "lucide-react";

export default function DocsPage() {
	const sections = [
		{
			id: "array",
			title: "Array",
			icon: "📦",
			description: "A contiguous collection of elements indexed by position.",
			complexity: { access: "O(1)", search: "O(n)", insert: "O(n)", delete: "O(n)" },
			features: [
				"Random access in constant time",
				"Cache-friendly memory layout",
				"Fixed or dynamic size (depending on language)",
			],
		},
		{
			id: "stack",
			title: "Stack",
			icon: "📚",
			description: "LIFO (Last In First Out) structure for managing nested operations.",
			complexity: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
			features: [
				"Push and pop at the top",
				"Used in function call stacks",
				"Essential for undo/redo systems",
			],
		},
		{
			id: "queue",
			title: "Queue",
			icon: "🚦",
			description: "FIFO (First In First Out) structure for ordered processing.",
			complexity: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
			features: [
				"Enqueue at rear, dequeue at front",
				"Critical for task scheduling",
				"Foundation for BFS algorithms",
			],
		},
		{
			id: "linked-list",
			title: "Linked List",
			icon: "🔗",
			description: "Chain of nodes where each points to the next.",
			complexity: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
			features: [
				"Dynamic size without reallocation",
				"Efficient insertion/deletion at known positions",
				"Extra memory for pointers",
			],
		},
		{
			id: "tree",
			title: "Binary Search Tree",
			icon: "🌳",
			description: "Hierarchical structure maintaining sorted property.",
			complexity: {
				access: "O(log n) avg",
				search: "O(log n) avg",
				insert: "O(log n) avg",
				delete: "O(log n) avg",
			},
			features: [
				"Enables fast searching in sorted data",
				"Foundation for databases and file systems",
				"Can degrade to O(n) if unbalanced",
			],
		},
		{
			id: "graph",
			title: "Graph",
			icon: "🕸️",
			description: "Nodes connected by edges, representing relationships.",
			complexity: { access: "O(V+E)", search: "O(V+E)", insert: "O(1)", delete: "O(1)" },
			features: [
				"Models networks, social graphs, maps",
				"Supports directed and undirected edges",
				"Enables traversal (DFS, BFS) algorithms",
			],
		},
		{
			id: "heap",
			title: "Heap",
			icon: "📊",
			description: "Complete binary tree satisfying heap property.",
			complexity: { access: "O(1)", search: "O(n)", insert: "O(log n)", delete: "O(log n)" },
			features: [
				"Min/Max heap variants",
				"Efficient priority queue implementation",
				"Powers heap sort algorithm",
			],
		},
		{
			id: "hash-table",
			title: "Hash Table",
			icon: "🔑",
			description: "Key-value store using hash function for fast lookup.",
			complexity: {
				access: "O(1) avg",
				search: "O(1) avg",
				insert: "O(1) avg",
				delete: "O(1) avg",
			},
			features: [
				"Near-constant time operations (on average)",
				"Collision resolution strategies",
				"Foundation for dictionaries and maps",
			],
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
						Operations Reference
					</h1>
					<p className="text-xl text-slate-300">
						Deep-dive documentation on all data structures: complexities, operations,
						and real-world applications.
					</p>
				</motion.div>
			</section>

			{/* Complexity Legend */}
			<section className="bg-slate-900/50 border-y border-slate-700/50 py-12">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						{[
							{ label: "Access", icon: <Zap size={20} />, color: "text-yellow-400" },
							{
								label: "Search",
								icon: <TrendingUp size={20} />,
								color: "text-blue-400",
							},
							{
								label: "Insert",
								icon: <Database size={20} />,
								color: "text-green-400",
							},
							{ label: "Delete", icon: <Clock size={20} />, color: "text-red-400" },
						].map((op, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: i * 0.1 }}
								className="text-center"
							>
								<div className={`flex justify-center mb-2 ${op.color}`}>
									{op.icon}
								</div>
								<p className="font-semibold text-slate-200">{op.label}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Data Structures Grid */}
			<section className="container mx-auto px-4 py-20">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{sections.map((structure, i) => (
						<motion.div
							key={structure.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.05 }}
							className="card-base p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/40 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
						>
							<div className="text-4xl mb-3">{structure.icon}</div>
							<h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
								{structure.title}
							</h3>
							<p className="text-sm text-slate-400 mb-4">{structure.description}</p>

							{/* Complexity Box */}
							<div className="bg-slate-900/50 rounded p-3 mb-4 space-y-1 text-xs">
								<div className="flex justify-between">
									<span className="text-slate-400">Access:</span>
									<span className="text-yellow-400 font-mono font-bold">
										{structure.complexity.access}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-slate-400">Search:</span>
									<span className="text-blue-400 font-mono font-bold">
										{structure.complexity.search}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-slate-400">Insert:</span>
									<span className="text-green-400 font-mono font-bold">
										{structure.complexity.insert}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-slate-400">Delete:</span>
									<span className="text-red-400 font-mono font-bold">
										{structure.complexity.delete}
									</span>
								</div>
							</div>

							{/* Features */}
							<ul className="space-y-2 text-xs text-slate-300">
								{structure.features.map((feature, j) => (
									<li key={j} className="flex gap-2">
										<span className="text-cyan-400">▸</span>
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>
			</section>

			{/* Performance Comparison Table */}
			<section className="bg-slate-900/50 border-y border-slate-700/50 py-20">
				<div className="container mx-auto px-4">
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
						<h2 className="text-3xl font-bold mb-2">Performance Comparison</h2>
						<p className="text-slate-400">
							Compare time complexities across all structures at a glance.
						</p>
					</motion.div>

					<div className="overflow-x-auto">
						<table className="w-full text-sm border-collapse">
							<thead>
								<tr className="border-b border-slate-700">
									<th className="text-left p-4 font-bold text-blue-400">
										Structure
									</th>
									<th className="text-center p-4 font-bold text-yellow-400">
										Access
									</th>
									<th className="text-center p-4 font-bold text-blue-400">
										Search
									</th>
									<th className="text-center p-4 font-bold text-green-400">
										Insert
									</th>
									<th className="text-center p-4 font-bold text-red-400">
										Delete
									</th>
									<th className="text-center p-4 font-bold text-purple-400">
										Space
									</th>
								</tr>
							</thead>
							<tbody>
								{[
									{
										name: "Array",
										access: "O(1)",
										search: "O(n)",
										insert: "O(n)",
										delete: "O(n)",
										space: "O(n)",
									},
									{
										name: "Stack",
										access: "O(n)",
										search: "O(n)",
										insert: "O(1)",
										delete: "O(1)",
										space: "O(n)",
									},
									{
										name: "Queue",
										access: "O(n)",
										search: "O(n)",
										insert: "O(1)",
										delete: "O(1)",
										space: "O(n)",
									},
									{
										name: "Linked List",
										access: "O(n)",
										search: "O(n)",
										insert: "O(1)*",
										delete: "O(1)*",
										space: "O(n)",
									},
									{
										name: "BST",
										access: "O(log n)",
										search: "O(log n)",
										insert: "O(log n)",
										delete: "O(log n)",
										space: "O(n)",
									},
									{
										name: "Hash Table",
										access: "O(1)*",
										search: "O(1)*",
										insert: "O(1)*",
										delete: "O(1)*",
										space: "O(n)",
									},
									{
										name: "Heap",
										access: "O(1)",
										search: "O(n)",
										insert: "O(log n)",
										delete: "O(log n)",
										space: "O(n)",
									},
									{
										name: "Graph",
										access: "O(V)",
										search: "O(V+E)",
										insert: "O(1)",
										delete: "O(1)",
										space: "O(V+E)",
									},
								].map((row, i) => (
									<tr
										key={i}
										className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors"
									>
										<td className="text-left p-4 font-semibold">{row.name}</td>
										<td className="text-center p-4 text-yellow-400 font-mono">
											{row.access}
										</td>
										<td className="text-center p-4 text-blue-400 font-mono">
											{row.search}
										</td>
										<td className="text-center p-4 text-green-400 font-mono">
											{row.insert}
										</td>
										<td className="text-center p-4 text-red-400 font-mono">
											{row.delete}
										</td>
										<td className="text-center p-4 text-purple-400 font-mono">
											{row.space}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<p className="text-xs text-slate-400 mt-4">
						* Average case. Worst case may be O(n) due to collisions or unbalanced
						structures.
					</p>
				</div>
			</section>

			{/* Use Cases */}
			<section className="container mx-auto px-4 py-20">
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-16">
					<h2 className="text-3xl font-bold mb-2">When to Use Each Structure</h2>
					<p className="text-slate-400">Choose the right tool for your problem.</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{[
						{
							title: "Use Array When",
							items: [
								"You need fast indexed access",
								"Memory is limited (contiguous)",
								"Data is fixed-size or rarely changes",
							],
						},
						{
							title: "Use Stack When",
							items: [
								"Building undo/redo systems",
								"Parsing expressions (brackets matching)",
								"Depth-first search (DFS)",
							],
						},
						{
							title: "Use Queue When",
							items: [
								"Breadth-first search (BFS)",
								"Task scheduling",
								"Producer-consumer patterns",
							],
						},
						{
							title: "Use Linked List When",
							items: [
								"Frequent insertions/deletions",
								"Don't know size in advance",
								"Don't need random access",
							],
						},
						{
							title: "Use BST When",
							items: ["Need sorted access", "Frequent searches", "Database indexing"],
						},
						{
							title: "Use Hash Table When",
							items: [
								"Fast average-case lookup",
								"Key-value mappings",
								"Caching and memoization",
							],
						},
						{
							title: "Use Heap When",
							items: [
								"Priority queue needed",
								"Finding min/max efficiently",
								"Heap sort algorithm",
							],
						},
						{
							title: "Use Graph When",
							items: [
								"Modeling networks/relationships",
								"Finding shortest paths",
								"Social networks and maps",
							],
						},
					].map((section, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: i * 0.05 }}
							className="card-base p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50"
						>
							<h3 className="text-lg font-bold mb-4 text-green-400">
								{section.title}
							</h3>
							<ul className="space-y-3">
								{section.items.map((item, j) => (
									<li key={j} className="flex gap-2 text-slate-300">
										<span className="text-green-400 flex-shrink-0">✓</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>
			</section>
		</motion.div>
	);
}
