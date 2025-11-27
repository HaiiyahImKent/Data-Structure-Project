import { create } from "zustand";

interface ThemeStore {
	isDark: boolean;
	toggleTheme: () => void;
}

export const useTheme = create<ThemeStore>((set) => ({
	isDark: true,
	toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));

let unsubscribeTheme: (() => void) | null = null;

export const initializeTheme = () => {
	if (typeof window === "undefined") return;
	if (unsubscribeTheme) return; // already initialized

	const applyTheme = (isDark: boolean) => {
		const method = isDark ? "add" : "remove";
		document.documentElement.classList[method]("dark");
	};

	applyTheme(useTheme.getState().isDark);
	unsubscribeTheme = useTheme.subscribe((state) => applyTheme(state.isDark));
};
