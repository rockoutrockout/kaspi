import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import ServicesScreen from './components/ServicesScreen';
import IDCardScreen from './components/IDCardScreen';
import TabBar from './components/TabBar';

export default function App() {
  const [page, setPage] = useState('home');
  const showTabBar = page === 'home';

  return (
    <div className="flex min-h-[100dvh] min-h-screen flex-col bg-surface text-gray-900 antialiased">
      <main
        className={`min-h-0 flex-1 overflow-y-auto no-scrollbar ${
          showTabBar ? 'pb-0' : ''
        }`}
      >
        <div key={page} className="animate-screen-in min-h-full">
          {page === 'home' && <HomeScreen setPage={setPage} />}
          {page === 'services' && <ServicesScreen setPage={setPage} />}
          {page === 'id-card' && <IDCardScreen setPage={setPage} />}
        </div>
      </main>

      {showTabBar && <TabBar page={page} setPage={setPage} />}
    </div>
  );
}
