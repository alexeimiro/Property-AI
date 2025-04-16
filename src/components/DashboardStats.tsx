
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
  MapPin
} from "lucide-react";
import { DashboardStats as DashboardStatsType } from "@/types";

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
          <Activity className="h-4 w-4 text-brand-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProperties}</div>
          <p className="text-xs text-muted-foreground">
            Available distressed properties
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Avg. Discount</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageDiscount.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            Below market value
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Avg. Investment Score</CardTitle>
          <Star className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageInvestmentScore.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">
            Out of 100 possible points
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">New Today</CardTitle>
          <Calendar className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.newListingsToday}</div>
          <p className="text-xs text-muted-foreground">
            New properties added today
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Top Markets</CardTitle>
          <CardDescription>
            Cities with the most distressed properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stats.topMarkets.map((market, index) => (
              <div key={market.name} className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-brand-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{market.name}</p>
                  <p className="text-sm text-muted-foreground">{market.count} properties</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
