# LangGraph AI Tool Calling Agent

A practical AI agent built with **LangGraph, OpenAI, and LangChain** that can understand user requests, decide when to use tools, execute the appropriate tool, and return a natural-language response.

The project demonstrates the core architecture behind **LLM-powered tool-calling agents** using a graph-based workflow.

## 🚀 Features

* 🤖 OpenAI-powered LLM agent
* 🔧 Custom tool calling with LangChain
* 🧠 LangGraph state-based workflow
* ➕ Addition tool
* ✖️ Multiplication tool
* ➗ Division tool
* 🔀 Conditional routing based on LLM output
* 🔁 LLM → Tool → LLM execution loop
* 🔐 Environment variable support with `.env`
* 📦 Modern ES Module JavaScript

## 🏗️ Architecture

```text
                    User Input
                        │
                        ▼
                  ┌───────────┐
                  │   LLM     │
                  │ ChatOpenAI│
                  └─────┬─────┘
                        │
                 Tool call required?
                    ┌───┴───┐
                   Yes      No
                    │        │
                    ▼        ▼
              ┌──────────┐  END
              │   Tools  │
              └────┬─────┘
                   │
                   │ Tool Result
                   ▼
              ┌───────────┐
              │    LLM    │
              └─────┬─────┘
                    │
                    ▼
              Final Response
```

## 🔄 Agent Workflow

The agent follows this workflow:

1. User sends a natural-language request.
2. OpenAI LLM analyzes the request.
3. The LLM decides whether a tool is required.
4. LangGraph routes the execution to the tool node.
5. The selected tool executes the operation.
6. The tool result is returned to the LLM.
7. The LLM generates the final response.


## 🛠️ Tech Stack

| Technology | Purpose                             |
| ---------- | ----------------------------------- |
| JavaScript | Application logic                   |
| Node.js    | Runtime                             |
| OpenAI     | LLM                                 |
| LangChain  | Tools and LLM integration           |
| LangGraph  | Agent workflow and state management |
| Zod        | Tool input validation               |
| dotenv     | Environment variables               |

## 📁 Project Structure

```text
langgraph-ai-tool-calling-agent/
│
├── index.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd langgraph-ai-tool-calling-agent
```

Install dependencies:

```bash
npm install
```

## 🔑 Environment Setup

Create a `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key
```

## ▶️ Run the Project

```bash
node index.js
```

## 🧠 Key Concepts Demonstrated

This project demonstrates practical implementation of:

* LLM Tool Calling
* Function Calling
* LangGraph StateGraph
* Agent Nodes
* Conditional Edges
* Tool Execution
* State Management
* LLM-to-Tool communication
* Tool-to-LLM feedback loop

