import { useState, useEffect } from "react";

type Theme = "light" | "dark";

interface UseThemeReturn {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to get theme from localStorage
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
      
      // Check user's system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}; 