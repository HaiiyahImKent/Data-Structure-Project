import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getStructureById } from "@data/structures";
import { generateRandomArray, sleep } from "@utils/helpers";
import PlaybackControls from "@components/PlaybackControls";
import ComplexityTable from "@components/ComplexityTable";
import OperationLog from "@components/OperationLog";
import ArrayVisualizer from "@visualizers/ArrayVisualizer";
import StackVisualizer from "@visualizers/StackVisualizer";
import QueueVisualizer from "@visualizers/QueueVisualizer";
import HashTableVisualizer from "@visualizers/HashTableVisualizer";
import { useArrayStore, useStackStore, useQueueStore, useHashTableStore, } from "@store/dataStructureStores";
import { useVisualization } from "@store/visualizationStore";
import { calculateOperationComplexity } from "@utils/complexity";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
export default function VisualizePage() {
    const { structureId } = useParams();
    const structure = getStructureById(structureId || "");
    const [inputValue, setInputValue] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);
    // Store selections
    const arrayStore = useArrayStore();
    const stackStore = useStackStore();
    const queueStore = useQueueStore();
    const hashTableStore = useHashTableStore();
    const visualization = useVisualization();
    const renderMissingStructure = () => (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "container mx-auto px-4 py-12 flex items-center justify-center min-h-96", children: _jsxs("div", { className: "card-base text-center", children: [_jsx(AlertCircle, { className: "mx-auto mb-4 text-yellow-400", size: 48 }), _jsx("h1", { className: "text-2xl font-bold mb-2", children: "Not Found" }), _jsx("p", { className: "text-slate-400", children: "This data structure doesn't exist." })] }) }));
    const handleAddElement = useCallback(async () => {
        if (!inputValue || isNaN(Number(inputValue)))
            return;
        const value = Number(inputValue);
        setIsAnimating(true);
        try {
            switch (structureId) {
                case "array": {
                    arrayStore.insert(value);
                    break;
                }
                case "stack": {
                    stackStore.push(value);
                    break;
                }
                case "queue": {
                    queueStore.enqueue(value);
                    break;
                }
            }
            const logEntry = {
                id: `op-${Date.now()}`,
                operation: "Insert",
                value,
                timestamp: Date.now(),
                complexity: calculateOperationComplexity("insert", structureId || ""),
            };
            visualization.addOperation(logEntry);
            setInputValue("");
            await sleep(500 * visualization.animationSpeed);
        }
        finally {
            setIsAnimating(false);
        }
    }, [inputValue, structureId, arrayStore, stackStore, queueStore, visualization]);
    const handleRemove = useCallback(async () => {
        setIsAnimating(true);
        try {
            switch (structureId) {
                case "array": {
                    if (arrayStore.items.length > 0) {
                        const removed = arrayStore.items[arrayStore.items.length - 1];
                        arrayStore.remove(arrayStore.items.length - 1);
                        visualization.addOperation({
                            id: `op-${Date.now()}`,
                            operation: "Remove",
                            value: removed,
                            timestamp: Date.now(),
                            complexity: calculateOperationComplexity("remove", structureId || ""),
                        });
                    }
                    break;
                }
                case "stack": {
                    const popped = stackStore.pop();
                    if (popped !== undefined) {
                        visualization.addOperation({
                            id: `op-${Date.now()}`,
                            operation: "Pop",
                            value: popped,
                            timestamp: Date.now(),
                            complexity: "O(1)",
                        });
                    }
                    break;
                }
                case "queue": {
                    const dequeued = queueStore.dequeue();
                    if (dequeued !== undefined) {
                        visualization.addOperation({
                            id: `op-${Date.now()}`,
                            operation: "Dequeue",
                            value: dequeued,
                            timestamp: Date.now(),
                            complexity: "O(1)",
                        });
                    }
                    break;
                }
            }
            await sleep(500 * visualization.animationSpeed);
        }
        finally {
            setIsAnimating(false);
        }
    }, [structureId, arrayStore, stackStore, queueStore, visualization]);
    const handleRandomData = useCallback(() => {
        const data = generateRandomArray(8, 100);
        switch (structureId) {
            case "array": {
                arrayStore.clear();
                data.forEach((num) => arrayStore.insert(num));
                break;
            }
        }
        visualization.clearOperations();
    }, [structureId, arrayStore, visualization]);
    if (!structure) {
        return renderMissingStructure();
    }
    const renderVisualizer = () => {
        switch (structureId) {
            case "array":
                return (_jsx(ArrayVisualizer, { items: arrayStore.items, highlightedIndex: arrayStore.highlightedIndex }));
            case "stack":
                return _jsx(StackVisualizer, { items: stackStore.items, topIndex: stackStore.topIndex });
            case "queue":
                return (_jsx(QueueVisualizer, { items: queueStore.items, frontIndex: 0, rearIndex: queueStore.rearIndex }));
            case "hash-table":
                return _jsx(HashTableVisualizer, { entries: hashTableStore.entries });
            default:
                return (_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-8 flex items-center justify-center min-h-64 text-slate-500", children: ["Visualizer coming soon for ", structure.name] }));
        }
    };
    return (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "container mx-auto px-4 py-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsxs("h1", { className: "text-4xl font-bold mb-2", children: [structure.icon, " ", structure.name, " Visualizer"] }), _jsxs("p", { className: "text-slate-400", children: ["Interactive playground for exploring ", structure.shortName] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: [_jsxs("div", { className: "lg:col-span-3 space-y-6", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "card-base", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Visualization" }), renderVisualizer()] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "card-base space-y-4", children: [_jsx("h3", { className: "text-lg font-bold mb-4", children: "Controls" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "number", value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyPress: (e) => e.key === "Enter" && handleAddElement(), placeholder: "Enter a value...", className: "input-base flex-1", disabled: isAnimating }), _jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: handleAddElement, disabled: isAnimating, className: "btn-primary px-4 flex items-center gap-2", children: [_jsx(Plus, { size: 18 }), "Add"] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-2", children: [_jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: handleRemove, disabled: isAnimating, className: "btn-secondary py-2 flex items-center justify-center gap-1", children: [_jsx(Trash2, { size: 16 }), "Remove"] }), _jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => {
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
                                                    }
                                                }, disabled: isAnimating, className: "btn-secondary py-2 flex items-center justify-center gap-1", children: [_jsx(Trash2, { size: 16 }), "Clear All"] }), _jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: handleRandomData, disabled: isAnimating, className: "btn-secondary py-2 flex items-center justify-center gap-1", children: "\uD83C\uDFB2 Random" })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, children: _jsx(ComplexityTable, { complexities: structure.complexity }) })] }), _jsxs("div", { className: "space-y-6", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, children: _jsx(PlaybackControls, { isAnimating: isAnimating, onPlay: () => setIsAnimating(true), onPause: () => setIsAnimating(false), onReset: () => { }, speed: visualization.animationSpeed, onSpeedChange: visualization.setAnimationSpeed, onUndo: visualization.undoLastOperation, onRedo: visualization.redoLastOperation, canUndo: visualization.historyIndex > 0, canRedo: visualization.historyIndex < visualization.history.length - 1 }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "h-96", children: _jsx(OperationLog, { logs: visualization.operations, onClear: visualization.clearOperations }) })] })] })] }));
}
