import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const CHAT_URL = "https://functions.poehali.dev/77f9d867-9e0d-43a3-a98c-b15f7fe40d5c"

interface Message {
  role: "user" | "assistant"
  content: string
}

const WELCOME = "Привет! Я помогу подобрать кофе под ваш бренд — сорт, обжарку, упаковку и дизайн. Что вас интересует?"

export function AiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const updated: Message[] = [...messages, { role: "user", content: text }]
    setMessages(updated)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      })
      const data = await res.json()
      setMessages([...updated, { role: "assistant", content: data.reply || "Что-то пошло не так. Попробуйте ещё раз." }])
    } catch {
      setMessages([...updated, { role: "assistant", content: "Ошибка соединения. Попробуйте позже." }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="Открыть чат"
      >
        {open
          ? <Icon name="X" size={22} className="text-primary-foreground" />
          : <Icon name="MessageCircle" size="{24}" className="text-primary-foreground" />
        }
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl border border-white/10 bg-background shadow-2xl transition-all duration-300 origin-bottom-right ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ height: "480px" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 rounded-t-2xl bg-white/5">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Icon name="Coffee" size={16} className="text-primary-foreground" />
          </div>
          <div>
            <p className="text-foreground text-sm font-semibold leading-4">Ассистент Контракт Кофе</p>
            <p className="text-muted-foreground text-xs">Помогу оформить заявку на СТМ</p>
          </div>
          <button onClick={() => setOpen(false)} className="ml-auto text-muted-foreground hover:text-foreground">
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-5 whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-white/8 text-foreground rounded-bl-sm border border-white/10"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/8 border border-white/10 px-4 py-2.5 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-white/10 flex gap-2 items-center">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Напишите вопрос..."
            className="flex-1 bg-white/8 border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
          />
          <Button
            onClick={send}
            disabled={!input.trim() || loading}
            size="icon"
            className="w-9 h-9 rounded-xl bg-primary hover:bg-primary/90 flex-shrink-0 disabled:opacity-40"
          >
            <Icon name="Send" size={15} className="text-primary-foreground" />
          </Button>
        </div>
      </div>
    </>
  )
}
