<template>
  <div class="canvas-wrapper">
    <!-- 题目信息（题库模式显示） -->
    <div v-if="mode === 'problem' && problem" class="problem-info">
      <h3>{{ problem.title }} <span class="lc-id">LeetCode {{ problem.leetCodeId }}</span></h3>
      <p class="desc">{{ problem.description }}</p>
    </div>
    <!-- 概念说明（自由模式显示） -->
    <div v-if="mode === 'free'" class="info-panel">
      <h3>📘 链表基础概念说明</h3>
      <div class="info-content">
        <div class="info-item">
          <span class="key">数据域（val/data）</span>
          <span class="desc">节点左半部分，用来存储实际数据。</span>
        </div>
        <div class="info-item">
          <span class="key">指针域（next）</span>
          <span class="desc">节点右半部分，保存下一个节点的内存地址。</span>
        </div>
        <div class="info-item">
          <span class="key">head 头指针</span>
          <span class="desc">永远指向链表的第一个节点，是链表入口。</span>
        </div>
        <div class="info-item">
          <span class="key">temp 临时指针</span>
          <span class="desc">遍历链表时使用，执行 temp = temp.next 向后移动。</span>
        </div>
      </div>
    </div>

    <!-- 画布+代码 左右分栏 -->
    <div class="canvas-code-row">
      <!-- 可滚动画布 -->
      <div class="canvas-scroll">
        <canvas
          ref="canvasRef"
          :width="canvasWidth"
          height="560"
          @dblclick="handleCanvasDblClick"
          @mousedown="handleMouseDown"
        ></canvas>
      </div>
      <!-- 代码高亮面板 -->
<div class="code-panel" v-if="mode === 'problem' && problem">
  <h4>Java 题解代码</h4>
  <div class="code-box">
    <div
      v-for="(line, idx) in problem!.code"
      :key="idx"
      class="code-line"
      :class="{ active: idx === currentCodeLine }"
    >
      <span class="line-num">{{ idx + 1 }}</span>
      <span class="code-text">{{ line }}</span>
    </div>
    
  </div>
  <!-- 代码逐行讲解 -->
<div class="code-explain" v-if="currentCodeExplanation">
  <span class="explain-title">📝 逐行讲解</span>
  <p class="explain-text">{{ currentCodeExplanation }}</p>
</div>
</div>
      <!-- 自由模式固定遍历模板代码 -->
      <div class="code-panel" v-if="mode === 'free'">
        <h4>链表遍历模板代码</h4>
        <div class="code-box">
          <div class="code-line active" v-for="(line, idx) in freeCode" :key="idx">
            <span class="line-num">{{ idx + 1 }}</span>
            <span class="code-text">{{ line }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 步骤说明 -->
   <div class="step-desc" v-show="currentStepDesc">
  📌 {{ currentStepDesc }}
</div>

    <!-- 步骤进度条 -->
<div class="progress-wrap">
  <div class="progress-track">
    <div 
      class="progress-fill" 
      :style="{ width: `${((currentStep + 1) / totalSteps) * 100}%` }"
    ></div>
    <input 
      type="range" 
      min="0" 
      :max="totalSteps - 1" 
      v-model.number="currentStep" 
      @input="jumpToStep"
      class="progress-slider"
      :disabled="isAnimating"
    />
  </div>
</div>

    <!-- 控制栏 -->
    <div class="control-bar">
      <template v-if="mode === 'free'">
        <button @click="addNode" :disabled="isAnimating">新增节点</button>
        <button @click="removeNode" :disabled="isAnimating || nodeList.length <= 1">删除节点</button>
        <span class="divider"></span>
      </template>
      <button @click="prevStep" :disabled="isAnimating || currentStep === 0">上一步</button>
      <button @click="nextStep" :disabled="isAnimating || currentStep === totalSteps - 1">下一步</button>
      <button @click="reset" :disabled="isAnimating">重置</button>
      <button @click="exportCanvas">导出截图</button>

      <span class="speed-control">
  <span class="speed-label">速度</span>
  <input 
    type="range" 
    min="1" 
    max="5" 
    v-model.number="speedLevel" 
    class="speed-slider"
  />
  <span class="speed-val">{{ speedLevel }}x</span>
</span>

      <button @click="toggleAutoPlay" :disabled="isAnimating">{{ isAutoPlay ? '暂停' : '自动播放' }}</button>
      <span class="step-info">步骤 {{ currentStep + 1 }} / {{ totalSteps }}</span>
      <span v-if="mode === 'free'" class="tip">💡 双击节点可修改数值和地址</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Problem, ListNodeData, PointerData } from '../data/problems'
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue'

