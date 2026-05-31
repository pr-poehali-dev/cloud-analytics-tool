import { useState } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { sendLead } from "@/lib/leads"

const coffeeOptions = [
  { id: "brazil", name: "Бразилия Сантос", origin: "Бразилия", notes: "Шоколад, орех, карамель", price: 580 },
  { id: "colombia", name: "Колумбия Супремо", origin: "Колумбия", notes: "Красные фрукты, карамель, цитрус", price: 720 },
  { id: "ethiopia", name: "Эфиопия Йиргачефф", origin: "Эфиопия", notes: "Цветы, бергамот, чай", price: 860 },
  { id: "blend", name: "Хаус-бленд", origin: "Купаж", notes: "Сбалансированный вкус, универсальный", price: 520 },
]

const roastOptions = [
  { id: "light", name: "Светлая", description: "Фруктовость, кислинка, чай", surcharge: 0 },
  { id: "medium", name: "Средняя", description: "Баланс, карамель, орех", surcharge: 0 },
  { id: "dark", name: "Тёмная", description: "Горький шоколад, дымок", surcharge: 0 },
  { id: "espresso", name: "Под эспрессо", description: "Плотность, насыщенность, крема", surcharge: 30 },
]

const packagingOptions = [
  { id: "kraft", name: "Крафт-пакет", volume: "250 г", description: "С дегазационным клапаном", price: 28 },
  { id: "kraft500", name: "Крафт-пакет", volume: "500 г", description: "С дегазационным клапаном", price: 38 },
  { id: "kraft1000", name: "Крафт-пакет", volume: "1 кг", description: "С дегазационным клапаном", price: 52 },
  { id: "tin", name: "Жестяная банка", volume: "250 г", description: "Премиум-упаковка с крышкой", price: 95 },
  { id: "doypack", name: "Дой-пак", volume: "250 г", description: "Стоячий пакет с зипом", price: 32 },
]

const designOptions = [
  { id: "own", name: "Свой макет", description: "Загружаете готовый дизайн", price: 0 },
  { id: "custom", name: "Разработка под ключ", description: "Дизайнер создаёт фирменную этикетку", price: 12000 },
]

const volumeOptions = [
  { id: "50", label: "50 кг", value: 50 },
  { id: "100", label: "100 кг", value: 100 },
  { id: "300", label: "300 кг", value: 300 },
  { id: "500", label: "500 кг", value: 500 },
  { id: "1000", label: "1 000 кг", value: 1000 },
]

