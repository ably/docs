export type GuideProduct = 'pubsub' | 'chat' | 'spaces' | 'liveobjects' | 'ai-transport';
export type AIProvider = 'anthropic' | 'langchain' | 'openai' | 'vercel';

export type Guide = {
  id: string;
  name: string;
  description: string;
  link: string;
  products: GuideProduct[];
  aiProvider?: AIProvider;
};
