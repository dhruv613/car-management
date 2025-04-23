import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadge from "@/components/ui-components/StatusBadge";
import { ArrowLeft, Edit, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MaintenanceTypeBadge from "@/components/ui-components/MaintenanceTypeBadge";

const CarDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCarById, getMaintenanceRecordsByCar } = useApp();

  const car = getCarById(id || "");
  const maintenanceRecords = getMaintenanceRecordsByCar(id || "");

  if (!car) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h1 className="text-2xl font-bold mb-4">Car Not Found</h1>
          <p className="text-muted-foreground mb-6">The car you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/cars")}>Back to Cars</Button>
        </div>
      </AppLayout>
    );
  }

  // Check if maintenance is overdue
  const isOverdue = (nextDueDate: string) => {
    const today = new Date();
    const dueDate = new Date(nextDueDate);
    return dueDate < today;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/cars")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Car Details</h1>
          </div>
          <div className="flex space-x-2">
            <Button asChild variant="outline">
              <Link to={`/maintenance/add?carId=${car.id}`}>
                <Wrench className="mr-2 h-4 w-4" />
                Log Maintenance
              </Link>
            </Button>
            <Button asChild>
              <Link to={`/cars/${car.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Car
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Car Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Car Information</CardTitle>
                <CardDescription>Detailed information about the vehicle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Brand & Model</h3>
                      <p className="text-lg font-semibold">{car.brand} {car.model}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Year</h3>
                      <p className="text-lg">{car.year}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Registration Number</h3>
                      <p className="text-lg">{car.registrationNo}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Engine Number</h3>
                      <p className="text-lg">{car.engineNo}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Fuel Type</h3>
                      <p className="text-lg">{car.fuelType}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Transmission</h3>
                      <p className="text-lg">{car.transmission}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Seating Capacity</h3>
                      <p className="text-lg">{car.seating} seats</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                      <div className="mt-1">
                        <StatusBadge status={car.status} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Maintenance History */}
            <Card>
              <CardHeader>
                <CardTitle>Maintenance History</CardTitle>
                <CardDescription>Record of all maintenance services performed on this vehicle</CardDescription>
              </CardHeader>
              <CardContent>
                {maintenanceRecords.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No maintenance records found for this vehicle.</p>
                    <Button asChild className="mt-4">
                      <Link to={`/maintenance/add?carId=${car.id}`}>
                        <Wrench className="mr-2 h-4 w-4" />
                        Log First Maintenance
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Service Center</TableHead>
                          <TableHead>Cost</TableHead>
                          <TableHead>Next Due</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {maintenanceRecords
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .map((record) => (
                            <TableRow key={record.id}>
                              <TableCell>{record.date}</TableCell>
                              <TableCell>
                                <MaintenanceTypeBadge type={record.type} />
                              </TableCell>
                              <TableCell>{record.serviceCenter}</TableCell>
                              <TableCell>${record.cost.toFixed(2)}</TableCell>
                              <TableCell>
                                <span className={isOverdue(record.nextDueDate) ? "text-red-600 font-medium" : ""}>
                                  {record.nextDueDate}
                                  {isOverdue(record.nextDueDate) && " (Overdue)"}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Added Date</h3>
                    <p className="text-lg">{car.addedDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Total Maintenance Records</h3>
                    <p className="text-lg">{maintenanceRecords.length}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Total Maintenance Cost</h3>
                    <p className="text-lg">
                      ${maintenanceRecords
                        .reduce((total, record) => total + record.cost, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CarDetailsPage;