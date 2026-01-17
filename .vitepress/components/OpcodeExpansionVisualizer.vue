<template>
  <div class="opcode-expansion-viz">
    <h2 class="opcode-expansion-title">扩展操作码逻辑演示</h2>
    <p class="opcode-expansion-subtitle">指令总长 16 位，展示如何从 4 位扩展到 16 位操作码</p>

    <!-- 顶部状态统计 -->
    <div class="opcode-expansion-stats">
      <div 
        v-for="item in instructionStats" 
        :key="item.label" 
        :class="['opcode-expansion-stat-card', activeLevel === item.level ? 'opcode-expansion-stat-active' : '']"
      >
        <div class="opcode-expansion-stat-label">{{ item.label }}</div>
        <div class="opcode-expansion-stat-count">{{ item.count }} 条</div>
        <div class="opcode-expansion-stat-bits">OP长度: {{ item.bits }}位</div>
      </div>
    </div>

    <!-- 指令格式可视化 -->
    <div class="opcode-expansion-visual">
      <div class="opcode-expansion-bit-indices">
        <span>15</span><span>12</span><span>11</span><span>8</span><span>7</span><span>4</span><span>3</span><span>0</span>
      </div>
      
      <div class="opcode-expansion-bar">
        <!-- 基础操作码 OP -->
        <div 
          :class="['opcode-expansion-segment', 'opcode-expansion-op', activeLevel >= 0 ? 'opcode-expansion-op-active' : '']"
        >
          {{ activeLevel === 0 ? '0000~1110' : '1111' }}
          <span class="opcode-expansion-label-top">OP (4位)</span>
        </div>

        <!-- 地址 A1 / 扩展位 -->
        <div 
          :class="['opcode-expansion-segment', 'opcode-expansion-border', 
                  activeLevel >= 1 ? 'opcode-expansion-op-extend' : 'opcode-expansion-addr']"
        >
          {{ activeLevel < 1 ? 'A1' : (activeLevel === 1 ? '0000~1110' : '1111') }}
          <span class="opcode-expansion-label-top" v-if="activeLevel < 1">A1 (4位)</span>
          <span class="opcode-expansion-label-top opcode-expansion-label-extend" v-else>OP扩展</span>
        </div>

        <!-- 地址 A2 / 扩展位 -->
        <div 
          :class="['opcode-expansion-segment', 'opcode-expansion-border', 
                  activeLevel >= 2 ? 'opcode-expansion-op-extend-2' : 'opcode-expansion-addr']"
        >
          {{ activeLevel < 2 ? 'A2' : (activeLevel === 2 ? '0000~1110' : '1111') }}
          <span class="opcode-expansion-label-top" v-if="activeLevel < 2">A2 (4位)</span>
          <span class="opcode-expansion-label-top opcode-expansion-label-extend-2" v-else>OP扩展</span>
        </div>

        <!-- 地址 A3 / 扩展位 -->
        <div 
          :class="['opcode-expansion-segment', 'opcode-expansion-border', 
                  activeLevel >= 3 ? 'opcode-expansion-op-extend-3' : 'opcode-expansion-addr']"
        >
          {{ activeLevel < 3 ? 'A3' : '0000~1111' }}
          <span class="opcode-expansion-label-top" v-if="activeLevel < 3">A3 (4位)</span>
          <span class="opcode-expansion-label-top opcode-expansion-label-extend-3" v-else>OP扩展</span>
        </div>
      </div>
    </div>

    <!-- 交互控制 -->
    <div class="opcode-expansion-controls">
      <div class="opcode-expansion-buttons">
        <button 
          v-for="(btn, index) in steps" 
          :key="index"
          @click="activeLevel = index"
          :class="['opcode-expansion-btn', activeLevel === index ? 'opcode-expansion-btn-active' : '']"
        >
          {{ btn.name }}
        </button>
      </div>

      <!-- 动态说明文字 -->
      <div class="opcode-expansion-description">
        <p class="opcode-expansion-desc-title">>> 当前状态：{{ steps[activeLevel].name }}</p>
        <p class="opcode-expansion-desc-text">{{ steps[activeLevel].desc }}</p>
        <p class="opcode-expansion-desc-range">
          编码范围：<span class="opcode-expansion-range">{{ steps[activeLevel].range }}</span>
        </p>
      </div>
    </div>

    <!-- 核心原则提示 -->
    <div class="opcode-expansion-principles">
      <div class="opcode-expansion-principle opcode-expansion-principle-1">
        <strong class="opcode-expansion-principle-title">关键原则 1：前缀不重叠</strong>
        短操作码（如0000）不能是长操作码的前缀。因此我们必须牺牲"1111"这个状态作为通往下一级的"大门"。
      </div>
      <div class="opcode-expansion-principle opcode-expansion-principle-2">
        <strong class="opcode-expansion-principle-title">关键原则 2：空间平移</strong>
        将原本用于寻址的 A1, A2 字段，在指令不需要那么多地址时，拨给 OP 字段使用。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeLevel = ref(0);

