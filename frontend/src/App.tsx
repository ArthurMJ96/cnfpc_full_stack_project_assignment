import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider"
import { ComponentExample } from "@/components/component-example";
import LoginPage from "@/pages/Login";
import SignupPage from "./pages/Signup";
import { MainLayout } from "./components/layout/main-layout";
import { AuthLayout } from "./components/layout/auth-layout";

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <Routes>
          {/* Auth Routes (Login, Signup) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          {/* Main App Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<ComponentExample />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}


export default App;