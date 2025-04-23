import React, { createContext, useState, useContext, useEffect } from "react";
import { Car, CarStatus, DashboardStats, FuelType, MaintenanceRecord, MaintenanceType, TransmissionType, User } from "@/types";
import { calculateDashboardStats, mockCars, mockMaintenanceRecords, mockUsers } from "@/mockData";
import { useToast } from "@/components/ui/use-toast";

interface AppContextType {
  user: User | null;
  cars: Car[];
  maintenanceRecords: MaintenanceRecord[];
  dashboardStats: DashboardStats;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  addCar: (car: Omit<Car, "id" | "addedDate">) => void;
  updateCar: (car: Car) => void;
  deleteCar: (id: string) => void;
  addMaintenanceRecord: (record: Omit<MaintenanceRecord, "id">) => void;
  updateMaintenanceRecord: (record: MaintenanceRecord) => void;
  deleteMaintenanceRecord: (id: string) => void;
  getCarById: (id: string) => Car | undefined;
  getMaintenanceRecordsByCar: (carId: string) => MaintenanceRecord[];
  refreshStats: () => void;
  isLoading: boolean;
  register: (username: string, password: string) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalCars: 0,
    availableCars: 0,
    underMaintenanceCars: 0,
    soldCars: 0,
    upcomingMaintenances: 0,
    overdueMaintenance: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setCars(mockCars);
    setMaintenanceRecords(mockMaintenanceRecords);
    setDashboardStats(calculateDashboardStats());
    setIsLoading(false);
    
    const savedUser = localStorage.getItem('carManagementUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const refreshStats = () => {
    setDashboardStats(calculateDashboardStats());
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.username === username);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('carManagementUser', JSON.stringify(foundUser));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${foundUser.username}!`,
      });
      setIsLoading(false);
      return true;
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid username or password",
      variant: "destructive",
    });
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('carManagementUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const addCar = (car: Omit<Car, "id" | "addedDate">) => {
    const newCar: Car = {
      ...car,
      id: `${cars.length + 1}`,
      addedDate: new Date().toISOString().split('T')[0],
    };
    
    setCars(prev => [...prev, newCar]);
    refreshStats();
    toast({
      title: "Car Added",
      description: `Successfully added ${newCar.brand} ${newCar.model}`,
    });
  };

  const updateCar = (car: Car) => {
    setCars(prev => prev.map(c => c.id === car.id ? car : c));
    refreshStats();
    toast({
      title: "Car Updated",
      description: `Successfully updated ${car.brand} ${car.model}`,
    });
  };

  const deleteCar = (id: string) => {
    const carToDelete = cars.find(c => c.id === id);
    if (!carToDelete) return;
    
    setCars(prev => prev.filter(c => c.id !== id));
    setMaintenanceRecords(prev => prev.filter(m => m.carId !== id));
    refreshStats();
    toast({
      title: "Car Deleted",
      description: `Successfully deleted ${carToDelete.brand} ${carToDelete.model}`,
    });
  };

  const addMaintenanceRecord = (record: Omit<MaintenanceRecord, "id">) => {
    const newRecord: MaintenanceRecord = {
      ...record,
      id: `${maintenanceRecords.length + 1}`,
    };
    
    setMaintenanceRecords(prev => [...prev, newRecord]);
    refreshStats();
    toast({
      title: "Maintenance Record Added",
      description: `Successfully added maintenance record`,
    });
  };

  const updateMaintenanceRecord = (record: MaintenanceRecord) => {
    setMaintenanceRecords(prev => prev.map(r => r.id === record.id ? record : r));
    refreshStats();
    toast({
      title: "Maintenance Record Updated",
      description: `Successfully updated maintenance record`,
    });
  };

  const deleteMaintenanceRecord = (id: string) => {
    setMaintenanceRecords(prev => prev.filter(r => r.id !== id));
    refreshStats();
    toast({
      title: "Maintenance Record Deleted",
      description: `Successfully deleted maintenance record`,
    });
  };

  const getCarById = (id: string) => {
    return cars.find(car => car.id === id);
  };

  const getMaintenanceRecordsByCar = (carId: string) => {
    return maintenanceRecords.filter(record => record.carId === carId);
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = mockUsers.find(u => u.username === username);
    if (existingUser) {
      toast({
        title: "Registration Failed",
        description: "Username already exists",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
    
    const newUser = {
      id: `${mockUsers.length + 1}`,
      username,
      role: 'admin' as const,
    };
    mockUsers.push(newUser);
    
    setUser(newUser);
    localStorage.setItem('carManagementUser', JSON.stringify(newUser));
    
    toast({
      title: "Registration Successful",
      description: `Welcome, ${newUser.username}!`,
    });
    setIsLoading(false);
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        cars,
        maintenanceRecords,
        dashboardStats,
        login,
        logout,
        addCar,
        updateCar,
        deleteCar,
        addMaintenanceRecord,
        updateMaintenanceRecord,
        deleteMaintenanceRecord,
        getCarById,
        getMaintenanceRecordsByCar,
        refreshStats,
        isLoading,
        register,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
