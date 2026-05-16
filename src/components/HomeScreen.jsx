import React from 'react';

export default function HomeScreen({ setPage }) {
  return (
    // ГЛАВНЫЙ КОНТЕЙНЕР (Занимает весь экран смартфона)
    <div className="w-full h-screen bg-[#F2F4F7] overflow-hidden select-none relative flex justify-center items-center">
      
      {/* РАБОЧАЯ ОБЛАСТЬ (Контейнер жестко подстраивается под пропорции макета) */}
      <div className="relative w-full h-full max-w-[430px] max-h-[932px] bg-white">
        
        {/* КАРТИНКА-ПОДЛОЖКА */}
        <img 
          src="/kaspihome.png" 
          alt="Kaspi Home Screen" 
          className="w-full h-full object-cover pointer-events-none absolute top-0 left-0 z-10"
          style={{ imageRendering: 'high-quality' }}
        />

        {/* НЕВИДИМАЯ КНОПКА: "ГОСУСЛУГИ" (Мемлекеттік қызметтер)
            Передает ровно 'services', чтобы App.js переключил экран
        */}
        <button
          type="button"
          onClick={() => {
            console.log("Клик по Госуслугам сработал!");
            setPage('services'); // Было 'governmentServices', теперь строго 'services'
          }}
          // Координаты сидят четко на иконке госуслуг
          className="absolute left-[70%] top-[41%] w-[24%] h-[12%] bg-transparent active:bg-black/10 transition-colors rounded-2xl z-30 cursor-pointer focus:outline-none"
          title="Открыть Госуслуги"
        />

        {/* НЕВИДИМАЯ КНОПКА: ТАББАР "СЕРВИСЫ" (Правый нижний угол картинки) */}
        <button
          type="button"
          onClick={() => {
            console.log("Клик по нижним Сервисам сработал!");
            setPage('services');
          }}
          className="absolute right-0 bottom-0 w-[25%] h-[10%] bg-transparent active:bg-black/10 transition-colors z-30 cursor-pointer focus:outline-none"
          title="Перейти в Сервисы"
        />

      </div>
    </div>
  );
}