from mistralai.client import Mistral
from app.core.config import settings

client = Mistral(api_key=settings.MISTRAL_API_KEY)

def generate_embedding(text: str):

    response = client.embeddings.create(
        model="mistral-embed",
        inputs=[text]
    )

    return response.data[0].embedding