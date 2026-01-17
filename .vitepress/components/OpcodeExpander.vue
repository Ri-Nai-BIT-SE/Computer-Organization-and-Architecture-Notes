<template>
  <div class="opcode-expander">
    <h3 class="opcode-expander-title">2. 扩展操作码演示 (16位指令)</h3>
    <p class="opcode-expander-desc">每个地址占 4 位。观察三地址指令如何留出 "1111" 供二地址指令使用。</p>

    <div class="opcode-expander-content">
      <!-- 三地址层级 -->
      <div class="opcode-expander-level">
        <div class="opcode-expander-level-header">
          <span class="opcode-expander-level-title">三地址指令层 (4位OP)</span>
          <span class="opcode-expander-level-badge opcode-expander-badge-available">可用: 15 条</span>
        </div>
        <div class="opcode-expander-level-grid">
          <div 
            v-for="i in 14" 
            :key="i" 
            class="opcode-expander-code opcode-expander-code-normal"
          >
            0000...1110
          </div>
          <div class="opcode-expander-code opcode-expander-code-extension">
            1111 (扩展位)
          </div>
        </div>
      </div>

      <!-- 向下箭头 -->
      <div class="opcode-expander-arrow">
        <span>↓</span>
      </div>

      <!-- 二地址层级 -->
      <div class="opcode-expander-level opcode-expander-level-nested">
        <div class="opcode-expander-level-header">
          <span class="opcode-expander-level-title opcode-expander-title-nested">二地址指令层 (8位OP)</span>
          <span class="opcode-expander-level-badge opcode-expander-badge-nested">可用: 15 条</span>
        </div>
        <div class="opcode-expander-level-combined">
          <span class="opcode-expander-prefix">1111</span>
          <span class="opcode-expander-plus">+</span>
          <div class="opcode-expander-level-grid opcode-expander-level-grid-nested">
            <div 
              v-for="i in 3" 
              :key="i" 
              class="opcode-expander-code opcode-expander-code-normal"
            >
              0000...1110
            </div>
            <div class="opcode-expander-code opcode-expander-code-extension">
              1111 (再扩展)
            </div>
          </div>
        </div>
      </div>

      <div class="opcode-expander-principle">
        原理：短操作码不能是长操作码的前缀 (类似哈夫曼树)
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.opcode-expander {
  padding: 1.5rem;
  background-color: #0f172a;
  color: white;
  border-radius: 0.75rem;
  margin: 2rem 0;
}

.dark .opcode-expander {
  background-color: #1e293b;
  border: 1px solid var(--vp-c-divider);
}

.opcode-expander-title {
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #4ade80;
}

.opcode-expander-desc {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-bottom: 1rem;
}

.opcode-expander-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.opcode-expander-level {
  border: 1px solid #334155;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: rgba(15, 23, 42, 0.5);
}

.dark .opcode-expander-level {
  background-color: rgba(30, 41, 59, 0.5);
  border-color: #475569;
}

.opcode-expander-level-nested {
  margin-left: 2rem;
}

.opcode-expander-level-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.opcode-expander-level-title {
  font-size: 0.875rem;
  font-weight: bold;
}

.opcode-expander-title-nested {
  color: #60a5fa;
}

.opcode-expander-level-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 500;
}

.opcode-expander-badge-available {
  background-color: #16a34a;
  color: white;
}

.opcode-expander-badge-nested {
  background-color: #2563eb;
  color: white;
}

.opcode-expander-level-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
}

.opcode-expander-level-grid-nested {
  flex: 1;
}

.opcode-expander-code {
  padding: 0.25rem;
  text-align: center;
  border-radius: 0.25rem;
}

.opcode-expander-code-normal {
  background-color: #1e293b;
  color: var(--vp-c-text-1);
}

.dark .opcode-expander-code-normal {
  background-color: #334155;
}

.opcode-expander-code-extension {
  background-color: #7f1d1d;
  border: 1px solid #dc2626;
  color: #fca5a5;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.opcode-expander-level-combined {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
}

.opcode-expander-prefix {
  color: #f87171;
  font-weight: bold;
}

.opcode-expander-plus {
  color: #94a3b8;
}

.opcode-expander-arrow {
  display: flex;
  justify-content: center;
  margin: -0.5rem 0;
  color: #4ade80;
  font-size: 1.5rem;
}

.opcode-expander-principle {
  font-size: 0.75rem;
  text-align: center;
  color: #94a3b8;
  font-style: italic;
  margin-top: 1rem;
}

@media (max-width: 640px) {
  .opcode-expander-level-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .opcode-expander-level-nested {
    margin-left: 0;
  }
}
</style>