export function PriceCalculator() {
  const [selectedCoffee, setSelectedCoffee] = useState(coffeeOptions[0])
  const [selectedRoast, setSelectedRoast] = useState(roastOptions[1])
  const [selectedPackaging, setSelectedPackaging] = useState(packagingOptions[0])
  const [selectedDesign, setSelectedDesign] = useState(designOptions[0])
  const [selectedVolume, setSelectedVolume] = useState(volumeOptions[1])
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: "", phone: "" })
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const packageWeight = selectedPackaging.volume === "1 кг" ? 1 : selectedPackaging.volume === "500 г" ? 0.5 : 0.25
  const packagesCount = Math.ceil(selectedVolume.value / packageWeight)
  const coffeeTotal = selectedVolume.value * (selectedCoffee.price + selectedRoast.surcharge)
  const packagingTotal = packagesCount * selectedPackaging.price
  const designTotal = selectedDesign.price
  const total = coffeeTotal + packagingTotal + designTotal
  const pricePerKg = Math.round(total / selectedVolume.value)

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadForm.name || !leadForm.phone) return
    setLeadStatus("loading")
    const res = await sendLead({
      name: leadForm.name,
      phone: leadForm.phone,
      source: "Калькулятор",
      coffee: selectedCoffee.name,
      roast: selectedRoast.name,
      packaging: `${selectedPackaging.name} ${selectedPackaging.volume}`,
      design: selectedDesign.name,
      volume: selectedVolume.label,
      comment: `Расчёт: ${total.toLocaleString("ru")} ₽ (${pricePerKg.toLocaleString("ru")} ₽/кг)`,
    })
    setLeadStatus(res.ok ? "success" : "error")
  }

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"

  return (
    <section className="w-full px-5 py-8 md:py-16">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col items-center gap-4 pb-10">
          <h2 className="text-center text-foreground text-4xl md:text-5xl font-semibold leading-tight">
            Рассчитайте стоимость
          </h2>
          <p className="text-center text-muted-foreground text-base md:text-lg font-medium max-w-[560px]">
            Выберите параметры — получите мгновенную оценку стоимости партии под вашим брендом
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: options */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Coffee */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground font-bold">1</span>
                <span className="text-foreground font-semibold text-base">Зелёный кофе</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {coffeeOptions.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCoffee(c)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                      selectedCoffee.id === c.id
                        ? "border-primary bg-primary/10"
                        : "border-white/10 bg-white/3 hover:border-white/25"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="text-foreground text-sm font-medium leading-5">{c.name}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{c.notes}</p>
                      </div>
                      <span className="text-foreground text-sm font-semibold whitespace-nowrap">{c.price} ₽/кг</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Roast */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground font-bold">2</span>
                <span className="text-foreground font-semibold text-base">Степень обжарки</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {roastOptions.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRoast(r)}
                    className={`text-left p-3 rounded-xl border transition-all duration-200 ${
                      selectedRoast.id === r.id
                        ? "border-primary bg-primary/10"
                        : "border-white/10 bg-white/3 hover:border-white/25"
                    }`}
                  >
                    <p className="text-foreground text-sm font-medium">{r.name}</p>
                    <p className="text-muted-foreground text-xs mt-1 leading-4">{r.description}</p>
                    {r.surcharge > 0 && (
                      <p className="text-primary text-xs mt-1">+{r.surcharge} ₽/кг</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Packaging */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground font-bold">3</span>
                <span className="text-foreground font-semibold text-base">Упаковка</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packagingOptions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPackaging(p)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                      selectedPackaging.id === p.id
                        ? "border-primary bg-primary/10"
                        : "border-white/10 bg-white/3 hover:border-white/25"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="text-foreground text-sm font-medium">{p.name} <span className="text-muted-foreground font-normal">{p.volume}</span></p>
                        <p className="text-muted-foreground text-xs mt-0.5">{p.description}</p>
                      </div>
                      <span className="text-foreground text-sm font-semibold whitespace-nowrap">{p.price} ₽/шт</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Design */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground font-bold">4</span>
                <span className="text-foreground font-semibold text-base">Дизайн упаковки</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {designOptions.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDesign(d)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                      selectedDesign.id === d.id
                        ? "border-primary bg-primary/10"
                        : "border-white/10 bg-white/3 hover:border-white/25"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="text-foreground text-sm font-medium">{d.name}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{d.description}</p>
                      </div>
                      <span className="text-foreground text-sm font-semibold whitespace-nowrap">
                        {d.price === 0 ? "Бесплатно" : `${d.price.toLocaleString("ru")} ₽`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: result */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl border border-primary/30 bg-primary/5 p-6 flex flex-col gap-5">
              <p className="text-foreground font-semibold text-lg">Итого по партии</p>

              {/* Volume selector */}
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">Объём партии</p>
                <div className="flex flex-wrap gap-2">
                  {volumeOptions.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVolume(v)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                        selectedVolume.id === v.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-white/15 text-muted-foreground hover:border-white/30"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Breakdown */}
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Кофе ({selectedVolume.label})</span>
                  <span className="text-foreground">{coffeeTotal.toLocaleString("ru")} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Упаковка ({packagesCount.toLocaleString("ru")} шт)</span>
                  <span className="text-foreground">{packagingTotal.toLocaleString("ru")} ₽</span>
                </div>
                {designTotal > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Разработка дизайна</span>
                    <span className="text-foreground">{designTotal.toLocaleString("ru")} ₽</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-2.5 flex justify-between items-end">
                  <span className="text-muted-foreground text-xs">≈ {pricePerKg.toLocaleString("ru")} ₽/кг с упаковкой</span>
                </div>
              </div>

              {/* Total */}
              <div className="rounded-xl bg-primary/15 border border-primary/20 p-4 flex flex-col gap-1">
                <p className="text-muted-foreground text-xs">Стоимость партии</p>
                <p className="text-foreground text-3xl font-bold">{total.toLocaleString("ru")} ₽</p>
              </div>

              <p className="text-muted-foreground text-xs leading-5">
                Расчёт ориентировочный. Точную цену согласуем после обсуждения деталей.
              </p>

              {!showLeadForm && leadStatus !== "success" && (
                <Button
                  onClick={() => setShowLeadForm(true)}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full font-medium flex items-center gap-2"
                >
                  <Icon name="FileText" size={16} />
                  Оставить заявку
                </Button>
              )}

              {showLeadForm && leadStatus !== "success" && (
                <form onSubmit={submitLead} className="flex flex-col gap-3 border-t border-white/10 pt-4">
                  <p className="text-foreground text-sm font-medium">Оставьте контакт — пришлём точное КП</p>
                  <input
                    className={inputCls}
                    placeholder="Ваше имя *"
                    value={leadForm.name}
                    onChange={e => setLeadForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                  <input
                    className={inputCls}
                    placeholder="Телефон *"
                    value={leadForm.phone}
                    onChange={e => setLeadForm(f => ({ ...f, phone: e.target.value }))}
                    required
                  />
                  {leadStatus === "error" && (
                    <p className="text-red-400 text-xs">Ошибка. Попробуйте ещё раз.</p>
                  )}
                  <Button
                    type="submit"
                    disabled={leadStatus === "loading" || !leadForm.name || !leadForm.phone}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full font-medium disabled:opacity-50"
                  >
                    {leadStatus === "loading" ? "Отправляем..." : "Отправить"}
                  </Button>
                </form>
              )}

              {leadStatus === "success" && (
                <div className="flex flex-col items-center gap-2 border-t border-white/10 pt-4 text-center">
                  <Icon name="CheckCircle" size={24} className="text-primary" />
                  <p className="text-foreground text-sm font-medium">Заявка отправлена!</p>
                  <p className="text-muted-foreground text-xs">Денис получил расчёт и свяжется с вами.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}