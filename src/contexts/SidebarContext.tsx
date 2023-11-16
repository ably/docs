import React, { ReactNode, createContext, useContext, useState } from 'react';

interface SidebarContextProps {
  collapsed?: boolean;
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
  initialCollapsedState?: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
  initialCollapsedState?: boolean;
}

const initialState = { collapsed: undefined, setCollapsed: undefined, initialCollapsedState: undefined };

export const useSidebar = (): SidebarContextProps => {
  const context = useContext(SidebarContext);
  return context || initialState;
};

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children, initialCollapsedState = false }) => {
  const [collapsed, setCollapsed] = useState<boolean>(initialCollapsedState);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, initialCollapsedState }}>
      {children}
    </SidebarContext.Provider>
  );
};
