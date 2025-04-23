
import AppLayout from "@/components/layout/AppLayout";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Car, CarStatus, FuelType, TransmissionType } from "@/types";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/ui-components/StatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Car as CarIcon, Search, Filter } from "lucide-react";

const CarsPage = () => {
  const { cars } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<CarStatus | "all">("all");
  const [yearFilter, setYearFilter] = useState<string | "all">("all");
  const [brandFilter, setBrandFilter] = useState<string | "all">("all");

  // Extract unique years and brands for filters
  const uniqueYears = Array.from(new Set(cars.map((car) => car.year.toString())));
  const uniqueBrands = Array.from(new Set(cars.map((car) => car.brand)));

  // Apply filters and search
  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      searchTerm === "" ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.registrationNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || car.status === statusFilter;
    const matchesYear = yearFilter === "all" || car.year.toString() === yearFilter;
    const matchesBrand = brandFilter === "all" || car.brand === brandFilter;

    return matchesSearch && matchesStatus && matchesYear && matchesBrand;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Cars</h1>
          <Button asChild>
            <Link to="/cars/add">
              <CarIcon className="mr-2 h-4 w-4" />
              Add New Car
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-md border p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search cars..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="w-full sm:w-auto">
                <Label htmlFor="status-filter" className="sr-only">
                  Status
                </Label>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as CarStatus | "all")}
                >
                  <SelectTrigger id="status-filter" className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                    <SelectItem value="Sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-auto">
                <Label htmlFor="year-filter" className="sr-only">
                  Year
                </Label>
                <Select
                  value={yearFilter}
                  onValueChange={(value) => setYearFilter(value)}
                >
                  <SelectTrigger id="year-filter" className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {uniqueYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-auto">
                <Label htmlFor="brand-filter" className="sr-only">
                  Brand
                </Label>
                <Select
                  value={brandFilter}
                  onValueChange={(value) => setBrandFilter(value)}
                >
                  <SelectTrigger id="brand-filter" className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {uniqueBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Car Details</TableHead>
                  <TableHead>Registration No.</TableHead>
                  <TableHead>Engine No.</TableHead>
                  <TableHead>Specifications</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No cars found. Try adjusting your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCars.map((car) => (
                    <TableRow key={car.id}>
                      <TableCell>
                        <div className="font-medium">{car.brand} {car.model}</div>
                        <div className="text-sm text-muted-foreground">{car.year}</div>
                      </TableCell>
                      <TableCell>{car.registrationNo}</TableCell>
                      <TableCell>{car.engineNo}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{car.fuelType}</div>
                          <div>{car.transmission}</div>
                          <div>{car.seating} seats</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={car.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <Filter className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/cars/${car.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/cars/${car.id}/edit`}>Edit Car</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/maintenance/add?carId=${car.id}`}>Log Maintenance</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CarsPage;
