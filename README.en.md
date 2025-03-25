# 🌐 Agent ChatBot For Healthcare

## Short Description  
A healthcare chatbot leveraging AI, built with FastAPI and React, to provide health information, advice, and support using data from the Tam Anh Hospital website.

## Introduction  
**Agent ChatBot For Healthcare** is an online platform powered by artificial intelligence, designed to assist users in managing their health. Key capabilities include:  
- Answering questions about symptoms, treatments, and medication instructions.  
- Reminding users of medical appointments and tracking health conditions.  
- Connecting users to doctors via Tam Anh Hospital’s online channels.  

With a user-friendly interface, this chatbot offers a convenient solution for accessing accurate medical information anytime, anywhere.

## Project Structure

```
fuutoru-agent-chatbot-health/
├── README.md                  # Documentation
├── docker-compose.yml         # Docker Compose configuration
├── backend/                   # FastAPI backend
│   ├── Dockerfile             # Dockerfile for backend
│   ├── app.py                 # Main FastAPI application
│   └── requirements.txt       # Python dependencies
└── frontend/                  # React frontend
    ├── Dockerfile             # Dockerfile for frontend
    ├── index.html             # Main HTML page
    ├── package.json           # Node.js dependencies
    ├── tsconfig.json          # TypeScript configuration
    ├── vite.config.ts         # Vite configuration
    └── src/                   # React source code
        ├── App.tsx            # Main application component
        ├── components/        # UI components
        └── styles.css         # Global CSS
```

## Features  
- **Health Consultation**: Answers health-related questions using data from `tamanhhospital.vn`.  
- **Chat History**: Persists conversation history with Redis for context retention.  
- **Intuitive UI**: React-based frontend with a minimal design and Markdown support.  
- **Streaming Responses**: Real-time replies from the AI model.  

## Prerequisites  
- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/install/)  
- API keys for Google Generative AI and Grok (configured in `.env`).  

## Installation  

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/fuutoru/agent-chatbot-health.git
   cd agent-chatbot-health
   ```

2. **Create a `.env` file in the root directory**:  
   ```plaintext
   REDIS_URL=redis://redis:6379/0
   GENAI_API_KEY=<your-google Lid-genai-api-key>
   GROQ_API_KEY=<your-grok-api-key>
   ```

3. **Build and run the services**:  
   ```bash
   docker-compose up --build
   ```
   - Backend (FastAPI): `http://localhost:8001`  
   - Frontend (React): `http://localhost:3001`  
   - Redis: `http://localhost:6371`  

## Usage  

### Accessing the Interface  
- Open your browser at `http://localhost:3001` to interact with the chatbot.  

### Example Interaction  
- **Input**: "What should I do if I have a headache?"  
  - **Output**:  
    ```
    Tam Anh Hospital thanks you for your question, Obito. Here’s my response:  
    Headaches can stem from stress, lack of sleep, or other health issues. Try resting, staying hydrated, and avoiding bright lights. If it persists, please visit the nearest Tam Anh Hospital for a check-up!  
    ```

### Backend API  
- **Endpoint**: `POST /ask`  
- **Request Body**:  
  ```json
  {
    "question": "What are the symptoms of a fever?"
  }
  ```  
- **Response**: Streamed Markdown text from the chatbot.  

## Website Interface  
![Main Interface](image.png)  
![Sample Chat](image-1.png)  

## System Pipeline  
![Pipeline](image-2.png)  

## Configuration  
- **Ports**:  
  - Backend: `8001`  
  - Frontend: `3001`  
  - Redis: `6371`  
- **AI Models**:  
  - Google Gemini (`gemini-2.0-flash-lite-preview-02-05`) for responses.  
  - Grok (`llama-3.3-70b-versatile`) for question validation.  

## Development  

- **Backend**: Modify `backend/app.py` and restart the container.  
- **Frontend**: Edit files in `frontend/src/`, then rebuild with `npm run build`.  

## Troubleshooting  
- **Backend not responding**: Verify API keys in `.env` and check logs with `docker-compose logs backend`.  
- **Frontend not loading**: Ensure the proxy to the backend is correct in `vite.config.ts`.  
- **Redis issues**: Confirm the Redis container is running (`docker ps`).  

## Contributing  
Feel free to submit issues or pull requests to enhance this project. Follow standard GitHub contribution workflows.  

## License  
This project is licensed under the [MIT License](LICENSE). See the LICENSE file for details.  

## Acknowledgments  
- [FastAPI](https://fastapi.tiangolo.com/) and [React](https://reactjs.org/) for the development frameworks.  
- [Tam Anh Hospital](https://tamanhhospital.vn/) for medical data.  
- [Google Generative AI](https://cloud.google.com/ai) and [Grok](https://xai.com) for AI models.  
