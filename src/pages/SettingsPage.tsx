
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Settings } from "lucide-react";

const SettingsPage = () => {
  const { toast } = useToast();

  const handleReset = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure general system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Maintenance Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Configure how and when to receive maintenance notifications
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enable email notifications</span>
                  <Button variant="outline" size="sm" onClick={() => toast({
                    title: "Feature Coming Soon",
                    description: "Email notifications will be available in a future update."
                  })}>
                    Configure
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Data Management</h3>
                <p className="text-sm text-muted-foreground">
                  Options for backing up and restoring your data
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Export all data</span>
                  <Button variant="outline" size="sm" onClick={() => toast({
                    title: "Feature Coming Soon",
                    description: "Data export will be available in a future update."
                  })}>
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleReset}>
                Reset to Defaults
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Settings</CardTitle>
              <CardDescription>
                Manage your account and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Account Information</h3>
                <p className="text-sm text-muted-foreground">
                  Update your account details and password
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Change password</span>
                  <Button variant="outline" size="sm" onClick={() => toast({
                    title: "Feature Coming Soon",
                    description: "Password change will be available in a future update."
                  })}>
                    Update
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Display Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Customize the appearance of your dashboard
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Theme preference</span>
                  <Button variant="outline" size="sm" onClick={() => toast({
                    title: "Feature Coming Soon",
                    description: "Theme options will be available in a future update."
                  })}>
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleReset}>
                Reset Preferences
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About Car Management System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                Version: 1.0.0
              </p>
              <p className="text-sm">
                Built with: React, TypeScript, Tailwind CSS, shadcn/ui
              </p>
              <p className="text-sm">
                This car management system helps you efficiently track and maintain your vehicle fleet.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
