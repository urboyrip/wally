
import React, { createContext, useState, useContext } from 'react';

interface TransferContextType {
  accountNumber: string;
  setAccountNumber: (accountNumber: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  note: string;
  setNote: (note: string) => void;
  recipientName: string;
  setRecipientName: (recipientName: string) => void;
  senderName: string;
  setSenderName: (senderName: string) => void;
  senderAccount: string;
  setSenderAccount: (senderAccount: string) => void;
  resetTransferData: () => void;
}

const TransferContext = createContext<TransferContextType | undefined>(undefined);

export const TransferProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderAccount, setSenderAccount] = useState('');

  const resetTransferData = () => {
    setAccountNumber('');
    setAmount('');
    setNote('');
    setRecipientName('');
    setSenderName('');
    setSenderAccount('');
  };

  const value: TransferContextType = {
    accountNumber,
    setAccountNumber,
    amount,
    setAmount,
    note,
    setNote,
    recipientName,
    setRecipientName,
    senderName,
    setSenderName,
    senderAccount,
    setSenderAccount,
    resetTransferData,
  };

  return (
    <TransferContext.Provider value={value}>
      {children}
    </TransferContext.Provider>
  );
};

export const useTransfer = () => {
  const context = useContext(TransferContext);
  if (!context) {
    throw new Error('useTransfer must be used within a TransferProvider');
  }
  return context;
};