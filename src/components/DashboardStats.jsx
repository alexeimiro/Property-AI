import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  TrendingUp, 
  Star, 
  Activity, 
  Calendar,
  MapPin,
  DollarSign,
  Home,
  ArrowUpRight,
  ArrowDownRight,
  Percent
} from "lucide-react";

export function DashboardStats({ stats }) {
  if (!stats || !Array.isArray(stats) || stats.length === 0) {
    return (
      <div className="w-full p-4 text-center">
        <p className="text-muted-foreground">No dashboard data available</p>
      </div>
    );
  }

  const getIcon = (type) => {
    switch (type) {
      case "dollar":
        return <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white" />;
      case "trend":
        return <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />;
      case "home":
        return <Home className="h-4 w-4 sm:h-5 sm:w-5 text-white" />;
      case "discount":
        return <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />;
      default:
        return <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white" />;
    }
  };
  
  const iconColors = {
    "dollar": "bg-green-500 dark:bg-green-600",
    "trend": "bg-blue-500 dark:bg-blue-600",
    "home": "bg-purple-500 dark:bg-purple-600",
    "discount": "bg-amber-500 dark:bg-amber-600",
  };
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 w-full overflow-hidden">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm w-full overflow-hidden">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex justify-between items-center">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">{stat.title}</p>
                <div className="flex items-baseline space-x-1">
                  <h3 className="text-base sm:text-lg md:text-2xl font-bold tracking-tight truncate">
                    {stat.value}
                  </h3>
                  <span className={`text-[10px] sm:text-xs flex items-center whitespace-nowrap ${stat.change.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change.positive ? (
                      <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-0.5" />
                    )}
                    {stat.change.value}
                  </span>
                </div>
              </div>
              <div className={`rounded-full p-1.5 sm:p-2 flex-shrink-0 ml-2 ${iconColors[stat.icon]}`}>
                {getIcon(stat.icon)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

