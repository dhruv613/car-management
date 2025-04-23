
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'staff';
}

export type MaintenanceType = 
  | 'Oil Change'
  | 'Tire Rotation'
  | 'Brake Service'
  | 'General Inspection'
  | 'Engine Service'
  | 'Transmission Service'
  | 'Other';

export type CarStatus = 'Available' | 'Under Maintenance' | 'Sold';

export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG';

export type TransmissionType = 'Manual' | 'Automatic' | 'CVT' | 'DCT';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  engineNo: string;
  registrationNo: string;
  fuelType: FuelType;
  transmission: TransmissionType;
  seating: number;
  status: CarStatus;
  addedDate: string;
  image?: string;
}

export interface MaintenanceRecord {
  id: string;
  carId: string;
  date: string;
  type: MaintenanceType;
  description: string;
  serviceCenter: string;
  cost: number;
  nextDueDate: string;
}

export interface CarWithMaintenance extends Car {
  maintenanceRecords: MaintenanceRecord[];
}

export interface DashboardStats {
  totalCars: number;
  availableCars: number;
  underMaintenanceCars: number;
  soldCars: number;
  upcomingMaintenances: number;
  overdueMaintenance: number;
}
