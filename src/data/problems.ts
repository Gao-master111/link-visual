// 链表节点数据类型
export interface ListNodeData {
  addr: string
  data: number
  nextAddr: string | null
  randomAddr?: string | null
  x: number
  y: number
}

// 指针数据类型
export interface PointerData {
  name: string
  targetAddr: string | null
  color: string
  offsetY: number
}

// 单步快照
export interface StepSnapshot {
  nodes: ListNodeData[]
  pointers: PointerData[]
  codeLine: number
  desc: string
  delNode?: string | null // 被删除节点地址
}

// 题目数据类型
export interface Problem {
  id: number
  title: string
  leetCodeId: string
  difficulty: '简单' | '中等' | '困难'
  description: string
  code: string[]
  codeExplanations?: string[]
  initialNodes: ListNodeData[]
  steps: StepSnapshot[]
}

// 统一配置常量
const TOP_Y = 100     // 上方原链表Y坐标
const BOTTOM_Y = 340  // 下方对比链表Y坐标
const START_X = 80
const GAP = 200

// ========== 题库列表 ==========
export const problems: Problem[] = [
  // 1. 链表遍历
  {
    id: 1,
    title: '链表遍历',
    leetCodeId: '基础操作',
    difficulty: '简单',
    description: '使用temp指针从头遍历整个链表，理解 temp = temp.next 的执行过程。',
    code: [
      'ListNode temp = head;',
      'while (temp != null) {',
      '    // 处理当前节点',
      '    temp = temp.next;',
      '}'
    ],
    initialNodes: [
      { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
      { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
      { addr: '3024', data: 30, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 100 }
    ],
    steps: [
      {
        nodes: [
          { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '3024', data: 30, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1024', color: '#3f51b5', offsetY: 60 },
          { name: 'temp', targetAddr: '1024', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 0,
        desc: '初始化 temp = head，temp指向第一个节点'
      },
      {
        nodes: [
          { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '3024', data: 30, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1024', color: '#3f51b5', offsetY: 60 },
          { name: 'temp', targetAddr: '2024', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 3,
        desc: '执行 temp = temp.next，temp移动到第二个节点'
      },
      {
        nodes: [
          { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '3024', data: 30, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1024', color: '#3f51b5', offsetY: 60 },
          { name: 'temp', targetAddr: '3024', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 3,
        desc: '再次执行 temp = temp.next，temp移动到第三个节点'
      }
    ]
  },

  // 2. 反转链表 LeetCode206
  {
    id: 2,
    title: '反转链表',
    leetCodeId: '206',
    difficulty: '简单',
    description: '经典题：反转一个单链表，上方为原链表，下方为逐步构建的反转链表。',
    code: [
      'ListNode pre = null;',
      'ListNode cur = head;',
      'while (cur != null) {',
      '    ListNode next = cur.next;',
      '    cur.next = pre;',
      '    pre = cur;',
      '    cur = next;',
      '}',
      'return pre;'
    ],
    initialNodes: [
      { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y },
      { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP, y: TOP_Y },
      { addr: '3024', data: 30, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y }
    ],
    steps: [
      {
        nodes: [
          { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP, y: TOP_Y },
          { addr: '3024', data: 30, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y }
        ],
        pointers: [
          { name: 'head', targetAddr: '1024', color: '#3f51b5', offsetY: 60 },
          { name: 'pre', targetAddr: null, color: '#4caf50', offsetY: -60 },
          { name: 'cur', targetAddr: '1024', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 1,
        desc: '初始化：pre = null，cur 指向原链表头节点'
      },
      {
        nodes: [
          { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP, y: TOP_Y },
          { addr: '3024', data: 30, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y }
        ],
        pointers: [
          { name: 'head', targetAddr: '1024', color: '#3f51b5', offsetY: 60 },
          { name: 'pre', targetAddr: null, color: '#4caf50', offsetY: -60 },
          { name: 'cur', targetAddr: '1024', color: '#ff9800', offsetY: -20 },
          { name: 'next', targetAddr: '2024', color: '#e91e63', offsetY: 60 }
        ],
        codeLine: 3,
        desc: '第1轮：保存后继节点 next = cur.next'
      },
      {
        nodes: [
          { addr: '1024', data: 10, nextAddr: null, x: START_X, y: TOP_Y },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP, y: TOP_Y },
          { addr: '3024', data: 30, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y }
        ],
        pointers: [
          { name: 'head', targetAddr: '1024', color: '#3f51b5', offsetY: 60 },
          { name: 'pre', targetAddr: null, color: '#4caf50', offsetY: -60 },
          { name: 'cur', targetAddr: '1024', color: '#ff9800', offsetY: -20 },
          { name: 'next', targetAddr: '2024', color: '#e91e63', offsetY: 60 }
        ],
        codeLine: 4,
        desc: '反转指针：cur.next = pre，第一个节点指向 null'
      },
      {
        nodes: [
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X, y: TOP_Y },
          { addr: '3024', data: 30, nextAddr: null, x: START_X + GAP, y: TOP_Y },
          { addr: '1024', data: 10, nextAddr: null, x: START_X + GAP * 2, y: BOTTOM_Y }
        ],
        pointers: [
          { name: 'head', targetAddr: '2024', color: '#3f51b5', offsetY: 60 },
          { name: 'pre', targetAddr: '1024', color: '#4caf50', offsetY: 60 },
          { name: 'cur', targetAddr: '2024', color: '#ff9800', offsetY: -20 },
          { name: 'next', targetAddr: '3024', color: '#e91e63', offsetY: 60 }
        ],
        codeLine: 5,
        desc: '指针后移：pre = cur，cur = next，第一个节点移入反转链表'
      },
      {
        nodes: [
          { addr: '2024', data: 20, nextAddr: '1024', x: START_X, y: TOP_Y },
          { addr: '3024', data: 30, nextAddr: null, x: START_X + GAP, y: TOP_Y },
          { addr: '1024', data: 10, nextAddr: null, x: START_X + GAP * 2, y: BOTTOM_Y }
        ],
        pointers: [
          { name: 'head', targetAddr: '2024', color: '#3f51b5', offsetY: 60 },
          { name: 'pre', targetAddr: '1024', color: '#4caf50', offsetY: 60 },
          { name: 'cur', targetAddr: '2024', color: '#ff9800', offsetY: -20 },
          { name: 'next', targetAddr: '3024', color: '#e91e63', offsetY: 60 }
        ],
        codeLine: 4,
        desc: '第2轮：反转指针 cur.next = pre'
      },
      {
        nodes: [
          { addr: '3024', data: 30, nextAddr: null, x: START_X, y: TOP_Y },
          { addr: '2024', data: 20, nextAddr: '1024', x: START_X + GAP, y: BOTTOM_Y },
          { addr: '1024', data: 10, nextAddr: null, x: START_X + GAP * 2, y: BOTTOM_Y }
        ],
        pointers: [
          { name: 'head', targetAddr: '3024', color: '#3f51b5', offsetY: 60 },
          { name: 'pre', targetAddr: '2024', color: '#4caf50', offsetY: 60 },
          { name: 'cur', targetAddr: '3024', color: '#ff9800', offsetY: -20 },
          { name: 'next', targetAddr: null, color: '#e91e63', offsetY: 60 }
        ],
        codeLine: 5,
        desc: '指针后移：第二个节点移入反转链表头部'
      },
      {
        nodes: [
          { addr: '3024', data: 30, nextAddr: '2024', x: START_X, y: TOP_Y },
          { addr: '2024', data: 20, nextAddr: '1024', x: START_X + GAP, y: BOTTOM_Y },
          { addr: '1024', data: 10, nextAddr: null, x: START_X + GAP * 2, y: BOTTOM_Y }
        ],
        pointers: [
          { name: 'head', targetAddr: '3024', color: '#3f51b5', offsetY: 60 },
          { name: 'pre', targetAddr: '2024', color: '#4caf50', offsetY: 60 },
          { name: 'cur', targetAddr: '3024', color: '#ff9800', offsetY: -20 },
          { name: 'next', targetAddr: null, color: '#e91e63', offsetY: 60 }
        ],
        codeLine: 4,
        desc: '第3轮：反转指针 cur.next = pre'
      },
      {
        nodes: [
          { addr: '3024', data: 30, nextAddr: '2024', x: START_X, y: BOTTOM_Y },
          { addr: '2024', data: 20, nextAddr: '1024', x: START_X + GAP, y: BOTTOM_Y },
          { addr: '1024', data: 10, nextAddr: null, x: START_X + GAP * 2, y: BOTTOM_Y }
        ],
        pointers: [
          { name: 'pre', targetAddr: '3024', color: '#4caf50', offsetY: 60 },
          { name: 'cur', targetAddr: null, color: '#ff9800', offsetY: -20 },
          { name: 'next', targetAddr: null, color: '#e91e63', offsetY: 60 }
        ],
        codeLine: 6,
        desc: '指针后移：cur = null，循环结束'
      },
      {
        nodes: [
          { addr: '3024', data: 30, nextAddr: '2024', x: START_X, y: BOTTOM_Y },
          { addr: '2024', data: 20, nextAddr: '1024', x: START_X + GAP, y: BOTTOM_Y },
          { addr: '1024', data: 10, nextAddr: null, x: START_X + GAP * 2, y: BOTTOM_Y }
        ],
        pointers: [
          { name: 'pre(新头)', targetAddr: '3024', color: '#4caf50', offsetY: 60 }
        ],
        codeLine: 8,
        desc: '反转完成：pre 指向新链表的头节点，返回 pre 即可'
      }
    ]
  },

  // 3. 删除指定节点 LeetCode237
  {
    id: 3,
    title: '删除指定节点',
    leetCodeId: '237',
    difficulty: '简单',
    description: '只给定要删除的节点指针，不访问head，删除该节点。',
    code: [
      'public void deleteNode(ListNode node) {',
      '    node.val = node.next.val;',
      '    node.next = node.next.next;',
      '}'
    ],
    initialNodes: [
      { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
      { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
      { addr: '3024', data: 30, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 100 }
    ],
    steps: [
      {
        nodes: [
          { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '3024', data: 30, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1024', color: '#3f51b5', offsetY: 60 },
          { name: 'node', targetAddr: '2024', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 0,
        desc: '给定要删除的节点（值为20的节点）'
      },
      {
        nodes: [
          { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
          { addr: '2024', data: 30, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '3024', data: 30, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1024', color: '#3f51b5', offsetY: 60 },
          { name: 'node', targetAddr: '2024', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 1,
        desc: '第一步：把下一个节点的值复制到当前节点'
      },
      {
        nodes: [
          { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
          { addr: '2024', data: 30, nextAddr: null, x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '3024', data: 30, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1024', color: '#3f51b5', offsetY: 60 },
          { name: 'node', targetAddr: '2024', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 2,
        desc: '第二步：跳过下一个节点，完成删除'
      }
    ]
  },

  // 4. 环形链表 LeetCode141
  {
    id: 4,
    title: '环形链表',
    leetCodeId: '141',
    difficulty: '简单',
    description: '使用快慢指针判断链表是否有环，快指针每次走2步，慢指针每次走1步。',
    code: [
      'public boolean hasCycle(ListNode head) {',
      '    ListNode slow = head;',
      '    ListNode fast = head;',
      '    while (fast != null && fast.next != null) {',
      '        slow = slow.next;',
      '        fast = fast.next.next;',
      '        if (slow == fast) return true;',
      '    }',
      '    return false;',
      '}'
    ],
    initialNodes: [
      { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
      { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
      { addr: '3024', data: 30, nextAddr: '4024', x: START_X + GAP * 2, y: TOP_Y + 100 },
      { addr: '4024', data: 40, nextAddr: '2024', x: START_X + GAP * 3, y: TOP_Y + 100 }
    ],
    steps: [
      {
        nodes: [
          { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '3024', data: 30, nextAddr: '4024', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '4024', data: 40, nextAddr: '2024', x: START_X + GAP * 3, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1024', color: '#3f51b5', offsetY: 60 },
          { name: 'slow', targetAddr: '1024', color: '#4caf50', offsetY: -20 },
          { name: 'fast', targetAddr: '1024', color: '#e91e63', offsetY: -70 }
        ],
        codeLine: 2,
        desc: '初始化：快慢指针都指向头节点，尾部指回第二个节点形成环'
      },
      {
        nodes: [
          { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '3024', data: 30, nextAddr: '4024', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '4024', data: 40, nextAddr: '2024', x: START_X + GAP * 3, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1024', color: '#3f51b5', offsetY: 60 },
          { name: 'slow', targetAddr: '2024', color: '#4caf50', offsetY: -20 },
          { name: 'fast', targetAddr: '3024', color: '#e91e63', offsetY: -70 }
        ],
        codeLine: 4,
        desc: '第1轮：slow走1步，fast走2步'
      },
      {
        nodes: [
          { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '3024', data: 30, nextAddr: '4024', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '4024', data: 40, nextAddr: '2024', x: START_X + GAP * 3, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1024', color: '#3f51b5', offsetY: 60 },
          { name: 'slow', targetAddr: '3024', color: '#4caf50', offsetY: -20 },
          { name: 'fast', targetAddr: '2024', color: '#e91e63', offsetY: -70 }
        ],
        codeLine: 4,
        desc: '第2轮：slow走1步，fast绕环走2步'
      },
      {
        nodes: [
          { addr: '1024', data: 10, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '3024', data: 30, nextAddr: '4024', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '4024', data: 40, nextAddr: '2024', x: START_X + GAP * 3, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1024', color: '#3f51b5', offsetY: 60 },
          { name: 'slow', targetAddr: '4024', color: '#4caf50', offsetY: -20 },
          { name: 'fast', targetAddr: '4024', color: '#e91e63', offsetY: -70 }
        ],
        codeLine: 6,
        desc: '第3轮：快慢指针相遇，证明链表有环'
      }
    ]
  },

  // 5. 移除链表元素 LeetCode203
  {
    id: 5,
    title: '移除链表元素',
    leetCodeId: '203',
    difficulty: '简单',
    description: '删除链表中所有等于给定值的节点，使用虚拟头结点简化边界处理，上方原链表，下方结果链表。',
    code: [
      'ListNode dummy = new ListNode(0);',
      'dummy.next = head;',
      'ListNode cur = dummy;',
      'while (cur.next != null) {',
      '    if (cur.next.val == val) {',
      '        cur.next = cur.next.next;',
      '    } else {',
      '        cur = cur.next;',
      '    }',
      '}',
      'return dummy.next;'
    ],
    initialNodes: [
      { addr: '1024', data: 10, nextAddr: '2024', x: START_X + GAP, y: TOP_Y },
      { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP * 2, y: TOP_Y },
      { addr: '3024', data: 20, nextAddr: '4024', x: START_X + GAP * 3, y: TOP_Y },
      { addr: '4024', data: 30, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y }
    ],
    steps: [
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: null, x: START_X, y: BOTTOM_Y },
          { addr: '1024', data: 10, nextAddr: '2024', x: START_X + GAP, y: TOP_Y },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP * 2, y: TOP_Y },
          { addr: '3024', data: 20, nextAddr: '4024', x: START_X + GAP * 3, y: TOP_Y },
          { addr: '4024', data: 30, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'cur', targetAddr: '0000', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 2,
        desc: '初始化：创建虚拟头结点 dummy，cur 指向 dummy'
      },
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1024', x: START_X, y: BOTTOM_Y },
          { addr: '1024', data: 10, nextAddr: null, x: START_X + GAP, y: BOTTOM_Y },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP * 2, y: TOP_Y },
          { addr: '3024', data: 20, nextAddr: '4024', x: START_X + GAP * 3, y: TOP_Y },
          { addr: '4024', data: 30, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'cur', targetAddr: '1024', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 7,
        desc: '第一个节点值不等于目标值20，接入结果链表，cur后移'
      },
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1024', x: START_X, y: BOTTOM_Y },
          { addr: '1024', data: 10, nextAddr: null, x: START_X + GAP, y: BOTTOM_Y },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP * 2, y: TOP_Y },
          { addr: '3024', data: 20, nextAddr: '4024', x: START_X + GAP * 3, y: TOP_Y },
          { addr: '4024', data: 30, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'cur', targetAddr: '1024', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 5,
        desc: '下一个节点值等于20，直接跳过不接入结果链表'
      },
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1024', x: START_X, y: BOTTOM_Y },
          { addr: '1024', data: 10, nextAddr: null, x: START_X + GAP, y: BOTTOM_Y },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP * 2, y: TOP_Y },
          { addr: '3024', data: 20, nextAddr: '4024', x: START_X + GAP * 3, y: TOP_Y },
          { addr: '4024', data: 30, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'cur', targetAddr: '1024', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 5,
        desc: '再次遇到值为20的节点，继续跳过'
      },
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1024', x: START_X, y: BOTTOM_Y },
          { addr: '1024', data: 10, nextAddr: '4024', x: START_X + GAP, y: BOTTOM_Y },
          { addr: '4024', data: 30, nextAddr: null, x: START_X + GAP * 2, y: BOTTOM_Y },
          { addr: '2024', data: 20, nextAddr: '3024', x: START_X + GAP * 3, y: TOP_Y },
          { addr: '3024', data: 20, nextAddr: '4024', x: START_X + GAP * 4, y: TOP_Y }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'cur', targetAddr: '4024', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 9,
        desc: '遍历完成，最终结果链表只保留10、30，返回dummy.next'
      }
    ]
  },

  // 6. LeetCode21 合并两个有序链表
  {
    id: 6,
    title: '合并两个有序链表',
    leetCodeId: '21',
    difficulty: '简单',
    description: '合并两个升序链表为一个新有序链表，上方两条原始链表，下方合并结果链表。',
    code: [
      'ListNode dummy = new ListNode(-1);',
      'ListNode cur = dummy;',
      'while (l1 != null && l2 != null) {',
      '    if (l1.val < l2.val) {',
      '        cur.next = l1;',
      '        l1 = l1.next;',
      '    } else {',
      '        cur.next = l2;',
      '        l2 = l2.next;',
      '    }',
      '    cur = cur.next;',
      '}',
      'cur.next = l1 == null ? l2 : l1;',
      'return dummy.next;'
    ],
    initialNodes: [
      { addr: '1000', data: 1, nextAddr: '1001', x: START_X, y: TOP_Y },
      { addr: '1001', data: 3, nextAddr: '1002', x: START_X + GAP, y: TOP_Y },
      { addr: '1002', data: 5, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y },
      { addr: '2000', data: 2, nextAddr: '2001', x: START_X, y: TOP_Y + 120 },
      { addr: '2001', data: 4, nextAddr: '2002', x: START_X + GAP, y: TOP_Y + 120 },
      { addr: '2002', data: 6, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 120 }
    ],
    steps: [
      {
        nodes: [
          { addr: '0000', data: -1, nextAddr: null, x: START_X, y: BOTTOM_Y },
          { addr: '1000', data: 1, nextAddr: '1001', x: START_X, y: TOP_Y },
          { addr: '1001', data: 3, nextAddr: '1002', x: START_X + GAP, y: TOP_Y },
          { addr: '1002', data: 5, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y },
          { addr: '2000', data: 2, nextAddr: '2001', x: START_X, y: TOP_Y + 120 },
          { addr: '2001', data: 4, nextAddr: '2002', x: START_X + GAP, y: TOP_Y + 120 },
          { addr: '2002', data: 6, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 120 }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'cur', targetAddr: '0000', color: '#ff9800', offsetY: -20 },
          { name: 'l1', targetAddr: '1000', color: '#3f51b5', offsetY: 60 },
          { name: 'l2', targetAddr: '2000', color: '#4caf50', offsetY: 60 }
        ],
        codeLine: 1,
        desc: '初始化虚拟头结点dummy，l1、l2分别指向两条链表头部'
      },
      {
        nodes: [
          { addr: '0000', data: -1, nextAddr: '1000', x: START_X, y: BOTTOM_Y },
          { addr: '1000', data: 1, nextAddr: '1001', x: START_X, y: TOP_Y },
          { addr: '1001', data: 3, nextAddr: '1002', x: START_X + GAP, y: TOP_Y },
          { addr: '1002', data: 5, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y },
          { addr: '2000', data: 2, nextAddr: '2001', x: START_X, y: TOP_Y + 120 },
          { addr: '2001', data: 4, nextAddr: '2002', x: START_X + GAP, y: TOP_Y + 120 },
          { addr: '2002', data: 6, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 120 }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'cur', targetAddr: '1000', color: '#ff9800', offsetY: -20 },
          { name: 'l1', targetAddr: '1001', color: '#3f51b5', offsetY: 60 },
          { name: 'l2', targetAddr: '2000', color: '#4caf50', offsetY: 60 }
        ],
        codeLine: 4,
        desc: 'l1.val=1 < l2.val=2，将l1接入结果，l1后移'
      },
      {
        nodes: [
          { addr: '0000', data: -1, nextAddr: '1000', x: START_X, y: BOTTOM_Y },
          { addr: '1000', data: 1, nextAddr: '2000', x: START_X + GAP, y: BOTTOM_Y },
          { addr: '1001', data: 3, nextAddr: '1002', x: START_X + GAP, y: TOP_Y },
          { addr: '1002', data: 5, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y },
          { addr: '2000', data: 2, nextAddr: '2001', x: START_X, y: TOP_Y + 120 },
          { addr: '2001', data: 4, nextAddr: '2002', x: START_X + GAP, y: TOP_Y + 120 },
          { addr: '2002', data: 6, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 120 }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'cur', targetAddr: '2000', color: '#ff9800', offsetY: -20 },
          { name: 'l1', targetAddr: '1001', color: '#3f51b5', offsetY: 60 },
          { name: 'l2', targetAddr: '2001', color: '#4caf50', offsetY: 60 }
        ],
        codeLine: 7,
        desc: 'l2.val=2 < l1.val=3，将l2接入结果，l2后移'
      },
      {
        nodes: [
          { addr: '0000', data: -1, nextAddr: '1000', x: START_X, y: BOTTOM_Y },
          { addr: '1000', data: 1, nextAddr: '2000', x: START_X, y: BOTTOM_Y },
          { addr: '2000', data: 2, nextAddr: '1001', x: START_X + GAP * 2, y: BOTTOM_Y },
          { addr: '1001', data: 3, nextAddr: '1002', x: START_X + GAP, y: TOP_Y },
          { addr: '1002', data: 5, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y },
          { addr: '2001', data: 4, nextAddr: '2002', x: START_X + GAP, y: TOP_Y + 120 },
          { addr: '2002', data: 6, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 120 }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'cur', targetAddr: '1001', color: '#ff9800', offsetY: -20 },
          { name: 'l1', targetAddr: '1002', color: '#3f51b5', offsetY: 60 },
          { name: 'l2', targetAddr: '2001', color: '#4caf50', offsetY: 60 }
        ],
        codeLine: 4,
        desc: 'l1.val=3 < l2.val=4，接入l1，l1后移'
      },
      {
        nodes: [
          { addr: '0000', data: -1, nextAddr: '1000', x: START_X, y: BOTTOM_Y },
          { addr: '1000', data: 1, nextAddr: '2000', x: START_X, y: BOTTOM_Y },
          { addr: '2000', data: 2, nextAddr: '1001', x: START_X + GAP, y: BOTTOM_Y },
          { addr: '1001', data: 3, nextAddr: '2001', x: START_X + GAP * 2, y: BOTTOM_Y },
          { addr: '1002', data: 5, nextAddr: null, x: START_X + GAP, y: TOP_Y },
          { addr: '2001', data: 4, nextAddr: '2002', x: START_X + GAP, y: TOP_Y + 120 },
          { addr: '2002', data: 6, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 120 }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'cur', targetAddr: '2001', color: '#ff9800', offsetY: -20 },
          { name: 'l1', targetAddr: '1002', color: '#3f51b5', offsetY: 60 },
          { name: 'l2', targetAddr: '2002', color: '#4caf50', offsetY: 60 }
        ],
        codeLine: 7,
        desc: 'l2.val=4 < l1.val=5，接入l2，l2后移'
      },
      {
        nodes: [
          { addr: '0000', data: -1, nextAddr: '1000', x: START_X, y: BOTTOM_Y },
          { addr: '1000', data: 1, nextAddr: '2000', x: START_X, y: BOTTOM_Y },
          { addr: '2000', data: 2, nextAddr: '1001', x: START_X + GAP, y: BOTTOM_Y },
          { addr: '1001', data: 3, nextAddr: '2001', x: START_X + GAP * 2, y: BOTTOM_Y },
          { addr: '2001', data: 4, nextAddr: '1002', x: START_X + GAP * 3, y: BOTTOM_Y },
          { addr: '1002', data: 5, nextAddr: null, x: START_X + GAP, y: TOP_Y },
          { addr: '2002', data: 6, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 120 }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'cur', targetAddr: '1002', color: '#ff9800', offsetY: -20 },
          { name: 'l1', targetAddr: null, color: '#3f51b5', offsetY: 60 },
          { name: 'l2', targetAddr: '2002', color: '#4caf50', offsetY: 60 }
        ],
        codeLine: 4,
        desc: 'l1.val=5 < l2.val=6，接入l1，l1变为null，循环结束'
      },
      {
        nodes: [
          { addr: '0000', data: -1, nextAddr: '1000', x: START_X, y: BOTTOM_Y },
          { addr: '1000', data: 1, nextAddr: '2000', x: START_X, y: BOTTOM_Y },
          { addr: '2000', data: 2, nextAddr: '1001', x: START_X + GAP, y: BOTTOM_Y },
          { addr: '1001', data: 3, nextAddr: '2001', x: START_X + GAP * 2, y: BOTTOM_Y },
          { addr: '2001', data: 4, nextAddr: '1002', x: START_X + GAP * 3, y: BOTTOM_Y },
          { addr: '1002', data: 5, nextAddr: '2002', x: START_X + GAP * 4, y: BOTTOM_Y },
          { addr: '2002', data: 6, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 120 }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'cur', targetAddr: '2002', color: '#ff9800', offsetY: -20 },
          { name: 'l2', targetAddr: null, color: '#4caf50', offsetY: 60 }
        ],
        codeLine: 10,
        desc: 'l1为空，直接拼接剩余l2节点6，合并完成，返回dummy.next'
      }
    ]
  },

  // 7. LeetCode19 删除链表倒数第N个节点
  {
    id: 7,
    title: '删除链表倒数第N个结点',
    leetCodeId: '19',
    difficulty: '中等',
    description: '快慢指针 + 虚拟头结点，一趟遍历删除倒数第n个节点，示例删除倒数第2个（值为3）。',
    code: [
      'ListNode dummy = new ListNode(0);',
      'dummy.next = head;',
      'ListNode fast = dummy;',
      'ListNode slow = dummy;',
      'for(int i=0;i<n;i++) fast = fast.next;',
      'while(fast != null) {',
      '    fast = fast.next;',
      '    slow = slow.next;',
      '}',
      'slow.next = slow.next.next;',
      'return dummy.next;'
    ],
    initialNodes: [
      { addr: '1024', data: 1, nextAddr: '2024', x: START_X + GAP, y: TOP_Y },
      { addr: '2024', data: 2, nextAddr: '3024', x: START_X + GAP * 2, y: TOP_Y },
      { addr: '3024', data: 3, nextAddr: '4024', x: START_X + GAP * 3, y: TOP_Y },
      { addr: '4024', data: 4, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y }
    ],
    steps: [
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1024', x: START_X, y: BOTTOM_Y },
          { addr: '1024', data: 1, nextAddr: '2024', x: START_X + GAP, y: TOP_Y },
          { addr: '2024', data: 2, nextAddr: '3024', x: START_X + GAP * 2, y: TOP_Y },
          { addr: '3024', data: 3, nextAddr: '4024', x: START_X + GAP * 3, y: TOP_Y },
          { addr: '4024', data: 4, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'fast', targetAddr: '0000', color: '#e91e63', offsetY: -70 },
          { name: 'slow', targetAddr: '0000', color: '#4caf50', offsetY: -20 }
        ],
        codeLine: 3,
        desc: '初始化dummy、fast、slow都指向虚拟头结点，n=2'
      },
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1024', x: START_X, y: BOTTOM_Y },
          { addr: '1024', data: 1, nextAddr: '2024', x: START_X + GAP, y: TOP_Y },
          { addr: '2024', data: 2, nextAddr: '3024', x: START_X + GAP * 2, y: TOP_Y },
          { addr: '3024', data: 3, nextAddr: '4024', x: START_X + GAP * 3, y: TOP_Y },
          { addr: '4024', data: 4, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'fast', targetAddr: '2024', color: '#e91e63', offsetY: -70 },
          { name: 'slow', targetAddr: '0000', color: '#4caf50', offsetY: -20 }
        ],
        codeLine: 4,
        desc: '快指针先走n=2步，到达节点2'
      },
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1024', x: START_X, y: BOTTOM_Y },
          { addr: '1024', data: 1, nextAddr: '2024', x: START_X + GAP, y: TOP_Y },
          { addr: '2024', data: 2, nextAddr: '3024', x: START_X + GAP * 2, y: TOP_Y },
          { addr: '3024', data: 3, nextAddr: '4024', x: START_X + GAP * 3, y: TOP_Y },
          { addr: '4024', data: 4, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'fast', targetAddr: null, color: '#e91e63', offsetY: -70 },
          { name: 'slow', targetAddr: '2024', color: '#4caf50', offsetY: -20 }
        ],
        codeLine: 6,
        desc: '快慢指针同步后移，fast走到null停止，slow停在待删节点前一位'
      },
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1024', x: START_X, y: BOTTOM_Y },
          { addr: '1024', data: 1, nextAddr: '2024', x: START_X + GAP, y: TOP_Y },
          { addr: '2024', data: 2, nextAddr: '4024', x: START_X + GAP * 2, y: TOP_Y },
          { addr: '3024', data: 3, nextAddr: '4024', x: START_X + GAP * 3, y: TOP_Y },
          { addr: '4024', data: 4, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'slow', targetAddr: '2024', color: '#4caf50', offsetY: -20 }
        ],
        codeLine: 9,
        desc: 'slow.next = slow.next.next，跳过倒数第2个节点3，删除完成'
      }
    ]
  },

 // 8. LeetCode160 相交链表
{
  id: 8,
  title: '相交链表',
  leetCodeId: '160',
  difficulty: '简单',
  description: '双指针循环遍历，找到两条链表第一个公共相交节点，下方为相交公共段。',
  code: [
    'public ListNode getIntersectionNode(ListNode headA, ListNode headB) {',
    '    ListNode pA = headA, pB = headB;',
    '    while(pA != pB) {',
    '        pA = pA == null ? headB : pA.next;',
    '        pB = pB == null ? headA : pB.next;',
    '    }',
    '    return pA;',
    '}'
  ],
  initialNodes: [
    { addr: 'A1', data: 1, nextAddr: 'A2', x: START_X + GAP, y: TOP_Y },
    { addr: 'A2', data: 2, nextAddr: 'C1', x: START_X + GAP*2, y: TOP_Y },
    { addr: 'C1', data: 8, nextAddr: 'C2', x: START_X + GAP*3, y: TOP_Y },
    { addr: 'C2', data: 10, nextAddr: null, x: START_X + GAP*4, y: TOP_Y },
    { addr: 'B1', data: 3, nextAddr: 'C1', x: START_X + GAP, y: TOP_Y + 120 }
  ],
  steps: [
    {
      nodes: [
        { addr: 'A1', data: 1, nextAddr: 'A2', x: START_X + GAP, y: TOP_Y },
        { addr: 'A2', data: 2, nextAddr: 'C1', x: START_X + GAP*2, y: TOP_Y },
        { addr: 'C1', data: 8, nextAddr: 'C2', x: START_X + GAP*3, y: TOP_Y },
        { addr: 'C2', data: 10, nextAddr: null, x: START_X + GAP*4, y: TOP_Y },
        { addr: 'B1', data: 3, nextAddr: 'C1', x: START_X + GAP, y: TOP_Y + 120 }
      ],
      pointers: [
        { name: 'pA', targetAddr: 'A1', color: '#3f51b5', offsetY: -30 },
        { name: 'pB', targetAddr: 'B1', color: '#4caf50', offsetY: 60 }
      ],
      codeLine: 1,
      desc: 'pA、pB分别指向两条链表头部，公共相交节点C1'
    },
    {
      nodes: [
        { addr: 'A1', data: 1, nextAddr: 'A2', x: START_X + GAP, y: TOP_Y },
        { addr: 'A2', data: 2, nextAddr: 'C1', x: START_X + GAP*2, y: TOP_Y },
        { addr: 'C1', data: 8, nextAddr: 'C2', x: START_X + GAP*3, y: TOP_Y },
        { addr: 'C2', data: 10, nextAddr: null, x: START_X + GAP*4, y: TOP_Y },
        { addr: 'B1', data: 3, nextAddr: 'C1', x: START_X + GAP, y: TOP_Y + 120 }
      ],
      pointers: [
        { name: 'pA', targetAddr: 'C1', color: '#3f51b5', offsetY: -30 },
        { name: 'pB', targetAddr: null, color: '#4caf50', offsetY: 60 }
      ],
      codeLine: 3,
      desc: 'pB走到链表末尾null，切换到A链表头部继续走'
    },
    {
      nodes: [
        { addr: 'A1', data: 1, nextAddr: 'A2', x: START_X + GAP, y: TOP_Y },
        { addr: 'A2', data: 2, nextAddr: 'C1', x: START_X + GAP*2, y: TOP_Y },
        { addr: 'C1', data: 8, nextAddr: 'C2', x: START_X + GAP*3, y: TOP_Y },
        { addr: 'C2', data: 10, nextAddr: null, x: START_X + GAP*4, y: TOP_Y },
        { addr: 'B1', data: 3, nextAddr: 'C1', x: START_X + GAP, y: TOP_Y + 120 }
      ],
      pointers: [
        { name: 'pA', targetAddr: 'C1', color: '#3f51b5', offsetY: -30 },
        { name: 'pB', targetAddr: 'C1', color: '#4caf50', offsetY: 65 }
      ],
      codeLine: 5,
      desc: '两指针相遇在C1，找到相交节点，循环结束返回该节点'
    }
  ]
},

  // 9. 剑指Offer22 链表中环的入口节点
  {
    id: 9,
    title: '链表中环的入口节点',
    leetCodeId: '剑指Offer22',
    difficulty: '中等',
    description: '快慢指针先找相遇点，再双指针同步前进找到环入口节点。',
    code: [
      'ListNode slow = head, fast = head;',
      'do {',
      '    slow = slow.next;',
      '    fast = fast.next.next;',
      '} while(slow != fast);',
      'ListNode p = head;',
      'while(p != slow) {',
      '    p = p.next;',
      '    slow = slow.next;',
      '}',
      'return p;'
    ],
    initialNodes: [
      { addr: '1024', data: 1, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
      { addr: '2024', data: 2, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
      { addr: '3024', data: 3, nextAddr: '4024', x: START_X + GAP * 2, y: TOP_Y + 100 },
      { addr: '4024', data: 4, nextAddr: '2024', x: START_X + GAP * 3, y: TOP_Y + 100 }
    ],
    steps: [
      {
        nodes: [
          { addr: '1024', data: 1, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
          { addr: '2024', data: 2, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '3024', data: 3, nextAddr: '4024', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '4024', data: 4, nextAddr: '2024', x: START_X + GAP * 3, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1024', color: '#3f51b5', offsetY: 60 },
          { name: 'slow', targetAddr: '1024', color: '#4caf50', offsetY: -20 },
          { name: 'fast', targetAddr: '1024', color: '#e91e63', offsetY: -70 }
        ],
        codeLine: 0,
        desc: '快慢指针初始化，链表尾部指向2024形成环，环入口为2024'
      },
      {
        nodes: [
          { addr: '1024', data: 1, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
          { addr: '2024', data: 2, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '3024', data: 3, nextAddr: '4024', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '4024', data: 4, nextAddr: '2024', x: START_X + GAP * 3, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1024', color: '#3f51b5', offsetY: 60 },
          { name: 'slow', targetAddr: '3024', color: '#4caf50', offsetY: -20 },
          { name: 'fast', targetAddr: '4024', color: '#e91e63', offsetY: -70 }
        ],
        codeLine: 2,
        desc: '快慢指针第一次相遇在4024节点'
      },
      {
        nodes: [
          { addr: '1024', data: 1, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
          { addr: '2024', data: 2, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '3024', data: 3, nextAddr: '4024', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '4024', data: 4, nextAddr: '2024', x: START_X + GAP * 3, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'p', targetAddr: '1024', color: '#ff9800', offsetY: 60 },
          { name: 'slow', targetAddr: '4024', color: '#4caf50', offsetY: -20 }
        ],
        codeLine: 4,
        desc: '新建指针p指向头节点，slow停留在相遇点'
      },
      {
        nodes: [
          { addr: '1024', data: 1, nextAddr: '2024', x: START_X, y: TOP_Y + 100 },
          { addr: '2024', data: 2, nextAddr: '3024', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '3024', data: 3, nextAddr: '4024', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '4024', data: 4, nextAddr: '2024', x: START_X + GAP * 3, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'p', targetAddr: '2024', color: '#ff9800', offsetY: 60 },
          { name: 'slow', targetAddr: '2024', color: '#4caf50', offsetY: -20 }
        ],
        codeLine: 7,
        desc: 'p与slow同步前进，相遇点2024即为环入口，返回该节点'
      }
    ]
  },

    // 10. 删除排序链表中的重复元素 LeetCode83
  {
    id: 10,
    title: '删除排序链表重复元素',
    leetCodeId: '83',
    difficulty: '简单',
    description: '删除有序链表中的重复元素，每个数字只保留一个，保持节点相对顺序。',
    code: [
      'if(head == null) return null;',
      'ListNode cur = head;',
      'while(cur.next != null) {',
      '    if(cur.val == cur.next.val) {',
      '        cur.next = cur.next.next;',
      '    } else {',
      '        cur = cur.next;',
      '    }',
      '}',
      'return head;'
    ],
    initialNodes: [
      { addr: '1001', data: 1, nextAddr: '1002', x: START_X, y: TOP_Y + 100 },
      { addr: '1002', data: 1, nextAddr: '1003', x: START_X + GAP, y: TOP_Y + 100 },
      { addr: '1003', data: 2, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 100 },
      { addr: '1004', data: 3, nextAddr: '1005', x: START_X + GAP * 3, y: TOP_Y + 100 },
      { addr: '1005', data: 3, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 100 }
    ],
    steps: [
      {
        nodes: [
          { addr: '1001', data: 1, nextAddr: '1002', x: START_X, y: TOP_Y + 100 },
          { addr: '1002', data: 1, nextAddr: '1003', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1003', data: 2, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1004', data: 3, nextAddr: '1005', x: START_X + GAP * 3, y: TOP_Y + 100 },
          { addr: '1005', data: 3, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1001', color: '#3f51b5', offsetY: 60 },
          { name: 'cur', targetAddr: '1001', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 1,
        desc: '初始化 cur 指向链表头节点'
      },
      {
        nodes: [
          { addr: '1001', data: 1, nextAddr: '1003', x: START_X, y: TOP_Y + 100 },
          { addr: '1002', data: 1, nextAddr: '1003', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1003', data: 2, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1004', data: 3, nextAddr: '1005', x: START_X + GAP * 3, y: TOP_Y + 100 },
          { addr: '1005', data: 3, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1001', color: '#3f51b5', offsetY: 60 },
          { name: 'cur', targetAddr: '1001', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 4,
        desc: '发现相邻值重复，cur.next 跳过重复节点',
        delNode: '1002'
      },
      {
        nodes: [
          { addr: '1001', data: 1, nextAddr: '1003', x: START_X, y: TOP_Y + 100 },
          { addr: '1003', data: 2, nextAddr: '1004', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1004', data: 3, nextAddr: '1005', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1005', data: 3, nextAddr: null, x: START_X + GAP * 3, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1001', color: '#3f51b5', offsetY: 60 },
          { name: 'cur', targetAddr: '1003', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 6,
        desc: '值不重复，cur 指针后移一位'
      },
      {
        nodes: [
          { addr: '1001', data: 1, nextAddr: '1003', x: START_X, y: TOP_Y + 100 },
          { addr: '1003', data: 2, nextAddr: '1004', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1004', data: 3, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1005', data: 3, nextAddr: null, x: START_X + GAP * 3, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1001', color: '#3f51b5', offsetY: 60 },
          { name: 'cur', targetAddr: '1004', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 4,
        desc: '尾部重复节点3跳过删除，去重完成',
        delNode: '1005'
      }
    ]
  },

  // 11. 两两交换链表中的节点 LeetCode24
  {
    id: 11,
    title: '两两交换链表节点',
    leetCodeId: '24',
    difficulty: '中等',
    description: '两两交换相邻的两个节点，不能只修改节点值，必须实际交换节点。',
    code: [
      'ListNode dummy = new ListNode(0);',
      'dummy.next = head;',
      'ListNode pre = dummy;',
      'while(pre.next != null && pre.next.next != null) {',
      '    ListNode a = pre.next;',
      '    ListNode b = a.next;',
      '    a.next = b.next;',
      '    b.next = a;',
      '    pre.next = b;',
      '    pre = a;',
      '}',
      'return dummy.next;'
    ],
    initialNodes: [
      { addr: '0000', data: 0, nextAddr: '1001', x: START_X, y: TOP_Y + 100 },
      { addr: '1001', data: 1, nextAddr: '1002', x: START_X + GAP, y: TOP_Y + 100 },
      { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP * 2, y: TOP_Y + 100 },
      { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 3, y: TOP_Y + 100 },
      { addr: '1004', data: 4, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 100 }
    ],
    steps: [
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1001', x: START_X, y: TOP_Y + 100 },
          { addr: '1001', data: 1, nextAddr: '1002', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 3, y: TOP_Y + 100 },
          { addr: '1004', data: 4, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'pre', targetAddr: '0000', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 2,
        desc: '初始化虚拟头结点，pre 指向 dummy'
      },
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1001', x: START_X, y: TOP_Y + 100 },
          { addr: '1001', data: 1, nextAddr: '1003', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1002', data: 2, nextAddr: '1001', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 3, y: TOP_Y + 100 },
          { addr: '1004', data: 4, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'pre', targetAddr: '0000', color: '#ff9800', offsetY: -20 },
          { name: 'a', targetAddr: '1001', color: '#4caf50', offsetY: 60 },
          { name: 'b', targetAddr: '1002', color: '#e91e63', offsetY: -70 }
        ],
        codeLine: 7,
        desc: '第一组：a.next 接 b.next，b.next 接 a'
      },
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1002', x: START_X, y: TOP_Y + 100 },
          { addr: '1002', data: 2, nextAddr: '1001', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1001', data: 1, nextAddr: '1003', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 3, y: TOP_Y + 100 },
          { addr: '1004', data: 4, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'pre', targetAddr: '1001', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 9,
        desc: 'pre.next 指向b，第一组交换完成，pre 前移到a'
      },
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1002', x: START_X, y: TOP_Y + 100 },
          { addr: '1002', data: 2, nextAddr: '1001', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1001', data: 1, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1004', data: 4, nextAddr: '1003', x: START_X + GAP * 3, y: TOP_Y + 100 },
          { addr: '1003', data: 3, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'dummy', targetAddr: '0000', color: '#9c27b0', offsetY: 60 },
          { name: 'pre', targetAddr: '1003', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 10,
        desc: '第二组交换完成，全部节点两两交换完毕'
      }
    ]
  },

  // 12. 回文链表 LeetCode234
  {
    id: 12,
    title: '回文链表',
    leetCodeId: '234',
    difficulty: '简单',
    description: '快慢指针找到中点，反转后半段链表，双指针对比判断是否为回文。',
    code: [
      'ListNode slow = head, fast = head;',
      'while(fast != null && fast.next != null) {',
      '    slow = slow.next;',
      '    fast = fast.next.next;',
      '}',
      'ListNode half = reverse(slow);',
      'while(half != null) {',
      '    if(head.val != half.val) return false;',
      '    head = head.next;',
      '    half = half.next;',
      '}',
      'return true;'
    ],
    initialNodes: [
      { addr: '1001', data: 1, nextAddr: '1002', x: START_X, y: TOP_Y + 60 },
      { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP, y: TOP_Y + 60 },
      { addr: '1003', data: 2, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 60 },
      { addr: '1004', data: 1, nextAddr: null, x: START_X + GAP * 3, y: TOP_Y + 60 }
    ],
    steps: [
      {
        nodes: [
          { addr: '1001', data: 1, nextAddr: '1002', x: START_X, y: TOP_Y + 60 },
          { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP, y: TOP_Y + 60 },
          { addr: '1003', data: 2, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 60 },
          { addr: '1004', data: 1, nextAddr: null, x: START_X + GAP * 3, y: TOP_Y + 60 }
        ],
        pointers: [
          { name: 'slow', targetAddr: '1001', color: '#4caf50', offsetY: -20 },
          { name: 'fast', targetAddr: '1001', color: '#e91e63', offsetY: -70 }
        ],
        codeLine: 0,
        desc: '快慢指针同时从头节点出发'
      },
      {
        nodes: [
          { addr: '1001', data: 1, nextAddr: '1002', x: START_X, y: TOP_Y + 60 },
          { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP, y: TOP_Y + 60 },
          { addr: '1003', data: 2, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 60 },
          { addr: '1004', data: 1, nextAddr: null, x: START_X + GAP * 3, y: TOP_Y + 60 }
        ],
        pointers: [
          { name: 'slow', targetAddr: '1002', color: '#4caf50', offsetY: -20 },
          { name: 'fast', targetAddr: '1003', color: '#e91e63', offsetY: -70 }
        ],
        codeLine: 2,
        desc: 'fast走到末尾，slow停在链表中点'
      },
      {
        nodes: [
          { addr: '1001', data: 1, nextAddr: '1002', x: START_X, y: TOP_Y + 60 },
          { addr: '1002', data: 2, nextAddr: null, x: START_X + GAP, y: TOP_Y + 60 },
          { addr: '1004', data: 1, nextAddr: '1003', x: START_X + GAP * 2, y: BOTTOM_Y },
          { addr: '1003', data: 2, nextAddr: null, x: START_X + GAP * 3, y: BOTTOM_Y }
        ],
        pointers: [
          { name: 'pLeft', targetAddr: '1001', color: '#3f51b5', offsetY: 60 },
          { name: 'pRight', targetAddr: '1004', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 5,
        desc: '反转后半段链表，双指针从两端向中间对比'
      },
      {
        nodes: [
          { addr: '1001', data: 1, nextAddr: '1002', x: START_X, y: TOP_Y + 60 },
          { addr: '1002', data: 2, nextAddr: null, x: START_X + GAP, y: TOP_Y + 60 },
          { addr: '1004', data: 1, nextAddr: '1003', x: START_X + GAP * 2, y: BOTTOM_Y },
          { addr: '1003', data: 2, nextAddr: null, x: START_X + GAP * 3, y: BOTTOM_Y }
        ],
        pointers: [
          { name: 'pLeft', targetAddr: '1002', color: '#3f51b5', offsetY: 60 },
          { name: 'pRight', targetAddr: '1003', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 7,
        desc: '所有节点值对应相等，判定为回文链表'
      }
    ]
  },

  // 13. 旋转链表 LeetCode61
  {
    id: 13,
    title: '旋转链表',
    leetCodeId: '61',
    difficulty: '中等',
    description: '将链表每个节点向右旋转 k 个位置，尾部节点移到头部。',
    code: [
      'if(head == null) return null;',
      'int len = 1;',
      'ListNode tail = head;',
      'while(tail.next != null) { tail = tail.next; len++; }',
      'tail.next = head;',
      'k = k % len;',
      'for(int i=0; i<len-k; i++) tail = tail.next;',
      'ListNode newHead = tail.next;',
      'tail.next = null;',
      'return newHead;'
    ],
    initialNodes: [
      { addr: '1001', data: 1, nextAddr: '1002', x: START_X, y: TOP_Y + 100 },
      { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP, y: TOP_Y + 100 },
      { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 100 },
      { addr: '1004', data: 4, nextAddr: '1005', x: START_X + GAP * 3, y: TOP_Y + 100 },
      { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 100 }
    ],
    steps: [
      {
        nodes: [
          { addr: '1001', data: 1, nextAddr: '1002', x: START_X, y: TOP_Y + 100 },
          { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1004', data: 4, nextAddr: '1005', x: START_X + GAP * 3, y: TOP_Y + 100 },
          { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'head', targetAddr: '1001', color: '#3f51b5', offsetY: 60 },
          { name: 'tail', targetAddr: '1005', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 3,
        desc: '找到尾节点，统计链表长度，k=2'
      },
      {
        nodes: [
          { addr: '1001', data: 1, nextAddr: '1002', x: START_X, y: TOP_Y + 100 },
          { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1004', data: 4, nextAddr: '1005', x: START_X + GAP * 3, y: TOP_Y + 100 },
          { addr: '1005', data: 5, nextAddr: '1001', x: START_X + GAP * 4, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'tail', targetAddr: '1003', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 6,
        desc: '链表成环，tail 向前走 len-k=3 步'
      },
      {
        nodes: [
          { addr: '1004', data: 4, nextAddr: '1005', x: START_X, y: TOP_Y + 100 },
          { addr: '1005', data: 5, nextAddr: '1001', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1001', data: 1, nextAddr: '1002', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP * 3, y: TOP_Y + 100 },
          { addr: '1003', data: 3, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'newHead', targetAddr: '1004', color: '#4caf50', offsetY: 60 },
          { name: 'tail', targetAddr: '1003', color: '#ff9800', offsetY: -20 }
        ],
        codeLine: 8,
        desc: '断开环，新头节点为4，旋转完成'
      }
    ]
  },

  // 14. 分隔链表 LeetCode86
  {
    id: 14,
    title: '分隔链表',
    leetCodeId: '86',
    difficulty: '中等',
    description: '按给定值x分隔链表，小于x的节点放前面，大于等于的放后面，保持相对顺序。',
    code: [
      'ListNode small = new ListNode(0);',
      'ListNode large = new ListNode(0);',
      'ListNode p1 = small, p2 = large;',
      'while(head != null) {',
      '    if(head.val < x) {',
      '        p1.next = head;',
      '        p1 = p1.next;',
      '    } else {',
      '        p2.next = head;',
      '        p2 = p2.next;',
      '    }',
      '    head = head.next;',
      '}',
      'p2.next = null;',
      'p1.next = large.next;',
      'return small.next;'
    ],
    initialNodes: [
      { addr: '1001', data: 1, nextAddr: '1002', x: START_X, y: TOP_Y + 80 },
      { addr: '1002', data: 4, nextAddr: '1003', x: START_X + GAP, y: TOP_Y + 80 },
      { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 80 },
      { addr: '1004', data: 2, nextAddr: '1005', x: START_X + GAP * 3, y: TOP_Y + 80 },
      { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 80 }
    ],
    steps: [
      {
        nodes: [
          { addr: 's0', data: 0, nextAddr: null, x: START_X, y: BOTTOM_Y - 40 },
          { addr: 'l0', data: 0, nextAddr: null, x: START_X, y: BOTTOM_Y + 60 },
          { addr: '1001', data: 1, nextAddr: '1002', x: START_X + GAP, y: TOP_Y + 80 },
          { addr: '1002', data: 4, nextAddr: '1003', x: START_X + GAP * 2, y: TOP_Y + 80 },
          { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 3, y: TOP_Y + 80 },
          { addr: '1004', data: 2, nextAddr: '1005', x: START_X + GAP * 4, y: TOP_Y + 80 },
          { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 5, y: TOP_Y + 80 }
        ],
        pointers: [
          { name: 'p1', targetAddr: 's0', color: '#4caf50', offsetY: -20 },
          { name: 'p2', targetAddr: 'l0', color: '#e91e63', offsetY: -20 },
          { name: 'head', targetAddr: '1001', color: '#3f51b5', offsetY: 60 }
        ],
        codeLine: 2,
        desc: '初始化大小两条虚拟头链表，x=3'
      },
      {
        nodes: [
          { addr: 's0', data: 0, nextAddr: '1001', x: START_X, y: BOTTOM_Y - 40 },
          { addr: '1001', data: 1, nextAddr: null, x: START_X + GAP, y: BOTTOM_Y - 40 },
          { addr: 'l0', data: 0, nextAddr: '1002', x: START_X, y: BOTTOM_Y + 60 },
          { addr: '1002', data: 4, nextAddr: null, x: START_X + GAP, y: BOTTOM_Y + 60 },
          { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 80 },
          { addr: '1004', data: 2, nextAddr: '1005', x: START_X + GAP * 3, y: TOP_Y + 80 },
          { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 80 }
        ],
        pointers: [
          { name: 'p1', targetAddr: '1001', color: '#4caf50', offsetY: -20 },
          { name: 'p2', targetAddr: '1002', color: '#e91e63', offsetY: -20 },
          { name: 'head', targetAddr: '1003', color: '#3f51b5', offsetY: 60 }
        ],
        codeLine: 5,
        desc: '小于3放入小链表，大于等于3放入大连表'
      },
      {
        nodes: [
          { addr: 's0', data: 0, nextAddr: '1001', x: START_X, y: BOTTOM_Y - 40 },
          { addr: '1001', data: 1, nextAddr: '1004', x: START_X + GAP, y: BOTTOM_Y - 40 },
          { addr: '1004', data: 2, nextAddr: null, x: START_X + GAP * 2, y: BOTTOM_Y - 40 },
          { addr: 'l0', data: 0, nextAddr: '1002', x: START_X, y: BOTTOM_Y + 60 },
          { addr: '1002', data: 4, nextAddr: '1003', x: START_X + GAP, y: BOTTOM_Y + 60 },
          { addr: '1003', data: 3, nextAddr: '1005', x: START_X + GAP * 2, y: BOTTOM_Y + 60 },
          { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 3, y: BOTTOM_Y + 60 }
        ],
        pointers: [
          { name: 'p1', targetAddr: '1004', color: '#4caf50', offsetY: -20 },
          { name: 'p2', targetAddr: '1005', color: '#e91e63', offsetY: -20 }
        ],
        codeLine: 12,
        desc: '遍历完成，两条子链表分别拼接完毕'
      },
      {
        nodes: [
          { addr: 's0', data: 0, nextAddr: '1001', x: START_X, y: TOP_Y + 100 },
          { addr: '1001', data: 1, nextAddr: '1004', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1004', data: 2, nextAddr: '1002', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1002', data: 4, nextAddr: '1003', x: START_X + GAP * 3, y: TOP_Y + 100 },
          { addr: '1003', data: 3, nextAddr: '1005', x: START_X + GAP * 4, y: TOP_Y + 100 },
          { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 5, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'newHead', targetAddr: '1001', color: '#3f51b5', offsetY: 60 }
        ],
        codeLine: 13,
        desc: '拼接两条链表，分隔完成，返回小链表头'
      }
    ]
  },

    // 15. 重排链表 LeetCode143
  {
    id: 15,
    title: '重排链表',
    leetCodeId: '143',
    difficulty: '中等',
    description: '将链表 L0→L1→…→Ln-1→Ln 重排为 L0→Ln→L1→Ln-1→L2→Ln-2→…',
    code: [
      '// 1. 快慢指针找中点',
      'ListNode slow = head, fast = head;',
      'while(fast.next != null && fast.next.next != null) {',
      '    slow = slow.next;',
      '    fast = fast.next.next;',
      '}',
      '// 2. 反转后半段链表',
      'ListNode pre = null, cur = slow.next;',
      'slow.next = null;',
      'while(cur != null) {',
      '    ListNode next = cur.next;',
      '    cur.next = pre;',
      '    pre = cur;',
      '    cur = next;',
      '}',
      '// 3. 交替合并两段',
      'ListNode p1 = head, p2 = pre;',
      'while(p2 != null) {',
      '    ListNode next1 = p1.next;',
      '    ListNode next2 = p2.next;',
      '    p1.next = p2;',
      '    p2.next = next1;',
      '    p1 = next1;',
      '    p2 = next2;',
      '}'
    ],
    codeExplanations: [
      '第一阶段：找到链表中点，将链表拆分为前后两段',
      '初始化快慢指针都指向头节点',
      '快指针每次走2步，慢指针每次走1步',
      '慢指针向前移动一位',
      '快指针向前移动两位',
      '循环结束时slow停在链表中点',
      '第二阶段：反转后半段链表',
      '初始化反转指针，pre为空，cur指向后半段头节点',
      '断开前后两段链表',
      '标准反转链表循环',
      '保存下一个节点',
      '当前节点指向前一个节点',
      'pre指针前移',
      'cur指针前移',
      '反转完成，pre是后半段新头',
      '第三阶段：交替合并前后两段',
      'p1指向前半段头，p2指向反转后的后半段头',
      '循环直到后半段遍历完',
      '保存p1的下一个节点',
      '保存p2的下一个节点',
      'p1接p2',
      'p2接原p1的下一个节点',
      'p1前移',
      'p2前移',
      '合并完成，重排结束'
    ],
    initialNodes: [
      { addr: '1001', data: 1, nextAddr: '1002', x: START_X, y: TOP_Y + 80 },
      { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP, y: TOP_Y + 80 },
      { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 80 },
      { addr: '1004', data: 4, nextAddr: '1005', x: START_X + GAP * 3, y: TOP_Y + 80 },
      { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 80 }
    ],
    steps: [
      {
        nodes: [
          { addr: '1001', data: 1, nextAddr: '1002', x: START_X, y: TOP_Y + 80 },
          { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP, y: TOP_Y + 80 },
          { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 80 },
          { addr: '1004', data: 4, nextAddr: '1005', x: START_X + GAP * 3, y: TOP_Y + 80 },
          { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 80 }
        ],
        pointers: [
          { name: 'slow', targetAddr: '1001', color: '#4caf50', offsetY: -20 },
          { name: 'fast', targetAddr: '1001', color: '#e91e63', offsetY: -70 }
        ],
        codeLine: 1,
        desc: '阶段1：快慢指针同时出发，寻找链表中点'
      },
      {
        nodes: [
          { addr: '1001', data: 1, nextAddr: '1002', x: START_X, y: TOP_Y + 80 },
          { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP, y: TOP_Y + 80 },
          { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 80 },
          { addr: '1004', data: 4, nextAddr: '1005', x: START_X + GAP * 3, y: TOP_Y + 80 },
          { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 80 }
        ],
        pointers: [
          { name: 'slow', targetAddr: '1003', color: '#4caf50', offsetY: -20 },
          { name: 'fast', targetAddr: '1005', color: '#e91e63', offsetY: -70 }
        ],
        codeLine: 5,
        desc: 'fast走到末尾，slow停在中点节点3，链表拆分完成'
      },
      {
        nodes: [
          { addr: '1001', data: 1, nextAddr: '1002', x: START_X, y: TOP_Y + 20 },
          { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP, y: TOP_Y + 20 },
          { addr: '1003', data: 3, nextAddr: null, x: START_X + GAP * 2, y: TOP_Y + 20 },
          { addr: '1005', data: 5, nextAddr: '1004', x: START_X + GAP * 2, y: BOTTOM_Y },
          { addr: '1004', data: 4, nextAddr: null, x: START_X + GAP * 3, y: BOTTOM_Y }
        ],
        pointers: [
          { name: 'pre', targetAddr: '1005', color: '#ff9800', offsetY: 60 }
        ],
        codeLine: 13,
        desc: '阶段2：后半段4->5反转为5->4，pre指向新头5'
      },
      {
        nodes: [
          { addr: '1001', data: 1, nextAddr: '1005', x: START_X, y: TOP_Y + 80 },
          { addr: '1005', data: 5, nextAddr: '1002', x: START_X + GAP, y: TOP_Y + 80 },
          { addr: '1002', data: 2, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 80 },
          { addr: '1004', data: 4, nextAddr: '1003', x: START_X + GAP * 3, y: TOP_Y + 80 },
          { addr: '1003', data: 3, nextAddr: null, x: START_X + GAP * 4, y: TOP_Y + 80 }
        ],
        pointers: [
          { name: 'p1', targetAddr: '1003', color: '#3f51b5', offsetY: -20 },
          { name: 'p2', targetAddr: null, color: '#ff9800', offsetY: 60 }
        ],
        codeLine: 24,
        desc: '阶段3：交替合并完成，最终链表 1→5→2→4→3'
      }
    ]
  },

  // 16. K个一组翻转链表 LeetCode25
  {
    id: 16,
    title: 'K个一组翻转链表',
    leetCodeId: '25',
    difficulty: '困难',
    description: '每k个节点一组进行翻转，剩余不足k个保持原样，k=2示例。',
    code: [
      'ListNode dummy = new ListNode(0);',
      'dummy.next = head;',
      'ListNode pre = dummy, tail = dummy;',
      'while(true) {',
      '    // tail向后走k步，检查是否够一组',
      '    for(int i=0; i<k; i++) {',
      '        if(tail.next == null) return dummy.next;',
      '        tail = tail.next;',
      '    }',
      '    ListNode cur = pre.next;',
      '    // 组内翻转',
      '    for(int i=0; i<k-1; i++) {',
      '        ListNode next = cur.next;',
      '        cur.next = next.next;',
      '        next.next = pre.next;',
      '        pre.next = next;',
      '    }',
      '    pre = cur;',
      '    tail = cur;',
      '}'
    ],
    codeExplanations: [
      '创建虚拟头结点，统一处理头部翻转',
      '虚拟头结点连接原链表头',
      'pre指向每组的前驱，tail用于探测每组末尾',
      '循环处理每一组',
      '先移动tail找到当前组的末尾',
      '循环k次移动tail',
      '不足k个节点，直接返回结果',
      'tail向后移动一位',
      'tail定位到当前组最后一个节点',
      'cur指向当前组第一个节点',
      '开始组内头插法翻转',
      '翻转k-1次完成一组反转',
      '保存cur的下一个节点',
      'cur跳过next，接后面的节点',
      'next插入到pre后面',
      'pre的next指向新的组头',
      '一组翻转完成',
      'pre移动到下一组的前驱',
      'tail重置到下一组的前驱位置',
      '继续处理下一组'
    ],
    initialNodes: [
      { addr: '0000', data: 0, nextAddr: '1001', x: START_X, y: TOP_Y + 100 },
      { addr: '1001', data: 1, nextAddr: '1002', x: START_X + GAP, y: TOP_Y + 100 },
      { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP * 2, y: TOP_Y + 100 },
      { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 3, y: TOP_Y + 100 },
      { addr: '1004', data: 4, nextAddr: '1005', x: START_X + GAP * 4, y: TOP_Y + 100 },
      { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 5, y: TOP_Y + 100 }
    ],
    steps: [
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1001', x: START_X, y: TOP_Y + 100 },
          { addr: '1001', data: 1, nextAddr: '1002', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 3, y: TOP_Y + 100 },
          { addr: '1004', data: 4, nextAddr: '1005', x: START_X + GAP * 4, y: TOP_Y + 100 },
          { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 5, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'pre/tail', targetAddr: '0000', color: '#9c27b0', offsetY: -20 }
        ],
        codeLine: 2,
        desc: '初始化：pre和tail都指向虚拟头结点，k=2'
      },
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1001', x: START_X, y: TOP_Y + 100 },
          { addr: '1001', data: 1, nextAddr: '1002', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1002', data: 2, nextAddr: '1003', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 3, y: TOP_Y + 100 },
          { addr: '1004', data: 4, nextAddr: '1005', x: START_X + GAP * 4, y: TOP_Y + 100 },
          { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 5, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'pre', targetAddr: '0000', color: '#9c27b0', offsetY: -20 },
          { name: 'tail', targetAddr: '1002', color: '#e91e63', offsetY: -70 },
          { name: 'cur', targetAddr: '1001', color: '#ff9800', offsetY: 60 }
        ],
        codeLine: 9,
        desc: '第一组：tail走2步到节点2，cur指向组头1'
      },
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1002', x: START_X, y: TOP_Y + 100 },
          { addr: '1002', data: 2, nextAddr: '1001', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1001', data: 1, nextAddr: '1003', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1003', data: 3, nextAddr: '1004', x: START_X + GAP * 3, y: TOP_Y + 100 },
          { addr: '1004', data: 4, nextAddr: '1005', x: START_X + GAP * 4, y: TOP_Y + 100 },
          { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 5, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'pre', targetAddr: '1001', color: '#9c27b0', offsetY: -20 },
          { name: 'tail', targetAddr: '1001', color: '#e91e63', offsetY: -70 }
        ],
        codeLine: 18,
        desc: '第一组翻转完成：2→1，pre和tail移动到组尾1'
      },
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1002', x: START_X, y: TOP_Y + 100 },
          { addr: '1002', data: 2, nextAddr: '1001', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1001', data: 1, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1004', data: 4, nextAddr: '1003', x: START_X + GAP * 3, y: TOP_Y + 100 },
          { addr: '1003', data: 3, nextAddr: '1005', x: START_X + GAP * 4, y: TOP_Y + 100 },
          { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 5, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'pre', targetAddr: '1003', color: '#9c27b0', offsetY: -20 },
          { name: 'tail', targetAddr: '1003', color: '#e91e63', offsetY: -70 }
        ],
        codeLine: 18,
        desc: '第二组翻转完成：4→3，剩余节点5不足k个，保持原样'
      },
      {
        nodes: [
          { addr: '0000', data: 0, nextAddr: '1002', x: START_X, y: TOP_Y + 100 },
          { addr: '1002', data: 2, nextAddr: '1001', x: START_X + GAP, y: TOP_Y + 100 },
          { addr: '1001', data: 1, nextAddr: '1004', x: START_X + GAP * 2, y: TOP_Y + 100 },
          { addr: '1004', data: 4, nextAddr: '1003', x: START_X + GAP * 3, y: TOP_Y + 100 },
          { addr: '1003', data: 3, nextAddr: '1005', x: START_X + GAP * 4, y: TOP_Y + 100 },
          { addr: '1005', data: 5, nextAddr: null, x: START_X + GAP * 5, y: TOP_Y + 100 }
        ],
        pointers: [
          { name: 'newHead', targetAddr: '1002', color: '#4caf50', offsetY: 60 }
        ],
        codeLine: 6,
        desc: '全部翻转完成，最终链表：2→1→4→3→5，返回dummy.next'
      }
    ]
  },

  // 17. 复制带随机指针的链表 LeetCode138
  {
    id: 17,
    title: '复制带随机指针的链表',
    leetCodeId: '138',
    difficulty: '困难',
    description: '深拷贝链表，每个节点包含next和random两个指针，random可指向任意节点或null。',
    code: [
      '// 哈希表：原节点 -> 新节点',
      'Map<ListNode,ListNode> map = new HashMap<>();',
      'ListNode cur = head;',
      '// 第一遍：复制所有节点',
      'while(cur != null) {',
      '    map.put(cur, new ListNode(cur.val));',
      '    cur = cur.next;',
      '}',
      '// 第二遍：复制next和random指针',
      'cur = head;',
      'while(cur != null) {',
      '    map.get(cur).next = map.get(cur.next);',
      '    map.get(cur).random = map.get(cur.random);',
      '    cur = cur.next;',
      '}',
      'return map.get(head);'
    ],
    codeExplanations: [
      '使用哈希表建立原节点与新节点的映射关系',
      '创建哈希表，key是原节点，value是新复制的节点',
      'cur指针从头开始遍历',
      '第一遍遍历：只复制节点值，不处理指针',
      '遍历原链表',
      '创建新节点存入哈希表，与原节点一一对应',
      'cur向后移动',
      '所有节点复制完成',
      '第二遍遍历：给新节点复制指针关系',
      'cur重新回到头节点',
      '再次遍历原链表',
      '新节点的next指向 原节点next对应的新节点',
      '新节点的random指向 原节点random对应的新节点',
      'cur向后移动',
      '所有指针复制完成',
      '返回新链表的头节点'
    ],
    initialNodes: [
      { addr: 'A', data: 7, nextAddr: 'B', randomAddr: 'C', x: START_X, y: TOP_Y + 60 },
      { addr: 'B', data: 13, nextAddr: 'C', randomAddr: 'A', x: START_X + GAP, y: TOP_Y + 60 },
      { addr: 'C', data: 11, nextAddr: null, randomAddr: 'B', x: START_X + GAP * 2, y: TOP_Y + 60 }
    ],
    steps: [
      {
        nodes: [
          { addr: 'A', data: 7, nextAddr: 'B', randomAddr: 'C', x: START_X, y: TOP_Y + 60 },
          { addr: 'B', data: 13, nextAddr: 'C', randomAddr: 'A', x: START_X + GAP, y: TOP_Y + 60 },
          { addr: 'C', data: 11, nextAddr: null, randomAddr: 'B', x: START_X + GAP * 2, y: TOP_Y + 60 }
        ],
        pointers: [
          { name: 'head/cur', targetAddr: 'A', color: '#3f51b5', offsetY: -20 }
        ],
        codeLine: 2,
        desc: '原链表含next和random双指针，紫色虚线为random指针'
      },
      {
        nodes: [
          { addr: 'A', data: 7, nextAddr: 'B', randomAddr: 'C', x: START_X, y: TOP_Y + 20 },
          { addr: 'B', data: 13, nextAddr: 'C', randomAddr: 'A', x: START_X + GAP, y: TOP_Y + 20 },
          { addr: 'C', data: 11, nextAddr: null, randomAddr: 'B', x: START_X + GAP * 2, y: TOP_Y + 20 },
          { addr: "A'", data: 7, nextAddr: null, x: START_X, y: BOTTOM_Y },
          { addr: "B'", data: 13, nextAddr: null, x: START_X + GAP, y: BOTTOM_Y },
          { addr: "C'", data: 11, nextAddr: null, x: START_X + GAP * 2, y: BOTTOM_Y }
        ],
        pointers: [
          { name: 'cur', targetAddr: null, color: '#3f51b5', offsetY: -20 }
        ],
        codeLine: 7,
        desc: '第一遍完成：所有新节点复制完毕，暂未连接指针'
      },
      {
        nodes: [
          { addr: 'A', data: 7, nextAddr: 'B', randomAddr: 'C', x: START_X, y: TOP_Y + 20 },
          { addr: 'B', data: 13, nextAddr: 'C', randomAddr: 'A', x: START_X + GAP, y: TOP_Y + 20 },
          { addr: 'C', data: 11, nextAddr: null, randomAddr: 'B', x: START_X + GAP * 2, y: TOP_Y + 20 },
          { addr: "A'", data: 7, nextAddr: "B'", randomAddr: "C'", x: START_X, y: BOTTOM_Y },
          { addr: "B'", data: 13, nextAddr: "C'", randomAddr: "A'", x: START_X + GAP, y: BOTTOM_Y },
          { addr: "C'", data: 11, nextAddr: null, randomAddr: "B'", x: START_X + GAP * 2, y: BOTTOM_Y }
        ],
        pointers: [
          { name: 'newHead', targetAddr: "A'", color: '#4caf50', offsetY: 60 }
        ],
        codeLine: 15,
        desc: '第二遍完成：next和random指针全部复制，深拷贝完成'
      }
    ]
  }
]