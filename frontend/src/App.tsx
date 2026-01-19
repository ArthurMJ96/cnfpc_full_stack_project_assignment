import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider"
import { ComponentExample } from "@/components/component-example";
import { MainLayout } from "./components/layout/main-layout";

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<ComponentExample />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}


export default App;