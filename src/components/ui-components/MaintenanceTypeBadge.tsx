
import { Badge } from "@/components/ui/badge";
import { MaintenanceType } from "@/types";
import { cn } from "@/lib/utils";

interface MaintenanceTypeBadgeProps {
  type: MaintenanceType;
  className?: string;
}

const MaintenanceTypeBadge = ({ type, className }: MaintenanceTypeBadgeProps) => {
  const getTypeClasses = (type: MaintenanceType) => {
    switch (type) {
      case "Oil Change":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Tire Rotation":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "Brake Service":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "General Inspection":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Engine Service":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "Transmission Service":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200";
      case "Other":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(getTypeClasses(type), "font-normal", className)}
    >
      {type}
    </Badge>
  );
};

export default MaintenanceTypeBadge;
