import React from 'react';

function SearchIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.6" stroke="currentColor" strokeWidth="2" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function QrIcon({ className = 'h-6 w-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M15 14h2.5v2.5H15V14Zm4 0h1v6h-6v-1.1h3.5v-2.4H19V14Z" fill="currentColor" />
    </svg>
  );
}

function LineIcon({ type, className = 'h-7 w-7' }) {
  const common = { stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    qr: (
      <>
        <path d="M5 5h5v5H5V5Zm9 0h5v5h-5V5ZM5 14h5v5H5v-5Z" {...common} />
        <path d="M14 14h2v2h-2v-2Zm5 0v5h-5" {...common} />
      </>
    ),
    bank: (
      <>
        <path d="M4.5 9 12 5l7.5 4M6 10.5h12M7.5 10.5v7m4.5-7v7m4.5-7v7M5.5 18h13" {...common} />
      </>
    ),
    payments: (
      <>
        <path d="M7 6h10v13H7V6Z" {...common} />
        <path d="M9.5 9h5M9.5 12h5M9.5 15H13" {...common} />
      </>
    ),
    transfer: (
      <>
        <path d="M6 8h10.5M14 5.5 16.5 8 14 10.5M18 16H7.5M10 13.5 7.5 16l2.5 2.5" {...common} />
      </>
    ),
    shop: (
      <>
        <path d="M5 8h14l-1.2 8.5H7L5 8Z" {...common} />
        <path d="M8.5 8a3.5 3.5 0 0 1 7 0" {...common} />
      </>
    ),
    travel: (
      <>
        <path d="M8 7h8a2 2 0 0 1 2 2v8H6V9a2 2 0 0 1 2-2Z" {...common} />
        <path d="M9 7V5h6v2M6 12h12" {...common} />
      </>
    ),
    gov: (
      <>
        <path d="M4.5 10.5h15L12 5.5l-7.5 5Z" {...common} />
        <path d="M7 11.5V17m5-5.5V17m5-5.5V17M5.5 18.5h13" {...common} />
      </>
    ),
    messages: (
      <>
        <path d="M5 6.5h14v9H9l-4 3v-12Z" {...common} />
        <path d="M8.5 10h7M8.5 13h4" {...common} />
      </>
    ),
    home: (
      <>
        <path d="m5 11 7-6 7 6v8H7v-5h10" {...common} />
      </>
    ),
    menu: (
      <>
        <path d="M5 7h14M5 12h14M5 17h14" {...common} />
      </>
    ),
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {icons[type]}
    </svg>
  );
}

function ServiceButton({ icon, label, onClick, badge }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex min-h-[62px] flex-col items-center justify-start gap-1 rounded-lg pt-1 text-center active:bg-zinc-100"
    >
      <span className="relative text-[#F14635]">
        <LineIcon type={icon} />
        {badge && (
          <span className="absolute -right-2 -top-1 rounded-full bg-[#F14635] px-1 text-[7px] font-bold leading-[10px] text-white">
            {badge}
          </span>
        )}
      </span>
      <span className="text-[11px] font-normal leading-[13px] text-[#4B5563]">{label}</span>
    </button>
  );
}

function OfferRow({ left, title, subtitle, right, onClick }) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center bg-white px-3 py-2 text-left active:bg-zinc-50">
      <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-md">{left}</div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium leading-4 text-zinc-800">{title}</p>
        <p className="truncate text-[10px] leading-3 text-zinc-400">{subtitle}</p>
      </div>
      <div className="ml-2 flex items-center gap-2 text-[12px] text-zinc-500">
        {right}
        <span className="text-[24px] font-light leading-none text-zinc-300">›</span>
      </div>
    </button>
  );
}

function BottomTab({ icon, label, active }) {
  return (
    <button type="button" className="flex flex-1 flex-col items-center justify-center gap-0.5 active:opacity-75">
      <span className={active ? 'text-[#F14635]' : 'text-zinc-500'}>
        <LineIcon type={icon} className="h-[22px] w-[22px]" />
      </span>
      <span className={`text-[9px] leading-3 ${active ? 'text-[#F14635]' : 'text-zinc-500'}`}>{label}</span>
    </button>
  );
}

