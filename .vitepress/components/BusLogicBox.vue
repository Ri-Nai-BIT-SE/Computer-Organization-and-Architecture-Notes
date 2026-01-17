<template>
  <div class="bus-logic-box">
    <h4 class="bus-logic-title">
      <span class="bus-logic-indicator"></span>
      单总线冲突仿真 (Bus Conflict)
    </h4>
    
    <div class="bus-logic-layout">
      <div class="bus-logic-reg bus-logic-reg-a">寄存器 A</div>
      <div class="bus-logic-bus">
        <!-- 移动的数据包 -->
        <div 
          v-if="busBusy" 
          class="bus-logic-packet"
        ></div>
        <div class="bus-logic-label">SINGLE BUS</div>
      </div>
      <div class="bus-logic-reg bus-logic-reg-b">寄存器 B</div>
    </div>
    
    <div class="bus-logic-controls">
      <button 
        @click="simulateMove" 
        :disabled="busBusy"
        class="bus-logic-btn"
        :class="{ 'bus-logic-btn-disabled': busBusy }"
      >
        {{ busBusy ? '总线占用中...' : '发起数据传输' }}
      </button>
    </div>
    
    <p class="bus-logic-note">
      注意：在单总线结构中，同一时钟周期只能有一组数据在总线上自由流动。
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const busBusy = ref(false)

const simulateMove = () => {
  if (busBusy.value) return
  busBusy.value = true
  setTimeout(() => {
    busBusy.value = false
  }, 2000)
}
</script>

<style scoped>
.bus-logic-box {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
}

.bus-logic-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.bus-logic-indicator {
  width: 0.5rem;
  height: 0.5rem;
  background: #22c55e;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.bus-logic-layout {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.bus-logic-reg {
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 700;
  font-size: 0.875rem;
}

.bus-logic-reg-a {
  background: #dbeafe;
  color: #1e40af;
}

.bus-logic-reg-b {
  background: #f3e8ff;
  color: #6b21a8;
}

.bus-logic-bus {
  flex: 1;
  height: 2rem;
  background: #1e293b;
  border-radius: 0.5rem;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.bus-logic-packet {
  position: absolute;
  height: 1rem;
  width: 3rem;
  background: #fbbf24;
  border-radius: 0.25rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  animation: bus-move 2s linear forwards;
}

@keyframes bus-move {
  0% {
    left: -10%;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

.bus-logic-label {
  margin: 0 auto;
  font-size: 0.625rem;
  color: #64748b;
  font-family: 'Courier New', monospace;
  z-index: 1;
}

.bus-logic-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.bus-logic-btn {
  padding: 0.5rem 1.5rem;
  background: #1e293b;
  color: white;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.bus-logic-btn:hover:not(.bus-logic-btn-disabled) {
  background: #334155;
  transform: scale(0.95);
}

.bus-logic-btn-disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.bus-logic-note {
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #64748b;
  font-style: italic;
  text-align: center;
}

.dark .bus-logic-box {
  background: #1e293b;
  border-color: #334155;
}

.dark .bus-logic-title {
  color: #f1f5f9;
}

.dark .bus-logic-reg-a {
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
}

.dark .bus-logic-reg-b {
  background: rgba(168, 85, 247, 0.2);
  color: #c4b5fd;
}

.dark .bus-logic-note {
  color: #94a3b8;
}
</style>
