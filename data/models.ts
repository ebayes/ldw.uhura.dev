export const models = [
    {
      value: "claude-3-5-sonnet-20240620",
      label: "Claude 3.5 Sonnet",
      provider: "anthropic",
      company: "Anthropic",
      icon: "/claude.svg",
      description: "Claude 3.5 Sonnet strikes the ideal balance between intelligence and speed—particularly for enterprise workloads. It delivers strong performance at a lower cost compared to its peers, and is engineered for high endurance in large-scale AI deployments.",
    },
    {
      value: "gpt-4o",
      label: "GPT 4o",
      provider: "openai",
      company: "OpenAI",
      icon: "/openai.svg",
      description: "GPT-4o from OpenAI has broad general knowledge and domain expertise allowing it to follow complex instructions in natural language and solve difficult problems accurately. It matches GPT-4 Turbo performance with a faster and cheaper API.",
    },
    {
      value: "gpt-4-turbo",
      label: "GPT 4 Turbo",
      provider: "openai",
      company: "OpenAI",
      icon: "/openai.svg",
      description: "GPT 4 Turbo from OpenAI has broad general knowledge and domain expertise allowing it to follow complex instructions in natural language and solve difficult problems accurately. It has a knowledge cutoff of April 2023 and a 128,000 token context window.",
    },
    {
      value: "gpt-3.5-turbo",
      label: "GPT 3.5",
      provider: "openai",
      company: "OpenAI",
      icon: "/openai.svg",
      description: "OpenAI's most capable and cost-effective model in the GPT-3.5 family optimized for chat purposes, but also works well for traditional completions tasks. It has a context length of 4,096 tokens.",
    },
    {
      value: "mistral-large-latest",
      label: "Mistral Large",
      provider: "mistral",
      company: "Mistral",
      icon: "/mistral.svg",
      description: "Mistral Large is ideal for complex tasks that require large reasoning capabilities or are highly specialized—like Synthetic Text Generation, Code Generation, RAG, or Agents.",
    },
    {
      value: "models/gemini-1.5-pro-latest",
      label: "Gemini Pro 1.5",
      provider: "google",
      company: "Google",
      icon: "/google.svg",
      description: "Gemini 1.5 Pro is the latest model of the Gemini family. It's a mid-size multimodal model that supports up to 1 million tokens and excels at long-context tasks.",
    },
  ]

  export const languages = [
    {
      label: "English",
      value: "en",
    },
    {
      label: "Amharic",
      value: "am",
    },
    {
      label: "Hausa",
      value: "ha",
    },
    {
      label: "Northern Sotho (Sepedi)",
      value: "nso",
    },
    {
      label: "Swahili",
      value: "swa",
    },
    {
      label: "Yoruba",
      value: "ti",
    },
    {
      label: "Zulu",
      value: "zu",
    },
  ]


  {/*     
{
      value: "OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
      label: "Aya",
      provider: "huggingface",
      icon: "/cohere.svg",
    },
    */}