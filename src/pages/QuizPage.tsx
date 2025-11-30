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
		{
			id: "arr-3",
			question:
				"What is the time complexity of deleting an element from the end of an array?",
			options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
			correct: 0,
			explanation: "Deleting from the end is O(1) as no shifting is required.",
		},
		{
			id: "arr-4",
			question: "Arrays are best used when you need to...",
			options: [
				"Frequently insert/delete from the middle",
				"Quickly access elements by index",
				"Save memory",
				"Perform complex sorting",
			],
			correct: 1,
			explanation: "Arrays excel at random access by index with O(1) time complexity.",
		},
		{
			id: "arr-5",
			question: "What is a disadvantage of static arrays?",
			options: [
				"Slow access time",
				"Fixed size that cannot be changed",
				"Cannot store different data types",
				"Requires manual memory management",
			],
			correct: 1,
			explanation:
				"Static arrays have a fixed size allocated at creation and cannot be resized.",
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
		{
			id: "stk-3",
			question: "What is a common real-world use case for stacks?",
			options: [
				"Managing browser history (back button)",
				"Scheduling tasks",
				"Finding shortest path",
				"Sorting data",
			],
			correct: 0,
			explanation: "Browser back buttons use stacks to remember the order of visited pages.",
		},
		{
			id: "stk-4",
			question: "What happens when you pop from an empty stack?",
			options: [
				"Returns the first element",
				"Stack overflow or exception",
				"Returns zero",
				"Nothing happens",
			],
			correct: 1,
			explanation: "Popping from an empty stack causes a stack underflow error or exception.",
		},
		{
			id: "stk-5",
			question: "What is the time complexity of peek operation in a stack?",
			options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
			correct: 0,
			explanation:
				"Peek operation just views the top element without removing it, which is O(1).",
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
		{
			id: "que-2",
			question: "What is the time complexity of enqueue operation?",
			options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
			correct: 0,
			explanation:
				"Enqueue adds an element to the rear, which is a constant-time operation O(1).",
		},
		{
			id: "que-3",
			question: "Where is a queue commonly used?",
			options: [
				"Printer job scheduling",
				"Browser tabs",
				"File compression",
				"Sorting numbers",
			],
			correct: 0,
			explanation:
				"Queues are used in printer scheduling where the first job submitted is printed first.",
		},
		{
			id: "que-4",
			question: "What is dequeue operation?",
			options: [
				"Removing from the front",
				"Removing from the rear",
				"Adding to the front",
				"Reversing the queue",
			],
			correct: 0,
			explanation:
				"Dequeue removes an element from the front of the queue, following FIFO principle.",
		},
		{
			id: "que-5",
			question: "A priority queue differs from a regular queue because...",
			options: [
				"Elements are removed based on priority, not order",
				"It uses less memory",
				"It's faster",
				"It can only store numbers",
			],
			correct: 0,
			explanation:
				"Priority queues remove elements based on their priority level, not insertion order.",
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
		{
			id: "ll-2",
			question:
				"What is the time complexity of inserting an element at the beginning of a linked list?",
			options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
			correct: 0,
			explanation: "If you have a reference to the head, insertion at the beginning is O(1).",
		},
		{
			id: "ll-3",
			question: "What is a disadvantage of singly linked lists?",
			options: [
				"Cannot insert elements",
				"Cannot access elements by index in O(1) time",
				"Requires more memory than arrays",
				"Can only store strings",
			],
			correct: 2,
			explanation: "Linked lists require additional memory for pointers compared to arrays.",
		},
		{
			id: "ll-4",
			question: "What is the difference between singly and doubly linked lists?",
			options: [
				"Doubly linked lists are faster",
				"Singly lists point both directions, doubly lists point one direction",
				"Doubly linked lists have pointers to both next and previous nodes",
				"They have no practical difference",
			],
			correct: 2,
			explanation:
				"Doubly linked lists have two pointers per node (next and previous), allowing traversal in both directions.",
		},
		{
			id: "ll-5",
			question: "What is the time complexity of searching in an unsorted linked list?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correct: 2,
			explanation:
				"Search in an unsorted linked list requires checking each node sequentially, which is O(n).",
		},
	],
	tree: [
		{
			id: "tree-1",
			question: "What is the main property of a binary search tree?",
			options: [
				"All nodes have exactly 2 children",
				"Left child values < parent < right child values",
				"All levels are completely filled",
				"Parent values are always smaller",
			],
			correct: 1,
			explanation:
				"In a BST, all values in the left subtree are less than the node, and all values in the right subtree are greater.",
		},
		{
			id: "tree-2",
			question:
				"What is the average time complexity of searching in a balanced binary search tree?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correct: 1,
			explanation:
				"A balanced BST has O(log n) search time by eliminating half of the remaining nodes at each step.",
		},
		{
			id: "tree-3",
			question: "What is the height of a tree with one node?",
			options: ["0", "1", "2", "undefined"],
			correct: 0,
			explanation:
				"The height of a single node tree is 0. Height is measured as the longest path to a leaf.",
		},
		{
			id: "tree-4",
			question: "What is an in-order traversal of a BST?",
			options: [
				"Left, Root, Right - produces sorted order",
				"Root, Left, Right",
				"Left, Right, Root",
				"Right, Root, Left",
			],
			correct: 0,
			explanation:
				"In-order traversal of a BST (Left, Root, Right) produces values in ascending order.",
		},
		{
			id: "tree-5",
			question: "What is the worst-case time complexity of searching in an unbalanced BST?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correct: 2,
			explanation:
				"An unbalanced BST can degenerate into a linked list, giving O(n) search complexity in the worst case.",
		},
	],
	graph: [
		{
			id: "graph-1",
			question: "What is the difference between a directed and undirected graph?",
			options: [
				"Directed graphs have weights, undirected don't",
				"Directed edges have direction, undirected edges go both ways",
				"Undirected graphs are always cyclic",
				"Directed graphs cannot have cycles",
			],
			correct: 1,
			explanation:
				"Directed graphs have edges with a specific direction (A→B), while undirected graphs have edges that work both ways (A-B).",
		},
		{
			id: "graph-2",
			question: "What is a cycle in a graph?",
			options: [
				"A path with even number of edges",
				"A path that starts and ends at the same vertex",
				"A complete subgraph",
				"A vertex with no outgoing edges",
			],
			correct: 1,
			explanation:
				"A cycle is a path that begins and ends at the same vertex, visiting other vertices in between.",
		},
		{
			id: "graph-3",
			question: "What is the time complexity of DFS (Depth-First Search) on a graph?",
			options: ["O(log n)", "O(n log n)", "O(V + E)", "O(V²)"],
			correct: 2,
			explanation:
				"DFS visits each vertex once and explores each edge once, resulting in O(V + E) complexity.",
		},
		{
			id: "graph-4",
			question: "What is the difference between BFS and DFS?",
			options: [
				"BFS is faster",
				"BFS uses a queue and explores level by level; DFS uses a stack and explores depth-first",
				"DFS uses less memory",
				"BFS can only work with trees",
			],
			correct: 1,
			explanation:
				"BFS (queue-based) explores neighbors level by level, while DFS (stack-based) explores as far as possible along each branch.",
		},
		{
			id: "graph-5",
			question:
				"What is the maximum number of edges in a simple undirected graph with n vertices?",
			options: ["n", "n-1", "n(n-1)/2", "n²"],
			correct: 2,
			explanation:
				"A complete undirected graph has n(n-1)/2 edges, where each pair of vertices is connected.",
		},
	],
	heap: [
		{
			id: "heap-1",
			question: "What is the main property of a min-heap?",
			options: [
				"All nodes are smaller than 10",
				"Parent value ≤ children values",
				"The smallest element is at the root",
				"Both B and C are correct",
			],
			correct: 3,
			explanation:
				"A min-heap ensures the parent is less than or equal to its children, with the minimum at the root.",
		},
		{
			id: "heap-2",
			question: "What is the time complexity of inserting an element into a heap?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
			correct: 1,
			explanation:
				"Insertion requires adding to the end and bubbling up, which takes O(log n) time.",
		},
		{
			id: "heap-3",
			question: "What is the time complexity of finding the minimum element in a min-heap?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
			correct: 0,
			explanation:
				"The minimum element is always at the root of a min-heap, so finding it is O(1).",
		},
		{
			id: "heap-4",
			question: "What operation is used to maintain heap property after removing the root?",
			options: ["Sift up", "Sift down", "Rotate", "Rebalance"],
			correct: 1,
			explanation:
				"After removing the root, the last element is placed at the root and sifted down to maintain the heap property.",
		},
		{
			id: "heap-5",
			question: "Heaps are commonly used for...",
			options: [
				"Storing sorted data",
				"Priority queues and heap sort",
				"Random access",
				"Graph traversal",
			],
			correct: 1,
			explanation:
				"Heaps are efficient for priority queues (always access top element) and heap sort algorithm.",
		},
	],
	"hash-table": [
		{
			id: "ht-1",
			question: "What is the average time complexity of searching in a hash table?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correct: 0,
			explanation:
				"Hash tables provide O(1) average-case time for search, insert, and delete operations.",
		},
		{
			id: "ht-2",
			question: "What is a hash collision?",
			options: [
				"When two keys hash to the same index",
				"When the table is full",
				"When memory is fragmented",
				"When the hash function is too slow",
			],
			correct: 0,
			explanation:
				"A collision occurs when two different keys produce the same hash value (same index).",
		},
		{
			id: "ht-3",
			question: "How can hash collisions be resolved?",
			options: [
				"Chaining or open addressing",
				"Deleting one of the keys",
				"Increasing the table size",
				"Using a different hash function",
			],
			correct: 0,
			explanation:
				"Chaining (linked lists at each index) and open addressing (finding another index) are common collision resolution techniques.",
		},
		{
			id: "ht-4",
			question: "What is the load factor in a hash table?",
			options: [
				"The number of collisions",
				"Ratio of number of entries to table size",
				"The speed of hash computation",
				"The memory usage",
			],
			correct: 1,
			explanation:
				"Load factor = (number of entries) / (table size). A high load factor increases collision probability.",
		},
		{
			id: "ht-5",
			question: "What happens to a hash table when the load factor gets too high?",
			options: [
				"Nothing happens",
				"The table is reorganized and resized",
				"Keys are deleted",
				"The hash function changes",
			],
			correct: 1,
			explanation:
				"When load factor exceeds a threshold (e.g., 0.75), the hash table is rehashed with a larger size.",
		},
	],
};

export default function QuizPage() {
	const { structureId } = useParams<{ structureId: string }>();
	const structure = getStructureById(structureId || "");
	const allQuestions = QUIZ_DATA[structureId || ""] || [];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState<number[]>([]);
	const [showExplanation, setShowExplanation] = useState(false);
	const [quizComplete, setQuizComplete] = useState(false);
	const [questionCount, setQuestionCount] = useState<number | null>(null);
	const [quizStarted, setQuizStarted] = useState(false);

	// Select random questions based on count
	const questions =
		quizStarted && questionCount
			? allQuestions.slice(0, Math.min(questionCount, allQuestions.length))
			: [];

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

	if (allQuestions.length === 0) {
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

	// Question count selection screen
	if (!quizStarted) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen"
			>
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					className="max-w-2xl w-full card-base"
				>
					<motion.div
						initial={{ y: -20 }}
						animate={{ y: 0 }}
						className="text-center mb-8"
					>
						<h1 className="text-4xl font-bold mb-2">
							{structure.icon} {structure.name} Quiz
						</h1>
						<p className="text-slate-400 text-lg">
							Select how many questions you want to answer
						</p>
					</motion.div>

					<div className="space-y-4 mb-8">
						<p className="text-slate-300">
							Available questions:{" "}
							<span className="font-bold text-cyan-400">{allQuestions.length}</span>
						</p>

						<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
							{[3, 5, 7, allQuestions.length].map((count) => {
								if (count > allQuestions.length) return null;
								return (
									<motion.button
										key={count}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => {
											setQuestionCount(count);
											setQuizStarted(true);
										}}
										className={`py-4 px-6 rounded-lg font-bold text-lg transition ${
											questionCount === count
												? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
												: "bg-slate-700 hover:bg-slate-600 text-slate-200"
										}`}
									>
										{count} Question{count !== 1 ? "s" : ""}
									</motion.button>
								);
							})}
						</div>

						<div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
							<p className="text-sm text-slate-300">
								💡 <span className="font-semibold">Tip:</span> You can always take
								the quiz again with a different number of questions!
							</p>
						</div>
					</div>
				</motion.div>
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
							setQuestionCount(null);
							setQuizStarted(false);
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
