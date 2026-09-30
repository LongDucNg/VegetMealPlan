"use client";

import { useState, useCallback } from "react";
import { ChatbotMessage } from "../types";
import { chatbotService } from "../services/chatbotService";

const INITIAL_MESSAGES: ChatbotMessage[] = [
  {
    id: "m-welcome",
    sender: "ai",
    text: "Hello! I'm your VeggieHub AI Nutritionist. I can recommend meals based on your daily calories, explain your BMI, check ingredient allergies, or advise on plant-based nutrient absorption. What can I help you with today?",
    timestamp: "Just now",
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
        text: "I encountered a minor issue processing your question. Please try asking again!",
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
