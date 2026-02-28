/* ═══════════════════════════════════════════════════
   SIDEBAR TOGGLE
═══════════════════════════════════════════════════ */
let sidebarOpen = true; // track sidebar state

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const btn = document.getElementById('menuToggleBtn');
  const overlay = document.getElementById('sidebarOverlay');
  sidebarOpen = !sidebar.classList.toggle('collapsed');
  btn.classList.toggle('active', sidebarOpen);
  if (overlay) overlay.classList.toggle('show', sidebarOpen);
}

/* ═══════════════════════════════════════════════════
   NOTIFICATION BANNER
═══════════════════════════════════════════════════ */
let notifTimer;
function showNotif(msg, type = 'success', duration = 4500) {
  const banner = document.getElementById('notifBanner');
  const text   = document.getElementById('notifText');
  const icon   = document.getElementById('notifIcon');
  const icons  = { success: '✓', info: 'ℹ️', warning: '⚠️' };
  banner.className = `notif-banner ${type}`;
  text.textContent = msg;
  icon.textContent = icons[type] || '✓';
  banner.classList.remove('show');
  void banner.offsetWidth;
  banner.classList.add('show');
  clearTimeout(notifTimer);
  notifTimer = setTimeout(hideNotif, duration);
}
function hideNotif() {
  document.getElementById('notifBanner').classList.remove('show');
}

