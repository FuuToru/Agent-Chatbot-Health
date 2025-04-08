# app/chains.py

from langchain_core.prompts import ChatPromptTemplate
from langchain.agents import Tool, initialize_agent
from langchain.agents.agent_types import AgentType
from app.config import llm, llm_classifier
from app.search_utils import get_content

# Phân loại câu hỏi
system_query = """
Giả sử bạn là chuyên gia xác thực câu hỏi y khoa, bạn hãy trả lời câu hỏi sau có phải là câu hỏi y khoa không?
Nếu là câu hỏi y khoa thì trả về "health", nếu không thì trả về "normal".
Không cần giải thích thêm.
Câu hỏi: {human_question}
"""

prompt_query = ChatPromptTemplate.from_messages([
    ("system", system_query),
    ("human", "{human_question}")
])

chain_query = prompt_query | llm_classifier

# Tool để tìm thông tin y khoa
medical_tool = Tool.from_function(
    name="get_medical_info",
    func=get_content,
    description="Truy xuất thông tin y khoa từ trang web Tam Anh Hospital dựa trên câu hỏi"
)

# Agent sử dụng tool và LLM chính
agent_executor = initialize_agent(
    tools=[medical_tool],
    llm=llm,
    agent=AgentType.OPENAI_FUNCTIONS,
    verbose=True
)
