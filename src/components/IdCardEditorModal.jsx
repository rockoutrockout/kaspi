import React, { useState } from 'react';
import { useIdCard } from '../context/IdCardContext';

export default function IdCardEditorModal({ open, onClose }) {
  const context = useIdCard() || {};
  const updatePhoto = context.updatePhoto;
  const [dragActive, setDragActive] = useState(false);

  // Если модалка закрыта, ничего не рендерим
  if (!open) return null;

  const handleFile = (file) => {
    if (!file || !updatePhoto) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      // Сохраняем строку файла в наш контекст (и localstorage)
      updatePhoto(e.target.result);
      onClose(); // Закрываем модалку после успешной загрузки
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Шапка модалки */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-zinc-800">Загрузить документ</h3>
          <button 
            onClick={onClose} 
            className="text-zinc-400 hover:text-zinc-600 text-2xl font-medium leading-none active:scale-95 p-1 transition-transform"
          >
            ×
          </button>
        </div>

        {/* Зона для дропа файлов (Drag and Drop) */}
        <label 
          onDragEnter={() => setDragActive(true)}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            dragActive ? 'border-[#0089d0] bg-blue-50/30' : 'border-zinc-300 bg-zinc-50 hover:bg-zinc-100/70'
          }`}
        >
          <input 
            type="file" 
            accept="image/*,application/pdf" 
            className="hidden" 
            onChange={handleChange} 
          />
          
          <svg className="w-10 h-10 text-zinc-400 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          
          <span className="text-sm font-medium text-zinc-600">
            Нажмите для выбора файла или перетащите его сюда
          </span>
          <span className="text-xs text-zinc-400 mt-1">
            Поддерживаются картинки (PNG, JPG) и PDF
          </span>
        </label>

      </div>
    </div>
  );
}