/* ═══════════════════════════════════════════════════
   DATA — ALL SNIPPETS
═══════════════════════════════════════════════════ */
const SNIPPETS = [
  // ── BASIC I/O ──────────────────────────────────
  { id:'s1', tag:'basic', title:'Scanner — basic input',
    desc:'Read input from console; always create once at the top of your solution.',
    code:`<span class="kw">import</span> java.util.Scanner;\n\n<span class="cls">Scanner</span> sc = <span class="kw">new</span> <span class="cls">Scanner</span>(System.in);` },

  { id:'s2', tag:'basic', title:'Read int / long / double / string',
    desc:'All common input-reading methods — pick the one you need.',
    code:`<span class="type">int</span>    n    = sc.<span class="fn">nextInt</span>();\n<span class="type">long</span>   l    = sc.<span class="fn">nextLong</span>();\n<span class="type">double</span> d    = sc.<span class="fn">nextDouble</span>();\n<span class="cls">String</span> word = sc.<span class="fn">next</span>();       <span class="cmt">// single word</span>\n<span class="cls">String</span> line = sc.<span class="fn">nextLine</span>(); <span class="cmt">// full line</span>` },

  { id:'s3', tag:'basic', title:'BufferedReader (fast input)',
    desc:'10x faster than Scanner for large inputs in competitive programming.',
    code:`<span class="kw">import</span> java.io.*;\n\n<span class="cls">BufferedReader</span> br = <span class="kw">new</span> <span class="cls">BufferedReader</span>(\n    <span class="kw">new</span> <span class="cls">InputStreamReader</span>(System.in));\n<span class="cls">StringTokenizer</span> st = <span class="kw">new</span> <span class="cls">StringTokenizer</span>(br.<span class="fn">readLine</span>());\n<span class="type">int</span> a = <span class="cls">Integer</span>.<span class="fn">parseInt</span>(st.<span class="fn">nextToken</span>());\n<span class="type">int</span> b = <span class="cls">Integer</span>.<span class="fn">parseInt</span>(st.<span class="fn">nextToken</span>());` },

  { id:'s4', tag:'basic', title:'PrintWriter (fast output)',
    desc:'Faster than System.out.println for large outputs; must flush at the end.',
    code:`<span class="cls">PrintWriter</span> pw = <span class="kw">new</span> <span class="cls">PrintWriter</span>(\n    <span class="kw">new</span> <span class="cls">BufferedWriter</span>(\n        <span class="kw">new</span> <span class="cls">OutputStreamWriter</span>(System.out)));\npw.<span class="fn">println</span>(<span class="str">"answer"</span>);\npw.<span class="fn">flush</span>(); <span class="cmt">// must flush at end!</span>` },

  { id:'s5', tag:'basic', title:'Math utilities',
    desc:'Most-used Math static methods — no import needed.',
    code:`<span class="cls">Math</span>.<span class="fn">max</span>(a, b);\n<span class="cls">Math</span>.<span class="fn">min</span>(a, b);\n<span class="cls">Math</span>.<span class="fn">abs</span>(x);\n<span class="cls">Math</span>.<span class="fn">pow</span>(<span class="num">2</span>, <span class="num">10</span>);   <span class="cmt">// 1024.0</span>\n<span class="cls">Math</span>.<span class="fn">sqrt</span>(<span class="num">16</span>);    <span class="cmt">// 4.0</span>\n<span class="cls">Math</span>.<span class="fn">log</span>(n);      <span class="cmt">// natural log</span>\n<span class="cls">Math</span>.<span class="fn">floor</span>(x);   <span class="cls">Math</span>.<span class="fn">ceil</span>(x);` },

  { id:'s6', tag:'basic', title:'Integer & Long bounds',
    desc:'Use as sentinels for min/max DP, Dijkstra, or comparisons.',
    code:`<span class="type">int</span>  INF   = <span class="cls">Integer</span>.MAX_VALUE; <span class="cmt">// 2^31 - 1 ≈ 2.1B</span>\n<span class="type">int</span>  NINF  = <span class="cls">Integer</span>.MIN_VALUE;\n<span class="type">long</span> LINF  = <span class="cls">Long</span>.MAX_VALUE;\n\n<span class="cmt">// safe overflow-proof sentinel:</span>\n<span class="type">int</span>  MOD   = <span class="num">1_000_000_007</span>;\n<span class="type">int</span>  SAFE  = <span class="num">0x3f3f3f3f</span>; <span class="cmt">// ~1B, safe to double</span>` },

  { id:'s7', tag:'basic', title:'Pair / custom record',
    desc:'Java has no built-in Pair; use int[] for speed or record for clarity.',
    code:`<span class="cmt">// quick pair with int[] (fastest)</span>\n<span class="type">int</span>[] pair = {x, y};\n\n<span class="cmt">// Java 16+ record (clean, immutable)</span>\n<span class="kw">record</span> <span class="cls">Pair</span>(<span class="type">int</span> x, <span class="type">int</span> y) {}\n<span class="cls">Pair</span> p = <span class="kw">new</span> <span class="cls">Pair</span>(<span class="num">1</span>, <span class="num">2</span>);\nSystem.out.<span class="fn">println</span>(p.x + <span class="str">" "</span> + p.y);` },

  { id:'s8', tag:'basic', title:'Modular arithmetic',
    desc:'Always take mod at each step to avoid overflow in combination/DP problems.',
    code:`<span class="type">long</span> MOD = <span class="num">1_000_000_007</span>;\n\n<span class="type">long</span> add  = (a % MOD + b % MOD) % MOD;\n<span class="type">long</span> mul  = (a % MOD) * (b % MOD) % MOD;\n<span class="type">long</span> sub  = ((a - b) % MOD + MOD) % MOD; <span class="cmt">// avoid negative</span>` },

  // ── ARRAYS ────────────────────────────────────
  { id:'a1', tag:'array', title:'1D Array — declare & init',
    desc:'Fixed-size array; default values are 0 for int, null for objects.',
    code:`<span class="type">int</span>[] arr = <span class="kw">new</span> <span class="type">int</span>[<span class="num">5</span>];           <span class="cmt">// all zeros</span>\n<span class="type">int</span>[] arr = {<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>};  <span class="cmt">// inline</span>\n<span class="type">int</span> n = arr.length;             <span class="cmt">// size` },

  { id:'a2', tag:'array', title:'2D Array (matrix / DP table)',
    desc:'Declare a rows×cols grid; perfect for DP tables and grid problems.',
    code:`<span class="type">int</span>[][] mat = <span class="kw">new</span> <span class="type">int</span>[<span class="num">3</span>][<span class="num">4</span>]; <span class="cmt">// 3 rows, 4 cols</span>\n<span class="type">int</span> rows = mat.length;\n<span class="type">int</span> cols = mat[<span class="num">0</span>].length;\n\n<span class="cmt">// inline init:</span>\n<span class="type">int</span>[][] m = {{<span class="num">1</span>,<span class="num">2</span>},{<span class="num">3</span>,<span class="num">4</span>}};` },

  { id:'a3', tag:'array', title:'Arrays utility methods',
    desc:'Fill, sort, copy, binary search — all from java.util.Arrays.',
    code:`<span class="kw">import</span> java.util.Arrays;\n\n<span class="cls">Arrays</span>.<span class="fn">fill</span>(arr, <span class="num">-1</span>);          <span class="cmt">// fill all with -1</span>\n<span class="cls">Arrays</span>.<span class="fn">sort</span>(arr);             <span class="cmt">// ascending</span>\n<span class="cls">Arrays</span>.<span class="fn">sort</span>(arr, <span class="num">0</span>, n);       <span class="cmt">// sort [0,n)</span>\n<span class="type">int</span>[] c = <span class="cls">Arrays</span>.<span class="fn">copyOf</span>(arr, n);\n<span class="type">int</span>   i = <span class="cls">Arrays</span>.<span class="fn">binarySearch</span>(arr, key);` },

  { id:'a4', tag:'array', title:'Prefix Sum',
    desc:'Precompute cumulative sums for O(1) range sum queries.',
    code:`<span class="type">int</span>[] pre = <span class="kw">new</span> <span class="type">int</span>[n + <span class="num">1</span>];\n<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i < n; i++)\n    pre[i + <span class="num">1</span>] = pre[i] + arr[i];\n\n<span class="cmt">// range sum [l, r] inclusive:</span>\n<span class="type">int</span> sum = pre[r + <span class="num">1</span>] - pre[l];` },

  { id:'a5', tag:'array', title:'2D Prefix Sum',
    desc:'O(1) rectangle sum queries on a matrix.',
    code:`<span class="type">int</span>[][] pre = <span class="kw">new</span> <span class="type">int</span>[m+<span class="num">1</span>][n+<span class="num">1</span>];\n<span class="kw">for</span> (<span class="type">int</span> i=<span class="num">1</span>; i<=m; i++)\n  <span class="kw">for</span> (<span class="type">int</span> j=<span class="num">1</span>; j<=n; j++)\n    pre[i][j] = grid[i<span class="num">-1</span>][j<span class="num">-1</span>]\n      + pre[i<span class="num">-1</span>][j] + pre[i][j<span class="num">-1</span>] - pre[i<span class="num">-1</span>][j<span class="num">-1</span>];` },

  // ── LISTS ─────────────────────────────────────
  { id:'l1', tag:'list', title:'ArrayList',
    desc:'Dynamic resizable array — use when size is unknown at compile time.',
    code:`<span class="kw">import</span> java.util.ArrayList;\n\n<span class="cls">ArrayList</span>&lt;<span class="cls">Integer</span>&gt; list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();\nlist.<span class="fn">add</span>(<span class="num">5</span>);\nlist.<span class="fn">get</span>(<span class="num">0</span>);\nlist.<span class="fn">set</span>(<span class="num">0</span>, <span class="num">10</span>);\nlist.<span class="fn">remove</span>(<span class="num">0</span>);    <span class="cmt">// by index</span>\nlist.<span class="fn">size</span>();` },

  { id:'l2', tag:'list', title:'LinkedList',
    desc:'Doubly linked list — O(1) add/remove at ends; also implements Deque.',
    code:`<span class="kw">import</span> java.util.LinkedList;\n\n<span class="cls">LinkedList</span>&lt;<span class="cls">Integer</span>&gt; ll = <span class="kw">new</span> <span class="cls">LinkedList</span>&lt;&gt;();\nll.<span class="fn">addFirst</span>(<span class="num">1</span>);  ll.<span class="fn">addLast</span>(<span class="num">2</span>);\nll.<span class="fn">removeFirst</span>(); ll.<span class="fn">removeLast</span>();\nll.<span class="fn">peekFirst</span>();  ll.<span class="fn">peekLast</span>();` },

  { id:'l3', tag:'list', title:'Adjacency List (graph)',
    desc:'Standard graph representation using a list of lists.',
    code:`<span class="cls">ArrayList</span>&lt;<span class="cls">ArrayList</span>&lt;<span class="cls">Integer</span>&gt;&gt; adj =\n    <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();\n<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i < n; i++)\n    adj.<span class="fn">add</span>(<span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;());\nadj.<span class="fn">get</span>(u).<span class="fn">add</span>(v);\nadj.<span class="fn">get</span>(v).<span class="fn">add</span>(u); <span class="cmt">// undirected</span>` },

  // ── MAP / SET ─────────────────────────────────
  { id:'m1', tag:'map', title:'HashMap',
    desc:'Key-value store with O(1) average get/put; insertion order not guaranteed.',
    code:`<span class="kw">import</span> java.util.HashMap;\n\n<span class="cls">HashMap</span>&lt;<span class="cls">String</span>, <span class="cls">Integer</span>&gt; map = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;();\nmap.<span class="fn">put</span>(<span class="str">"a"</span>, <span class="num">1</span>);\nmap.<span class="fn">get</span>(<span class="str">"a"</span>);\nmap.<span class="fn">getOrDefault</span>(<span class="str">"b"</span>, <span class="num">0</span>);\nmap.<span class="fn">containsKey</span>(<span class="str">"a"</span>);\nmap.<span class="fn">merge</span>(<span class="str">"a"</span>, <span class="num">1</span>, Integer::sum); <span class="cmt">// freq count</span>` },

  { id:'m2', tag:'map', title:'TreeMap (sorted by key)',
    desc:'Sorted map — supports floor/ceiling/first/last key queries in O(log n).',
    code:`<span class="kw">import</span> java.util.TreeMap;\n\n<span class="cls">TreeMap</span>&lt;<span class="cls">Integer</span>, <span class="cls">Integer</span>&gt; tm = <span class="kw">new</span> <span class="cls">TreeMap</span>&lt;&gt;();\ntm.<span class="fn">put</span>(<span class="num">3</span>, <span class="num">10</span>);\ntm.<span class="fn">floorKey</span>(<span class="num">4</span>);     <span class="cmt">// largest ≤ 4</span>\ntm.<span class="fn">ceilingKey</span>(<span class="num">2</span>);   <span class="cmt">// smallest ≥ 2</span>\ntm.<span class="fn">firstKey</span>();  tm.<span class="fn">lastKey</span>();` },

  { id:'m3', tag:'map', title:'HashSet',
    desc:'Unique elements with O(1) add/contains/remove; use for visited tracking.',
    code:`<span class="kw">import</span> java.util.HashSet;\n\n<span class="cls">HashSet</span>&lt;<span class="cls">Integer</span>&gt; set = <span class="kw">new</span> <span class="cls">HashSet</span>&lt;&gt;();\nset.<span class="fn">add</span>(<span class="num">5</span>);\nset.<span class="fn">contains</span>(<span class="num">5</span>);\nset.<span class="fn">remove</span>(<span class="num">5</span>);\nset.<span class="fn">size</span>();` },

  { id:'m4', tag:'map', title:'TreeSet (sorted unique)',
    desc:'Sorted set with floor/ceiling/first/last — great for range problems.',
    code:`<span class="kw">import</span> java.util.TreeSet;\n\n<span class="cls">TreeSet</span>&lt;<span class="cls">Integer</span>&gt; ts = <span class="kw">new</span> <span class="cls">TreeSet</span>&lt;&gt;();\nts.<span class="fn">add</span>(<span class="num">3</span>); ts.<span class="fn">add</span>(<span class="num">1</span>); ts.<span class="fn">add</span>(<span class="num">7</span>);\nts.<span class="fn">floor</span>(<span class="num">4</span>);    <span class="cmt">// 3</span>\nts.<span class="fn">ceiling</span>(<span class="num">4</span>);  <span class="cmt">// 7</span>\nts.<span class="fn">first</span>();    <span class="cmt">// 1</span>` },

  // ── STACK / QUEUE / HEAP ──────────────────────
  { id:'q1', tag:'stack', title:'Stack',
    desc:'LIFO structure — ideal for backtracking, parentheses, and monotonic stack.',
    code:`<span class="kw">import</span> java.util.Stack;\n\n<span class="cls">Stack</span>&lt;<span class="cls">Integer</span>&gt; st = <span class="kw">new</span> <span class="cls">Stack</span>&lt;&gt;();\nst.<span class="fn">push</span>(<span class="num">5</span>);\nst.<span class="fn">pop</span>();    <span class="cmt">// remove & return top</span>\nst.<span class="fn">peek</span>();   <span class="cmt">// view top without removing</span>\nst.<span class="fn">isEmpty</span>();` },

  { id:'q2', tag:'stack', title:'Queue (LinkedList)',
    desc:'FIFO structure — the standard choice for BFS traversal.',
    code:`<span class="kw">import</span> java.util.Queue;\n<span class="kw">import</span> java.util.LinkedList;\n\n<span class="cls">Queue</span>&lt;<span class="cls">Integer</span>&gt; q = <span class="kw">new</span> <span class="cls">LinkedList</span>&lt;&gt;();\nq.<span class="fn">offer</span>(<span class="num">1</span>);    <span class="cmt">// enqueue</span>\nq.<span class="fn">poll</span>();     <span class="cmt">// dequeue (removes front)</span>\nq.<span class="fn">peek</span>();     <span class="cmt">// front without removing</span>` },

  { id:'q3', tag:'stack', title:'Deque (ArrayDeque)',
    desc:'Double-ended queue — faster than Stack & LinkedList; use for sliding window.',
    code:`<span class="kw">import</span> java.util.ArrayDeque;\n<span class="kw">import</span> java.util.Deque;\n\n<span class="cls">Deque</span>&lt;<span class="cls">Integer</span>&gt; dq = <span class="kw">new</span> <span class="cls">ArrayDeque</span>&lt;&gt;();\ndq.<span class="fn">offerFirst</span>(<span class="num">1</span>); dq.<span class="fn">offerLast</span>(<span class="num">2</span>);\ndq.<span class="fn">pollFirst</span>();   dq.<span class="fn">pollLast</span>();\ndq.<span class="fn">peekFirst</span>();   dq.<span class="fn">peekLast</span>();` },

  { id:'q4', tag:'stack', title:'PriorityQueue (Min-Heap)',
    desc:'Smallest element at top by default — used in Dijkstra, top-K, and scheduling.',
    code:`<span class="kw">import</span> java.util.PriorityQueue;\n\n<span class="cmt">// Min-heap (default)</span>\n<span class="cls">PriorityQueue</span>&lt;<span class="cls">Integer</span>&gt; pq = <span class="kw">new</span> <span class="cls">PriorityQueue</span>&lt;&gt;();\n\n<span class="cmt">// Max-heap</span>\n<span class="cls">PriorityQueue</span>&lt;<span class="cls">Integer</span>&gt; mpq =\n    <span class="kw">new</span> <span class="cls">PriorityQueue</span>&lt;&gt;(<span class="cls">Collections</span>.reverseOrder());\n\npq.<span class="fn">offer</span>(<span class="num">3</span>); pq.<span class="fn">poll</span>(); pq.<span class="fn">peek</span>();` },

  { id:'q5', tag:'stack', title:'PQ with custom comparator',
    desc:'Priority queue for int[] pairs — sort by first element (e.g., distance).',
    code:`<span class="cls">PriorityQueue</span>&lt;<span class="type">int</span>[]&gt; pq =\n    <span class="kw">new</span> <span class="cls">PriorityQueue</span>&lt;&gt;((a, b) -> a[<span class="num">0</span>] - b[<span class="num">0</span>]);\n<span class="cmt">// int[] = {dist, node}</span>\npq.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">int</span>[]{<span class="num">0</span>, src});\n<span class="type">int</span>[] top = pq.<span class="fn">poll</span>();` },

  // ── TREE ──────────────────────────────────────
  { id:'t1', tag:'tree', title:'TreeNode (Binary Tree)',
    desc:'Standard node definition used in most LeetCode tree problems.',
    code:`<span class="kw">class</span> <span class="cls">TreeNode</span> {\n    <span class="type">int</span> val;\n    <span class="cls">TreeNode</span> left, right;\n    <span class="cls">TreeNode</span>(<span class="type">int</span> val) {\n        <span class="kw">this</span>.val = val;\n    }\n}` },

  { id:'t2', tag:'tree', title:'BFS on Tree (level-order)',
    desc:'Level-by-level traversal using a queue; gives shortest path in unweighted trees.',
    code:`<span class="cls">Queue</span>&lt;<span class="cls">TreeNode</span>&gt; q = <span class="kw">new</span> <span class="cls">LinkedList</span>&lt;&gt;();\nq.<span class="fn">offer</span>(root);\n<span class="kw">while</span> (!q.<span class="fn">isEmpty</span>()) {\n    <span class="type">int</span> size = q.<span class="fn">size</span>(); <span class="cmt">// current level size</span>\n    <span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; size; i++) {\n        <span class="cls">TreeNode</span> node = q.<span class="fn">poll</span>();\n        <span class="kw">if</span> (node.left  != <span class="kw">null</span>) q.<span class="fn">offer</span>(node.left);\n        <span class="kw">if</span> (node.right != <span class="kw">null</span>) q.<span class="fn">offer</span>(node.right);\n    }\n}` },

  { id:'t3', tag:'tree', title:'DFS traversals (recursive)',
    desc:'Inorder/preorder/postorder in one template — just move the "process" line.',
    code:`<span class="kw">void</span> <span class="fn">dfs</span>(<span class="cls">TreeNode</span> node) {\n    <span class="kw">if</span> (node == <span class="kw">null</span>) <span class="kw">return</span>;\n    <span class="cmt">// preorder  → process here</span>\n    <span class="fn">dfs</span>(node.left);\n    <span class="cmt">// inorder   → process here</span>\n    <span class="fn">dfs</span>(node.right);\n    <span class="cmt">// postorder → process here</span>\n}` },

  // ── GRAPH ─────────────────────────────────────
  { id:'g1', tag:'graph', title:'Adjacency List (undirected)',
    desc:'Most common graph representation for BFS/DFS — add edges after building.',
    code:`<span class="type">int</span> n = <span class="num">5</span>;\n<span class="cls">ArrayList</span>&lt;<span class="cls">ArrayList</span>&lt;<span class="cls">Integer</span>&gt;&gt; adj =\n    <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();\n<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; n; i++)\n    adj.<span class="fn">add</span>(<span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;());\nadj.<span class="fn">get</span>(u).<span class="fn">add</span>(v);\nadj.<span class="fn">get</span>(v).<span class="fn">add</span>(u); <span class="cmt">// bidirectional</span>` },

  { id:'g2', tag:'graph', title:'BFS on Graph',
    desc:'Explores all nodes level by level; guarantees shortest path in unweighted graphs.',
    code:`<span class="type">boolean</span>[] vis = <span class="kw">new</span> <span class="type">boolean</span>[n];\n<span class="cls">Queue</span>&lt;<span class="cls">Integer</span>&gt; q = <span class="kw">new</span> <span class="cls">LinkedList</span>&lt;&gt;();\nq.<span class="fn">offer</span>(<span class="num">0</span>); vis[<span class="num">0</span>] = <span class="kw">true</span>;\n<span class="kw">while</span> (!q.<span class="fn">isEmpty</span>()) {\n    <span class="type">int</span> node = q.<span class="fn">poll</span>();\n    <span class="kw">for</span> (<span class="type">int</span> nb : adj.<span class="fn">get</span>(node))\n        <span class="kw">if</span> (!vis[nb]) { vis[nb]=<span class="kw">true</span>; q.<span class="fn">offer</span>(nb); }\n}` },

  { id:'g3', tag:'graph', title:'DFS on Graph',
    desc:'Recursively explores as deep as possible; useful for cycle detection and connectivity.',
    code:`<span class="type">boolean</span>[] vis = <span class="kw">new</span> <span class="type">boolean</span>[n];\n<span class="kw">void</span> <span class="fn">dfs</span>(<span class="type">int</span> node) {\n    vis[node] = <span class="kw">true</span>;\n    <span class="kw">for</span> (<span class="type">int</span> nb : adj.<span class="fn">get</span>(node))\n        <span class="kw">if</span> (!vis[nb]) <span class="fn">dfs</span>(nb);\n}` },

  { id:'g4', tag:'graph', title:"Dijkstra's Shortest Path",
    desc:'Single-source shortest path on weighted graph with non-negative edges.',
    code:`<span class="type">int</span>[] dist = <span class="kw">new</span> <span class="type">int</span>[n];\n<span class="cls">Arrays</span>.<span class="fn">fill</span>(dist, <span class="cls">Integer</span>.MAX_VALUE);\ndist[src] = <span class="num">0</span>;\n<span class="cls">PriorityQueue</span>&lt;<span class="type">int</span>[]&gt; pq =\n    <span class="kw">new</span> <span class="cls">PriorityQueue</span>&lt;&gt;((a,b)->a[<span class="num">0</span>]-b[<span class="num">0</span>]);\npq.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">int</span>[]{<span class="num">0</span>, src});\n<span class="kw">while</span>(!pq.<span class="fn">isEmpty</span>()){\n    <span class="type">int</span>[] cur = pq.<span class="fn">poll</span>();\n    <span class="kw">if</span>(cur[<span class="num">0</span>] > dist[cur[<span class="num">1</span>]]) <span class="kw">continue</span>;\n    <span class="cmt">// relax neighbors here</span>\n}` },

  { id:'g5', tag:'graph', title:'Union-Find (DSU)',
    desc:'Disjoint Set Union — track connected components in near O(1) per operation.',
    code:`<span class="type">int</span>[] parent = <span class="kw">new</span> <span class="type">int</span>[n];\n<span class="type">int</span>[] rank   = <span class="kw">new</span> <span class="type">int</span>[n];\n<span class="kw">for</span>(<span class="type">int</span> i=<span class="num">0</span>; i&lt;n; i++) parent[i]=i;\n\n<span class="type">int</span> <span class="fn">find</span>(<span class="type">int</span> x){\n    <span class="kw">if</span>(parent[x]!=x) parent[x]=<span class="fn">find</span>(parent[x]);\n    <span class="kw">return</span> parent[x];\n}\n<span class="kw">void</span> <span class="fn">union</span>(<span class="type">int</span> a, <span class="type">int</span> b){\n    <span class="type">int</span> ra=<span class="fn">find</span>(a), rb=<span class="fn">find</span>(b);\n    <span class="kw">if</span>(rank[ra]&lt;rank[rb]) parent[ra]=rb;\n    <span class="kw">else if</span>(rank[ra]>rank[rb]) parent[rb]=ra;\n    <span class="kw">else</span>{ parent[rb]=ra; rank[ra]++; }\n}` },

  // ── SORTING ───────────────────────────────────
  { id:'so1', tag:'sort', title:'Custom comparator (array)',
    desc:'Sort a 2D array by any column using a lambda comparator.',
    code:`<span class="cmt">// sort by first column ascending</span>\n<span class="cls">Arrays</span>.<span class="fn">sort</span>(arr, (a, b) -> a[<span class="num">0</span>] - b[<span class="num">0</span>]);\n\n<span class="cmt">// sort by second column descending</span>\n<span class="cls">Arrays</span>.<span class="fn">sort</span>(arr, (a, b) -> b[<span class="num">1</span>] - a[<span class="num">1</span>]);\n\n<span class="cmt">// multi-key sort</span>\n<span class="cls">Arrays</span>.<span class="fn">sort</span>(arr, (a,b) -> a[<span class="num">0</span>]!=b[<span class="num">0</span>] ? a[<span class="num">0</span>]-b[<span class="num">0</span>] : a[<span class="num">1</span>]-b[<span class="num">1</span>]);` },

  { id:'so2', tag:'sort', title:'Collections utilities',
    desc:'Handy static methods for sorting, reversing, and finding extremes in lists.',
    code:`<span class="kw">import</span> java.util.Collections;\n\n<span class="cls">Collections</span>.<span class="fn">sort</span>(list);\n<span class="cls">Collections</span>.<span class="fn">sort</span>(list, (a,b)->b-a); <span class="cmt">// desc</span>\n<span class="cls">Collections</span>.<span class="fn">reverse</span>(list);\n<span class="cls">Collections</span>.<span class="fn">max</span>(list);\n<span class="cls">Collections</span>.<span class="fn">min</span>(list);\n<span class="cls">Collections</span>.<span class="fn">frequency</span>(list, val);` },

  // ── STRINGS ───────────────────────────────────
  { id:'st1', tag:'string', title:'String common methods',
    desc:'The most-used String operations you will reach for in every problem.',
    code:`<span class="cls">String</span> s = <span class="str">"hello"</span>;\ns.<span class="fn">length</span>();\ns.<span class="fn">charAt</span>(<span class="num">0</span>);\ns.<span class="fn">substring</span>(<span class="num">1</span>, <span class="num">3</span>);    <span class="cmt">// "el"</span>\ns.<span class="fn">indexOf</span>(<span class="str">'l'</span>);\ns.<span class="fn">contains</span>(<span class="str">"ell"</span>);\ns.<span class="fn">equals</span>(<span class="str">"hello"</span>);\ns.<span class="fn">toCharArray</span>();\ns.<span class="fn">trim</span>();\ns.<span class="fn">toLowerCase</span>();` },

  { id:'st2', tag:'string', title:'StringBuilder',
    desc:'Mutable string — prevents O(n²) overhead of repeated + concatenation in loops.',
    code:`<span class="cls">StringBuilder</span> sb = <span class="kw">new</span> <span class="cls">StringBuilder</span>();\nsb.<span class="fn">append</span>(<span class="str">"hello"</span>);\nsb.<span class="fn">insert</span>(<span class="num">0</span>, <span class="str">"say: "</span>);\nsb.<span class="fn">deleteCharAt</span>(<span class="num">0</span>);\nsb.<span class="fn">reverse</span>();\nsb.<span class="fn">length</span>();\nsb.<span class="fn">toString</span>();` },

  { id:'st3', tag:'string', title:'Char operations',
    desc:'Character checks and index tricks essential for sliding window and frequency maps.',
    code:`<span class="type">char</span> c = <span class="str">'A'</span>;\n<span class="cls">Character</span>.<span class="fn">isLetter</span>(c);\n<span class="cls">Character</span>.<span class="fn">isDigit</span>(c);\n<span class="cls">Character</span>.<span class="fn">toLowerCase</span>(c);\n<span class="cls">Character</span>.<span class="fn">toUpperCase</span>(c);\n<span class="type">int</span> idx = c - <span class="str">'a'</span>; <span class="cmt">// 0-based index (0-25)</span>` },

  { id:'st4', tag:'string', title:'Split & join',
    desc:'Tokenize a string or join parts — commonly used in parsing problems.',
    code:`<span class="cls">String</span>[] parts = s.<span class="fn">split</span>(<span class="str">" "</span>);\n<span class="cls">String</span>[] parts = s.<span class="fn">split</span>(<span class="str">","</span>);\n<span class="cls">String</span> joined  = <span class="cls">String</span>.<span class="fn">join</span>(<span class="str">"-"</span>, parts);\n<span class="cls">String</span> joined  = <span class="cls">String</span>.<span class="fn">join</span>(<span class="str">""</span>,\n    <span class="cls">Arrays</span>.<span class="fn">asList</span>(parts));` },

  // ── BIT TRICKS ────────────────────────────────
  { id:'b1', tag:'bit', title:'Bit trick essentials',
    desc:'Core bitwise operations you will use for mask-DP and state compression.',
    code:`<span class="type">int</span> x = <span class="num">13</span>; <span class="cmt">// 1101 in binary</span>\n(x & <span class="num">1</span>)         <span class="cmt">// check if odd → 1</span>\n(x >> <span class="num">1</span>)        <span class="cmt">// divide by 2</span>\n(x << <span class="num">1</span>)        <span class="cmt">// multiply by 2</span>\n(x & (x-<span class="num">1</span>))     <span class="cmt">// clear lowest set bit</span>\n(x & -x)         <span class="cmt">// isolate lowest set bit</span>\n<span class="cls">Integer</span>.<span class="fn">bitCount</span>(x);  <span class="cmt">// count set bits</span>` },

  { id:'b2', tag:'bit', title:'Check / set / clear / toggle bit',
    desc:'Four fundamental bit manipulations for competitive programming.',
    code:`<span class="type">int</span> n = <span class="num">5</span>; <span class="cmt">// 101</span>\n<span class="type">int</span> i = <span class="num">1</span>; <span class="cmt">// target bit position</span>\n\n<span class="type">boolean</span> isSet = (n >> i & <span class="num">1</span>) == <span class="num">1</span>;  <span class="cmt">// check</span>\n<span class="type">int</span> set    = n | (<span class="num">1</span> << i);   <span class="cmt">// set</span>\n<span class="type">int</span> clear  = n & ~(<span class="num">1</span> << i); <span class="cmt">// clear</span>\n<span class="type">int</span> toggle = n ^ (<span class="num">1</span> << i);  <span class="cmt">// toggle</span>` },

  { id:'b3', tag:'bit', title:'Power of 2 checks',
    desc:'O(1) tricks to check if a number is a power of 2 or round up to next power.',
    code:`<span class="type">boolean</span> isPow2 = n > <span class="num">0</span> && (n & (n-<span class="num">1</span>)) == <span class="num">0</span>;\n\n<span class="cmt">// next power of 2 >= n</span>\n<span class="type">int</span> p = <span class="num">1</span>;\n<span class="kw">while</span> (p < n) p <<= <span class="num">1</span>;\n\n<span class="cmt">// fast XOR swap (no temp)</span>\na ^= b; b ^= a; a ^= b;` },

  { id:'b4', tag:'bit', title:'Bitmask — iterate all subsets',
    desc:'Enumerate all 2^n subsets — essential for bitmask DP.',
    code:`<span class="kw">for</span> (<span class="type">int</span> mask = <span class="num">0</span>; mask < (<span class="num">1</span> << n); mask++) {\n    <span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i < n; i++) {\n        <span class="kw">if</span> ((mask >> i & <span class="num">1</span>) == <span class="num">1</span>) {\n            <span class="cmt">// bit i is set in this subset</span>\n        }\n    }\n}` },

  // ── DP PATTERNS ───────────────────────────────
  { id:'d1', tag:'dp', title:'0/1 Knapsack',
    desc:'Classic DP — can you reach exactly weight W using items with given weights/values?',
    code:`<span class="type">int</span>[] dp = <span class="kw">new</span> <span class="type">int</span>[W + <span class="num">1</span>];\n<span class="kw">for</span> (<span class="type">int</span>[] item : items) {  <span class="cmt">// {weight, value}</span>\n    <span class="kw">for</span> (<span class="type">int</span> w = W; w >= item[<span class="num">0</span>]; w--)\n        dp[w] = <span class="cls">Math</span>.<span class="fn">max</span>(dp[w],\n                dp[w - item[<span class="num">0</span>]] + item[<span class="num">1</span>]);\n}` },

  { id:'d2', tag:'dp', title:'Longest Common Subsequence',
    desc:'Classic 2D DP — find the longest subsequence common to two strings.',
    code:`<span class="type">int</span> m = a.length(), n = b.length();\n<span class="type">int</span>[][] dp = <span class="kw">new</span> <span class="type">int</span>[m+<span class="num">1</span>][n+<span class="num">1</span>];\n<span class="kw">for</span>(<span class="type">int</span> i=<span class="num">1</span>;i<=m;i++)\n  <span class="kw">for</span>(<span class="type">int</span> j=<span class="num">1</span>;j<=n;j++)\n    dp[i][j] = a.<span class="fn">charAt</span>(i<span class="num">-1</span>)==b.<span class="fn">charAt</span>(j<span class="num">-1</span>)\n        ? dp[i<span class="num">-1</span>][j<span class="num">-1</span>]+<span class="num">1</span>\n        : <span class="cls">Math</span>.<span class="fn">max</span>(dp[i<span class="num">-1</span>][j], dp[i][j<span class="num">-1</span>]);` },

  { id:'d3', tag:'dp', title:'Longest Increasing Subsequence',
    desc:'O(n log n) LIS using patience sorting with binary search.',
    code:`<span class="cls">ArrayList</span>&lt;<span class="cls">Integer</span>&gt; tails = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();\n<span class="kw">for</span> (<span class="type">int</span> x : nums) {\n    <span class="type">int</span> pos = <span class="cls">Collections</span>.<span class="fn">binarySearch</span>(tails, x);\n    <span class="kw">if</span> (pos < <span class="num">0</span>) pos = ~pos;\n    <span class="kw">if</span> (pos == tails.<span class="fn">size</span>()) tails.<span class="fn">add</span>(x);\n    <span class="kw">else</span> tails.<span class="fn">set</span>(pos, x);\n}\n<span class="type">int</span> lis = tails.<span class="fn">size</span>();` },

  { id:'d4', tag:'dp', title:'Backtracking template',
    desc:'Generic backtracking skeleton — works for subsets, permutations, N-Queens.',
    code:`<span class="kw">void</span> <span class="fn">backtrack</span>(<span class="type">int</span> start, <span class="cls">List</span>&lt;<span class="cls">Integer</span>&gt; curr) {\n    result.<span class="fn">add</span>(<span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(curr)); <span class="cmt">// record</span>\n    <span class="kw">for</span> (<span class="type">int</span> i = start; i < n; i++) {\n        curr.<span class="fn">add</span>(nums[i]);      <span class="cmt">// choose</span>\n        <span class="fn">backtrack</span>(i+<span class="num">1</span>, curr);  <span class="cmt">// explore</span>\n        curr.<span class="fn">remove</span>(curr.<span class="fn">size</span>()-<span class="num">1</span>); <span class="cmt">// undo</span>\n    }\n}` },

  { id:'d5', tag:'dp', title:'Two Pointer template',
    desc:'Classic two-pointer for sorted arrays — find pairs summing to target in O(n).',
    code:`<span class="type">int</span> lo = <span class="num">0</span>, hi = arr.length - <span class="num">1</span>;\n<span class="kw">while</span> (lo < hi) {\n    <span class="type">int</span> sum = arr[lo] + arr[hi];\n    <span class="kw">if</span>      (sum == target) { <span class="cmt">/* found */</span> }\n    <span class="kw">else if</span> (sum < target)  lo++;\n    <span class="kw">else</span>                    hi--;\n}` },

  { id:'d6', tag:'dp', title:'Sliding Window template',
    desc:'Fixed/variable window for substring / subarray problems — O(n).',
    code:`<span class="type">int</span> lo = <span class="num">0</span>, maxLen = <span class="num">0</span>;\n<span class="cls">HashMap</span>&lt;<span class="cls">Character</span>,<span class="cls">Integer</span>&gt; freq = <span class="kw">new</span> <span class="cls">HashMap</span>&lt;&gt;();\n<span class="kw">for</span> (<span class="type">int</span> hi = <span class="num">0</span>; hi < s.<span class="fn">length</span>(); hi++) {\n    freq.<span class="fn">merge</span>(s.<span class="fn">charAt</span>(hi), <span class="num">1</span>, Integer::sum);\n    <span class="kw">while</span> (<span class="cmt">/* window invalid */</span>) {\n        freq.<span class="fn">merge</span>(s.<span class="fn">charAt</span>(lo), -<span class="num">1</span>, Integer::sum);\n        <span class="kw">if</span>(freq.<span class="fn">get</span>(s.<span class="fn">charAt</span>(lo))==<span class="num">0</span>)\n            freq.<span class="fn">remove</span>(s.<span class="fn">charAt</span>(lo));\n        lo++;\n    }\n    maxLen = <span class="cls">Math</span>.<span class="fn">max</span>(maxLen, hi - lo + <span class="num">1</span>);\n}` },
];

