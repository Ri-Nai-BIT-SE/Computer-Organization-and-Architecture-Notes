<template>
  <div class="normalization-demo">
    <h3 class="normalization-title">2. 浮点数规格化演示 (补码)</h3>
    <p class="normalization-desc">规则：符号位(首位)应与最高数值位(次位)不同。0.1xxxx 或 1.0xxxx</p>

    <div class="normalization-display">
      <div class="normalization-exponent">
        <div class="normalization-label">阶码 (E)</div>
        <div class="normalization-value">{{ exponent }}</div>
      </div>
      
      <div class="normalization-operator">× 2 ^</div>
      
      <div class="normalization-mantissa">
        <div class="normalization-label">尾数 (M) - 补码</div>
        <div class="normalization-mantissa-display">
          <!-- 符号位 -->
          <span class="normalization-sign">{{ mantissa[0] }}</span>
          <!-- 小数点 -->
          <span class="normalization-dot">.</span>
          <!-- 数值位 -->
          <span :class="['normalization-body', isNormalized ? 'normalization-normalized' : 'normalization-unnormalized']">
            {{ mantissa.slice(1) }}
          </span>
        </div>
      </div>
    </div>

    <div class="normalization-buttons">
      <button 
        @click="leftShift" 
        class="normalization-btn normalization-btn-left"
        :disabled="isNormalized || mantissa === '000000' || mantissa === '111111'"
      >
        ⬅️ 左规 (尾数左移, 阶码-1)
      </button>
      
      <button 
        @click="rightShift" 
        class="normalization-btn normalization-btn-right"
      >
        ➡️ 右规 (尾数右移, 阶码+1)
      </button>
    </div>

    <div class="normalization-status">
      <span v-if="isNormalized" class="normalization-status-ok">✅ 已规格化</span>
      <span v-else class="normalization-status-warn">
        ⚠️ 未规格化：{{ mantissa === '000000' || mantissa === '111111' ? '机器零' : '需要左规' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const exponent = ref(0);
const mantissa = ref('000101'); // 初始非规格化正数

// 判断是否规格化：补码符号位 != 最高数值位
const isNormalized = computed(() => {
  return mantissa.value[0] !== mantissa.value[1];
});

const leftShift = () => {
  // 左移：丢弃最高数值位，末位补0
  const sign = mantissa.value[0];
  const body = mantissa.value.slice(2) + '0'; 
  mantissa.value = sign + body;
  exponent.value--;
};

const rightShift = () => {
  // 右移（算术右移）：最高位补符号位，低位丢弃
  const sign = mantissa.value[0];
  const body = sign + mantissa.value.slice(1, -1);
  mantissa.value = body;
  exponent.value++;
};
</script>

<style scoped>
.normalization-demo {
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  background-color: var(--vp-c-bg-soft);
  margin: 2rem 0;
}

.normalization-title {
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.normalization-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.normalization-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.normalization-exponent {
  text-align: center;
}

.normalization-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.normalization-value {
  font-size: 1.875rem;
  font-family: 'Courier New', monospace;
  border: 1px solid var(--vp-c-divider);
  padding: 0.5rem;
  width: 4rem;
  background-color: var(--vp-c-bg);
  border-radius: 0.25rem;
}

.normalization-operator {
  font-size: 1.875rem;
  color: var(--vp-c-text-1);
}

.normalization-mantissa {
  text-align: center;
}

.normalization-mantissa-display {
  font-family: 'Courier New', monospace;
  font-size: 1.875rem;
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
}

.normalization-sign {
  background-color: #fef08a;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: var(--vp-c-text-1);
}

.dark .normalization-sign {
  background-color: #ca8a04;
  color: #fef08a;
}

.normalization-dot {
  color: #ef4444;
  font-weight: bold;
  margin: 0 0.25rem;
}

.dark .normalization-dot {
  color: #f87171;
}

.normalization-body {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
  color: var(--vp-c-text-1);
}

.normalization-normalized {
  background-color: #86efac;
}

.dark .normalization-normalized {
  background-color: #16a34a;
  color: #dcfce7;
}

.normalization-unnormalized {
  background-color: #fecaca;
}

.dark .normalization-unnormalized {
  background-color: #dc2626;
  color: #fee2e2;
}

.normalization-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.normalization-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  color: white;
}

.normalization-btn-left {
  background-color: #2563eb;
}

.normalization-btn-left:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.normalization-btn-right {
  background-color: #9333ea;
}

.normalization-btn-right:hover {
  background-color: #7e22ce;
}

.normalization-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.normalization-status {
  text-align: center;
  margin-top: 1rem;
}

.normalization-status-ok {
  color: #16a34a;
  font-weight: bold;
  font-size: 1.125rem;
}

.dark .normalization-status-ok {
  color: #4ade80;
}

.normalization-status-warn {
  color: #dc2626;
  font-weight: bold;
}

.dark .normalization-status-warn {
  color: #f87171;
}

@media (max-width: 640px) {
  .normalization-display {
    flex-direction: column;
  }
  
  .normalization-buttons {
    flex-direction: column;
  }
  
  .normalization-btn {
    width: 100%;
  }
}
</style>
