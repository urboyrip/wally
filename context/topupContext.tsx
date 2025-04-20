import React, { createContext, useState, useContext } from 'react';

interface TopupContextType {
  selectedMethod: string | null;
  setSelectedMethod: (method: string | null) => void;
  amount: string;
  setAmount: (amount: string) => void;
  resetTopupData: () => void;
}

const TopupContext = createContext<TopupContextType | undefined>(undefined);

export const TopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>("Choose Topup Method");
  const [amount, setAmount] = useState('');

  const resetTopupData = () => {
    setSelectedMethod("Choose Topup Method");
    setAmount('');
  };

  const value: TopupContextType = {
    selectedMethod,
    setSelectedMethod,
    amount,
    setAmount,
    resetTopupData,
  };

  return (
    <TopupContext.Provider value={value}>
      {children}
    </TopupContext.Provider>
  );
};

export const useTopup = () => {
  const context = useContext(TopupContext);
  if (!context) {
    throw new Error('useTopup must be used within a TopupProvider');
  }
  return context;
};