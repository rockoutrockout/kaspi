import React, { useState, useEffect } from 'react';
import { useIdCard } from '../context/IdCardContext';

export default function IdCardRequisitesEditorModal({ open, onClose }) {
  const { data, update } = useIdCard();
  const [form, setForm] = useState(data);

  // Обновляем форму, если данные контекста изменились
  useEffect(() => {
    setForm(data);
  }, [data, open]);

  if (!open) return null;

  function handleSave() {
    update(form);
    onClose();
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Поля для редактирования
  const fields = [
    { key: 'surname', label: 'Фамилия' },
    { key: 'name', label: 'Имя' },
    { key: 'patronymic', label: 'Отчество' },
    { key: 'iin', label: 'ИИН' },
    { key: 'docNum', label: 'Номер документа' },
    { key: 'birthDate', label: 'Дата рождения' },
    { key: 'birthPlace', label: 'Место рождения' },
    { key: 'nationality', label: 'Национальность' },
    { key: 'issuer', label: 'Орган выдачи' },
    { key: 'issueDate', label: 'Дата выдачи' },
    { key: 'validDate', label: 'Срок действия' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl flex flex-col max-h-[90vh]">
        <h3 className="mb-4 text-center text-lg font-bold text-zinc-900">
          Редактор реквизитов
        </h3>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {fields.map((f) => (
            <div key={f.key} className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-500 uppercase px-1">
                {f.label}
              </label>
              <input
                type="text"
                value={form[f.key] || ''}
                onChange={(e) => handleChange(f.key, e.target.value)}
                className="w-full rounded-xl bg-zinc-50 px-3 py-2.5 text-[14px] font-medium text-zinc-900 border border-zinc-200 outline-none focus:border-red-500"
              />
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-2 pt-2">
          <button
            onClick={handleSave}
            className="w-full rounded-xl bg-green-500 py-3.5 font-bold text-white active:bg-green-600"
          >
            Сохранить
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-zinc-100 py-3.5 font-bold text-zinc-600 active:bg-zinc-200"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}