import { createContext, useEffect, useState, useContext } from "react";
import { ChildrenProp, StateSetter } from "../types/generalTypes";

interface AppContextValues {
  setTheme: StateSetter<string>;
  theme: string;
}

const AppContext = createContext<AppContextValues | null>(null);

export function AppProvider({ children }: ChildrenProp) {
  const [theme, setTheme] = useState(() => "dark");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        setTheme,
        theme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("App context must be use inside its parent's scope!");
  return context;
}
