import React, { useState, useEffect } from 'react';
import { useIdCard } from '../context/IdCardContext';

export default function IdCardRequisitesEditorModal({ open, onClose }) {
  const { data, updateRequisites } = useIdCard();

  // Начальные дефолтные данные
  const [formData, setFormData] = useState({
    fio: 'ЖАКУПОВ АДИЛЬ ТУЛЕУОВИЧ',
    iin: '081115553353',
    birthDate: '15.11.2004',
    docNum: '058336131',
    issueDate: '05.12.2020',
    validDate: '04.12.2030',
  });

  // Функция, которая делает первую букву заглавной, а остальные строчными
  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    const str = string.toString();
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  useEffect(() => {
    if (open) {
      // При загрузке данных форматируем всё, кроме ФИО и ИИН, чтобы они не были капсом
      setFormData({
        fio: data?.fio !== undefined ? data.fio.toUpperCase() : 'ЖАКУПОВ АДИЛЬ ТУЛЕУОВИЧ',
        iin: data?.iin !== undefined ? data.iin : '081115553353',
        birthDate: data?.birthDate !== undefined ? capitalizeFirstLetter(data.birthDate) : '15.11.2004',
        docNum: data?.docNum !== undefined ? capitalizeFirstLetter(data.docNum) : '058336131',
        issueDate: data?.issueDate !== undefined ? capitalizeFirstLetter(data.issueDate) : '05.12.2020',
        validDate: data?.validDate !== undefined ? capitalizeFirstLetter(data.validDate) : '04.12.2030',
      });
    }
  }, [open, data]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'fio') {
      // ФИО всегда принудительно КАПСОМ
      setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
    } else if (name === 'iin' || name === 'birthDate' || name === 'docNum' || name === 'issueDate' || name === 'validDate') {
      // Для ИИН и дат просто сохраняем как ввели, но убираем капс при вводе букв (если они есть)
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      // Для любых других текстовых полей — только первая буква заглавная
      setFormData((prev) => ({ ...prev, [name]: capitalizeFirstLetter(value) }));
    }
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

  const labels = {
    fio: 'ФИО',
    iin: 'ИИН',
    birthDate: 'Дата рождения',
    docNum: 'Номер документа',
    issueDate: 'Дата выдачи',
    validDate: 'Срок действия'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto no-scrollbar">
        <h2 className="text-lg font-normal text-zinc-900 mb-4 normal-case">Редактировать реквизиты</h2>
        
        <form onSubmit={handleSave} className="space-y-3">
          {Object.keys(labels).map((key) => (
            <div key={key} className="flex flex-col">
              {/* normal-case полностью отключает глобальный капс для подписей */}
              <label className="text-xs font-normal text-zinc-500 mb-1 normal-case">
                {labels[key]}
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                // normal-case принудительно заставляет инпут отображать строчные буквы
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-800 font-normal normal-case focus:border-[#0089d0] focus:outline-none"
              />
            </div>
          ))}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-zinc-200 py-2.5 text-sm font-normal text-zinc-600 normal-case active:bg-zinc-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-[#0089d0] py-2.5 text-sm font-normal text-white normal-case active:bg-[#0077b5]"
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