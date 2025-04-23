import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const AddCarPage = () => {
  const navigate = useNavigate();
  const { addCar } = useApp();

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    engineNo: "",
    registrationNo: "",
    fuelType: "Petrol" as FuelType,
    transmission: "Automatic" as TransmissionType,
    seating: 5,
    status: "Available" as CarStatus,
  });

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
    addCar(formData);
    navigate("/cars");
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
            <h1 className="text-2xl font-bold">Add New Car</h1>
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Car Information</CardTitle>
              <CardDescription>
                Enter the details of the new car to add to the system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Brand and Model */}
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

                {/* Engine No */}
                <div className="space-y-2">
                  <Label htmlFor="engineNo">Engine No</Label>
                  <Input
                    id="engineNo"
                    name="engineNo"
                    value={formData.engineNo}
                    onChange={handleInputChange}
                    placeholder="e.g. ENG-12345-AB"
                    required
                  />
                </div>

                {/* Registration No */}
                <div className="space-y-2">
                  <Label htmlFor="registrationNo">Registration No</Label>
                  <Input
                    id="registrationNo"
                    name="registrationNo"
                    value={formData.registrationNo}
                    onChange={handleInputChange}
                    placeholder="e.g. ABC-1234"
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
                      <SelectItem value="Under Maintenance">
                        Under Maintenance
                      </SelectItem>
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
                onClick={() => navigate("/cars")}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Car
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AddCarPage;