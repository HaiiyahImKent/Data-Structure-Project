export interface AlgorithmStep {
	action: string;
	description: string;
	highlightedIndices?: number[];
	highlightedValues?: number[];
	activeIndex?: number;
	status: "in-progress" | "completed" | "pending";
	newValue?: number;
}

// Stack Algorithm Steps
export const getStackPushSteps = (value: number, currentItems: number[]): AlgorithmStep[] => {
	return [
		{
			action: "Initialize",
			description: `Prepare to push value ${value} onto stack`,
			status: "in-progress",
		},
		{
			action: "Add to Top",
			description: `Add ${value} to the top of the stack`,
			status: "pending",
			newValue: value,
		},
		{
			action: "Complete",
			description: `Successfully pushed ${value}. Stack size: ${currentItems.length + 1}`,
			status: "pending",
		},
	];
};

export const getStackPopSteps = (currentItems: number[]): AlgorithmStep[] => {
	const hasItems = currentItems.length > 0;
	const topIndex = hasItems ? currentItems.length - 1 : 0;
	const topValue = hasItems ? currentItems[topIndex] : null;
	return [
		{
			action: "Check Stack",
			description:
				currentItems.length === 0
					? "Stack is empty"
					: `Stack contains ${currentItems.length} elements`,
			status: "in-progress",
		},
		{
			action: "Remove Top",
			description: hasItems
				? `Remove element ${topValue} from top`
				: "Stack is empty — nothing to remove",
			status: "pending",
			activeIndex: topIndex,
		},
		{
			action: "Complete",
			description: hasItems
				? `Successfully popped ${topValue}`
				: "Operation finished without changes",
			status: "pending",
		},
	];
};

// Queue Algorithm Steps
export const getQueueEnqueueSteps = (value: number, currentItems: number[]): AlgorithmStep[] => {
	return [
		{
			action: "Initialize",
			description: `Prepare to enqueue value ${value}`,
			status: "in-progress",
		},
		{
			action: "Add to Rear",
			description: `Add ${value} to the rear of the queue`,
			status: "pending",
			newValue: value,
		},
		{
			action: "Complete",
			description: `Successfully enqueued ${value}. Queue size: ${currentItems.length + 1}`,
			status: "pending",
		},
	];
};

export const getQueueDequeueSteps = (currentItems: number[]): AlgorithmStep[] => {
	const frontValue = currentItems[0];
	return [
		{
			action: "Check Queue",
			description:
				currentItems.length === 0
					? "Queue is empty"
					: `Queue contains ${currentItems.length} elements`,
			status: "in-progress",
		},
		{
			action: "Remove Front",
			description: `Remove element ${frontValue} from front`,
			status: "pending",
			activeIndex: 0,
		},
		{
			action: "Complete",
			description: `Successfully dequeued ${frontValue}`,
			status: "pending",
		},
	];
};

// Array Algorithm Steps
export const getArrayInsertSteps = (
	value: number,
	index: number,
	currentItems: number[]
): AlgorithmStep[] => {
	const steps: AlgorithmStep[] = [
		{
			action: "Initialize",
			description: `Prepare to insert ${value} at index ${index}`,
			status: "in-progress",
		},
	];

	// Show shifting steps if inserting in the middle
	if (index < currentItems.length) {
		steps.push({
			action: "Shift Elements",
			description: `Shift elements from index ${index} to right`,
			status: "pending",
			highlightedIndices: Array.from(
				{ length: currentItems.length - index },
				(_, i) => index + i
			),
		});
	}

	steps.push({
		action: "Insert Value",
		description: `Insert ${value} at index ${index}`,
		status: "pending",
		activeIndex: index,
		newValue: value,
	});

	steps.push({
		action: "Complete",
		description: `Successfully inserted ${value}. Array size: ${currentItems.length + 1}`,
		status: "pending",
	});

	return steps;
};

export const getArrayRemoveSteps = (index: number, currentItems: number[]): AlgorithmStep[] => {
	const removedValue = currentItems[index];
	const steps: AlgorithmStep[] = [
		{
			action: "Initialize",
			description: `Prepare to remove element at index ${index}`,
			status: "in-progress",
			activeIndex: index,
		},
		{
			action: "Remove Element",
			description: `Remove value ${removedValue} from index ${index}`,
			status: "pending",
			activeIndex: index,
		},
	];

	// Show shifting steps if removing from middle
	if (index < currentItems.length - 1) {
		steps.push({
			action: "Shift Elements",
			description: `Shift elements after index ${index} to left`,
			status: "pending",
			highlightedIndices: Array.from(
				{ length: currentItems.length - index - 1 },
				(_, i) => index + i
			),
		});
	}

	steps.push({
		action: "Complete",
		description: `Successfully removed ${removedValue}. Array size: ${currentItems.length - 1}`,
		status: "pending",
	});

	return steps;
};

// Linear Search
export const getArraySearchSteps = (value: number, currentItems: number[]): AlgorithmStep[] => {
	const steps: AlgorithmStep[] = [
		{
			action: "Initialize",
			description: `Start searching for ${value}`,
			status: "in-progress",
			activeIndex: 0,
		},
	];

	for (let i = 0; i < currentItems.length; i++) {
		steps.push({
			action: `Check Index ${i}`,
			description:
				currentItems[i] === value
					? `Found ${value} at index ${i}`
					: `Current element ${currentItems[i]} ≠ ${value}`,
			status: "pending",
			activeIndex: i,
		});

		if (currentItems[i] === value) {
			break;
		}
	}

	const foundIndex = currentItems.indexOf(value);
	if (foundIndex >= 0) {
		steps.push({
			action: "Complete",
			description: `Successfully found ${value} at index ${foundIndex}`,
			status: "pending",
			activeIndex: foundIndex,
		});
	} else {
		steps.push({
			action: "Complete",
			description: `${value} not found in array`,
			status: "pending",
			activeIndex: 0,
		});
	}

	return steps;
};

