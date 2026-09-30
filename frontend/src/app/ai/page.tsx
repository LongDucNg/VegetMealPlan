"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { PremiumGuard } from "@/features/subscription/guards/PremiumGuard";
import { ChatbotInterface } from "@/features/chatbot/components/ChatbotInterface";

export default function AIPage() {
  const { ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[900px] mx-auto w-full">
        <PageHeader
          eyebrow="AI Assistant"
          title="AI Nutritionist"
          subtitle="Ask about ingredient swaps, macro balancing, B12 requirements, or how to personalize your diet for your health goals."
        />

        {!ready ? (
          <GatedSkeleton />
        ) : (
          <PremiumGuard feature="ai-chatbot">
            <ChatbotInterface />
          </PremiumGuard>
        )}
      </div>
    </AppShell>
  );
}
