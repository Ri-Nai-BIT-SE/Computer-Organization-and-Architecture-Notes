<template>
  <div class="ieee754-demo">
    <h3 class="ieee754-title">3. IEEE 754 短浮点数透视镜 (32位)</h3>
    
    <!-- 输入区 -->
    <div class="ieee754-input-section">
      <label class="ieee754-input-label">输入十进制数:</label>
      <input 
        type="number" 
        v-model.number="inputNumber" 
        class="ieee754-input"
        step="0.1"
      />
      <div class="ieee754-input-hint">试一试: 12.5, -0.75, 0.1</div>
    </div>

    <!-- 32位位图展示 -->
    <div class="ieee754-bits-section">
      <div class="ieee754-bits-header">
        <span class="ieee754-header-sign">Sign</span>
        <span class="ieee754-header-exp">Exponent (8位)</span>
        <span class="ieee754-header-mant">Mantissa (23位)</span>
      </div>
      <div class="ieee754-bits-display">
        <!-- 符号位 -->
        <div class="ieee754-bit-sign" title="符号位">
          {{ bits.sign }}
        </div>
        <!-- 阶码 -->
        <div class="ieee754-bit-exp" title="移码表示">
          {{ bits.exponent }}
        </div>
        <!-- 尾数 -->
        <div class="ieee754-bit-mant" title="原码，隐藏了1">
          {{ bits.mantissa }}
        </div>
      </div>
      <!-- 16进制展示 -->
      <div class="ieee754-hex">
        Hex: <span class="ieee754-hex-value">0x{{ hexOutput }}</span>
      </div>
    </div>

    <!-- 详细解析区 -->
    <div class="ieee754-details">
      <div class="ieee754-detail-card ieee754-detail-sign">
        <h4 class="ieee754-detail-title">符号位 (S)</h4>
        <p>{{ inputNumber >= 0 ? '0 (正数)' : '1 (负数)' }}</p>
      </div>

      <div class="ieee754-detail-card ieee754-detail-exp">
        <h4 class="ieee754-detail-title">阶码 (E) - 移码</h4>
        <p>真实指数(e): <strong>{{ calcDetails.realExp }}</strong></p>
        <p>偏置值: + 127</p>
        <p>存储值(E): <strong>{{ calcDetails.storedExp }}</strong></p>
        <p class="ieee754-detail-hint">二进制: {{ bits.exponent }}</p>
      </div>

      <div class="ieee754-detail-card ieee754-detail-mant">
        <h4 class="ieee754-detail-title">尾数 (M)</h4>
        <p>规格化形式: 1.M</p>
        <p><strong>1.</strong> <span class="ieee754-mant-preview">{{ bits.mantissa.substring(0, 10) }}...</span></p>
        <p class="ieee754-detail-hint">注意：整数部分的 '1' 被隐藏</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const inputNumber = ref(12.5);

// 使用 ArrayBuffer 直接获取 IEEE 754 的二进制表示
const getIEEE754Data = (num) => {
  try {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, num);
    const uint32 = view.getUint32(0);
    
    // 转为 32 位二进制字符串
    const binStr = uint32.toString(2).padStart(32, '0');
    
    return {
      binStr,
      sign: binStr[0],
      exponent: binStr.slice(1, 9),
      mantissa: binStr.slice(9),
      hex: uint32.toString(16).toUpperCase().padStart(8, '0')
    };
  } catch (e) {
    // 错误处理
    return {
      binStr: '0'.repeat(32),
      sign: '0',
      exponent: '0'.repeat(8),
      mantissa: '0'.repeat(23),
      hex: '00000000'
    };
  }
};

const bits = computed(() => getIEEE754Data(inputNumber.value));
const hexOutput = computed(() => bits.value.hex);

// 反推计算细节用于展示
const calcDetails = computed(() => {
  const expInt = parseInt(bits.value.exponent, 2);
  // 特殊情况处理（全0或全1）略，仅作标准值演示
  return {
    realExp: expInt - 127,
    storedExp: expInt
  };
});
</script>

<style scoped>
.ieee754-demo {
  padding: 1.5rem;
  border: 2px solid var(--vp-c-brand-lighter);
  border-radius: 0.5rem;
  background-color: var(--vp-c-bg-soft);
  margin: 2rem 0;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
}

.ieee754-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--vp-c-brand-1);
}

.ieee754-input-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background-color: var(--vp-c-bg);
  padding: 1rem;
  border-radius: 0.375rem;
  flex-wrap: wrap;
}

