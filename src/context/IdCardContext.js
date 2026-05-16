import React, { createContext, useState, useContext } from 'react';

const IdCardContext = createContext();

const initialData = {
  photoDataUrl: null, // Одно общее фото для дока
  surname: 'БЕКЕНОВ',
  name: 'ИЛИЯС',
  patronymic: 'ЕРІКҰЛЫ',
  iin: '020820501234',
  docNum: '052752327',
  birthDate: '20.08.2002',
  birthPlace: 'АЛМАТЫ',
  nationality: 'ҚАЗАҚ',
  issuer: 'ҚР ІШКІ ІСТЕР МИНИСТРЛІГІ',
  issueDate: '03.03.2020',
  validDate: '02.03.2030'
};

export const IdCardProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('kaspi_idcard_data');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const update = (newData) => {
    setData((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('kaspi_idcard_data', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <IdCardContext.Provider value={{ data, update }}>
      {children}
    </IdCardContext.Provider>
  );
};

export const useIdCard = () => useContext(IdCardContext);