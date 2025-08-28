import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import DashboardLayoutClient from './layout-client';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }

  // Ensure user exists in Supabase
  const sb = supabaseAdmin();
  const u = await currentUser();
  
  await sb.from("users").upsert({
    id: userId,
    name: u?.fullName ?? null,
    email: u?.primaryEmailAddress?.emailAddress ?? null,
  });

  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
