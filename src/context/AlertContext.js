import { createContext, useContext, useState } from 'react';

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [goodsCount, setGoodsCount] = useState(0);
  const [fruitsCount, setFruitsCount] = useState(0);
  const [bookstoreCount, setBookstoreCount] = useState(0);
  const [noodleCount, setNoodleCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);

  return (
    <AlertContext.Provider
      value={{
        goodsCount,
        setGoodsCount,

        fruitsCount,
        setFruitsCount,

        bookstoreCount,
        setBookstoreCount,

        noodleCount,
        setNoodleCount,

        customerCount,
        setCustomerCount,

        contactCount,
        setContactCount
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
