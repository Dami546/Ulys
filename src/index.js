import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Это входная точка вашего React-приложения.
 * ReactDOM берет ваш основной компонент <App /> и вставляет его 
 * в HTML-элемент с id="root", который находится в public/index.html.
 */

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      {/* Весь ваш интерфейс и логика теперь подгружаются отсюда */}
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Не удалось найти корневой элемент. Проверьте наличие <div id='root'></div> в вашем index.html");
}
