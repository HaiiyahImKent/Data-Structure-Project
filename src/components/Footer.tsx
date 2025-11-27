export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mt-12 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
					<div>
						<h3 className="font-bold text-lg mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
							AlgoVisual
						</h3>
						<p className="text-sm text-slate-400">
							Interactive data structures visualization platform for learners and
							educators.
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-3">Resources</h4>
						<ul className="space-y-2 text-sm text-slate-400">
							<li>
								<a href="#" className="hover:text-blue-400 transition">
									Documentation
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-blue-400 transition">
									API Reference
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-blue-400 transition">
									GitHub
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-3">Legal</h4>
						<ul className="space-y-2 text-sm text-slate-400">
							<li>
								<a href="#" className="hover:text-blue-400 transition">
									Privacy Policy
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-blue-400 transition">
									Terms of Service
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-slate-700/50 pt-8 text-center text-sm text-slate-500">
					<p>
						© {currentYear} AlgoVisual. Built with React, Vite, and TypeScript. All
						rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
