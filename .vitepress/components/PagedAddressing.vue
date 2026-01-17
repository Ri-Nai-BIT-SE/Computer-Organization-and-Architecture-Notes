<template>
  <div class="paged-addressing">
    <h2 class="paged-addressing-main-title">页面寻址 (Paged Addressing) 原理</h2>
    <p class="paged-addressing-subtitle">原理：物理地址 = 页面起始地址 (高位) + 页内偏移 (低位)</p>

    <!-- 顶层：指令格式 -->
    <div class="paged-addressing-instruction-section">
      <div class="paged-addressing-section-label">指令寄存器 (16位)</div>
      <div class="paged-addressing-instruction-bar">
        <div class="paged-addressing-opcode">OP (操作码)</div>
        <div class="paged-addressing-address">
          A (页内偏移: {{ offset.toString(16).toUpperCase().padStart(3, '0') }}H)
          <div class="paged-addressing-address-hint">指令只提供这部分 (12位)</div>
        </div>
      </div>
    </div>

    <div class="paged-addressing-layout">
      <!-- 左侧：地址拼接逻辑 -->
      <div class="paged-addressing-left">
        <div class="paged-addressing-page-register">
          <div class="paged-addressing-register-label">当前页面寄存器 (Page Register)</div>
          <div class="paged-addressing-register-control">
            <input 
              type="range" 
              v-model.number="pageNo" 
              min="0" 
              max="15" 
              class="paged-addressing-slider"
            >
            <div class="paged-addressing-page-display">#{{ pageNo }}</div>
          </div>
          <p class="paged-addressing-register-hint">提供地址的高 4 位</p>
        </div>

        <div class="paged-addressing-arrow-down">
          <span>↓</span>
        </div>

        <!-- 拼接结果 -->
        <div class="paged-addressing-result">
          <div class="paged-addressing-result-label">拼接生成的物理地址 (EA)</div>
          <div class="paged-addressing-result-binary">
            <span class="paged-addressing-result-page">{{ pageNo.toString(2).padStart(4, '0') }}</span>
            <span class="paged-addressing-result-separator">|</span>
            <span class="paged-addressing-result-offset">{{ offset.toString(2).padStart(12, '0') }}</span>
          </div>
          <div class="paged-addressing-result-hex">
            十六进制: <span class="paged-addressing-result-hex-value">{{ ((pageNo << 12) | offset).toString(16).toUpperCase() }}H</span>
          </div>
        </div>
      </div>

      <!-- 右侧：内存可视化 -->
      <div class="paged-addressing-right">
        <div class="paged-addressing-memory-label">物理内存分布 (分为16页)</div>
        <div class="paged-addressing-pages-grid">
          <div 
            v-for="n in 16" 
            :key="n"
            :class="['paged-addressing-page-item', pageNo === n-1 ? 'paged-addressing-page-item-active' : '']"
          >
            {{ pageNo === n-1 ? '当前激活页' : '页 ' + (n-1) }}
          </div>
        </div>
        <div class="paged-addressing-offset-bar">
          <div 
            class="paged-addressing-offset-bar-fill"
            :style="{ width: (offset / 4096 * 100) + '%' }"
          ></div>
          <div class="paged-addressing-offset-bar-label">
            页内偏移量: {{ ((offset / 4096) * 100).toFixed(1) }}%
          </div>
        </div>
      </div>
    </div>

    <!-- 核心总结 -->
    <div class="paged-addressing-summary">
      <div class="paged-addressing-summary-item paged-addressing-summary-why">
        <b class="paged-addressing-summary-title">为什么需要它？</b>
        如果直接寻址 64KB 内存需要 16 位地址，指令太长。页面寻址让指令只需 12 位，剩下 4 位靠寄存器"补齐"。
      </div>
      <div class="paged-addressing-summary-item paged-addressing-summary-how">
        <b class="paged-addressing-summary-title">地址如何拼接？</b>
        通常不是相加，而是直接**拼接**。页号占高位，页内偏移占低位，效率极高。
      </div>
      <div class="paged-addressing-summary-item paged-addressing-summary-limit">
        <b class="paged-addressing-summary-title">它的局限性？</b>
        如果程序需要访问另一页的数据，必须先修改页面寄存器的内容，这增加了操作步骤。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pageNo = ref(5); // 当前页面号
const offset = ref(2048); // 假设页内偏移
</script>

<style scoped>
.paged-addressing {
  padding: 1.5rem;
  max-width: 56rem;
  margin: 2rem auto;
  background-color: var(--vp-c-bg);
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--vp-c-divider);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--vp-c-text-1);
}

.paged-addressing-main-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #2563eb;
}

.dark .paged-addressing-main-title {
  color: #60a5fa;
}

.paged-addressing-subtitle {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2.5rem;
}

.paged-addressing-instruction-section {
  margin-bottom: 2.5rem;
}

