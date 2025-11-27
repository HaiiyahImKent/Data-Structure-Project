export function generateRandomArray(size: number = 8, max: number = 100): number[] {
	return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}

export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateRandomColor(): string {
	const colors = [
		"bg-red-500",
		"bg-blue-500",
		"bg-green-500",
		"bg-yellow-500",
		"bg-purple-500",
		"bg-pink-500",
		"bg-indigo-500",
		"bg-cyan-500",
	];
	return colors[Math.floor(Math.random() * colors.length)];
}

export function getComplexityColor(complexity: string): string {
	if (complexity === "O(1)") return "text-green-400";
	if (complexity === "O(log n)") return "text-yellow-400";
	if (complexity === "O(n)") return "text-orange-400";
	if (complexity.includes("n²")) return "text-red-400";
	return "text-gray-400";
}

export function formatComplexity(complexity: string): string {
	return complexity.replace(/n/g, "<i>n</i>");
}

export function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value));
}

export interface TreeNodeData {
	id: string;
	value: number;
	left?: TreeNodeData;
	right?: TreeNodeData;
}

export function generateTreeData(levels: number = 3): TreeNodeData {
	const generateNode = (level: number): TreeNodeData => {
		const value = Math.floor(Math.random() * 100) + 1;
		if (level === 0) {
			return { id: `node-${Math.random()}`, value };
		}
		return {
			id: `node-${Math.random()}`,
			value,
			left: generateNode(level - 1),
			right: generateNode(level - 1),
		};
	};
	return generateNode(Math.max(1, levels) - 1);
}

export interface GraphNodeData {
	id: string;
	value: number;
	x: number;
	y: number;
}

export interface GraphEdgeData {
	from: number;
	to: number;
}

export function generateGraphData(nodeCount: number = 6): {
	nodes: GraphNodeData[];
	edges: GraphEdgeData[];
} {
	const nodes: GraphNodeData[] = Array.from({ length: nodeCount }, (_, i) => ({
		id: `node-${i}`,
		value: i + 1,
		x: Math.cos((i / nodeCount) * Math.PI * 2) * 150 + 200,
		y: Math.sin((i / nodeCount) * Math.PI * 2) * 150 + 200,
	}));

	const edges: GraphEdgeData[] = [];
	for (let i = 0; i < nodeCount; i++) {
		const connections = Math.floor(Math.random() * 3) + 1;
		for (let j = 0; j < connections; j++) {
			const target = Math.floor(Math.random() * nodeCount);
			if (target !== i) {
				edges.push({ from: i, to: target });
			}
		}
	}

	return { nodes, edges };
}

export function exportAsImage(elementId: string, fileName: string = "visualization.png"): void {
	const element = document.getElementById(elementId);
	if (!element) return;

	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	canvas.width = element.offsetWidth;
	canvas.height = element.offsetHeight;
	ctx.fillStyle = "#0f172a";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	const link = document.createElement("a");
	link.href = canvas.toDataURL("image/png");
	link.download = fileName;
	link.click();
}

export function binarySearch(arr: number[], target: number): number {
	let left = 0;
	let right = arr.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (arr[mid] === target) return mid;
		if (arr[mid] < target) left = mid + 1;
		else right = mid - 1;
	}

	return -1;
}

export function bubbleSort(arr: number[]): number[] {
	const result = [...arr];
	const n = result.length;

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			if (result[j] > result[j + 1]) {
				[result[j], result[j + 1]] = [result[j + 1], result[j]];
			}
		}
	}

	return result;
}

export function quickSort(arr: number[]): number[] {
	if (arr.length <= 1) return arr;
	const pivot = arr[0];
	const less = arr.slice(1).filter((x) => x <= pivot);
	const greater = arr.slice(1).filter((x) => x > pivot);
	return [...quickSort(less), pivot, ...quickSort(greater)];
}