// Linked List steps
export const getLinkedListInsertSteps = (value: number, currentSize: number): AlgorithmStep[] => {
	return [
		{
			action: "Create Node",
			description: `Create new node with value ${value}`,
			status: "in-progress",
		},
		{
			action: "Link Node",
			description: `Link new node to the list`,
			status: "pending",
		},
		{
			action: "Complete",
			description: `Successfully inserted ${value}. List size: ${currentSize + 1}`,
			status: "pending",
		},
	];
};

export const getLinkedListRemoveSteps = (value: number, currentSize: number): AlgorithmStep[] => {
	return [
		{
			action: "Find Node",
			description: `Search for node with value ${value}`,
			status: "in-progress",
		},
		{
			action: "Update Links",
			description: `Update links to remove node from list`,
			status: "pending",
		},
		{
			action: "Complete",
			description: `Successfully removed ${value}. List size: ${currentSize - 1}`,
			status: "pending",
		},
	];
};

// Tree steps
export const getTreeInsertSteps = (value: number): AlgorithmStep[] => {
	return [
		{
			action: "Create Node",
			description: `Create new node with value ${value}`,
			status: "in-progress",
		},
		{
			action: "Find Position",
			description: `Traverse tree to find correct position for ${value}`,
			status: "pending",
		},
		{
			action: "Insert",
			description: `Insert ${value} at correct position`,
			status: "pending",
		},
		{
			action: "Complete",
			description: `Successfully inserted ${value} into BST`,
			status: "pending",
		},
	];
};

export const getTreeRemoveSteps = (value: number): AlgorithmStep[] => {
	return [
		{
			action: "Search",
			description: `Search for node with value ${value}`,
			status: "in-progress",
		},
		{
			action: "Analyze",
			description: `Check node's children (0, 1, or 2)`,
			status: "pending",
		},
		{
			action: "Remove",
			description: `Remove node and reorganize tree`,
			status: "pending",
		},
		{
			action: "Complete",
			description: `Successfully removed ${value} from BST`,
			status: "pending",
		},
	];
};

// Graph steps
export const getGraphDFSSteps = (startNode: number, nodeCount: number): AlgorithmStep[] => {
	const steps: AlgorithmStep[] = [
		{
			action: "Initialize",
			description: `Start DFS from node ${startNode}`,
			status: "in-progress",
			activeIndex: startNode,
		},
	];

	for (let i = 0; i < Math.min(nodeCount, 5); i++) {
		steps.push({
			action: `Visit Node ${startNode + i}`,
			description: `Explore node ${startNode + i} and its neighbors`,
			status: "pending",
			activeIndex: startNode + i,
		});
	}

	steps.push({
		action: "Complete",
		description: `DFS traversal complete - visited ${Math.min(nodeCount, 5)} nodes`,
		status: "pending",
	});

	return steps;
};

export const getGraphAddNodeSteps = (
	value: number,
	nodeIndex: number,
	connections: number
): AlgorithmStep[] => {
	const nodeNumber = nodeIndex + 1;
	return [
		{
			action: "Create Node",
			description: `Create new vertex with value ${value}`,
			status: "in-progress",
			activeIndex: nodeIndex,
		},
		{
			action: "Place Node",
			description: `Position node ${nodeNumber} on the layout circle`,
			status: "pending",
			activeIndex: nodeIndex,
		},
		{
			action: "Connect Edges",
			description:
				connections > 0
					? `Create ${connections} connection${
							connections === 1 ? "" : "s"
					  } to existing nodes`
					: "No edges to add yet (first node)",
			status: "pending",
		},
		{
			action: "Complete",
			description: `Graph now contains ${nodeNumber} node${nodeNumber === 1 ? "" : "s"}`,
			status: "pending",
		},
	];
};

export const getGraphRemoveNodeSteps = (value: number, remainingNodes: number): AlgorithmStep[] => {
	return [
		{
			action: "Locate Node",
			description: `Identify vertex with value ${value}`,
			status: "in-progress",
		},
		{
			action: "Detach Edges",
			description: "Remove all edges connected to the vertex",
			status: "pending",
		},
		{
			action: "Remove Vertex",
			description: `Delete node ${value} from the graph`,
			status: "pending",
		},
		{
			action: "Complete",
			description: `Graph now contains ${remainingNodes} node${
				remainingNodes === 1 ? "" : "s"
			}`,
			status: "pending",
		},
	];
};

// Heap steps
export const getHeapInsertSteps = (value: number, newSize: number): AlgorithmStep[] => {
	return [
		{
			action: "Add to End",
			description: `Add ${value} at position ${newSize - 1}`,
			status: "in-progress",
			activeIndex: newSize - 1,
		},
		{
			action: "Bubble Up",
			description: `Move ${value} up to maintain heap property`,
			status: "pending",
		},
		{
			action: "Complete",
			description: `Successfully inserted ${value}. Heap size: ${newSize}`,
			status: "pending",
		},
	];
};

export const getHeapRemoveSteps = (newSize: number): AlgorithmStep[] => {
	return [
		{
			action: "Remove Root",
			description: "Remove minimum element from root",
			status: "in-progress",
			activeIndex: 0,
		},
		{
			action: "Move Last",
			description: `Move last element to root position`,
			status: "pending",
			activeIndex: newSize,
		},
		{
			action: "Bubble Down",
			description: "Move element down to restore heap property",
			status: "pending",
		},
		{
			action: "Complete",
			description: `Extraction complete. Heap size: ${newSize}`,
			status: "pending",
		},
	];
};
