import React, { createContext, useContext, useState, useEffect } from 'react';

const IdCardContext = createContext();

export function IdCardProvider({ children }) {
  const [data, setData] = useState(() => {
    // Безопасно вытаскиваем данные при старте приложения
    const saved = localStorage.getItem('kaspi_id_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Ошибка парсинга localStorage:", e);
      }
    }
    // Если в localStorage ничего нет, возвращаем пустые дефолтные поля
    return {
      surname: 'ИВАНОВ',
      name: 'ИВАН',
      patronymic: 'ИВАНОВИЧ',
      iin: '000101500123',
      docNum: '012345678',
      birthDate: '01.01.2000',
      birthPlace: 'РК, Г. АЛМАТЫ',
      nationality: 'КАЗАХ',
      issuer: 'МВД РК',
      issueDate: '15.05.2020',
      validDate: '15.05.2030',
      photoDataUrl: '' // Изначально пустая строка, чтобы ничего не вешало билд
    };
  });

  // Функция для обновления только фотографии/документа
  const updatePhoto = (newDataUrl) => {
    if (!newDataUrl) return;
    setData((prev) => {
      const updated = { ...prev, photoDataUrl: newDataUrl };
      localStorage.setItem('kaspi_id_data', JSON.stringify(updated));
      return updated;
    });
  };

  // Функция для обновления текстовых реквизитов (из второй модалки)
  const updateRequisites = (newFields) => {
    setData((prev) => {
      const updated = { ...prev, ...newFields };
      localStorage.setItem('kaspi_id_data', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <IdCardContext.Provider value={{ data, updatePhoto, updateRequisites }}>
      {children}
    </IdCardContext.Provider>
  );
}

export function useIdCard() {
  const context = useContext(IdCardContext);
  if (!context) {
    throw new Error('useIdCard должен использоваться внутри IdCardProvider');
  }
  return context;
}