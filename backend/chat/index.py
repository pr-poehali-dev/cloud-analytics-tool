import os
import json
from openai import OpenAI

SYSTEM_PROMPT = """Ты — ИИ-ассистент компании «Контракт Кофе». 
Ты помогаешь B2B-клиентам (розничные сети, HoReCa, дистрибьюторы) разобраться в условиях производства кофе под собственной торговой маркой (СТМ).

Что ты знаешь о компании:
- Производим обжаренный кофе под брендом заказчика (СТМ)
- Минимальный объём: от 50 кг за партию
- Сорта: Бразилия Сантос, Колумбия Супремо, Эфиопия Йиргачефф, Хаус-бленд
- Степени обжарки: светлая, средняя, тёмная, под эспрессо
- Упаковка: крафт-пакеты (250г/500г/1кг), жестяные банки, дой-паки
- Дизайн: принимаем готовый макет (бесплатно) или разрабатываем под ключ
- Срок производства: 7–10 рабочих дней
- Доставка по всей России
- Контакт: Денис Гиззатов, Telegram +79042474302, email gid150@mail.ru
- Юрлицо: ООО «Контракт Кофе»

Стиль общения: дружелюбный, профессиональный, конкретный. Отвечай по-русски. 
Если клиент готов к заказу — предложи связаться с Денисом в Telegram: https://t.me/+79042474302
Не выдумывай цены и условия, которых нет выше. Если не знаешь — предложи уточнить у менеджера."""


def handler(event: dict, context) -> dict:
    """Чат с ИИ-ассистентом Контракт Кофе"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    messages = body.get("messages", [])

    if not messages:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "messages required"}),
        }

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return {
            "statusCode": 503,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "API key not configured"}),
        }

    client = OpenAI(api_key=api_key)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "system", "content": SYSTEM_PROMPT}] + messages,
        max_tokens=600,
        temperature=0.7,
    )

    reply = response.choices[0].message.content

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"reply": reply}, ensure_ascii=False),
    }
