<template>
  <div class="instruction-simulator">
    <div class="simulator-header">
      <h3 class="simulator-title">指令流水仿真: ADD @R₀, R₁</h3>
      <div class="simulator-controls">
        <button @click="reset" class="simulator-btn simulator-btn-secondary">重置</button>
        <button 
          @click="nextStep" 
          :disabled="step >= steps.length - 1" 
          class="simulator-btn simulator-btn-primary"
          :class="{ 'simulator-btn-disabled': step >= steps.length - 1 }"
        >
          下一步 ({{ step + 1 }}/{{ steps.length }})
        </button>
      </div>
    </div>

    <!-- 硬件布局图 -->
    <div class="simulator-grid">
      <div 
        class="hardware-unit"
        :class="{ 'hardware-unit-active': currentArrow === 'PC' }"
      >
        <div class="hardware-unit-label">PC</div>
        <div class="hardware-unit-value">{{ valPC }}</div>
      </div>
      <div 
        class="hardware-unit"
        :class="{ 'hardware-unit-active': currentArrow === 'IR' }"
      >
        <div class="hardware-unit-label">IR</div>
        <div class="hardware-unit-value">{{ valIR }}</div>
      </div>
      <div 
        class="hardware-unit"
        :class="{ 'hardware-unit-active': currentArrow === 'R0' }"
      >
        <div class="hardware-unit-label">R₀ (Ptr)</div>
        <div class="hardware-unit-value">100H</div>
      </div>
      <div 
        class="hardware-unit"
        :class="{ 'hardware-unit-active': currentArrow === 'R1' }"
      >
        <div class="hardware-unit-label">R₁ (Val)</div>
        <div class="hardware-unit-value">50</div>
      </div>
      
      <div class="simulator-bus">
        <div class="simulator-bus-label">数据内部总线 (Internal Bus)</div>
      </div>

      <div 
        class="hardware-unit"
        :class="{ 'hardware-unit-active': currentArrow === 'MAR' }"
      >
        <div class="hardware-unit-label">MAR</div>
        <div class="hardware-unit-value">{{ valMAR }}</div>
      </div>
      <div 
        class="hardware-unit"
        :class="{ 'hardware-unit-active': currentArrow === 'MDR' }"
      >
        <div class="hardware-unit-label">MDR</div>
        <div class="hardware-unit-value">{{ valMDR }}</div>
      </div>
      <div 
        class="hardware-unit hardware-unit-alu"
        :class="{ 'hardware-unit-active': currentArrow === 'ALU' }"
      >
        <div class="hardware-unit-label">ALU</div>
        <div class="hardware-unit-value">+</div>
      </div>
      <div 
        class="hardware-unit hardware-unit-mem"
        :class="{ 'hardware-unit-active': currentArrow === 'Mem' }"
      >
        <div class="hardware-unit-label">Memory</div>
        <div class="hardware-unit-value">{{ valMem }}</div>
      </div>
    </div>

    <!-- 步骤说明描述 -->
    <div class="simulator-step-info">
      <div class="simulator-step-header">STEP {{ step + 1 }}: {{ steps[step].action }}</div>
      <p class="simulator-step-desc">{{ steps[step].desc }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const step = ref(0)
const currentArrow = ref('')

const steps = [
  { action: "(PC) -> MAR", desc: "取指开始：将程序计数器中的地址送往地址寄存器。", target: 'MAR' },
  { action: "Read Memory", desc: "主存根据MAR输出的地址，准备读取二进制指令。", target: 'Mem' },
  { action: "M[MAR] -> MDR", desc: "主存将指令数据放上总线，进入数据寄存器。", target: 'MDR' },
  { action: "(MDR) -> IR", desc: "指令正式进入指令寄存器，等待译码。", target: 'IR' },
  { action: "(PC) + 1 -> PC", desc: "PC自增，指向下一条指令地址。", target: 'PC' },
  { action: "(R0) -> MAR", desc: "取数阶段：R0存放的是地址(100H)，送入MAR。", target: 'MAR' },
  { action: "M[MAR] -> MDR", desc: "从主存100H位置读取实际被加数。", target: 'MDR' },
  { action: "(MDR) -> Y", desc: "将被加数暂存到ALU输入端的寄存器Y。", target: 'ALU' },
  { action: "(R1) + (Y) -> Z", desc: "ALU将R1的值与Y相加，结果暂存到Z。", target: 'ALU' },
  { action: "(Z) -> MDR", desc: "将计算结果送入MDR，准备写入主存。", target: 'MDR' },
  { action: "(R0) -> MAR", desc: "再次确认地址，准备存回R0指向的空间。", target: 'MAR' },
  { action: "Write Memory", desc: "Write操作：将计算结果存入主存指定地址。", target: 'Mem' },
]

const valPC = computed(() => {
  if (step.value >= 4) return '101H'
  return '100H'
})

const valIR = computed(() => {
  if (step.value >= 3) return 'ADD @R0,R1'
  return '---'
})

const valMAR = computed(() => {
  if (step.value === 0 || step.value >= 5) return '100H'
  if (step.value >= 1 && step.value < 5) return '100H'
  return '---'
})

const valMDR = computed(() => {
  if (step.value >= 2 && step.value < 4) return '指令'
  if (step.value >= 6 && step.value < 8) return '30H'
  if (step.value >= 9) return '80H'
  return '---'
})

const valMem = computed(() => {
  if (step.value >= 1) return 'M[100H]'
  return '---'
})

const nextStep = () => {
  if (step.value < steps.length - 1) {
    step.value++
    currentArrow.value = steps[step.value].target
  }
}

const reset = () => {
  step.value = 0
  currentArrow.value = steps[0].target
}

// 初始化
currentArrow.value = steps[0].target
</script>

<style scoped>
.instruction-simulator {
  padding: 1.5rem;
  background: #0f172a;
  color: #f1f5f9;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  border: 1px solid #334155;
  margin: 2rem 0;
}

.simulator-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.simulator-title {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #60a5fa;
}

.simulator-controls {
  display: flex;
  gap: 0.5rem;
}

.simulator-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.simulator-btn-secondary {
  background: #1e293b;
  color: #f1f5f9;
}

.simulator-btn-secondary:hover {
  background: #334155;
}

.simulator-btn-primary {
  background: #2563eb;
  color: white;
}

.simulator-btn-primary:hover:not(.simulator-btn-disabled) {
  background: #1d4ed8;
}

.simulator-btn-disabled {
  background: #1e293b;
  color: #64748b;
  cursor: not-allowed;
}

.simulator-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
}

