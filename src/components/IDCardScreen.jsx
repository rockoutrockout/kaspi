import React, { useState } from 'react';
import { useIdCard } from '../context/IdCardContext';
import IdCardEditorModal from './IdCardEditorModal';

export default function IDCardScreen({ setPage }) {
  const { data } = useIdCard();
  const [editorOpen, setEditorOpen] = useState(false);
  const [tab, setTab] = useState('doc'); // 'doc' или 'req'

  // Данные извлечены из image_9ddb5a.jpg и image_9dddedb.png
  const requisites = [
    { label: 'Фамилия', value: 'БЕКЕНОВ' },
    { label: 'Имя', value: 'ИЛИЯС' },
    { label: 'Отчество', value: 'ЕРІКҰЛЫ' },
    { label: 'ИИН', value: '020820501234' }, // ИИН обычно начинается с даты рождения (20.08.2002)
    { label: 'Номер документа', value: '052752327' },
    { label: 'Дата рождения', value: '20.08.2002' },
    { label: 'Место рождения', value: 'АЛМАТЫ' },
    { label: 'Национальность', value: 'ҚАЗАҚ' },
    { label: 'Орган выдачи', value: 'ҚР ІШКІ ІСТЕР МИНИСТРЛІГІ' },
    { label: 'Дата выдачи', value: '03.03.2020' },
    { label: 'Срок действия', value: '02.03.2030' },
  ];

  return (
    <div className="relative flex min-h-full flex-col bg-white">
      {/* HEADER */}
      <header className="relative bg-white pt-safe">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setPage('services')} className="text-2xl text-red-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1 className="text-[17px] font-medium text-zinc-800">Удостоверение личности</h1>
          
          {/* ПРОЗРАЧНАЯ КНОПКА РЕДАКТИРОВАНИЯ */}
          <button 
            onClick={() => setEditorOpen(true)} 
            className="absolute right-0 top-0 z-50 h-12 w-12 opacity-0"
          />
          <div className="w-6" />
        </div>

        {/* TABS */}
        <div className="px-4 pb-3">
          <div className="flex overflow-hidden rounded-lg border border-red-500">
            <button 
              onClick={() => setTab('doc')}
              className={`flex-1 py-1.5 text-[13px] font-medium transition-colors ${tab === 'doc' ? 'bg-red-500 text-white' : 'text-red-500'}`}
            >
              Документ
            </button>
            <button 
              onClick={() => setTab('req')}
              className={`flex-1 py-1.5 text-[13px] font-medium transition-colors ${tab === 'req' ? 'bg-red-500 text-white' : 'text-red-500'}`}
            >
              Реквизиты
            </button>
          </div>
        </div>
      </header>

      <IdCardEditorModal open={editorOpen} onClose={() => setEditorOpen(false)} />

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto bg-[#F2F4F7]">
        {tab === 'doc' ? (
          /* ВКЛАДКА: ДОКУМЕНТ (ФОТО) */
          <div className="p-4 space-y-3">
            <div className="w-full overflow-hidden rounded-xl bg-white shadow-sm">
              {data.frontPhotoDataUrl ? (
                <img src={data.frontPhotoDataUrl} className="w-full" alt="Front" />
              ) : (
                <div className="aspect-[1.58/1] flex items-center justify-center text-zinc-400">Лицевая сторона</div>
              )}
            </div>
            <div className="w-full overflow-hidden rounded-xl bg-white shadow-sm">
              {data.backPhotoDataUrl ? (
                <img src={data.backPhotoDataUrl} className="w-full" alt="Back" />
              ) : (
                <div className="aspect-[1.58/1] flex items-center justify-center text-zinc-400">Обратная сторона</div>
              )}
            </div>
          </div>
        ) : (
          /* ВКЛАДКА: РЕКВИЗИТЫ (ТЕКСТ) */
          <div className="divide-y divide-zinc-200 bg-white">
            {requisites.map((item, idx) => (
              <div key={idx} className="flex flex-col px-4 py-3">
                <span className="text-[12px] text-zinc-500">{item.label}</span>
                <span className="text-[15px] font-medium text-zinc-900 mt-0.5">{item.value}</span>
              </div>
            ))}
            <div className="h-20 bg-[#F2F4F7]" /> {/* Отступ снизу */}
          </div>
        )}
      </div>

      {/* BOTTOM BUTTONS */}
      <div className="bg-white px-4 py-4 pb-safe space-y-4 shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
        <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0089d0] py-3.5 text-[15px] font-bold text-white active:opacity-90">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="17" y2="16"/></svg>
          Предъявить документ
        </button>
        
        <button className="flex w-full items-center justify-center gap-2 py-1 text-[15px] font-bold text-[#0089d0]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          Отправить документ
        </button>
      </div>
    </div>
  );
}