// Backend LLM Service
// This simulates an independent LLM service that publishes to Ably

import * as Ably from 'ably';

interface LLMService {
  processPrompt: (prompt: string, responseId: string) => void;
}

export class BackendLLMService implements LLMService {
  private client: Ably.Realtime;
  private channel: Ably.RealtimeChannel;
  private activeStreams = new Map<string, NodeJS.Timeout[]>();

  constructor(ablyKey: string, channelName: string) {
    this.client = new Ably.Realtime({
      key: ablyKey,
      clientId: 'backend-llm-service',
    });
    this.channel = this.client.channels.get(channelName);
  }

  processPrompt(prompt: string, responseId: string): void {
    // Sample responses
    const responses: { [key: string]: string } = {
      'What is Ably AI Transport?':
        'Ably AI Transport is a solution for building stateful, steerable, multi-device AI experiences into new or existing applications. You can use AI Transport as the transport layer with any LLM or agent framework, without rebuilding your existing stack or being locked to a particular vendor.',
    };

    // LLM-style chunking function - mimics how real AI APIs tokenize
    const chunkTextLikeAI = (text: string): string[] => {
      const chunks: string[] = [];
      let pos = 0;
      while (pos < text.length) {
        const size = Math.floor(Math.random() * 8) + 1;
        chunks.push(text.slice(pos, pos + size));
        pos += size;
      }
      return chunks.filter((chunk) => chunk.length > 0);
    };

    const responseText = responses[prompt];
    const tokens = chunkTextLikeAI(responseText);
    let tokenIndex = 0;
    const timeouts: NodeJS.Timeout[] = [];

    const publishToken = () => {
      if (tokenIndex < tokens.length) {
        this.channel.publish({
          name: 'token',
          data: {
            token: tokens[tokenIndex],
          },
          extras: {
            headers: {
              responseId,
            },
          },
        });

        tokenIndex++;

        // Schedule next token with realistic delay
        const delay = Math.random() * 150 + 50;
        const timeout = setTimeout(publishToken, delay);
        timeouts.push(timeout);
      } else {
        this.channel.publish({
          name: 'stream-complete',
          data: {},
          extras: {
            headers: {
              responseId,
            },
          },
        });
        this.activeStreams.delete(responseId);
      }
    };

    // Store timeouts for potential cancellation
    this.activeStreams.set(responseId, timeouts);

    // Start processing after brief delay
    const initialTimeout = setTimeout(publishToken, 300);
    timeouts.push(initialTimeout);
  }
}

// This simulates the API call a frontend would make to trigger LLM processing
export const requestLLMProcessing = async (
  prompt: string,
  responseId: string,
  ablyKey: string,
  channelName: string,
) => {
  new BackendLLMService(ablyKey, channelName).processPrompt(prompt, responseId);
};