.simulator-bus {
  grid-column: 1 / -1;
  height: 0.5rem;
  background: #1e3a8a;
  border-radius: 9999px;
  margin: 0.5rem 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.simulator-bus-label {
  position: absolute;
  font-size: 0.625rem;
  color: #93c5fd;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
}

.hardware-unit {
  padding: 0.75rem;
  border: 2px solid #334155;
  border-radius: 0.5rem;
  transition: all 0.3s;
  text-align: center;
  background: #1e293b;
}

.hardware-unit-active {
  border-color: #60a5fa;
  background: rgba(59, 130, 246, 0.2);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
  transform: scale(1.05);
}

.hardware-unit-label {
  font-size: 0.625rem;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.hardware-unit-value {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: white;
}

.hardware-unit-alu {
  background: rgba(127, 29, 29, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
}

.hardware-unit-mem {
  background: rgba(20, 83, 45, 0.2);
  border-color: rgba(34, 197, 94, 0.5);
}

.simulator-step-info {
  background: #1e293b;
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid #3b82f6;
  min-height: 100px;
}

.simulator-step-header {
  font-size: 0.875rem;
  color: #93c5fd;
  font-family: 'Courier New', monospace;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.simulator-step-desc {
  color: #e2e8f0;
  line-height: 1.6;
}
</style>
