import os
import json
import urllib.request
import urllib.parse

def send_to_amocrm(lead_data: dict) -> dict:
    """Создаёт лид в AmoCRM через API v4"""
    subdomain = os.environ.get("AMO_SUBDOMAIN", "")
    token = os.environ.get("AMO_ACCESS_TOKEN", "")

    if not subdomain or not token:
        return {"ok": False, "error": "AMO credentials not configured"}

    name = lead_data.get("name", "Новый лид")
    phone = lead_data.get("phone", "")
    email = lead_data.get("email", "")
    note = lead_data.get("note", "")
    source = lead_data.get("source", "Сайт")

    lead_name = f"{source}: {name}"

    payload = [
        {
            "name": lead_name,
            "custom_fields_values": [
                {"field_code": "PHONE", "values": [{"value": phone, "enum_code": "WORK"}]},
                {"field_code": "EMAIL", "values": [{"value": email, "enum_code": "WORK"}]},
            ] if phone or email else [],
            "_embedded": {
                "contacts": [{"name": name}],
                "tags": [{"name": source}],
            },
        }
    ]

    if note:
        payload[0]["_embedded"]["notes"] = [
            {"note_type": "common", "params": {"text": note}}
        ]

    url = f"https://{subdomain}.amocrm.ru/api/v4/leads/complex"
    body = json.dumps(payload).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return {"ok": True, "status": resp.status}
    except urllib.error.HTTPError as e:
        return {"ok": False, "error": f"AmoCRM HTTP {e.code}: {e.read().decode()}"}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def send_to_1c(lead_data: dict) -> dict:
    """Отправляет заявку в 1С (настроить URL после подключения 1С)"""
    url_1c = os.environ.get("ONS_WEBHOOK_URL", "")
    if not url_1c:
        return {"ok": False, "skipped": True, "reason": "1C not configured"}

    body = json.dumps(lead_data, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        url_1c,
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return {"ok": True, "status": resp.status}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def handler(event: dict, context) -> dict:
    """Приём лидов с сайта: форма заявки, калькулятор, чат. Передача в AmoCRM и 1С."""

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

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "name and phone required"}, ensure_ascii=False),
        }

    source = body.get("source", "Форма сайта")
    email = body.get("email", "").strip()
    company = body.get("company", "").strip()
    volume = body.get("volume", "")
    coffee = body.get("coffee", "")
    packaging = body.get("packaging", "")
    roast = body.get("roast", "")
    design = body.get("design", "")
    comment = body.get("comment", "").strip()

    note_parts = [f"Источник: {source}"]
    if company:
        note_parts.append(f"Компания: {company}")
    if volume:
        note_parts.append(f"Объём: {volume}")
    if coffee:
        note_parts.append(f"Кофе: {coffee}")
    if roast:
        note_parts.append(f"Обжарка: {roast}")
    if packaging:
        note_parts.append(f"Упаковка: {packaging}")
    if design:
        note_parts.append(f"Дизайн: {design}")
    if comment:
        note_parts.append(f"Комментарий: {comment}")

    note = "\n".join(note_parts)

    lead_data = {
        "name": name,
        "phone": phone,
        "email": email,
        "company": company,
        "source": source,
        "note": note,
        "volume": volume,
        "coffee": coffee,
        "roast": roast,
        "packaging": packaging,
        "design": design,
        "comment": comment,
    }

    amo_result = send_to_amocrm(lead_data)
    ons_result = send_to_1c(lead_data)

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            "ok": True,
            "amocrm": amo_result,
            "1c": ons_result,
        }, ensure_ascii=False),
    }
