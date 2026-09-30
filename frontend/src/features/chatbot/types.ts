export interface SubstitutionItem {
  original: string;
  substitute: string;
  reason: string;
  ratio: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  substitution?: SubstitutionItem;
}

export interface ChatbotMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  suggestedRecipeId?: string;
  substitution?: SubstitutionItem;
}

export interface ChatSuggestion {
  text: string;
  category: "dinner" | "macros" | "bmi" | "general";
}
