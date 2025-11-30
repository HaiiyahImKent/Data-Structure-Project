import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Code2 } from "lucide-react";
import { CODE_IMPLEMENTATIONS, CodeImplementation } from "../data/codeImplementations";

interface CodeDisplayProps {
	structureId: string;
	title?: string;
}

const languageColors: Record<string, { bg: string; text: string; border: string }> = {
	typescript: {
		bg: "from-blue-600 to-blue-700",
		text: "text-blue-100",
		border: "border-blue-500",
	},
	javascript: {
		bg: "from-yellow-500 to-yellow-600",
		text: "text-yellow-100",
		border: "border-yellow-500",
	},
	java: {
		bg: "from-orange-600 to-orange-700",
		text: "text-orange-100",
		border: "border-orange-500",
	},
	csharp: {
		bg: "from-purple-600 to-purple-700",
		text: "text-purple-100",
		border: "border-purple-500",
	},
	cpp: { bg: "from-red-600 to-red-700", text: "text-red-100", border: "border-red-500" },
	php: {
		bg: "from-indigo-600 to-indigo-700",
		text: "text-indigo-100",
		border: "border-indigo-500",
	},
};

const CodeDisplay: React.FC<CodeDisplayProps> = ({ structureId, title }) => {
	const [selectedLanguage, setSelectedLanguage] = useState<string>("typescript");
	const [copied, setCopied] = useState<boolean>(false);

	const implementations = CODE_IMPLEMENTATIONS[structureId as keyof typeof CODE_IMPLEMENTATIONS];

	if (!implementations) {
		return null;
	}

	const currentCode = implementations[selectedLanguage as keyof typeof implementations] as
		| CodeImplementation
		| undefined;

	if (!currentCode) {
		return null;
	}

	const languages = Object.keys(implementations);
	const langColors = languageColors[selectedLanguage] || languageColors.typescript;

	const handleCopyCode = () => {
		navigator.clipboard.writeText(currentCode.code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="card-base overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm"
		>
			{/* Header */}
			{title && (
				<div className="pb-4 border-b border-slate-700/50">
					<div className="flex items-center gap-2">
						<motion.div
							animate={{ rotate: [0, 360] }}
							transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
						>
							<Code2 size={20} className="text-blue-400" />
						</motion.div>
						<h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
							{title}
						</h3>
					</div>
				</div>
			)}

			<div className="p-4 space-y-4">
				{/* Language Selector with Enhanced UI */}
				<div className="space-y-2">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
						Select Language
					</p>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2">
						{languages.map((lang) => (
							<motion.button
								key={lang}
								layoutId={`lang-${lang}`}
								onClick={() => setSelectedLanguage(lang)}
								whileHover={{ y: -2 }}
								whileTap={{ scale: 0.95 }}
								className={`relative px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 overflow-hidden ${
									selectedLanguage === lang
										? `bg-gradient-to-r ${langColors.bg} ${langColors.text} shadow-lg shadow-blue-500/50 ring-2 ring-blue-400/50`
										: "bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-slate-100 border border-slate-600/50 hover:border-slate-500"
								}`}
							>
								{selectedLanguage === lang && (
									<motion.div
										layoutId="active-lang"
										className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
										initial={false}
										transition={{ duration: 0.5 }}
									/>
								)}
								<span className="relative z-10">
									{lang.charAt(0).toUpperCase() + lang.slice(1)}
								</span>
							</motion.button>
						))}
					</div>
				</div>

				{/* Code Display Section */}
				<AnimatePresence mode="wait">
					<motion.div
						key={selectedLanguage}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className={`relative bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl border border-slate-700/50 overflow-hidden group shadow-2xl`}
					>
						{/* Code Header Background */}
						<div
							className={`h-2 w-full bg-gradient-to-r ${langColors.bg}`}
							style={{ opacity: 0.8 }}
						/>

						{/* Copy Button */}
						<motion.button
							whileHover={{ scale: 1.08 }}
							whileTap={{ scale: 0.95 }}
							onClick={handleCopyCode}
							className={`absolute top-4 right-4 z-20 px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
								copied
									? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50"
									: `bg-gradient-to-r ${langColors.bg} text-white shadow-lg opacity-0 group-hover:opacity-100`
							}`}
							title="Copy code"
						>
							{copied ? (
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ duration: 0.3 }}
									className="flex items-center gap-2"
								>
									<Check size={18} />
									<span>Copied!</span>
								</motion.div>
							) : (
								<motion.div
									className="flex items-center gap-2"
									whileHover={{ x: 2 }}
								>
									<Copy size={18} />
									<span className="hidden sm:inline">Copy</span>
								</motion.div>
							)}
						</motion.button>

						{/* Code Content */}
						<div className="p-5 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
							<pre className="text-slate-100 text-sm font-mono leading-relaxed tracking-tight">
								<code>{currentCode.code}</code>
							</pre>
						</div>

						{/* Bottom Gradient Accent */}
						<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
					</motion.div>
				</AnimatePresence>

				{/* Language Info Footer */}
				<div className="flex items-center justify-between pt-2">
					<div className="space-y-1">
						<p className="text-xs text-slate-500">Current Language</p>
						<p
							className={`text-sm font-semibold bg-gradient-to-r ${langColors.bg} bg-clip-text text-transparent`}
						>
							{currentCode.language}
						</p>
					</div>
					<div className="text-right space-y-1">
						<p className="text-xs text-slate-500">Lines of Code</p>
						<p className="text-sm font-semibold text-blue-400">
							{currentCode.code.split("\n").length}
						</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default CodeDisplay;
