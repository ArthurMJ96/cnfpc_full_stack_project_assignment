import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider"
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { TicketStoreProvider } from "@/features/ticket/contexts/TicketStoreContext";
import LoginPage from "@/pages/auth/login";
import SignupPage from "@/pages/auth/signup";
import HomePage from "@/pages/Home";
import SupportPage from "@/pages/home/support-home";
import AdminPage from "@/pages/home/admin-home";
import CreateTicketPage from "./pages/ticket/create-ticket";
import ErrorPage from "./pages/error";
import TicketDetailsPage from "./pages/ticket/ticket-detail";
import ProtectedRoute from "./features/auth/components/protected-route";
import { MainLayout } from "./components/layout/main-layout";
import { AuthLayout } from "./components/layout/auth-layout";
import ProfilePage from "./pages/profile";
import AdminUserListPage from "./pages/admin/users/list";
import AdminUserDetailsPage from "./pages/admin/users/details";
import AdminUserCreatePage from "./pages/admin/users/create";

import { Role } from "@shared/enums";

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <TicketStoreProvider>
          <BrowserRouter>
            <Routes>
              {/* Auth Routes (Login, Signup) */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<ProtectedRoute guestOnly><SignupPage /></ProtectedRoute>} />
              </Route>

              {/* Main App Routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/support" element={<ProtectedRoute role={Role.SUPPORT}><SupportPage /></ProtectedRoute>} />
                <Route path="/ticket/create" element={<ProtectedRoute><CreateTicketPage /></ProtectedRoute>} />
                <Route path="/ticket/:id" element={<ProtectedRoute><TicketDetailsPage /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute role={Role.ADMIN}><AdminPage /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute role={Role.ADMIN}><AdminUserListPage /></ProtectedRoute>} />
                <Route path="/admin/users/:id" element={<ProtectedRoute role={Role.ADMIN}><AdminUserDetailsPage /></ProtectedRoute>} />
                <Route path="/admin/users/create" element={<ProtectedRoute role={Role.ADMIN}><AdminUserCreatePage /></ProtectedRoute>} />
                <Route path="/error" element={<ProtectedRoute><ErrorPage /></ProtectedRoute>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TicketStoreProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}


export default App;