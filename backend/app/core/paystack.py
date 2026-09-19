import hashlib
import hmac

import httpx

from app.core.config import settings

PAYSTACK_BASE_URL = "https://api.paystack.co"


async def initialize_transaction(
    email: str, amount_kes: float, reference: str, callback_url: str
) -> dict:
    """Calls Paystack's transaction/initialize endpoint. Amount must be sent
    in the smallest currency unit (cents), not whole KES — Paystack always
    expects this regardless of currency."""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{PAYSTACK_BASE_URL}/transaction/initialize",
            headers={"Authorization": f"Bearer {settings.paystack_secret_key}"},
            json={
                "email": email,
                "amount": int(round(amount_kes * 100)),
                "currency": "KES",
                "reference": reference,
                "callback_url": callback_url,
            },
        )
        response.raise_for_status()
        return response.json()


def verify_webhook_signature(raw_body: bytes, signature: str) -> bool:
    """Paystack signs every webhook payload with HMAC-SHA512 using your
    secret key. If this doesn't match, the request didn't genuinely come
    from Paystack and must be rejected — otherwise anyone could POST a fake
    'charge.success' event and get an unpaid order marked as paid."""
    computed = hmac.new(
        settings.paystack_secret_key.encode("utf-8"), raw_body, hashlib.sha512
    ).hexdigest()
    return hmac.compare_digest(computed, signature)
