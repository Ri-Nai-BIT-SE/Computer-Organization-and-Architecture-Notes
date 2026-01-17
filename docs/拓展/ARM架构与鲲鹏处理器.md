# ARM架构与鲲鹏处理器 - 章节测验

---

## Part1：单选题

<MultipleChoiceQuestion
  :number="1"
  question="从ARM v7开始，ARM公司设计的CPU被命名为Cortex，并划分为不同的系列以对应不同的应用场景，以下不属于最新ARM公司CPU系列的是？"
  :options='[
    { key: "A", text: "A (Application) 系列：应用型处理器，面向具有复杂软件操作系统的面向用户的应用" },
    { key: "B", text: "S (Server) 系列：服务器级别处理器，为企业应用服务器产品提供的专用方案", explanation: "ARM公司自ARMv7架构开始，将处理器分为三大系列：Cortex-A（应用型）、Cortex-R（实时型）、Cortex-M（微控制器型）。服务器通常使用高性能的Cortex-A系列，不存在独立的S (Server) 系列。" },
    { key: "C", text: "R (Real-Time) 系列：实时高性能处理器，为嵌入式系统提供高性能计算解决方案" },
    { key: "D", text: "M (Microcontroller) 系列：高能效、易于使用的处理器，主要用于通用低端" }
  ]'
  correct-answer="B"
/>

<MultipleChoiceQuestion
  :number="2"
  question="ARM架构使用的是精简指令集（RISC），相比于复杂指令集（CISC），其特点是？"
  :options='[
    { key: "A", text: "架构简化，体积小，低功耗", explanation: "RISC架构的特点就是指令集精简，硬件结构简单，因此体积小、功耗低。这是RISC相比CISC的核心优势。" },
    { key: "B", text: "架构复杂，体积大，低功高", explanation: "这是CISC架构的特点，不是RISC的特点。" },
    { key: "C", text: "架构复杂，体积小，低功耗", explanation: "架构复杂和体积小、低功耗是矛盾的，复杂架构通常体积更大、功耗更高。" },
    { key: "D", text: "架构简化，体积大，低功高", explanation: "架构简化通常意味着体积小、功耗低，而不是体积大、功耗高。" }
  ]'
  correct-answer="A"
/>

<MultipleChoiceQuestion
  :number="3"
  question="华为得到的ARM公司授权的级别是？"
  :options='[
    { key: "A", text: "使用层级授权-可使用封装好的ARM芯片，而不能进行任何修改" },
    { key: "B", text: "工艺层级授权-可更改授权ARM芯片的电路设计，使用自己的工艺重新设计芯片" },
    { key: "C", text: "内核层级授权-可基于购买的ARM内核进行芯片开发，设计，有一定的自主研发权" },
    { key: "D", text: "架构/指令集层级授权-可对ARM架构进行改造，甚至对ARM指令集进行扩展或缩减", explanation: "华为获得的是最高级别的架构/指令集层级授权（Architecture License），这意味着华为可以基于ARMv8指令集完全自主设计CPU核心（即鲲鹏核），而不仅仅是购买现成的核心（如Cortex-A76）。这使得华为能够完全自主设计处理器架构。" }
  ]'
  correct-answer="D"
/>

<MultipleChoiceQuestion
  :number="4"
  question="鲲鹏920使用的指令集架构是？"
  :options='[
    { key: "A", text: "ARM v7 32位" },
    { key: "B", text: "ARM v8 32位" },
    { key: "C", text: "ARM v8 64位", explanation: "鲲鹏920作为服务器处理器，必须支持大内存寻址，因此使用ARMv8 64位架构。服务器应用需要64位架构来支持超过4GB的内存地址空间。" },
    { key: "D", text: "ARM v9 64位" }
  ]'
  correct-answer="C"
/>

<MultipleChoiceQuestion
  :number="5"
  question="鲲鹏920生产使用的制程是？"
  :options='[
    { key: "A", text: "3nm" },
    { key: "B", text: "5nm" },
    { key: "C", text: "7nm", explanation: "鲲鹏920采用7nm制程工艺生产。这是鲲鹏920的关键技术参数之一。" },
    { key: "D", text: "9nm" }
  ]'
  correct-answer="C"
/>

<MultipleChoiceQuestion
  :number="6"
  question="相比于上一代的鲲鹏916，鲲鹏920处理器的计算核数提升1倍，最多支持多少核？"
  :options='[
    { key: "A", text: "128" },
    { key: "B", text: "64", explanation: "鲲鹏920单芯片物理核心最多支持64核。这是鲲鹏920的核心技术指标之一。" },
    { key: "C", text: "32" },
    { key: "D", text: "16" }
  ]'
  correct-answer="B"
/>

