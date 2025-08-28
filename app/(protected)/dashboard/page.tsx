"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to tickets page by default
    router.replace('/dashboard/tickets');
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  );
}
