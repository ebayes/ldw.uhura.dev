"use client"

import React, { createContext, useState, useContext } from 'react';

interface AppContextType {
  language: string;
  setLanguage: (language: string) => void;
  resetChat: () => void;
  setResetChatFunction: React.Dispatch<React.SetStateAction<() => void>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en');
  const [resetChatFunction, setResetChatFunction] = useState<() => void>(() => {});

  const resetChat = () => {
    if (resetChatFunction) {
      resetChatFunction();
    }
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, resetChat, setResetChatFunction }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}