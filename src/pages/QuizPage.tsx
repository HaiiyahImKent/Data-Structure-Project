import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getStructureById } from "@data/structures";
import { AlertCircle, CheckCircle, XCircle, SkipForward } from "lucide-react";

interface QuizQuestion {
	id: string;
	question: string;
	options: string[];
	correct: number;
	explanation: string;
}

const QUIZ_DATA: Record<string, QuizQuestion[]> = {
	array: [
		{
			id: "arr-1",
			question:
				"What is the time complexity of accessing an element at a specific index in an array?",
			options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
			correct: 0,
			explanation:
				"Array access by index is constant time because arrays store elements in contiguous memory locations.",
		},
		{
			id: "arr-2",
			question:
				"What is the time complexity of inserting an element in the middle of an array?",
			options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
			correct: 1,
			explanation:
				"Insertion in the middle requires shifting all elements after the insertion point, which is O(n) in the worst case.",
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
			explanation:
				"LIFO (Last In First Out) is the fundamental principle of stacks where the last element added is the first one removed.",
		},
		{
			id: "stk-2",
			question: "What is the time complexity of push operation in a stack?",
			options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
			correct: 0,
			explanation:
				"Push operation adds an element to the top of the stack, which is a constant-time operation O(1).",
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
			explanation:
				"FIFO (First In First Out) means the first element added to the queue is the first one to be removed.",
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
			explanation:
				"Linked lists can grow dynamically without needing to reallocate memory like arrays do.",
		},
	],
};

