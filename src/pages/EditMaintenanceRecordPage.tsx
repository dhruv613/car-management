import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MaintenanceType } from "@/types";
import { ArrowLeft, Save } from "lucide-react";

const EditMaintenanceRecordPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cars, maintenanceRecords, updateMaintenanceRecord } = useApp();

  const maintenanceRecord = maintenanceRecords.find(record => record.id === id);

  const [formData, setFormData] = useState({
    carId: "",
    date: new Date().toISOString().split("T")[0],
    type: "Oil Change" as MaintenanceType,
    description: "",
    serviceCenter: "",
    cost: 0,
    nextDueDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (maintenanceRecord) {
      setFormData({
        carId: maintenanceRecord.carId,
        date: maintenanceRecord.date,
        type: maintenanceRecord.type,
        description: maintenanceRecord.description,
        serviceCenter: maintenanceRecord.serviceCenter,
        cost: maintenanceRecord.cost,
        nextDueDate: maintenanceRecord.nextDueDate,
      });
    }
  }, [maintenanceRecord]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "cost" ? parseFloat(value) : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMaintenanceRecord({
      ...maintenanceRecord,
      ...formData,
    });
    navigate(`/maintenance/${id}`);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(`/maintenance/${id}`)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Edit Maintenance Record</h1>
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Maintenance Information</CardTitle>
              <CardDescription>
                Update the details of the maintenance service.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Car Selection */}
                <div className="space-y-2">
                  <Label htmlFor="carId">Select Car</Label>
                  <Select
                    value={formData.carId}
                    onValueChange={(value) => handleSelectChange("carId", value)}
                  >
                    <SelectTrigger id="carId">
                      <SelectValue placeholder="Select a car" />
                    </SelectTrigger>
                    <SelectContent>
                      {cars.map((car) => (
                        <SelectItem key={car.id} value={car.id}>
                          {car.brand} {car.model} ({car.registrationNo})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Maintenance Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Maintenance Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      handleSelectChange("type", value)
                    }
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select maintenance type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Oil Change">Oil Change</SelectItem>
                      <SelectItem value="Tire Rotation">Tire Rotation</SelectItem>
                      <SelectItem value="Brake Service">Brake Service</SelectItem>
                      <SelectItem value="General Inspection">General Inspection</SelectItem>
                      <SelectItem value="Engine Service">Engine Service</SelectItem>
                      <SelectItem value="Transmission Service">Transmission Service</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Service Date */}
                <div className="space-y-2">
                  <Label htmlFor="date">Service Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Service Center */}
                <div className="space-y-2">
                  <Label htmlFor="serviceCenter">Service Center</Label>
                  <Input
                    id="serviceCenter"
                    name="serviceCenter"
                    value={formData.serviceCenter}
                    onChange={handleInputChange}
                    placeholder="e.g. City Auto Service"
                    required
                  />
                </div>

                {/* Cost */}
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost ($)</Label>
                  <Input
                    id="cost"
                    name="cost"
                    type="number"
                    value={formData.cost}
                    onChange={handleInputChange}
                    min={0}
                    step="0.01"
                    required
                  />
                </div>

                {/* Next Due Date */}
                <div className="space-y-2">
                  <Label htmlFor="nextDueDate">Next Due Date</Label>
                  <Input
                    id="nextDueDate"
                    name="nextDueDate"
                    type="date"
                    value={formData.nextDueDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter details about the maintenance service"
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/maintenance/${id}`)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EditMaintenanceRecordPage;