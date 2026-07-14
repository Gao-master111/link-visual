<template>
  <div class="app-container">
    <!-- 左侧题目列表 -->
    <aside class="sidebar">
      <h2 class="sidebar-title">📚 链表题库</h2>
      <div class="mode-tabs">
        <button 
          class="tab-btn" 
          :class="{ active: mode === 'free' }"
          @click="mode = 'free'"
        >
          自由模式
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: mode === 'problem' }"
          @click="mode = 'problem'"
        >
          题库模式
        </button>
      </div>

      <div v-if="mode === 'problem'" class="problem-list">
        <div 
          v-for="p in problems" 
          :key="p.id"
          class="problem-item"
          :class="{ active: currentProblem?.id === p.id }"
          @click="selectProblem(p)"
        >
          <div class="problem-header">
            <span class="problem-name">{{ p.title }}</span>
            <span class="difficulty" :class="p.difficulty">{{ p.difficulty }}</span>
          </div>
          <div class="problem-id">LeetCode {{ p.leetCodeId }}</div>
        </div>
      </div>

      <div v-if="mode === 'free'" class="free-tip">
        💡 自由模式下可随意增删节点、修改数值，适合手动调试
      </div>
    </aside>

    <!-- 右侧主内容区 -->
    <main class="main-content">
      <h1 class="title">链表可视化平台</h1>
      <LinkCanvas 
        :mode="mode" 
        :problem="currentProblem"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LinkCanvas from './components/LinkCanvas.vue'
import { problems, type Problem } from './data/problems'

const mode = ref<'free' | 'problem'>('free')
const currentProblem = ref<Problem | null>(null)

function selectProblem(p: Problem) {
  currentProblem.value = p
}
</script>

<style>
/* 强制全局清零，消除所有浏览器默认留白 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #2b2b2b;
  font-family: Arial, sans-serif;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.12);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0.2);
}
</style>

<style scoped>
.app-container {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  align-items: stretch;
}

/* 左侧：1份，固定243px，严格1:5比例 */
.sidebar {
  flex: 0 0 243px;
  background: #1e1e1e;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
  height: 100%;
}

.sidebar-title {
  color: #fff;
  font-size: 17px;
}

.mode-tabs {
  display: flex;
  gap: 6px;
  background: #2a2a2a;
  padding: 3px;
  border-radius: 6px;
}

.tab-btn {
  flex: 1;
  padding: 7px 0;
  background: transparent;
  border: none;
  color: #aaa;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.tab-btn.active {
  background: #3f51b5;
  color: #fff;
}

.problem-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.problem-item {
  padding: 10px;
  background: #2a2a2a;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.problem-item:hover {
  border-color: #3f51b5;
}

.problem-item.active {
  border-color: #3f51b5;
  background: rgba(63, 81, 181, 0.2);
}

.problem-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
}

.problem-name {
  color: #fff;
  font-size: 13px;
  font-weight: bold;
}

.difficulty {
  font-size: 11px;
  padding: 1px 5px;
  border-radius: 3px;
}

.difficulty.简单 {
  color: #4caf50;
  background: rgba(76, 175, 80, 0.1);
}

.difficulty.中等 {
  color: #ff9800;
  background: rgba(255, 152, 0, 0.1);
}

.difficulty.困难 {
  color: #f44336;
  background: rgba(244, 67, 54, 0.1);
}

.problem-id {
  color: #888;
  font-size: 11px;
}

.free-tip {
  color: #888;
  font-size: 12px;
  line-height: 1.5;
  padding: 10px;
  background: #2a2a2a;
  border-radius: 6px;
}

/* 右侧：5份，占满剩余1216px宽度 */
.main-content {
  flex: 1;
  height: 100%;
  padding: 16px 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: #2b2b2b;
  min-width: 0;
}

.title {
  color: #ffffff;
  font-size: 26px;
  margin-bottom: 14px;
  flex-shrink: 0;
  text-align: center;
}
</style>