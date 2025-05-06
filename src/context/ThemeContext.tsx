"use client";

import { createContext, useContext, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Always set the theme to light
  const theme: Theme = "light";
  
  // Force light mode on the document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    localStorage.setItem("theme", "light");
  }, []);

  // Keep these functions to maintain the API, but they won't change the theme
  const toggleTheme = () => {
    // Do nothing - always stay in light mode
    console.log("Dark theme is disabled in this application");
  };
  
  const setTheme = () => {
    // Do nothing - always stay in light mode
    console.log("Dark theme is disabled in this application");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
}; 