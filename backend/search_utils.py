# app/search_utils.py

from langchain.tools.tavily_search import TavilySearchResults
from app.config import TAVILY_API_KEY

search = TavilySearchResults(api_key=TAVILY_API_KEY)

def get_content(query: str) -> str:
    results = search.run(query)
    contents = ""
    for r in results[:3]:  # Lấy tối đa 3 kết quả đầu tiên
        contents += f"\n{r['title']}\n{r['content']}\n"
    return contents
