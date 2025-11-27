import { create } from "zustand";
export const useTheme = create((set) => ({
    isDark: true,
    toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));
let unsubscribeTheme = null;
export const initializeTheme = () => {
    if (typeof window === "undefined")
        return;
    if (unsubscribeTheme)
        return; // already initialized
    const applyTheme = (isDark) => {
        const method = isDark ? "add" : "remove";
        document.documentElement.classList[method]("dark");
    };
    applyTheme(useTheme.getState().isDark);
    unsubscribeTheme = useTheme.subscribe((state) => applyTheme(state.isDark));
};
