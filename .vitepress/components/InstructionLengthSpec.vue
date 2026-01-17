<template>
  <div class="instruction-length-spec">
    <h3 class="instruction-length-title">3. 指令字长结构对比</h3>
    
    <div class="instruction-length-grid">
      <!-- RISC -->
      <div class="instruction-length-section">
        <div class="instruction-length-section-title">RISC (定长指令)</div>
        <div class="instruction-length-examples">
          <div 
            v-for="i in 3" 
            :key="i" 
            class="instruction-length-bar instruction-length-bar-risc"
          >
            <div class="instruction-length-opcode"></div>
            <div class="instruction-length-address"></div>
          </div>
        </div>
        <p class="instruction-length-desc">
          优点：取指简单，适合流水线。<br>代表：ARM, MIPS
        </p>
      </div>

      <!-- CISC -->
      <div class="instruction-length-section">
        <div class="instruction-length-section-title">CISC (变长指令)</div>
        <div class="instruction-length-examples instruction-length-examples-cisc">
          <div class="instruction-length-bar instruction-length-bar-cisc instruction-length-bar-short">
            <div class="instruction-length-bar-label">短指令</div>
          </div>
          <div class="instruction-length-bar instruction-length-bar-cisc instruction-length-bar-medium">
            <div class="instruction-length-bar-label">中指令</div>
          </div>
          <div class="instruction-length-bar instruction-length-bar-cisc instruction-length-bar-long">
            <div class="instruction-length-bar-label">长指令</div>
          </div>
        </div>
        <p class="instruction-length-desc">
          优点：节约存储空间，功能强。<br>代表：x86
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.instruction-length-spec {
  padding: 1.5rem;
  background-color: var(--vp-c-bg);
  border-radius: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  margin: 2rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.instruction-length-title {
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #9333ea;
}

.instruction-length-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.instruction-length-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.instruction-length-section-title {
  text-align: center;
  font-weight: bold;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.instruction-length-examples {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.instruction-length-examples-cisc {
  align-items: flex-start;
}

.instruction-length-bar {
  display: flex;
  height: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.25rem;
  overflow: hidden;
  width: 100%;
}

.instruction-length-bar-risc {
  width: 100%;
}

.instruction-length-opcode {
  width: 25%;
  background-color: var(--vp-c-brand-lighter);
  border-right: 1px solid var(--vp-c-divider);
}

.instruction-length-address {
  width: 75%;
  background-color: rgba(16, 185, 129, 0.2);
}

.instruction-length-bar-cisc {
  position: relative;
  background-color: var(--vp-c-brand-lighter);
  justify-content: center;
  align-items: center;
}

.instruction-length-bar-short {
  width: 50%;
}

.instruction-length-bar-medium {
  width: 100%;
  background-color: var(--vp-c-brand-light);
}

.instruction-length-bar-long {
  width: 120%;
  background-color: var(--vp-c-brand-1);
}

.instruction-length-bar-label {
  font-size: 0.625rem;
  font-style: italic;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.instruction-length-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .instruction-length-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .instruction-length-bar-long {
    width: 100%;
  }
}
</style>
