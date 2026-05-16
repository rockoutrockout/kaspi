import React from 'react';

export default function HomeScreen({ setPage }) {
  return (
    // ГЛАВНЫЙ КОНТЕЙНЕР (Растягивает интерфейс на весь экран смартфона)
    <div className="w-full h-screen bg-white overflow-hidden select-none relative flex justify-center items-center">
      
      {/* РАБОЧАЯ ОБЛАСТЬ (Задает фиксированные мобильные пропорции) */}
      <div className="relative w-full h-full max-w-[430px] max-h-[932px] bg-white">
        
        {/* КАРТИНКА-ПОДЛОЖКА (Твой чистый скриншот) */}
        <img 
          src="/kaspihome1.png" 
          alt="Kaspi Home Screen" 
          className="w-full h-full object-cover pointer-events-none absolute top-0 left-0 z-10"
          style={{ imageRendering: 'high-quality' }}
          onError={(e) => {
            console.error("Бро, проверь, что картинка лежит в папке public/ и называется kaspihome.png");
          }}
        />

        {/* НЕВИДИМАЯ КНОПКА ПОВЕРХ ИКОНКИ "ГОСУСЛУГИ"
            Координаты выставлены точно под 3-ю иконку во 2-м ряду на чистом скрине.
        */}
        <button
          type="button"
          onClick={() => {
            console.log("Клик по Госуслугам сработал!");
            setPage('services'); // Открывает страницу сервисов в App.js
          }}
          // left: ~56% (сдвиг в третью колонку), top: ~41.5% (высота второго ряда иконок)
          className="absolute left-[54%] top-[41.5%] w-[20%] h-[11%] bg-transparent active:bg-black/5 transition-colors rounded-xl z-30 cursor-pointer focus:outline-none"
          title="Открыть Госуслуги"
        />

        {/* НЕВИДИМАЯ КНОПКА ДЛЯ ТАББАРА "СЕРВИСЫ" (Правый нижний угол)
            Дополнительный клик по самой нижней правой вкладке "Сервисы" на картинке
        */}
        <button
          type="button"
          onClick={() => {
            console.log("Клик по нижнему таббару Сервисы сработал!");
            setPage('services');
          }}
          className="absolute right-0 bottom-0 w-[25%] h-[9%] bg-transparent active:bg-black/5 transition-colors z-30 cursor-pointer focus:outline-none"
          title="Перейти в Сервисы"
        />

      </div>
    </div>
  );
}