/* ═══════════════════════════════════════════════════
   COMPLEXITY TABLE DATA
═══════════════════════════════════════════════════ */
const COMPLEXITY = [
  { group:'Arrays & Strings', rows:[
    {ds:'Array access',        access:'O(1)',    search:'O(n)',   insert:'O(n)',   delete:'O(n)',   space:'O(n)'},
    {ds:'Dynamic Array (ArrayList)',access:'O(1)',search:'O(n)', insert:'O(1)*', delete:'O(n)',   space:'O(n)'},
    {ds:'String (immutable)',  access:'O(1)',    search:'O(n)',   insert:'O(n)',   delete:'O(n)',   space:'O(n)'},
    {ds:'StringBuilder',       access:'O(1)',    search:'O(n)',   insert:'O(1)*', delete:'O(n)',   space:'O(n)'},
  ]},
  { group:'Linked Structures', rows:[
    {ds:'LinkedList (head)',    access:'O(n)',    search:'O(n)',   insert:'O(1)',   delete:'O(1)',   space:'O(n)'},
    {ds:'Stack (ArrayDeque)',   access:'O(1)*',  search:'O(n)',   insert:'O(1)',   delete:'O(1)',   space:'O(n)'},
    {ds:'Queue (ArrayDeque)',   access:'O(1)*',  search:'O(n)',   insert:'O(1)',   delete:'O(1)',   space:'O(n)'},
  ]},
  { group:'Hash-Based', rows:[
    {ds:'HashMap',             access:'O(1)*',  search:'O(1)*',  insert:'O(1)*', delete:'O(1)*',  space:'O(n)'},
    {ds:'HashSet',             access:'–',       search:'O(1)*',  insert:'O(1)*', delete:'O(1)*',  space:'O(n)'},
  ]},
  { group:'Tree-Based', rows:[
    {ds:'TreeMap (Red-Black)', access:'O(log n)',search:'O(log n)',insert:'O(log n)',delete:'O(log n)',space:'O(n)'},
    {ds:'TreeSet',             access:'–',       search:'O(log n)',insert:'O(log n)',delete:'O(log n)',space:'O(n)'},
    {ds:'Binary Search Tree',  access:'O(log n)',search:'O(log n)',insert:'O(log n)',delete:'O(log n)',space:'O(n)'},
    {ds:'Heap / PriorityQueue',access:'O(1)*',  search:'O(n)',   insert:'O(log n)',delete:'O(log n)',space:'O(n)'},
  ]},
  { group:'Graph', rows:[
    {ds:'Adj. List (BFS/DFS)', access:'O(V+E)', search:'O(V+E)',insert:'O(1)',  delete:'O(E)',   space:'O(V+E)'},
    {ds:'Adj. Matrix',         access:'O(1)',    search:'O(V²)', insert:'O(V²)', delete:'O(V²)', space:'O(V²)'},
    {ds:'Union-Find (DSU)',    access:'O(α)',    search:'O(α)',  insert:'O(α)',  delete:'–',      space:'O(n)'},
  ]},
  { group:'Sorting Algorithms', rows:[
    {ds:'Arrays.sort (dual pivot)',access:'–',  search:'–',     insert:'–',     delete:'–',     space:'O(n log n) avg, O(n log n) space'},
    {ds:'Merge Sort',            access:'–',     search:'–',     insert:'–',     delete:'–',     space:'O(n log n) time, O(n) space'},
    {ds:'Binary Search',         access:'O(log n)',search:'O(log n)',insert:'–',delete:'–',     space:'O(1)'},
  ]},
];

