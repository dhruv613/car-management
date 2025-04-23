
import { Badge } from "@/components/ui/badge";
import { CarStatus } from "@/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: CarStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusClasses = (status: CarStatus) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Under Maintenance":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "Sold":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(getStatusClasses(status), "font-normal", className)}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