const delNodeAddr = ref<string | null>(null)

const props = defineProps<{
  mode: 'free' | 'problem'
  problem: Problem | null
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

interface PointerPos {
  name: string
  color: string
  labelX: number
  labelY: number
  arrowX: number
  arrowFromY: number
  arrowToY: number
}

// 画布滚轮横向滚动（Shift+滚轮左右滑动）
function handleCanvasWheel(e: WheelEvent) {
  const scrollDom = e.currentTarget as HTMLElement
  // 按住Shift 或 横向滚轮，都触发横向滚动
  if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault()
    scrollDom.scrollLeft += e.deltaY || e.deltaX
  }
}

// 节点拖拽状态
const isDragging = ref(false)
let dragNodeIndex = -1
let dragOffsetX = 0
let dragOffsetY = 0

// 统一绘制配置
const config = {
  startAddr: 1024,
  startData: 10,
  nodeCount: 3,
  nodeY: 180,
  startX: 80,
  gap: 200,
  nodeWidth: 140,
  nodeHeight: 56,
  labelWidth: 100,
  labelHeight: 40,
  paddingRight: 160
}

// 自由模式固定遍历代码
const freeCode = [
  'ListNode temp = head;',
  'while (temp != null) {',
  '    // 处理当前节点',
  '    temp = temp.next;',
  '}'
]

// 当前高亮代码行（原有代码，必须保留）
const currentCodeLine = computed(() => {
  if (props.mode === 'problem' && props.problem) {
    return props.problem.steps[currentStep.value].codeLine
  }
  return -1
})

// 当前高亮代码行的详细讲解（新增）
const currentCodeExplanation = computed(() => {
  if (props.mode !== 'problem' || !props.problem) return ''
  const line = currentCodeLine.value
  // 加可选链?.，适配可选字段
  if (line < 0 || line >= (props.problem.codeExplanations?.length ?? 0)) return ''
  return props.problem.codeExplanations?.[line] ?? ''
})

// 自由模式节点数据
const freeNodeList = ref<ListNodeData[]>(generateFreeNodes())
function generateFreeNodes(): ListNodeData[] {
  const nodes: ListNodeData[] = []
  for (let i = 0; i < config.nodeCount; i++) {
    nodes.push({
      addr: String(config.startAddr + i * 1000),
      data: config.startData + i * 10,
      nextAddr: i === config.nodeCount - 1 ? null : String(config.startAddr + (i + 1) * 1000),
      x: config.startX + i * config.gap,
      y: config.nodeY
    })
  }
  return nodes
}

// 当前使用的节点列表
const nodeList = computed(() => {
  if (props.mode === 'problem' && props.problem) {
    return props.problem.steps[currentStep.value].nodes
  }
  return freeNodeList.value
})

// 总步数
const totalSteps = computed(() => {
  if (props.mode === 'problem' && props.problem) {
    return props.problem.steps.length
  }
  return freeNodeList.value.length
})

// 当前步骤说明
const currentStepDesc = computed(() => {
  if (props.mode === 'problem' && props.problem) {
    const step = props.problem.steps[currentStep.value]
    return step?.desc ?? ''
  }
  return `temp 指向第 ${currentStep.value + 1} 个节点`
})



