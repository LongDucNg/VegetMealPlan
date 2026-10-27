import { ChatSuggestionItem } from '../constants/chat-suggestions.constant';

export interface SuggestedRecipeItem {
  recipe_id: number;
  title: string;
}

export interface ChatResponseData {
  conversation_id: number;
  answer: string;
  remaining_queries: number | null;
  suggested_recipes: SuggestedRecipeItem[];
}

export interface ChatHistoryItem {
  conversation_id: number;
  question: string;
  answer: string;
  created_at: Date;
}

export interface ChatHistoryResponseData {
  items: ChatHistoryItem[];
  meta: {
    page: number;
    limit: number;
    total_items: number;
    total_pages: number;
  };
}

export interface ChatSuggestionsResponseData {
  suggestions: ChatSuggestionItem[];
}

/**
 * Hàm ánh xạ duy nhất để chuẩn hóa dữ liệu trả về cho client.
 * Nếu FE thay đổi quy ước đặt tên (ví dụ: conversationId, reply, remainingQuota...),
 * chỉ cần cập nhật tại hàm này.
 */
export function mapChatResponse(data: {
  conversation_id: number;
  answer: string;
  remaining_queries: number | null;
  suggested_recipes?: SuggestedRecipeItem[];
}): ChatResponseData {
  return {
    conversation_id: data.conversation_id,
    answer: data.answer,
    remaining_queries: data.remaining_queries,
    suggested_recipes: data.suggested_recipes || [],
  };
}

export function mapChatHistoryResponse(data: {
  items: Array<{
    conversation_id: number;
    question: string;
    answer: string;
    created_at: Date;
  }>;
  page: number;
  limit: number;
  total: number;
}): ChatHistoryResponseData {
  return {
    items: data.items.map((item) => ({
      conversation_id: item.conversation_id,
      question: item.question,
      answer: item.answer,
      created_at: item.created_at,
    })),
    meta: {
      page: data.page,
      limit: data.limit,
      total_items: data.total,
      total_pages: Math.ceil(data.total / data.limit) || 1,
    },
  };
}

export function mapChatSuggestionsResponse(
  suggestions: ChatSuggestionItem[],
): ChatSuggestionsResponseData {
  return {
    suggestions,
  };
}
