import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { CarStatus, FuelType, TransmissionType } from "@/types";
import { ArrowLeft, Save } from "lucide-react";

const EditCarPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCarById, updateCar } = useApp();

  const car = getCarById(id || "");

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: 2023,
    engineNo: "",
    registrationNo: "",
    fuelType: "Petrol" as FuelType,
    transmission: "Manual" as TransmissionType,
    seating: 5,
    status: "Available" as CarStatus,
  });

  useEffect(() => {
    if (car) {
      setFormData({
        brand: car.brand,
        model: car.model,
        year: car.year,
        engineNo: car.engineNo,
        registrationNo: car.registrationNo,
        fuelType: car.fuelType,
        transmission: car.transmission,
        seating: car.seating,
        status: car.status,
      });
    }
  }, [car]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "year" || name === "seating" ? parseInt(value) : value,
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
    updateCar({
      ...car,
      ...formData,
    });
    navigate(`/cars/${id}`);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(`/cars/${id}`)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Edit Car</h1>
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Car Information</CardTitle>
              <CardDescription>
                Update the details of your vehicle.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Brand */}
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="e.g. Toyota"
                    required
                  />
                </div>

                {/* Model */}
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="e.g. Corolla"
                    required
                  />
                </div>

                {/* Year */}
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleInputChange}
                    min={1900}
                    max={new Date().getFullYear() + 1}
                    required
                  />
                </div>

                {/* Registration Number */}
                <div className="space-y-2">
                  <Label htmlFor="registrationNo">Registration Number</Label>
                  <Input
                    id="registrationNo"
                    name="registrationNo"
                    value={formData.registrationNo}
                    onChange={handleInputChange}
                    placeholder="e.g. ABC123"
                    required
                  />
                </div>

                {/* Engine Number */}
                <div className="space-y-2">
                  <Label htmlFor="engineNo">Engine Number</Label>
                  <Input
                    id="engineNo"
                    name="engineNo"
                    value={formData.engineNo}
                    onChange={handleInputChange}
                    placeholder="e.g. EN12345678"
                    required
                  />
                </div>

                {/* Fuel Type */}
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select
                    value={formData.fuelType}
                    onValueChange={(value) =>
                      handleSelectChange("fuelType", value)
                    }
                  >
                    <SelectTrigger id="fuelType">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="CNG">CNG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Transmission */}
                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select
                    value={formData.transmission}
                    onValueChange={(value) =>
                      handleSelectChange("transmission", value)
                    }
                  >
                    <SelectTrigger id="transmission">
                      <SelectValue placeholder="Select transmission type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="CVT">CVT</SelectItem>
                      <SelectItem value="DCT">DCT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Seating */}
                <div className="space-y-2">
                  <Label htmlFor="seating">Seating Capacity</Label>
                  <Input
                    id="seating"
                    name="seating"
                    type="number"
                    value={formData.seating}
                    onChange={handleInputChange}
                    min={1}
                    max={50}
                    required
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select car status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                      <SelectItem value="Sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/cars/${id}`)}
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

export default EditCarPage;