<MultipleChoiceQuestion
  :number="7"
  question="鲲鹏920处理器的流水线架构设计中，访存单元支持每拍多少条读或写访存操作，读操作最快多少拍完成？"
  :options='[
    { key: "A", text: "1， 2" },
    { key: "B", text: "2， 4", explanation: "鲲鹏920的访存单元每拍支持2条读或写访存操作，读操作最快4拍完成。这是一个非常底层的微架构参数，体现了鲲鹏920的高性能设计。" },
    { key: "C", text: "3， 6" },
    { key: "D", text: "4， 8" }
  ]'
  correct-answer="B"
/>

<MultipleChoiceQuestion
  :number="8"
  question="鲲鹏920处理器Branch预测和取指流水线采用了解耦设计，取指流水线每拍最多可提供多少Bytes指令供译码？"
  :options='[
    { key: "A", text: "4" },
    { key: "B", text: "8" },
    { key: "C", text: "16" },
    { key: "D", text: "32", explanation: "鲲鹏920的前端设计极宽，取指流水线每拍可提供32 Bytes指令供译码。这个参数体现了鲲鹏920的高性能前端设计，能够提供足够的指令带宽。" }
  ]'
  correct-answer="D"
/>

<MultipleChoiceQuestion
  :number="9"
  question="ARM微处理器已经遍及工业控制、消费类电子产品、通信系统、网络系统、无线系统等各类产品市场，下列关于ARM架构特点的描述中错误的是？"
  :options='[
    { key: "A", text: "支持16位、32位、64位多种指令集，能很好地兼容从IoT、终端到云端地各类应用场景。" },
    { key: "B", text: "大量使用寄存器，大多数数据操作都在寄存器中完成，指令执行速度更快。" },
    { key: "C", text: "同样功能、性能占用的芯片面积小、功耗低、集成度更高，更多的硬件CPU核具备更好的并发性能。" },
    { key: "D", text: "采用复杂指令集，处理效率高。", explanation: "ARM是RISC（精简指令集），不是CISC（复杂指令集）。RISC架构的特点是指令集精简、硬件结构简单，而CISC才是采用复杂指令集。因此选项D的描述是错误的。" }
  ]'
  correct-answer="D"
/>

<MultipleChoiceQuestion
  :number="10"
  question="下列哪一项不是CPU（中央处理器）的组成部分？"
  :options='[
    { key: "A", text: "逻辑运算单元" },
    { key: "B", text: "进程", explanation: "进程（Process）是操作系统层面的软件概念，用于管理程序的执行。CPU硬件包括ALU（运算单元）、CU（控制单元）、寄存器等，但进程不属于CPU硬件组成部分。" },
    { key: "C", text: "控制单元" },
    { key: "D", text: "寄存器" }
  ]'
  correct-answer="B"
/>

<MultipleChoiceQuestion
  :number="11"
  question="异构计算是继单核计算，多核并行计算之后新的计算模型，下列关于异构计算的背景描述中错误的是？"
  :options='[
    { key: "A", text: "多核并行带来的性能提升是有限的，随着并行度的提升，散热和能耗的问题也日益突出。" },
    { key: "B", text: "异构计算最大化地发挥各处理器地性能，把最适合的任务交给最擅长的计算单元。" },
    { key: "C", text: "摩尔定律越来越接近物理极限，提升单核性能的难度和成本也越来越高。" },
    { key: "D", text: "NUMA是异构计算的一种模式。", explanation: "NUMA（非统一内存访问）是多处理器系统的内存架构，用于描述多CPU系统中的内存访问模式，而不是异构计算的一种模式。异构计算是指使用不同类型的计算单元（CPU + GPU + NPU + FPGA）协同工作。" }
  ]'
  correct-answer="D"
/>

<MultipleChoiceQuestion
  :number="12"
  question="下列关于RISC指令集架构的说法中错误的是？"
  :options='[
    { key: "A", text: "RISC CPU包含有丰富的电路单元，因而功能强、面积大、功耗高。", explanation: "这是CISC架构的特点，不是RISC的特点。RISC架构恰恰相反，指令集精简、硬件结构简单，因此体积小、功耗低。RISC并不包含丰富的电路单元导致功耗高，这是对RISC的误解。" },
    { key: "B", text: "在RISC机器上实现特殊功能时，效率可能较低。" },
    { key: "C", text: "RISC汇编语言程序一般需要较大的内存空间，实现特殊功能时程序复杂，不易设计。" },
    { key: "D", text: "RISC设计者把主要精力放在那些经常使用的指令上，尽量使它们具有简单高效的特色。" }
  ]'
  correct-answer="A"
/>

