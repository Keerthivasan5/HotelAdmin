// context/BillContext.js
import React, { createContext, useState } from 'react';

export const BillContext = createContext();

export const BillProvider = ({ children }) => {
  const [pastBills, setPastBills] = useState([]);

  const addBill = (newBill) => {
    setPastBills((prevBills) => [...prevBills, newBill]);
  };

  return (
    <BillContext.Provider value={{ pastBills, addBill }}>
      {children}
    </BillContext.Provider>
  );
};
