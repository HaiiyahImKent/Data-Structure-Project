export const CODE_IMPLEMENTATIONS = {
    array: {
        typescript: {
            language: "TypeScript",
            code: `class Array {
  private items: number[] = [];

  insert(value: number, index: number = this.items.length): void {
    if (index < 0 || index > this.items.length) {
      throw new Error("Invalid index");
    }
    this.items.splice(index, 0, value);
  }

  remove(index: number): number {
    if (index < 0 || index >= this.items.length) {
      throw new Error("Index out of bounds");
    }
    const [removed] = this.items.splice(index, 1);
    return removed;
  }

  search(value: number): number {
    return this.items.indexOf(value);
  }

  getAll(): number[] {
    return [...this.items];
  }
}`,
        },
        javascript: {
            language: "JavaScript",
            code: `class Array {
  constructor() {
    this.items = [];
  }

  insert(value, index = this.items.length) {
    if (index < 0 || index > this.items.length) {
      throw new Error("Invalid index");
    }
    this.items.splice(index, 0, value);
  }

  remove(index) {
    if (index < 0 || index >= this.items.length) {
      throw new Error("Index out of bounds");
    }
    return this.items.splice(index, 1)[0];
  }

  search(value) {
    return this.items.indexOf(value);
  }

  getAll() {
    return [...this.items];
  }
}`,
        },
        java: {
            language: "Java",
            code: `public class ArrayDS {
  private int[] items;
  private int size;

  public ArrayDS(int capacity) {
    items = new int[capacity];
    size = 0;
  }

  public void insert(int value, int index) {
    if (index < 0 || index > size) {
      throw new IndexOutOfBoundsException();
    }
    if (size == items.length) {
      resize();
    }
    for (int i = size; i > index; i--) {
      items[i] = items[i - 1];
    }
    items[index] = value;
    size++;
  }

  public int remove(int index) {
    if (index < 0 || index >= size) {
      throw new IndexOutOfBoundsException();
    }
    int removed = items[index];
    for (int i = index; i < size - 1; i++) {
      items[i] = items[i + 1];
    }
    size--;
    return removed;
  }

  private void resize() {
    int[] newItems = new int[items.length * 2];
    System.arraycopy(items, 0, newItems, 0, items.length);
    items = newItems;
  }
}`,
        },
        csharp: {
            language: "C#",
            code: `public class ArrayDS {
  private int[] items;
  private int size;

  public ArrayDS(int capacity) {
    items = new int[capacity];
    size = 0;
  }

  public void Insert(int value, int index) {
    if (index < 0 || index > size) {
      throw new IndexOutOfRangeException();
    }
    if (size == items.Length) {
      Resize();
    }
    for (int i = size; i > index; i--) {
      items[i] = items[i - 1];
    }
    items[index] = value;
    size++;
  }

  public int Remove(int index) {
    if (index < 0 || index >= size) {
      throw new IndexOutOfRangeException();
    }
    int removed = items[index];
    for (int i = index; i < size - 1; i++) {
      items[i] = items[i + 1];
    }
    size--;
    return removed;
  }

  private void Resize() {
    System.Array.Resize(ref items, items.Length * 2);
  }
}`,
        },
        cpp: {
            language: "C++",
            code: `#include <vector>
using namespace std;

class ArrayDS {
private:
  vector<int> items;

public:
  void insert(int value, int index) {
    if (index < 0 || index > items.size()) {
      throw out_of_range("Invalid index");
    }
    items.insert(items.begin() + index, value);
  }

  int remove(int index) {
    if (index < 0 || index >= items.size()) {
      throw out_of_range("Index out of bounds");
    }
    int removed = items[index];
    items.erase(items.begin() + index);
    return removed;
  }

  int search(int value) {
    for (int i = 0; i < items.size(); i++) {
      if (items[i] == value) return i;
    }
    return -1;
  }

  vector<int> getAll() {
    return items;
  }
};`,
        },
        php: {
            language: "PHP",
            code: `<?php
class ArrayDS {
  private $items = [];

  public function insert($value, $index = null) {
    if ($index === null) {
      $index = count($this->items);
    }
    if ($index < 0 || $index > count($this->items)) {
      throw new Exception("Invalid index");
    }
    array_splice($this->items, $index, 0, [$value]);
  }

  public function remove($index) {
    if ($index < 0 || $index >= count($this->items)) {
      throw new Exception("Index out of bounds");
    }
    return array_splice($this->items, $index, 1)[0];
  }

  public function search($value) {
    $key = array_search($value, $this->items);
    return $key !== false ? $key : -1;
  }

  public function getAll() {
    return $this->items;
  }
}
?>`,
        },
    },
    stack: {
        typescript: {
            language: "TypeScript",
            code: `class Stack<T> {
  private items: T[] = [];

  push(element: T): void {
    this.items.push(element);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  print(): void {
    console.log(this.items.toString());
  }
}`,
        },
        javascript: {
            language: "JavaScript",
            code: `class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  print() {
    console.log(this.items.toString());
  }
}`,
        },
        java: {
            language: "Java",
            code: `public class Stack<T> {
  private Node<T> top;
  private int size;

  private static class Node<T> {
    T data;
    Node<T> next;

    Node(T data) {
      this.data = data;
    }
  }

  public void push(T element) {
    Node<T> newNode = new Node<>(element);
    newNode.next = top;
    top = newNode;
    size++;
  }

  public T pop() {
    if (isEmpty()) throw new EmptyStackException();
    T data = top.data;
    top = top.next;
    size--;
    return data;
  }

  public T peek() {
    if (isEmpty()) throw new EmptyStackException();
    return top.data;
  }

  public boolean isEmpty() {
    return size == 0;
  }

  public int size() {
    return size;
  }
}`,
        },
        csharp: {
            language: "C#",
            code: `public class Stack<T> {
  private Node<T> top;
  private int size;

  private class Node<U> {
    public U Data { get; set; }
    public Node<U> Next { get; set; }

    public Node(U data) {
      Data = data;
    }
  }

  public void Push(T element) {
    var newNode = new Node<T>(element);
    newNode.Next = top;
    top = newNode;
    size++;
  }

  public T Pop() {
    if (IsEmpty()) throw new InvalidOperationException();
    T data = top.Data;
    top = top.Next;
    size--;
    return data;
  }

  public T Peek() {
    if (IsEmpty()) throw new InvalidOperationException();
    return top.Data;
  }

  public bool IsEmpty() => size == 0;

  public int Size() => size;
}`,
        },
        cpp: {
            language: "C++",
            code: `#include <stack>
#include <iostream>
using namespace std;

template<typename T>
class Stack {
private:
  struct Node {
    T data;
    Node* next;
    Node(T value) : data(value), next(nullptr) {}
  };
  
  Node* top;
  int size;

public:
  Stack() : top(nullptr), size(0) {}

  void push(T element) {
    Node* newNode = new Node(element);
    newNode->next = top;
    top = newNode;
    size++;
  }

  T pop() {
    if (isEmpty()) throw runtime_error("Stack empty");
    T data = top->data;
    Node* temp = top;
    top = top->next;
    delete temp;
    size--;
    return data;
  }

  T peek() {
    if (isEmpty()) throw runtime_error("Stack empty");
    return top->data;
  }

  bool isEmpty() { return size == 0; }
  int getSize() { return size; }
};`,
        },
        php: {
            language: "PHP",
            code: `<?php
class Stack {
  private $items = [];

  public function push($element) {
    array_push($this->items, $element);
  }

  public function pop() {
    if ($this->isEmpty()) {
      throw new Exception("Stack is empty");
    }
    return array_pop($this->items);
  }

  public function peek() {
    if ($this->isEmpty()) {
      throw new Exception("Stack is empty");
    }
    return end($this->items);
  }

  public function isEmpty() {
    return count($this->items) === 0;
  }

  public function size() {
    return count($this->items);
  }

  public function clear() {
    $this->items = [];
  }
}
?>`,
        },
    },
    queue: {
        typescript: {
            language: "TypeScript",
            code: `class Queue<T> {
  private items: T[] = [];

  enqueue(element: T): void {
    this.items.push(element);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  front(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  print(): void {
    console.log(this.items.toString());
  }
}`,
        },
        javascript: {
            language: "JavaScript",
            code: `class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  print() {
    console.log(this.items.toString());
  }
}`,
        },
        java: {
            language: "Java",
            code: `public class Queue<T> {
  private Node<T> front;
  private Node<T> rear;
  private int size;

  private static class Node<T> {
    T data;
    Node<T> next;

    Node(T data) {
      this.data = data;
    }
  }

  public void enqueue(T element) {
    Node<T> newNode = new Node<>(element);
    if (isEmpty()) {
      front = newNode;
    } else {
      rear.next = newNode;
    }
    rear = newNode;
    size++;
  }

  public T dequeue() {
    if (isEmpty()) throw new NoSuchElementException();
    T data = front.data;
    front = front.next;
    size--;
    return data;
  }

  public boolean isEmpty() {
    return size == 0;
  }
}`,
        },
        csharp: {
            language: "C#",
            code: `public class Queue<T> {
  private Node<T> front;
  private Node<T> rear;
  private int size;

  private class Node<U> {
    public U Data { get; set; }
    public Node<U> Next { get; set; }

    public Node(U data) {
      Data = data;
    }
  }

  public void Enqueue(T element) {
    var newNode = new Node<T>(element);
    if (IsEmpty()) {
      front = newNode;
    } else {
      rear.Next = newNode;
    }
    rear = newNode;
    size++;
  }

  public T Dequeue() {
    if (IsEmpty()) throw new InvalidOperationException();
    T data = front.Data;
    front = front.Next;
    size--;
    return data;
  }

  public bool IsEmpty() => size == 0;
}`,
        },
        cpp: {
            language: "C++",
            code: `#include <queue>
using namespace std;

template<typename T>
class Queue {
private:
  struct Node {
    T data;
    Node* next;
    Node(T value) : data(value), next(nullptr) {}
  };
  
  Node* front;
  Node* rear;
  int size;

public:
  Queue() : front(nullptr), rear(nullptr), size(0) {}

  void enqueue(T element) {
    Node* newNode = new Node(element);
    if (isEmpty()) {
      front = newNode;
    } else {
      rear->next = newNode;
    }
    rear = newNode;
    size++;
  }

  T dequeue() {
    if (isEmpty()) throw runtime_error("Queue empty");
    T data = front->data;
    Node* temp = front;
    front = front->next;
    delete temp;
    size--;
    return data;
  }

  bool isEmpty() { return size == 0; }
};`,
        },
        php: {
            language: "PHP",
            code: `<?php
class Queue {
  private $items = [];

  public function enqueue($element) {
    array_push($this->items, $element);
  }

  public function dequeue() {
    if ($this->isEmpty()) {
      throw new Exception("Queue is empty");
    }
    return array_shift($this->items);
  }

  public function front() {
    if ($this->isEmpty()) {
      throw new Exception("Queue is empty");
    }
    return $this->items[0];
  }

  public function isEmpty() {
    return count($this->items) === 0;
  }

  public function size() {
    return count($this->items);
  }
}
?>`,
        },
    },
    "linked-list": {
        typescript: {
            language: "TypeScript",
            code: `class LinkedListNode<T> {
  data: T;
  next: LinkedListNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

class LinkedList<T> {
  private head: LinkedListNode<T> | null = null;

  insert(data: T): void {
    const newNode = new LinkedListNode(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  remove(data: T): boolean {
    if (!this.head) return false;

    if (this.head.data === data) {
      this.head = this.head.next;
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  search(data: T): boolean {
    let current = this.head;
    while (current) {
      if (current.data === data) return true;
      current = current.next;
    }
    return false;
  }
}`,
        },
        javascript: {
            language: "JavaScript",
            code: `class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insert(data) {
    const newNode = new LinkedListNode(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  remove(data) {
    if (!this.head) return false;

    if (this.head.data === data) {
      this.head = this.head.next;
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  search(data) {
    let current = this.head;
    while (current) {
      if (current.data === data) return true;
      current = current.next;
    }
    return false;
  }
}`,
        },
        java: {
            language: "Java",
            code: `public class LinkedList<T> {
  private Node<T> head;

  private static class Node<T> {
    T data;
    Node<T> next;

    Node(T data) {
      this.data = data;
    }
  }

  public void insert(T data) {
    Node<T> newNode = new Node<>(data);
    if (head == null) {
      head = newNode;
    } else {
      Node<T> current = head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  public boolean remove(T data) {
    if (head == null) return false;

    if (head.data.equals(data)) {
      head = head.next;
      return true;
    }

    Node<T> current = head;
    while (current.next != null) {
      if (current.next.data.equals(data)) {
        current.next = current.next.next;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  public boolean search(T data) {
    Node<T> current = head;
    while (current != null) {
      if (current.data.equals(data)) return true;
      current = current.next;
    }
    return false;
  }
}`,
        },
        csharp: {
            language: "C#",
            code: `public class LinkedList<T> {
  private Node<T> head;

  private class Node<U> {
    public U Data { get; set; }
    public Node<U> Next { get; set; }

    public Node(U data) {
      Data = data;
    }
  }

  public void Insert(T data) {
    var newNode = new Node<T>(data);
    if (head == null) {
      head = newNode;
    } else {
      var current = head;
      while (current.Next != null) {
        current = current.Next;
      }
      current.Next = newNode;
    }
  }

  public bool Remove(T data) {
    if (head == null) return false;

    if (head.Data.Equals(data)) {
      head = head.Next;
      return true;
    }

    var current = head;
    while (current.Next != null) {
      if (current.Next.Data.Equals(data)) {
        current.Next = current.Next.Next;
        return true;
      }
      current = current.Next;
    }
    return false;
  }

  public bool Search(T data) {
    var current = head;
    while (current != null) {
      if (current.Data.Equals(data)) return true;
      current = current.Next;
    }
    return false;
  }
}`,
        },
        cpp: {
            language: "C++",
            code: `#include <iostream>
using namespace std;

template<typename T>
class LinkedList {
private:
  struct Node {
    T data;
    Node* next;
    Node(T value) : data(value), next(nullptr) {}
  };
  
  Node* head;

public:
  LinkedList() : head(nullptr) {}

  void insert(T data) {
    Node* newNode = new Node(data);
    if (!head) {
      head = newNode;
    } else {
      Node* current = head;
      while (current->next) {
        current = current->next;
      }
      current->next = newNode;
    }
  }

  bool remove(T data) {
    if (!head) return false;

    if (head->data == data) {
      Node* temp = head;
      head = head->next;
      delete temp;
      return true;
    }

    Node* current = head;
    while (current->next) {
      if (current->next->data == data) {
        Node* temp = current->next;
        current->next = current->next->next;
        delete temp;
        return true;
      }
      current = current->next;
    }
    return false;
  }

  bool search(T data) {
    Node* current = head;
    while (current) {
      if (current->data == data) return true;
      current = current->next;
    }
    return false;
  }
};`,
        },
        php: {
            language: "PHP",
            code: `<?php
class LinkedListNode {
  public $data;
  public $next = null;

  public function __construct($data) {
    $this->data = $data;
  }
}

class LinkedList {
  private $head = null;

  public function insert($data) {
    $newNode = new LinkedListNode($data);
    if (!$this->head) {
      $this->head = $newNode;
    } else {
      $current = $this->head;
      while ($current->next) {
        $current = $current->next;
      }
      $current->next = $newNode;
    }
  }

  public function remove($data) {
    if (!$this->head) return false;

    if ($this->head->data === $data) {
      $this->head = $this->head->next;
      return true;
    }

    $current = $this->head;
    while ($current->next) {
      if ($current->next->data === $data) {
        $current->next = $current->next->next;
        return true;
      }
      $current = $current->next;
    }
    return false;
  }
}
?>`,
        },
    },
};
