// src/services/aiService.ts

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface NVIDIAResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

class AIService {
  private baseUrl: string;
  private model: string;

  constructor() {
    // Use the local proxy defined in vite.config.ts
    this.baseUrl = '/api'; 
    this.model = 'nvidia/llama-3.1-nemotron-70b-instruct';
  }

  async sendMessage(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: `You are Shark AI, a marine data assistant. Always format your answers in a clear, structured way using Markdown.
- Use bold text ('**text**') for headings or key terms.
- Use bullet points with a hyphen (-) for lists.
  - For sub-bullets, indent with two spaces and use a hyphen (-).
- When presenting tabular data, use Markdown tables.`
            },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 1024,
          top_p: 1,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Backend error: ${response.status} - ${errorData.error || 'Unknown error'}`);
      }

      const data: NVIDIAResponse = await response.json();

      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from NVIDIA API');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling backend AI proxy:', error);
      throw error;
    }
  }
}

export const aiService = new AIService();
export type { ChatMessage };