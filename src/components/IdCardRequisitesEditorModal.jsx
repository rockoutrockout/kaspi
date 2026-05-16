import React, { useState, useEffect } from 'react';
import { useIdCard } from '../context/IdCardContext';

export default function IdCardRequisitesEditorModal({ open, onClose }) {
  const { data, updateRequisites } = useIdCard();

  const [formData, setFormData] = useState({
    surname: '',
    name: '',
    patronymic: '',
    iin: '',
    docNum: '',
    birthDate: '',
    birthPlace: '',
    nationality: '',
    issuer: '',
    issueDate: '',
    validDate: '',
  });

  useEffect(() => {
    if (open && data) {
      setFormData({
        surname: data.surname || '',
        name: data.name || '',
        patronymic: data.patronymic || '',
        iin: data.iin || '',
        docNum: data.docNum || '',
        birthDate: data.birthDate || '',
        birthPlace: data.birthPlace || '',
        nationality: data.nationality || '',
        issuer: data.issuer || '',
        issueDate: data.issueDate || '',
        validDate: data.validDate || '',
      });
    }
  }, [open, data]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (typeof updateRequisites === 'function') {
      updateRequisites(formData);
    } else {
      console.error("Функция updateRequisites не найдена!");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto no-scrollbar">
        <h2 className="text-lg font-bold text-zinc-900 mb-4">Редактировать реквизиты</h2>
        
        <form onSubmit={handleSave} className="space-y-3">
          {Object.keys(formData).map((key) => {
            const labels = {
              surname: 'Фамилия',
              name: 'Имя',
              patronymic: 'Отчество',
              iin: 'ИИН',
              docNum: 'Номер документа',
              birthDate: 'Дата рождения',
              birthPlace: 'Место рождения',
              nationality: 'Национальность',
              issuer: 'Орган выдачи',
              issueDate: 'Дата выдачи',
              validDate: 'Срок действия'
            };

            return (
              <div key={key} className="flex flex-col">
                <label className="text-xs font-semibold text-zinc-500 uppercase mb-1">
                  {labels[key] || key}
                </label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-800 focus:border-[#0089d0] focus:outline-none"
                />
              </div>
            );
          })}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-zinc-200 py-2.5 text-sm font-medium text-zinc-600 active:bg-zinc-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-[#0089d0] py-2.5 text-sm font-bold text-white active:bg-[#0077b5]"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}