.paged-addressing-section-label {
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.paged-addressing-instruction-bar {
  display: flex;
  height: 3rem;
  border: 2px solid var(--vp-c-text-1);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.paged-addressing-opcode {
  width: 25%;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 2px solid var(--vp-c-text-1);
  color: var(--vp-c-text-2);
  font-style: italic;
  font-size: 0.875rem;
}

.paged-addressing-address {
  flex: 1;
  background-color: #fef3c7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #92400e;
  position: relative;
  font-size: 0.875rem;
}

.dark .paged-addressing-address {
  background-color: #78350f;
  color: #fbbf24;
}

.paged-addressing-address-hint {
  position: absolute;
  bottom: -1.5rem;
  font-size: 0.625rem;
  color: #d97706;
}

.dark .paged-addressing-address-hint {
  color: #fbbf24;
}

.paged-addressing-layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  align-items: center;
  margin-bottom: 2rem;
}

.paged-addressing-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.paged-addressing-page-register {
  padding: 1rem;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 0.75rem;
  border: 2px solid rgba(59, 130, 246, 0.3);
  position: relative;
}

.dark .paged-addressing-page-register {
  background-color: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
}

.paged-addressing-register-label {
  font-size: 0.75rem;
  font-weight: bold;
  color: #3b82f6;
  margin-bottom: 0.5rem;
  display: block;
}

.dark .paged-addressing-register-label {
  color: #60a5fa;
}

.paged-addressing-register-control {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.paged-addressing-slider {
  flex: 1;
  accent-color: #2563eb;
  cursor: pointer;
}

.dark .paged-addressing-slider {
  accent-color: #60a5fa;
}

.paged-addressing-page-display {
  background-color: #2563eb;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-family: 'Courier New', monospace;
  font-size: 1.25rem;
  font-weight: bold;
  min-width: 3rem;
  text-align: center;
}

.dark .paged-addressing-page-display {
  background-color: #3b82f6;
}

.paged-addressing-register-hint {
  font-size: 0.625rem;
  color: #2563eb;
  margin-top: 0.5rem;
}

.dark .paged-addressing-register-hint {
  color: #60a5fa;
}

.paged-addressing-arrow-down {
  display: flex;
  justify-content: center;
  font-size: 1.875rem;
  color: var(--vp-c-text-2);
}

.paged-addressing-arrow-down span {
  animation: bounce 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.25rem);
  }
}

.paged-addressing-result {
  padding: 1rem;
  background-color: #0f172a;
  border-radius: 0.75rem;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.dark .paged-addressing-result {
  background-color: #1e293b;
  border: 1px solid var(--vp-c-divider);
}

.paged-addressing-result-label {
  font-size: 0.625rem;
  color: #94a3b8;
  margin-bottom: 0.25rem;
  display: block;
}

.paged-addressing-result-binary {
  display: flex;
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
}

.paged-addressing-result-page {
  color: #60a5fa;
}

.paged-addressing-result-separator {
  color: #475569;
  margin: 0 0.25rem;
}

.paged-addressing-result-offset {
  color: #fbbf24;
}

.paged-addressing-result-hex {
  text-align: center;
  font-size: 0.875rem;
  color: #94a3b8;
}

.paged-addressing-result-hex-value {
  color: #4ade80;
  font-weight: bold;
}

.paged-addressing-right {
  border: 2px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  padding: 1rem;
  background-color: var(--vp-c-bg-soft);
}

.paged-addressing-memory-label {
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  text-align: center;
}

.paged-addressing-pages-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.paged-addressing-page-item {
  height: 2.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  transition: all 0.3s ease;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-2);
}

.paged-addressing-page-item-active {
  background-color: #2563eb;
  border-color: #1e40af;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
  z-index: 10;
}

.dark .paged-addressing-page-item-active {
  background-color: #3b82f6;
  border-color: #60a5fa;
}

.paged-addressing-offset-bar {
  height: 3rem;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
}

.paged-addressing-offset-bar-fill {
  position: absolute;
  height: 100%;
  background-color: rgba(251, 191, 36, 0.3);
  border-right: 2px solid #f59e0b;
  transition: width 0.3s ease;
}

.dark .paged-addressing-offset-bar-fill {
  background-color: rgba(251, 191, 36, 0.2);
  border-color: #fbbf24;
}

.paged-addressing-offset-bar-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  font-weight: bold;
  color: #92400e;
}

.dark .paged-addressing-offset-bar-label {
  color: #fbbf24;
}

.paged-addressing-summary {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.paged-addressing-summary-item {
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  line-height: 1.5;
}

.paged-addressing-summary-why {
  background-color: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.dark .paged-addressing-summary-why {
  background-color: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.4);
}

.paged-addressing-summary-how {
  background-color: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.dark .paged-addressing-summary-how {
  background-color: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.4);
}

.paged-addressing-summary-limit {
  background-color: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.dark .paged-addressing-summary-limit {
  background-color: rgba(251, 191, 36, 0.2);
  border-color: rgba(251, 191, 36, 0.4);
}

.paged-addressing-summary-title {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: bold;
}

.paged-addressing-summary-why .paged-addressing-summary-title {
  color: #4f46e5;
}

.dark .paged-addressing-summary-why .paged-addressing-summary-title {
  color: #818cf8;
}

.paged-addressing-summary-how .paged-addressing-summary-title {
  color: #059669;
}

.dark .paged-addressing-summary-how .paged-addressing-summary-title {
  color: #10b981;
}

.paged-addressing-summary-limit .paged-addressing-summary-title {
  color: #d97706;
}

.dark .paged-addressing-summary-limit .paged-addressing-summary-title {
  color: #fbbf24;
}

@media (max-width: 768px) {
  .paged-addressing-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .paged-addressing-summary {
    grid-template-columns: 1fr;
  }
}
</style>
