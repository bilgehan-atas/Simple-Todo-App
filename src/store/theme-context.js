import { createContext, useState } from "react";

export const ThemeContext = createContext({
  selectedTheme: "light",
});

export const ThemeProvider = ({ children }) => {
  const themeChanger = () => {
    const newTheme = selectedTheme.selectedTheme === "light" ? "dark" : "light";
    setSelectedTheme({
      selectedTheme: newTheme,
    });
  };
  const [selectedTheme, setSelectedTheme] = useState({
    selectedTheme: "light",
  });
  const value = { selectedTheme, themeChanger };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
