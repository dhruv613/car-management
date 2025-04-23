
import { Car, CarStatus, FuelType, MaintenanceRecord, MaintenanceType, TransmissionType, User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    role: "admin",
  },
  {
    id: "2",
    username: "staff",
    role: "staff",
  },
];

export const mockCars: Car[] = [
  {
    id: "1",
    brand: "Toyota",
    model: "Corolla",
    year: 2021,
    engineNo: "ENG-10023-TC",
    registrationNo: "ABC-1234",
    fuelType: "Petrol",
    transmission: "Automatic",
    seating: 5,
    status: "Available",
    addedDate: "2023-10-15",
    image: "https://via.placeholder.com/150?text=Corolla",
  },
  {
    id: "2",
    brand: "Honda",
    model: "Civic",
    year: 2020,
    engineNo: "ENG-20045-HC",
    registrationNo: "XYZ-5678",
    fuelType: "Petrol",
    transmission: "CVT",
    seating: 5,
    status: "Available",
    addedDate: "2023-09-20",
    image: "https://via.placeholder.com/150?text=Civic",
  },
  {
    id: "3",
    brand: "Ford",
    model: "Escape",
    year: 2022,
    engineNo: "ENG-30056-FE",
    registrationNo: "DEF-9012",
    fuelType: "Hybrid",
    transmission: "Automatic",
    seating: 5,
    status: "Under Maintenance",
    addedDate: "2023-11-05",
    image: "https://via.placeholder.com/150?text=Escape",
  },
  {
    id: "4",
    brand: "BMW",
    model: "X3",
    year: 2021,
    engineNo: "ENG-40078-BX",
    registrationNo: "GHI-3456",
    fuelType: "Diesel",
    transmission: "Automatic",
    seating: 5,
    status: "Available",
    addedDate: "2023-10-10",
    image: "https://via.placeholder.com/150?text=X3",
  },
  {
    id: "5",
    brand: "Tesla",
    model: "Model 3",
    year: 2022,
    engineNo: "ENG-50089-TM",
    registrationNo: "JKL-7890",
    fuelType: "Electric",
    transmission: "Automatic",
    seating: 5,
    status: "Sold",
    addedDate: "2023-08-15",
    image: "https://via.placeholder.com/150?text=Model3",
  },
  {
    id: "6",
    brand: "Hyundai",
    model: "Tucson",
    year: 2020,
    engineNo: "ENG-60023-HT",
    registrationNo: "MNO-1234",
    fuelType: "Petrol",
    transmission: "DCT",
    seating: 5,
    status: "Available",
    addedDate: "2023-09-25",
    image: "https://via.placeholder.com/150?text=Tucson",
  },
  {
    id: "7",
    brand: "Nissan",
    model: "Rogue",
    year: 2021,
    engineNo: "ENG-70045-NR",
    registrationNo: "PQR-5678",
    fuelType: "Petrol",
    transmission: "CVT",
    seating: 5,
    status: "Under Maintenance",
    addedDate: "2023-11-10",
    image: "https://via.placeholder.com/150?text=Rogue",
  },
  {
    id: "8",
    brand: "Kia",
    model: "Sportage",
    year: 2022,
    engineNo: "ENG-80056-KS",
    registrationNo: "STU-9012",
    fuelType: "Hybrid",
    transmission: "Automatic",
    seating: 5,
    status: "Available",
    addedDate: "2023-10-30",
    image: "https://via.placeholder.com/150?text=Sportage",
  }
];

export const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: "1",
    carId: "1",
    date: "2023-11-15",
    type: "Oil Change",
    description: "Regular oil change and filter replacement",
    serviceCenter: "Toyota Service Center",
    cost: 150,
    nextDueDate: "2024-02-15",
  },
  {
    id: "2",
    carId: "1",
    date: "2023-08-10",
    type: "Tire Rotation",
    description: "Standard tire rotation and pressure check",
    serviceCenter: "QuickTire Service",
    cost: 50,
    nextDueDate: "2023-11-10",
  },
  {
    id: "3",
    carId: "2",
    date: "2023-10-05",
    type: "Brake Service",
    description: "Replaced front brake pads",
    serviceCenter: "Honda Authorized Service",
    cost: 220,
    nextDueDate: "2024-04-05",
  },
  {
    id: "4",
    carId: "3",
    date: "2023-11-20",
    type: "Engine Service",
    description: "Major engine tune-up and diagnostics",
    serviceCenter: "Ford Service Plus",
    cost: 350,
    nextDueDate: "2024-05-20",
  },
  {
    id: "5",
    carId: "3",
    date: "2023-09-12",
    type: "General Inspection",
    description: "Annual vehicle inspection and safety check",
    serviceCenter: "State Inspection Center",
    cost: 75,
    nextDueDate: "2024-09-12",
  },
  {
    id: "6",
    carId: "7",
    date: "2023-11-18",
    type: "Transmission Service",
    description: "CVT fluid change and diagnostics",
    serviceCenter: "Nissan Prime Service",
    cost: 280,
    nextDueDate: "2024-11-18",
  },
  {
    id: "7",
    carId: "4",
    date: "2023-10-22",
    type: "Oil Change",
    description: "Synthetic oil change with premium filter",
    serviceCenter: "BMW Exclusive Service",
    cost: 200,
    nextDueDate: "2024-01-22",
  }
];

export const getCarWithMaintenance = (carId: string) => {
  const car = mockCars.find(car => car.id === carId);
  if (!car) return null;
  
  const maintenanceRecords = mockMaintenanceRecords.filter(record => record.carId === carId);
  
  return {
    ...car,
    maintenanceRecords
  };
};

export const calculateDashboardStats = () => {
  const totalCars = mockCars.length;
  const availableCars = mockCars.filter(car => car.status === "Available").length;
  const underMaintenanceCars = mockCars.filter(car => car.status === "Under Maintenance").length;
  const soldCars = mockCars.filter(car => car.status === "Sold").length;
  
  const today = new Date();
  const upcomingMaintenances = mockMaintenanceRecords.filter(record => {
    const nextDueDate = new Date(record.nextDueDate);
    const diffTime = nextDueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 30;
  }).length;
  
  const overdueMaintenance = mockMaintenanceRecords.filter(record => {
    const nextDueDate = new Date(record.nextDueDate);
    return nextDueDate < today;
  }).length;
  
  return {
    totalCars,
    availableCars,
    underMaintenanceCars,
    soldCars,
    upcomingMaintenances,
    overdueMaintenance
  };
};
