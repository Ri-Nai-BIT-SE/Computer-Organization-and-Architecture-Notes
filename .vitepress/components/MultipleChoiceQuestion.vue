<template>
  <div class="mcq-container">
    <div class="mcq-question">
      <div class="mcq-number">{{ number }}.</div>
      <div class="mcq-content">
        <div class="mcq-text" v-html="renderedQuestion"></div>
        <div class="mcq-options">
          <div
            v-for="(option, index) in options"
            :key="index"
            class="mcq-option"
            :class="{
              'mcq-option-selected': selectedAnswer === option.key,
              'mcq-option-correct': showAnswer && option.key === correctAnswer,
              'mcq-option-wrong': showAnswer && selectedAnswer === option.key && option.key !== correctAnswer
            }"
            @click="selectAnswer(option.key)"
          >
            <div class="mcq-option-label">{{ option.key }}.</div>
            <div class="mcq-option-text" v-html="renderMarkdown(option.text)"></div>
            <div v-if="showAnswer && option.key === correctAnswer" class="mcq-option-mark">✓</div>
            <div v-if="showAnswer && selectedAnswer === option.key && option.key !== correctAnswer" class="mcq-option-mark wrong">✗</div>
          </div>
        </div>
        <div v-if="showAnswer" class="mcq-feedback">
          <div class="mcq-feedback-content" :class="isCorrect ? 'mcq-feedback-correct' : 'mcq-feedback-wrong'">
            <span class="mcq-feedback-icon">{{ isCorrect ? '✓' : '✗' }}</span>
            <div class="mcq-feedback-main">
              <div class="mcq-feedback-text">{{ isCorrect ? '回答正确！' : `回答错误。正确答案是 ${correctAnswer}。` }}</div>
              <div v-if="selectedExplanation && !isCorrect" class="mcq-feedback-explanation">
                <div class="mcq-explanation-label">您选择的选项：</div>
                <div v-html="renderMarkdown(selectedExplanation)"></div>
              </div>
              <div v-if="correctExplanation && !isCorrect" class="mcq-feedback-explanation">
                <div class="mcq-explanation-label">正确答案解析：</div>
                <div v-html="renderMarkdown(correctExplanation)"></div>
              </div>
              <div v-if="selectedExplanation && isCorrect" class="mcq-feedback-explanation">
                <div v-html="renderMarkdown(selectedExplanation)"></div>
              </div>
              <div v-if="!selectedExplanation && correctExplanation && isCorrect" class="mcq-feedback-explanation">
                <div v-html="renderMarkdown(correctExplanation)"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="mcq-actions">
          <button 
            v-if="showAnswer"
            @click="reset"
            class="mcq-btn mcq-btn-secondary"
          >
            重新作答
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MarkdownIt from 'markdown-it'
import markdownItMathjax3 from 'markdown-it-mathjax3'

// 创建 markdown 渲染器实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
}).use(markdownItMathjax3)

const props = defineProps({
  number: {
    type: Number,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true,
    validator: (options) => {
      return options.every(opt => opt.key && opt.text && (opt.explanation === undefined || typeof opt.explanation === 'string'))
    }
  },
  correctAnswer: {
    type: String,
    required: true,
    validator: (value) => ['A', 'B', 'C', 'D'].includes(value)
  }
})

const selectedAnswer = ref(null)
const showAnswer = ref(false)

const isCorrect = computed(() => {
  return selectedAnswer.value === props.correctAnswer
})

const selectedExplanation = computed(() => {
  if (!selectedAnswer.value) return null
  const selectedOption = props.options.find(opt => opt.key === selectedAnswer.value)
  return selectedOption?.explanation || null
})

const correctExplanation = computed(() => {
  const correctOption = props.options.find(opt => opt.key === props.correctAnswer)
  return correctOption?.explanation || null
})

const renderedQuestion = computed(() => {
  return renderMarkdown(props.question)
})

const renderMarkdown = (text) => {
  if (!text) return ''
  return md.renderInline(text)
}

const selectAnswer = (key) => {
  if (!showAnswer.value) {
    selectedAnswer.value = key
    showAnswer.value = true  // 立即显示答案
  }
}

const reset = () => {
  selectedAnswer.value = null
  showAnswer.value = false
}
</script>