export default function QuizPage() {
	const { structureId } = useParams<{ structureId: string }>();
	const structure = getStructureById(structureId || "");
	const questions = QUIZ_DATA[structureId || ""] || [];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState<number[]>([]);
	const [showExplanation, setShowExplanation] = useState(false);
	const [quizComplete, setQuizComplete] = useState(false);

	if (!structure) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="container mx-auto px-4 py-12 flex items-center justify-center min-h-96"
			>
				<div className="card-base text-center">
					<AlertCircle className="mx-auto mb-4 text-yellow-400" size={48} />
					<h1 className="text-2xl font-bold mb-2">Not Found</h1>
					<p className="text-slate-400">This data structure doesn&apos;t exist.</p>
				</div>
			</motion.div>
		);
	}

	if (questions.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="container mx-auto px-4 py-12 flex items-center justify-center min-h-96"
			>
				<div className="card-base text-center">
					<AlertCircle className="mx-auto mb-4 text-blue-400" size={48} />
					<h1 className="text-2xl font-bold mb-2">Quiz Coming Soon</h1>
					<p className="text-slate-400">Quiz for {structure.name} is being prepared.</p>
				</div>
			</motion.div>
		);
	}

	const handleAnswer = (optionIndex: number) => {
		const newAnswers = [...answers];
		newAnswers[currentQuestion] = optionIndex;
		setAnswers(newAnswers);
		setShowExplanation(true);
	};

	const handleNext = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
			setShowExplanation(false);
		} else {
			setQuizComplete(true);
		}
	};

	const correctCount = answers.filter((answer, idx) => answer === questions[idx].correct).length;

	const question = questions[currentQuestion];
	const isAnswered = answers[currentQuestion] !== undefined;
	const isCorrect = isAnswered && answers[currentQuestion] === question.correct;

	if (quizComplete) {
		const percentage = Math.round((correctCount / questions.length) * 100);

		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="container mx-auto px-4 py-12"
			>
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					className="max-w-2xl mx-auto card-base text-center"
				>
					<motion.div
						initial={{ y: -20 }}
						animate={{ y: 0 }}
						transition={{ delay: 0.2 }}
						className="mb-6"
					>
						{percentage >= 80 ? (
							<>
								<div className="text-6xl mb-4">🎉</div>
								<h1 className="text-4xl font-bold text-green-400 mb-2">
									Excellent!
								</h1>
							</>
						) : percentage >= 60 ? (
							<>
								<div className="text-6xl mb-4">👏</div>
								<h1 className="text-4xl font-bold text-yellow-400 mb-2">
									Good Job!
								</h1>
							</>
						) : (
							<>
								<div className="text-6xl mb-4">📚</div>
								<h1 className="text-4xl font-bold text-blue-400 mb-2">
									Keep Learning
								</h1>
							</>
						)}
					</motion.div>

					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.3 }}
						className="mb-8"
					>
						<div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
							{correctCount} / {questions.length}
						</div>
						<p className="text-2xl text-slate-300">{percentage}% Correct</p>
					</motion.div>

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => {
							setCurrentQuestion(0);
							setAnswers([]);
							setShowExplanation(false);
							setQuizComplete(false);
						}}
						className="btn-primary px-8 py-3 text-lg"
					>
						Retry Quiz
					</motion.button>
				</motion.div>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="container mx-auto px-4 py-12"
		>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="mb-8"
			>
				<h1 className="text-4xl font-bold mb-2">
					{structure.icon} {structure.name} Quiz
				</h1>
				<div className="flex items-center justify-between">
					<p className="text-slate-400">Test your understanding</p>
					<div className="text-sm text-slate-400">
						Question {currentQuestion + 1} of {questions.length}
					</div>
				</div>
			</motion.div>

			{/* Progress Bar */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="mb-8 h-2 bg-slate-700 rounded-full overflow-hidden"
			>
				<motion.div
					animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
					className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
				/>
			</motion.div>

			{/* Main Quiz Area */}
			<div className="max-w-2xl mx-auto">
				<motion.div
					key={currentQuestion}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="card-base mb-8"
				>
					{/* Question */}
					<h2 className="text-2xl font-bold mb-8">{question.question}</h2>

					{/* Options */}
					<div className="space-y-3 mb-8">
						{question.options.map((option, idx) => {
							const isSelected = answers[currentQuestion] === idx;
							const isCorrectOption = idx === question.correct;

							let bgColor = "bg-slate-700 hover:bg-slate-600";
							if (isAnswered) {
								if (isCorrectOption) {
									bgColor = "bg-green-500/20 border-green-500";
								} else if (isSelected && !isCorrect) {
									bgColor = "bg-red-500/20 border-red-500";
								}
							} else if (isSelected) {
								bgColor = "bg-blue-500";
							}

							return (
								<motion.button
									key={idx}
									whileHover={!isAnswered ? { scale: 1.02 } : {}}
									whileTap={!isAnswered ? { scale: 0.98 } : {}}
									onClick={() => !isAnswered && handleAnswer(idx)}
									disabled={isAnswered}
									className={`w-full p-4 rounded-lg text-left font-semibold transition border-2 border-transparent ${bgColor} disabled:cursor-default flex items-center justify-between`}
								>
									<span>{option}</span>
									{isAnswered && isCorrectOption && (
										<CheckCircle className="text-green-400" size={20} />
									)}
									{isAnswered && isSelected && !isCorrect && (
										<XCircle className="text-red-400" size={20} />
									)}
								</motion.button>
							);
						})}
					</div>

					{/* Explanation */}
					{showExplanation && (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className={`p-4 rounded-lg border-l-4 ${
								isCorrect
									? "bg-green-500/10 border-green-500"
									: "bg-red-500/10 border-red-500"
							}`}
						>
							<p className="font-semibold mb-2">
								{isCorrect ? "✓ Correct!" : "✗ Incorrect"}
							</p>
							<p className="text-sm text-slate-300">{question.explanation}</p>
						</motion.div>
					)}
				</motion.div>

				{/* Navigation Buttons */}
				{isAnswered && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="flex gap-4"
					>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={handleNext}
							className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"
						>
							{currentQuestion < questions.length - 1 ? (
								<>
									<span>Next</span>
									<SkipForward size={18} />
								</>
							) : (
								"Finish"
							)}
						</motion.button>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
}
