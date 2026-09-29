export interface ChatbotMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  suggestedRecipeId?: string;
  substitution?: {
    original: string;
    substitute: string;
    reason: string;
    ratio: string;
  };
}

export interface ChatSuggestion {
  text: string;
  category: "dinner" | "macros" | "bmi" | "general";
}
