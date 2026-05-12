import React from 'react';

const RED = '#e2382a';
const GRAY = '#a1a1aa';

function IconHome({ active }) {
  const c = active ? RED : GRAY;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke={c}
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconQr() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.2" stroke={GRAY} strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.2" stroke={GRAY} strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.2" stroke={GRAY} strokeWidth="1.5" />
      <path d="M14 14h2.2v2.2H14V14Zm4 0H20v2.2h-1.9V14ZM14 18h6v2h-6v-2Z" fill={GRAY} />
    </svg>
  );
}

function IconMessages() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        stroke={GRAY}
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconServices({ active }) {
  const c = active ? RED : GRAY;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 7h14M5 12h14M5 17h10" stroke={c} strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export default function TabBar({ page, setPage }) {
  return (
    <nav className="shrink-0 border-t border-gray-200/90 bg-white/95 pb-safe pt-1.5 shadow-[0_-1px_0_rgba(0,0,0,0.04)] backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <div className="flex items-end justify-between px-1">
        <button
          type="button"
          onClick={() => setPage('home')}
          className="flex min-w-0 flex-1 flex-col items-center gap-1 py-1 active:opacity-70"
        >
          <IconHome active={page === 'home'} />
          <span
            className={`max-w-full truncate text-[10px] font-semibold tracking-tight ${
              page === 'home' ? 'text-[#e2382a]' : 'text-zinc-400'
            }`}
          >
            Главная
          </span>
        </button>

        <div className="flex min-w-0 flex-1 flex-col items-center gap-1 py-1">
          <IconQr />
          <span className="max-w-full truncate text-[10px] font-semibold tracking-tight text-zinc-300">
            Kaspi QR
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-center gap-1 py-1">
          <IconMessages />
          <span className="max-w-full truncate text-[10px] font-semibold tracking-tight text-zinc-300">
            Сообщения
          </span>
        </div>

        <button
          type="button"
          onClick={() => setPage('services')}
          className="flex min-w-0 flex-1 flex-col items-center gap-1 py-1 active:opacity-70"
        >
          <IconServices active={page === 'services'} />
          <span
            className={`max-w-full truncate text-[10px] font-semibold tracking-tight ${
              page === 'services' ? 'text-[#e2382a]' : 'text-zinc-400'
            }`}
          >
            Сервисы
          </span>
        </button>
      </div>
    </nav>
  );
}
