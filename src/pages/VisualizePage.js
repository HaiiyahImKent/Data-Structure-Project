import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getStructureById } from "@data/structures";
import { generateRandomArray, generateGraphData, generateTreeData, sleep } from "@utils/helpers";
import PlaybackControls from "@components/PlaybackControls";
import ComplexityTable from "@components/ComplexityTable";
import OperationLog from "@components/OperationLog";
import AlgorithmStepsDisplay from "@components/AlgorithmStepsDisplay";
import ArrayVisualizer from "@visualizers/ArrayVisualizer";
import LinkedListVisualizer from "@visualizers/LinkedListVisualizer";
import StackVisualizer from "@visualizers/StackVisualizer";
import QueueVisualizer from "@visualizers/QueueVisualizer";
import HashTableVisualizer from "@visualizers/HashTableVisualizer";
import TreeVisualizer from "@visualizers/TreeVisualizer";
import GraphVisualizer from "@visualizers/GraphVisualizer";
import HeapVisualizer from "@visualizers/HeapVisualizer";
import {
	useArrayStore,
	useStackStore,
	useQueueStore,
	useHashTableStore,
} from "@store/dataStructureStores";
import { useVisualization } from "@store/visualizationStore";
import { calculateOperationComplexity } from "@utils/complexity";
import {
	getStackPushSteps,
	getStackPopSteps,
	getQueueEnqueueSteps,
	getQueueDequeueSteps,
	getArrayInsertSteps,
	getArrayRemoveSteps,
	getLinkedListInsertSteps,
	getLinkedListRemoveSteps,
	getTreeInsertSteps,
	getHeapInsertSteps,
} from "@utils/algorithmSteps";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
const createLinkedListNodes = (values) =>
	values.map((value, index) => ({ id: `ll-${Date.now()}-${index}`, value }));
const resolveOperationKey = (structureKey, action) => {
	switch (structureKey) {
		case "stack":
			return action === "add" ? "push" : "pop";
		case "queue":
			return action === "add" ? "enqueue" : "dequeue";
		case "hash-table":
		case "linked-list":
		case "tree":
		case "graph":
		case "heap":
		case "array":
		default:
			return action === "add" ? "insert" : "remove";
	}
};
const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);
const insertIntoTree = (node, value) => {
	if (!node) {
		return { id: `node-${Date.now()}`, value };
	}
	if (value < node.value) {
		return { ...node, left: insertIntoTree(node.left, value) };
	}
	return { ...node, right: insertIntoTree(node.right, value) };
};
const findMinNode = (node) => {
	let current = node;
	while (current.left) {
		current = current.left;
	}
	return current;
};
const removeFromTree = (node, value) => {
	if (!node) return { root: undefined };
	if (value < node.value) {
		const result = removeFromTree(node.left, value);
		if (result.removed === undefined) return { root: node };
		return { root: { ...node, left: result.root }, removed: result.removed };
	}
	if (value > node.value) {
		const result = removeFromTree(node.right, value);
		if (result.removed === undefined) return { root: node };
		return { root: { ...node, right: result.root }, removed: result.removed };
	}
	if (!node.left && !node.right) {
		return { root: undefined, removed: node.value };
	}
	if (!node.left) {
		return { root: node.right, removed: node.value };
	}
	if (!node.right) {
		return { root: node.left, removed: node.value };
	}
	const successor = findMinNode(node.right);
	const adjustedRight = removeFromTree(node.right, successor.value).root;
	return {
		root: { ...node, value: successor.value, right: adjustedRight },
		removed: node.value,
	};
};
const layoutGraphNodes = (nodes) => {
	const total = Math.max(1, nodes.length);
	return nodes.map((node, index) => ({
		...node,
		x: Math.cos((index / total) * Math.PI * 2) * 150 + 200,
		y: Math.sin((index / total) * Math.PI * 2) * 150 + 200,
	}));
};
const addGraphNode = (data, value) => {
	const newIndex = data.nodes.length;
	const node = {
		id: `node-${Date.now()}`,
		value,
		x: 0,
		y: 0,
	};
	const newEdges = [...data.edges];
	if (data.nodes.length > 0) {
		const targets = [...Array(data.nodes.length).keys()];
		const connectionCount = Math.min(2, data.nodes.length);
		for (let i = 0; i < connectionCount; i++) {
			if (targets.length === 0) break;
			const targetIndex = targets.splice(Math.floor(Math.random() * targets.length), 1)[0];
			newEdges.push({ from: newIndex, to: targetIndex });
		}
	}
	return { nodes: layoutGraphNodes([...data.nodes, node]), edges: newEdges };
};
const removeGraphNode = (data) => {
	if (data.nodes.length === 0) return { data };
	const removedIndex = data.nodes.length - 1;
	const removedNode = data.nodes[removedIndex];
	const remainingNodes = data.nodes.slice(0, -1);
	return {
		data: {
			nodes: layoutGraphNodes(remainingNodes),
			edges: data.edges.filter(
				(edge) => edge.from !== removedIndex && edge.to !== removedIndex
			),
		},
		removed: removedNode.value,
	};
};
const siftUp = (heap, index) => {
	let child = index;
	while (child > 0) {
		const parent = Math.floor((child - 1) / 2);
		if (heap[parent] <= heap[child]) break;
		[heap[parent], heap[child]] = [heap[child], heap[parent]];
		child = parent;
	}
};
const siftDown = (heap, index) => {
	let parent = index;
	while (true) {
		const left = parent * 2 + 1;
		const right = left + 1;
		let smallest = parent;
		if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
		if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
		if (smallest === parent) break;
		[heap[parent], heap[smallest]] = [heap[smallest], heap[parent]];
		parent = smallest;
	}
};
const insertHeapValue = (items, value) => {
	const heap = [...items, value];
	siftUp(heap, heap.length - 1);
	return heap;
};
const removeHeapRoot = (items) => {
	if (items.length === 0) return { next: items };
	if (items.length === 1) return { next: [], removed: items[0] };
	const heap = [...items];
	const removed = heap[0];
	const last = heap.pop();
	if (last !== undefined) {
		heap[0] = last;
		siftDown(heap, 0);
	}
	return { next: heap, removed };
};
const parseHashInput = (input) => {
	const [rawKey, rawValue] = input.split(":");
	if (!rawKey || rawValue === undefined) return null;
	const key = rawKey.trim();
	const value = Number(rawValue.trim());
	if (!key || Number.isNaN(value)) return null;
	return { key, value };
};
const extractHashKey = (input) => {
	if (!input.trim()) return null;
	const key = input.split(":")[0]?.trim();
	return key || null;
};
const generateRandomHashEntries = () =>
	Array.from({ length: 5 }, (_, index) => ({
		key: `key${index + 1}`,
		value: Math.floor(Math.random() * 100) + 1,
	}));