function colorO(val) {
  if (!val || val === '–') return `<span style="color:var(--muted)">${val||'–'}</span>`;
  if (val.includes('O(1)'))     return `<span class="o1">${val}</span>`;
  if (val.includes('O(log'))    return `<span class="olog">${val}</span>`;
  if (val.includes('O(n log'))  return `<span class="onlog">${val}</span>`;
  if (val.includes('O(n²)') || val.includes('O(V²)')) return `<span class="on2">${val}</span>`;
  if (val.includes('O(n)') || val.includes('O(V'))    return `<span class="on">${val}</span>`;
  if (val.includes('O(α)'))     return `<span class="o1">${val}</span>`;
  return `<span style="color:var(--text-dim)">${val}</span>`;
}

function buildComplexityTable() {
  let html = `<h2 style="font-size:20px;font-weight:800;margin-bottom:6px;">Time & Space Complexity</h2>
  <p style="color:var(--text-dim);font-size:13px;margin-bottom:24px;">* = amortized average case</p>
  <div style="overflow-x:auto;">
  <table class="complexity-table">
    <thead><tr>
      <th>Data Structure</th><th>Access</th><th>Search</th><th>Insert</th><th>Delete</th><th>Space / Notes</th>
    </tr></thead><tbody>`;
  for (const g of COMPLEXITY) {
    html += `<tr class="complexity-group"><th colspan="6">${g.group}</th></tr>`;
    for (const r of g.rows) {
      html += `<tr>
        <td class="ds-name">${r.ds}</td>
        <td>${colorO(r.access)}</td>
        <td>${colorO(r.search)}</td>
        <td>${colorO(r.insert)}</td>
        <td>${colorO(r.delete)}</td>
        <td style="font-size:11px;color:var(--text-dim)">${r.space}</td>
      </tr>`;
    }
  }
  html += `</tbody></table></div>`;
  document.getElementById('complexityContent').innerHTML = html;
}

