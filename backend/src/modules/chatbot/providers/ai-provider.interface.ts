export interface AiHistoryTurn {
  role: 'user' | 'model';
  parts: string;
}

export interface AiPromptContext {
  systemInstruction: string;
  userMessage: string;
  history?: AiHistoryTurn[];
}

export interface AiProvider {
  readonly providerName: string;
  generateResponse(context: AiPromptContext): Promise<string>;
}
