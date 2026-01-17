// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import ComplementCodeRing from '../components/ComplementCodeRing.vue'
import FixedPointDemo from '../components/FixedPointDemo.vue'
import NormalizationDemo from '../components/NormalizationDemo.vue'
import IEEE754Demo from '../components/IEEE754Demo.vue'
import AddressModeSim from '../components/AddressModeSim.vue'
import OpcodeExpander from '../components/OpcodeExpander.vue'
import InstructionLengthSpec from '../components/InstructionLengthSpec.vue'
import OpcodeExpansionVisualizer from '../components/OpcodeExpansionVisualizer.vue'
import AddressingUnit from '../components/AddressingUnit.vue'
import DataAddressingSim from '../components/DataAddressingSim.vue'
import BaseVsIndex from '../components/BaseVsIndex.vue'
import PagedAddressing from '../components/PagedAddressing.vue'
import InstructionSimulator from '../components/InstructionSimulator.vue'
import AddressingComparison from '../components/AddressingComparison.vue'
import BusLogicBox from '../components/BusLogicBox.vue'
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion.vue'
import FillInTheBlank from '../components/FillInTheBlank.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('ComplementCodeRing', ComplementCodeRing)
    app.component('FixedPointDemo', FixedPointDemo)
    app.component('NormalizationDemo', NormalizationDemo)
    app.component('IEEE754Demo', IEEE754Demo)
    app.component('AddressModeSim', AddressModeSim)
    app.component('OpcodeExpander', OpcodeExpander)
    app.component('InstructionLengthSpec', InstructionLengthSpec)
    app.component('OpcodeExpansionVisualizer', OpcodeExpansionVisualizer)
    app.component('AddressingUnit', AddressingUnit)
    app.component('DataAddressingSim', DataAddressingSim)
    app.component('BaseVsIndex', BaseVsIndex)
    app.component('PagedAddressing', PagedAddressing)
    app.component('InstructionSimulator', InstructionSimulator)
    app.component('AddressingComparison', AddressingComparison)
    app.component('BusLogicBox', BusLogicBox)
    app.component('MultipleChoiceQuestion', MultipleChoiceQuestion)
    app.component('FillInTheBlank', FillInTheBlank)
  }
} satisfies Theme
