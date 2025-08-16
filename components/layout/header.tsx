"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Calendar, BookOpen, Home, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About us', href: '/about', icon: BookOpen },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-transform group-hover:scale-105">
                <Image
                  src="/Images/e-cell-logo.jpeg"
                  alt="E-Cell USTU Logo"
                  width={42}
                  height={42}
                  className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
                  priority
                />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/summit">Summit 2024</Link>
            </Button>
            
            {/* Show Get Passes button only when signed out */}
            <SignedOut>
              <Button 
                size="sm" 
                onClick={() => router.push('/sign-in')}
              >
                Get Passes
              </Button>
            </SignedOut>
            
            {/* Show User Button when signed in */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/summit" onClick={() => setIsMobileMenuOpen(false)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Summit 2024
                  </Link>
                </Button>
                
                {/* Mobile Get Passes button - only when signed out */}
                <SignedOut>
                  <Button 
                    className="w-full justify-start" 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push('/sign-in');
                    }}
                  >
                    Get Passes
                  </Button>
                </SignedOut>
                
                {/* Mobile User Button when signed in */}
                <SignedIn>
                  <div className="flex justify-center py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}