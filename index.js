import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { config } from "dotenv";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ToolMessage } from "@langchain/core/messages";

config();

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o",
});

const multiply = tool(
  async ({ a, b }) => {
    return a * b;
  },
  {
    name: "multiply",
    description: "Multiply two numbers",
    schema: z.object({
      a: z.number().describe("first number"),
      b: z.number().describe("second number"),
    }),
  }
);

const add = tool(
  async ({ a, b }) => {
    return a + b;
  },
  {
    name: "add",
    description: "Add two numbers together",
    schema: z.object({
      a: z.number().describe("first number"),
      b: z.number().describe("second number"),
    }),
  }
);

const divide = tool(
  async ({ a, b }) => {
    return a / b;
  },
  {
    name: "divide",
    description: "Divide two numbers",
    schema: z.object({
      a: z.number().describe("first number"),
      b: z.number().describe("second number"),
    }),
  }
);

const tools = [add, multiply, divide];

const toolsByName = Object.fromEntries(
  tools.map((tool) => [tool.name, tool])
);

const llmWithTools = llm.bindTools(tools);

async function llmCall(state) {
  const result = await llmWithTools.invoke([
    {
      role: "system",
      content:
        "You are a helpful assistant tasked with performing arithmetic on a set of inputs.",
    },
    ...state.messages,
  ]);

  return {
    messages: [result],
  };
}

async function toolNode(state) {
  const results = [];
  const lastMessage = state.messages.at(-1);

  if (lastMessage?.tool_calls?.length) {
    for (const toolCall of lastMessage.tool_calls) {
      const selectedTool = toolsByName[toolCall.name];

      if (!selectedTool) {
        throw new Error(`Unknown tool: ${toolCall.name}`);
      }

      const observation = await selectedTool.invoke(toolCall.args);

      results.push(
        new ToolMessage({
          content: String(observation),
          tool_call_id: toolCall.id,
        })
      );
    }
  }

  return {
    messages: results,
  };
}

function shouldContinue(state) {
  const lastMessage = state.messages.at(-1);

  if (lastMessage?.tool_calls?.length) {
    return "Action";
  }

  return "__end__";
}

const agentBuilder = new StateGraph(MessagesAnnotation)
  .addNode("llmCall", llmCall)
  .addNode("tools", toolNode)
  .addEdge("__start__", "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, {
    Action: "tools",
    __end__: "__end__",
  })
  .addEdge("tools", "llmCall")
  .compile();

const messages = [
    {
        role: 'user',
        content:  'Add 3 and 4 then multiple that by 100 and divide it by 2',
    },
];

const result = await agentBuilder.invoke({ messages });
console.log(result.messages);



