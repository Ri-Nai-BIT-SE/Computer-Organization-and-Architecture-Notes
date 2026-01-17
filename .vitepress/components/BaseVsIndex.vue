<template>
  <div class="base-vs-index">
    <h3 class="base-vs-index-title">3. 基址寻址 vs 变址寻址</h3>
    
    <div class="base-vs-index-grid">
      <!-- 基址寻址 -->
      <div class="base-vs-index-section">
        <div class="base-vs-index-header base-vs-index-header-base">
          基址寻址 (面向操作系统)
        </div>
        <div class="base-vs-index-visual">
          <div class="base-vs-index-visual-label">内存布局 (Program Relocation)</div>
          <!-- 模拟程序移动 -->
          <div 
            :style="{ transform: `translateY(${baseOffset}px)` }" 
            class="base-vs-index-program"
          >
            <div class="base-vs-index-program-title">程序块 (基地址 Rb)</div>
            <div class="base-vs-index-program-formula">EA = Rb + A</div>
          </div>
          <button 
            @click="moveProgram" 
            class="base-vs-index-button base-vs-index-button-base"
          >
            重定位程序
          </button>
        </div>
        <p class="base-vs-index-explanation">
          <b>本质：</b>解决程序在内存里的"落脚点"问题。<br>
          <b>特点：</b>Rb 由 OS 设定，程序运行中<b>通常不变</b>。
        </p>
      </div>

      <!-- 变址寻址 -->
      <div class="base-vs-index-section">
        <div class="base-vs-index-header base-vs-index-header-index">
          变址寻址 (面向程序员)
        </div>
        <div class="base-vs-index-visual">
          <div class="base-vs-index-visual-label">数组遍历 (Array Traversal)</div>
          <div class="base-vs-index-array">
            <div 
              v-for="i in 5" 
              :key="i" 
              :class="['base-vs-index-array-item', activeIndex === i-1 ? 'base-vs-index-array-item-active' : '']"
            >
              Array[{{i-1}}] (地址: A + {{i-1}})
            </div>
          </div>
          <button 
            @click="nextElement" 
            class="base-vs-index-button base-vs-index-button-index"
          >
            下一元素 (Rx++)
          </button>
        </div>
        <p class="base-vs-index-explanation">
          <b>本质：</b>解决数据结构（如数组）的"内部访问"问题。<br>
          <b>特点：</b>Rx 由用户控制，程序运行中<b>频繁改变</b>。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const baseOffset = ref(0);
const moveProgram = () => {
  baseOffset.value = Math.random() * 80;
};

const activeIndex = ref(0);
const nextElement = () => {
  activeIndex.value = (activeIndex.value + 1) % 5;
};
</script>

<style scoped>
.base-vs-index {
  padding: 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  margin: 2rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.base-vs-index-title {
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #7c3aed;
}

.dark .base-vs-index-title {
  color: #a78bfa;
}

.base-vs-index-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.base-vs-index-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.base-vs-index-header {
  padding: 0.75rem;
  border-bottom: 4px solid;
  border-radius: 0.5rem;
  font-weight: bold;
  text-align: center;
}

.base-vs-index-header-base {
  background-color: rgba(147, 51, 234, 0.1);
  border-color: #9333ea;
  color: var(--vp-c-text-1);
}

.dark .base-vs-index-header-base {
  background-color: rgba(147, 51, 234, 0.2);
}

.base-vs-index-header-index {
  background-color: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
  color: var(--vp-c-text-1);
}

.dark .base-vs-index-header-index {
  background-color: rgba(16, 185, 129, 0.2);
}

.base-vs-index-visual {
  position: relative;
  height: 12rem;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  padding: 0.5rem;
  overflow: hidden;
}

.base-vs-index-visual-label {
  font-size: 0.625rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.base-vs-index-program {
  background-color: #9333ea;
  color: white;
  padding: 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  transition: transform 1s ease;
}

.dark .base-vs-index-program {
  background-color: #7c3aed;
}

.base-vs-index-program-title {
  margin-bottom: 0.25rem;
  font-weight: bold;
}

.base-vs-index-program-formula {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.25rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  margin-top: 0.25rem;
}

.base-vs-index-array {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.base-vs-index-array-item {
  height: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  font-size: 0.625rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.base-vs-index-array-item-active {
  background-color: #10b981;
  color: white;
  border-color: #10b981;
}

.dark .base-vs-index-array-item-active {
  background-color: #059669;
}

.base-vs-index-button {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  font-size: 0.625rem;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.base-vs-index-button:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

.base-vs-index-button-base {
  background-color: #9333ea;
}

.dark .base-vs-index-button-base {
  background-color: #7c3aed;
}

.base-vs-index-button-index {
  background-color: #10b981;
}

.dark .base-vs-index-button-index {
  background-color: #059669;
}

.base-vs-index-explanation {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.base-vs-index-explanation b {
  color: var(--vp-c-text-1);
  font-weight: bold;
}

@media (max-width: 768px) {
  .base-vs-index-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
