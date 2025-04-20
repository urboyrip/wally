import React, { createContext, useState, useContext } from 'react';

interface CardDetails {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface TopupContextType {
  selectedMethod: string | null;
  setSelectedMethod: (method: string | null) => void;
  amount: string;
  setAmount: (amount: string) => void;
  resetTopupData: () => void;
  cardDetails: CardDetails;
  setCardDetails: React.Dispatch<React.SetStateAction<CardDetails>>;
}

const TopupContext = createContext<TopupContextType | undefined>(undefined);

export const TopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>("Choose Topup Method");
  const [amount, setAmount] = useState('');
  const [cardDetails, setCardDetails] = useState<CardDetails>({ cardNumber: '', expiry: '', cvv: '' });

  const resetTopupData = () => {
    setSelectedMethod("Choose Topup Method");
    setAmount('');
    setCardDetails({ cardNumber: '', expiry: '', cvv: '' });
  };

  const value: TopupContextType = {
    selectedMethod,
    setSelectedMethod,
    amount,
    setAmount,
    resetTopupData,
    cardDetails,
    setCardDetails,
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