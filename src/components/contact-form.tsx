import { useState } from "react"
import { Button } from "@/components/ui/button"
import { sendLead } from "@/lib/leads"
import Icon from "@/components/ui/icon"

export function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", comment: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setStatus("loading")
    const res = await sendLead({ ...form, source: "Форма сайта" })
    setStatus(res.ok ? "success" : "error")
  }

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"

  return (
    <section id="contact-form" className="w-full px-5 py-8 md:py-16">
      <div className="max-w-[680px] mx-auto">
        <div className="flex flex-col items-center gap-4 pb-10 text-center">
          <h2 className="text-foreground text-4xl md:text-5xl font-semibold leading-tight">
            Получить предложение
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-medium max-w-[520px]">
            Заполните форму — Денис свяжется с вами в течение одного рабочего дня
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="CheckCircle" size={28} className="text-primary" />
              </div>
              <h3 className="text-foreground text-xl font-semibold">Заявка отправлена!</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Денис получил вашу заявку и свяжется в ближайшее время. Или напишите сразу в Telegram.
              </p>
              <a href="https://t.me/+79042474302" target="_blank" rel="noopener noreferrer">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-6 flex gap-2">
                  <Icon name="Send" size={15} />
                  Написать в Telegram
                </Button>
              </a>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted-foreground font-medium">Ваше имя *</label>
                  <input className={inputCls} placeholder="Иван Иванов" value={form.name} onChange={set("name")} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted-foreground font-medium">Телефон *</label>
                  <input className={inputCls} placeholder="+7 (999) 000-00-00" value={form.phone} onChange={set("phone")} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted-foreground font-medium">Email</label>
                  <input className={inputCls} type="email" placeholder="mail@company.ru" value={form.email} onChange={set("email")} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted-foreground font-medium">Компания</label>
                  <input className={inputCls} placeholder="ООО Ромашка" value={form.company} onChange={set("company")} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground font-medium">Комментарий</label>
                <textarea
                  className={`${inputCls} resize-none h-24`}
                  placeholder="Объём партии, пожелания по вкусу, упаковке..."
                  value={form.comment}
                  onChange={set("comment")}
                />
              </div>
              {status === "error" && (
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <Icon name="AlertCircle" size={15} />
                  Ошибка отправки. Попробуйте ещё раз или напишите в Telegram.
                </p>
              )}
              <Button
                type="submit"
                disabled={status === "loading" || !form.name || !form.phone}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full py-3 text-base font-medium disabled:opacity-50"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2"><Icon name="Loader2" size={16} className="animate-spin" />Отправляем...</span>
                ) : "Отправить заявку"}
              </Button>
              <p className="text-muted-foreground text-xs text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
