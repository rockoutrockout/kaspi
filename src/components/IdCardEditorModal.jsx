import React, { useRef, useState } from 'react';
import { useIdCard } from '../context/IdCardContext';
import { resizeImageToDataUrl } from '../utils/resizeImageToDataUrl';

export default function IdCardEditorModal({ open, onClose }) {
  const { data, update } = useIdCard();
  const [busy, setBusy] = useState(false);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  if (!open) return null;

  async function handlePick(e, type) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !file.type.startsWith('image/')) return;
    setBusy(true);
    try {
      const isFront = type === 'front';
      const url = await resizeImageToDataUrl(file, { maxWidth: 1000, quality: 0.85 });
      update({ [isFront ? 'frontPhotoDataUrl' : 'backPhotoDataUrl']: url });
    } catch {
      alert('Ошибка загрузки');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
      <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-center font-bold text-zinc-900">Загрузка сторон удостоверения</h3>
        
        <div className="space-y-3">
          <input ref={frontRef} type="file" accept="image/*" className="hidden" onChange={(e) => handlePick(e, 'front')} />
          <button
            onClick={() => frontRef.current?.click()}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-4 font-semibold text-zinc-700"
          >
            {data.frontPhotoDataUrl ? '✅ Лицевая добавлена' : '📁 Выбрать Лицевую'}
          </button>

          <input ref={backRef} type="file" accept="image/*" className="hidden" onChange={(e) => handlePick(e, 'back')} />
          <button
            onClick={() => backRef.current?.click()}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-4 font-semibold text-zinc-700"
          >
            {data.backPhotoDataUrl ? '✅ Обратная добавлена' : '📁 Выбрать Обратную'}
          </button>

          <button
            onClick={onClose}
            className="mt-4 w-full rounded-xl bg-red-500 py-4 font-bold text-white active:bg-red-600"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}