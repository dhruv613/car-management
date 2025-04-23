import { useApp } from "@/context/AppContext";
import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/ui-components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, ChartBar, Settings, Gauge, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui-components/StatusBadge";

const Dashboard = () => {
  const { cars, dashboardStats } = useApp();

  // Get the most recently added cars (limited to 5)
  const recentCars = [...cars]
    .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
    .slice(0, 5);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex space-x-2">
            <Button asChild variant="outline" className="hover:bg-blue-50 transition-colors duration-300">
              <Link to="/cars/add">Add New Car</Link>
            </Button>
            <Button asChild variant="outline" className="hover:bg-green-50 transition-colors duration-300">
              <Link to="/maintenance/add">Log Maintenance</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Cars"
            value={dashboardStats.totalCars}
            icon={Car}
            iconColor="text-blue-600"
            className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
          />
          <StatCard
            title="Available"
            value={dashboardStats.availableCars}
            icon={Car}
            iconColor="text-green-600"
            className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
          />
          <StatCard
            title="Under Maintenance"
            value={dashboardStats.underMaintenanceCars}
            icon={Gauge}
            iconColor="text-amber"
            className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
          />
          <StatCard
            title="Upcoming Maintenance"
            value={dashboardStats.upcomingMaintenances}
            icon={Settings}
            iconColor="text-purple-600"
            className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent">
              <CardTitle className="text-lg flex items-center justify-between">
                Recent Cars
                <Link to="/cars" className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center transition-colors duration-300">
                  View All Cars
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCars.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No cars added yet</p>
                ) : (
                  recentCars.map((car, index) => (
                    <Link 
                      key={car.id} 
                      to={`/cars/${car.id}`}
                      className="block"
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        animation: "fadeInUp 0.5s ease forwards"
                      }}
                    >
                      <div
                        className="flex items-center justify-between p-3 bg-blue-50/50 rounded-md hover:bg-blue-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-md group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="flex items-center space-x-4 z-10">
                          <div className="w-10 h-10 bg-blue-200 rounded-md flex items-center justify-center transition-all duration-300 group-hover:bg-blue-300">
                            <Car className="h-5 w-5 text-blue-700" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{car.brand} {car.model}</p>
                            <p className="text-sm text-muted-foreground">{car.registrationNo}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 z-10">
                          <StatusBadge status={car.status} />
                          <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-green-50 to-transparent">
              <CardTitle className="text-lg flex items-center justify-between">
                Quick Stats
                <Link to="/reports" className="text-sm text-green-600 hover:text-green-800 hover:underline flex items-center transition-colors duration-300">
                  View Reports
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <StatCard
                    title="Overdue Maintenance"
                    value={dashboardStats.overdueMaintenance}
                    className="bg-red-50 hover:bg-red-100 transition-colors duration-300 hover:shadow-md"
                  />
                  <StatCard
                    title="Sold Cars"
                    value={dashboardStats.soldCars}
                    className="bg-blue-50 hover:bg-blue-100 transition-colors duration-300 hover:shadow-md"
                  />
                </div>
                
                <div className="bg-green-50 p-4 rounded-md hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-2 mb-2">
                    <ChartBar className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium">Fleet Status Overview</h3>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
                    <div
                      className="absolute left-0 h-4 bg-green-500 rounded-l-full transition-all duration-700"
                      style={{
                        width: `${(dashboardStats.availableCars / dashboardStats.totalCars) * 100}%`,
                      }}
                    />
                    <div
                      className="absolute left-0 h-4 bg-amber rounded-r-full transition-all duration-700"
                      style={{
                        width: `${(dashboardStats.underMaintenanceCars / dashboardStats.totalCars) * 100}%`,
                        left: `${(dashboardStats.availableCars / dashboardStats.totalCars) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span>Available: {Math.round((dashboardStats.availableCars / dashboardStats.totalCars) * 100)}%</span>
                    <span>Under Maintenance: {Math.round((dashboardStats.underMaintenanceCars / dashboardStats.totalCars) * 100)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </AppLayout>
  );
};

export default Dashboard;