// 动态画布宽度
// 动态画布宽度
const canvasWidth = computed(() => {
  if (nodeList.value.length === 0) return 900
  // 遍历所有节点取最右侧坐标，适配多行、多段链表
  const maxNodeX = Math.max(...nodeList.value.map(node => node.x))
  let width = maxNodeX + config.nodeWidth + config.paddingRight

  // 计算指针标签的右边界，避免标签被裁切
  const pointers = getCurrentPointers()
  pointers.forEach(ptr => {
    if (!ptr.targetAddr) return
    const nodeMap = buildNodeMap()
    const targetNode = nodeMap.get(ptr.targetAddr)
    if (!targetNode) return
    const arrowX = ptr.offsetY >= 0 
      ? targetNode.x + 20 
      : targetNode.x + config.nodeWidth - 20
    const labelRight = arrowX + config.labelWidth / 2
    if (labelRight > width) width = labelRight + 20
  })

  return Math.max(width, 900)
})

// 地址映射
function buildNodeMap(): Map<string, ListNodeData> {
  const map = new Map<string, ListNodeData>()
  nodeList.value.forEach(node => map.set(node.addr, node))
  return map
}

const speedLevel = ref(3)
const currentStep = ref(0)
const isAnimating = ref(false)
let animationId: number | null = null
const animDuration = computed(() => 600 - speedLevel.value * 100)
const isAutoPlay = ref(false)
let autoPlayTimer: number | null = null
const autoPlayInterval = computed(() => 1600 - speedLevel.value * 300)

// 链表自动滚动到可视区域中间
function scrollToCenter() {
  const scrollDom = document.querySelector('.canvas-scroll') as HTMLElement
  if (!scrollDom || nodeList.value.length === 0) return
  
  const minX = Math.min(...nodeList.value.map(n => n.x))
  const maxX = Math.max(...nodeList.value.map(n => n.x)) + config.nodeWidth
  const contentCenter = (minX + maxX) / 2
  const viewCenter = scrollDom.clientWidth / 2
  scrollDom.scrollLeft = Math.max(0, contentCenter - viewCenter)
}

// 计算指针渲染位置
function calcPointerPos(pointer: PointerData): PointerPos {
  const nodeMap = buildNodeMap()
  const targetNode = pointer.targetAddr ? nodeMap.get(pointer.targetAddr) : null
  if (!targetNode) {
    return { name: pointer.name, color: pointer.color, labelX: 0, labelY: 0, arrowX: 0, arrowFromY: 0, arrowToY: 0 }
  }
  // 上下指针横向错开：上指针靠左，下指针靠右，避开节点数据文字
  const arrowX = pointer.offsetY >= 0 
    ? targetNode.x + 20 
    : targetNode.x + config.nodeWidth - 20

  let labelY: number
  let arrowFromY: number
  let arrowToY: number
  if (pointer.offsetY >= 0) {
    labelY = targetNode.y - pointer.offsetY - config.labelHeight
    arrowFromY = labelY + config.labelHeight
    arrowToY = targetNode.y + 10 // 箭头落点靠上，不挡数字
  } else {
    labelY = targetNode.y + config.nodeHeight + Math.abs(pointer.offsetY)
    arrowFromY = labelY
    arrowToY = targetNode.y + config.nodeHeight - 10 // 箭头落点靠下，不挡数字
  }
  return {
    name: pointer.name,
    color: pointer.color,
    labelX: arrowX - config.labelWidth / 2,
    labelY,
    arrowX,
    arrowFromY,
    arrowToY
  }
}

let currentPoses: PointerPos[] = []

// 获取当前步骤的指针
function getCurrentPointers(): PointerData[] {
  if (props.mode === 'problem' && props.problem) {
    return props.problem.steps[currentStep.value].pointers
  }
  // 自由模式自动生成遍历指针
  return [
    { name: 'head', targetAddr: freeNodeList.value[0]?.addr || null, color: '#3f51b5', offsetY: 60 },
    { name: 'temp', targetAddr: freeNodeList.value[currentStep.value]?.addr || null, color: '#ff9800', offsetY: -20 }
  ]
}

