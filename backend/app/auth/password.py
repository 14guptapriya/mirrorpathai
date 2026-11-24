import base64
import hashlib
import hmac
import os

# PBKDF2-HMAC-SHA256 settings
_ITERATIONS = 300_000
_SALT_SIZE = 16


def _generate_salt() -> bytes:
    return os.urandom(_SALT_SIZE)


def _derive_key(password: str, salt: bytes, iterations: int = _ITERATIONS) -> bytes:
    return hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt,
        iterations,
        dklen=32
    )


def hash_password(password: str) -> str:
    """Hash a plain password and return a stored string."""
    salt = _generate_salt()
    key = _derive_key(password, salt)
    return "pbkdf2_sha256${}${}${}".format(
        _ITERATIONS,
        base64.b64encode(salt).decode("ascii"),
        base64.b64encode(key).decode("ascii")
    )


def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:
    """Verify plain password against a stored hash."""
    try:
        algorithm, iterations, salt_b64, key_b64 = hashed_password.split("$")
        if algorithm != "pbkdf2_sha256":
            return False
        salt = base64.b64decode(salt_b64)
        stored_key = base64.b64decode(key_b64)
        computed_key = _derive_key(plain_password, salt, int(iterations))
        return hmac.compare_digest(stored_key, computed_key)
    except Exception:
        return False
