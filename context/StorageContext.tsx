"use client";
import { createContext, useContext } from "react";

type StorageContextType = {
  save: (param: { solved: boolean; id?: string }) => void;
  currentId?: string;
};

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const StorageProvider = ({ children, onSave, currentId }: {
  children: React.ReactNode;
  onSave: (param: { solved: boolean; id: string }) => void;
  currentId?: string;
}) => {
  // 保存処理を「現在のID」でラップする
  const wrappedSave: StorageContextType["save"] = ({ solved, id }) => {
    const finalId = id || currentId || "unknown";
    onSave({ solved, id: finalId });
  }

  return (
    <StorageContext.Provider value={{ save: wrappedSave, currentId }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useSaveTask = () => {
  const context = useContext(StorageContext);
  if (!context) throw new Error("Providerの外です");
  return context.save;
};