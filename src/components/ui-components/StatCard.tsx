
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-primary",
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("flex items-center h-full overflow-hidden", className)}>
      {Icon && (
        <div className={cn("p-4 flex items-center justify-center", iconColor)}>
          <Icon size={24} />
        </div>
      )}
      <div className="flex-1">
        <CardHeader className="py-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <CardDescription className="text-2xl font-bold">{value}</CardDescription>
        </CardHeader>
        {description && (
          <CardContent className="py-0 pb-2">
            <p className="text-xs text-muted-foreground">{description}</p>
          </CardContent>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
