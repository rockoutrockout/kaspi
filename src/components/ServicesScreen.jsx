import React, { useState } from 'react';
import { useIdCard } from '../context/IdCardContext'; // Импортируем контекст

function ChevronRight() {
  return (
    <svg className="h-5 w-5 text-zinc-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function Row({ icon, label, onClick }) {
  const content = (
    <>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200/60">
        {icon}
      </div>
      <span className="min-w-0 flex-1 text-[15px] font-normal leading-snug text-zinc-900">
        {label}
      </span>
      <ChevronRight />
    </>
  );
  const rowClass =
    'flex w-full items-center gap-3 border-b border-zinc-100/90 px-4 py-3.5 text-left bg-white';
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${rowClass} active:bg-zinc-50/90`}>
        {content}
      </button>
    );
  }
  return <div className={rowClass}>{content}</div>;
}

export default function ServicesScreen({ setPage }) {
  // Достаем данные и функцию обновления из общего контекста
  const { data, update } = useIdCard();
  
  // Состояние показа встроенного редактора и временный буфер для инпута
  const [isEditing, setIsEditing] = useState(false);
  const [inputName, setInputName] = useState(data.childName || 'Бекенов Илияс Ерікұлы');

  const handleSave = () => {
    if (inputName.trim() !== '') {
      // Сохраняем в глобальный контекст — теперь имя не сбросится при выходе
      update({ childName: inputName.trim() });
    }
    setIsEditing(false);
  };

  return (
    <div className="relative flex min-h-full flex-col bg-white">
      {/* HEADER */}
      <header className="flex items-center border-b border-zinc-200/80 bg-white pt-safe shrink-0">
        <button
          type="button"
          onClick={() => setPage('home')}
          className="flex h-11 w-11 items-center justify-center text-kaspi active:opacity-60"
          aria-label="Назад"
        >
          <span className="text-[32px] font-light leading-none">‹</span>
        </button>
        <h1 className="flex-1 pr-11 text-center text-[16px] font-semibold tracking-tight text-zinc-900">
          Цифровые документы
        </h1>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-white pb-24">
        <p className="px-4 pb-1.5 pt-4 text-[12px] font-semibold uppercase tracking-wide text-zinc-500">
          Мои документы
        </p>

        <Row
          label="Удостоверение личности"
          onClick={() => setPage('id-card')}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="10" cy="10" r="1.6" fill="currentColor" />
              <path d="M8 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />
        <Row
          label="Водительское удостоверение"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="4" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="11" r="2.8" stroke="currentColor" strokeWidth="1.35" />
            </svg>
          }
        />
        <Row
          label="Свидетельство о браке"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M8 10c1.5-2 4.5-2 6 0M10 12c-2 2-2 5 0 7M14 12c2 2 2 5 0 7"
                stroke="currentColor"
                strokeWidth="1.45"
                strokeLinecap="round"
              />
            </svg>
          }
        />
        <Row
          label="Свидетельство о регистрации ТС"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="5" y="6" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 17l2-4h4l2 4" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
            </svg>
          }
        />
        <Row
          label="Паспорт вакцинации"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 4h8v16H8V4Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 9v5M9.5 11.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />

        <div className="h-2 w-full bg-zinc-100" />

        {/* ГЛОБАЛЬНОЕ ИМЯ ИЗ КОНТЕКСТА */}
        <p className="px-4 pb-1.5 pt-4 text-[12px] font-semibold uppercase tracking-wide text-zinc-500">
          {data.childName || 'Бекенов Илияс Ерікұлы'}
        </p>
        
        <Row
          label="Свидетельство о рождении"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="9" r="2.8" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 19c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />
      </div>

      {/* ВСТРОЕННЫЙ ИНЛАЙН-РЕДАКТОР ИМЕНИ */}
      <div className="absolute bottom-6 left-0 w-full px-4 z-40 pointer-events-none">
        {isEditing && (
          <div className="w-full bg-zinc-50 p-3 rounded-2xl border border-zinc-200/80 shadow-md space-y-2 pointer-events-auto max-w-sm mx-auto">
            <input 
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-xl font-medium text-sm text-zinc-800 focus:outline-none focus:border-zinc-500"
              placeholder="Новое ФИО ребенка"
            />
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className="flex-1 bg-zinc-900 text-white font-bold py-2 rounded-xl text-xs active:bg-zinc-800"
              >
                Применить
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="px-4 bg-zinc-200 text-zinc-600 font-semibold py-2 rounded-xl text-xs active:bg-zinc-300"
              >
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ТА САМАЯ НЕВИДИМАЯ КНОПКА В САМОМ НИЗУ ПОЦЕНТРУ */}
      <button 
        type="button"
        onClick={() => {
          setInputName(data.childName || 'Бекенов Илияс Ерікұлы');
          setIsEditing(!isEditing);
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-transparent opacity-0 z-50 cursor-default"
        aria-label="Переключить редактор имени"
      />
    </div>
  );
}