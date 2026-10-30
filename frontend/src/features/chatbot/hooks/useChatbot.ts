"use client";

import { useState, useCallback } from "react";
import { ChatbotMessage } from "../types";
import { chatbotService } from "../services/chatbotService";

const INITIAL_MESSAGES: ChatbotMessage[] = [
  {
    id: "m-welcome",
    sender: "ai",
    text: "Xin chào! Tôi là Trợ lý Dinh dưỡng AI của VeggieHub. Tôi có thể giúp bạn giải đáp về thực đơn chay, tính calo, gợi ý món ăn phù hợp với mục tiêu và dị ứng của bạn. Bạn muốn tìm hiểu gì hôm nay?",
    timestamp: "Vừa xong",
  },
];

export function useChatbot() {
  const [messages, setMessages] = useState<ChatbotMessage[]>(INITIAL_MESSAGES);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed) return;

    const userMessageId = `u-${Math.random().toString(36).substring(2, 9)}`;
    const userMsg: ChatbotMessage = {
      id: userMessageId,
      sender: "user",
      text: trimmed,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const aiReply = await chatbotService.processUserMessage(trimmed);
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error("[useChatbot] error processing message:", err);
      const fallback: ChatbotMessage = {
        id: `ai-err-${Math.random().toString(36).substring(2, 9)}`,
        sender: "ai",
        text: "Hệ thống gặp sự cố nhỏ khi xử lý câu hỏi của bạn. Vui lòng thử hỏi lại sau giây lát nhé!",
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, fallback]);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetChat = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
  }, []);

  return {
    messages,
    loading,
    sendMessage,
    resetChat,
  };
}
