import { createContext, useState, useEffect } from "react";

export const UiContext = createContext();

export const UiProvider = ({ children }) => {
  const [userName, setUserName] = useState({});
  const [selectedTheme, setSelectedTheme] = useState({
    selectedTheme: "light",
  });
  const [isAddToDoOpen, setIsAddToDoOpen] = useState({ isAddToDoOpen: false });
  

  useEffect(() => {
    try {
      const userNameData = JSON.parse(localStorage.getItem("userName"));
      if (userNameData) {
        setUserName(userNameData);
      }
    } catch (error) {
      localStorage.clear();
      setUserName({});
    }
  }, []);

  useEffect(() => {
    try {
      const selectedThemeData = JSON.parse(
        localStorage.getItem("selectedTheme")
      );
      if (selectedThemeData) {
        if (selectedThemeData.selectedTheme === "dark") {
          setSelectedTheme({ selectedTheme: "dark" });
        } else {
          setSelectedTheme({ selectedTheme: "light" });
        }
      }
    } catch (error) {
      localStorage.clear();
      setSelectedTheme({ selectedTheme: "light" });
    }
  }, []);

  const themeChanger = () => {
    const newTheme = selectedTheme.selectedTheme === "light" ? "dark" : "light";
    setSelectedTheme({
      selectedTheme: newTheme,
    });
    localStorage.setItem(
      "selectedTheme",
      JSON.stringify({ selectedTheme: newTheme })
    );
  };

  const userNameChanger = (newName) => {
    setUserName({ userName: newName });
    localStorage.setItem("userName", JSON.stringify({ userName: newName }));
  };

  const logOutHandler = () => {
    setUserName({});
    localStorage.removeItem("userName");
  };

  const addToDoHandler = () => {
    if (isAddToDoOpen.isAddToDoOpen === false) {
      setIsAddToDoOpen({ isAddToDoOpen: true });
    } else {
      setIsAddToDoOpen({ isAddToDoOpen: false });
    }
  };

  const value = {
    isAddToDoOpen,
    addToDoHandler,
    selectedTheme,
    themeChanger,
    userName,
    userNameChanger,
    logOutHandler,
  };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};
