<template>
  <div class="data-addressing-sim">
    <h3 class="data-addressing-title">2. 数据寻址工作流 (A → EA)</h3>

    <div class="data-addressing-layout">
      <!-- 左侧：寻址方式选择 -->
      <div class="data-addressing-modes">
        <button 
          v-for="(info, key) in modes" 
          :key="key" 
          @click="current = key"
          :class="['data-addressing-mode-btn', current === key ? 'data-addressing-mode-btn-active' : '']"
        >
          {{ key }}
        </button>
      </div>

      <!-- 中间：动态逻辑视图 -->
      <div class="data-addressing-visual">
        <div class="data-addressing-formula-section">
          <div class="data-addressing-formula-label">计算公式</div>
          <div class="data-addressing-formula">{{ modes[current].formula }}</div>
        </div>

        <!-- 动态流程示意图 -->
        <div class="data-addressing-flow">
          <div class="data-addressing-instruction">
            指令 [OP | A: {{aValue}}]
          </div>
          <div class="data-addressing-arrow">↓</div>
          
          <!-- 核心变换逻辑 -->
          <div class="data-addressing-transforms">
            <div 
              v-if="modes[current].useReg" 
              class="data-addressing-box data-addressing-reg"
            >
              寄存器 R[{{aValue}}]
            </div>
            <div 
              v-if="modes[current].useMem" 
              class="data-addressing-box data-addressing-mem"
            >
              内存地址 [{{aValue}}]
            </div>
          </div>
          
          <div class="data-addressing-ea">
            有效地址 EA = {{ modes[current].ea }}
          </div>
        </div>

        <!-- 访存次数统计 -->
        <div class="data-addressing-access">
          <div class="data-addressing-access-label">访存次数</div>
          <div class="data-addressing-access-count">{{ modes[current].access }} 次</div>
        </div>
      </div>
    </div>
    
    <div class="data-addressing-desc">
      <span class="data-addressing-desc-title">特点说明：</span> {{ modes[current].desc }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const aValue = 100;
const current = ref('直接寻址');

const modes = {
  '立即寻址': { 
    formula: '操作数 = A', 
    ea: 'N/A', 
    useReg: false, 
    useMem: false, 
    access: 0, 
    desc: '数据就在指令中，不需要访存。常用于赋初值。' 
  },
  '直接寻址': { 
    formula: 'EA = A', 
    ea: '100', 
    useReg: false, 
    useMem: true, 
    access: 1, 
    desc: '简单直观，但寻址范围受指令长度限制。' 
  },
  '间接寻址': { 
    formula: 'EA = (A)', 
    ea: 'Mem[100]', 
    useReg: false, 
    useMem: true, 
    access: 2, 
    desc: '存储地址的地址。可以扩大寻址范围，支持指针。' 
  },
  '寄存器寻址': { 
    formula: '操作数 = (Ri)', 
    ea: 'R[100]', 
    useReg: true, 
    useMem: false, 
    access: 0, 
    desc: '最快！数据在寄存器中，不进内存。' 
  },
  '寄存器间接': { 
    formula: 'EA = (Ri)', 
    ea: 'R[100]', 
    useReg: true, 
    useMem: true, 
    access: 1, 
    desc: '寄存器里存的是地址，需要去内存取一次数。' 
  },
  '相对寻址': { 
    formula: 'EA = (PC) + A', 
    ea: 'PC + 100', 
    useReg: false, 
    useMem: true, 
    access: 1, 
    desc: '相对于当前程序位置跳转，方便程序浮动。' 
  }
};
</script>

<style scoped>
.data-addressing-sim {
  padding: 1.5rem;
  background-color: #0f172a;
  color: white;
  border-radius: 1rem;
  margin: 2rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.dark .data-addressing-sim {
  background-color: #1e293b;
  border: 1px solid var(--vp-c-divider);
}

.data-addressing-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #fbbf24;
}

.data-addressing-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
}

.data-addressing-modes {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.data-addressing-mode-btn {
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: #94a3b8;
}

.data-addressing-mode-btn:hover {
  background-color: #1e293b;
  color: white;
}

.dark .data-addressing-mode-btn:hover {
  background-color: #334155;
}

.data-addressing-mode-btn-active {
  background-color: #4f46e5;
  color: white;
  box-shadow: 0 4px 6px rgba(79, 70, 229, 0.3);
}

.dark .data-addressing-mode-btn-active {
  background-color: #6366f1;
}

.data-addressing-visual {
  background-color: #1e293b;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #334155;
  position: relative;
  overflow: hidden;
}

.dark .data-addressing-visual {
  background-color: #0f172a;
  border-color: #475569;
}

.data-addressing-formula-section {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #334155;
}

.data-addressing-formula-label {
  font-size: 0.75rem;
  color: #818cf8;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
  display: block;
}

.data-addressing-formula {
  font-size: 1.5rem;
  font-family: 'Courier New', monospace;
  color: #4ade80;
  font-weight: bold;
}

.data-addressing-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
}

.data-addressing-instruction {
  padding: 0.5rem 1.5rem;
  border: 2px dashed #818cf8;
  border-radius: 0.5rem;
  font-family: 'Courier New', monospace;
  background-color: rgba(129, 140, 248, 0.1);
}

.data-addressing-arrow {
  color: #818cf8;
  animation: bounce 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  font-size: 1.5rem;
  font-weight: bold;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.25rem);
  }
}

.data-addressing-transforms {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.data-addressing-box {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  border: 1px solid;
}

.data-addressing-reg {
  background-color: #581c87;
  border-color: #a855f7;
  color: white;
}

.data-addressing-mem {
  background-color: #1e3a8a;
  border-color: #3b82f6;
  color: white;
}

.data-addressing-ea {
  color: #4ade80;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  font-size: 1.125rem;
}

.data-addressing-access {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  text-align: right;
}

.data-addressing-access-label {
  font-size: 0.625rem;
  color: #94a3b8;
  display: block;
  margin-bottom: 0.25rem;
}

.data-addressing-access-count {
  font-size: 1.25rem;
  font-weight: bold;
  color: #f87171;
}

.dark .data-addressing-access-count {
  color: #fca5a5;
}

.data-addressing-desc {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #0f172a;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  border-left: 4px solid #fbbf24;
  line-height: 1.5;
}

.dark .data-addressing-desc {
  background-color: #1e293b;
}

.data-addressing-desc-title {
  color: #fbbf24;
  font-weight: bold;
}

@media (max-width: 768px) {
  .data-addressing-layout {
    grid-template-columns: 1fr;
  }
}
</style>
