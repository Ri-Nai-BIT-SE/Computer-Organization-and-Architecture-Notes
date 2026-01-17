<template>
  <div class="fib-container">
    <div class="fib-question">
      <div class="fib-number">{{ number }}.</div>
      <div class="fib-content">
        <div class="fib-text" v-html="renderedQuestion"></div>
        <div v-if="showAnswer" class="fib-answer">
          <div class="fib-answer-label">答案：</div>
          <div class="fib-answer-content" v-html="renderedAnswer"></div>
        </div>
        <div v-if="showAnswer && explanation" class="fib-explanation" v-html="renderedExplanation">
        </div>
        <div class="fib-actions">
          <button 
            v-if="!showAnswer"
            @click="showAnswer = true"
            class="fib-btn fib-btn-primary"
          >
            显示答案
          </button>
          <button 
            v-if="showAnswer"
            @click="showAnswer = false"
            class="fib-btn fib-btn-secondary"
          >
            隐藏答案
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
  answer: {
    type: [String, Array],
    required: true
  },
  explanation: {
    type: String,
    default: ''
  }
})

const showAnswer = ref(false)

const answerText = computed(() => {
  if (Array.isArray(props.answer)) {
    return props.answer.join('、')
  }
  return props.answer
})

const renderedQuestion = computed(() => {
  let rendered = renderMarkdown(props.question)
  // 将占位符 _________ 替换为带样式的版本
  rendered = rendered.replace(/_{7,}/g, '<span class="fitb-blank-placeholder">$&</span>')
  return rendered
})

const renderedAnswer = computed(() => {
  return renderMarkdown(answerText.value)
})

const renderedExplanation = computed(() => {
  if (!props.explanation) return ''
  return renderMarkdown(props.explanation)
})

const renderMarkdown = (text) => {
  if (!text) return ''
  return md.renderInline(text)
}
</script>

<style scoped>
.fib-container {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.fib-question {
  display: flex;
  gap: 1rem;
}

.fib-number {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  font-size: 1.1rem;
  min-width: 2rem;
  flex-shrink: 0;
}

.fib-content {
  flex: 1;
}

.fib-text {
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.fib-text :deep(p) {
  margin: 0;
}

.fib-text :deep(code) {
  background: var(--vp-c-bg-alt);
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  font-size: 0.9em;
}

.fib-text :deep(strong) {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.fitb-blank-placeholder {
  display: inline-block;
  min-width: 4rem;
  border-bottom: 2px solid var(--vp-c-brand-1);
  margin: 0 0.25rem;
  padding: 0 0.5rem;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.dark .fitb-blank-placeholder {
  border-bottom-color: var(--vp-c-brand-light);
  color: var(--vp-c-brand-light);
}


.fib-answer {
  margin-top: 1rem;
  padding: 0.875rem 1rem;
  background: var(--vp-c-bg);
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.dark .fib-answer {
  background: var(--vp-c-bg-alt);
  border-left-color: var(--vp-c-brand-light);
}

.fib-answer-label {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.fib-answer-content {
  flex: 1;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.fib-answer-content :deep(p) {
  margin: 0;
}

.fib-answer-content :deep(code) {
  background: var(--vp-c-bg-alt);
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  font-size: 0.9em;
}

.fib-answer-content :deep(strong) {
  font-weight: 600;
}

.fib-explanation {
  margin-top: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border-left: 3px solid var(--vp-c-text-2);
  border-radius: 4px;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
}

.fib-explanation :deep(p) {
  margin: 0;
}

.fib-explanation :deep(code) {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  font-size: 0.9em;
}

.dark .fib-explanation :deep(code) {
  background: rgba(255, 255, 255, 0.1);
}

.fib-explanation :deep(strong) {
  font-weight: 500;
}

.dark .fib-explanation {
  background: var(--vp-c-bg-alt);
  border-left-color: var(--vp-c-text-dark-2);
}

.fib-actions {
  margin-top: 1rem;
}

.fib-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.fib-btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.fib-btn-primary:hover {
  background: var(--vp-c-brand-dark);
}

.fib-btn-secondary {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.fib-btn-secondary:hover {
  background: var(--vp-c-bg-soft);
}

@media (max-width: 768px) {
  .fib-container {
    padding: 1rem;
  }
  
  .fib-question {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .fib-number {
    min-width: auto;
  }
}
</style>
