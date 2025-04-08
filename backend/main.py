# main.py

from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from app.models import QuestionRequest
from app.chains import chain_query, agent_executor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://hospitals.ifobito.online"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def home():
    return {"message": "Chào mừng đến với Tam Anh Hospital!"}

@app.post("/ask")
async def ask(request: QuestionRequest):
    if not request.question:
        raise HTTPException(status_code=400, detail="Câu hỏi là bắt buộc")

    user_input = request.question

    async def process():
        result = await chain_query.ainvoke({"human_question": user_input})
        is_health = result.content.strip().lower() == "health"

        if is_health:
            response = await agent_executor.ainvoke(user_input)
            yield response["output"]
        else:
            yield "Câu hỏi này không liên quan đến y khoa. Em xin phép không trả lời ạ."

    return StreamingResponse(process(), media_type="text/plain")
