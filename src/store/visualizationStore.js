import { create } from "zustand";
export const useVisualization = create((set, get) => ({
    operations: [],
    isAnimating: false,
    animationSpeed: 1,
    algorithmSteps: [],
    currentStepIndex: 0,
    history: [[]],
    historyIndex: 0,
    addOperation: (operation) => set((state) => {
        const newOperations = [...state.operations, operation];
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(newOperations);
        return {
            operations: newOperations,
            history: newHistory,
            historyIndex: newHistory.length - 1,
        };
    }),
    clearOperations: () => set(() => ({
        operations: [],
        history: [[]],
        historyIndex: 0,
    })),
    setAnimating: (animating) => set(() => ({ isAnimating: animating })),
    setAnimationSpeed: (speed) => set(() => ({ animationSpeed: Math.max(0.5, Math.min(2, speed)) })),
    setAlgorithmSteps: (steps) => set(() => ({
        algorithmSteps: steps,
        currentStepIndex: 0,
    })),
    setCurrentStepIndex: (index) => {
        const state = get();
        const validIndex = Math.max(0, Math.min(index, state.algorithmSteps.length - 1));
        set(() => ({ currentStepIndex: validIndex }));
    },
    clearAlgorithmSteps: () => set(() => ({
        algorithmSteps: [],
        currentStepIndex: 0,
    })),
    nextStep: () => {
        const state = get();
        if (state.currentStepIndex < state.algorithmSteps.length - 1) {
            set(() => ({ currentStepIndex: state.currentStepIndex + 1 }));
        }
    },
    previousStep: () => {
        const state = get();
        if (state.currentStepIndex > 0) {
            set(() => ({ currentStepIndex: state.currentStepIndex - 1 }));
        }
    },
    undoLastOperation: () => set((state) => {
        if (state.historyIndex > 0) {
            const newIndex = state.historyIndex - 1;
            return {
                historyIndex: newIndex,
                operations: state.history[newIndex],
            };
        }
        return state;
    }),
    redoLastOperation: () => set((state) => {
        if (state.historyIndex < state.history.length - 1) {
            const newIndex = state.historyIndex + 1;
            return {
                historyIndex: newIndex,
                operations: state.history[newIndex],
            };
        }
        return state;
    }),
}));
