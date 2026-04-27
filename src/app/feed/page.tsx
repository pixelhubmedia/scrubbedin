import AppShell from "@/components/app/AppShell";
import FeedClient from "./FeedClient";

export const metadata = { title: "Feed — Scrubbed In" };

export default function FeedPage() {
  return (
    <AppShell>
      <FeedClient />
    </AppShell>
  );
}
