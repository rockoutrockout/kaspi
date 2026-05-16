import React, { createContext, useContext, useState, useEffect } from 'react';

const IdCardContext = createContext();

const defaultData = {
  // Реквизиты Удостоверения (Адиль)
  surname: 'ЖАКУПОВ',
  name: 'АДИЛЬ',
  patronymic: 'ТУЛЕУОВИЧ',
  iin: '081115553353',
  docNum: '058336131',
  birthDate: '15.11.2004',
  birthPlace: 'АЛМАТЫ',
  nationality: 'КАЗАХ',
  issuer: 'МВД РК',
  issueDate: '05.12.2020',
  validDate: '04.12.2030',
  photoDataUrl: '',

  // Реквизиты Свидетельства о рождении (Илияс)
  birthCertName: 'БЕКЕНОВ ИЛИЯС ЕРІКҰЛЫ',
  birthCertNumber: '000101500123', // или какой там номер
};

export const IdCardProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('kaspi_id_card_data');
    return savedData ? JSON.parse(savedData) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('kaspi_id_card_data', JSON.stringify(data));
  }, [data]);

  const updateRequisites = (newRequisites) => {
    setData((prev) => ({
      ...prev,
      ...newRequisites,
    }));
  };

  const updatePhoto = (photoDataUrl) => {
    setData((prev) => ({
      ...prev,
      photoDataUrl: photoDataUrl,
    }));
  };

  return (
    <IdCardContext.Provider value={{ data, updateRequisites, updatePhoto, update: updateRequisites }}>
      {children}
    </IdCardContext.Provider>
  );
};

export const useIdCard = () => {
  const context = useContext(IdCardContext);
  if (!context) {
    throw new Error('useIdCard должен использоваться внутри IdCardProvider');
  }
  return context;
};