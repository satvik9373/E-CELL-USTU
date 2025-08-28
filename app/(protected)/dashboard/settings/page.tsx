"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Construction } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and configurations
        </p>
      </div>

      {/* Settings Content */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-primary" />
            <span>User Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-16 h-16 bg-accent/50 rounded-2xl flex items-center justify-center">
              <Construction className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Coming Soon</h3>
              <p className="text-muted-foreground max-w-md">
                User settings and preferences will be available here. 
                You'll be able to manage your profile, notifications, and account preferences.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
