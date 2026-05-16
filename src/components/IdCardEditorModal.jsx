import React, { useRef, useState } from 'react';
import { useIdCard } from '../context/IdCardContext';
import { resizeImageToDataUrl } from '../utils/resizeImageToDataUrl';

export default function IdCardEditorModal({ open, onClose }) {
  const { data, update } = useIdCard();
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);

  if (!open) return null;

  // Динамическое подключение конвертера PDF -> Картинка без npm install
  const loadPdfAsImage = (file) => {
    return new Promise((resolve, reject) => {
      const scriptId = 'pdf-js-cdn-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
        document.head.appendChild(script);
      }

      const checkReady = setInterval(() => {
        if (window.pdfjsLib) {
          clearInterval(checkReady);
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
          
          const fileReader = new FileReader();
          fileReader.onload = async function () {
            try {
              const typedarray = new Uint8Array(this.result);
              const pdf = await window.pdfjsLib.getDocument(typedarray).promise;
              const page = await pdf.getPage(1);
              
              const viewport = page.getViewport({ scale: 2.0 }); // Высокое качество
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;

              await page.render({ canvasContext: context, viewport: viewport }).promise;
              resolve(canvas.toDataURL('image/jpeg', 0.95));
            } catch (err) {
              reject(err);
            }
          };
          fileReader.readAsArrayBuffer(file);
        }
      }, 50);
    });
  };

  async function handlePick(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    
    if (!file) return;

    setBusy(true);
    try {
      if (file.type.startsWith('image/')) {
        const url = await resizeImageToDataUrl(file, { maxWidth: 1200, quality: 0.85 });
        update({ photoDataUrl: url });
        onClose();
      } else if (file.type === 'application/pdf') {
        const url = await loadPdfAsImage(file);
        update({ photoDataUrl: url });
        onClose();
      } else {
        alert('Пожалуйста, выберите фото или PDF');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка при конвертации PDF. Попробуйте сделать скриншот документа и загрузить его картинкой.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
      <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-center font-bold text-zinc-900">
          {busy ? 'Преобразование PDF...' : 'Загрузка удостоверения'}
        </h3>
        
        <div className="space-y-3">
          <input 
            ref={fileRef} 
            type="file" 
            accept="image/*,application/pdf"
            className="hidden" 
            onChange={handlePick} 
          />
          
          <button
            disabled={busy}
            onClick={() => fileRef.current?.click()}
            className={`w-full rounded-xl border border-zinc-200 py-4 font-semibold transition-opacity ${
              busy ? 'bg-zinc-200 text-zinc-400 opacity-50' : 'bg-zinc-50 text-zinc-700'
            }`}
          >
            {busy ? 'Пожалуйста, подождите...' : '📁 Выбрать фото или PDF'}
          </button>

          <button
            onClick={onClose}
            className="mt-4 w-full rounded-xl bg-red-500 py-4 font-bold text-white active:bg-red-600"
            disabled={busy}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}