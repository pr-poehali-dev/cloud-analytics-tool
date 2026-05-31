import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqData = [
  {
    question: "Какой минимальный объём заказа?",
    answer:
      "Минимальный объём для разовой партии — 50 кг. Для регулярных поставок по договору действуют специальные условия начиная от 300 кг в месяц. Мы готовы обсудить индивидуальные условия для стартующих брендов.",
  },
  {
    question: "Как происходит разработка вкусового профиля под СТМ?",
    answer:
      "Процесс начинается с бриф-сессии: вы описываете позиционирование бренда, целевую аудиторию и пожелания по вкусу. Наш Q-грейдер подбирает сорта и степень обжарки, готовит пробные образцы. После согласования профиль фиксируется в производственной карте и воспроизводится стабильно от партии к партии.",
  },
  {
    question: "Какие варианты упаковки доступны?",
    answer:
      "Работаем с крафт-пакетами с дегазационным клапаном, жестяными банками, стик-пакетами и дой-паками. Возможна любая кастомная печать: ваш логотип, цвета и состав. Помогаем с разработкой дизайна или принимаем готовые макеты.",
  },
  {
    question: "Есть ли документы и сертификаты качества?",
    answer:
      "Да. К каждой партии прилагается протокол Q-граппинга, декларация соответствия и сертификат качества. Для крупных партнёров предоставляем полный пакет для торговых сетей: штрихкоды, данные для этикетки, входной контроль.",
  },
  {
    question: "Сколько времени занимает производство и доставка?",
    answer:
      "Стандартный срок производства — 7–10 рабочих дней после согласования рецептуры и упаковки. Для партнёров с постоянными заказами доступен ускоренный режим. Доставка по всей России через транспортные компании или самовывоз.",
  },
  {
    question: "Можно ли заказать пробную партию перед контрактом?",
    answer:
      "Конечно. Мы рекомендуем начинать именно с пробной партии — это позволяет проверить вкусовой профиль, упаковку и логистику до подписания долгосрочного договора. Свяжитесь с нами, и мы согласуем условия первого заказа.",
  },
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onToggle()
  }
  return (
    <div
      className={`w-full bg-[rgba(231,236,235,0.08)] shadow-[0px_2px_4px_rgba(0,0,0,0.16)] overflow-hidden rounded-[10px] outline outline-1 outline-border outline-offset-[-1px] transition-all duration-500 ease-out cursor-pointer`}
      onClick={handleClick}
    >
      <div className="w-full px-5 py-[18px] pr-4 flex justify-between items-center gap-5 text-left transition-all duration-300 ease-out">
        <div className="flex-1 text-foreground text-base font-medium leading-6 break-words">{question}</div>
        <div className="flex justify-center items-center">
          <ChevronDown
            className={`w-6 h-6 text-muted-foreground transition-all duration-500 ease-out ${isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          transitionProperty: "max-height, opacity, padding",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={`px-5 transition-all duration-500 ease-out ${isOpen ? "pb-[18px] pt-2 translate-y-0" : "pb-0 pt-0 -translate-y-2"}`}
        >
          <div className="text-foreground/80 text-sm font-normal leading-6 break-words">{answer}</div>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }
  return (
    <section className="w-full pt-[66px] pb-20 md:pb-40 px-5 relative flex flex-col justify-center items-center">
      <div className="w-[300px] h-[500px] absolute top-[150px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] z-0" />
      <div className="self-stretch pt-8 pb-8 md:pt-14 md:pb-14 flex flex-col justify-center items-center gap-2 relative z-10">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="w-full max-w-[435px] text-center text-foreground text-4xl font-semibold leading-10 break-words">
            Частые вопросы
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm font-medium leading-[18.20px] break-words">
            Всё, что нужно знать о производстве кофе под вашим брендом
          </p>
        </div>
      </div>
      <div className="w-full max-w-[600px] pt-0.5 pb-10 flex flex-col justify-start items-start gap-4 relative z-10">
        {faqData.map((faq, index) => (
          <FAQItem key={index} {...faq} isOpen={openItems.has(index)} onToggle={() => toggleItem(index)} />
        ))}
      </div>
    </section>
  )
}