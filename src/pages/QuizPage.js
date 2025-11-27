import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getStructureById } from "@data/structures";
import { AlertCircle, CheckCircle, XCircle, SkipForward } from "lucide-react";
const QUIZ_DATA = {
    array: [
        {
            id: "arr-1",
            question: "What is the time complexity of accessing an element at a specific index in an array?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            correct: 0,
            explanation: "Array access by index is constant time because arrays store elements in contiguous memory locations.",
        },
        {
            id: "arr-2",
            question: "What is the time complexity of inserting an element in the middle of an array?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            correct: 1,
            explanation: "Insertion in the middle requires shifting all elements after the insertion point, which is O(n) in the worst case.",
        },
    ],
    stack: [
        {
            id: "stk-1",
            question: "What does LIFO stand for?",
            options: [
                "Last In First Out",
                "Last In First Open",
                "Load In File Output",
                "Low In For Operations",
            ],
            correct: 0,
            explanation: "LIFO (Last In First Out) is the fundamental principle of stacks where the last element added is the first one removed.",
        },
        {
            id: "stk-2",
            question: "What is the time complexity of push operation in a stack?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            correct: 0,
            explanation: "Push operation adds an element to the top of the stack, which is a constant-time operation O(1).",
        },
    ],
    queue: [
        {
            id: "que-1",
            question: "What does FIFO stand for?",
            options: [
                "First In First Out",
                "First In Final Output",
                "File Input File Output",
                "Fast In For Operations",
            ],
            correct: 0,
            explanation: "FIFO (First In First Out) means the first element added to the queue is the first one to be removed.",
        },
    ],
    "linked-list": [
        {
            id: "ll-1",
            question: "What is an advantage of a linked list over an array?",
            options: [
                "Faster access time",
                "Dynamic size without reallocation",
                "Better cache locality",
                "Smaller memory footprint",
            ],
            correct: 1,
            explanation: "Linked lists can grow dynamically without needing to reallocate memory like arrays do.",
        },
    ],
};
export default function QuizPage() {
    const { structureId } = useParams();
    const structure = getStructureById(structureId || "");
    const questions = QUIZ_DATA[structureId || ""] || [];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);
    if (!structure) {
        return (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "container mx-auto px-4 py-12 flex items-center justify-center min-h-96", children: _jsxs("div", { className: "card-base text-center", children: [_jsx(AlertCircle, { className: "mx-auto mb-4 text-yellow-400", size: 48 }), _jsx("h1", { className: "text-2xl font-bold mb-2", children: "Not Found" }), _jsx("p", { className: "text-slate-400", children: "This data structure doesn't exist." })] }) }));
    }
    if (questions.length === 0) {
        return (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "container mx-auto px-4 py-12 flex items-center justify-center min-h-96", children: _jsxs("div", { className: "card-base text-center", children: [_jsx(AlertCircle, { className: "mx-auto mb-4 text-blue-400", size: 48 }), _jsx("h1", { className: "text-2xl font-bold mb-2", children: "Quiz Coming Soon" }), _jsxs("p", { className: "text-slate-400", children: ["Quiz for ", structure.name, " is being prepared."] })] }) }));
    }
    const handleAnswer = (optionIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = optionIndex;
        setAnswers(newAnswers);
        setShowExplanation(true);
    };
    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setShowExplanation(false);
        }
        else {
            setQuizComplete(true);
        }
    };
    const correctCount = answers.filter((answer, idx) => answer === questions[idx].correct).length;
    const question = questions[currentQuestion];
    const isAnswered = answers[currentQuestion] !== undefined;
    const isCorrect = isAnswered && answers[currentQuestion] === question.correct;
    if (quizComplete) {
        const percentage = Math.round((correctCount / questions.length) * 100);
        return (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "container mx-auto px-4 py-12", children: _jsxs(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, className: "max-w-2xl mx-auto card-base text-center", children: [_jsx(motion.div, { initial: { y: -20 }, animate: { y: 0 }, transition: { delay: 0.2 }, className: "mb-6", children: percentage >= 80 ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83C\uDF89" }), _jsx("h1", { className: "text-4xl font-bold text-green-400 mb-2", children: "Excellent!" })] })) : percentage >= 60 ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83D\uDC4F" }), _jsx("h1", { className: "text-4xl font-bold text-yellow-400 mb-2", children: "Good Job!" })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83D\uDCDA" }), _jsx("h1", { className: "text-4xl font-bold text-blue-400 mb-2", children: "Keep Learning" })] })) }), _jsxs(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.3 }, className: "mb-8", children: [_jsxs("div", { className: "text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2", children: [correctCount, " / ", questions.length] }), _jsxs("p", { className: "text-2xl text-slate-300", children: [percentage, "% Correct"] })] }), _jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => {
                            setCurrentQuestion(0);
                            setAnswers([]);
                            setShowExplanation(false);
                            setQuizComplete(false);
                        }, className: "btn-primary px-8 py-3 text-lg", children: "Retry Quiz" })] }) }));
    }
    return (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "container mx-auto px-4 py-12", children: [_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsxs("h1", { className: "text-4xl font-bold mb-2", children: [structure.icon, " ", structure.name, " Quiz"] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "text-slate-400", children: "Test your understanding" }), _jsxs("div", { className: "text-sm text-slate-400", children: ["Question ", currentQuestion + 1, " of ", questions.length] })] })] }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "mb-8 h-2 bg-slate-700 rounded-full overflow-hidden", children: _jsx(motion.div, { animate: { width: `${((currentQuestion + 1) / questions.length) * 100}%` }, className: "h-full bg-gradient-to-r from-blue-500 to-cyan-500" }) }), _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "card-base mb-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-8", children: question.question }), _jsx("div", { className: "space-y-3 mb-8", children: question.options.map((option, idx) => {
                                    const isSelected = answers[currentQuestion] === idx;
                                    const isCorrectOption = idx === question.correct;
                                    let bgColor = "bg-slate-700 hover:bg-slate-600";
                                    if (isAnswered) {
                                        if (isCorrectOption) {
                                            bgColor = "bg-green-500/20 border-green-500";
                                        }
                                        else if (isSelected && !isCorrect) {
                                            bgColor = "bg-red-500/20 border-red-500";
                                        }
                                    }
                                    else if (isSelected) {
                                        bgColor = "bg-blue-500";
                                    }
                                    return (_jsxs(motion.button, { whileHover: !isAnswered ? { scale: 1.02 } : {}, whileTap: !isAnswered ? { scale: 0.98 } : {}, onClick: () => !isAnswered && handleAnswer(idx), disabled: isAnswered, className: `w-full p-4 rounded-lg text-left font-semibold transition border-2 border-transparent ${bgColor} disabled:cursor-default flex items-center justify-between`, children: [_jsx("span", { children: option }), isAnswered && isCorrectOption && (_jsx(CheckCircle, { className: "text-green-400", size: 20 })), isAnswered && isSelected && !isCorrect && (_jsx(XCircle, { className: "text-red-400", size: 20 }))] }, idx));
                                }) }), showExplanation && (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: `p-4 rounded-lg border-l-4 ${isCorrect
                                    ? "bg-green-500/10 border-green-500"
                                    : "bg-red-500/10 border-red-500"}`, children: [_jsx("p", { className: "font-semibold mb-2", children: isCorrect ? "✓ Correct!" : "✗ Incorrect" }), _jsx("p", { className: "text-sm text-slate-300", children: question.explanation })] }))] }, currentQuestion), isAnswered && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "flex gap-4", children: _jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: handleNext, className: "btn-primary flex-1 py-3 flex items-center justify-center gap-2", children: currentQuestion < questions.length - 1 ? (_jsxs(_Fragment, { children: [_jsx("span", { children: "Next" }), _jsx(SkipForward, { size: 18 })] })) : ("Finish") }) }))] })] }));
}
