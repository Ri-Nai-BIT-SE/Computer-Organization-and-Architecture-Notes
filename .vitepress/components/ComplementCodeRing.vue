<template>
  <div class="complement-ring-container">
    <h3 class="complement-ring-title">8位整数补码循环圆环 (模 256)</h3>
    
    <div class="complement-ring-wrapper">
      <svg width="400" height="400" viewBox="0 0 400 400" class="complement-ring-svg">
        <circle cx="200" cy="200" r="150" fill="none" class="complement-ring-circle" stroke-width="40" />
        
        <g v-for="(item, index) in scaleData" :key="index">
          <line 
            :x1="getPos(index, 130).x" :y1="getPos(index, 130).y"
            :x2="getPos(index, 170).x" :y2="getPos(index, 170).y"
            class="complement-ring-tick"
            stroke-width="1"
          />
          <text 
            v-if="index % 32 === 0"
            :x="getPos(index, 190).x" 
            :y="getPos(index, 190).y"
            class="complement-ring-label"
            font-size="12"
            text-anchor="middle"
            dominant-baseline="middle"
          >
            {{ item.val }}
          </text>
        </g>

        <line :x1="200" :y1="50" :x2="200" :y2="90" class="complement-ring-positive-marker" stroke-width="4" />
        <line :x1="200" :y1="310" :x2="200" :y2="350" class="complement-ring-negative-marker" stroke-width="4" />
        <text x="320" y="120" class="complement-ring-positive-label" font-weight="bold">正数区</text>
        <text x="40" y="120" class="complement-ring-negative-label" font-weight="bold">负数区</text>
      </svg>

      <div class="complement-ring-center">
        <div class="complement-ring-center-text">模运算逻辑</div>
        <div class="complement-ring-center-formula">[x]补 = M + x</div>
      </div>
    </div>

    <div class="complement-ring-info">
      <div class="complement-ring-info-item complement-ring-info-zero">
        <p class="complement-ring-info-title">零点 (0000 0000)</p>
        <p>正负在此汇合，补码唯一</p>
      </div>
      <div class="complement-ring-info-item complement-ring-info-overflow">
        <p class="complement-ring-info-title">溢出点 (1000 0000)</p>
        <p>从 +127 跨越到 -128</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// 生成圆环刻度数据（8位补码，256个点，这里取样展示）
const scaleData = computed(() => {
  const data = [];
  for (let i = 0; i < 256; i++) {
    // 补码逻辑：0-127是正数，128-255是负数（即x-256）
    const val = i <= 127 ? i : i - 256;
    data.push({ val });
  }
  return data;
});

// 根据索引计算刻度坐标
const getPos = (index, radius) => {
  // 旋转 -90 度让 0 点在正上方
  const angle = (index / 256) * 2 * Math.PI - Math.PI / 2;
  return {
    x: 200 + radius * Math.cos(angle),
    y: 200 + radius * Math.sin(angle)
  };
};
</script>

<style scoped>
.complement-ring-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 0.75rem;
  color: var(--vp-c-text-1);
  margin: 2rem 0;
  border: 1px solid var(--vp-c-divider);
}

.complement-ring-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.complement-ring-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.complement-ring-wrapper svg {
  filter: drop-shadow(0 0 10px rgba(0,0,0,0.5));
}

.complement-ring-circle {
  stroke: var(--vp-c-divider);
}

.complement-ring-tick {
  stroke: var(--vp-c-text-2);
  opacity: 0.6;
}

.complement-ring-label {
  fill: currentColor;
}

.complement-ring-positive-marker {
  stroke: #10b981;
}

.complement-ring-negative-marker {
  stroke: #ef4444;
}

.complement-ring-positive-label {
  fill: #10b981;
}

.complement-ring-negative-label {
  fill: #ef4444;
}

.complement-ring-center {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.complement-ring-center-text {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.complement-ring-center-formula {
  font-size: 1.5rem;
  font-family: 'Courier New', monospace;
  color: var(--vp-c-brand-1);
}

.complement-ring-info {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  font-size: 0.875rem;
  width: 100%;
  max-width: 600px;
}

.complement-ring-info-item {
  padding: 0.75rem;
  border-radius: 0.375rem;
}

.complement-ring-info-zero {
  border: 1px solid rgba(34, 197, 94, 0.3);
  background-color: rgba(34, 197, 94, 0.1);
}

.complement-ring-info-overflow {
  border: 1px solid rgba(239, 68, 68, 0.3);
  background-color: rgba(239, 68, 68, 0.1);
}

.complement-ring-info-title {
  color: #4ade80;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.complement-ring-info-overflow .complement-ring-info-title {
  color: #f87171;
}

@media (max-width: 640px) {
  .complement-ring-container {
    padding: 1rem;
  }
  
  .complement-ring-wrapper svg {
    width: 100%;
    height: auto;
    max-width: 350px;
  }
  
  .complement-ring-info {
    grid-template-columns: 1fr;
  }
}
</style>
