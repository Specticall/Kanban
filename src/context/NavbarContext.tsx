import { createContext, useContext, useLayoutEffect, useState } from "react";
import { ChildrenProp } from "../types/generalTypes";
import { useViewportWidth } from "../hooks/useViewportWidth";

type NavbarContextValues = {
  showSidebar: boolean;
  toggleSidebar: (state?: "open" | "close") => void;
};

const NavbarContext = createContext<NavbarContextValues | null>(null);

export function NavbarProvider({ children }: ChildrenProp) {
  const { screenType } = useViewportWidth();
  const [showSidebar, setShowSidebar] = useState(true);

  // Closes the sidebar whenever the screen changes to mobile
  useLayoutEffect(() => {
    if (screenType !== "desktop") {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [screenType]);

  // Toggles sidebar visibility
  const toggleSidebar = (state?: "open" | "close") => {
    if (state) {
      setShowSidebar(state === "open");
    } else {
      setShowSidebar((current) => !current);
    }
  };

  return (
    <NavbarContext.Provider
      value={{
        showSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context)
    throw new Error("Navbar context must be used within its provider's scope");
  return context;
}
