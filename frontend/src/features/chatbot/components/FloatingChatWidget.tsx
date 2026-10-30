"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  MessageCircle,
  X,
  Send,
  RotateCcw,
  Bot,
  ExternalLink,
  ChevronDown,
  Loader2,
  UtensilsCrossed,
} from "lucide-react";
import { useChatbot } from "../hooks/useChatbot";
import { chatbotService, cleanChatText } from "../services/chatbotService";

export function FloatingChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { messages, loading, sendMessage, resetChat } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Kiểm tra route loại trừ: không hiển thị ở các trang đăng nhập/auth và trang admin
  const isExcluded =
    !pathname ||
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname === "/register" ||
    pathname.startsWith("/register/") ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/forgot-password/") ||
    pathname === "/verify-email" ||
    pathname.startsWith("/verify-email/") ||
    pathname.startsWith("/auth") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  // 2. Load suggestions từ server khi mở chat
  useEffect(() => {
    if (isOpen && suggestions.length === 0) {
      chatbotService.getSuggestions().then((res) => {
        if (res?.length) setSuggestions(res);
      });
    }
  }, [isOpen, suggestions.length]);

  // 3. Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, isOpen]);

  // Nếu thuộc trang loại trừ thì không render
  if (isExcluded) return null;

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;
    sendMessage(text);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Cửa sổ Chatbot Popup khi mở */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] h-[580px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-stone-200/90 flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-4 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-emerald-300 border border-white/10 shadow-inner">
                <Bot className="w-5 h-5 text-emerald-300" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-900 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  Trợ lý Dinh dưỡng AI
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-700/80 text-emerald-200 px-1.5 py-0.5 rounded-full border border-emerald-600/50">
                    Groq
                  </span>
                </h3>
                <p className="text-[11px] text-emerald-200/90">
                  Tư vấn thực đơn & giải đáp ẩm thực chay
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Làm mới cuộc trò chuyện"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Đóng chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body tin nhắn */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/50 text-xs">
            {messages.map((m) => {
              const isAi = m.sender === "ai";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isAi ? "items-start" : "items-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      isAi
                        ? "bg-white text-stone-800 border border-stone-200/80 shadow-xs"
                        : "bg-emerald-700 text-white shadow-xs font-medium"
                    }`}
                  >
                    <p className="whitespace-pre-line">{cleanChatText(m.text)}</p>

                    {/* Danh sách công thức gợi ý đính kèm nếu có */}
                    {m.suggested_recipes && m.suggested_recipes.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-stone-100 space-y-1.5">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                          Món ăn gợi ý liên quan:
                        </span>
                        {m.suggested_recipes.map((rec) => (
                          <Link
                            key={rec.recipe_id}
                            href={`/recipes/${rec.recipe_id}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between gap-2 p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 transition-colors border border-emerald-200/60 group"
                          >
                            <span className="font-semibold truncate text-[11px] flex items-center gap-1.5">
                              <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              {rec.title}
                            </span>
                            <ExternalLink className="w-3 h-3 text-emerald-700 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 px-1">
                    {m.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Loading indicator khi AI đang trả lời */}
            {loading && (
              <div className="flex items-center gap-2 text-stone-500 bg-white border border-stone-200/80 px-3.5 py-2 rounded-2xl w-fit shadow-xs">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                <span className="text-xs">AI đang chuẩn bị câu trả lời...</span>
              </div>
            )}

            {/* Gợi ý câu hỏi nhanh */}
            {messages.length <= 2 && suggestions.length > 0 && (
              <div className="pt-2 space-y-1.5">
                <span className="text-[11px] font-semibold text-stone-500 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Gợi ý câu hỏi phổ biến:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.slice(0, 4).map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(sug)}
                      className="text-[11px] text-stone-700 bg-white hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200 rounded-xl px-2.5 py-1 transition-colors text-left cursor-pointer"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-white border-t border-stone-100 flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Hỏi AI về món ăn, lượng calo, dinh dưỡng..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="flex-1 h-10 rounded-xl border border-stone-200 bg-stone-50/60 px-3.5 text-xs text-stone-800 placeholder:text-stone-400 focus:bg-white focus:border-emerald-600 outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer shrink-0"
              title="Gửi tin nhắn"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Biểu tượng tròn Chat Floating Trigger ở góc dưới màn hình */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Mở Chatbot AI Dinh dưỡng"
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 hover:from-emerald-800 hover:to-teal-600 text-white shadow-xl shadow-emerald-950/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ring-4 ring-emerald-500/20 group"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-amber-950 font-bold text-[10px] flex items-center justify-center shadow-xs border-2 border-white">
                AI
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
}

