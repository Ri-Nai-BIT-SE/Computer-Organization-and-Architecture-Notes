<template>
  <div class="fixed-point-demo">
    <h3 class="fixed-point-title">1. 定点数：小数点的隐含位置</h3>
    
    <!-- 二进制输入区 -->
    <div class="fixed-point-input-section">
      <label class="fixed-point-label">8位二进制机器数 (补码):</label>
      <div class="fixed-point-binary-display">
        <span class="fixed-point-bit fixed-point-sign">{{ binaryInput[0] || '0' }} (符号)</span>
        <span class="fixed-point-bit fixed-point-value" v-for="(bit, i) in binaryInput.slice(1)" :key="i">{{ bit || '0' }}</span>
      </div>
      <input 
        type="text" 
        v-model="binaryInput" 
        maxlength="8" 
        class="fixed-point-input"
        placeholder="输入8位二进制，如 10000001"
        @input="validateBinary"
      />
    </div>

    <!-- 模式切换 -->
    <div class="fixed-point-modes">
      <!-- 定点整数模式 -->
      <div 
        :class="['fixed-point-mode-card', mode === 'int' ? 'fixed-point-mode-active' : '']" 
        @click="mode = 'int'"
      >
        <h4 class="fixed-point-mode-title">定点整数</h4>
        <p class="fixed-point-mode-desc">小数点在末尾</p>
        <div class="fixed-point-mode-display">
          {{ paddedBinary }}<span class="fixed-point-dot">.</span>
        </div>
        <p class="fixed-point-mode-value">真值: {{ parseIntValue }}</p>
      </div>

      <!-- 定点小数模式 -->
      <div 
        :class="['fixed-point-mode-card', mode === 'float' ? 'fixed-point-mode-active float-active' : '']" 
        @click="mode = 'float'"
      >
        <h4 class="fixed-point-mode-title">定点小数</h4>
        <p class="fixed-point-mode-desc">小数点在符号位后</p>
        <div class="fixed-point-mode-display">
          {{ paddedBinary[0] || '0' }}<span class="fixed-point-dot">.</span>{{ paddedBinary.slice(1) }}
        </div>
        <p class="fixed-point-mode-value">真值: {{ parseFloatValue }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const binaryInput = ref('10000001'); // 默认补码
const mode = ref('int');

// 确保输入始终是8位二进制
const paddedBinary = computed(() => {
  const val = binaryInput.value || '';
  return val.padEnd(8, '0').slice(0, 8);
});

const validateBinary = (e) => {
  let value = e.target.value.replace(/[^01]/g, '');
  // 限制最大长度为8位
  if (value.length > 8) {
    value = value.slice(0, 8);
  }
  binaryInput.value = value;
};

// 简单的补码转十进制逻辑（仅演示8位）
const getSignedValue = (binStr) => {
  if (binStr.length !== 8) return '?';
  const isNegative = binStr[0] === '1';
  let value = 0;
  
  if (isNegative) {
    // 补码求原值：负权值 -128 + 其余位权值
    value = -128 + parseInt(binStr.slice(1) || '0', 2);
  } else {
    value = parseInt(binStr || '0', 2);
  }
  return value;
};

const parseIntValue = computed(() => {
  const val = getSignedValue(paddedBinary.value);
  return val !== '?' ? val : '?';
});

const parseFloatValue = computed(() => {
  const intVal = getSignedValue(paddedBinary.value);
  if (intVal === '?') return '?';
  // 定点小数相当于定点整数除以 2^7 (对于8位，1位符号，7位数值)
  return (intVal / 128).toFixed(7);
});
</script>

<style scoped>
.fixed-point-demo {
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  background-color: var(--vp-c-bg-soft);
  margin: 2rem 0;
}

.fixed-point-title {
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.fixed-point-input-section {
  margin-bottom: 1.5rem;
}

.fixed-point-label {
  display: block;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.fixed-point-binary-display {
  display: flex;
  gap: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 1.25rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.fixed-point-bit {
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.fixed-point-sign {
  background-color: var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.fixed-point-value {
  background-color: var(--vp-c-brand-lighter);
  color: var(--vp-c-text-1);
}

.fixed-point-input {
  margin-top: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  padding: 0.5rem;
  width: 100%;
  border-radius: 0.25rem;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: 'Courier New', monospace;
}

.fixed-point-input:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.fixed-point-modes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.fixed-point-mode-card {
  padding: 1rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: var(--vp-c-bg);
}

.fixed-point-mode-card:hover {
  border-color: var(--vp-c-brand-1);
}

.fixed-point-mode-active {
  background-color: var(--vp-c-brand-lighter);
  border-color: var(--vp-c-brand-1);
}

.float-active {
  background-color: rgba(34, 197, 94, 0.15);
  border-color: rgba(34, 197, 94, 0.5);
}

.dark .float-active {
  background-color: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.6);
}

.fixed-point-mode-title {
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-1);
}

.fixed-point-mode-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.fixed-point-mode-display {
  font-family: 'Courier New', monospace;
  margin: 0.5rem 0;
  font-size: 1.125rem;
  color: var(--vp-c-text-1);
}

.fixed-point-dot {
  color: #ef4444;
  font-weight: bold;
  margin: 0 0.125rem;
}

.dark .fixed-point-dot {
  color: #f87171;
}

.fixed-point-mode-value {
  font-weight: bold;
  font-size: 1.25rem;
  color: var(--vp-c-brand-1);
  margin-top: 0.5rem;
}

@media (max-width: 640px) {
  .fixed-point-modes {
    grid-template-columns: 1fr;
  }
}
</style>