<MultipleChoiceQuestion
  :number="13"
  question="ARMv7架构以后，ARM的处理器命名改为Cortex，华为自研的处理器芯片鲲鹏使用的是哪种ARM架构？"
  :options='[
    { key: "A", text: "Cortex-M" },
    { key: "B", text: "Cortex-R" },
    { key: "C", text: "Cortex-A", explanation: "鲲鹏作为服务器芯片，属于Cortex-A（Application）系列。Cortex-A系列面向高性能应用，如手机、服务器，运行复杂操作系统（Linux、Android）。Cortex-M面向微控制器，Cortex-R面向实时系统。" }
  ]'
  correct-answer="C"
/>

<MultipleChoiceQuestion
  :number="14"
  question="下列不属于GPU典型应用场景的是？"
  :options='[
    { key: "A", text: "视频图像处理场景" },
    { key: "B", text: "HPC混合应用高吞吐场景" },
    { key: "C", text: "通用计算，完成复杂的逻辑运算", explanation: "GPU擅长并行计算（图像处理、HPC加速），但不擅长复杂的逻辑运算。复杂的逻辑运算是CPU的强项，因为CPU有更强的分支预测和乱序执行能力。" },
    { key: "D", text: "HPC高性能加速场景" }
  ]'
  correct-answer="C"
/>

<MultipleChoiceQuestion
  :number="15"
  question="鲲鹏920是基于华为自研的具有完全自主知识产权的ARMv8架构，能够提供强大的计算能力，单颗鲲鹏920处理器最多支持64 Core。通过片间Cache一致性接口Hydra可以扩展系统核数，最多能够支持到多少 Core？"
  :options='[
    { key: "A", text: "128" },
    { key: "B", text: "256", explanation: "鲲鹏920支持多路互联，4路互联时，单芯片64核 × 4路 = 256核。这是通过片间Cache一致性接口Hydra实现的系统级扩展。" },
    { key: "C", text: "512" },
    { key: "D", text: "1024" }
  ]'
  correct-answer="B"
/>

<MultipleChoiceQuestion
  :number="16"
  question="在鲲鹏920芯片架构中，当4路服务器处理器进行多片互联时，每颗芯片各提供2个SCCL和1个SICL。芯片之间通过片间缓存一致接口（Hydra）连接，片间带宽高达多少 Gbps？"
  :options='[
    { key: "A", text: "128" },
    { key: "B", text: "240", explanation: "鲲鹏920芯片间互联接口称为Hydra，片间带宽高达240 Gbps。这是鲲鹏920多路互联的关键技术参数。" },
    { key: "C", text: "256" },
    { key: "D", text: "480" }
  ]'
  correct-answer="B"
/>

<MultipleChoiceQuestion
  :number="17"
  question="数据(内存)一致性模型有很多种，下列不属于顺序一致性模型的是？"
  :options='[
    { key: "A", text: "强一致性模型（Strong Consistency）" },
    { key: "B", text: "处理器一致性模型（Processor Consistency）" },
    { key: "C", text: "缓存一致性模型（Cache Consistency）", explanation: "强一致性、弱一致性、处理器一致性属于Memory Consistency Models（内存一致性模型）。而Cache Consistency（缓存一致性）通常指维护缓存一致性的机制/协议（如MESI协议），在分类上往往不与其他三个模型并列作为模型名称。" },
    { key: "D", text: "弱一致性模型（Weak Consistency）" }
  ]'
  correct-answer="C"
/>

<MultipleChoiceQuestion
  :number="18"
  question="由华为研发的第一颗基于ARM的无线基站芯片发布于哪一年？"
  :options='[
    { key: "A", text: "1991年" },
    { key: "B", text: "2005年", explanation: "华为第一颗基于ARM的无线基站芯片发布于2005年。这是华为在ARM架构应用上的重要里程碑。" },
    { key: "C", text: "2009年" },
    { key: "D", text: "2014年" }
  ]'
  correct-answer="B"
/>

<MultipleChoiceQuestion
  :number="19"
  question="以下哪个选项不是鲲鹏920处理器的特点？"
  :options='[
    { key: "A", text: "支持PCIe 4.0和CCIX" },
    { key: "B", text: "只支持2路互连", explanation: "鲲鹏920不仅支持2路互连，还支持4路互联。因此只支持2路互连不是鲲鹏920的特点。" },
    { key: "C", text: "集成板载100 GE网络和加密、压缩等引擎" }
  ]'
  correct-answer="B"
/>

<MultipleChoiceQuestion
  :number="20"
  question="以下哪一项不是异构计算的优点？"
  :options='[
    { key: "A", text: "提升传输速率", explanation: "异构计算提升的是计算效率（如AI推理、压缩解压、CPU卸载），而不是网络传输速率。传输速率主要受网络带宽和协议影响，与计算架构关系不大。" },
    { key: "B", text: "支持AI推理" },
    { key: "C", text: "CPU卸载" },
    { key: "D", text: "压缩率提升" }
  ]'
  correct-answer="A"
/>
