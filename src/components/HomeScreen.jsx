import React from 'react';

const BRAND = '#e2382a';
const SW = 1.35;

// Добавьте этот CSS в ваш index.css для работы скрытия скроллбара:
// .no-scrollbar::-webkit-scrollbar { display: none; }
// .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

function SvgRoot({ children }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

function IconKaspiQr() {
  return (
    <SvgRoot>
      <path
        d="M4.5 9.5V4.5H9.5M14.5 4.5H19.5V9.5M4.5 14.5V19.5H9.5M19.5 14.5V19.5H14.5"
        stroke={BRAND}
        strokeWidth={SW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="10.4" y="10.4" width="2.2" height="2.2" rx="0.35" fill={BRAND} />
      <rect x="13.9" y="10.4" width="2.2" height="2.2" rx="0.35" fill={BRAND} />
      <rect x="10.4" y="13.9" width="2.2" height="2.2" rx="0.35" fill={BRAND} />
    </SvgRoot>
  );
}

function IconMyBank() {
  return (
    <SvgRoot>
      <rect x="3" y="7" width="18" height="11" rx="1.5" stroke={BRAND} strokeWidth={SW} />
      <path d="M6 10.5h12" stroke={BRAND} strokeWidth={SW} strokeLinecap="round" />
      <rect x="10.5" y="11.5" width="7" height="10" rx="1.25" stroke={BRAND} strokeWidth={SW} />
      <path d="M12.5 15h3.5" stroke={BRAND} strokeWidth={SW} strokeLinecap="round" />
    </SvgRoot>
  );
}

function IconPayments() {
  return (
    <SvgRoot>
      <rect x="5.5" y="10" width="13" height="10.5" rx="1.5" stroke={BRAND} strokeWidth={SW} />
      <path d="M8 13.5h8" stroke={BRAND} strokeWidth={SW} strokeLinecap="round" />
      <rect x="10" y="4.5" width="4" height="7" rx="0.6" stroke={BRAND} strokeWidth={SW} />
      <path d="M12 4.5V3.5" stroke={BRAND} strokeWidth={SW} strokeLinecap="round" />
    </SvgRoot>
  );
}

function IconTransfers() {
  return (
    <SvgRoot>
      <path
        d="M7 8.5h8.5M14.2 7.3l1.8 1.2-1.8 1.2"
        stroke={BRAND}
        strokeWidth={SW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 15.5H8.5M10.3 14.3l-1.8 1.2 1.8 1.2"
        stroke={BRAND}
        strokeWidth={SW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgRoot>
  );
}

function IconShop() {
  return (
    <SvgRoot>
      <path
        d="M6.5 8.5h11l-.8 9.5H7.3L6.5 8.5Zm2.2-3.5h6.6a1.2 1.2 0 0 1 1.2 1.2V8.5H7.5V6.2a1.2 1.2 0 0 1 1.2-1.2Z"
        stroke={BRAND}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path d="M9 12.5h6" stroke={BRAND} strokeWidth={SW} strokeLinecap="round" />
    </SvgRoot>
  );
}

function IconTravel() {
  return (
    <SvgRoot>
      <rect x="6.5" y="9" width="11" height="11" rx="2" stroke={BRAND} strokeWidth={SW} />
      <path
        d="M9.5 9V7.5C9.5 5.8 10.7 4.5 12 4.5s2.5 1.3 2.5 3V9"
        stroke={BRAND}
        strokeWidth={SW}
        strokeLinecap="round"
      />
      <path
        d="M9.2 14.8c.9 1.1 2.2 1.7 3.6 1.7s2.7-.6 3.6-1.7"
        stroke={BRAND}
        strokeWidth={SW}
        strokeLinecap="round"
      />
    </SvgRoot>
  );
}

function IconGov() {
  return (
    <SvgRoot>
      <path
        d="M5 19V11.5l7-3.2 7 3.2V19"
        stroke={BRAND}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d="M8 11.5c1.2-2.6 3.3-4.2 4-4.8.7.6 2.8 2.2 4 4.8"
        stroke={BRAND}
        strokeWidth={SW}
        strokeLinecap="round"
      />
      <path d="M9.5 19v-5h5v5" stroke={BRAND} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M12 5.2V3.2M12 3.2l1.2.9M12 3.2l-1.2.9" stroke={BRAND} strokeWidth={SW} strokeLinecap="round" />
    </SvgRoot>
  );
}

function IconAdsNew() {
  return (
    <div className="relative flex h-9 w-9 items-center justify-center">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 4.5h10.5l-.9 15.5H8.9L8 4.5Z"
          stroke={BRAND}
          strokeWidth={SW}
          strokeLinejoin="round"
        />
        <path
          d="M10.2 8.2h6.2M10.2 11.2h6.2M10.2 14.2h4.2"
          stroke={BRAND}
          strokeWidth={SW}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute -right-1 -top-1 rounded-full bg-[#e2382a] px-[4px] py-[1px] text-[7px] font-bold uppercase leading-none text-white ring-1 ring-white">
        NEW
      </span>
    </div>
  );
}

function BadgeSmall({ children }) {
  return (
    <span className="inline-flex items-center rounded bg-[#e2382a] px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
      {children}
    </span>
  );
}

function IconPlane() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-sky-800/80">
      <path
        d="M21 8l-7 4v5l-2-3v-4L3 9V7l9-2h2l7 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg
      className="h-[18px] w-[18px] shrink-0 text-zinc-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

function GridItem({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 rounded-xl py-1 active:bg-zinc-50"
    >
      <div className="flex h-10 w-10 items-center justify-center">{icon}</div>
      <span className="w-full px-1 text-center text-[11px] font-medium leading-tight text-zinc-700">
        {label}
      </span>
    </button>
  );
}

function FinItem({ tone, title, children }) {
  const tones = {
    red: 'bg-[#e2382a]',
    amber: 'bg-amber-400',
    green: 'bg-emerald-500',
  };
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-xl bg-white p-2.5 text-left ring-1 ring-black/[0.03] transition-colors active:bg-zinc-50"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white ${tones[tone]}`}
      >
        {children}
      </div>
      <span className="truncate text-[13px] font-bold text-zinc-900">
        {title}
      </span>
    </button>
  );
}

function ProductThumb({ variant }) {
  const surface =
    variant === 'a'
      ? 'from-zinc-200 to-zinc-100'
      : variant === 'b'
        ? 'from-zinc-300 to-zinc-200'
        : 'from-stone-200 to-stone-100';
  return (
    <div className="relative w-[110px] shrink-0 overflow-hidden rounded-xl border border-black/[0.05]">
      <div className={`aspect-[4/5] bg-gradient-to-br ${surface}`} />
      <div className="absolute inset-x-1.5 bottom-1.5 flex flex-wrap gap-1">
        <span className="rounded-[3px] bg-[#e2382a] px-1 py-0.5 text-[8px] font-bold text-white">
          0-0-12
        </span>
      </div>
    </div>
  );
}

export default function HomeScreen({ setPage }) {
  return (
    <div className="mx-auto max-w-md min-h-screen bg-[#f2f4f7] pb-20">
      {/* Header & Search */}
      <header className="bg-white px-4 pt-4 pb-3 shadow-sm">
        <div className="relative flex items-center">
          <button
            type="button"
            className="flex h-11 w-full items-center gap-3 rounded-xl bg-zinc-100 px-4 text-zinc-500 transition active:scale-[0.98]"
          >
            <IconSearch />
            <span className="text-[15px]">Поиск по Kaspi.kz</span>
          </button>
        </div>
      </header>

      {/* Stories/Promo */}
      <section className="no-scrollbar flex gap-3 overflow-x-auto px-4 py-4">
        <article className="relative min-w-[280px] shrink-0 overflow-hidden rounded-2xl bg-white p-4 shadow-sm border border-zinc-100">
           <div className="relative z-10">
            <BadgeSmall>0-0-12</BadgeSmall>
            <h3 className="mt-3 text-[16px] font-bold leading-tight text-zinc-900">
              Весь мир в вашем кармане
            </h3>
            <p className="mt-4 inline-block text-[12px] font-medium text-zinc-400">
              2.09 — 30.09
            </p>
          </div>
          <div className="absolute -right-4 -bottom-2 h-20 w-16 rounded-xl bg-zinc-800 rotate-12 shadow-xl" />
        </article>

        <article className="relative min-w-[280px] shrink-0 overflow-hidden rounded-2xl bg-sky-50 p-4 shadow-sm border border-sky-100">
          <div className="flex items-center gap-1.5 text-sky-900 mb-2">
            <span className="text-[13px] font-bold">Kaspi Travel</span>
            <IconPlane />
          </div>
          <BadgeSmall>0-0-12</BadgeSmall>
          <p className="mt-2 text-[16px] font-bold text-sky-950">
            Туры в рассрочку
          </p>
        </article>
      </section>

      {/* Grid Services */}
      <section className="bg-white py-4 px-2">
        <div className="grid grid-cols-4 gap-y-4">
          <GridItem icon={<IconKaspiQr />} label="Kaspi QR" />
          <GridItem icon={<IconMyBank />} label="Мой Банк" />
          <GridItem icon={<IconPayments />} label="Платежи" />
          <GridItem icon={<IconTransfers />} label="Переводы" />
          <GridItem icon={<IconShop />} label="Магазин" />
          <GridItem icon={<IconTravel />} label="Travel" />
          <GridItem icon={<IconGov />} label="Госуслуги" onClick={() => setPage?.('services')} />
          <GridItem icon={<IconAdsNew />} label="Объявления" />
        </div>
      </section>

      {/* Fin Products */}
      <section className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-2">
          <FinItem tone="red" title="Рассрочка 0%">
            <span className="text-[9px] font-black">0-0-12</span>
          </FinItem>
          <FinItem tone="amber" title="Kaspi Депозит">
            <span className="text-lg font-bold">₸</span>
          </FinItem>
          <FinItem tone="green" title="Кредит Наличными">
             <div className="border-2 border-white rounded-sm w-5 h-3" />
          </FinItem>
          <FinItem tone="red" title="Kaspi Red+">
            <span className="text-[10px] font-black">R+</span>
          </FinItem>
        </div>
      </section>

      {/* Banner Apple */}
      <section className="px-4 mt-4">
        <article className="overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-zinc-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">Apple</span>
                <BadgeSmall>0-0-24</BadgeSmall>
              </div>
              <p className="mt-2 text-[18px] font-bold leading-tight">
                Технология совершенства
              </p>
            </div>
            <div className="h-12 w-8 bg-zinc-900 rounded-md shadow-lg" />
          </div>
          <div className="mt-6 flex justify-center gap-1.5">
            <div className="h-1 w-6 rounded-full bg-[#e2382a]" />
            <div className="h-1 w-1.5 rounded-full bg-zinc-200" />
            <div className="h-1 w-1.5 rounded-full bg-zinc-200" />
          </div>
        </article>
      </section>

      {/* Recently Viewed */}
      <section className="mt-4 bg-white p-4">
        <h2 className="text-[16px] font-bold text-zinc-900">Вы недавно смотрели</h2>
        <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-2">
          <ProductThumb variant="a" />
          <ProductThumb variant="b" />
          <ProductThumb variant="c" />
          <ProductThumb variant="a" />
        </div>
      </section>
    </div>
  );
}