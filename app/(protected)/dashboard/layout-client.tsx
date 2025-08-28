"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Ticket, 
  Award, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useClerk } from '@clerk/nextjs';
import Image from 'next/image';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: Home,
    isActive: (p: string) => p === '/dashboard'
  },
  { 
    name: 'Reserved Tickets', 
    href: '/dashboard/tickets', 
    icon: Ticket,
    isActive: (p: string) => p.startsWith('/dashboard/tickets')
  },
  { 
    name: 'Certifications', 
    href: '/dashboard/certifications', 
    icon: Award,
    isActive: (p: string) => p.startsWith('/dashboard/certifications')
  },
  { 
    name: 'Settings', 
    href: '/dashboard/settings', 
    icon: Settings,
    isActive: (p: string) => p.startsWith('/dashboard/settings')
  },
];

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-background/95 backdrop-blur-sm border shadow-sm"
        >
          {isMobileMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transition-transform duration-300 ease-in-out lg:translate-x-0 lg:transition-none",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center h-16 px-6 border-b">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-105">
                  <Image
                    src="/Images/e-cell-logo.jpeg"
                    alt="E-Cell USTU Logo"
                    width={32}
                    height={32}
                    className="w-6 h-6 object-contain"
                    priority
                  />
                </div>
              </div>
              <span className="font-semibold text-foreground">E-Cell Dashboard</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = item.isActive(pathname);
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "flex items-center w-full px-3 py-2.5 text-sm rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className={cn(
                    "h-4 w-4 mr-3 transition-colors",
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  <span className={cn(
                    "transition-colors",
                    isActive ? "font-semibold" : "font-medium"
                  )}>
                    {item.name}
                  </span>
                  {isActive && (
                    <ChevronRight className="h-4 w-4 ml-auto text-primary-foreground" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl"
            >
              <LogOut className="h-4 w-4 mr-3" />
              <span className="font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="min-h-screen">
          {/* Content Area */}
          <div className="pt-16 lg:pt-0">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
