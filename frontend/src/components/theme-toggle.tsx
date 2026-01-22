import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/providers/theme-provider"
import { useCallback } from "react"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className, asIcon }: React.ComponentProps<"span"> & { asIcon?: boolean }) {
  const { setTheme, theme } = useTheme()

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  return (
    <Button
      variant="ghost"
      className={cn("group/toggle", className)}
      size={asIcon ? "icon-sm" : undefined}
      onClick={toggleTheme}
    >
      <SunIcon className="hidden [html.dark_&]:block" />
      <MoonIcon className="hidden [html.light_&]:block" />
      {!asIcon && <span>Toggle theme</span>}
    </Button>
  )
}