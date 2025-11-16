export interface Documentation {
  levelId: string;
  title: string;
  notes: string[];
  keyConcepts: string[];
  examples: string[];
  tips: string[];
}

export const documentationData: { [key: string]: Documentation } = {
  'dsa_lvl1': {
    levelId: 'dsa_lvl1',
    title: 'Arrays & Basic Operations',
    notes: [
      'Arrays are collections of elements stored in contiguous memory locations.',
      'Indexing starts at 0 in most programming languages.',
      'Arrays have fixed size in some languages (static arrays) or dynamic size (dynamic arrays).',
      'Common operations: access, insert, delete, search, traverse.',
      'Time complexity: Access O(1), Search O(n), Insert/Delete O(n) for static arrays.'
    ],
    keyConcepts: [
      'Array Indexing',
      'Memory Layout',
      'Time Complexity',
      'Array Operations',
      'Static vs Dynamic Arrays'
    ],
    examples: [
      'Accessing element: arr[3]',
      'Iterating: for (let i = 0; i < arr.length; i++)',
      'Finding max: Math.max(...arr)'
    ],
    tips: [
      'Always check array bounds before accessing elements.',
      'Use array methods like map, filter, reduce for cleaner code.',
      'Consider time complexity when choosing array operations.'
    ]
  },
  'dsa_lvl2': {
    levelId: 'dsa_lvl2',
    title: 'Recursion',
    notes: [
      'Recursion is a technique where a function calls itself.',
      'Every recursive function needs a base case to stop infinite recursion.',
      'Recursion uses the call stack to store function calls.',
      'Can be converted to iterative solutions using stacks.',
      'Common patterns: factorial, Fibonacci, tree traversal, divide and conquer.'
    ],
    keyConcepts: [
      'Base Case',
      'Recursive Case',
      'Call Stack',
      'Tail Recursion',
      'Memoization'
    ],
    examples: [
      'Factorial: n! = n * (n-1)!',
      'Fibonacci: fib(n) = fib(n-1) + fib(n-2)',
      'Binary search: search(arr, mid, target)'
    ],
    tips: [
      'Always define base case first.',
      'Ensure recursive case moves toward base case.',
      'Watch out for stack overflow with deep recursion.',
      'Consider memoization to optimize repeated calculations.'
    ]
  },
  'dsa_lvl3': {
    levelId: 'dsa_lvl3',
    title: 'Sorting Algorithms',
    notes: [
      'Sorting arranges elements in a specific order (ascending/descending).',
      'Comparison-based sorts: Bubble, Selection, Insertion, Merge, Quick, Heap.',
      'Non-comparison sorts: Counting, Radix, Bucket.',
      'Stability: maintains relative order of equal elements.',
      'In-place sorting uses O(1) extra space.'
    ],
    keyConcepts: [
      'Time Complexity',
      'Space Complexity',
      'Stability',
      'In-place Sorting',
      'Comparison vs Non-comparison'
    ],
    examples: [
      'Quick Sort: O(n log n) average, O(n²) worst',
      'Merge Sort: O(n log n) always, stable',
      'Bubble Sort: O(n²), simple but slow'
    ],
    tips: [
      'Use built-in sort functions for most cases.',
      'Quick sort is fastest on average.',
      'Merge sort is stable and predictable.',
      'Consider data characteristics when choosing algorithm.'
    ]
  },
  'os_lvl1': {
    levelId: 'os_lvl1',
    title: 'Processes & Threads',
    notes: [
      'Process: independent program in execution with its own memory space.',
      'Thread: lightweight process that shares memory with other threads.',
      'Multithreading allows concurrent execution within a process.',
      'Context switching: saving and restoring process/thread state.',
      'Process isolation prevents one process from affecting another.'
    ],
    keyConcepts: [
      'Process State',
      'Thread vs Process',
      'Context Switching',
      'Process Control Block (PCB)',
      'Multithreading'
    ],
    examples: [
      'Creating process: fork() in Unix',
      'Creating thread: pthread_create()',
      'Process communication: pipes, sockets, shared memory'
    ],
    tips: [
      'Use threads for I/O-bound tasks.',
      'Use processes for CPU-bound tasks requiring isolation.',
      'Be careful with shared resources in multithreading.',
      'Understand synchronization mechanisms (locks, semaphores).'
    ]
  },
  'os_lvl2': {
    levelId: 'os_lvl2',
    title: 'CPU Scheduling',
    notes: [
      'CPU scheduling decides which process runs next.',
      'Goals: maximize CPU utilization, minimize waiting time, ensure fairness.',
      'Preemptive: OS can interrupt running process.',
      'Non-preemptive: process runs until completion or I/O wait.',
      'Common algorithms: FCFS, SJF, Priority, Round Robin, Multilevel Queue.'
    ],
    keyConcepts: [
      'Scheduling Algorithms',
      'Preemption',
      'Turnaround Time',
      'Waiting Time',
      'Response Time'
    ],
    examples: [
      'FCFS: First come, first served',
      'Round Robin: Time slice per process',
      'SJF: Shortest job first (optimal for average waiting time)'
    ],
    tips: [
      'Round Robin is good for interactive systems.',
      'SJF minimizes average waiting time.',
      'Priority scheduling can cause starvation.',
      'Consider system type when choosing algorithm.'
    ]
  },
  'dbms_lvl1': {
    levelId: 'dbms_lvl1',
    title: 'ER Models',
    notes: [
      'Entity-Relationship model represents data as entities and relationships.',
      'Entity: real-world object (Student, Course, Teacher).',
      'Attribute: property of entity (name, age, ID).',
      'Relationship: association between entities.',
      'Cardinality: one-to-one, one-to-many, many-to-many.'
    ],
    keyConcepts: [
      'Entities',
      'Attributes',
      'Relationships',
      'Cardinality',
      'Primary Key'
    ],
    examples: [
      'Student entity with attributes: ID, Name, Age',
      'Relationship: Student ENROLLS_IN Course',
      'Cardinality: One student can enroll in many courses'
    ],
    tips: [
      'Identify entities first, then relationships.',
      'Use proper naming conventions.',
      'Avoid redundant relationships.',
      'Normalize to reduce data redundancy.'
    ]
  },
  'dbms_lvl2': {
    levelId: 'dbms_lvl2',
    title: 'SQL Basics',
    notes: [
      'SQL (Structured Query Language) is used to manage relational databases.',
      'DDL: Data Definition Language (CREATE, ALTER, DROP).',
      'DML: Data Manipulation Language (SELECT, INSERT, UPDATE, DELETE).',
      'DCL: Data Control Language (GRANT, REVOKE).',
      'TCL: Transaction Control Language (COMMIT, ROLLBACK).'
    ],
    keyConcepts: [
      'SELECT Statement',
      'WHERE Clause',
      'JOIN Operations',
      'Aggregate Functions',
      'Subqueries'
    ],
    examples: [
      'SELECT * FROM students WHERE age > 18',
      'SELECT name, COUNT(*) FROM courses GROUP BY name',
      'INNER JOIN: Returns matching records from both tables'
    ],
    tips: [
      'Always use WHERE clause to filter data.',
      'Use indexes for faster queries.',
      'Avoid SELECT * in production.',
      'Understand different JOIN types.',
      'Use transactions for data integrity.'
    ]
  },
  'cn_lvl1': {
    levelId: 'cn_lvl1',
    title: 'OSI Model',
    notes: [
      'OSI (Open Systems Interconnection) has 7 layers.',
      'Physical Layer: transmission of raw bits over physical medium.',
      'Data Link Layer: error detection and correction, MAC addressing.',
      'Network Layer: routing, IP addressing, packet forwarding.',
      'Transport Layer: end-to-end communication, TCP/UDP.',
      'Session Layer: session management, synchronization.',
      'Presentation Layer: data translation, encryption.',
      'Application Layer: user interfaces, HTTP, FTP, SMTP.'
    ],
    keyConcepts: [
      '7 Layers',
      'Protocol Stack',
      'Encapsulation',
      'PDU (Protocol Data Unit)',
      'Layer Functions'
    ],
    examples: [
      'HTTP operates at Application Layer',
      'TCP operates at Transport Layer',
      'IP operates at Network Layer',
      'Ethernet operates at Data Link Layer'
    ],
    tips: [
      'Each layer has specific responsibilities.',
      'Data flows down (encapsulation) and up (decapsulation).',
      'Layers communicate with corresponding layers on other devices.',
      'Understanding layers helps troubleshoot network issues.'
    ]
  },
  'dsa_lvl4': {
    levelId: 'dsa_lvl4',
    title: 'Trees & Graphs',
    notes: [
      'Trees are hierarchical data structures with nodes and edges.',
      'Binary trees have at most two children per node.',
      'Graphs consist of vertices (nodes) and edges connecting them.',
      'Tree traversal: Preorder, Inorder, Postorder, Level-order.',
      'Graph algorithms: BFS, DFS, Dijkstra, Prim, Kruskal.',
      'Trees are acyclic graphs with exactly one path between any two nodes.'
    ],
    keyConcepts: [
      'Binary Trees',
      'BST (Binary Search Tree)',
      'Graph Representation',
      'Traversal Algorithms',
      'Tree vs Graph'
    ],
    examples: [
      'Binary Tree: Each node has max 2 children',
      'BST: Left < Root < Right property',
      'Graph: Adjacency list or matrix representation',
      'BFS: Level-by-level traversal'
    ],
    tips: [
      'Use trees for hierarchical data (file systems, DOM).',
      'Graphs model relationships (social networks, maps).',
      'Choose appropriate traversal based on problem.',
      'Understand time complexity: O(n) for tree traversal, O(V+E) for graph.'
    ]
  },
  'dsa_lvl5': {
    levelId: 'dsa_lvl5',
    title: 'Dynamic Programming',
    notes: [
      'DP solves problems by breaking them into overlapping subproblems.',
      'Two approaches: Top-down (memoization) and Bottom-up (tabulation).',
      'Key principle: Store results of subproblems to avoid recomputation.',
      'Optimal substructure: optimal solution contains optimal sub-solutions.',
      'Common patterns: Fibonacci, Knapsack, Longest Common Subsequence, Edit Distance.'
    ],
    keyConcepts: [
      'Memoization',
      'Tabulation',
      'Optimal Substructure',
      'Overlapping Subproblems',
      'State Transition'
    ],
    examples: [
      'Fibonacci: dp[i] = dp[i-1] + dp[i-2]',
      'Knapsack: maximize value within weight limit',
      'LCS: longest common subsequence between strings',
      'Coin Change: minimum coins for amount'
    ],
    tips: [
      'Identify if problem has overlapping subproblems.',
      'Start with recursive solution, then add memoization.',
      'Bottom-up is usually more space-efficient.',
      'Practice recognizing DP patterns in problems.'
    ]
  },
  'os_lvl3': {
    levelId: 'os_lvl3',
    title: 'Memory Management',
    notes: [
      'Memory management allocates and deallocates memory for processes.',
      'Virtual memory allows processes to use more memory than physical RAM.',
      'Paging: divides memory into fixed-size pages.',
      'Segmentation: divides memory into variable-size segments.',
      'Page replacement algorithms: FIFO, LRU, Optimal.',
      'Memory fragmentation: external and internal.'
    ],
    keyConcepts: [
      'Virtual Memory',
      'Paging',
      'Segmentation',
      'Page Replacement',
      'Memory Fragmentation'
    ],
    examples: [
      'Paging: 4KB pages, page table maps virtual to physical',
      'LRU: Replace least recently used page',
      'Demand paging: Load pages only when needed',
      'TLB: Translation Lookaside Buffer for fast address translation'
    ],
    tips: [
      'Virtual memory enables running large programs.',
      'LRU is commonly used in practice.',
      'Understand page fault handling.',
      'Consider memory locality for performance.'
    ]
  },
  'os_lvl4': {
    levelId: 'os_lvl4',
    title: 'Deadlocks',
    notes: [
      'Deadlock occurs when processes wait indefinitely for resources.',
      'Four necessary conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.',
      'Deadlock prevention: break one of the four conditions.',
      'Deadlock avoidance: Banker\'s algorithm checks safe state.',
      'Deadlock detection: resource allocation graph analysis.',
      'Recovery: process termination or resource preemption.'
    ],
    keyConcepts: [
      'Deadlock Conditions',
      'Prevention',
      'Avoidance',
      'Detection',
      'Recovery'
    ],
    examples: [
      'Circular wait: P1 waits for R2, P2 waits for R1',
      'Banker\'s algorithm: checks if allocation is safe',
      'Resource allocation graph: detect cycles',
      'Timeout: break deadlock after time limit'
    ],
    tips: [
      'Prevent circular wait by ordering resources.',
      'Use timeout mechanisms for deadlock recovery.',
      'Understand safe vs unsafe states.',
      'Design systems to minimize deadlock probability.'
    ]
  },
  'dbms_lvl3': {
    levelId: 'dbms_lvl3',
    title: 'Normalization',
    notes: [
      'Normalization reduces data redundancy and improves data integrity.',
      '1NF: Eliminate repeating groups, atomic values.',
      '2NF: 1NF + remove partial dependencies.',
      '3NF: 2NF + remove transitive dependencies.',
      'BCNF: 3NF + every determinant is a candidate key.',
      'Trade-off: More normalization = more joins, less redundancy.'
    ],
    keyConcepts: [
      'Normal Forms',
      'Functional Dependencies',
      'Candidate Keys',
      'Data Redundancy',
      'Decomposition'
    ],
    examples: [
      '1NF: No arrays or multiple values in single cell',
      '2NF: Remove attributes dependent on part of key',
      '3NF: Remove attributes dependent on non-key attributes',
      'BCNF: Every determinant must be a candidate key'
    ],
    tips: [
      'Normalize to reduce redundancy and anomalies.',
      'Denormalize for performance when needed.',
      'Understand functional dependencies first.',
      'Balance normalization with query performance.'
    ]
  },
  'dbms_lvl4': {
    levelId: 'dbms_lvl4',
    title: 'Transactions',
    notes: [
      'Transaction: sequence of operations executed as single unit.',
      'ACID properties: Atomicity, Consistency, Isolation, Durability.',
      'Concurrency control: manages simultaneous transactions.',
      'Locking: Shared (read) and Exclusive (write) locks.',
      'Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable.',
      'Two-phase locking: Growing phase (acquire locks) and Shrinking phase (release locks).'
    ],
    keyConcepts: [
      'ACID Properties',
      'Concurrency Control',
      'Locking',
      'Isolation Levels',
      'Two-Phase Locking'
    ],
    examples: [
      'Atomicity: All operations succeed or all fail',
      'Isolation: Transactions don\'t interfere',
      'Deadlock: Two transactions waiting for each other',
      'Serializable: Highest isolation, prevents all anomalies'
    ],
    tips: [
      'Understand ACID for data integrity.',
      'Choose appropriate isolation level.',
      'Be aware of deadlock possibilities.',
      'Use transactions for critical operations.'
    ]
  },
  'cn_lvl2': {
    levelId: 'cn_lvl2',
    title: 'Routing',
    notes: [
      'Routing determines the path packets take from source to destination.',
      'Static routing: manually configured routes.',
      'Dynamic routing: routes learned automatically (RIP, OSPF, BGP).',
      'Routing table: contains destination networks and next hops.',
      'Shortest path algorithms: Dijkstra, Bellman-Ford.',
      'Routing protocols: Distance-vector (RIP) and Link-state (OSPF).'
    ],
    keyConcepts: [
      'Routing Table',
      'Static vs Dynamic',
      'Routing Protocols',
      'Shortest Path',
      'Next Hop'
    ],
    examples: [
      'RIP: Distance-vector, max 15 hops',
      'OSPF: Link-state, uses Dijkstra algorithm',
      'BGP: Path-vector, used for inter-domain routing',
      'Default route: 0.0.0.0/0 for unknown destinations'
    ],
    tips: [
      'Static routing for small networks.',
      'Dynamic routing for large, changing networks.',
      'Understand routing metrics (hop count, bandwidth).',
      'Know difference between routing and forwarding.'
    ]
  },
  'cn_lvl3': {
    levelId: 'cn_lvl3',
    title: 'TCP/IP',
    notes: [
      'TCP/IP is the internet protocol suite with 4 layers.',
      'Application Layer: HTTP, FTP, SMTP, DNS.',
      'Transport Layer: TCP (reliable) and UDP (unreliable).',
      'Internet Layer: IP, ICMP, ARP.',
      'Link Layer: Ethernet, Wi-Fi.',
      'TCP: connection-oriented, reliable, flow control, congestion control.',
      'UDP: connectionless, fast, no guarantees.'
    ],
    keyConcepts: [
      'TCP vs UDP',
      'IP Addressing',
      'Port Numbers',
      'Three-Way Handshake',
      'Flow Control'
    ],
    examples: [
      'TCP: HTTP, FTP, SMTP (reliable)',
      'UDP: DNS, video streaming (fast)',
      'Three-way handshake: SYN, SYN-ACK, ACK',
      'Ports: 80 (HTTP), 443 (HTTPS), 53 (DNS)'
    ],
    tips: [
      'Use TCP when reliability is important.',
      'Use UDP for real-time applications.',
      'Understand port numbers and sockets.',
      'Know TCP connection establishment and termination.'
    ]
  },
  'cn_lvl4': {
    levelId: 'cn_lvl4',
    title: 'HTTP & HTTPS',
    notes: [
      'HTTP (Hypertext Transfer Protocol) is application layer protocol.',
      'HTTPS adds TLS/SSL encryption for security.',
      'HTTP methods: GET, POST, PUT, DELETE, PATCH.',
      'Status codes: 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error).',
      'Stateless: each request is independent.',
      'Cookies and sessions maintain state.',
      'HTTPS uses port 443, HTTP uses port 80.'
    ],
    keyConcepts: [
      'HTTP Methods',
      'Status Codes',
      'Stateless Protocol',
      'TLS/SSL',
      'Cookies & Sessions'
    ],
    examples: [
      'GET: Retrieve data (idempotent)',
      'POST: Submit data (not idempotent)',
      '200 OK: Request successful',
      '404 Not Found: Resource not found',
      'HTTPS: Encrypted HTTP with certificate'
    ],
    tips: [
      'Use appropriate HTTP methods.',
      'Understand status codes for debugging.',
      'Always use HTTPS for sensitive data.',
      'Understand cookies vs sessions.',
      'Know RESTful API principles.'
    ]
  }
};