.ieee754-input-label {
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.ieee754-input {
  border: 1px solid var(--vp-c-divider);
  padding: 0.5rem;
  border-radius: 0.375rem;
  width: 12rem;
  font-size: 1.125rem;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.ieee754-input:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.ieee754-input-hint {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.ieee754-bits-section {
  margin-bottom: 1.5rem;
}

.ieee754-bits-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
  font-weight: bold;
}

.ieee754-header-sign {
  width: 2rem;
  text-align: center;
  color: #dc2626;
}

.dark .ieee754-header-sign {
  color: #f87171;
}

.ieee754-header-exp {
  width: 200px;
  text-align: center;
  color: #16a34a;
}

.dark .ieee754-header-exp {
  color: #4ade80;
}

.ieee754-header-mant {
  flex: 1;
  text-align: center;
  color: #2563eb;
}

.dark .ieee754-header-mant {
  color: #60a5fa;
}

.ieee754-bits-display {
  display: flex;
  font-family: 'Courier New', monospace;
  font-size: 1.125rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.375rem;
  overflow: hidden;
}

.ieee754-bit-sign {
  background-color: rgba(220, 38, 38, 0.1);
  color: #dc2626;
  padding: 0.5rem;
  width: 2rem;
  text-align: center;
  border-right: 1px solid var(--vp-c-divider);
  font-weight: bold;
}

.dark .ieee754-bit-sign {
  background-color: rgba(220, 38, 38, 0.2);
  color: #f87171;
}

.ieee754-bit-exp {
  background-color: rgba(22, 163, 74, 0.1);
  color: #16a34a;
  padding: 0.5rem;
  width: 200px;
  text-align: center;
  border-right: 1px solid var(--vp-c-divider);
  letter-spacing: 0.1em;
  font-weight: bold;
}

.dark .ieee754-bit-exp {
  background-color: rgba(22, 163, 74, 0.2);
  color: #4ade80;
}

.ieee754-bit-mant {
  background-color: rgba(37, 99, 235, 0.1);
  color: #2563eb;
  padding: 0.5rem;
  flex: 1;
  text-align: center;
  word-break: break-all;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.dark .ieee754-bit-mant {
  background-color: rgba(37, 99, 235, 0.2);
  color: #60a5fa;
}

.ieee754-hex {
  text-align: right;
  margin-top: 0.5rem;
  font-family: 'Courier New', monospace;
  color: var(--vp-c-text-2);
}

.ieee754-hex-value {
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.ieee754-details {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  font-size: 0.875rem;
}

@media (min-width: 768px) {
  .ieee754-details {
    grid-template-columns: repeat(3, 1fr);
  }
}

.ieee754-detail-card {
  padding: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid;
}

.ieee754-detail-sign {
  background-color: rgba(220, 38, 38, 0.1);
  border-color: rgba(220, 38, 38, 0.3);
}

.dark .ieee754-detail-sign {
  background-color: rgba(220, 38, 38, 0.2);
  border-color: rgba(220, 38, 38, 0.4);
}

.ieee754-detail-exp {
  background-color: rgba(22, 163, 74, 0.1);
  border-color: rgba(22, 163, 74, 0.3);
}

.dark .ieee754-detail-exp {
  background-color: rgba(22, 163, 74, 0.2);
  border-color: rgba(22, 163, 74, 0.4);
}

.ieee754-detail-mant {
  background-color: rgba(37, 99, 235, 0.1);
  border-color: rgba(37, 99, 235, 0.3);
}

.dark .ieee754-detail-mant {
  background-color: rgba(37, 99, 235, 0.2);
  border-color: rgba(37, 99, 235, 0.4);
}

.ieee754-detail-title {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.ieee754-detail-sign .ieee754-detail-title {
  color: #dc2626;
}

.dark .ieee754-detail-sign .ieee754-detail-title {
  color: #f87171;
}

.ieee754-detail-exp .ieee754-detail-title {
  color: #16a34a;
}

.dark .ieee754-detail-exp .ieee754-detail-title {
  color: #4ade80;
}

.ieee754-detail-mant .ieee754-detail-title {
  color: #2563eb;
}

.dark .ieee754-detail-mant .ieee754-detail-title {
  color: #60a5fa;
}

.ieee754-detail-hint {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

.ieee754-mant-preview {
  color: #2563eb;
}

.dark .ieee754-mant-preview {
  color: #60a5fa;
}

@media (max-width: 640px) {
  .ieee754-bits-display {
    flex-direction: column;
  }
  
  .ieee754-bit-sign,
  .ieee754-bit-exp,
  .ieee754-bit-mant {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  
  .ieee754-bit-mant {
    border-bottom: none;
  }
  
  .ieee754-bits-header {
    display: none;
  }
}
</style>
