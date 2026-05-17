import React, { useEffect, useState } from 'react';
import { useIdCard } from '../context/IdCardContext';

function ChevronRight({ className = 'h-5 w-5 text-zinc-300' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.7" stroke="currentColor" strokeWidth="2" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TabIcon({ type, className = 'h-[32px] w-[32px]' }) {
  const common = { stroke: 'currentColor', strokeWidth: 1.65, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    home: <path d="m5 11 7-6 7 6v8H8v-6h8" {...common} />,
    qr: (
      <>
        <path d="M5 5h5v5H5V5Zm9 0h5v5h-5V5ZM5 14h5v5H5v-5Z" {...common} />
        <path d="M14 14h2v2h-2v-2Zm5 0v5h-5" {...common} />
      </>
    ),
    chat: (
      <>
        <path d="M5 6h14v10H9l-4 3V6Z" {...common} />
        <path d="M8.5 10h7M8.5 13h4.5" {...common} />
      </>
    ),
    menu: <path d="M5 7h14M5 12h14M5 17h14" {...common} />,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {icons[type]}
    </svg>
  );
}

function DocumentIllustration({ tone = 'green', type = 'id' }) {
  const palette = {
    green: ['#BDF2D5', '#6AD6AC', '#F1FFF8'],
    blue: ['#10BBD7', '#078FB0', '#D8F8FF'],
    pink: ['#FFD5D4', '#FF8C87', '#FFF1EF'],
  }[tone];

  return (
    <svg className="h-[39px] w-[55px]" viewBox="0 0 54 38" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="48" height="28" rx="3.5" fill={palette[2]} />
      <rect x="7" y="8" width="40" height="22" rx="2.5" fill={palette[0]} />
      <circle cx="18" cy="19" r="5" fill={palette[1]} />
      <path d="M28 15h13M28 20h10M28 25h13" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {type === 'passport' && <circle cx="18" cy="19" r="8" stroke="white" strokeWidth="1.5" />}
      {type === 'license' && <path d="M13 14h12v10H13z" stroke="white" strokeWidth="1.6" />}
    </svg>
  );
}

function RedServiceIcon({ type }) {
  const common = { stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    certificate: (
      <>
        <path d="M8 4.5h8l4 4V20H8V4.5Z" {...common} />
        <path d="M16 4.5V9h4M11 12h5M11 15h7" {...common} />
      </>
    ),
    home: (
      <>
        <path d="m5 11 7-6 7 6v9H7v-7h10" {...common} />
        <path d="M10 20v-5h4v5" {...common} />
      </>
    ),
    coins: (
      <>
        <ellipse cx="12" cy="7" rx="6" ry="2.7" {...common} />
        <path d="M6 7v5c0 1.5 2.7 2.7 6 2.7s6-1.2 6-2.7V7M6 12v5c0 1.5 2.7 2.7 6 2.7s6-1.2 6-2.7v-5" {...common} />
      </>
    ),
    car: (
      <>
        <path d="m6.5 15 1.7-5h7.6l1.7 5M5 15h14v4H5v-4Z" {...common} />
        <path d="M8 19v1.5M16 19v1.5M8.5 16.8h.1M15.4 16.8h.1" {...common} />
      </>
    ),
    docs: (
      <>
        <path d="M7 4.5h10v15H7v-15Z" {...common} />
        <path d="M10 9h4M10 12h4M10 15h3" {...common} />
      </>
    ),
  };

  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center text-[#F14635]">
      <svg className="h-[28px] w-[28px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {icons[type]}
      </svg>
    </span>
  );
}

function DocumentCard({ title, tone, type, onClick }) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className="flex h-[96px] min-w-[100px] flex-col justify-between rounded-lg bg-[#F4F5F6] p-2.5 text-left active:bg-zinc-200"
    >
      <DocumentIllustration tone={tone} type={type} />
      <span className="text-[13px] font-medium leading-[15px] text-zinc-900">{title}</span>
    </Tag>
  );
}

function ServiceRow({ icon, title, subtitle, onClick }) {
  const content = (
    <>
      <RedServiceIcon type={icon} />
      <div className="min-w-0 flex-1 py-[15px]">
        <p className="text-[16px] font-normal leading-[19px] text-zinc-800">{title}</p>
        {subtitle && <p className="mt-0.5 text-[12px] leading-[15px] text-zinc-400">{subtitle}</p>}
      </div>
      <ChevronRight className="mr-2 h-5 w-5 text-zinc-300" />
    </>
  );
  const className = 'flex w-full items-center gap-1 border-b border-[#EEF0F2] bg-white pl-4 text-left last:border-b-0 active:bg-zinc-50';

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}

function BottomTab({ type, label, active }) {
  return (
    <button type="button" className="flex flex-1 flex-col items-center justify-center gap-1 active:opacity-75">
      <span className={active ? 'text-[#F14635]' : 'text-zinc-500'}>
        <TabIcon type={type} />
      </span>
      <span className={`text-[11px] leading-3 ${active ? 'text-[#F14635]' : 'text-zinc-500'}`}>{label}</span>
    </button>
  );
}

