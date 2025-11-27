import { motion } from "framer-motion";

interface StackVisualizerProps {
	items: number[];
	topIndex: number;
}

export default function StackVisualizer({ items, topIndex }: StackVisualizerProps) {
	return (
		<motion.div className="flex flex-col-reverse items-center justify-end h-80 gap-2 p-4 bg-slate-800/50 rounded-lg min-w-48">
			{items.map((item, index) => (
				<motion.div
					key={`${index}-${item}`}
					layout
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 20 }}
					className={`w-40 py-4 rounded-lg flex items-center justify-center font-bold text-white shadow-lg border-2 relative ${
						index === topIndex
							? "bg-gradient-to-r from-blue-500 to-cyan-500 border-cyan-300 ring-2 ring-cyan-400"
							: "bg-slate-700 border-slate-600"
					}`}
				>
					{item}
					{index === topIndex && (
						<span className="absolute -right-12 text-sm text-yellow-400 font-semibold whitespace-nowrap">
							← TOP
						</span>
					)}
				</motion.div>
			))}
			{items.length === 0 && (
				<div className="flex items-center justify-center w-full h-full text-slate-500">
					<p>Stack is empty</p>
				</div>
			)}
		</motion.div>
	);
}