// 绘制节点
function drawNode(ctx: CanvasRenderingContext2D, node: ListNodeData) {
  const { nodeWidth, nodeHeight } = config
  const halfWidth = nodeWidth / 2

   // 被删除节点高亮样式
  const isDeleted = delNodeAddr.value === node.addr
  ctx.strokeStyle = isDeleted ? '#f44336' : '#ffffff'
  ctx.lineWidth = 2
  ctx.fillStyle = isDeleted ? 'rgba(244, 67, 54, 0.2)' : 'rgba(255,255,255,0.1)'
  
  ctx.fillRect(node.x, node.y, nodeWidth, nodeHeight)
  ctx.strokeRect(node.x, node.y, nodeWidth, nodeHeight)
  // 中间分隔线
  ctx.beginPath()
  ctx.moveTo(node.x + halfWidth, node.y)
  ctx.lineTo(node.x + halfWidth, node.y + nodeHeight)
  ctx.stroke()

  // 地址文字
  ctx.fillStyle = '#ffffff'
  ctx.font = '14px Arial'
  ctx.textAlign = 'left'
  ctx.fillText(node.addr, node.x, node.y - 8)

  // 数据域数值
  ctx.font = 'bold 24px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(String(node.data), node.x + halfWidth / 2, node.y + nodeHeight / 2 + 8)

  // 指针域地址
  ctx.font = '18px Arial'
  if (node.nextAddr) {
    ctx.fillText(node.nextAddr, node.x + halfWidth + halfWidth / 2, node.y + nodeHeight / 2 + 6)
  } else {
    ctx.fillText('NULL', node.x + halfWidth + halfWidth / 2, node.y + nodeHeight / 2 + 6)
  }
}

// 绘制直线箭头
function drawArrow(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) {
  const headLen = 10
  const angle = Math.PI / 6
  const dir = fromY < toY ? 1 : -1

  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(fromX, fromY)
  ctx.lineTo(toX, toY)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(toX, toY)
  ctx.lineTo(toX - headLen * Math.cos(angle), toY - dir * headLen * Math.sin(angle))
  ctx.moveTo(toX, toY)
  ctx.lineTo(toX + headLen * Math.cos(angle), toY - dir * headLen * Math.sin(angle))
  ctx.stroke()
}

// 绘制弯曲箭头（环形链表回指）
function drawCurveArrow(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) {
  const headLen = 10
  const angle = Math.PI / 6
  const curveDepth = 70

  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 2
  ctx.beginPath()
  const midX = (fromX + toX) / 2
  const midY = fromY + curveDepth
  ctx.moveTo(fromX, fromY)
  ctx.quadraticCurveTo(midX, midY, toX, toY)
  ctx.stroke()

  // 计算箭头方向
  const dx = toX - midX
  const dy = toY - midY
  const arrowAngle = Math.atan2(dy, dx)

  ctx.beginPath()
  ctx.moveTo(toX, toY)
  ctx.lineTo(toX - headLen * Math.cos(arrowAngle - angle), toY - headLen * Math.sin(arrowAngle - angle))
  ctx.moveTo(toX, toY)
  ctx.lineTo(toX - headLen * Math.cos(arrowAngle + angle), toY - headLen * Math.sin(arrowAngle + angle))
  ctx.stroke()
}

// 绘制随机指针（紫色虚线，向上弯曲，与next指针区分）
function drawRandomArrow(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) {
  const headLen = 10
  const angle = Math.PI / 6
  const curveDepth = 50

  ctx.save()
  ctx.strokeStyle = '#9c27b0'
  ctx.lineWidth = 2
  ctx.setLineDash([5, 4]) // 虚线样式

  ctx.beginPath()
  const midX = (fromX + toX) / 2
  const midY = fromY - curveDepth
  ctx.moveTo(fromX, fromY)
  ctx.quadraticCurveTo(midX, midY, toX, toY)
  ctx.stroke()

  // 箭头
  const dx = toX - midX
  const dy = toY - midY
  const arrowAngle = Math.atan2(dy, dx)
  ctx.beginPath()
  ctx.setLineDash([])
  ctx.moveTo(toX, toY)
  ctx.lineTo(toX - headLen * Math.cos(arrowAngle - angle), toY - headLen * Math.sin(arrowAngle - angle))
  ctx.moveTo(toX, toY)
  ctx.lineTo(toX - headLen * Math.cos(arrowAngle + angle), toY - headLen * Math.sin(arrowAngle + angle))
  ctx.stroke()
  ctx.restore()
}

