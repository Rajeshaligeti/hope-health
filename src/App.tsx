import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import HealthAssistantPage from "./pages/HealthAssistantPage";
import BMIPage from "./pages/BMIPage";
import SymptomsPage from "./pages/SymptomsPage";
import CalendarPage from "./pages/CalendarPage";
import HealthVideosPage from "./pages/HealthVideosPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-[hsl(220,25%,96%)] to-[hsl(210,30%,98%)]">
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/assistant" element={<HealthAssistantPage />} />
            <Route path="/bmi" element={<BMIPage />} />
            <Route path="/symptoms" element={<SymptomsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/videos" element={<HealthVideosPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
