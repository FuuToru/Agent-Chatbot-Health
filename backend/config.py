# app/config.py

import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq

load_dotenv()

TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
REDIS_URL = os.getenv("REDIS_URL")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GENAI_API_KEY = os.getenv("GENAI_API_KEY")

# LLM trả lời chính
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    api_key=GENAI_API_KEY,
    streaming=True
)

# LLM phân loại câu hỏi
llm_classifier = ChatGroq(
    model="llama3-8b-8192",
    api_key=GROQ_API_KEY
)