export default function ServicesScreen({ setPage }) {
  const { data, updateRequisites } = useIdCard();
  const [isEditing, setIsEditing] = useState(false);
  const [inputName, setInputName] = useState('');
  const childName = (data && data.childName) || 'Бекенов Илияс Ерікұлы';

  useEffect(() => {
    setInputName(childName);
  }, [childName]);

  const handleSave = () => {
    if (inputName.trim() !== '') {
      updateRequisites({ childName: inputName.trim() });
    }
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-[100dvh] w-full justify-center bg-white text-zinc-900">
      <div className="relative flex min-h-[100dvh] w-full max-w-[414px] flex-col overflow-hidden bg-[#F2F4F7] text-[1.1rem]">
        <header className="sticky top-0 z-20 bg-white pt-safe">
          <div className="relative flex h-[50px] items-center justify-center">
            <button
              type="button"
              onClick={() => setPage('home')}
              className="absolute left-1 top-0 flex h-[50px] w-[50px] items-center justify-center text-zinc-900 active:opacity-60"
              aria-label="Назад"
            >
              <BackIcon />
            </button>
            <h1 className="text-[17px] font-semibold leading-5 text-zinc-900">Госуслуги</h1>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto pb-[96px] no-scrollbar">
          <div className="bg-white px-3.5 pb-3.5">
            <div className="flex h-[38px] rounded-xl bg-[#F3F3F3] p-0.5">
              <button type="button" className="flex flex-1 items-center justify-center rounded-[10px] bg-white text-[14px] font-medium text-zinc-800 shadow-sm active:opacity-80">
                Все услуги
              </button>
              <button type="button" className="flex flex-1 items-center justify-center rounded-[10px] text-[14px] font-medium text-zinc-800 active:bg-zinc-200">
                Мои заявки
              </button>
            </div>

            <button
              type="button"
              className="mt-3 flex h-[48px] w-full items-center gap-2 rounded-xl bg-[#F4F5F6] px-3 text-left active:bg-zinc-200"
            >
              <SearchIcon className="h-5 w-5 text-zinc-300" />
              <span className="text-[15px] text-zinc-400">Поиск по Госуслугам</span>
            </button>
          </div>

          <section className="mt-3 bg-white px-3.5 py-3.5">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              <DocumentCard
                title={
                  <>
                    Удостоверение
                    <br />
                    личности
                  </>
                }
                tone="green"
                type="id"
                onClick={() => setPage('id-card')}
              />
              <DocumentCard
                title={
                  <>
                    Паспорт
                    <br />
                    гражданина РК
                  </>
                }
                tone="blue"
                type="passport"
              />
              <DocumentCard
                title={
                  <>
                    Водительские
                    <br />
                    права
                  </>
                }
                tone="pink"
                type="license"
              />
            </div>
            <button
              type="button"
              onClick={() => setPage('id-card')}
              className="mt-3 flex h-5 w-full items-center justify-between text-left active:opacity-70"
            >
              <span className="text-[15px] font-semibold leading-5 text-[#1687D9]">Все документы</span>
              <ChevronRight className="h-5 w-5 text-[#1687D9]" />
            </button>
          </section>

          <section className="mt-3 bg-white">
            <ServiceRow icon="certificate" title="Справки" subtitle="Социальные, по недвижимости и медицинские" />
            <ServiceRow icon="home" title="Прописка и снятие с прописки по месту жительства" />
            <ServiceRow icon="coins" title="Пособия и выплаты" subtitle="На ребенка, для многодетных, при потере работы" />
            <ServiceRow icon="car" title="Переоформление авто" />
          </section>

          <section className="mt-3 bg-white">
            <div className="border-b border-[#EEF0F2] px-4 pb-2 pt-3">
              <p className="text-[14px] font-semibold leading-4 text-zinc-500">{childName}</p>
            </div>
            <ServiceRow icon="docs" title="Свидетельство о рождении" subtitle="Цифровой документ ребенка" />
          </section>
        </main>

        <div className="absolute bottom-[62px] left-0 z-40 w-full px-4 pointer-events-none">
          {isEditing && (
            <div className="mx-auto w-full max-w-sm rounded-2xl border border-zinc-200/80 bg-zinc-50 p-3 shadow-md pointer-events-auto">
              <input
                type="text"
                value={inputName}
                onChange={(event) => setInputName(event.target.value)}
                className="h-10 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-800 outline-none focus:border-zinc-500"
                placeholder="Новое ФИО ребенка"
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="h-9 flex-1 rounded-xl bg-zinc-900 text-xs font-bold text-white active:bg-zinc-800"
                >
                  Применить
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="h-9 rounded-xl bg-zinc-200 px-4 text-xs font-semibold text-zinc-600 active:bg-zinc-300"
                >
                  Отмена
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setInputName(childName);
            setIsEditing(!isEditing);
          }}
          className="absolute bottom-0 left-1/2 z-50 h-6 w-32 -translate-x-1/2 cursor-default bg-transparent opacity-0"
          aria-label="Переключить редактор имени"
        />

        <nav className="absolute bottom-0 left-0 right-0 z-20 flex h-[78px] border-t border-zinc-200 bg-white pb-safe">
          <BottomTab type="home" label="Главная" />
          <BottomTab type="qr" label="Kaspi QR" />
          <BottomTab type="chat" label="Сообщения" />
          <BottomTab type="menu" label="Сервисы" active />
        </nav>
      </div>
    </div>
  );
}
