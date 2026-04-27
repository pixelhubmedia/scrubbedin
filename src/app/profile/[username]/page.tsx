import AppShell from "@/components/app/AppShell";
import ProfileView from "./ProfileView";

export default function ProfilePage({ params }: { params: { username: string } }) {
  return (
    <AppShell>
      <ProfileView username={params.username} />
    </AppShell>
  );
}
