<template>
  <div class="address-mode-sim">
    <h3 class="address-mode-title">1. N 地址指令逻辑演示</h3>
    
    <!-- 切换按钮 -->
    <div class="address-mode-buttons">
      <button 
        v-for="n in [0, 1, 2, 3]" 
        :key="n" 
        @click="mode = n"
        :class="['address-mode-btn', mode === n ? 'address-mode-btn-active' : 'address-mode-btn-inactive']"
      >
        {{ n }} 地址指令
      </button>
    </div>

    <!-- 指令视觉结构 -->
    <div class="address-mode-structure">
      <div class="address-mode-instruction">
        <div class="address-mode-opcode">OP (操作码)</div>
        <div 
          v-for="i in mode" 
          :key="i" 
          class="address-mode-address"
        >
          A{{ i }}
        </div>
        <div v-if="mode === 0" class="address-mode-implicit">隐含地址</div>
      </div>
    </div>

    <!-- 逻辑说明 -->
    <div class="address-mode-logic">
      <div class="address-mode-logic-label">执行逻辑:</div>
      <div class="address-mode-logic-formula">
        <span v-if="mode === 3">(A1) OP (A2) → A3</span>
        <span v-if="mode === 2">(A1) OP (A2) → A1 <span class="address-mode-warning">(破坏 A1)</span></span>
        <span v-if="mode === 1">(ACC) OP (A1) → ACC</span>
        <span v-if="mode === 0">(Stack Top) OP (Next) → Stack</span>
      </div>
      <div class="address-mode-logic-desc">
        {{ descriptions[mode] }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const mode = ref(3);
const descriptions = {
  3: "三地址指令：编程最直观，但指令字太长，需4次访存。",
  2: "二地址指令：最常用。结果存回 A1，节省了空间但覆盖了原始数据。",
  1: "一地址指令：利用累加器(ACC)作为隐含的源和目的地，缩短指令长度。",
  0: "零地址指令：利用堆栈(Stack)操作，常见于子程序调用或栈式计算机。"
};
</script>

<style scoped>
.address-mode-sim {
  padding: 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  margin: 2rem 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.address-mode-title {
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--vp-c-brand-1);
}

.address-mode-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.address-mode-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  font-weight: 500;
}

.address-mode-btn-inactive {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.address-mode-btn-inactive:hover {
  border-color: var(--vp-c-brand-1);
}

.address-mode-btn-active {
  background-color: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.address-mode-structure {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  min-height: 4rem;
}

.address-mode-instruction {
  display: flex;
  border: 2px solid var(--vp-c-text-1);
  border-radius: 0.375rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 3rem;
}

.address-mode-opcode {
  background-color: var(--vp-c-brand-1);
  color: white;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  white-space: nowrap;
}

.address-mode-address {
  background-color: #10b981;
  color: white;
  padding: 0 1rem;
  border-left: 2px solid var(--vp-c-text-1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
  white-space: nowrap;
}

.address-mode-implicit {
  padding: 0 2rem;
  display: flex;
  align-items: center;
  color: var(--vp-c-text-2);
  font-style: italic;
  background-color: var(--vp-c-bg);
}

.address-mode-logic {
  background-color: var(--vp-c-bg);
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid var(--vp-c-brand-1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.address-mode-logic-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.address-mode-logic-formula {
  font-size: 1.125rem;
  font-family: 'Courier New', monospace;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.address-mode-warning {
  font-size: 0.75rem;
  color: #ef4444;
}

.dark .address-mode-warning {
  color: #f87171;
}

.address-mode-logic-desc {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}
</style>
