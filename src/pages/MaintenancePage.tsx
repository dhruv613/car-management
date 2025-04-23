
import AppLayout from "@/components/layout/AppLayout";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
import MaintenanceTypeBadge from "@/components/ui-components/MaintenanceTypeBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Gauge, Search, Filter } from "lucide-react";
import { MaintenanceType } from "@/types";

const MaintenancePage = () => {
  const { cars, maintenanceRecords } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<MaintenanceType | "all">("all");
  const [carFilter, setCarFilter] = useState<string | "all">("all");

  // Apply filters and search
  const filteredRecords = maintenanceRecords.filter((record) => {
    const car = cars.find((c) => c.id === record.carId);
    if (!car) return false;

    const matchesSearch =
      searchTerm === "" ||
      record.serviceCenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || record.type === typeFilter;
    const matchesCar = carFilter === "all" || record.carId === carFilter;

    return matchesSearch && matchesType && matchesCar;
  });

  // Sort records by date (most recent first)
  const sortedRecords = [...filteredRecords].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getCarDetails = (carId: string) => {
    const car = cars.find((c) => c.id === carId);
    return car ? `${car.brand} ${car.model} (${car.registrationNo})` : "Unknown Car";
  };

  // Check if maintenance is overdue
  const isOverdue = (nextDueDate: string) => {
    const today = new Date();
    const dueDate = new Date(nextDueDate);
    return dueDate < today;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Maintenance Records</h1>
          <Button asChild>
            <Link to="/maintenance/add">
              <Gauge className="mr-2 h-4 w-4" />
              Log Maintenance
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
                  placeholder="Search maintenance records..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="w-full sm:w-auto">
                <Label htmlFor="type-filter" className="sr-only">
                  Type
                </Label>
                <Select
                  value={typeFilter}
                  onValueChange={(value) => setTypeFilter(value as MaintenanceType | "all")}
                >
                  <SelectTrigger id="type-filter" className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
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
              <div className="w-full sm:w-auto">
                <Label htmlFor="car-filter" className="sr-only">
                  Car
                </Label>
                <Select
                  value={carFilter}
                  onValueChange={(value) => setCarFilter(value)}
                >
                  <SelectTrigger id="car-filter" className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by car" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cars</SelectItem>
                    {cars.map((car) => (
                      <SelectItem key={car.id} value={car.id}>
                        {car.brand} {car.model}
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
                  <TableHead>Date</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Service Center</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Next Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No maintenance records found. Try adjusting your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{getCarDetails(record.carId)}</TableCell>
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
                              <Link to={`/maintenance/${record.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/maintenance/${record.id}/edit`}>Edit Record</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/cars/${record.carId}`}>View Car</Link>
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

export default MaintenancePage;
