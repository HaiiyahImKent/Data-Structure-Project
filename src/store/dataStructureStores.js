import { create } from "zustand";
export const useArrayStore = create((set, get) => ({
    items: [10, 25, 50, 35, 75, 100],
    activeIndices: [],
    highlightedIndex: null,
    insertValue: 0,
    insert: (value, index) => set((state) => {
        const newItems = [...state.items];
        if (index !== undefined && index >= 0 && index <= newItems.length) {
            newItems.splice(index, 0, value);
        }
        else {
            newItems.push(value);
        }
        return { items: newItems };
    }),
    remove: (index) => set((state) => {
        if (index >= 0 && index < state.items.length) {
            const newItems = state.items.filter((_, i) => i !== index);
            return { items: newItems };
        }
        return state;
    }),
    search: (value) => {
        const found = get().items.indexOf(value);
        set(() => ({ highlightedIndex: found >= 0 ? found : null }));
        return found >= 0 ? found : null;
    },
    sort: () => set((state) => ({
        items: [...state.items].sort((a, b) => a - b),
    })),
    reverse: () => set((state) => ({
        items: [...state.items].reverse(),
    })),
    clear: () => set(() => ({
        items: [],
        activeIndices: [],
        highlightedIndex: null,
    })),
    setValue: (value) => set(() => ({ insertValue: value })),
    setHighlightedIndex: (index) => set(() => ({ highlightedIndex: index })),
}));
export const useStackStore = create((set, get) => ({
    items: [],
    topIndex: -1,
    peekValue: null,
    push: (value) => set((state) => {
        const newItems = [...state.items, value];
        return {
            items: newItems,
            topIndex: newItems.length - 1,
            peekValue: value,
        };
    }),
    pop: () => {
        let popped;
        set((state) => {
            if (state.items.length > 0) {
                popped = state.items[state.items.length - 1];
                const newItems = state.items.slice(0, -1);
                return {
                    items: newItems,
                    topIndex: newItems.length - 1,
                    peekValue: newItems[newItems.length - 1] || null,
                };
            }
            return state;
        });
        return popped;
    },
    peek: () => {
        const state = get();
        return state.items[state.topIndex] || undefined;
    },
    clear: () => set(() => ({
        items: [],
        topIndex: -1,
        peekValue: null,
    })),
}));
export const useQueueStore = create((set, get) => ({
    items: [],
    frontIndex: 0,
    rearIndex: -1,
    enqueue: (value) => set((state) => {
        const newItems = [...state.items, value];
        return {
            items: newItems,
            rearIndex: newItems.length - 1,
        };
    }),
    dequeue: () => {
        let dequeued;
        set((state) => {
            if (state.items.length > 0) {
                dequeued = state.items[0];
                return {
                    items: state.items.slice(1),
                    frontIndex: 0,
                    rearIndex: Math.max(-1, state.items.length - 2),
                };
            }
            return state;
        });
        return dequeued;
    },
    front: () => {
        const state = get();
        return state.items[0] || undefined;
    },
    clear: () => set(() => ({
        items: [],
        frontIndex: 0,
        rearIndex: -1,
    })),
}));
export const useHashTableStore = create((set, get) => ({
    entries: [],
    add: (key, value) => set((state) => {
        const existing = state.entries.findIndex((e) => e.key === key);
        if (existing >= 0) {
            const newEntries = [...state.entries];
            newEntries[existing] = { key, value };
            return { entries: newEntries };
        }
        return { entries: [...state.entries, { key, value }] };
    }),
    remove: (key) => set((state) => ({
        entries: state.entries.filter((e) => e.key !== key),
    })),
    search: (key) => {
        const entry = get().entries.find((entryItem) => entryItem.key === key);
        return entry ? entry.value : null;
    },
    clear: () => set(() => ({ entries: [] })),
}));
