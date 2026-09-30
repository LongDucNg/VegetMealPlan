export interface CommentItem {
  id: string;
  author: string;
  authorInitials: string;
  verified?: boolean;
  content: string;
  timestamp: string;
  votes: number;
  userVoted?: "up" | "down" | null;
}

export interface VideoRecipe {
  id: string;
  title: string;
  duration: string;
  author: string;
  authorHandle: string;
  authorInitials: string;
  verified: boolean;
  views: string;
  rating: number;
  reviewsCount?: string;
  kcal: number;
  time: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  cuisine: string;
  category: string;
  image?: string;
  description: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  aiSummary: {
    durationNote: string;
    keyIngredients: string[];
    speechTranscript: string;
  };
  comments: CommentItem[];
}