// 绘制圆角矩形
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

// 绘制指针
function drawPointerByPos(ctx: CanvasRenderingContext2D, pos: PointerPos) {
  if (pos.arrowX === 0 && pos.arrowFromY === 0) return
  
  const { labelWidth, labelHeight } = config

  ctx.fillStyle = pos.color
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 2
  roundRect(ctx, pos.labelX, pos.labelY, labelWidth, labelHeight, 6)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 18px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(pos.name, pos.labelX + labelWidth / 2, pos.labelY + labelHeight / 2)

  drawArrow(ctx, pos.arrowX, pos.arrowFromY, pos.arrowX, pos.arrowToY)
}

// 主渲染函数
function render() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const nodeMap = buildNodeMap()
  ctx.fillStyle = '#2b2b2b'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  nodeList.value.forEach(node => drawNode(ctx, node))

  // 绘制连接箭头
  nodeList.value.forEach(node => {

    if (node.randomAddr) {
    const targetNode = nodeMap.get(node.randomAddr)
    if (targetNode) {
      const fromX = node.x + config.nodeWidth / 2
      const fromY = node.y
      const toX = targetNode.x + config.nodeWidth / 2
      const toY = targetNode.y + config.nodeHeight
      drawRandomArrow(ctx, fromX, fromY, toX, toY)
    }
  }
    if (node.nextAddr) {
      const nextNode = nodeMap.get(node.nextAddr)
      if (nextNode) {
        const fromX = node.x + config.nodeWidth
        const fromY = node.y + config.nodeHeight / 2
        const toY = nextNode.y + config.nodeHeight / 2

        if (nextNode.x < node.x) {
          // 回指：画向下弯箭头
          drawCurveArrow(ctx, fromX, fromY, nextNode.x + config.nodeWidth / 2, toY)
        } else {
          // 顺向：画直箭头
          drawArrow(ctx, fromX, fromY, nextNode.x, toY)
        }
      }
    }
  })

  currentPoses.forEach(pos => drawPointerByPos(ctx, pos))
}

// 平移动画
function animateTo(targetStep: number) {
  if (isAnimating.value) return
  isAnimating.value = true
  scrollToCenter()

  const startPoses = [...currentPoses]
  currentStep.value = targetStep
  const endPointers = getCurrentPointers()
  const endPoses = endPointers.map(p => calcPointerPos(p))

  const startTime = performance.now()
  function tick(now: number) {
    const progress = Math.min((now - startTime) / animDuration.value, 1)
    const easeProgress = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2

    currentPoses = startPoses.map((start, i) => {
      const end = endPoses[i] || start
      return {
        name: start.name,
        color: start.color,
        labelX: start.labelX + (end.labelX - start.labelX) * easeProgress,
        labelY: start.labelY + (end.labelY - start.labelY) * easeProgress,
        arrowX: start.arrowX + (end.arrowX - start.arrowX) * easeProgress,
        arrowFromY: start.arrowFromY + (end.arrowFromY - start.arrowFromY) * easeProgress,
        arrowToY: start.arrowToY + (end.arrowToY - start.arrowToY) * easeProgress
      }
    })

    render()
    if (progress < 1) {
      animationId = requestAnimationFrame(tick)
    } else {
      isAnimating.value = false
    }
  }
  animationId = requestAnimationFrame(tick)
}

// 自由模式：新增节点
function addNode() {
  if (props.mode !== 'free') return
  const lastNode = freeNodeList.value[freeNodeList.value.length - 1]
  const newAddr = String(Number(lastNode.addr) + 1000)
  const newData = lastNode.data + 10
  const newNode: ListNodeData = {
    addr: newAddr,
    data: newData,
    nextAddr: null,
    x: lastNode.x + config.gap,
    y: config.nodeY
  }
  lastNode.nextAddr = newAddr
  freeNodeList.value.push(newNode)

  nextTick(() => {
    const scrollContainer = document.querySelector('.canvas-scroll') as HTMLElement
    if (scrollContainer) {
      scrollContainer.scrollLeft = scrollContainer.scrollWidth
    }
    currentPoses = getCurrentPointers().map(p => calcPointerPos(p))
    render()
  })
}