const instructionStats = [
  { label: '三地址', count: 15, bits: 4, level: 0 },
  { label: '二地址', count: 15, bits: 8, level: 1 },
  { label: '一地址', count: 15, bits: 12, level: 2 },
  { label: '零地址', count: 16, bits: 16, level: 3 },
];

const steps = [
  {
    name: '三地址指令',
    range: '0000 ... 1110',
    desc: '使用前4位作为操作码。可以定义15条指令。留下 1111 作为扩展窗口，告诉CPU：如果看到1111，请继续往后读。'
  },
  {
    name: '二地址指令',
    range: '1111 0000 ... 1111 1110',
    desc: '前4位固定为1111，借用 A1 的4位。现在操作码变成了8位。依然留下 1111 1111 作为下一级的入口。'
  },
  {
    name: '一地址指令',
    range: '1111 1111 0000 ... 1111 1111 1110',
    desc: '前8位固定为1111 1111，再借用 A2 的4位。操作码长度达到12位。'
  },
  {
    name: '零地址指令',
    range: '1111 1111 1111 0000 ... 1111 1111 1111 1111',
    desc: '前12位全部占满，最后 A3 的4位全部用于编码。因为后面没有地址位可以借了，所以 1111 1111 1111 1111 也可以作为一条指令，共16条。'
  }
];
</script>

<style scoped>
.opcode-expansion-viz {
  padding: 1.5rem;
  max-width: 56rem;
  margin: 2rem auto;
  background-color: var(--vp-c-bg-soft);
  border-radius: 1rem;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.opcode-expansion-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #4f46e5;
}

.dark .opcode-expansion-title {
  color: #818cf8;
}

.opcode-expansion-subtitle {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.opcode-expansion-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.opcode-expansion-stat-card {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 2px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  transition: all 0.3s ease;
}

.opcode-expansion-stat-active {
  border-color: #4f46e5;
  background-color: rgba(79, 70, 229, 0.1);
  transform: scale(1.05);
  box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);
}

.dark .opcode-expansion-stat-active {
  background-color: rgba(79, 70, 229, 0.2);
  border-color: #818cf8;
}