export default function HomeScreen({ setPage }) {
  const openServices = () => setPage('services');

  return (
    <div className="flex min-h-[100dvh] w-full justify-center bg-white text-zinc-900">
      <div className="relative flex min-h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden bg-[#F2F4F7]">
        <header className="sticky top-0 z-20 bg-white px-3 pb-2 pt-safe">
          <div className="flex h-[42px] items-center gap-2">
            <button
              type="button"
              className="flex h-[32px] min-w-0 flex-1 items-center gap-2 rounded-md bg-[#F1F1F1] px-2 text-left active:bg-zinc-200"
            >
              <SearchIcon className="h-[15px] w-[15px] text-zinc-400" />
              <span className="text-[12px] leading-none text-zinc-400">Поиск по Kaspi.kz</span>
            </button>
            <button
              type="button"
              className="flex h-[32px] w-[34px] items-center justify-center rounded-md text-[#F14635] active:bg-zinc-100"
              aria-label="Kaspi QR"
            >
              <QrIcon className="h-[23px] w-[23px]" />
            </button>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto pb-[70px] no-scrollbar">
          <section className="flex gap-2 overflow-x-auto bg-white px-2 pb-2 no-scrollbar">
            <div className="relative h-[82px] min-w-[126px] overflow-hidden rounded-md bg-[#7F2CCB] p-2 text-white">
              <p className="text-[10px] font-extrabold uppercase leading-3">Все в рассрочку</p>
              <p className="mt-0.5 text-[22px] font-extrabold leading-6">0·0·12</p>
              <div className="absolute bottom-2 right-1 h-12 w-16 rotate-[-20deg] rounded bg-[#F8C646]" />
              <div className="absolute bottom-2 right-9 h-10 w-4 rotate-[-20deg] rounded bg-zinc-900" />
              <p className="absolute bottom-1 left-2 text-[8px] text-white/80">16 января - 29 января</p>
            </div>
            <div className="relative h-[82px] min-w-[126px] overflow-hidden rounded-md bg-[#F5F1E8] p-2">
              <span className="rounded bg-white px-1 text-[8px] font-bold text-[#F14635]">Объявления</span>
              <p className="mt-1 max-w-[70px] text-[11px] font-bold leading-3 text-zinc-900">Сервис бесплатных объявлений</p>
              <div className="absolute bottom-1 right-1 h-16 w-14 rounded-xl bg-[#C99353]" />
              <p className="absolute bottom-1 left-2 text-[8px] text-zinc-400">Бесплатное размещение</p>
            </div>
            <div className="relative h-[82px] min-w-[126px] overflow-hidden rounded-md bg-[#4A88F4] p-2 text-white">
              <p className="text-[10px] font-extrabold leading-3">Акции Kaspi</p>
              <p className="mt-1 text-[18px] font-extrabold leading-5">до 50%</p>
              <div className="absolute bottom-3 right-4 h-12 w-12 rounded-full bg-[#FFD14D]" />
            </div>
          </section>

          <section className="bg-white px-2 pb-2 pt-3">
            <div className="grid grid-cols-4 gap-x-1 gap-y-2">
              <ServiceButton icon="qr" label="Kaspi QR" />
              <ServiceButton icon="bank" label="Мой Банк" />
              <ServiceButton icon="payments" label="Платежи" />
              <ServiceButton icon="transfer" label="Переводы" />
              <ServiceButton icon="shop" label="Магазин" />
              <ServiceButton icon="travel" label="Travel" />
              <ServiceButton icon="gov" label="Госуслуги" onClick={openServices} />
              <ServiceButton icon="messages" label="Объявления" badge="NEW" />
            </div>
          </section>

          <section className="mt-2 divide-y divide-zinc-100 bg-white">
            <OfferRow
              left={<div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D82335] text-[14px] font-extrabold italic text-white">m</div>}
              title="Magnum"
              subtitle="Продукты питания с бесплатной доставкой"
              right={null}
            />
            <OfferRow
              left={<div className="flex h-8 w-12 items-center justify-center rounded bg-[#F14635] text-[13px] font-extrabold text-white">0·0·12</div>}
              title="Рассрочка 0-0-12"
              subtitle="Без переплаты и первого взноса"
              right={<span className="h-8 w-8 rounded bg-[#FFD22E]" />}
            />
            <OfferRow
              left={<div className="flex h-9 w-9 items-center justify-center rounded bg-[#86D957] text-white"><LineIcon type="payments" className="h-6 w-6" /></div>}
              title="Кредит Наличными"
              subtitle="до 1 млн тенге"
              right={null}
            />
            <OfferRow
              left={<div className="flex h-9 w-9 items-center justify-center rounded bg-white text-[#F14635] ring-1 ring-[#F14635]/25"><LineIcon type="gov" className="h-6 w-6" /></div>}
              title="Регистрация ИП онлайн"
              subtitle="Откройте ИП в Kaspi"
              right={null}
              onClick={openServices}
            />
          </section>

          <button
            type="button"
            className="relative mt-2 block h-[76px] w-full overflow-hidden bg-white text-left active:opacity-80"
          >
            <div className="absolute inset-0 bg-[#F9F1E5]" />
            <div className="absolute left-2 top-2 text-[#D82335]">
              <p className="text-[19px] font-extrabold italic leading-5">magnum</p>
              <p className="mt-1 text-[10px] font-semibold text-zinc-700">Продукты с быстрой доставкой</p>
              <span className="mt-2 flex h-5 w-[88px] items-center justify-center rounded-sm bg-[#2F8DDE] text-[10px] font-semibold text-white">
                Купить
              </span>
            </div>
            <div className="absolute -right-1 bottom-0 h-[76px] w-[130px] bg-gradient-to-r from-[#77A847] via-[#E08D3E] to-[#B0482E]" />
          </button>
        </main>

        <nav className="absolute bottom-0 left-0 right-0 z-20 flex h-[54px] border-t border-zinc-200 bg-white pb-safe">
          <BottomTab icon="home" label="Главная" active />
          <BottomTab icon="qr" label="Kaspi QR" />
          <BottomTab icon="messages" label="Сообщения" />
          <button
            type="button"
            onClick={openServices}
            className="flex flex-1 flex-col items-center justify-center gap-0.5 text-zinc-500 active:opacity-75"
          >
            <LineIcon type="menu" className="h-[22px] w-[22px]" />
            <span className="text-[9px] leading-3">Сервисы</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
