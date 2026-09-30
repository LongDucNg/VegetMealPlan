"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, RotateCcw } from "lucide-react";
import { useChatbot } from "../hooks/useChatbot";
import { CHAT_SUGGESTIONS } from "../data/mockChatResponses";
import { ChatBubble } from "@/components/ui/ChatBubble";

export function ChatbotInterface() {
  const { messages, loading, sendMessage, resetChat } = useChatbot();
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    sendMessage(trimmed);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-210px)] min-h-[520px] max-h-[820px] bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-stone-100 bg-white">
        <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center shrink-0 shadow-xs">
          <Sparkles className="w-5 h-5 text-amber-950 fill-current" />
        </div>
        <div>
          <p className="text-sm font-bold text-stone-900">VeggieHub AI Nutritionist</p>
          <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            Online · Connected to your Profile & Meal Planner
          </span>
        </div>
        <button
          onClick={resetChat}
          className="ml-auto p-2 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer text-stone-400 hover:text-stone-600"
          title="Restart conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m) => (
          <ChatBubble
            key={m.id}
            sender={m.sender}
            text={m.text}
            timestamp={m.timestamp}
            substitution={m.substitution}
          />
        ))}

        {loading && (
          <div className="flex items-start gap-3.5 mb-5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-950 fill-current" />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-xs p-4 shadow-xs">
              <div className="flex gap-1.5 items-center h-5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-stone-300 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="px-5 pb-3 flex gap-2 overflow-x-auto scrollbar-none">
        {CHAT_SUGGESTIONS.map((s) => (
          <button
            key={s.text}
            onClick={() => handleSend(s.text)}
            disabled={loading}
            className="shrink-0 text-xs px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200 hover:border-emerald-300 transition-colors cursor-pointer font-medium disabled:opacity-50"
          >
            {s.text}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4 border-t border-stone-100 flex gap-2 bg-stone-50/50">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend(input);
            }
          }}
          disabled={loading}
          placeholder="Ask about meal ideas, BMI, calories, B12, or allergies..."
          className="flex-1 h-11 rounded-2xl border border-stone-200 bg-white px-4 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none disabled:opacity-50"
        />
        <button
          onClick={() => handleSend(input)}
          disabled={loading || !input.trim()}
          className="w-11 h-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-800 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
