import { create } from "zustand";

export interface ArrayState {
	items: number[];
	activeIndices: number[];
	highlightedIndex: number | null;
	insertValue: number;
}

interface ArrayStore extends ArrayState {
	insert: (value: number, index?: number) => void;
	remove: (index: number) => void;
	search: (value: number) => number | null;
	sort: () => void;
	reverse: () => void;
	clear: () => void;
	setValue: (value: number) => void;
	setHighlightedIndex: (index: number | null) => void;
}

export const useArrayStore = create<ArrayStore>((set, get) => ({
	items: [10, 25, 50, 35, 75, 100],
	activeIndices: [],
	highlightedIndex: null,
	insertValue: 0,

	insert: (value: number, index?: number) =>
		set((state) => {
			const newItems = [...state.items];
			if (index !== undefined && index >= 0 && index <= newItems.length) {
				newItems.splice(index, 0, value);
			} else {
				newItems.push(value);
			}
			return { items: newItems };
		}),

	remove: (index: number) =>
		set((state) => {
			if (index >= 0 && index < state.items.length) {
				const newItems = state.items.filter((_, i) => i !== index);
				return { items: newItems };
			}
			return state;
		}),

	search: (value: number) => {
		const found = get().items.indexOf(value);
		set(() => ({ highlightedIndex: found >= 0 ? found : null }));
		return found >= 0 ? found : null;
	},

	sort: () =>
		set((state) => ({
			items: [...state.items].sort((a, b) => a - b),
		})),

	reverse: () =>
		set((state) => ({
			items: [...state.items].reverse(),
		})),

	clear: () =>
		set(() => ({
			items: [],
			activeIndices: [],
			highlightedIndex: null,
		})),

	setValue: (value: number) => set(() => ({ insertValue: value })),

	setHighlightedIndex: (index: number | null) => set(() => ({ highlightedIndex: index })),
}));

// Stack Store
export interface StackState {
	items: number[];
	topIndex: number;
	peekValue: number | null;
}

interface StackStore extends StackState {
	push: (value: number) => void;
	pop: () => number | undefined;
	peek: () => number | undefined;
	clear: () => void;
}

export const useStackStore = create<StackStore>((set, get) => ({
	items: [],
	topIndex: -1,
	peekValue: null,

	push: (value: number) =>
		set((state) => {
			const newItems = [...state.items, value];
			return {
				items: newItems,
				topIndex: newItems.length - 1,
				peekValue: value,
			};
		}),

	pop: () => {
		let popped: number | undefined;
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

	clear: () =>
		set(() => ({
			items: [],
			topIndex: -1,
			peekValue: null,
		})),
}));

// Queue Store
export interface QueueState {
	items: number[];
	frontIndex: number;
	rearIndex: number;
}

interface QueueStore extends QueueState {
	enqueue: (value: number) => void;
	dequeue: () => number | undefined;
	front: () => number | undefined;
	clear: () => void;
}

export const useQueueStore = create<QueueStore>((set, get) => ({
	items: [],
	frontIndex: 0,
	rearIndex: -1,

	enqueue: (value: number) =>
		set((state) => {
			const newItems = [...state.items, value];
			return {
				items: newItems,
				rearIndex: newItems.length - 1,
			};
		}),

	dequeue: () => {
		let dequeued: number | undefined;
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

	clear: () =>
		set(() => ({
			items: [],
			frontIndex: 0,
			rearIndex: -1,
		})),
}));

// Hash Table Store
export interface HashTableEntry {
	key: string;
	value: number;
}

interface HashTableStore {
	entries: HashTableEntry[];
	add: (key: string, value: number) => void;
	remove: (key: string) => void;
	search: (key: string) => number | null;
	clear: () => void;
}

export const useHashTableStore = create<HashTableStore>((set, get) => ({
	entries: [],

	add: (key: string, value: number) =>
		set((state) => {
			const existing = state.entries.findIndex((e) => e.key === key);
			if (existing >= 0) {
				const newEntries = [...state.entries];
				newEntries[existing] = { key, value };
				return { entries: newEntries };
			}
			return { entries: [...state.entries, { key, value }] };
		}),

	remove: (key: string) =>
		set((state) => ({
			entries: state.entries.filter((e) => e.key !== key),
		})),

	search: (key: string): number | null => {
		const entry = get().entries.find((entryItem) => entryItem.key === key);
		return entry ? entry.value : null;
	},

	clear: () => set(() => ({ entries: [] })),
}));