<style scoped>
.mcq-container {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.mcq-question {
  display: flex;
  gap: 1rem;
}

.mcq-number {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  font-size: 1.1rem;
  min-width: 2rem;
}

.mcq-content {
  flex: 1;
}

.mcq-text {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.mcq-text :deep(p) {
  margin: 0;
}

.mcq-text :deep(code) {
  background: var(--vp-c-bg-alt);
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  font-size: 0.9em;
}

.mcq-text :deep(strong) {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.mcq-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.mcq-option {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.mcq-option:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.mcq-option-selected {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-lighter);
}

.dark .mcq-option-selected {
  border-color: var(--vp-c-brand-light);
  background: var(--vp-c-brand-nav-active);
}

.mcq-option-correct {
  border-color: #10b981;
  background: #d1fae5;
}

.dark .mcq-option-correct {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.15);
  color: #6ee7b7;
}

.mcq-option-wrong {
  border-color: #ef4444;
  background: #fee2e2;
}

.dark .mcq-option-wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
}

.mcq-option-label {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  min-width: 1.5rem;
  flex-shrink: 0;
}

.mcq-option-text {
  flex: 1;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.mcq-option-text :deep(p) {
  margin: 0;
}

.mcq-option-text :deep(code) {
  background: var(--vp-c-bg-alt);
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  font-size: 0.9em;
}

.mcq-option-text :deep(strong) {
  font-weight: 600;
}

.dark .mcq-option-correct .mcq-option-text {
  color: #d1fae5;
}

.dark .mcq-option-wrong .mcq-option-text {
  color: #fee2e2;
}

.mcq-option-mark {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  color: #10b981;
  font-weight: bold;
}

.dark .mcq-option-mark {
  color: #6ee7b7;
}

.mcq-option-mark.wrong {
  color: #ef4444;
}

.dark .mcq-option-mark.wrong {
  color: #fca5a5;
}

.mcq-feedback {
  margin-top: 1rem;
}

.mcq-feedback-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.mcq-feedback-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mcq-feedback-correct {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  border: 1px solid #10b981;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);
}

.dark .mcq-feedback-correct {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%);
  color: #6ee7b7;
  border: 1px solid rgba(16, 185, 129, 0.4);
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
}

.mcq-feedback-wrong {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  border: 1px solid #ef4444;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.15);
}

.dark .mcq-feedback-wrong {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.4);
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);
}

.mcq-feedback-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  border-radius: 50%;
  flex-shrink: 0;
}

.mcq-feedback-correct .mcq-feedback-icon {
  background: #10b981;
  color: white;
}

.dark .mcq-feedback-correct .mcq-feedback-icon {
  background: rgba(16, 185, 129, 0.3);
  color: #6ee7b7;
}

.mcq-feedback-wrong .mcq-feedback-icon {
  background: #ef4444;
  color: white;
}

.dark .mcq-feedback-wrong .mcq-feedback-icon {
  background: rgba(239, 68, 68, 0.3);
  color: #fca5a5;
}

.mcq-feedback-text {
  line-height: 1.5;
}

.mcq-feedback-explanation {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid;
  font-size: 0.9rem;
  line-height: 1.6;
  font-weight: 400;
  opacity: 0.9;
}

.mcq-feedback-explanation :deep(p) {
  margin: 0;
}

.mcq-feedback-explanation :deep(code) {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  font-size: 0.9em;
}

.dark .mcq-feedback-explanation :deep(code) {
  background: rgba(255, 255, 255, 0.1);
}

.mcq-feedback-explanation :deep(strong) {
  font-weight: 500;
}

.mcq-feedback-explanation:first-of-type {
  margin-top: 0.5rem;
}

.mcq-feedback-explanation:not(:first-of-type) {
  margin-top: 0.75rem;
}

.mcq-explanation-label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  opacity: 1;
}

.mcq-feedback-correct .mcq-feedback-explanation {
  border-top-color: rgba(6, 95, 70, 0.2);
}

.dark .mcq-feedback-correct .mcq-feedback-explanation {
  border-top-color: rgba(110, 231, 183, 0.2);
}

.mcq-feedback-wrong .mcq-feedback-explanation {
  border-top-color: rgba(153, 27, 27, 0.2);
}

.dark .mcq-feedback-wrong .mcq-feedback-explanation {
  border-top-color: rgba(252, 165, 165, 0.2);
}


.mcq-actions {
  margin-top: 1rem;
}

.mcq-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.mcq-btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.mcq-btn-primary:hover {
  background: var(--vp-c-brand-dark);
}

.mcq-btn-secondary {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.mcq-btn-secondary:hover {
  background: var(--vp-c-bg-soft);
}

@media (max-width: 768px) {
  .mcq-container {
    padding: 1rem;
  }
  
  .mcq-question {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .mcq-number {
    min-width: auto;
  }
}
</style>
