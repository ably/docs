import React, { ReactNode, createContext, useContext, useState } from 'react';

interface SidebarContextProps {
  collapsed?: boolean;
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
  initialCollapsedState?: boolean;
}

const initialState = { collapsed: undefined, setCollapsed: undefined, initialCollapsedState: undefined };
const SidebarContext = createContext<SidebarContextProps>(initialState);

interface SidebarProviderProps {
  children: ReactNode;
  initialCollapsedState?: boolean;
}

export const useSidebar = (): SidebarContextProps => {
  return useContext(SidebarContext);
};

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children, initialCollapsedState = false }) => {
  const [collapsed, setCollapsed] = useState<boolean>(initialCollapsedState);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, initialCollapsedState }}>
      {children}
    </SidebarContext.Provider>
  );
};
