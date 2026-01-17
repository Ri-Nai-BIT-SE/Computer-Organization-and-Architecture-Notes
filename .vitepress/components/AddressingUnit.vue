<template>
  <div class="addressing-unit">
    <h3 class="addressing-unit-title">1. 编址单位与地址位数关系</h3>
    
    <div class="addressing-unit-info">
      <div class="addressing-unit-info-item">
        <p class="addressing-unit-info-label">主存容量</p>
        <div class="addressing-unit-info-value">1 MB (2²⁰ Bytes)</div>
      </div>
      <div class="addressing-unit-info-item">
        <p class="addressing-unit-info-label">机器字长</p>
        <div class="addressing-unit-info-value">32 Bit (4 Bytes)</div>
      </div>
    </div>

    <div class="addressing-unit-modes">
      <!-- 字节编址 -->
      <div 
        @mouseenter="mode = 'byte'" 
        :class="['addressing-unit-mode', mode === 'byte' ? 'addressing-unit-mode-active-byte' : 'addressing-unit-mode-inactive']"
      >
        <div class="addressing-unit-mode-header">
          <span class="addressing-unit-mode-name">按字节编址 (Byte)</span>
          <span class="addressing-unit-mode-bits">需要 20 位地址线</span>
        </div>
        <div class="addressing-unit-mode-visual">
          <div 
            v-for="i in 16" 
            :key="i" 
            class="addressing-unit-byte"
          >
            B{{i-1}}
          </div>
          <div class="addressing-unit-ellipsis">...</div>
        </div>
      </div>

      <!-- 字编址 -->
      <div 
        @mouseenter="mode = 'word'" 
        :class="['addressing-unit-mode', mode === 'word' ? 'addressing-unit-mode-active-word' : 'addressing-unit-mode-inactive']"
      >
        <div class="addressing-unit-mode-header">
          <span class="addressing-unit-mode-name">按字编址 (Word)</span>
          <span class="addressing-unit-mode-bits addressing-unit-bits-word">仅需 18 位地址线</span>
        </div>
        <div class="addressing-unit-mode-visual">
          <div 
            v-for="i in 4" 
            :key="i" 
            class="addressing-unit-word"
          >
            Word {{i-1}} (含4字节)
          </div>
          <div class="addressing-unit-ellipsis">...</div>
        </div>
      </div>
    </div>

    <p class="addressing-unit-principle">
      原理：容量相同时，寻址单位越大，所需的地址编码数量越少（$2^{18} < 2^{20}$）。
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const mode = ref('byte');
</script>

<style scoped>
.addressing-unit {
  padding: 1.5rem;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.addressing-unit-title {
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1e40af;
}

.dark .addressing-unit-title {
  color: #60a5fa;
}

.addressing-unit-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.addressing-unit-info-item {
  flex: 1;
  padding: 1rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 0.5rem;
}

.addressing-unit-info-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.addressing-unit-info-value {
  font-size: 1.5rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #4f46e5;
}

.dark .addressing-unit-info-value {
  color: #818cf8;
}

.addressing-unit-modes {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.addressing-unit-mode {
  padding: 1rem;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  background-color: var(--vp-c-bg-soft);
}

.addressing-unit-mode-inactive {
  opacity: 0.6;
}

.addressing-unit-mode-active-byte {
  border-color: #3b82f6;
  background-color: rgba(59, 130, 246, 0.1);
}

.dark .addressing-unit-mode-active-byte {
  background-color: rgba(59, 130, 246, 0.2);
}

.addressing-unit-mode-active-word {
  border-color: #10b981;
  background-color: rgba(16, 185, 129, 0.1);
}

.dark .addressing-unit-mode-active-word {
  background-color: rgba(16, 185, 129, 0.2);
}

.addressing-unit-mode-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.addressing-unit-mode-name {
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.addressing-unit-mode-bits {
  font-family: 'Courier New', monospace;
  color: #1e40af;
  font-weight: 500;
}

.dark .addressing-unit-mode-bits {
  color: #60a5fa;
}

.addressing-unit-bits-word {
  color: #059669;
}

.dark .addressing-unit-bits-word {
  color: #34d399;
}

.addressing-unit-mode-visual {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
  overflow: hidden;
  flex-wrap: wrap;
}

.addressing-unit-byte {
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid #93c5fd;
  background-color: var(--vp-c-bg);
  font-size: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
}

.addressing-unit-word {
  width: 6rem;
  height: 1.5rem;
  border: 2px solid #34d399;
  background-color: var(--vp-c-bg);
  font-size: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
  font-family: 'Courier New', monospace;
}

.addressing-unit-ellipsis {
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
}

.addressing-unit-principle {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}
</style>