/* ═══════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════ */
let activeTag = 'all';
let searchQuery = '';
let favorites = [];
let copyCounts = JSON.parse(localStorage.getItem('dsa_copies') || '{}');
let customSnippets = [];

/* ═══════════════════════════════════════════════════
   AUTH STATE
═══════════════════════════════════════════════════ */
let authMode = "login";
let authToken = localStorage.getItem('dsa_auth_token') || null;
let currentUser = localStorage.getItem('dsa_auth_email') || null;

const API_BASE = "https://javacheatsheet-backend.onrender.com/api";

function allSnippets() { return [...SNIPPETS, ...customSnippets]; }

/* ═══════════════════════════════════════════════════
   SIDEBAR COUNTS
═══════════════════════════════════════════════════ */
function updateCounts() {
  const tags = ['basic','array','list','map','stack','tree','graph','sort','string','bit','dp'];
  const all = allSnippets();
  document.getElementById('cnt-all').textContent = all.length;
  for (const t of tags) {
    const el = document.getElementById('cnt-' + t);
    if (el) el.textContent = all.filter(s => s.tag === t).length;
  }
  document.getElementById('totalSnippets').textContent = all.length;
  const total = Object.values(copyCounts).reduce((a,b)=>a+b,0);
  document.getElementById('totalCopies').textContent = total;
  document.getElementById('totalFavs').textContent = favorites.length;
  const badge = document.getElementById('favBadge');
  badge.textContent = favorites.length;
  badge.classList.toggle('show', favorites.length > 0);

  const isLoggedIn = !!authToken;
  const addLock = document.getElementById('addLockIcon');
  const favLock = document.getElementById('favLockIcon');
  if (addLock) addLock.style.display = isLoggedIn ? 'none' : 'inline';
  if (favLock) favLock.style.display = isLoggedIn ? 'none' : 'inline';

  updateUserPill();

  const logoutBtn = document.getElementById('logoutTopbarBtn');
  if (logoutBtn) logoutBtn.classList.toggle('visible', !!authToken);

  const authTab = document.getElementById('tab-auth');
  if (authTab) authTab.textContent = isLoggedIn ? '👤 Account' : 'Login';
}

