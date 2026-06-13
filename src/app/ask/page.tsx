import type { Metadata } from "next";
import ChatExperience from "@/components/chat/ChatExperience";

export const metadata: Metadata = {
  title: "Ask",
};

export default function AskPage() {
  return (
    <ChatExperience
      eyebrow="AI Interface"
      title="Ask me anything."
      emptyTitle="Ask me anything."
      emptySubtitle="An AI built on my background, projects, and thinking. Ask about what I'm building, how I think, or what I've worked on."
      inputPlaceholder="Ask me anything…"
    />
  );
}
