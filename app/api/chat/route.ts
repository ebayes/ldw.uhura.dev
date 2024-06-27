import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { cohere } from '@ai-sdk/cohere';
import { mistral } from '@ai-sdk/mistral';
import { streamText, HuggingFaceStream, StreamingTextResponse } from 'ai';
import { experimental_buildOpenAssistantPrompt } from 'ai/prompts';
import { HfInference } from '@huggingface/inference';
import { pipeline, AutoTokenizer, AutoModelForCausalLM } from '@xenova/transformers';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Create a new HuggingFace Inference instance
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, model, provider, language } = await req.json();

  const systemMessage = `You are an expert helpful ${language} linguist. Respond in ${language}.`;

  if (provider === 'huggingface') {
    const response = Hf.textGenerationStream({
      model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
      inputs: experimental_buildOpenAssistantPrompt(messages),
      parameters: {
        max_new_tokens: 200,
        typical_p: 0.2,
        repetition_penalty: 1,
        truncate: 1000,
        return_full_text: false
      }
    });

    const stream = HuggingFaceStream(response);
    return new StreamingTextResponse(stream);
  } else {
    let selectedModel;
    switch (provider) {
      case 'anthropic':
        selectedModel = anthropic(model || 'claude-3-5-sonnet-20240620');
        break;
      case 'cohere':
        selectedModel = cohere(model || 'command-r-plus');
        break;
      case 'mistral':
        selectedModel = mistral(model || 'mistral-large-latest');
        break;
      default:
        selectedModel = openai(model || 'gpt-4o');
    }

    const result = await streamText({
      model: selectedModel,
      system: systemMessage,
      messages,
    });

    return result.toAIStreamResponse();
  }
}