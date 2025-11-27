import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { initializeTheme } from "@store/themeStore";

const HomePage = lazy(() => import("@pages/HomePage"));
const LearnPage = lazy(() => import("@pages/LearnPage"));
const VisualizePage = lazy(() => import("@pages/VisualizePage"));
const QuizPage = lazy(() => import("@pages/QuizPage"));

const LoadingFallback = () => (
	<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
		<div className="text-center">
			<div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
			<p className="text-gray-300">Loading...</p>
		</div>
	</div>
);

function App() {
	useEffect(() => {
		initializeTheme();
	}, []);

	return (
		<BrowserRouter>
			<div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white">
				<Navbar />
				<main className="flex-grow">
					<Suspense fallback={<LoadingFallback />}>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/learn/:structureId" element={<LearnPage />} />
							<Route path="/visualize/:structureId" element={<VisualizePage />} />
							<Route path="/quiz/:structureId" element={<QuizPage />} />
						</Routes>
					</Suspense>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
