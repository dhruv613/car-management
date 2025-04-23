
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  fullScreen?: boolean;
}

const Loading = ({ className, fullScreen = false }: LoadingProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fullScreen && "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
        className
      )}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default Loading;
