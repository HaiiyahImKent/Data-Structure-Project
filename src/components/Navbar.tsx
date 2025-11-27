import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@store/themeStore";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const { isDark, toggleTheme } = useTheme();

	return (
		<nav className="sticky top-0 z-50 glass-dark border-b border-slate-700/50">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					<Link to="/" className="flex items-center gap-2 group">
						<div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-white">
							AV
						</div>
						<span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-cyan-300 transition">
							AlgoVisual
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-1">
						<Link
							to="/"
							className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-700/50 transition"
						>
							Home
						</Link>
						<a
							href="#structures"
							className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-700/50 transition"
						>
							Learn
						</a>
						<a
							href="#learn"
							className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-700/50 transition"
						>
							Visualize
						</a>
						<div className="border-l border-slate-700 mx-2"></div>
						<button
							onClick={toggleTheme}
							className="p-2 rounded-lg hover:bg-slate-700/50 transition"
							aria-label="Toggle theme"
						>
							{isDark ? <Sun size={20} /> : <Moon size={20} />}
						</button>
					</div>

					{/* Mobile Navigation */}
					<div className="md:hidden flex items-center gap-2">
						<button
							onClick={toggleTheme}
							className="p-2 rounded-lg hover:bg-slate-700/50 transition"
							aria-label="Toggle theme"
						>
							{isDark ? <Sun size={20} /> : <Moon size={20} />}
						</button>
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="p-2 rounded-lg hover:bg-slate-700/50 transition"
							aria-label="Toggle menu"
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isOpen && (
					<div className="md:hidden border-t border-slate-700/50">
						<div className="px-4 py-2 space-y-1">
							<Link
								to="/"
								className="block px-3 py-2 rounded-lg hover:bg-slate-700/50 transition"
								onClick={() => setIsOpen(false)}
							>
								Home
							</Link>
							<a
								href="#structures"
								className="block px-3 py-2 rounded-lg hover:bg-slate-700/50 transition"
								onClick={() => setIsOpen(false)}
							>
								Structures
							</a>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
