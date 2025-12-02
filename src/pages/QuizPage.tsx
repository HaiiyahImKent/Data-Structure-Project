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
		{
			id: "arr-6",
			question: "How are arrays stored in memory?",
			options: [
				"In scattered locations with pointers",
				"In contiguous memory locations",
				"In a tree structure",
				"In random order",
			],
			correct: 1,
			explanation:
				"Arrays are stored in contiguous memory locations, enabling fast index-based access.",
		},
		{
			id: "arr-7",
			question:
				"What is the time complexity of searching for an element in an unsorted array?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correct: 2,
			explanation:
				"Without sorting or indexing, you must check each element sequentially, resulting in O(n) complexity.",
		},
		{
			id: "arr-8",
			question: "What is the advantage of binary search over linear search in arrays?",
			options: [
				"Binary search doesn't require a sorted array",
				"Binary search has O(log n) complexity while linear search is O(n)",
				"Binary search uses less memory",
				"Binary search works with any data type",
			],
			correct: 1,
			explanation:
				"Binary search requires a sorted array but achieves O(log n) complexity by eliminating half of the search space with each comparison.",
		},
		{
			id: "arr-9",
			question: "What happens when you try to access an array index that is out of bounds?",
			options: [
				"Returns zero",
				"Returns the last element",
				"Throws an exception or returns undefined",
				"Automatically resizes the array",
			],
			correct: 2,
			explanation:
				"Out-of-bounds access typically throws an ArrayIndexOutOfBoundsException or returns undefined depending on the language.",
		},
		{
			id: "arr-10",
			question: "What is a dynamic array?",
			options: [
				"An array that changes its sorting order",
				"An array that resizes automatically when needed (like ArrayList or Vector)",
				"An array that is sorted dynamically",
				"An array that stores different data types",
			],
			correct: 1,
			explanation:
				"Dynamic arrays grow automatically when they reach capacity, providing flexibility while maintaining O(1) access time.",
		},
		{
			id: "arr-11",
			question: "What is the space complexity of an array?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correct: 2,
			explanation:
				"Arrays use O(n) space to store n elements, where each element occupies a fixed amount of memory.",
		},
		{
			id: "arr-12",
			question: "Which operation is fastest in an array?",
			options: ["Insertion", "Deletion", "Access by index", "Search"],
			correct: 2,
			explanation: "Access by index is O(1), making it the fastest operation for arrays.",
		},
		{
			id: "arr-13",
			question: "What is the time complexity of inserting at the beginning of an array?",
			options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
			correct: 1,
			explanation:
				"Insertion at the beginning requires shifting all existing elements, resulting in O(n) complexity.",
		},
		{
			id: "arr-14",
			question: "How many dimensions can an array have?",
			options: ["Only 1D", "Only 2D", "Any number of dimensions", "Maximum 3D"],
			correct: 2,
			explanation:
				"Arrays can have any number of dimensions depending on the language implementation.",
		},
		{
			id: "arr-15",
			question: "What is the first index of an array in most programming languages?",
			options: ["0", "1", "-1", "Depends on the language"],
			correct: 0,
			explanation:
				"Most modern programming languages use zero-based indexing, where the first element is at index 0.",
		},
		{
			id: "arr-16",
			question: "What is a sparse array?",
			options: [
				"An array with all elements populated",
				"An array with mostly empty or zero values",
				"An array that is sorted",
				"An array that cannot be resized",
			],
			correct: 1,
			explanation:
				"A sparse array contains mostly empty or default values with few actual data elements.",
		},
		{
			id: "arr-17",
			question: "What is the amortized time complexity of adding to a dynamic array?",
			options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
			correct: 0,
			explanation:
				"Although occasional resizing is O(n), the amortized cost per insertion is O(1).",
		},
		{
			id: "arr-18",
			question: "Which data structure is best for frequency counting?",
			options: ["Stack", "Queue", "Array", "LinkedList"],
			correct: 2,
			explanation:
				"Arrays can use indices as keys for frequency counting, providing O(1) lookups and updates.",
		},
		{
			id: "arr-19",
			question: "What is the time complexity of reversing an array?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correct: 2,
			explanation:
				"Reversing an array requires visiting each element once, resulting in O(n) complexity.",
		},
		{
			id: "arr-20",
			question: "What advantage does an array have over a linked list for random access?",
			options: [
				"Arrays use less memory",
				"Arrays can be accessed by index in O(1) time",
				"Arrays don't require pointers",
				"Arrays can store any data type",
			],
			correct: 1,
			explanation:
				"Arrays provide O(1) random access by index, while linked lists require O(n) traversal to reach a specific element.",
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
		{
			id: "stk-6",
			question: "What is the primary application of stacks in programming?",
			options: [
				"Database indexing",
				"Function call management",
				"Network routing",
				"Data compression",
			],
			correct: 1,
			explanation:
				"Stacks manage function calls in the call stack, pushing when entering a function and popping when returning.",
		},
		{
			id: "stk-7",
			question: "How does expression evaluation use stacks?",
			options: [
				"It doesn't use stacks",
				"For converting infix to postfix notation and evaluating",
				"For sorting operations",
				"For memory management",
			],
			correct: 1,
			explanation:
				"Stacks are used to convert and evaluate expressions, particularly for handling operator precedence.",
		},
		{
			id: "stk-8",
			question: "What is the space complexity of a stack with n elements?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correct: 2,
			explanation: "A stack storing n elements requires O(n) space to hold those elements.",
		},
		{
			id: "stk-9",
			question: "What is the difference between push and pop?",
			options: [
				"Push removes, pop adds",
				"Push adds to top, pop removes from top",
				"They are the same operation",
				"Push is faster than pop",
			],
			correct: 1,
			explanation:
				"Push adds an element to the top of the stack, while pop removes and returns the top element.",
		},
		{
			id: "stk-10",
			question: "What programming language feature uses stacks internally?",
			options: ["Recursion", "Loops", "Conditional statements", "Variable declaration"],
			correct: 0,
			explanation:
				"Recursion relies on the call stack to store function calls and local variables.",
		},
		{
			id: "stk-11",
			question: "Can a stack be implemented using an array or linked list?",
			options: ["Only array", "Only linked list", "Both array and linked list", "Neither"],
			correct: 2,
			explanation:
				"Stacks can be efficiently implemented using either arrays or linked lists.",
		},
		{
			id: "stk-12",
			question: "What is the time complexity of accessing an arbitrary element in a stack?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correct: 2,
			explanation:
				"Without popping elements, accessing arbitrary elements requires O(n) time.",
		},
		{
			id: "stk-13",
			question: "How is undo/redo functionality typically implemented?",
			options: [
				"Using queues",
				"Using two stacks - one for undo, one for redo",
				"Using arrays",
				"Using trees",
			],
			correct: 1,
			explanation:
				"Undo/redo uses two stacks: one tracks changes for undo, the other for redo when undoing.",
		},
		{
			id: "stk-14",
			question: "What is the maximum capacity of a stack?",
			options: [
				"Fixed at creation time",
				"Unlimited",
				"Depends on the implementation",
				"Always 1000",
			],
			correct: 2,
			explanation:
				"Stack capacity depends on the underlying implementation (array-based or dynamic).",
		},
		{
			id: "stk-15",
			question: "What is the advantage of stacks over arrays for function calls?",
			options: [
				"Stacks are faster",
				"Automatic cleanup of function parameters when returning",
				"Stacks use less memory",
				"Stacks support sorting",
			],
			correct: 1,
			explanation:
				"Stacks automatically manage function scope and cleanup, making them ideal for call stack management.",
		},
		{
			id: "stk-16",
			question: "How does depth-first search relate to stacks?",
			options: [
				"DFS doesn't use stacks",
				"DFS can be implemented using a stack",
				"DFS uses queues instead",
				"DFS uses trees",
			],
			correct: 1,
			explanation:
				"Depth-first search can be implemented iteratively using a stack to track unvisited vertices.",
		},
		{
			id: "stk-17",
			question: "What is stack overflow?",
			options: [
				"When stack becomes too full and runs out of memory",
				"When popping from an empty stack",
				"When pushing too many elements",
				"Both A and C are related to overflow",
			],
			correct: 0,
			explanation:
				"Stack overflow occurs when the stack runs out of allocated memory, often from too much recursion.",
		},
		{
			id: "stk-18",
			question: "What is the relationship between recursion depth and stack size?",
			options: [
				"No relationship",
				"Greater recursion depth requires larger stack",
				"Greater recursion depth requires smaller stack",
				"Stack size is random",
			],
			correct: 1,
			explanation:
				"Each recursive call uses stack space, so deeper recursion requires more stack memory.",
		},
		{
			id: "stk-19",
			question: "How does parenthesis matching use stacks?",
			options: [
				"It doesn't use stacks",
				"Push opening brackets, pop when matching closing bracket",
				"Stack counts total brackets",
				"Stacks validate individual brackets",
			],
			correct: 1,
			explanation:
				"Stacks match parentheses by pushing opening brackets and popping when finding matching closing brackets.",
		},
		{
			id: "stk-20",
			question: "What is the top of a stack?",
			options: [
				"The first element added",
				"The last element added",
				"The maximum size",
				"The memory address",
			],
			correct: 1,
			explanation:
				"The top of a stack refers to the last element added, which is the first one to be removed (LIFO).",
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
		{
			id: "que-6",
			question: "What is the time complexity of dequeue operation?",
			options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
			correct: 0,
			explanation: "Dequeue removes from the front in O(1) time with proper implementation.",
		},
		{
			id: "que-7",
			question: "How does BFS (Breadth-First Search) use queues?",
			options: [
				"It doesn't use queues",
				"Queue stores unvisited vertices at current level",
				"Queue stores visited vertices",
				"Queue manages memory",
			],
			correct: 1,
			explanation:
				"BFS uses a queue to explore vertices level by level, visiting all neighbors before moving deeper.",
		},
		{
			id: "que-8",
			question: "What is the front of a queue?",
			options: [
				"The last element added",
				"The first element to be removed",
				"The largest element",
				"The memory address",
			],
			correct: 1,
			explanation:
				"The front of a queue is where elements are dequeued from (FIFO principle).",
		},
		{
			id: "que-9",
			question: "What is the rear of a queue?",
			options: [
				"The first element added",
				"Where new elements are enqueued",
				"The smallest element",
				"The end of memory",
			],
			correct: 1,
			explanation: "The rear of a queue is where new elements are added (enqueue).",
		},
		{
			id: "que-10",
			question: "Can a circular queue wrap around?",
			options: [
				"No, queues are always linear",
				"Yes, it reuses freed memory positions",
				"Only for linked lists",
				"It depends on the size",
			],
			correct: 1,
			explanation:
				"Circular queues wrap around to reuse memory positions at the front after dequeuing.",
		},
		{
			id: "que-11",
			question: "What is the space complexity of a queue with n elements?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correct: 2,
			explanation: "A queue storing n elements requires O(n) space to hold those elements.",
		},
		{
			id: "que-12",
			question: "What advantage does a queue have in task scheduling?",
			options: [
				"Queues are faster",
				"Fair scheduling - tasks are processed in order",
				"Queues use less memory",
				"Queues support random access",
			],
			correct: 1,
			explanation:
				"Queues ensure fair scheduling by processing tasks in the order they arrive (FIFO).",
		},
		{
			id: "que-13",
			question: "How are double-ended queues (deques) different?",
			options: [
				"Deques can only hold one element",
				"Elements can be added/removed from both ends",
				"Deques are always sorted",
				"Deques are faster than queues",
			],
			correct: 1,
			explanation:
				"Deques allow insertion and deletion from both front and rear, providing more flexibility.",
		},
		{
			id: "que-14",
			question: "What happens when you dequeue from an empty queue?",
			options: [
				"Returns zero",
				"Throws an exception or returns null",
				"Returns the last element",
				"Nothing happens",
			],
			correct: 1,
			explanation:
				"Dequeuing from an empty queue throws an exception or returns null depending on implementation.",
		},
		{
			id: "que-15",
			question: "Can a queue be implemented using linked lists?",
			options: [
				"No, only arrays work",
				"Yes, with nodes having next pointers",
				"Only with arrays",
				"It depends on the language",
			],
			correct: 1,
			explanation:
				"Queues can be efficiently implemented using linked lists with pointers to front and rear.",
		},
		{
			id: "que-16",
			question: "What is a major advantage of queue-based systems?",
			options: [
				"Random access to elements",
				"Better memory usage",
				"Fair distribution and load balancing",
				"Faster processing",
			],
			correct: 2,
			explanation:
				"Queues distribute work fairly and enable load balancing by processing requests in order.",
		},
		{
			id: "que-17",
			question: "How does a circular queue differ from a regular queue?",
			options: [
				"No difference",
				"Circular reuses space; regular queue wastes space",
				"Circular is always faster",
				"Circular can only store numbers",
			],
			correct: 1,
			explanation:
				"Circular queues efficiently reuse freed positions by wrapping around, avoiding wasted space.",
		},
		{
			id: "que-18",
			question: "What is peek operation in a queue?",
			options: [
				"Remove element from front",
				"View element at front without removing",
				"Remove element from rear",
				"Add element to front",
			],
			correct: 1,
			explanation: "Peek allows viewing the front element without modifying the queue.",
		},
		{
			id: "que-19",
			question: "How are message queues used in distributed systems?",
			options: [
				"They don't",
				"For asynchronous communication and decoupling services",
				"For sorting data",
				"For memory management",
			],
			correct: 1,
			explanation:
				"Message queues enable asynchronous communication between services, improving system reliability.",
		},
		{
			id: "que-20",
			question: "What is the time complexity of accessing a specific element in a queue?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correct: 2,
			explanation:
				"Accessing arbitrary elements requires traversing from the front, which is O(n).",
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
		{
			id: "ll-6",
			question: "What is a node in a linked list?",
			options: [
				"A single value",
				"A container with data and pointers to other nodes",
				"A memory address",
				"A sorting mechanism",
			],
			correct: 1,
			explanation:
				"A node is a basic unit of a linked list containing data and pointers (references) to other nodes.",
		},
		{
			id: "ll-7",
			question: "What is the head of a linked list?",
			options: [
				"The last node",
				"The first node in the list",
				"The largest element",
				"The pointer to memory",
			],
			correct: 1,
			explanation: "The head is the first node in a linked list, serving as the entry point.",
		},
		{
			id: "ll-8",
			question: "What is the tail of a linked list?",
			options: [
				"The first node",
				"The last node pointing to null",
				"The smallest element",
				"Random node",
			],
			correct: 1,
			explanation:
				"The tail is the last node in a linked list, typically with a null pointer.",
		},
		{
			id: "ll-9",
			question: "What is the time complexity of accessing the nth element in a linked list?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correct: 2,
			explanation:
				"Accessing the nth element requires traversing from the head, which is O(n).",
		},
		{
			id: "ll-10",
			question: "What is a circular linked list?",
			options: [
				"A list that cannot be traversed",
				"A list where the last node points back to the first node",
				"A list with only one node",
				"A sorted linked list",
			],
			correct: 1,
			explanation:
				"In a circular linked list, the last node points to the first node, creating a cycle.",
		},
		{
			id: "ll-11",
			question: "How much extra memory does each node in a singly linked list require?",
			options: [
				"No extra memory",
				"One pointer (8-16 bytes typically)",
				"Two pointers",
				"Depends on data type",
			],
			correct: 1,
			explanation:
				"Singly linked list nodes require one additional pointer per node compared to array elements.",
		},
		{
			id: "ll-12",
			question: "What is the advantage of doubly linked lists?",
			options: [
				"Faster searching",
				"Backward traversal and easier deletion",
				"Less memory usage",
				"Better for sorting",
			],
			correct: 1,
			explanation:
				"Doubly linked lists allow traversal in both directions and simplify deletion operations.",
		},
		{
			id: "ll-13",
			question: "What is the time complexity of deleting a node from a linked list?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correct: 0,
			explanation:
				"If you have a reference to the node to delete, deletion is O(1) for pointer updates.",
		},
		{
			id: "ll-14",
			question: "How does a linked list handle dynamic sizing?",
			options: [
				"It has a fixed size",
				"Nodes are dynamically allocated as needed",
				"It requires reallocation",
				"It cannot grow",
			],
			correct: 1,
			explanation:
				"Linked lists allocate new nodes dynamically, allowing automatic growth without reallocation.",
		},
		{
			id: "ll-15",
			question: "What is a tortoise and hare algorithm used for in linked lists?",
			options: ["Sorting", "Detecting cycles", "Reversing", "Merging lists"],
			correct: 1,
			explanation:
				"The tortoise and hare algorithm detects cycles by using two pointers at different speeds.",
		},
		{
			id: "ll-16",
			question: "What is the space complexity of a linked list with n nodes?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correct: 2,
			explanation: "A linked list with n nodes requires O(n) space for data and pointers.",
		},
		{
			id: "ll-17",
			question: "How can you reverse a linked list?",
			options: [
				"Create a new array",
				"Iterate and reverse pointers",
				"Use a stack",
				"Both B and C are valid approaches",
			],
			correct: 3,
			explanation:
				"Linked lists can be reversed by reversing pointers iteratively or using a stack.",
		},
		{
			id: "ll-18",
			question: "What advantage do linked lists have for insertion at front?",
			options: [
				"No advantage",
				"O(1) insertion if you have head reference",
				"Requires reallocation",
				"Only at specific positions",
			],
			correct: 1,
			explanation:
				"Linked lists provide O(1) insertion at the front when you have the head reference.",
		},
		{
			id: "ll-19",
			question: "What is a memory leak risk in linked lists?",
			options: [
				"Pointers not being freed",
				"Too many allocations",
				"Cache misses",
				"Data corruption",
			],
			correct: 0,
			explanation:
				"If node memory isn't properly freed, it can lead to memory leaks in systems without garbage collection.",
		},
		{
			id: "ll-20",
			question: "What is cache locality and how does it affect linked lists?",
			options: [
				"Linked lists have better cache locality",
				"Arrays have better cache locality; linked lists suffer from poor cache performance",
				"Cache locality doesn't matter",
				"Only for memory addresses",
			],
			correct: 1,
			explanation:
				"Arrays have better cache locality since they're contiguous; linked lists scattered in memory suffer cache misses.",
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
		{
			id: "tree-6",
			question: "What is a leaf node?",
			options: [
				"The root node",
				"A node with children",
				"A node with no children",
				"The largest node",
			],
			correct: 2,
			explanation:
				"A leaf node is a node with no children, representing the end of a branch.",
		},
		{
			id: "tree-7",
			question: "What is the root of a tree?",
			options: [
				"The deepest node",
				"The first/topmost node",
				"The node with most children",
				"The smallest node",
			],
			correct: 1,
			explanation: "The root is the topmost node of a tree, serving as the starting point.",
		},
		{
			id: "tree-8",
			question: "What is pre-order traversal?",
			options: [
				"Left, Root, Right",
				"Root, Left, Right",
				"Left, Right, Root",
				"Random order",
			],
			correct: 1,
			explanation:
				"Pre-order traversal visits the root first, then left subtree, then right subtree.",
		},
		{
			id: "tree-9",
			question: "What is post-order traversal?",
			options: [
				"Root, Left, Right",
				"Left, Root, Right",
				"Left, Right, Root",
				"Right, Root, Left",
			],
			correct: 2,
			explanation: "Post-order traversal visits left subtree, right subtree, then root.",
		},
		{
			id: "tree-10",
			question: "What is a balanced binary tree?",
			options: [
				"A tree with all nodes at same level",
				"A tree where heights of subtrees differ by at most 1",
				"A tree with only left children",
				"A tree that cannot be modified",
			],
			correct: 1,
			explanation:
				"A balanced tree maintains heights of subtrees within a certain range, ensuring optimal performance.",
		},
		{
			id: "tree-11",
			question: "What are Red-Black trees used for?",
			options: [
				"Sorting only",
				"Self-balancing BSTs with specific properties",
				"Graph traversal",
				"String matching",
			],
			correct: 1,
			explanation:
				"Red-Black trees are self-balancing BSTs that maintain balance through color properties.",
		},
		{
			id: "tree-12",
			question: "What is the depth of a node?",
			options: [
				"Number of children",
				"Distance from root to the node",
				"Number of leaves below",
				"Tree's maximum height",
			],
			correct: 1,
			explanation: "Depth is the number of edges from the root to a specific node.",
		},
		{
			id: "tree-13",
			question: "What is the height of a tree?",
			options: [
				"Number of nodes",
				"Longest path from root to leaf",
				"Number of children",
				"Total memory used",
			],
			correct: 1,
			explanation: "Height is the longest path from the root to any leaf node.",
		},
		{
			id: "tree-14",
			question: "How many children can each node have in a binary tree?",
			options: ["1", "2", "Any number", "Depends on data"],
			correct: 1,
			explanation:
				"Binary trees allow each node to have at most 2 children (left and right).",
		},
		{
			id: "tree-15",
			question: "What is a complete binary tree?",
			options: [
				"All nodes have 2 children",
				"All levels filled except possibly the last",
				"All nodes have 1 child",
				"No specific pattern",
			],
			correct: 1,
			explanation:
				"A complete binary tree has all levels filled except possibly the last, which is filled left to right.",
		},
		{
			id: "tree-16",
			question: "What is an AVL tree?",
			options: [
				"A random tree",
				"A self-balancing BST with height difference ≤ 1",
				"A tree with no balancing",
				"A sorted tree only",
			],
			correct: 1,
			explanation:
				"AVL trees are self-balancing BSTs maintaining height balance for O(log n) operations.",
		},
		{
			id: "tree-17",
			question: "What is a perfect binary tree?",
			options: [
				"All nodes except root have 2 children",
				"All internal nodes have 2 children and all leaves at same level",
				"All nodes are sorted",
				"No duplicate values",
			],
			correct: 1,
			explanation:
				"A perfect binary tree has all internal nodes with 2 children and all leaves at the same depth.",
		},
		{
			id: "tree-18",
			question: "How is a BST useful for searching?",
			options: [
				"It's not useful",
				"It eliminates half of search space with each comparison",
				"It requires checking all nodes",
				"It only works for small datasets",
			],
			correct: 1,
			explanation:
				"BST structure allows elimination of half the remaining nodes with each comparison, achieving O(log n).",
		},
		{
			id: "tree-19",
			question: "What is a parent node?",
			options: [
				"The root node only",
				"A node with children",
				"The deepest node",
				"The largest node",
			],
			correct: 1,
			explanation: "A parent node is any node that has one or more child nodes.",
		},
		{
			id: "tree-20",
			question: "What is sibling nodes?",
			options: [
				"Nodes at same depth from root",
				"Nodes with same parent",
				"Nodes in different subtrees",
				"Root and leaves",
			],
			correct: 1,
			explanation: "Sibling nodes are nodes that share the same parent.",
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
		{
			id: "graph-6",
			question: "What is a vertex (or node) in a graph?",
			options: [
				"A connection between nodes",
				"A fundamental unit representing data",
				"The weight of an edge",
				"A traversal method",
			],
			correct: 1,
			explanation:
				"A vertex is the fundamental unit of a graph representing entities or data points.",
		},
		{
			id: "graph-7",
			question: "What is an edge in a graph?",
			options: [
				"A single vertex",
				"A connection between two vertices",
				"A sorted list",
				"A circular structure",
			],
			correct: 1,
			explanation:
				"An edge is a connection between two vertices, potentially with a weight or direction.",
		},
		{
			id: "graph-8",
			question: "What is a weighted graph?",
			options: [
				"A graph with vertices only",
				"A graph where edges have associated values/weights",
				"A graph with cycles",
				"A graph that is always directed",
			],
			correct: 1,
			explanation:
				"Weighted graphs have numerical values associated with edges, representing distances, costs, etc.",
		},
		{
			id: "graph-9",
			question: "What is adjacency in a graph?",
			options: [
				"Physical proximity",
				"Two vertices connected by an edge",
				"Same data value",
				"Same depth level",
			],
			correct: 1,
			explanation: "Two vertices are adjacent if they are directly connected by an edge.",
		},
		{
			id: "graph-10",
			question: "What is a connected graph?",
			options: [
				"A graph with no edges",
				"A graph where you can reach any vertex from any other",
				"A graph with cycles",
				"A graph that is directed",
			],
			correct: 1,
			explanation:
				"A connected graph allows traversal from any vertex to any other vertex through edges.",
		},
		{
			id: "graph-11",
			question: "What is graph representation using an adjacency matrix?",
			options: [
				"A linked list of vertices",
				"A 2D array showing edge presence between vertices",
				"A sorted array",
				"A tree structure",
			],
			correct: 1,
			explanation:
				"Adjacency matrix is an n×n matrix where entry (i,j) indicates edge presence between vertices i and j.",
		},
		{
			id: "graph-12",
			question: "What is graph representation using an adjacency list?",
			options: [
				"A matrix",
				"A list of vertices with their connected vertices",
				"Sorted vertices",
				"A binary tree",
			],
			correct: 1,
			explanation:
				"Adjacency list represents each vertex with a list of its adjacent vertices, using less space than matrices.",
		},
		{
			id: "graph-13",
			question: "What is a spanning tree?",
			options: [
				"A tree with cycles",
				"A subgraph connecting all vertices with minimum edges",
				"A directed graph",
				"A graph with weights",
			],
			correct: 1,
			explanation:
				"A spanning tree is an acyclic subgraph connecting all vertices using n-1 edges.",
		},
		{
			id: "graph-14",
			question: "What is the time complexity of BFS on a graph?",
			options: ["O(log n)", "O(V + E)", "O(V²)", "O(E log V)"],
			correct: 1,
			explanation:
				"BFS visits each vertex and edge once, resulting in O(V + E) time complexity.",
		},
		{
			id: "graph-15",
			question: "What is Dijkstra's algorithm used for?",
			options: [
				"Sorting vertices",
				"Finding shortest path in weighted graphs",
				"Detecting cycles",
				"Graph coloring",
			],
			correct: 1,
			explanation:
				"Dijkstra's algorithm finds the shortest path between vertices in weighted graphs.",
		},
		{
			id: "graph-16",
			question: "What is a bipartite graph?",
			options: [
				"A graph with 2 vertices",
				"A graph whose vertices can be divided into 2 sets with no edges within sets",
				"A graph with 2 edges",
				"A directed graph",
			],
			correct: 1,
			explanation:
				"A bipartite graph has vertices partitioned into two sets with edges only between sets.",
		},
		{
			id: "graph-17",
			question: "What is the degree of a vertex?",
			options: [
				"Its position in order",
				"The number of edges connected to it",
				"Its value",
				"Its depth",
			],
			correct: 1,
			explanation: "Degree is the number of edges incident to a vertex.",
		},
		{
			id: "graph-18",
			question: "What is a DAG (Directed Acyclic Graph)?",
			options: [
				"A directed graph with cycles",
				"A directed graph with no cycles",
				"An undirected graph",
				"A graph with one vertex",
			],
			correct: 1,
			explanation:
				"A DAG is a directed graph containing no cycles, useful for dependency representation.",
		},
		{
			id: "graph-19",
			question: "What does topological sorting do?",
			options: [
				"Sorts by position",
				"Orders vertices linearly respecting edge directions",
				"Removes edges",
				"Counts vertices",
			],
			correct: 1,
			explanation:
				"Topological sorting orders vertices such that for every edge u→v, u comes before v.",
		},
		{
			id: "graph-20",
			question: "What is Floyd-Warshall algorithm used for?",
			options: [
				"Finding minimum spanning tree",
				"Finding shortest paths between all vertex pairs",
				"Sorting vertices",
				"Detecting bipartite graphs",
			],
			correct: 1,
			explanation:
				"Floyd-Warshall finds shortest paths between all pairs of vertices in weighted graphs.",
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
		{
			id: "heap-6",
			question: "What is a max-heap?",
			options: [
				"A heap with maximum size",
				"A heap where parent ≥ children",
				"A heap with cycles",
				"A sorted list",
			],
			correct: 1,
			explanation:
				"In a max-heap, every parent node is greater than or equal to its children.",
		},
		{
			id: "heap-7",
			question: "What is heapify operation?",
			options: [
				"Sorting the heap",
				"Converting an array into a heap structure",
				"Removing all elements",
				"Counting heap size",
			],
			correct: 1,
			explanation:
				"Heapify converts an unsorted array into a valid heap structure by rearranging elements.",
		},
		{
			id: "heap-8",
			question: "What is heap sort algorithm?",
			options: [
				"Sorting using selection sort",
				"Sorting by building a heap and repeatedly extracting root",
				"Sorting using quick sort",
				"Sorting using merge sort",
			],
			correct: 1,
			explanation:
				"Heap sort builds a heap from array elements, then repeatedly extracts root (max/min), resulting in sorted order.",
		},
		{
			id: "heap-9",
			question: "What is the space complexity of heap sort?",
			options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
			correct: 2,
			explanation:
				"Heap sort sorts in-place using only O(1) additional space beyond the input array.",
		},
		{
			id: "heap-10",
			question: "What is the time complexity of building a heap from n elements?",
			options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
			correct: 0,
			explanation:
				"Building a heap from n elements can be done in O(n) time using bottom-up approach.",
		},
		{
			id: "heap-11",
			question: "How is a heap typically represented in memory?",
			options: [
				"Linked list",
				"Array (level-order traversal)",
				"Binary tree pointers",
				"Hash table",
			],
			correct: 1,
			explanation:
				"Heaps are usually represented as arrays where children of node i are at indices 2i+1 and 2i+2.",
		},
		{
			id: "heap-12",
			question: "What is a priority queue?",
			options: [
				"A queue with fixed size",
				"A queue where elements have priorities, served by priority",
				"A sorted linked list",
				"A stack",
			],
			correct: 1,
			explanation:
				"Priority queue is an abstract data type where elements are served based on their priority, often implemented using heaps.",
		},
		{
			id: "heap-13",
			question: "What does peek operation do in a heap?",
			options: [
				"Removes and returns minimum",
				"Returns root without removing",
				"Counts elements",
				"Reorders heap",
			],
			correct: 1,
			explanation:
				"Peek returns the root element (max in max-heap, min in min-heap) without removing it.",
		},
		{
			id: "heap-14",
			question: "What does extract operation do in a heap?",
			options: [
				"Returns root without removing",
				"Returns and removes root element",
				"Adds new element",
				"Counts elements",
			],
			correct: 1,
			explanation:
				"Extract removes and returns the root element, then restructures the remaining heap.",
		},
		{
			id: "heap-15",
			question: "What is the purpose of heapify-up (bubble up) operation?",
			options: ["Move element toward root", "Remove element", "Sort the heap", "Count nodes"],
			correct: 0,
			explanation:
				"Heapify-up moves a newly inserted element toward the root to maintain heap property.",
		},
		{
			id: "heap-16",
			question: "What is the purpose of heapify-down (bubble down) operation?",
			options: [
				"Move element toward root",
				"Move element away from root toward leaves",
				"Remove element",
				"Sort the heap",
			],
			correct: 1,
			explanation:
				"Heapify-down moves an element from root down the tree swapping with larger/smaller child to maintain heap property.",
		},
		{
			id: "heap-17",
			question: "What is a binary heap?",
			options: [
				"Any binary tree",
				"A complete binary tree with heap property",
				"Two heaps combined",
				"A tree with 2 nodes",
			],
			correct: 1,
			explanation:
				"Binary heap is a complete binary tree satisfying heap property where children of node i are at 2i+1 and 2i+2.",
		},
		{
			id: "heap-18",
			question: "Can a heap have duplicate values?",
			options: [
				"No, all values must be unique",
				"Yes, duplicates are allowed",
				"Only in max-heaps",
				"Only at leaf level",
			],
			correct: 1,
			explanation:
				"Heaps allow duplicate values. The heap property only requires parent-child relationships, not uniqueness.",
		},
		{
			id: "heap-19",
			question: "What is the time complexity of heap sort?",
			options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
			correct: 1,
			explanation:
				"Heap sort has O(n) build time plus O(n log n) extraction time, resulting in overall O(n log n).",
		},
		{
			id: "heap-20",
			question: "What is a d-ary heap?",
			options: [
				"A heap with d size",
				"A heap where each node has d children",
				"A heap with cycles",
				"A sorted array",
			],
			correct: 1,
			explanation:
				"D-ary heap is a generalization where each node has d children instead of 2, useful for some applications.",
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
		{
			id: "ht-6",
			question: "What is chaining in hash table collision resolution?",
			options: [
				"Linking all keys together",
				"Storing collided elements in a linked list at the same index",
				"Deleting the first element",
				"Moving all elements to end",
			],
			correct: 1,
			explanation:
				"Chaining maintains a linked list at each hash table index to handle multiple keys hashing to the same location.",
		},
		{
			id: "ht-7",
			question: "What is open addressing in hash table collision resolution?",
			options: [
				"Leaving the address open",
				"Finding another empty address when collision occurs",
				"Using random addresses",
				"Removing collided elements",
			],
			correct: 1,
			explanation:
				"Open addressing searches for another empty slot in the hash table when a collision occurs.",
		},
		{
			id: "ht-8",
			question: "What is linear probing?",
			options: [
				"Searching linearly from start",
				"Checking next slot sequentially when collision occurs",
				"Using linear hash function",
				"Linear time complexity",
			],
			correct: 1,
			explanation:
				"Linear probing checks consecutive slots (hash(key), hash(key)+1, hash(key)+2...) to find an empty spot.",
		},
		{
			id: "ht-9",
			question: "What is quadratic probing?",
			options: [
				"Using quadratic equations",
				"Checking slots at quadratic distances when collision occurs",
				"Using squared values as keys",
				"Quadratic time complexity",
			],
			correct: 1,
			explanation:
				"Quadratic probing checks slots at positions hash(key), hash(key)+1², hash(key)+2², etc.",
		},
		{
			id: "ht-10",
			question: "What is double hashing?",
			options: [
				"Using hash function twice",
				"Using two hash functions for probe sequence",
				"Hashing twice the key value",
				"Double table size",
			],
			correct: 1,
			explanation:
				"Double hashing uses a second hash function to determine probe step size, reducing clustering.",
		},
		{
			id: "ht-11",
			question: "What properties should a good hash function have?",
			options: [
				"Slow computation and predictable",
				"Fast computation and uniform distribution",
				"Same hash for similar keys",
				"Minimizes table utilization",
			],
			correct: 1,
			explanation:
				"Good hash functions compute quickly, distribute keys uniformly, and minimize collisions.",
		},
		{
			id: "ht-12",
			question: "What is the worst-case time complexity for hash table search?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
			correct: 2,
			explanation:
				"In worst case (all keys hash to same slot with chaining), search is O(n).",
		},
		{
			id: "ht-13",
			question: "What is the purpose of hash table resizing?",
			options: [
				"Making table physically larger",
				"Reducing collision probability by maintaining load factor",
				"Changing hash function",
				"Sorting the entries",
			],
			correct: 1,
			explanation:
				"Resizing rehashes entries into a larger table to maintain good load factor and performance.",
		},
		{
			id: "ht-14",
			question: "What is clustering in hash tables?",
			options: [
				"Grouping similar keys",
				"Consecutive filled slots causing long probe sequences",
				"Organizing by hash value",
				"Combining multiple tables",
			],
			correct: 1,
			explanation:
				"Clustering occurs when collisions cause consecutive slots to fill, increasing future probe lengths.",
		},
		{
			id: "ht-15",
			question: "What is universal hashing?",
			options: [
				"Hashing all data types",
				"Using random hash function family to reduce collision probability",
				"Hashing entire universe of values",
				"One-size-fits-all hash function",
			],
			correct: 1,
			explanation:
				"Universal hashing uses randomized hash functions to guarantee low collision probability on adversarial input.",
		},
		{
			id: "ht-16",
			question: "What is a Bloom filter?",
			options: [
				"Filter for flower data",
				"Space-efficient probabilistic data structure for membership testing",
				"Filtering out collisions",
				"Hash table with blooms",
			],
			correct: 1,
			explanation:
				"Bloom filter uses multiple hash functions and bits to test membership with O(1) time and minimal space.",
		},
		{
			id: "ht-17",
			question: "What is consistent hashing?",
			options: [
				"Always producing same hash",
				"Hashing data consistently across distributed system",
				"Consistent collision resolution",
				"Consistent table size",
			],
			correct: 1,
			explanation:
				"Consistent hashing maps keys to servers such that adding/removing servers minimally redistributes keys.",
		},
		{
			id: "ht-18",
			question: "What is cuckoo hashing?",
			options: [
				"Hashing bird data",
				"Using two hash tables with multiple hash functions",
				"Cuckoo clock based hashing",
				"Simple hash collision method",
			],
			correct: 1,
			explanation:
				"Cuckoo hashing uses multiple hash tables, displacing existing elements if needed (like cuckoo birds).",
		},
		{
			id: "ht-19",
			question: "What time complexity does hash table deletion typically have?",
			options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
			correct: 0,
			explanation: "Hash table deletion has O(1) average-case time complexity.",
		},
		{
			id: "ht-20",
			question: "When would you use a hash table over a balanced binary search tree?",
			options: [
				"When you need sorted order",
				"When you need O(1) average lookup and don't need ordering",
				"When worst-case guarantee is critical",
				"When searching rarely",
			],
			correct: 1,
			explanation:
				"Hash tables excel for frequent lookups/insertions with O(1) average time when ordering isn't needed.",
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
							{[5, 10, 20].map((count) => {
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
