import React from 'react';

function SearchIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.7" cy="10.7" r="6.4" stroke="currentColor" strokeWidth="2" />
      <path d="m15.7 15.7 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function KaspiIcon({ type, className = 'h-8 w-8' }) {
  const common = {
    stroke: 'currentColor',
    strokeWidth: 1.65,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  const icons = {
    qr: (
      <>
        <path d="M5 5h5v5H5V5Zm9 0h5v5h-5V5ZM5 14h5v5H5v-5Z" {...common} />
        <path d="M14 14h2v2h-2v-2Zm5 0v5h-5v-2.5M17.5 14H19" {...common} />
      </>
    ),
    bank: (
      <>
        <path d="M5 7.5h5.8v7H5v-7Zm8.2 2h5.8v7h-5.8v-7Z" {...common} />
        <path d="M8 14.5V18h8v-1.5M7.7 10h.1M15.9 12h.1" {...common} />
      </>
    ),
    payments: (
      <>
        <path d="M7 5.5h10v13H7v-13Z" {...common} />
        <path d="M9.5 9h5M9.5 12h5M10 15h4" {...common} />
        <path d="M8.5 5.5V4h7v1.5" {...common} />
      </>
    ),
    transfer: (
      <>
        <path d="M6 8h10.5M14 5.5 16.5 8 14 10.5M18 16H7.5M10 13.5 7.5 16l2.5 2.5" {...common} />
      </>
    ),
    shop: (
      <>
        <path d="M5.5 8.5h13l-1.2 8.3H7L5.5 8.5Z" {...common} />
        <path d="M8.5 8.5a3.5 3.5 0 0 1 7 0M8.2 19h.1M16.2 19h.1" {...common} />
      </>
    ),
    sales: (
      <>
        <path d="M6.5 9.5V7.2A2.2 2.2 0 0 1 8.7 5h6.6a2.2 2.2 0 0 1 2.2 2.2v2.3" {...common} />
        <path d="M5.5 9.5h13v8.8h-13V9.5Z" {...common} />
        <path d="M9 13.8h6M12 10v8" {...common} />
      </>
    ),
    travel: (
      <>
        <path d="M8 7h8a2 2 0 0 1 2 2v8.5H6V9a2 2 0 0 1 2-2Z" {...common} />
        <path d="M9.2 7V5h5.6v2M6 12h12M9 16h.1M15 16h.1" {...common} />
      </>
    ),
    gov: (
      <>
        <path d="M4.7 10.5h14.6L12 5.6l-7.3 4.9Z" {...common} />
        <path d="M7 11.5v5.5m5-5.5v5.5m5-5.5v5.5M5.5 18.5h13" {...common} />
      </>
    ),
    home: <path d="m5 11 7-6 7 6v8H7v-6h10" {...common} />,
    chat: (
      <>
        <path d="M5 6.5h14v9.5H9l-4 3V6.5Z" {...common} />
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

function PromoCard({ variant, title, subtitle, meta }) {
  const styles = {
    purple: 'bg-[#E7F4DD]',
    teal: 'bg-[#BFE7E9]',
    blue: 'bg-[#D6EAFE]',
  };

  return (
    <div className={`relative h-[98px] min-w-[154px] overflow-hidden rounded-md ${styles[variant]} p-3`}>
      {variant === 'purple' && (
        <>
          <p className="text-[11px] font-black uppercase leading-3 text-[#2672BD]">Все в рассрочку</p>
          <p className="mt-0.5 text-[25px] font-black leading-7 text-[#2672BD]">0·0·12</p>
          <div className="absolute bottom-3 right-8 h-12 w-8 rotate-[-18deg] rounded bg-[#25224A]" />
          <div className="absolute bottom-1 right-1 h-16 w-16 rounded-full bg-[#CDB7FF]" />
        </>
      )}
      {variant === 'teal' && (
        <>
          <p className="text-[12px] font-black leading-4 text-[#255B70]">{title}</p>
          <div className="mt-1 inline-flex rounded bg-[#F8D34B] px-1.5 py-0.5 text-[11px] font-black text-[#263238]">
            5% Бонусов
          </div>
          <div className="absolute bottom-0 right-0 h-[70px] w-[70px] rounded-full bg-[#1F373F]" />
          <div className="absolute bottom-2 right-7 h-14 w-9 rotate-12 rounded bg-[#A8B753]" />
        </>
      )}
      {variant === 'blue' && (
        <>
          <p className="max-w-[90px] text-[12px] font-black leading-4 text-white">{title}</p>
          <p className="mt-1 text-[20px] font-black leading-6 text-[#FFE66D]">{subtitle}</p>
          <div className="absolute bottom-2 right-3 h-14 w-14 rounded-full bg-[#FFD44D]" />
        </>
      )}
      <p className="absolute bottom-1.5 left-3 text-[9px] leading-3 text-zinc-500">{meta}</p>
    </div>
  );
}

function ServiceButton({ icon, label, onClick, badge, qrBadge }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-[82px] flex-col items-center justify-start gap-2 rounded-lg pt-1.5 text-center active:bg-zinc-100"
    >
      <span className="relative text-[#D9352A]">
        <KaspiIcon type={icon} className="h-[35px] w-[35px]" />
        {qrBadge && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#39B54A] ring-1 ring-white" />}
        {badge && (
          <span className="absolute -right-3 -top-1 rounded-full bg-[#D9352A] px-1 text-[7px] font-bold leading-[10px] text-white">
            {badge}
          </span>
        )}
      </span>
      <span className="text-[12.5px] font-normal leading-[14px] text-[#3F454B]">{label}</span>
    </button>
  );
}

function OfferRow({ left, title, subtitle, right, onClick }) {
  return (
    <button type="button" onClick={onClick} className="flex h-[56px] w-full items-center bg-white px-3.5 text-left active:bg-zinc-50">
      <div className="mr-3 flex h-9 w-11 shrink-0 items-center justify-center rounded-md">{left}</div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-medium leading-4 text-zinc-800">{title}</p>
        <p className="truncate text-[11px] leading-3 text-zinc-400">{subtitle}</p>
      </div>
      {right}
    </button>
  );
}

function ViewedItem({ color, title, price }) {
  return (
    <button type="button" className="min-w-[82px] text-left active:opacity-75">
      <div className={`relative h-[70px] w-[90px] overflow-hidden rounded-md ${color}`}>
        <span className="absolute left-1 top-1 rounded bg-[#F14635] px-1 text-[9px] font-black leading-4 text-white">0·0·12</span>
        <div className="absolute bottom-1 right-1 h-10 w-8 rounded bg-zinc-900/75" />
      </div>
      <p className="mt-1 truncate text-[10.5px] leading-3 text-zinc-700">{title}</p>
      <p className="truncate text-[10px] leading-3 text-zinc-400">{price}</p>
    </button>
  );
}

function BottomTab({ icon, label, active, onClick }) {
  return (
    <button type="button" onClick={onClick} className="flex flex-1 flex-col items-center justify-center gap-0.5 active:opacity-75">
      <span className={active ? 'text-[#F14635]' : 'text-[#7A7F86]'}>
        <KaspiIcon type={icon} className="h-[29px] w-[29px]" />
      </span>
      <span className={`text-[10.8px] leading-3 ${active ? 'text-[#F14635]' : 'text-[#62676D]'}`}>{label}</span>
    </button>
  );
}

export default function HomeScreen({ setPage }) {
  const openHome = () => setPage('home');
  const openServices = () => setPage('services');

  return (
    <div className="flex min-h-[100dvh] w-full justify-center bg-[#2F2F2F] text-zinc-900">
      <div className="relative flex min-h-[100dvh] w-full max-w-[414px] flex-col overflow-hidden bg-white text-[1.1rem]">
        <header className="sticky top-0 z-20 bg-[#EDF8EC] px-3 pb-2.5 pt-safe">
          <button
            type="button"
            className="flex h-[38px] w-full items-center gap-2 rounded-[4px] bg-white/80 px-2.5 text-left active:bg-white"
          >
            <SearchIcon className="h-[17px] w-[17px] text-[#8C9A91]" />
            <span className="text-[13px] leading-none text-[#7F8B83]">Поиск по Kaspi.kz</span>
          </button>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto bg-white pb-[78px] no-scrollbar">
          <section className="flex gap-2 overflow-x-auto bg-[#EDF8EC] px-3 pb-2.5 no-scrollbar">
            <PromoCard variant="purple" meta="27 марта - 9 апреля" />
            <PromoCard variant="teal" title="Автотовары" meta="27 марта - 9 апреля" />
            <PromoCard variant="blue" title="Kaspi Акции" subtitle="до 50%" meta="27 марта - 9 апреля" />
          </section>

          <section className="bg-white px-2.5 pb-3 pt-4">
            <div className="grid grid-cols-4 gap-x-1 gap-y-1.5">
              <ServiceButton icon="qr" label="Kaspi QR" qrBadge />
              <ServiceButton icon="bank" label="Мой Банк" />
              <ServiceButton icon="payments" label="Платежи" />
              <ServiceButton icon="transfer" label="Переводы" />
              <ServiceButton icon="shop" label="Магазин" />
              <ServiceButton icon="sales" label="Акции" />
              <ServiceButton icon="travel" label="Travel" />
              <ServiceButton icon="gov" label="Госуслуги" onClick={openServices} badge="NEW" />
            </div>
          </section>

          <section className="divide-y divide-zinc-100 border-y border-zinc-100 bg-white">
            <OfferRow
              left={<div className="flex h-8 w-11 items-center justify-center rounded bg-[#F14635] text-[13px] font-black text-white">0·0·12</div>}
              title="Рассрочка 0-0-12"
              subtitle="Без переплаты и первого взноса"
              right={<div className="ml-2 flex h-9 w-9 items-center justify-center rounded bg-[#F5D22F] text-white"><KaspiIcon type="payments" className="h-6 w-6" /></div>}
            />
            <OfferRow
              left={<div className="flex h-9 w-9 items-center justify-center rounded bg-[#CDB566] text-white"><KaspiIcon type="sales" className="h-6 w-6" /></div>}
              title="Kaspi Gold"
              subtitle="для ребенка"
              right={<div className="ml-2 flex h-9 w-11 items-center justify-center rounded bg-[#E34234] text-[9.5px] font-black text-white">KREDIT</div>}
            />
          </section>

          <section className="mt-2 bg-white px-3 pb-2 pt-1">
            <h2 className="text-[15px] font-bold leading-6 text-zinc-900">Вы недавно смотрели</h2>
            <div className="mt-1 flex gap-2 overflow-x-auto no-scrollbar">
              <ViewedItem color="bg-[#95D8D6]" title="Poco X5 Pro 8 г..." price="от 89 990 ₸" />
              <ViewedItem color="bg-[#E5F1F3]" title="OneTwo таблетк..." price="от 3 450 ₸" />
              <ViewedItem color="bg-[#E1E7EC]" title="Poco X4 GT 8 ГБ..." price="от 109 990 ₸" />
              <ViewedItem color="bg-[#F0E2CD]" title="Redmi Note 12..." price="от 74 990 ₸" />
            </div>
          </section>
        </main>

        <nav className="absolute bottom-0 left-0 right-0 z-20 flex h-[66px] border-t border-[#E6E8EA] bg-white pb-safe">
          <BottomTab icon="home" label="Главная" active onClick={openHome} />
          <BottomTab icon="qr" label="Kaspi QR" />
          <BottomTab icon="chat" label="Сообщения" />
          <BottomTab icon="menu" label="Сервисы" onClick={openServices} />
        </nav>
      </div>
    </div>
  );
}