function updateUserPill() {
  const container = document.getElementById('userPillContainer');
  if (authToken && currentUser) {
    const initial = currentUser.charAt(0).toUpperCase();
    const shortEmail = currentUser.length > 18 ? currentUser.substring(0, 15) + '...' : currentUser;
    container.innerHTML = `
      <div class="user-pill" title="${currentUser}">
        <div class="avatar">${initial}</div>
        ${shortEmail}
      </div>`;
  } else {
    container.innerHTML = `
      <button class="icon-btn" onclick="switchTab('auth')" title="Login" style="font-size:13px;font-family:'JetBrains Mono',monospace;width:auto;padding:0 10px;">
        Login
      </button>`;
  }
}

/* ═══════════════════════════════════════════════════
   RENDER CARDS
═══════════════════════════════════════════════════ */
const tagNames = {
  basic:'Basic I/O & Utilities', array:'Arrays', list:'Lists',
  map:'Map & Set', stack:'Stack, Queue & Heap',
  tree:'Binary Tree', graph:'Graph Algorithms',
  sort:'Sorting', string:'Strings', bit:'Bit Manipulation',
  dp:'DP & Algorithm Patterns', custom:'Custom Snippets'
};
const tagOrder = ['basic','array','list','map','stack','tree','graph','sort','string','bit','dp','custom'];

function buildCard(item, showDelete = false) {
  const isFav = favorites.includes(item.id);
  const cnt   = copyCounts[item.id] || 0;
  const favBtn = authToken
    ? `<button class="small-btn${isFav ? ' active-fav' : ''}" onclick="toggleFav('${item.id}')" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">★</button>`
    : `<button class="small-btn" onclick="promptLogin('favorites')" title="Login to favorite" style="opacity:0.4">★</button>`;

  const deleteBtn = showDelete
    ? `<button class="small-btn" onclick="deleteCustom('${item.id}')" title="Delete" style="color:#f7488c">✕</button>`
    : '';

  return `
    <div class="card${isFav ? ' favorited' : ''}" id="card-${item.id}">
      <div class="card-header">
        <span class="card-title">${item.title}</span>
        <div class="card-actions">
          <span class="card-tag tag-${item.tag}">${item.tag}</span>
          ${favBtn}
          <button class="small-btn" onclick="copySnippet(this,'${item.id}')" title="Copy">⎘ copy</button>
          ${deleteBtn}
        </div>
      </div>
      <code class="snippet">${item.code}</code>
      <div class="card-desc">${item.desc}</div>
      <div class="copy-count${cnt > 0 ? ' show' : ''}" id="cc-${item.id}">copied ${cnt}×</div>
    </div>`;
}

function buildCards() {
  const container = document.getElementById('cardsContainer');
  const sections = {};
  const sq = searchQuery.toLowerCase();
  for (const item of allSnippets()) {
    const matchTag = activeTag === 'all' || item.tag === activeTag;
    const rawText = item.code.replace(/<[^>]+>/g,'').toLowerCase();
    const matchQ = !sq || item.title.toLowerCase().includes(sq)
                       || item.desc.toLowerCase().includes(sq)
                       || rawText.includes(sq);
    if (!matchTag || !matchQ) continue;
    if (!sections[item.tag]) sections[item.tag] = [];
    sections[item.tag].push(item);
  }
  let html = ''; let count = 0;
  for (const tag of tagOrder) {
    if (!sections[tag]) continue;
    html += `<div class="section">
      <div class="section-title">${tagNames[tag]}</div>
      <div class="cards">`;
    for (const item of sections[tag]) { html += buildCard(item); count++; }
    html += `</div></div>`;
  }
  container.innerHTML = html;
  document.getElementById('noResults').style.display = count === 0 ? 'block' : 'none';
}

/* ═══════════════════════════════════════════════════
   FILTER CHIPS
═══════════════════════════════════════════════════ */
function buildFilterChips() {
  const tags = [['all','All'], ...tagOrder.filter(t=>t!=='custom').map(t=>[t, tagNames[t].split(' ')[0]])];
  document.getElementById('filterChips').innerHTML =
    tags.map(([t,label]) =>
      `<button class="filter-btn${activeTag===t?' active':''}" onclick="setFilter(this,'${t}')">${label}</button>`
    ).join('');
}

function setFilter(btn, tag) {
  activeTag = tag;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === tag);
  });
  buildCards();
}

function setNavActive(btn, tag) {
  activeTag = tag;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  buildFilterChips();
  buildCards();
  switchTab('snippets');
  // Auto-close sidebar on mobile
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar.classList.contains('collapsed')) toggleSidebar();
  }
}

/* ═══════════════════════════════════════════════════
   COPY
═══════════════════════════════════════════════════ */
function copySnippet(btn, id) {
  const card = document.getElementById('card-' + id);
  const code = card.querySelector('code').innerText;
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = '✓ done';
    btn.classList.add('copied');
    copyCounts[id] = (copyCounts[id]||0) + 1;
    localStorage.setItem('dsa_copies', JSON.stringify(copyCounts));
    const cc = document.getElementById('cc-' + id);
    if (cc) { cc.textContent = `copied ${copyCounts[id]}×`; cc.classList.add('show'); }
    updateCounts();
    setTimeout(() => { btn.textContent = '⎘ copy'; btn.classList.remove('copied'); }, 1500);
  });
}

/* ═══════════════════════════════════════════════════
   AUTH HELPERS
═══════════════════════════════════════════════════ */
function promptLogin(destination) {
  showToast('🔒 Login required');
  switchTab('auth');
}

function buildLoginGate(featureName, icon) {
  return `<div class="login-gate">
    <div class="gate-icon">${icon}</div>
    <h3>${featureName} requires login</h3>
    <p>Create a free account to save your ${featureName.toLowerCase()} and access them anywhere.</p>
    <button class="login-gate-btn" onclick="switchTab('auth')">Login or Register →</button>
  </div>`;
}

/* ═══════════════════════════════════════════════════
   FAVORITES (protected)
   FIX: capture the pre-toggle state to determine toast message
═══════════════════════════════════════════════════ */
async function toggleFav(id) {
  if (!authToken) { promptLogin('favorites'); return; }

  // Capture current state BEFORE the API call
  const wasAlreadyFavorited = favorites.includes(id);

  try {
    const res = await fetch(API_BASE + "/favorites/" + id, {
      method: "POST",
      headers: { "Authorization": "Bearer " + authToken }
    });

    if (res.status === 401) { handleTokenExpired(); return; }
    if (!res.ok) throw new Error('Failed');

    const data = await res.json();
    // Handle both response shapes: plain array or {favorites: [...]}
    favorites = Array.isArray(data) ? data : (data.favorites || []);

    updateCounts();
    buildCards();
    buildFavPanel();

    // Use pre-toggle state for accurate message
    showToast(wasAlreadyFavorited ? '☆ Removed from favorites' : '★ Added to favorites');
  } catch (e) {
    showToast('Could not update favorite', true);
  }
}

