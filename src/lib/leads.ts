const LEADS_URL = "https://functions.poehali.dev/69074b1b-a6b3-413d-a9d7-d04bd493ea36"

export interface LeadData {
  name: string
  phone: string
  email?: string
  company?: string
  source?: string
  volume?: string
  coffee?: string
  roast?: string
  packaging?: string
  design?: string
  comment?: string
}

export async function sendLead(data: LeadData): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(LEADS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    return { ok: res.ok, error: json.error }
  } catch {
    return { ok: false, error: "Ошибка соединения" }
  }
}
