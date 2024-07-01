/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import  { createContext, useContext, useState } from "react";

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recommendedStates, setRecommendedStates] = useState("");
  const [openModal, setOpenModal] = useState(false);

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        recommendedStates,
        setRecommendedStates,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context;
}