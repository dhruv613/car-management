
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import CarsPage from "./pages/CarsPage";
import AddCarPage from "./pages/AddCarPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import EditCarPage from "./pages/EditCarPage";
import MaintenancePage from "./pages/MaintenancePage";
import AddMaintenancePage from "./pages/AddMaintenancePage";
import MaintenanceDetailsPage from "./pages/MaintenanceDetailsPage";
import EditMaintenanceRecordPage from "./pages/EditMaintenanceRecordPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/cars/add" element={<AddCarPage />} />
            <Route path="/cars/:id" element={<CarDetailsPage />} />
            <Route path="/cars/:id/edit" element={<EditCarPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/maintenance/add" element={<AddMaintenancePage />} />
            <Route path="/maintenance/:id" element={<MaintenanceDetailsPage />} />
            <Route path="/maintenance/:id/edit" element={<EditMaintenanceRecordPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
