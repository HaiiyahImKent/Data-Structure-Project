export function calculateOperationComplexity(operation, dataStructure) {
    const complexityMap = {
        array: {
            access: "O(1)",
            search: "O(n)",
            insert: "O(n)",
            remove: "O(n)",
        },
        stack: {
            push: "O(1)",
            pop: "O(1)",
            peek: "O(1)",
        },
        queue: {
            enqueue: "O(1)",
            dequeue: "O(1)",
            peek: "O(1)",
        },
        "linked-list": {
            insert: "O(1)",
            remove: "O(n)",
            search: "O(n)",
        },
        tree: {
            insert: "O(log n)",
            remove: "O(log n)",
            search: "O(log n)",
        },
        "hash-table": {
            insert: "O(1)",
            remove: "O(1)",
            search: "O(1)",
        },
        graph: {
            insert: "O(1)",
            remove: "O(V + E)",
            search: "O(V + E)",
        },
        heap: {
            insert: "O(log n)",
            remove: "O(log n)",
            peek: "O(1)",
        },
    };
    const structure = complexityMap[dataStructure];
    return structure?.[operation] || "O(n)";
}
export function formatOperationLog(logs) {
    return logs
        .map((log) => `[${new Date(log.timestamp).toLocaleTimeString()}] ${log.operation}${log.value !== undefined ? ` (${log.value})` : ""} - ${log.complexity || "Unknown"}`)
        .join("\n");
}
export function detectBottlenecks(logs) {
    const bottlenecks = [];
    const slowOperations = logs.filter((log) => log.duration && log.duration > 100);
    if (slowOperations.length > 0) {
        bottlenecks.push(`Found ${slowOperations.length} slow operations (>100ms)`);
    }
    const groupedByOp = logs.reduce((acc, log) => {
        if (!acc[log.operation])
            acc[log.operation] = [];
        acc[log.operation].push(log);
        return acc;
    }, {});
    Object.entries(groupedByOp).forEach(([op, opLogs]) => {
        if (opLogs.length > 10) {
            bottlenecks.push(`High frequency operation: ${op} (${opLogs.length} times)`);
        }
    });
    return bottlenecks;
}
export function getComplexityExplanation(complexity) {
    const explanations = {
        "O(1)": "Constant time - operation completes regardless of input size",
        "O(log n)": "Logarithmic time - reduces problem size by half each iteration",
        "O(n)": "Linear time - operation time grows proportionally with input size",
        "O(n log n)": "Linearithmic time - efficient divide and conquer algorithms",
        "O(n²)": "Quadratic time - nested iterations, becomes slow for large inputs",
        "O(2ⁿ)": "Exponential time - extremely slow, avoid for large inputs",
        "O(n!)": "Factorial time - impractical for anything but tiny inputs",
    };
    return explanations[complexity] || "Unknown complexity";
}
