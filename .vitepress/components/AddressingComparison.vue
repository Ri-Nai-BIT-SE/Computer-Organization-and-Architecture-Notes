<template>
  <div class="addressing-comparison">
    <div 
      v-for="mode in modes" 
      :key="mode.title" 
      class="addressing-card"
      :class="{ 'addressing-card-active': selected === mode.title }"
      @mouseenter="selected = mode.title"
    >
      <div class="addressing-card-header">
        <span class="addressing-code">{{ mode.code }}</span>
        <h4 class="addressing-title">{{ mode.title }}</h4>
      </div>
      <p class="addressing-desc">{{ mode.desc }}</p>
      
      <!-- 访存次数进度条 -->
      <div class="addressing-mem-info">
        <div class="addressing-mem-label">主存访问次数: {{ mode.mem }}</div>
        <div class="addressing-mem-bars">
          <div 
            v-for="n in 2" 
            :key="n" 
            class="addressing-mem-bar"
            :class="{ 'addressing-mem-bar-active': n <= mode.mem }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('间接寻址')

const modes = [
  { 
    title: '寄存器寻址', 
    code: 'R₁', 
    desc: '操作数就在CPU肚子里，速度最快。', 
    mem: 0 
  },
  { 
    title: '直接寻址', 
    code: '[100H]', 
    desc: '根据指令给的地址，去快递柜(内存)取一次。', 
    mem: 1 
  },
  { 
    title: '间接寻址', 
    code: '@R₀', 
    desc: 'R₀里是取件码，先读R₀得地址，再取快递。', 
    mem: 1 
  }
]
</script>

<style scoped>
.addressing-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.addressing-card {
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background: white;
  transition: all 0.3s;
  cursor: pointer;
}

.addressing-card:hover,
.addressing-card-active {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.addressing-card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.addressing-code {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background: #f1f5f9;
  font-size: 0.75rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
}

.addressing-title {
  font-weight: 700;
  color: #1e293b;
  font-size: 1rem;
}

.addressing-desc {
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.addressing-mem-info {
  margin-top: 0.75rem;
}

.addressing-mem-label {
  font-size: 0.625rem;
  text-transform: uppercase;
  font-weight: 700;
  color: #94a3b8;
  margin-bottom: 0.25rem;
}

.addressing-mem-bars {
  display: flex;
  gap: 0.25rem;
}

.addressing-mem-bar {
  flex: 1;
  height: 0.375rem;
  border-radius: 9999px;
  background: #e2e8f0;
  transition: background 0.3s;
}

.addressing-mem-bar-active {
  background: #f97316;
}

.dark .addressing-card {
  background: #1e293b;
  border-color: #334155;
}

.dark .addressing-card:hover,
.dark .addressing-card-active {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.dark .addressing-code {
  background: #334155;
  color: #f1f5f9;
}

.dark .addressing-title {
  color: #f1f5f9;
}

.dark .addressing-desc {
  color: #94a3b8;
}

.dark .addressing-mem-bar {
  background: #334155;
}
</style>
