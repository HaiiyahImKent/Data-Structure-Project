import { motion } from "framer-motion";

interface StackVisualizerProps {
	items: number[];
	topIndex: number;
}

export default function StackVisualizer({ items, topIndex }: StackVisualizerProps) {
	return (
		<motion.div className="flex flex-col-reverse items-center justify-start gap-2 p-4 bg-slate-800/50 rounded-lg min-w-48 max-h-80 overflow-y-auto">
			{items.map((item, index) => (
				<motion.div
					key={`${item}-${index}`}
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
					{index === items.length - 1 && index !== topIndex && (
						<span className="absolute -right-16 text-sm text-green-400 font-semibold whitespace-nowrap">
							← BOTTOM
						</span>
					)}
				</motion.div>
			))}
			{items.length === 0 && (
				<div className="flex items-center justify-center w-full py-12 text-slate-500">
					<p>Stack is empty</p>
				</div>
			)}
		</motion.div>
	);
}