function buildFavPanel() {
  const el = document.getElementById('favContent');
  if (!authToken) {
    el.innerHTML = buildLoginGate('Favorites', '★');
    return;
  }
  const items = allSnippets().filter(s => favorites.includes(s.id));
  if (!items.length) {
    el.innerHTML = `<div class="fav-empty"><div class="big-icon">★</div>No favorites yet.<br>Click ★ on any card to save it here.</div>`;
    return;
  }
  el.innerHTML = `<div class="cards">${items.map(i => buildCard(i)).join('')}</div>`;
}

/* ═══════════════════════════════════════════════════
   QUIZ
═══════════════════════════════════════════════════ */
let quizItems = [], quizIdx = 0, quizCorrect = 0, quizTag = 'all';

function buildQuizFilters() {
  const tags = [['all','All'], ...tagOrder.filter(t=>t!=='custom').map(t=>[t,tagNames[t].split(' ')[0]])];
  document.getElementById('quizFilters').innerHTML =
    tags.map(([t,label]) =>
      `<button class="filter-btn${quizTag===t?' active':''}" onclick="setQuizTag(this,'${t}')">${label}</button>`
    ).join('');
}

function setQuizTag(btn, tag) {
  quizTag = tag;
  document.querySelectorAll('#quizFilters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  startQuiz();
}

function startQuiz() {
  const pool = SNIPPETS.filter(s => quizTag === 'all' || s.tag === quizTag);
  quizItems = [...pool].sort(() => Math.random() - 0.5);
  quizIdx = 0; quizCorrect = 0;
  document.getElementById('quizEnd').classList.remove('show');
  renderQuizCard();
}

function renderQuizCard() {
  const total = quizItems.length;
  document.getElementById('quizProgress').style.width = `${total ? (quizIdx/total)*100 : 0}%`;
  document.getElementById('quizScore').textContent = `${quizCorrect} / ${quizIdx}`;

  if (quizIdx >= total) {
    document.getElementById('quizContent').innerHTML = '';
    const pct = total ? Math.round((quizCorrect/total)*100) : 0;
    document.getElementById('quizFinalScore').textContent = pct + '%';
    document.getElementById('quizFinalMsg').textContent =
      pct === 100 ? 'Perfect! You\'re a Java god. 🔥' :
      pct >= 80   ? 'Excellent! Keep grinding! 💪' :
      pct >= 50   ? 'Good effort. Review the misses. 📚' :
                    'Don\'t worry, practice makes perfect. 🌱';
    document.getElementById('quizEnd').classList.add('show');
    return;
  }

  const item = quizItems[quizIdx];
  document.getElementById('quizContent').innerHTML = `
    <div class="quiz-card">
      <div class="quiz-q-tag">${item.tag} — ${quizIdx+1} of ${total}</div>
      <div class="quiz-question">How do you declare:<br><strong>${item.title}</strong>?</div>
      <button class="quiz-reveal-btn" onclick="revealAnswer()">Show Answer</button>
      <div class="quiz-answer" id="quizAnswer">
        <code class="snippet">${item.code}</code>
        <p style="color:var(--text-dim);font-size:12px;margin-bottom:16px;">${item.desc}</p>
        <div class="quiz-btns">
          <button class="quiz-btn quiz-btn-fail" onclick="quizNext(false)">✗ Missed it</button>
          <button class="quiz-btn quiz-btn-pass" onclick="quizNext(true)">✓ Got it!</button>
        </div>
      </div>
    </div>`;
}

function revealAnswer() {
  document.getElementById('quizAnswer').classList.add('show');
  document.querySelector('.quiz-reveal-btn').style.display = 'none';
}

function quizNext(correct) {
  if (correct) quizCorrect++;
  quizIdx++;
  renderQuizCard();
}

/* ═══════════════════════════════════════════════════
   CUSTOM SNIPPETS (protected)
═══════════════════════════════════════════════════ */
async function addCustomSnippet() {
  if (!authToken) { promptLogin('Add Snippet'); return; }

  const title = document.getElementById('newTitle').value.trim();
  const tag   = document.getElementById('newTag').value;
  const code  = document.getElementById('newCode').value.trim();
  const desc  = document.getElementById('newDesc').value.trim();

  if (!title || !code) { showToast('Title and code are required', true); return; }

  const btn = document.querySelector('.submit-btn');
  btn.innerHTML = '<span class="spinner"></span>Saving...';
  btn.disabled = true;

  try {
    const res = await fetch(API_BASE + "/snippets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken
      },
      body: JSON.stringify({ title, tag, code, desc })
    });

    if (res.status === 401) { handleTokenExpired(); return; }
    if (!res.ok) throw new Error('Failed');

    const data = await res.json();
    customSnippets = Array.isArray(data) ? data : (data.snippets || []);

    document.getElementById('newTitle').value = '';
    document.getElementById('newCode').value  = '';
    document.getElementById('newDesc').value  = '';

    buildCustomSection();
    buildCards();
    updateCounts();
    showToast('✓ Snippet saved!');
  } catch (e) {
    showToast('Could not save snippet', true);
  } finally {
    btn.innerHTML = 'Save Snippet';
    btn.disabled = false;
  }
}

async function deleteCustom(id) {
  if (!authToken) return;
  try {
    const res = await fetch(API_BASE + "/snippets/" + id, {
      method: "DELETE",
      headers: { "Authorization": "Bearer " + authToken }
    });
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    customSnippets = Array.isArray(data) ? data : (data.snippets || []);
  } catch (e) {
    customSnippets = customSnippets.filter(s => s.id !== id);
  }
  buildCustomSection(); buildCards(); updateCounts();
  showToast('Snippet deleted');
}

function buildAddPanel() {
  const panelEl = document.getElementById('panel-add');
  if (!authToken) {
    panelEl.innerHTML = `<div id="addGate">${buildLoginGate('Add Snippet', '✦')}</div>`;
    return;
  }

  panelEl.innerHTML = `
    <div id="addGate"></div>
    <div class="add-form">
      <h2>Add Custom Snippet</h2>
      <p>Save your own code snippets to your account.</p>
      <div class="form-row">
        <label>Title</label>
        <input type="text" id="newTitle" placeholder="e.g. Two Pointer Template">
      </div>
      <div class="form-row">
        <label>Category</label>
        <select id="newTag" style="cursor:pointer">
          <option value="custom">Custom</option>
          <option value="basic">Basic I/O</option>
          <option value="array">Arrays</option>
          <option value="list">Lists</option>
          <option value="map">Map & Set</option>
          <option value="stack">Stack/Queue</option>
          <option value="tree">Tree</option>
          <option value="graph">Graph</option>
          <option value="sort">Sorting</option>
          <option value="string">Strings</option>
          <option value="bit">Bit Tricks</option>
          <option value="dp">DP Patterns</option>
        </select>
      </div>
      <div class="form-row">
        <label>Code</label>
        <textarea id="newCode" placeholder="Paste your Java snippet here..."></textarea>
      </div>
      <div class="form-row">
        <label>Description (one sentence)</label>
        <input type="text" id="newDesc" placeholder="What does this snippet do?">
      </div>
      <button class="submit-btn" onclick="addCustomSnippet()">Save Snippet</button>
    </div>
    <div class="custom-cards-section" id="customCardsSection"></div>`;

  buildCustomSection();
}

function buildCustomSection() {
  const el = document.getElementById('customCardsSection');
  if (!el) return;
  if (!customSnippets.length) { el.innerHTML = ''; return; }
  el.innerHTML = `
    <div class="section-title" style="margin-top:32px">Your Custom Snippets</div>
    <div class="cards">
      ${customSnippets.map(item => buildCard(item, true)).join('')}
    </div>`;
}

/* ═══════════════════════════════════════════════════
   TABS
   FIX: removed the reference to undefined `sidebarOpen` variable
        that was crashing switchTab() on mobile
═══════════════════════════════════════════════════ */
function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  const btn   = document.getElementById('tab-' + name);
  const panel = document.getElementById('panel-' + name);
  if (btn)   btn.classList.add('active');
  if (panel) panel.classList.add('active');

  // Auto-close sidebar on mobile when switching tabs
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && !sidebar.classList.contains('collapsed')) toggleSidebar();
  }

  if (name === 'quiz')       { buildQuizFilters(); startQuiz(); }
  if (name === 'favorites')  { buildFavPanel(); }
  if (name === 'complexity') { buildComplexityTable(); }
  if (name === 'add')        { buildAddPanel(); }
  if (name === 'snippets')   { buildCards(); }
  if (name === 'auth')       { buildAuthPanel(); }
}

/* ═══════════════════════════════════════════════════
   AUTH PANEL
   FIX: re-render panel fully based on current auth state
        so logout persists correctly after reload
═══════════════════════════════════════════════════ */
function buildAuthPanel() {
  const logoutSec = document.getElementById('logoutSection');
  const authForm  = document.querySelector('#panel-auth .add-form');
  if (!logoutSec || !authForm) return;

  if (authToken && currentUser) {
    document.getElementById('loggedInEmail').textContent = currentUser;
    logoutSec.style.display = 'block';
    document.getElementById('authTitle').textContent = 'Your Account';
    document.getElementById('authSubtitle').textContent = 'You are logged in.';
    // Hide login-specific elements
    authForm.querySelectorAll('.form-row').forEach(r => r.style.display = 'none');
    const authBtn = document.getElementById('authBtn');
    if (authBtn) authBtn.style.display = 'none';
    const switchP = authForm.querySelector('p:last-of-type');
    if (switchP) switchP.style.display = 'none';
  } else {
    logoutSec.style.display = 'none';
    document.getElementById('authTitle').textContent = authMode === 'login' ? 'Login' : 'Register';
    document.getElementById('authSubtitle').textContent = 'Access your personal favorites & snippets.';
    authForm.querySelectorAll('.form-row').forEach(r => r.style.display = 'block');
    const authBtn = document.getElementById('authBtn');
    if (authBtn) { authBtn.style.display = 'inline-block'; authBtn.textContent = authMode === 'login' ? 'Login' : 'Register'; }
    const switchP = authForm.querySelector('p:last-of-type');
    if (switchP) switchP.style.display = 'block';
  }
}

