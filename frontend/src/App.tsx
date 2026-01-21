import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider"
import { AuthProvider } from "@/features/auth/context/AuthContext";
import LoginPage from "@/pages/auth/login";
import SignupPage from "@/pages/auth/signup";
import HomePage from "@/pages/Home";
import SupportPage from "@/pages/home/support-home";
import AdminPage from "@/pages/home/admin-home";
import CreateTicketPage from "./pages/ticket/create-ticket";
import ErrorPage from "./pages/error";
import TicketDetailsPage from "./pages/ticket/ticket-detail";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import { MainLayout } from "./components/layout/main-layout";
import { AuthLayout } from "./components/layout/auth-layout";
import { Role } from "@shared/enums";

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes (Login, Signup) */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<ProtectedRoute guestOnly><LoginPage /></ProtectedRoute>} />
              <Route path="/signup" element={<ProtectedRoute guestOnly><SignupPage /></ProtectedRoute>} />
            </Route>

            {/* Main App Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/support" element={<ProtectedRoute role={Role.SUPPORT}><SupportPage /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute role={Role.ADMIN}><AdminPage /></ProtectedRoute>} />
              <Route path="/ticket/create" element={<ProtectedRoute><CreateTicketPage /></ProtectedRoute>} />
              <Route path="/ticket/:id" element={<ProtectedRoute><TicketDetailsPage /></ProtectedRoute>} />
              <Route path="/error" element={<ProtectedRoute><ErrorPage /></ProtectedRoute>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}


export default App;