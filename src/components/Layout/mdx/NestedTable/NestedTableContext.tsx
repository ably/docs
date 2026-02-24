import React, { createContext, useContext, useState, useCallback, ReactNode, useRef } from 'react';

export interface TableProperty {
  name: string;
  required?: 'required' | 'optional'; // Optional - not present in 2 or 3 column tables
  description: ReactNode; // ReactNode to preserve markdown elements (links, lists, etc.)
  type?: ReactNode; // ReactNode to preserve markdown elements (links, etc.) - not present in 2 column tables
  typeReferences: string[]; // IDs of all referenced tables (empty array if none)
  typeDisplay?: ReactNode; // Cleaned-up display for the type cell (Table elements replaced with their ID text)
}

export interface TableData {
  id: string;
  properties: TableProperty[];
}

interface NestedTableContextType {
  // Registry version - increments when tables are registered
  registryVersion: number;
  // Register a table in the registry
  register: (id: string, data: TableData) => void;
  // Unregister a table from the registry
  unregister: (id: string) => void;
  // Look up a table by ID
  lookup: (id: string) => TableData | undefined;
  // Toggle expanded state for a path
  toggleExpanded: (path: string) => void;
  // Check if a path is expanded
  isExpanded: (path: string) => boolean;
}

const NestedTableContext = createContext<NestedTableContextType | undefined>(undefined);

export const useNestedTable = (): NestedTableContextType => {
  const context = useContext(NestedTableContext);
  if (!context) {
    throw new Error('useNestedTable must be used within a NestedTableProvider');
  }
  return context;
};

interface NestedTableProviderProps {
  children: ReactNode;
}

export const NestedTableProvider: React.FC<NestedTableProviderProps> = ({ children }) => {
  // Use a ref for the registry to avoid re-creating it
  const registryRef = useRef<Map<string, TableData>>(new Map());
  // Track registry version to trigger re-renders when tables are registered
  const [registryVersion, setRegistryVersion] = useState(0);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(() => new Set());

  const register = useCallback((id: string, data: TableData) => {
    const existing = registryRef.current.get(id);
    // Only update if the data is actually different
    // Compare serializable fields only (description and type are ReactNode and can't be JSON stringified)
    const hasChanged =
      !existing ||
      existing.id !== data.id ||
      existing.properties.length !== data.properties.length ||
      existing.properties.some(
        (prop, i) =>
          prop.name !== data.properties[i]?.name ||
          prop.required !== data.properties[i]?.required ||
          prop.typeReferences.length !== data.properties[i]?.typeReferences.length ||
          prop.typeReferences.some((ref, j) => ref !== data.properties[i]?.typeReferences[j]),
      );
    if (hasChanged) {
      registryRef.current.set(id, data);
      // Increment version to trigger re-renders in consumers
      setRegistryVersion((v) => v + 1);
    }
  }, []);

  const unregister = useCallback((id: string) => {
    if (registryRef.current.has(id)) {
      registryRef.current.delete(id);
      setRegistryVersion((v) => v + 1);
    }
  }, []);

  const lookup = useCallback((id: string): TableData | undefined => {
    return registryRef.current.get(id);
  }, []);

  const toggleExpanded = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }, []);

  const isExpanded = useCallback(
    (path: string): boolean => {
      return expandedPaths.has(path);
    },
    [expandedPaths],
  );

  return (
    <NestedTableContext.Provider
      value={{
        registryVersion,
        register,
        unregister,
        lookup,
        toggleExpanded,
        isExpanded,
      }}
    >
      {children}
    </NestedTableContext.Provider>
  );
};