.opcode-expansion-stat-label {
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.opcode-expansion-stat-count {
  font-size: 1.25rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #4f46e5;
  margin-bottom: 0.125rem;
}

.dark .opcode-expansion-stat-count {
  color: #818cf8;
}

.opcode-expansion-stat-bits {
  font-size: 0.625rem;
  color: var(--vp-c-text-2);
}

.opcode-expansion-visual {
  background-color: var(--vp-c-bg);
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.opcode-expansion-bit-indices {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  color: var(--vp-c-text-2);
}

.opcode-expansion-bar {
  display: flex;
  height: 4rem;
  border: 2px solid var(--vp-c-text-1);
  border-radius: 0.5rem;
  overflow: hidden;
  font-family: 'Courier New', monospace;
  position: relative;
}

.opcode-expansion-segment {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  position: relative;
  font-weight: bold;
  font-size: 0.875rem;
}

.opcode-expansion-border {
  border-left: 2px solid var(--vp-c-text-1);
}

.opcode-expansion-op {
  background-color: #e5e7eb;
  color: var(--vp-c-text-1);
}

.opcode-expansion-op-active {
  background-color: #4f46e5;
  color: white;
}

.dark .opcode-expansion-op-active {
  background-color: #6366f1;
}

.opcode-expansion-addr {
  background-color: #10b981;
  color: white;
}

.opcode-expansion-op-extend {
  background-color: #6366f1;
  color: white;
}

.opcode-expansion-op-extend-2 {
  background-color: #818cf8;
  color: white;
}

.opcode-expansion-op-extend-3 {
  background-color: #a5b4fc;
  color: var(--vp-c-text-1);
}

.dark .opcode-expansion-op-extend-3 {
  color: white;
}

.opcode-expansion-label-top {
  position: absolute;
  top: -1.5rem;
  font-size: 0.625rem;
  font-weight: bold;
  color: #10b981;
}

.opcode-expansion-label-extend {
  color: #6366f1;
}

.opcode-expansion-label-extend-2 {
  color: #818cf8;
}

.opcode-expansion-label-extend-3 {
  color: #a5b4fc;
}

.opcode-expansion-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.opcode-expansion-buttons {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.opcode-expansion-btn {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: bold;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.opcode-expansion-btn:hover {
  background-color: var(--vp-c-bg-soft);
}

.opcode-expansion-btn-active {
  background-color: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

.dark .opcode-expansion-btn-active {
  background-color: #6366f1;
  border-color: #6366f1;
}

.opcode-expansion-description {
  background-color: #1e1b4b;
  color: #c7d2fe;
  padding: 1rem;
  border-radius: 0.75rem;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  min-height: 6.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.dark .opcode-expansion-description {
  background-color: #312e81;
}

.opcode-expansion-desc-title {
  color: #fbbf24;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.opcode-expansion-desc-text {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.opcode-expansion-desc-range {
  margin-top: 0.5rem;
  color: #a5b4fc;
}

.opcode-expansion-range {
  background-color: #312e81;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-weight: bold;
}

.dark .opcode-expansion-range {
  background-color: #1e1b4b;
}

.opcode-expansion-principles {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}

.opcode-expansion-principle {
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  line-height: 1.5;
}

.opcode-expansion-principle-1 {
  background-color: rgba(254, 226, 226, 0.5);
  border: 1px solid rgba(254, 202, 202, 0.5);
}

.dark .opcode-expansion-principle-1 {
  background-color: rgba(127, 29, 29, 0.3);
  border-color: rgba(220, 38, 38, 0.3);
}

.opcode-expansion-principle-2 {
  background-color: rgba(219, 234, 254, 0.5);
  border: 1px solid rgba(191, 219, 254, 0.5);
}

.dark .opcode-expansion-principle-2 {
  background-color: rgba(30, 58, 138, 0.3);
  border-color: rgba(59, 130, 246, 0.3);
}

.opcode-expansion-principle-title {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: bold;
}

.opcode-expansion-principle-1 .opcode-expansion-principle-title {
  color: #dc2626;
}

.dark .opcode-expansion-principle-1 .opcode-expansion-principle-title {
  color: #f87171;
}

.opcode-expansion-principle-2 .opcode-expansion-principle-title {
  color: #2563eb;
}

.dark .opcode-expansion-principle-2 .opcode-expansion-principle-title {
  color: #60a5fa;
}

@media (max-width: 768px) {
  .opcode-expansion-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .opcode-expansion-principles {
    flex-direction: column;
  }
  
  .opcode-expansion-bar {
    flex-direction: column;
    height: auto;
  }
  
  .opcode-expansion-segment {
    height: 3rem;
  }
  
  .opcode-expansion-border {
    border-left: none;
    border-top: 2px solid var(--vp-c-text-1);
  }
  
  .opcode-expansion-label-top {
    top: auto;
    left: 0.5rem;
    font-size: 0.5rem;
  }
}
</style>
