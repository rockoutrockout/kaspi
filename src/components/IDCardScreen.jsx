import React, { useState, useRef, useEffect } from 'react';
import { useIdCard } from '../context/IdCardContext';
import IdCardEditorModal from './IdCardEditorModal';
import IdCardRequisitesEditorModal from './IdCardRequisitesEditorModal';

export default function IDCardScreen({ setPage }) {
  const { data } = useIdCard();
  const [photoEditorOpen, setPhotoEditorOpen] = useState(false);
  const [reqEditorOpen, setReqEditorOpen] = useState(false);
  const [tab, setTab] = useState('doc'); 
  const [qrModalOpen, setQrModalOpen] = useState(false); 
  
  const [isEditingCode, setIsEditingCode] = useState(false);
  const [newCode, setNewCode] = useState('056668');

  // Состояния для Pinch-to-Zoom
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);
  const startDistance = useRef(0);
  const startScale = useRef(1);
  const zoomContainerRef = useRef(null);

  const getDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    const container = zoomContainerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        startDistance.current = getDistance(e.touches);
        startScale.current = scaleRef.current;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        if (e.cancelable) e.preventDefault(); 
        const currentDistance = getDistance(e.touches);
        if (startDistance.current === 0) return;

        const factor = currentDistance / startDistance.current;
        let newScale = startScale.current * factor;

        if (newScale < 1) newScale = 1;
        if (newScale > 3) newScale = 3;

        scaleRef.current = newScale;
        setScale(newScale);
      }
    };

    const handleTouchEnd = (e) => {
      if (e.touches.length < 2) {
        startDistance.current = 0;
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []); 

  // Приоритет измененных данных из Context над дефолтным ФИО
  const currentData = {
    fio: data?.fio !== undefined ? data.fio : 'ЖАКУПОВ АДИЛЬ ТУЛЕУОВИЧ',
    iin: data?.iin !== undefined ? data.iin : '081115553353',
    birthDate: data?.birthDate !== undefined ? data.birthDate : '15.11.2004',
    docNum: data?.docNum !== undefined ? data.docNum : '058336131',
    issueDate: data?.issueDate !== undefined ? data.issueDate : '05.12.2020',
    validDate: data?.validDate !== undefined ? data.validDate : '04.12.2030',
    photoDataUrl: data?.photoDataUrl || ''
  };

  // Ключ id добавлен, чтобы определять правила регистра для ФИО и ИИН
  const requisites = [
    { id: 'fio', label: 'ФИО', value: currentData.fio },
    { id: 'iin', label: 'ИИН', value: currentData.iin },
    { id: 'birthDate', label: 'Дата рождения', value: currentData.birthDate },
    { id: 'docNum', label: 'Номер документа', value: currentData.docNum },
    { id: 'issueDate', label: 'Дата выдачи', value: currentData.issueDate },
    { id: 'validDate', label: 'Срок действия', value: currentData.validDate },
  ];

  const photoUrl = currentData.photoDataUrl;

  const handleSaveCode = () => {
    setIsEditingCode(false);
  };

  const handleCopyText = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text).catch(() => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    });
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-[#F2F4F7] overflow-y-auto">
      {/* HEADER */}
      <header className="relative bg-white pt-safe shadow-sm z-10 shrink-0">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setPage('services')} className="text-2xl text-zinc-400 active:opacity-60">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1 className="text-[17px] font-normal text-zinc-800">Удостоверение личности</h1>
          
          {/* Секретная зона для открытия модалки */}
          <button 
            onClick={() => setReqEditorOpen(true)} 
            className="absolute right-0 top-0 z-50 h-14 w-14 bg-transparent opacity-0 cursor-default"
          />
          <div className="w-6" />
        </div>

        {/* TABS */}
        <div className="px-4 pb-3">
          <div className="flex overflow-hidden rounded-lg bg-zinc-100 p-0.5">
            <button 
              onClick={() => setTab('doc')}
              className={`flex-1 rounded-md py-1.5 text-[13px] font-normal transition-all ${tab === 'doc' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'}`}
            >
              Документ
            </button>
            <button 
              onClick={() => setTab('req')}
              className={`flex-1 rounded-md py-1.5 text-[13px] font-normal transition-all ${tab === 'req' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'}`}
            >
              Реквизиты
            </button>
          </div>
        </div>
      </header>

      {/* MODALS */}
      <IdCardEditorModal open={photoEditorOpen} onClose={() => setPhotoEditorOpen(false)} />
      <IdCardRequisitesEditorModal open={reqEditorOpen} onClose={() => setReqEditorOpen(false)} />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col bg-white relative overflow-hidden style-for-pdf-clean">
        
        {tab === 'doc' && (
          <button 
            onClick={() => setPhotoEditorOpen(true)}
            className="absolute right-0 top-0 z-50 w-16 h-16 bg-transparent opacity-0 cursor-default"
          />
        )}

        {tab === 'doc' ? (
          <div className="w-full flex-1 flex flex-col items-center justify-start relative select-none">
            {photoUrl ? (
              <div 
                ref={zoomContainerRef}
                className="w-full flex-1 overflow-auto bg-white style-for-pdf-clean flex flex-col items-center justify-start pt-2 relative"
              >
                <div 
                  className="w-full flex items-start justify-center origin-center will-change-transform"
                  style={{ 
                    transform: `scale(${scale})`,
                    transition: startDistance.current === 0 ? 'transform 0.15s ease-out' : 'none' 
                  }}
                >
                  <img 
                    src={photoUrl} 
                    className="w-full h-auto max-w-full object-contain pointer-events-none" 
                    alt="Identity Card" 
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-zinc-400 w-full max-w-sm p-8 mt-20 text-center bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200 mx-4">
                <svg className="w-12 h-12 text-zinc-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                <span className="text-[14px] font-normal text-zinc-500">Удостоверение личности не загружено</span>
              </div>
            )}
          </div>
        ) : (
          /* СПИСОК РЕКВИЗИТОВ */
          <div className="flex-1 p-4 bg-[#F2F4F7] overflow-y-auto style-for-pdf-clean">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-20">
              <div className="divide-y divide-zinc-100">
                {requisites.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between px-4 py-3.5">
                    <div className="flex flex-col flex-1 pr-2">
                      {/* Названия строк теперь с Большой буквы и без капса (добавлен normal-case) */}
                      <span className="text-[11px] font-normal text-zinc-400 normal-case tracking-wide">{item.label}</span>
                      
                      {/* Значение реквизита: ФИО и ИИН остаются в uppercase, остальные получают normal-case.font-semibold убран */}
                      <span className={`text-[15px] font-normal text-zinc-900 mt-0.5 break-all ${
                        item.id === 'fio' || item.id === 'iin' ? 'uppercase' : 'normal-case'
                      }`}>
                        {item.value || '—'}
                      </span>
                    </div>
                    {item.value && (
                      <button
                        type="button"
                        onClick={() => handleCopyText(item.value)}
                        className="shrink-0 p-2 text-zinc-400 active:scale-90 transition-transform"
                        title="Копировать"
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM BUTTONS */}
      <div className="bg-white px-4 py-4 pb-safe space-y-3 border-t border-zinc-100 z-10 shrink-0 shadow-[0_-1px_3px_rgba(0,0,0,0.03)] relative mt-auto">
        {isEditingCode ? (
          <div className="p-2 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2">
            <input 
              type="text" 
              value={newCode} 
              onChange={(e) => setNewCode(e.target.value)}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-center font-normal text-lg text-zinc-800 focus:outline-none focus:border-[#0089d0]"
            />
            <button 
              onClick={handleSaveCode}
              className="w-full bg-zinc-800 text-white font-normal py-2 rounded-lg text-sm active:bg-zinc-700"
            >
              Применить код
            </button>
          </div>
        ) : tab === 'doc' ? (
          <>
            <button 
              onClick={() => setQrModalOpen(true)} 
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0089d0] py-3.5 text-[15px] font-normal text-white active:bg-[#0077b5] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="7" y1="8" x2="17" height="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="17" y2="16"/></svg>
              Предъявить документ
            </button>
            
            <button type="button" className="flex w-full items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#0089d0] text-[15px] font-normal text-[#0089d0] active:bg-[#0089d0]/10 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              Отправить документ
            </button>
          </>
        ) : (
          <button 
            type="button" 
            className="flex w-full items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-[#0089d0] bg-white text-[15px] font-normal text-[#0089d0] active:bg-[#0089d0]/5 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            Отправить реквизиты
          </button>
        )}

        <button 
          type="button"
          onClick={() => setIsEditingCode(!isEditingCode)}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-transparent opacity-0 z-50 cursor-default"
        />
      </div>

      {/* QR MODAL */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
          <div className="absolute inset-0" onClick={() => setQrModalOpen(false)} />
          <div className="relative w-full rounded-t-2xl bg-white px-6 pb-10 pt-5 text-center shadow-xl z-10 max-w-md mx-auto">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-zinc-200" />
            <button onClick={() => setQrModalOpen(false)} className="absolute right-4 top-4 rounded-full p-1 text-zinc-400">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <h3 className="text-lg font-normal text-zinc-800">Удостоверение личности</h3>
            <p className="mt-1.5 text-[14px] text-zinc-500 font-normal">Покажите QR-код сотруднику</p>
            <div className="my-5 flex justify-center">
              <div className="rounded-2xl border border-zinc-100 p-4 bg-white">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KaspiID-${newCode}&color=18181b`} 
                  alt="Kaspi QR Code"
                  className="w-[150px] h-[150px] object-contain"
                />
              </div>
            </div>
            <p className="text-[12px] text-zinc-400 font-normal uppercase tracking-wider">или скажите код</p>
            <p className="mt-1.5 text-2xl font-normal text-zinc-900 tracking-wide">{newCode}</p>
          </div>
        </div>
      )}
      
      <style>{`
        .style-for-pdf-clean::-webkit-scrollbar { display: none; }
        .style-for-pdf-clean { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}