import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { initializeTheme } from "@store/themeStore";
const HomePage = lazy(() => import("@pages/HomePage"));
const LearnPage = lazy(() => import("@pages/LearnPage"));
const VisualizePage = lazy(() => import("@pages/VisualizePage"));
const QuizPage = lazy(() => import("@pages/QuizPage"));
const GettingStartedPage = lazy(() => import("@pages/GettingStartedPage"));
const DocsPage = lazy(() => import("@pages/DocsPage"));
const ExplorePage = lazy(() => import("@pages/ExplorePage"));
const LoadingFallback = () => (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" }), _jsx("p", { className: "text-gray-300", children: "Loading..." })] }) }));
function App() {
    useEffect(() => {
        initializeTheme();
    }, []);
    return (_jsx(BrowserRouter, { children: _jsxs("div", { className: "flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-grow", children: _jsx(Suspense, { fallback: _jsx(LoadingFallback, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/guides/getting-started", element: _jsx(GettingStartedPage, {}) }), _jsx(Route, { path: "/docs/operations", element: _jsx(DocsPage, {}) }), _jsx(Route, { path: "/explore/visualization-controls", element: _jsx(ExplorePage, {}) }), _jsx(Route, { path: "/learn/:structureId", element: _jsx(LearnPage, {}) }), _jsx(Route, { path: "/visualize/:structureId", element: _jsx(VisualizePage, {}) }), _jsx(Route, { path: "/quiz/:structureId", element: _jsx(QuizPage, {}) })] }) }) }), _jsx(Footer, {})] }) }));
}
export default App;
