
import AppLayout from "@/components/layout/AppLayout";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CarStatus, FuelType, MaintenanceType } from "@/types";

const ReportsPage = () => {
  const { cars, maintenanceRecords } = useApp();
  const [tabValue, setTabValue] = useState("overview");

  // Car Status Distribution Data
  const statusDistribution = [
    {
      name: "Available",
      value: cars.filter((car) => car.status === "Available").length,
      color: "#22c55e",
    },
    {
      name: "Under Maintenance",
      value: cars.filter((car) => car.status === "Under Maintenance").length,
      color: "#f59e0b",
    },
    {
      name: "Sold",
      value: cars.filter((car) => car.status === "Sold").length,
      color: "#3b82f6",
    },
  ];

  // Fuel Type Distribution Data
  const fuelTypeDistribution = Array.from(
    new Set(cars.map((car) => car.fuelType))
  ).map((fuelType) => ({
    name: fuelType,
    value: cars.filter((car) => car.fuelType === fuelType).length,
    color: fuelType === "Petrol"
      ? "#ef4444"
      : fuelType === "Diesel"
      ? "#8b5cf6"
      : fuelType === "Electric"
      ? "#06b6d4"
      : fuelType === "Hybrid"
      ? "#10b981"
      : "#6b7280",
  }));

  // Maintenance Type Distribution Data
  const maintenanceTypeDistribution = Array.from(
    new Set(maintenanceRecords.map((record) => record.type))
  ).map((type) => ({
    name: type,
    value: maintenanceRecords.filter((record) => record.type === type).length,
    color:
      type === "Oil Change"
        ? "#3b82f6"
        : type === "Tire Rotation"
        ? "#8b5cf6"
        : type === "Brake Service"
        ? "#ef4444"
        : type === "General Inspection"
        ? "#22c55e"
        : type === "Engine Service"
        ? "#f59e0b"
        : type === "Transmission Service"
        ? "#6366f1"
        : "#6b7280",
  }));

  // Maintenance Costs by Car
  const maintenanceCostsByCar = cars.map((car) => {
    const carRecords = maintenanceRecords.filter(
      (record) => record.carId === car.id
    );
    const totalCost = carRecords.reduce(
      (sum, record) => sum + record.cost,
      0
    );
    return {
      name: `${car.brand} ${car.model}`,
      value: totalCost,
    };
  }).sort((a, b) => b.value - a.value);

  // Top 5 Cars by Maintenance Cost
  const topCarsByMaintenanceCost = maintenanceCostsByCar
    .slice(0, 5)
    .filter((car) => car.value > 0);

  // Maintenance Records by Month
  const maintenanceByMonth = maintenanceRecords.reduce((acc, record) => {
    const date = new Date(record.date);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    
    if (!acc[key]) {
      acc[key] = { month: key, count: 0, cost: 0 };
    }
    
    acc[key].count += 1;
    acc[key].cost += record.cost;
    
    return acc;
  }, {} as Record<string, { month: string; count: number; cost: number }>);

  const maintenanceByMonthArray = Object.values(maintenanceByMonth)
    .sort((a, b) => {
      const monthA = new Date(a.month.replace(' ', ' 1, '));
      const monthB = new Date(b.month.replace(' ', ' 1, '));
      return monthA.getTime() - monthB.getTime();
    })
    .slice(-6); // Last 6 months

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">
            Analyze your fleet data and maintenance history
          </p>
        </div>

        <Tabs
          defaultValue="overview"
          value={tabValue}
          onValueChange={setTabValue}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Fleet Overview</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance Analysis</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          </TabsList>

          {/* Fleet Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Car Status Distribution</CardTitle>
                  <CardDescription>
                    Current status of all vehicles in the fleet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {statusDistribution.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fuel Type Distribution</CardTitle>
                  <CardDescription>
                    Vehicles categorized by fuel type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={fuelTypeDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {fuelTypeDistribution.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Fleet Age Distribution</CardTitle>
                <CardDescription>
                  Number of vehicles by year of manufacture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={Array.from(
                        new Set(cars.map((car) => car.year))
                      )
                        .sort()
                        .map((year) => ({
                          year,
                          count: cars.filter((car) => car.year === year)
                            .length,
                        }))}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="count"
                        name="Number of Vehicles"
                        fill="#1a365d"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Maintenance Analysis Tab */}
          <TabsContent value="maintenance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Types</CardTitle>
                  <CardDescription>
                    Distribution of maintenance by type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={maintenanceTypeDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {maintenanceTypeDistribution.map(
                            (entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                              />
                            )
                          )}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Maintenance</CardTitle>
                  <CardDescription>
                    Maintenance records by month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={maintenanceByMonthArray}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          domain={[0, 'auto']}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar
                          yAxisId="left"
                          dataKey="count"
                          name="Number of Records"
                          fill="#1a365d"
                        />
                        <Bar
                          yAxisId="right"
                          dataKey="cost"
                          name="Total Cost ($)"
                          fill="#f59e0b"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cost Analysis Tab */}
          <TabsContent value="costs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top 5 Cars by Maintenance Cost</CardTitle>
                <CardDescription>
                  Vehicles with highest maintenance expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topCarsByMaintenanceCost}
                      layout="vertical"
                      margin={{
                        top: 20,
                        right: 30,
                        left: 100,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={80}
                      />
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Legend />
                      <Bar
                        dataKey="value"
                        name="Maintenance Cost ($)"
                        fill="#0d9488"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Cost by Type</CardTitle>
                <CardDescription>
                  Total expenses by maintenance category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={Array.from(
                        new Set(
                          maintenanceRecords.map(
                            (record) => record.type
                          )
                        )
                      ).map((type) => {
                        const records = maintenanceRecords.filter(
                          (record) => record.type === type
                        );
                        const totalCost = records.reduce(
                          (sum, record) => sum + record.cost,
                          0
                        );
                        return {
                          type,
                          cost: totalCost,
                          count: records.length,
                        };
                      })}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                      />
                      <Tooltip formatter={(value, name) => 
                        name === 'cost' ? `$${value}` : value
                      } />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="cost"
                        name="Total Cost ($)"
                        fill="#0d9488"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="count"
                        name="Number of Services"
                        fill="#1a365d"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ReportsPage;