/* ═══════════════════════════════════════════════════
   THEME
═══════════════════════════════════════════════════ */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.dataset.theme === 'dark';
  html.dataset.theme = isDark ? 'light' : 'dark';
  document.getElementById('themeBtn').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('dsa_theme', html.dataset.theme);
}

/* ═══════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════ */
let toastTimer;
function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.toggle('error', isError);
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

/* ═══════════════════════════════════════════════════
   SEARCH
═══════════════════════════════════════════════════ */
document.getElementById('globalSearch').addEventListener('input', function() {
  searchQuery = this.value;
  if (document.getElementById('panel-snippets').classList.contains('active')) buildCards();
});

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('globalSearch').focus();
    document.getElementById('globalSearch').select();
  }
});

/* ═══════════════════════════════════════════════════
   AUTH — LOGIN / REGISTER
═══════════════════════════════════════════════════ */
function toggleAuthMode() {
  authMode = authMode === "login" ? "register" : "login";
  document.getElementById("authTitle").textContent    = authMode === "login" ? "Login" : "Register";
  document.getElementById("authBtn").textContent      = authMode === "login" ? "Login" : "Register";
  document.getElementById("authSwitchText").textContent = authMode === "login" ? "Don't have an account?" : "Already have an account?";
  document.getElementById("authSwitchLink").textContent = authMode === "login" ? "Register" : "Login";
  clearAuthMessages();
}

function clearAuthMessages() {
  const err = document.getElementById('authError');
  const suc = document.getElementById('authSuccessMsg');
  if (err) { err.textContent = ''; err.classList.remove('show'); }
  if (suc) { suc.textContent = ''; suc.classList.remove('show'); }
}

function showAuthError(msg) {
  const el = document.getElementById('authError');
  if (el) { el.textContent = msg; el.classList.add('show'); }
}

function showAuthSuccess(msg) {
  const el = document.getElementById('authSuccessMsg');
  if (el) { el.textContent = msg; el.classList.add('show'); }
}

async function handleAuth() {
  const email    = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;
  clearAuthMessages();

  if (!email || !password) { showAuthError("Email and password are required."); return; }
  if (!email.includes('@')) { showAuthError("Please enter a valid email."); return; }
  if (password.length < 4)  { showAuthError("Password must be at least 4 characters."); return; }

  const btn = document.getElementById("authBtn");
  btn.innerHTML = '<span class="spinner"></span>' + (authMode === 'login' ? 'Logging in...' : 'Registering...');
  btn.disabled = true;

  const endpoint = authMode === "login" ? "/auth/login" : "/auth/register";

  try {
    const res = await fetch(API_BASE + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      const errMsg = data.message || data.error || (res.status === 401 ? 'Invalid email or password.' : 'Something went wrong. Please try again.');
      showAuthError(errMsg);
      return;
    }

    authToken   = data.token;
    currentUser = data.email || email;

    localStorage.setItem('dsa_auth_token', authToken);
    localStorage.setItem('dsa_auth_email', currentUser);

    showAuthSuccess(authMode === 'login' ? `Welcome back, ${currentUser}!` : `Account created! Welcome, ${currentUser}!`);
    showNotif(
      authMode === 'login'
        ? `👋 Welcome back, ${currentUser}!`
        : `🎉 Account created! Welcome, ${currentUser}!`,
      'success', 5000
    );

    updateCounts();
    buildAuthPanel(); // re-render auth panel to show logged-in state
    await loadUserData();
    showToast(`✓ Welcome, ${currentUser}!`);

  } catch (e) {
    showAuthError('Network error. Please check your connection and try again.');
  } finally {
    btn.innerHTML = authMode === 'login' ? 'Login' : 'Register';
    btn.disabled = false;
  }
}

function handleTokenExpired() {
  showToast('Session expired. Please login again.', true);
  logout(false);
  switchTab('auth');
}

function logout(showMsg = true) {
  authToken   = null;
  currentUser = null;
  favorites   = [];
  customSnippets = [];

  localStorage.removeItem('dsa_auth_token');
  localStorage.removeItem('dsa_auth_email');

  authMode = 'login';

  // Reset auth tab label
  const authTab = document.getElementById('tab-auth');
  if (authTab) authTab.textContent = 'Login';

  // Reset auth panel to login form
  const logoutSec = document.getElementById('logoutSection');
  const authForm  = document.querySelector('#panel-auth .add-form');
  if (authForm) {
    authForm.querySelectorAll('.form-row').forEach(r => r.style.display = 'block');
    const authBtn = document.getElementById('authBtn');
    if (authBtn) { authBtn.style.display = 'inline-block'; authBtn.textContent = 'Login'; }
    const switchP = authForm.querySelector('p:last-of-type');
    if (switchP) switchP.style.display = 'block';
    document.getElementById('authTitle').textContent = 'Login';
    document.getElementById('authSubtitle').textContent = 'Access your personal favorites & snippets.';
    const emailEl = document.getElementById('authEmail');
    const passEl  = document.getElementById('authPassword');
    if (emailEl) emailEl.value = '';
    if (passEl)  passEl.value = '';
    clearAuthMessages();
  }
  if (logoutSec) logoutSec.style.display = 'none';

  document.getElementById('authSwitchText').textContent = "Don't have an account?";
  document.getElementById('authSwitchLink').textContent = 'Register';

  updateCounts();
  buildCards();
  buildFavPanel();

  if (showMsg) {
    showToast('Logged out successfully');
    showNotif('👋 You\'ve been logged out.', 'info', 3500);
  }
}

/* ═══════════════════════════════════════════════════
   LOAD USER DATA AFTER LOGIN
═══════════════════════════════════════════════════ */
async function loadUserData() {
  if (!authToken) return;
  try {
    const [favRes, snipRes] = await Promise.all([
      fetch(API_BASE + "/favorites",  { headers: { "Authorization": "Bearer " + authToken } }),
      fetch(API_BASE + "/snippets",   { headers: { "Authorization": "Bearer " + authToken } })
    ]);

    if (favRes.status === 401 || snipRes.status === 401) { handleTokenExpired(); return; }

    if (favRes.ok) {
      const favData = await favRes.json();
      favorites = Array.isArray(favData) ? favData : (favData.favorites || []);
    }

    if (snipRes.ok) {
      const snipData = await snipRes.json();
      customSnippets = Array.isArray(snipData) ? snipData : (snipData.snippets || []);
    }

    updateCounts();
    buildCards();
    buildCustomSection();
    buildFavPanel();

  } catch (e) {
    console.warn('Could not load user data:', e);
  }
}

/* ═══════════════════════════════════════════════════
   SHOW / HIDE PASSWORD
   FIX: new feature added
═══════════════════════════════════════════════════ */
function togglePassVis() {
  const input = document.getElementById('authPassword');
  const eye   = document.getElementById('passToggleEye');
  if (input.type === 'password') {
    input.type = 'text';
    eye.textContent = '🙈';
  } else {
    input.type = 'password';
    eye.textContent = '👁';
  }
}

/* ═══════════════════════════════════════════════════
   MOBILE SEARCH TOGGLE
═══════════════════════════════════════════════════ */
function toggleMobileSearch() {
  const search = document.querySelector('.topbar-search');
  const btn = document.getElementById('searchToggleBtn');
  const isOpen = search.classList.toggle('mobile-open');
  btn.classList.toggle('active', isOpen);
  if (isOpen) document.getElementById('globalSearch').focus();
}

/* ═══════════════════════════════════════════════════
   INIT
   FIX: call buildAuthPanel() on load so logout state
        is correctly reflected after a page reload
═══════════════════════════════════════════════════ */
(async function init() {
  const savedTheme = localStorage.getItem('dsa_theme') || 'dark';
  document.documentElement.dataset.theme = savedTheme;
  document.getElementById('themeBtn').textContent = savedTheme === 'dark' ? '🌙' : '☀️';

  // Start sidebar as open on desktop, closed on mobile
  sidebarOpen = window.innerWidth > 768;
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('menuToggleBtn');
  if (!sidebarOpen) {
    sidebar.classList.add('collapsed');
    menuBtn.classList.remove('active');
  }

  buildFilterChips();
  buildCards();
  updateCounts();

  // Restore auth UI state on reload
  if (authToken && currentUser) {
    buildAuthPanel(); // show logged-in state in auth panel
    await loadUserData();
    showNotif(`👋 Welcome back, ${currentUser}!`, 'info', 4000);
  }
})();