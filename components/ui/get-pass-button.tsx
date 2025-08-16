"use client";

import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface GetPassButtonProps {
  eventTitle: string;
  className?: string;
}

export default function GetPassButton({ eventTitle, className }: GetPassButtonProps) {
  const router = useRouter();

  const handleGetPass = () => {
    // Here you can add logic to handle pass generation/download
    // For now, we'll just show an alert
    alert(`Pass claimed for ${eventTitle}!`);
  };

  return (
    <>
      {/* Show login button when signed out */}
      <SignedOut>
        <Button 
          className={className}
          onClick={() => router.push('/sign-in')}
        >
          Sign In to Get Pass
        </Button>
      </SignedOut>
      
      {/* Show get pass button when signed in */}
      <SignedIn>
        <Button 
          className={className}
          onClick={handleGetPass}
        >
          Get Pass
        </Button>
      </SignedIn>
    </>
  );
}