// 自由模式：删除节点
function removeNode() {
  if (props.mode !== 'free' || freeNodeList.value.length <= 1) return
  freeNodeList.value.pop()
  const newLast = freeNodeList.value[freeNodeList.value.length - 1]
  newLast.nextAddr = null

  if (currentStep.value >= freeNodeList.value.length) {
    currentStep.value = freeNodeList.value.length - 1
  }

  nextTick(() => {
  currentPoses = getCurrentPointers().map(p => calcPointerPos(p))
  render()
  // 新增滚动条复位
  const scrollDom = document.querySelector('.canvas-scroll') as HTMLElement
  if(scrollDom) scrollToCenter()
})
}

// 节点拖拽开始
function handleMouseDown(e: MouseEvent) {
  if (props.mode !== 'free') return
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  const x = (e.clientX - rect.left) * scaleX
  const y = (e.clientY - rect.top) * scaleY

  const { nodeWidth, nodeHeight } = config
  for (let i = 0; i < freeNodeList.value.length; i++) {
    const node = freeNodeList.value[i]
    if (x >= node.x && x <= node.x + nodeWidth && y >= node.y && y <= node.y + nodeHeight) {
      isDragging.value = true
      dragNodeIndex = i
      dragOffsetX = x - node.x
      dragOffsetY = y - node.y
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return
    }
  }
}

// 节点拖拽移动
function handleMouseMove(e: MouseEvent) {
  if (!isDragging.value || dragNodeIndex === -1) return
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  const x = (e.clientX - rect.left) * scaleX
  const y = (e.clientY - rect.top) * scaleY

  freeNodeList.value[dragNodeIndex].x = x - dragOffsetX
  freeNodeList.value[dragNodeIndex].y = y - dragOffsetY

  nextTick(() => {
    currentPoses = getCurrentPointers().map(p => calcPointerPos(p))
    render()
  })
}

// 节点拖拽结束
function handleMouseUp() {
  isDragging.value = false
  dragNodeIndex = -1
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
}

// 双击编辑（仅自由模式）
function handleCanvasDblClick(e: MouseEvent) {
  if (props.mode !== 'free') return
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  const x = (e.clientX - rect.left) * scaleX
  const y = (e.clientY - rect.top) * scaleY

  const { nodeWidth, nodeHeight } = config
  for (let i = 0; i < freeNodeList.value.length; i++) {
    const node = freeNodeList.value[i]
    if (x >= node.x && x <= node.x + nodeWidth && y >= node.y && y <= node.y + nodeHeight) {
      const newDataStr = prompt(`修改节点 [${node.addr}] 的数据值：`, String(node.data))
      if (newDataStr !== null) {
        const newData = Number(newDataStr)
        if (!isNaN(newData)) {
          freeNodeList.value[i].data = newData
        }
      }

      const newAddr = prompt(`修改节点 [${node.addr}] 的内存地址：`, node.addr)
      if (newAddr !== null && newAddr.trim() !== '') {
        const oldAddr = node.addr
        freeNodeList.value[i].addr = newAddr
        freeNodeList.value.forEach(n => {
          if (n.nextAddr === oldAddr) {
            n.nextAddr = newAddr
          }
        })
      }

      nextTick(() => {
        currentPoses = getCurrentPointers().map(p => calcPointerPos(p))
        render()
      })
      return
    }
  }
}

function toggleAutoPlay() {
  if (isAutoPlay.value) {
    // 暂停播放
    if (autoPlayTimer) clearInterval(autoPlayTimer)
    autoPlayTimer = null
    isAutoPlay.value = false
  } else {
    // 开始自动播放
    isAutoPlay.value = true
    autoPlayTimer = window.setInterval(() => {
      if (currentStep.value < totalSteps.value - 1) {
        nextStep()
      } else {
        // 播到最后一步自动停止
        if (autoPlayTimer) clearInterval(autoPlayTimer)
        autoPlayTimer = null
        isAutoPlay.value = false
      }
    }, autoPlayInterval.value)
  }
}

function exportCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const link = document.createElement('a')
  link.download = `链表可视化-${Date.now()}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}

// 键盘快捷键
function handleKeydown(e: KeyboardEvent) {
  if (isAnimating.value) return
  switch(e.key) {
    case 'ArrowLeft':
      prevStep()
      break
    case 'ArrowRight':
      nextStep()
      break
    case ' ':
      e.preventDefault()
      toggleAutoPlay()
      break
    case 'r':
    case 'R':
      reset()
      break
  }
}

function jumpToStep() {
  if (isAnimating.value) return
  animateTo(currentStep.value)
}

// 控制按钮
function nextStep() {
  if (currentStep.value < totalSteps.value - 1) {
    animateTo(currentStep.value + 1)
  }
}
function prevStep() {
  if (currentStep.value > 0) {
    animateTo(currentStep.value - 1)
  }
}
function reset() {
  if (animationId) cancelAnimationFrame(animationId)
  isAnimating.value = false
  currentStep.value = 0
  if (props.mode === 'free') {
    freeNodeList.value = generateFreeNodes()
  }
  nextTick(() => {
  currentPoses = getCurrentPointers().map(p => calcPointerPos(p))
  render()
  // 新增滚动条复位
  const scrollDom = document.querySelector('.canvas-scroll') as HTMLElement
  if(scrollDom) scrollToCenter()
})
}

// 监听题目切换
watch(() => props.problem, () => {
  if (props.mode === 'problem') {
    currentStep.value = 0
    nextTick(() => {
      currentPoses = getCurrentPointers().map(p => calcPointerPos(p))
      render()
      scrollToCenter()
    })
  }
})

// 监听模式切换
watch(() => props.mode, () => {
  currentStep.value = 0
  nextTick(() => {
    currentPoses = getCurrentPointers().map(p => calcPointerPos(p))
    render()
  })
})

// 监听题目切换
watch(() => props.problem, () => {
  if (props.mode === 'problem') {
    currentStep.value = 0
    nextTick(() => {
  currentPoses = getCurrentPointers().map(p => calcPointerPos(p))
  render()
  // 新增滚动条复位
  const scrollDom = document.querySelector('.canvas-scroll') as HTMLElement
  if(scrollDom) scrollToCenter()
})
  }
})

// 监听模式切换
watch(() => props.mode, () => {
  currentStep.value = 0
  nextTick(() => {
    currentPoses = getCurrentPointers().map(p => calcPointerPos(p))
    render()
  })
})
// 初始化
onMounted(() => {
  nextTick(() => {
    currentPoses = getCurrentPointers().map(p => calcPointerPos(p))
    render()
    scrollToCenter()
  })
  window.addEventListener('keydown', handleKeydown)
  // 新增：绑定滚轮事件
  const scrollDom = document.querySelector('.canvas-scroll') as HTMLElement
  if (scrollDom) scrollDom.addEventListener('wheel', handleCanvasWheel)
})

// 组件卸载时清除自动播放定时器
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (autoPlayTimer) clearInterval(autoPlayTimer)
  if (animationId) cancelAnimationFrame(animationId)
  // 移除滚轮事件
  const scrollDom = document.querySelector('.canvas-scroll') as HTMLElement
  if (scrollDom) scrollDom.removeEventListener('wheel', handleCanvasWheel)
})
</script>

<style scoped>
.canvas-wrapper {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}
.problem-info {
  width: 100%;
  background: rgba(63, 81, 181, 0.1);
  border: 1px solid rgba(63, 81, 0.3);
  border-radius: 8px;
  padding: 12px 20px;
  box-sizing: border-box;
}
.problem-info h3 {
  color: #fff;
  font-size: 16px;
  margin-bottom: 6px;
}
.lc-id {
  color: #888;
  font-size: 13px;
  font-weight: normal;
  margin-left: 10px;
}
.problem-info .desc {
  color: #ddd;
  font-size: 13px;
  line-height: 1.5;
}
.info-panel {
  width: 100%;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,0.2);
  border-radius: 8px;
  padding: 12px 20px;
  box-sizing: border-box;
}
.info-panel h3 {
  margin: 0 0 8px 0;
  color: #fff;
  font-size: 15px;
}
.info-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 20px;
}
.info-item {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  color: #ddd;
  font-size: 12px;
  line-height: 1.4;
}
.info-item .key {
  color: #ffcc00;
  font-weight: bold;
  white-space: nowrap;
}
/* 画布+代码横向分栏 */
.canvas-code-row {
  display: flex;
  gap: 16px;
  width: 100%;
}
.canvas-scroll {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  border-radius: 8px;
  background: #2b2b2b;
  border: none;
  min-height: 0;
}
/* 代码面板样式 */
.code-panel {
  width: 360px;
  background: #1a1a2e;
  border-radius: 8px;
  padding: 12px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  max-height: 420px;
}
.code-panel h4 {
  color: #fff;
  margin: 0 0 10px;
  font-size: 15px;
}
.code-box {
  flex: 1;
  overflow-y: auto;
  font-family: Consolas,monospace;
}
.code-line {
  display: flex;
  padding: 4px 6px;
  font-size: 13px;
  color: #cdd6f4;
}
.code-line.active {
  background: rgba(255, 193, 7, 0.2);
  border-left: 3px #ffc107 solid;
}
.line-num {
  width: 36px;
  color: #8892b0;
  user-select: none;
}
.canvas-scroll::-webkit-scrollbar {
  height: 8px;
}
.canvas-scroll::-webkit-scrollbar-track {
  background: rgba(255,255,0.08);
  border-radius: 4px;
}
.canvas-scroll::-webkit-scrollbar-thumb {
  background: rgba(255,255,0.25);
  border-radius: 4px;
}
canvas {
  display: block;
}
.step-desc {
  width: 100%;
  min-height: 40px;
  padding: 8px 14px;
  background: rgba(255, 204, 0, 0.1);
  border: 1px solid rgba(255, 204, 0, 0.3);
  border-radius: 6px;
  color: #ffcc00;
  font-size: 13px;
  box-sizing: border-box;
  flex-shrink: 0;
}
.control-bar {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding-bottom: 8px;
}
.divider {
  width: 1px;
  height: 20px;
  background: rgba(255,255,0.2);
  margin: 0 4px;
}
button {
  padding: 7px 18px;
  background: #3f51b5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
button:disabled {
  background: #666;
  cursor: not-allowed;
}
.step-info {
  color: white;
  margin-left: 8px;
  font-size: 13px;
}
.tip {
  color: #aaa;
  font-size: 12px;
  margin-left: 16px;
}
@media (max-width: 1024px) {
  .canvas-code-row {
    flex-direction: column;
  }
  .code-panel {
    width: 100%;
    min-height: 220px;
  }
}
@media (max-width: 768px) {
  .info-content {
    grid-template-columns: 1fr;
  }
}

.speed-control {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ddd;
  font-size: 12px;
  margin-left: 10px;
}
.speed-slider {
  width: 80px;
  accent-color: #3f51b5;
  cursor: pointer;
}
.speed-val {
  min-width: 24px;
  text-align: center;
}

.progress-wrap {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.progress-track {
  position: relative;
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.1);
  border-radius: 3px;
}
.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #3f51b5;
  border-radius: 3px;
  pointer-events: none;
}
.progress-slider {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  opacity: 0;
  cursor: pointer;
}

.code-explain {
  margin-top: 10px;
  padding: 10px 12px;
  background: rgba(63, 81, 181, 0.1);
  border: 1px solid rgba(63, 81, 181, 0.3);
  border-radius: 6px;
  flex-shrink: 0;
}
.explain-title {
  display: block;
  color: #ffcc00;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
}
.explain-text {
  color: #e0e0e0;
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}
</style>