export default function VisualizePage() {
	const { structureId } = useParams();
	const structure = getStructureById(structureId || "");
	const [inputValue, setInputValue] = useState("");
	const [isAnimating, setIsAnimating] = useState(false);
	const [inputError, setInputError] = useState(null);
	const [linkedListNodes, setLinkedListNodes] = useState(() =>
		createLinkedListNodes(generateRandomArray(4, 50))
	);
	const [highlightedLinkedIndex, setHighlightedLinkedIndex] = useState(null);
	const [treeData, setTreeData] = useState(() => generateTreeData(3));
	const [graphData, setGraphData] = useState(() => generateGraphData());
	const [heapItems, setHeapItems] = useState([]);
	// Store selections
	const arrayStore = useArrayStore();
	const stackStore = useStackStore();
	const queueStore = useQueueStore();
	const hashTableStore = useHashTableStore();
	const visualization = useVisualization();
	const placeholders = {
		array: "Enter a value...",
		stack: "Enter a value...",
		queue: "Enter a value...",
		"linked-list": "Enter node value...",
		tree: "Enter node value...",
		graph: "Enter node weight...",
		heap: "Enter priority value...",
		"hash-table": "Enter key:value (e.g. user:42)",
	};
	// Handle algorithm step playback
	useEffect(() => {
		if (!visualization.isAnimating || visualization.algorithmSteps.length === 0) return;
		const interval = setInterval(() => {
			const nextIndex = visualization.currentStepIndex + 1;
			if (nextIndex < visualization.algorithmSteps.length) {
				visualization.nextStep();
			} else {
				visualization.setAnimating(false);
			}
		}, 1500 / visualization.animationSpeed);
		return () => clearInterval(interval);
	}, [visualization, visualization.isAnimating, visualization.animationSpeed]);
	const inputPlaceholder = placeholders[structureId || ""] || "Enter a value...";
	const isHashInput = structureId === "hash-table";
	const renderMissingStructure = () =>
		_jsx(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			className: "container mx-auto px-4 py-12 flex items-center justify-center min-h-96",
			children: _jsxs("div", {
				className: "card-base text-center",
				children: [
					_jsx(AlertCircle, { className: "mx-auto mb-4 text-yellow-400", size: 48 }),
					_jsx("h1", { className: "text-2xl font-bold mb-2", children: "Not Found" }),
					_jsx("p", {
						className: "text-slate-400",
						children: "This data structure doesn't exist.",
					}),
				],
			}),
		});
	const handleAddElement = useCallback(async () => {
		if (!structureId) return;
		const trimmed = inputValue.trim();
		if (!trimmed) {
			setInputError("Please enter a value to add.");
			return;
		}
		const numericValue = Number(trimmed);
		if (!isHashInput && Number.isNaN(numericValue)) {
			setInputError("Please enter a valid number.");
			return;
		}
		setIsAnimating(true);
		visualization.setAnimating(true);
		try {
			let logValue = isHashInput ? trimmed : numericValue;
			let operationLabel = capitalize(resolveOperationKey(structureId, "add"));
			const complexityKey = resolveOperationKey(structureId, "add");
			let mutated = false;
			switch (structureId) {
				case "array":
					arrayStore.insert(numericValue);
					visualization.setAlgorithmSteps(
						getArrayInsertSteps(
							numericValue,
							arrayStore.items.length - 1,
							arrayStore.items
						)
					);
					mutated = true;
					break;
				case "stack":
					stackStore.push(numericValue);
					visualization.setAlgorithmSteps(
						getStackPushSteps(numericValue, stackStore.items)
					);
					mutated = true;
					break;
				case "queue":
					queueStore.enqueue(numericValue);
					visualization.setAlgorithmSteps(
						getQueueEnqueueSteps(numericValue, queueStore.items)
					);
					mutated = true;
					break;
				case "linked-list":
					setLinkedListNodes((prev) => {
						const next = [...prev, { id: `ll-${Date.now()}`, value: numericValue }];
						visualization.setAlgorithmSteps(
							getLinkedListInsertSteps(numericValue, next.length)
						);
						setHighlightedLinkedIndex(next.length - 1);
						return next;
					});
					mutated = true;
					break;
				case "tree":
					setTreeData((prev) => {
						const next = insertIntoTree(prev, numericValue);
						visualization.setAlgorithmSteps(getTreeInsertSteps(numericValue));
						return next;
					});
					mutated = true;
					break;
				case "graph":
					setGraphData((prev) => addGraphNode(prev, numericValue));
					visualization.clearAlgorithmSteps();
					visualization.setAnimating(false);
					mutated = true;
					break;
				case "heap":
					setHeapItems((prev) => {
						const next = insertHeapValue(prev, numericValue);
						visualization.setAlgorithmSteps(
							getHeapInsertSteps(numericValue, next.length)
						);
						return next;
					});
					mutated = true;
					break;
				case "hash-table": {
					const parsed = parseHashInput(trimmed);
					if (!parsed) {
						setInputError("Use the format key:value (e.g. user:42)");
						return;
					}
					hashTableStore.add(parsed.key, parsed.value);
					operationLabel = `Insert (key: ${parsed.key})`;
					logValue = `${parsed.key}:${parsed.value}`;
					mutated = true;
					break;
				}
				default:
					break;
			}
			if (mutated) {
				visualization.addOperation({
					id: `op-${Date.now()}`,
					operation: operationLabel,
					value: logValue,
					timestamp: Date.now(),
					complexity: calculateOperationComplexity(complexityKey, structureId),
				});
				setInputValue("");
				setInputError(null);
				await sleep(500 * visualization.animationSpeed);
			}
		} finally {
			setIsAnimating(false);
		}
	}, [
		structureId,
		inputValue,
		isHashInput,
		arrayStore,
		stackStore,
		queueStore,
		hashTableStore,
		visualization,
		setLinkedListNodes,
		setTreeData,
		setGraphData,
		setHeapItems,
		setHighlightedLinkedIndex,
		setInputError,
	]);
	const handleRemove = useCallback(async () => {
		if (!structureId) return;
		let removedValue;
		let operationLabel = capitalize(resolveOperationKey(structureId, "remove"));
		let didMutate = false;
		setIsAnimating(true);
		try {
			switch (structureId) {
				case "array": {
					if (arrayStore.items.length > 0) {
						removedValue = arrayStore.items[arrayStore.items.length - 1];
						visualization.setAlgorithmSteps(
							getArrayRemoveSteps(arrayStore.items.length - 1, arrayStore.items)
						);
						arrayStore.remove(arrayStore.items.length - 1);
						didMutate = true;
					}
					break;
				}
				case "stack": {
					const popped = stackStore.pop();
					visualization.setAlgorithmSteps(getStackPopSteps(stackStore.items));
					if (popped !== undefined) {
						removedValue = popped;
						didMutate = true;
					}
					break;
				}
				case "queue": {
					const dequeued = queueStore.dequeue();
					visualization.setAlgorithmSteps(getQueueDequeueSteps(queueStore.items));
					if (dequeued !== undefined) {
						removedValue = dequeued;
						didMutate = true;
					}
					break;
				}
				case "linked-list": {
					setLinkedListNodes((prev) => {
						if (prev.length === 0) return prev;
						removedValue = prev[prev.length - 1].value;
						visualization.setAlgorithmSteps(
							getLinkedListRemoveSteps(prev[prev.length - 1].value, prev.length)
						);
						didMutate = true;
						return prev.slice(0, -1);
					});
					setHighlightedLinkedIndex(null);
					break;
				}
				case "tree": {
					if (treeData) {
						const numericInput = Number(inputValue);
						const hasExplicitTarget =
							inputValue.trim().length > 0 && !Number.isNaN(numericInput);
						const target = hasExplicitTarget ? numericInput : treeData.value;
						const { root, removed } = removeFromTree(treeData, target);
						if (removed !== undefined) {
							visualization.setAlgorithmSteps(getTreeInsertSteps(target));
							setTreeData(root);
							removedValue = removed;
							didMutate = true;
						}
					}
					break;
				}
				case "graph": {
					const { data, removed } = removeGraphNode(graphData);
					setGraphData(data);
					if (removed !== undefined) {
						visualization.clearAlgorithmSteps();
						visualization.setAnimating(false);
						removedValue = removed;
						didMutate = true;
					}
					break;
				}
				case "heap": {
					const { next, removed } = removeHeapRoot(heapItems);
					setHeapItems(next);
					if (removed !== undefined) {
						removedValue = removed;
						didMutate = true;
					}
					break;
				}
				case "hash-table": {
					const key =
						extractHashKey(inputValue) || hashTableStore.entries.slice(-1)[0]?.key;
					if (key) {
						const value = hashTableStore.search(key);
						if (value !== null) {
							hashTableStore.remove(key);
							removedValue = `${key}:${value}`;
							didMutate = true;
							operationLabel = `Remove (key: ${key})`;
						}
					} else {
						setInputError(
							"Provide a key with key:value or in the input box to remove."
						);
					}
					break;
				}
				default:
					break;
			}
			if (didMutate && removedValue !== undefined) {
				visualization.addOperation({
					id: `op-${Date.now()}`,
					operation: operationLabel,
					value: removedValue,
					timestamp: Date.now(),
					complexity: calculateOperationComplexity(
						resolveOperationKey(structureId, "remove"),
						structureId
					),
				});
				setInputError(null);
				await sleep(500 * visualization.animationSpeed);
			}
		} finally {
			setIsAnimating(false);
		}
	}, [
		structureId,
		arrayStore,
		stackStore,
		queueStore,
		graphData,
		hashTableStore,
		heapItems,
		inputValue,
		visualization,
		treeData,
		setGraphData,
		setHeapItems,
		setLinkedListNodes,
		setTreeData,
		setHighlightedLinkedIndex,
		setInputError,
	]);
	const handleRandomData = useCallback(() => {
		if (!structureId) return;
		const data = generateRandomArray(6, 99);
		switch (structureId) {
			case "array": {
				arrayStore.clear();
				data.forEach((num) => arrayStore.insert(num));
				break;
			}
			case "stack": {
				stackStore.clear();
				data.forEach((num) => stackStore.push(num));
				break;
			}
			case "queue": {
				queueStore.clear();
				data.forEach((num) => queueStore.enqueue(num));
				break;
			}
			case "linked-list": {
				setLinkedListNodes(createLinkedListNodes(data));
				setHighlightedLinkedIndex(null);
				break;
			}
			case "tree": {
				setTreeData(generateTreeData(3));
				break;
			}
			case "graph": {
				setGraphData(generateGraphData());
				break;
			}
			case "heap": {
				const randomizedHeap = data.reduce((acc, num) => insertHeapValue(acc, num), []);
				setHeapItems(randomizedHeap);
				break;
			}
			case "hash-table": {
				hashTableStore.clear();
				generateRandomHashEntries().forEach(({ key, value }) =>
					hashTableStore.add(key, value)
				);
				break;
			}
			default:
				break;
		}
		visualization.clearOperations();
		setInputValue("");
		setInputError(null);
	}, [
		structureId,
		arrayStore,
		stackStore,
		queueStore,
		hashTableStore,
		visualization,
		setLinkedListNodes,
		setHighlightedLinkedIndex,
		setTreeData,
		setGraphData,
		setHeapItems,
		setInputError,
	]);
	if (!structure) {
		return renderMissingStructure();
	}
	const renderVisualizer = () => {
		if (!structureId) return null;
		switch (structureId) {
			case "array":
				return _jsx(ArrayVisualizer, {
					items: arrayStore.items,
					highlightedIndex: arrayStore.highlightedIndex,
				});
			case "stack":
				return _jsx(StackVisualizer, {
					items: stackStore.items,
					topIndex: stackStore.topIndex,
				});
			case "queue":
				return _jsx(QueueVisualizer, {
					items: queueStore.items,
					frontIndex: queueStore.frontIndex,
					rearIndex: queueStore.rearIndex,
				});
			case "linked-list":
				return _jsx(LinkedListVisualizer, {
					nodes: linkedListNodes,
					highlightedIndex: highlightedLinkedIndex,
				});
			case "tree":
				return _jsx(TreeVisualizer, { root: treeData });
			case "graph":
				return _jsx(GraphVisualizer, { nodes: graphData.nodes, edges: graphData.edges });
			case "heap":
				return _jsx(HeapVisualizer, { items: heapItems });
			case "hash-table":
				return _jsx(HashTableVisualizer, { entries: hashTableStore.entries });
			default:
				return _jsxs("div", {
					className:
						"bg-slate-800/50 rounded-lg p-8 flex items-center justify-center min-h-64 text-slate-500",
					children: ["Visualizer coming soon for ", structure.name],
				});
		}
	};
	return _jsxs(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		className: "container mx-auto px-4 py-8",
		children: [
			_jsxs(motion.div, {
				initial: { opacity: 0, y: -20 },
				animate: { opacity: 1, y: 0 },
				className: "mb-8",
				children: [
					_jsxs("h1", {
						className: "text-4xl font-bold mb-2",
						children: [structure.icon, " ", structure.name, " Visualizer"],
					}),
					_jsxs("p", {
						className: "text-slate-400",
						children: ["Interactive playground for exploring ", structure.shortName],
					}),
				],
			}),
			_jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
				children: [
					_jsxs("div", {
						className: "lg:col-span-2 space-y-6",
						children: [
							_jsxs(motion.div, {
								initial: { opacity: 0, y: 20 },
								animate: { opacity: 1, y: 0 },
								className: "card-base overflow-auto max-h-96",
								children: [
									_jsx("h2", {
										className: "text-xl font-bold mb-4",
										children: "Visualization",
									}),
									renderVisualizer(),
								],
							}),
							" ",
							_jsxs(motion.div, {
								initial: { opacity: 0, y: 20 },
								animate: { opacity: 1, y: 0 },
								transition: { delay: 0.1 },
								className: "card-base space-y-4",
								children: [
									_jsx("h3", {
										className: "text-lg font-bold mb-4",
										children: "Controls",
									}),
									_jsxs("div", {
										className: "flex gap-2",
										children: [
											_jsx("input", {
												type: "text",
												value: inputValue,
												onChange: (e) => {
													if (inputError) setInputError(null);
													setInputValue(e.target.value);
												},
												onKeyPress: (e) =>
													e.key === "Enter" && handleAddElement(),
												placeholder: inputPlaceholder,
												className: `input-base flex-1 ${
													inputError ? "border-red-400" : ""
												}`,
												disabled: isAnimating,
											}),
											_jsxs(motion.button, {
												whileHover: { scale: 1.05 },
												whileTap: { scale: 0.95 },
												onClick: handleAddElement,
												disabled: isAnimating,
												className:
													"btn-primary px-4 flex items-center gap-2",
												children: [_jsx(Plus, { size: 18 }), "Add"],
											}),
										],
									}),
									inputError &&
										_jsx("p", {
											className: "text-sm text-red-400 mt-1",
											children: inputError,
										}),
									_jsxs("div", {
										className: "grid grid-cols-3 gap-2",
										children: [
											_jsxs(motion.button, {
												whileHover: { scale: 1.05 },
												whileTap: { scale: 0.95 },
												onClick: handleRemove,
												disabled: isAnimating,
												className:
													"btn-secondary py-2 flex items-center justify-center gap-1",
												children: [_jsx(Trash2, { size: 16 }), "Remove"],
											}),
											_jsxs(motion.button, {
												whileHover: { scale: 1.05 },
												whileTap: { scale: 0.95 },
												onClick: () => {
													visualization.clearOperations();
													switch (structureId) {
														case "array":
															arrayStore.clear();
															break;
														case "stack":
															stackStore.clear();
															break;
														case "queue":
															queueStore.clear();
															break;
														case "linked-list":
															setLinkedListNodes([]);
															setHighlightedLinkedIndex(null);
															break;
														case "tree":
															setTreeData(undefined);
															break;
														case "graph":
															setGraphData({ nodes: [], edges: [] });
															break;
														case "heap":
															setHeapItems([]);
															break;
														case "hash-table":
															hashTableStore.clear();
															break;
													}
													setInputError(null);
													setInputValue("");
												},
												disabled: isAnimating,
												className:
													"btn-secondary py-2 flex items-center justify-center gap-1",
												children: [_jsx(Trash2, { size: 16 }), "Clear All"],
											}),
											_jsx(motion.button, {
												whileHover: { scale: 1.05 },
												whileTap: { scale: 0.95 },
												onClick: handleRandomData,
												disabled: isAnimating,
												className:
													"btn-secondary py-2 flex items-center justify-center gap-1",
												children: "\uD83C\uDFB2 Random",
											}),
										],
									}),
									visualization.algorithmSteps.length > 0 &&
										_jsx(motion.div, {
											initial: { opacity: 0, y: 20 },
											animate: { opacity: 1, y: 0 },
											transition: { delay: 0.3 },
											className:
												"rounded-3xl border border-slate-700/60 bg-slate-900/40 p-4 mt-4 shadow-[0_15px_30px_rgba(15,23,42,0.45)]",
											children: _jsx(AlgorithmStepsDisplay, {
												steps: visualization.algorithmSteps,
												currentStepIndex: visualization.currentStepIndex,
												isPlaying: visualization.isAnimating,
												orientation: "horizontal",
											}),
										}),
								],
							}),
						],
					}),
					_jsxs("div", {
						className: "space-y-4",
						children: [
							_jsx(motion.div, {
								initial: { opacity: 0, y: 20 },
								animate: { opacity: 1, y: 0 },
								transition: { delay: 0.3 },
								children: _jsx(PlaybackControls, {
									isAnimating: visualization.isAnimating,
									onPlay: () => visualization.setAnimating(true),
									onPause: () => visualization.setAnimating(false),
									onReset: () => {
										visualization.clearAlgorithmSteps();
										visualization.setAnimating(false);
									},
									speed: visualization.animationSpeed,
									onSpeedChange: visualization.setAnimationSpeed,
									onUndo: visualization.undoLastOperation,
									onRedo: visualization.redoLastOperation,
									canUndo: visualization.historyIndex > 0,
									canRedo:
										visualization.historyIndex <
										visualization.history.length - 1,
									onPreviousStep: () => visualization.previousStep(),
									onNextStep: () => visualization.nextStep(),
									canPreviousStep: visualization.currentStepIndex > 0,
									canNextStep:
										visualization.currentStepIndex <
										visualization.algorithmSteps.length - 1,
									showStepControls: visualization.algorithmSteps.length > 0,
								}),
							}),
							_jsx(motion.div, {
								initial: { opacity: 0, y: 20 },
								animate: { opacity: 1, y: 0 },
								transition: { delay: 0.25 },
								children: _jsx(ComplexityTable, {
									complexities: structure.complexity,
								}),
							}),
							_jsx(motion.div, {
								initial: { opacity: 0, y: 20 },
								animate: { opacity: 1, y: 0 },
								transition: { delay: 0.4 },
								className: "card-base max-h-64 overflow-hidden",
								children: _jsx(OperationLog, {
									logs: visualization.operations,
									onClear: visualization.clearOperations,
								}),
							}),
						],
					}),
				],
			}),
		],
	});
}
