import React, { createContext, useState } from 'react';

const initialFoodItems = {
  Breakfast: [],
  Lunch: [],
  Dinner: []
};

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(initialFoodItems);

  const addMenuItem = (type, itemName) => {
    setMenuItems(prev => ({
      ...prev,
      [type]: [...prev[type], { name: itemName, price: '0', quantity: 1 }]
    }));
  };

  const removeMenuItem = (type, index) => {
    setMenuItems(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};
