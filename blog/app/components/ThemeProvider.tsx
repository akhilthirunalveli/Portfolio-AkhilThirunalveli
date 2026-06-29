"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Read persisted or system preference on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;

    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
    // Default stays "light" — no system preference override

    setMounted(true);
  }, []);

  // Sync .dark class and localStorage whenever theme changes (after mount)
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  // Prevent hydration mismatch by rendering children only after mount
  // but still provide context so hooks don't break
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);

  if (ctx === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return ctx;
}
