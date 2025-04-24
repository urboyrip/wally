
import React, { createContext, useState, useContext } from 'react';

interface TransferContextType {
  amount: string;
  setAmount: (amount: string) => void;
  note: string;
  setNote: (note: string) => void;
  recipientAccount: any;
  setRecipientAccount: (recipientAccount: any)  => void;
  recipientName: any;
  setRecipientName: (recipientName: any)  => void;
  accountNumber: any;
  setAccountNumber: (accountNumber:any) => void;
  senderName: any;
  setSenderName: (senderName:any) => void;
  resetTransferData: () => void;
}

const TransferContext = createContext<TransferContextType | undefined>(undefined);

export const TransferProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');

  const resetTransferData = () => {
    setAccountNumber('');
    setAmount('');
    setNote('');
    setRecipientAccount('');
    setSenderName('');
    setRecipientName('');
  };

  const value: TransferContextType = {
    amount,
    setAmount,
    note,
    setNote,
    recipientAccount,
    setRecipientAccount,
    accountNumber,
    setAccountNumber,
    recipientName, 
    setRecipientName,
    senderName, 
    setSenderName,
    resetTransferData,
  };

  console.log(recipientAccount);
  

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