import React, { useState } from 'react';
import { useIdCard } from '../context/IdCardContext';
import IdCardEditorModal from './IdCardEditorModal';
import IdCardRequisitesEditorModal from './IdCardRequisitesEditorModal';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export default function IDCardScreen({ setPage }) {
  const { data } = useIdCard();
  const [photoEditorOpen, setPhotoEditorOpen] = useState(false);
  const [reqEditorOpen, setReqEditorOpen] = useState(false);
  const [tab, setTab] = useState('doc'); 
  const [qrModalOpen, setQrModalOpen] = useState(false); 
  
  const [isEditingCode, setIsEditingCode] = useState(false);
  const [newCode, setNewCode] = useState('056668');

  // Безопасная проверка на случай, если контекст вернет undefined
  const currentData = data || {};

  const requisites = [
    { label: 'Фамилия', value: currentData.surname || '' },
    { label: 'Имя', value: currentData.name || '' },
    { label: 'Отчество', value: currentData.patronymic || '' },
    { label: 'ИИН', value: currentData.iin || '' },
    { label: 'Номер документа', value: currentData.docNum || '' },
    { label: 'Дата рождения', value: currentData.birthDate || '' },
    { label: 'Место рождения', value: currentData.birthPlace || '' },
    { label: 'Национальность', value: currentData.nationality || '' },
    { label: 'Орган выдачи', value: currentData.issuer || '' },
    { label: 'Дата выдачи', value: currentData.issueDate || '' },
    { label: 'Срок действия', value: currentData.validDate || '' },
  ];

  const photoUrl = currentData.photoDataUrl || '';
  const isPdf = photoUrl && (photoUrl.startsWith('data:application/pdf') || photoUrl.endsWith('.pdf'));

  const handleSaveCode = () => {
    setIsEditingCode(false);
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-[#F2F4F7] overflow-y-auto">
      {/* HEADER */}
      <header className="relative bg-white pt-safe shadow-sm z-10 shrink-0">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setPage('services')} className="text-2xl text-zinc-400 active:opacity-60">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1 className="text-[17px] font-medium text-zinc-800">Удостоверение личности</h1>
          
          {/* Секретная кнопка для редактирования реквизитов */}
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
              className={`flex-1 rounded-md py-1.5 text-[13px] font-medium transition-all ${tab === 'doc' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'}`}
            >
              Документ
            </button>
            <button 
              onClick={() => setTab('req')}
              className={`flex-1 rounded-md py-1.5 text-[13px] font-medium transition-all ${tab === 'req' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'}`}
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
      <div className="flex-1 flex flex-col bg-white relative">
        
        {/* Твоя секретная невидимая кнопка для загрузки/смены документа */}
        {tab === 'doc' && (
          <button 
            onClick={() => setPhotoEditorOpen(true)}
            className="absolute right-2 top-2 z-50 w-12 h-12 bg-transparent opacity-0 cursor-default"
            title="Изменить файл документа"
          />
        )}

        {tab === 'doc' ? (
          <div className="w-full flex-1 bg-white flex items-center justify-center p-4 min-h-[350px]">
            {photoUrl ? (
              <TransformWrapper 
                initialScale={1} 
                minScale={1} 
                maxScale={4} 
                limitToBounds={true}
                disabled={false}
                panning={{ disabled: true }}
              >
                <TransformComponent wrapperStyle={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div className="w-full flex items-center justify-center relative overflow-hidden select-none">
                    {isPdf ? (
                      <div className="w-full h-[500px] flex items-center justify-center">
                        <iframe 
                          src={`${photoUrl}#toolbar=0&navpanes=0&statusbar=0&view=Fit`} 
                          className="w-full h-full border-none pointer-events-none"
                          title="Identity Card PDF"
                        />
                      </div>
                    ) : (
                      <img 
                        src={photoUrl} 
                        className="w-full max-h-[70vh] h-auto object-contain rounded-xl shadow-sm" 
                        alt="Identity Card" 
                      />
                    )}
                  </div>
                </TransformComponent>
              </TransformWrapper>
            ) : (
              /* Аккуратный пустой плейсхолдер, если файл еще не добавлен */
              <div className="flex flex-col items-center justify-center text-zinc-400 w-full max-w-sm p-8 text-center bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200">
                <svg className="w-12 h-12 text-zinc-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                <span className="text-[14px] font-medium text-zinc-500">Удостоверение личности не загружено</span>
                <span className="text-[11px] text-zinc-400 mt-1">Используйте скрытую кнопку вверху экрана для добавления файла</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 p-4 bg-[#F2F4F7]">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="divide-y divide-zinc-100">
                {requisites.map((item, idx) => (
                  <div key={idx} className="flex flex-col px-4 py-3">
                    <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wide">{item.label}</span>
                    <span className="text-[15px] font-semibold text-zinc-900 mt-0.5">{item.value}</span>
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
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-center font-bold text-lg text-zinc-800 focus:outline-none focus:border-[#0089d0]"
              placeholder="Введите новый код"
            />
            <button 
              onClick={handleSaveCode}
              className="w-full bg-zinc-800 text-white font-bold py-2 rounded-lg text-sm active:bg-zinc-700"
            >
              Применить код
            </button>
          </div>
        ) : (
          <>
            <button 
              onClick={() => setQrModalOpen(true)} 
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0089d0] py-3.5 text-[15px] font-bold text-white active:bg-[#0077b5] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="7" y1="8" x2="17" height="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="17" y2="16"/></svg>
              Предъявить документ
            </button>
            
            <button type="button" className="flex w-full items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#0089d0] text-[15px] font-bold text-[#0089d0] active:bg-[#0089d0]/10 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              Отправить документ
            </button>
          </>
        )}

        {/* Секретная кнопка смены секретного кода */}
        <button 
          type="button"
          onClick={() => setIsEditingCode(!isEditingCode)}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-transparent opacity-0 z-50 cursor-default"
        />
      </div>

      {/* QR MODAL */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 transition-opacity duration-300">
          <div className="absolute inset-0" onClick={() => setQrModalOpen(false)} />
          
          <div className="relative w-full rounded-t-2xl bg-white px-6 pb-10 pt-5 text-center shadow-xl z-10 max-w-md mx-auto">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-zinc-200" />
            
            <button 
              onClick={() => setQrModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 active:scale-95 transition-all"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <h3 className="text-lg font-bold text-zinc-800">Удостоверение личности</h3>
            <p className="mt-1.5 text-[14px] text-zinc-500 font-medium">Покажите QR-код сотруднику</p>
            
            <div className="my-5 flex justify-center">
              <div className="rounded-2xl border border-zinc-100 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KaspiID-${newCode}&color=18181b`} 
                  alt="Kaspi QR Code"
                  className="w-[150px] h-[150px] object-contain"
                />
              </div>
            </div>

            <p className="text-[12px] text-zinc-400 font-medium uppercase tracking-wider">или скажите код</p>
            <p className="mt-1.5 text-2xl font-bold text-zinc-900 tracking-wide">{newCode}</p>
          </div>
        </div>
      )}
    </div>
  );
}