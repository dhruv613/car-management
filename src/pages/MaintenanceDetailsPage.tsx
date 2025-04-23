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
import { ArrowLeft, Edit, Car } from "lucide-react";
import { Link } from "react-router-dom";
import MaintenanceTypeBadge from "@/components/ui-components/MaintenanceTypeBadge";

const MaintenanceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { maintenanceRecords, getCarById } = useApp();

  const maintenanceRecord = maintenanceRecords.find(record => record.id === id);
  
  if (!maintenanceRecord) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h1 className="text-2xl font-bold mb-4">Maintenance Record Not Found</h1>
          <p className="text-muted-foreground mb-6">The maintenance record you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/maintenance")}>Back to Maintenance Records</Button>
        </div>
      </AppLayout>
    );
  }

  const car = getCarById(maintenanceRecord.carId);

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
              onClick={() => navigate("/maintenance")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Maintenance Details</h1>
          </div>
          <div className="flex space-x-2">
            <Button asChild>
              <Link to={`/maintenance/${maintenanceRecord.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Record
              </Link>
            </Button>
            {car && (
              <Button asChild variant="outline">
                <Link to={`/cars/${maintenanceRecord.carId}`}>
                  <Car className="mr-2 h-4 w-4" />
                  View Car
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Maintenance Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Information</CardTitle>
                <CardDescription>Detailed information about the maintenance service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Service Type</h3>
                      <div className="mt-1">
                        <MaintenanceTypeBadge type={maintenanceRecord.type} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Service Date</h3>
                      <p className="text-lg">{maintenanceRecord.date}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Service Center</h3>
                      <p className="text-lg">{maintenanceRecord.serviceCenter}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Cost</h3>
                      <p className="text-lg">${maintenanceRecord.cost.toFixed(2)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Next Due Date</h3>
                      <p className={`text-lg ${isOverdue(maintenanceRecord.nextDueDate) ? "text-red-600 font-medium" : ""}`}>
                        {maintenanceRecord.nextDueDate}
                        {isOverdue(maintenanceRecord.nextDueDate) && " (Overdue)"}
                      </p>
                    </div>
                    {car && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Vehicle</h3>
                        <p className="text-lg">{car.brand} {car.model} ({car.registrationNo})</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description Card */}
            <Card>
              <CardHeader>
                <CardTitle>Service Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{maintenanceRecord.description || "No description provided."}</p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            {car && (
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Brand & Model</h3>
                      <p className="text-lg">{car.brand} {car.model}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Registration Number</h3>
                      <p className="text-lg">{car.registrationNo}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Year</h3>
                      <p className="text-lg">{car.year}</p>
                    </div>
                    <Button asChild variant="outline" className="w-full mt-4">
                      <Link to={`/cars/${car.id}`}>
                        <Car className="mr-2 h-4 w-4" />
                        View Full Car Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MaintenanceDetailsPage;