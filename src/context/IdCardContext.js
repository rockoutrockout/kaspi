import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'kaspi-id-card-v1';

export const defaultIdCardData = {
  frontPhotoDataUrl: '',
  backPhotoDataUrl: '',
  surname: 'БЕКЕНОВ',
  givenName: 'ІЛИЯС',
  patronymic: 'ЕРІКҰЛЫ',
  dob: '20.08.2002',
  iin: '020820501852',
  docNumber: '052752327',
  birthPlace: 'Алматы',
  nationality: 'Қазақ',
  authority: 'ҚР Ішкі істер министрлігі',
  issueDate: '03.03.2020',
  expiryDate: '02.03.2030',
  mrzLine1: '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
  mrzLine2: 'BEKENOV<<ILIYAS<<<<<<<<<<<<<<<<<',
  mrzLine3: '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
};

function mergeLoaded(raw) {
  if (!raw || typeof raw !== 'object') return { ...defaultIdCardData };
  return { ...defaultIdCardData, ...raw };
}

function loadFromStorage() {
  if (typeof window === 'undefined') return { ...defaultIdCardData };
  try {
    return mergeLoaded(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  } catch {
    return { ...defaultIdCardData };
  }
}

const IdCardContext = createContext(null);

export function IdCardProvider({ children }) {
  const [data, setData] = useState(loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('kaspi-id-card: не удалось сохранить (возможно, слишком большое фото)', e);
    }
  }, [data]);

  const update = useCallback((partial) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const reset = useCallback(() => {
    setData({ ...defaultIdCardData });
  }, []);

  const value = useMemo(() => ({ data, update, reset }), [data, update, reset]);

  return <IdCardContext.Provider value={value}>{children}</IdCardContext.Provider>;
}

export function useIdCard() {
  const ctx = useContext(IdCardContext);
  if (!ctx) {
    throw new Error('useIdCard: оберните приложение в <IdCardProvider>');
  }
  return ctx;
}
