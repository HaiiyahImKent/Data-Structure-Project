export function generateRandomArray(size = 8, max = 100) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
export function generateRandomColor() {
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
export function getComplexityColor(complexity) {
    if (complexity === "O(1)")
        return "text-green-400";
    if (complexity === "O(log n)")
        return "text-yellow-400";
    if (complexity === "O(n)")
        return "text-orange-400";
    if (complexity.includes("n²"))
        return "text-red-400";
    return "text-gray-400";
}
export function formatComplexity(complexity) {
    return complexity.replace(/n/g, "<i>n</i>");
}
export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
export function generateTreeData(levels = 3) {
    const generateNode = (level) => {
        const value = Math.floor(Math.random() * 100) + 1;
        if (level === 0) {
            return { id: `node-${Math.random()}`, value, children: [] };
        }
        return {
            id: `node-${Math.random()}`,
            value,
            children: [generateNode(level - 1), generateNode(level - 1)],
        };
    };
    return generateNode(levels - 1);
}
export function generateGraphData(nodeCount = 6) {
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
        id: `node-${i}`,
        value: i + 1,
        x: Math.cos((i / nodeCount) * Math.PI * 2) * 150 + 200,
        y: Math.sin((i / nodeCount) * Math.PI * 2) * 150 + 200,
    }));
    const edges = [];
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
export function exportAsImage(elementId, fileName = "visualization.png") {
    const element = document.getElementById(elementId);
    if (!element)
        return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    canvas.width = element.offsetWidth;
    canvas.height = element.offsetHeight;
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = fileName;
    link.click();
}
export function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target)
            return mid;
        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}
export function bubbleSort(arr) {
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
export function quickSort(arr) {
    if (arr.length <= 1)
        return arr;
    const pivot = arr[0];
    const less = arr.slice(1).filter((x) => x <= pivot);
    const greater = arr.slice(1).filter((x) => x > pivot);
    return [...quickSort(less), pivot, ...quickSort(greater)];
}
