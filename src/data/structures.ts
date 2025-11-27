export interface DataStructureInfo {
	id: string;
	name: string;
	shortName: string;
	description: string;
	icon: string;
	color: string;
	gradient: string;
	complexity: {
		access: string;
		search: string;
		insertion: string;
		deletion: string;
	};
	realWorldUses: string[];
	visualization: string;
	codeSnippet: string;
}

export const DATA_STRUCTURES: DataStructureInfo[] = [
	{
		id: "array",
		name: "Array",
		shortName: "Array",
		description:
			"A collection of elements stored in contiguous memory locations, accessible by index.",
		icon: "📦",
		color: "from-blue-500 to-blue-600",
		gradient: "from-blue-400/20 to-blue-600/20",
		complexity: {
			access: "O(1)",
			search: "O(n)",
			insertion: "O(n)",
			deletion: "O(n)",
		},
		realWorldUses: [
			"Image/Video storage",
			"Database indexing",
			"Stack implementation",
			"Queue implementation",
			"Dynamic arrays (ArrayList, Vector)",
		],
		visualization: "Linear blocks connected with indices",
		codeSnippet: `
const array: number[] = [10, 20, 30, 40, 50];
array.push(60);          // O(n) - amortized O(1)
array.pop();             // O(1)
const element = array[2]; // O(1) - access by index
array.splice(1, 1);      // O(n) - remove element at index
    `.trim(),
	},
	{
		id: "stack",
		name: "Stack",
		shortName: "Stack",
		description:
			"LIFO (Last In First Out) data structure where elements are added and removed from the same end.",
		icon: "📚",
		color: "from-purple-500 to-purple-600",
		gradient: "from-purple-400/20 to-purple-600/20",
		complexity: {
			access: "O(1)",
			search: "O(n)",
			insertion: "O(1)",
			deletion: "O(1)",
		},
		realWorldUses: [
			"Browser back button",
			"Undo/Redo functionality",
			"Expression evaluation",
			"Function call stack",
			"Backtracking algorithms",
		],
		visualization: "Vertical stack of cards",
		codeSnippet: `
class Stack<T> {
  private items: T[] = [];
  
  push(element: T): void { this.items.push(element); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
  isEmpty(): boolean { return this.items.length === 0; }
  size(): number { return this.items.length; }
}
    `.trim(),
	},
	{
		id: "queue",
		name: "Queue",
		shortName: "Queue",
		description:
			"FIFO (First In First Out) data structure where elements are added at the rear and removed from the front.",
		icon: "🚦",
		color: "from-green-500 to-green-600",
		gradient: "from-green-400/20 to-green-600/20",
		complexity: {
			access: "O(n)",
			search: "O(n)",
			insertion: "O(1)",
			deletion: "O(1)",
		},
		realWorldUses: [
			"Print job scheduling",
			"CPU task scheduling",
			"BFS in graphs",
			"Customer service queues",
			"Message brokers",
		],
		visualization: "Horizontal queue with front and rear pointers",
		codeSnippet: `
class Queue<T> {
  private items: T[] = [];
  
  enqueue(element: T): void { this.items.push(element); }
  dequeue(): T | undefined { return this.items.shift(); }
  front(): T | undefined { return this.items[0]; }
  isEmpty(): boolean { return this.items.length === 0; }
  size(): number { return this.items.length; }
}
    `.trim(),
	},
	{
		id: "linked-list",
		name: "Linked List",
		shortName: "Linked List",
		description:
			"A linear collection of nodes where each node contains data and a reference to the next node.",
		icon: "🔗",
		color: "from-orange-500 to-orange-600",
		gradient: "from-orange-400/20 to-orange-600/20",
		complexity: {
			access: "O(n)",
			search: "O(n)",
			insertion: "O(1)",
			deletion: "O(1)",
		},
		realWorldUses: [
			"Image viewer (previous/next)",
			"Music player playlists",
			"LRU cache",
			"Polynomial representation",
			"Hash table chaining",
		],
		visualization: "Nodes connected with arrows",
		codeSnippet: `
interface Node<T> {
  data: T;
  next: Node<T> | null;
}

class LinkedList<T> {
  private head: Node<T> | null = null;
  
  append(data: T): void { /* implementation */ }
  remove(data: T): void { /* implementation */ }
  traverse(): T[] { /* implementation */ }
}
    `.trim(),
	},
	{
		id: "tree",
		name: "Binary Tree / BST",
		shortName: "Tree",
		description:
			"Hierarchical structure where each node has at most two children. BST maintains ordered property.",
		icon: "🌳",
		color: "from-emerald-500 to-emerald-600",
		gradient: "from-emerald-400/20 to-emerald-600/20",
		complexity: {
			access: "O(log n) avg, O(n) worst",
			search: "O(log n) avg, O(n) worst",
			insertion: "O(log n) avg, O(n) worst",
			deletion: "O(log n) avg, O(n) worst",
		},
		realWorldUses: [
			"Database indexing",
			"File systems",
			"Expression parsing",
			"Auto-complete systems",
			"Huffman coding",
		],
		visualization: "Hierarchical tree structure with parent-child relationships",
		codeSnippet: `
interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

class BinarySearchTree {
  insert(value: number): void { /* implementation */ }
  search(value: number): boolean { /* implementation */ }
  inOrderTraversal(): number[] { /* implementation */ }
}
    `.trim(),
	},
	{
		id: "graph",
		name: "Graph",
		shortName: "Graph",
		description:
			"Non-linear structure with vertices connected by edges. Can be directed or undirected.",
		icon: "🕸️",
		color: "from-pink-500 to-pink-600",
		gradient: "from-pink-400/20 to-pink-600/20",
		complexity: {
			access: "O(V + E)",
			search: "O(V + E)",
			insertion: "O(1)",
			deletion: "O(V + E)",
		},
		realWorldUses: [
			"Social networks",
			"GPS/Maps navigation",
			"Web crawlers",
			"Recommendation systems",
			"Game AI pathfinding",
		],
		visualization: "Vertices with connecting edges",
		codeSnippet: `
class Graph {
  private adjacencyList: Map<number, number[]> = new Map();
  
  addEdge(u: number, v: number): void {
    if (!this.adjacencyList.has(u)) {
      this.adjacencyList.set(u, []);
    }
    this.adjacencyList.get(u)!.push(v);
  }
  
  bfs(start: number): number[] { /* implementation */ }
  dfs(start: number): number[] { /* implementation */ }
}
    `.trim(),
	},
	{
		id: "hash-table",
		name: "Hash Table",
		shortName: "Hash Table",
		description: "Key-value pair storage using hash function for O(1) average-case access.",
		icon: "#️⃣",
		color: "from-cyan-500 to-cyan-600",
		gradient: "from-cyan-400/20 to-cyan-600/20",
		complexity: {
			access: "O(1) avg, O(n) worst",
			search: "O(1) avg, O(n) worst",
			insertion: "O(1) avg, O(n) worst",
			deletion: "O(1) avg, O(n) worst",
		},
		realWorldUses: [
			"Database indexes",
			"Cache implementation",
			"Object/Dictionary in languages",
			"Compiler symbol tables",
			"Password verification",
		],
		visualization: "Array of buckets with chaining or open addressing",
		codeSnippet: `
class HashTable<K, V> {
  private table: Map<K, V> = new Map();
  
  set(key: K, value: V): void { this.table.set(key, value); }
  get(key: K): V | undefined { return this.table.get(key); }
  delete(key: K): boolean { return this.table.delete(key); }
  has(key: K): boolean { return this.table.has(key); }
}
    `.trim(),
	},
	{
		id: "heap",
		name: "Heap",
		shortName: "Heap",
		description:
			"Complete binary tree satisfying heap property. Enables efficient priority queue operations.",
		icon: "⛰️",
		color: "from-red-500 to-red-600",
		gradient: "from-red-400/20 to-red-600/20",
		complexity: {
			access: "O(1)",
			search: "O(n)",
			insertion: "O(log n)",
			deletion: "O(log n)",
		},
		realWorldUses: [
			"Priority queues",
			"Heap sort algorithm",
			"Dijkstra's algorithm",
			"Load balancing",
			"Median finding",
		],
		visualization: "Complete binary tree in array representation",
		codeSnippet: `
class MinHeap {
  private heap: number[] = [];
  
  push(value: number): void {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }
  
  pop(): number | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.bubbleDown(0);
    return min;
  }
}
    `.trim(),
	},
];

export function getStructureById(id: string): DataStructureInfo | undefined {
	return DATA_STRUCTURES.find((ds) => ds.id === id);
}

export function getAllStructureIds(): string[] {
	return DATA_STRUCTURES.map((ds) => ds.id);
}
