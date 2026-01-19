import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider"
import { AuthProvider } from "@/features/auth/context/AuthContext";
import LoginPage from "@/pages/auth/Login";
import SignupPage from "@/pages/auth/Signup";
import HomePage from "@/pages/Home";
import { MainLayout } from "./components/layout/main-layout";
import { AuthLayout } from "./components/layout/auth-layout";
import { TicketDetailsPage } from "./pages/ticket/TicketDetail";

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes (Login, Signup) */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>

            {/* Main App Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/ticket/:id" element={<TicketDetailsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}


export default App;