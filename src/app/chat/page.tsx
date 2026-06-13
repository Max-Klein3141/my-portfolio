import { redirect } from "next/navigation";

/**
 * The chat experience now lives at /ask. Keep /chat working by
 * redirecting any old links to the canonical route.
 */
export default function ChatPage() {
  redirect("/ask");
}
