import './index.css';
import React, { useState } from 'react';
import { Bell, Home, Calendar, Search, User, Heart, Sparkles, Star, BookOpen } from 'lucide-react';

/**
 * Декоративные контурные фигуры для карточек, как на твоих макетах.
 */
const CardShapes = ({ type }) => {
  const strokeW = "0.8"; 

  if (type === 'lightning-with-circle') {
    return (
      <svg className="absolute right-[-10px] bottom-[-20px] opacity-100" width="180" height="220" viewBox="0 0 100 100" fill="none">
        <circle cx="85" cy="80" r="35" stroke="white" strokeWidth="1.2" />
        <path d="M45 0L15 60H45L35 100L95 35H60L80 0H45Z" stroke="black" strokeWidth={strokeW} />
      </svg>
    );
  }
  if (type === 'nazgul-design') {
    return (
      <svg className="absolute right-[-10px] bottom-[-10px] opacity-100" width="160" height="160" viewBox="0 0 100 100" fill="none">
        <circle cx="80" cy="80" r="40" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
        <path d="M75 15L81 40L105 45L83 60L90 85L70 72L50 85L57 60L35 45L59 40L65 15" stroke="white" strokeWidth={strokeW} transform="translate(10, 10) scale(1.2)" />
      </svg>
    );
  }
  if (type === 'aimun-star') {
    return (
      <svg className="absolute right-[-30px] bottom-[-30px] opacity-100" width="240" height="240" viewBox="0 0 100 100" fill="none">
        <path d="M50 5 C 55 45 95 50 95 50 C 55 55 50 95 50 95 C 45 55 5 50 5 50 C 45 45 50 5 50 5 Z" stroke="black" strokeWidth={strokeW} />
        <circle cx="65" cy="45" r="20" stroke="white" strokeWidth="1" />
      </svg>
    );
  }
  if (type === 'almaty-star') {
    return (
      <svg className="absolute right-[-10px] bottom-[-20px] opacity-100" width="180" height="180" viewBox="0 0 100 100" fill="none">
        <path d="M50 5L63 35L95 40L72 62L78 95L50 80L22 95L28 62L5 40L37 35L50 5Z" stroke="white" strokeWidth={strokeW} transform="translate(30, 20) rotate(15)" />
      </svg>
    );
  }
  if (type === 'abstract-rings') {
    return (
      <svg className="absolute right-[-20px] bottom-[-10px] opacity-100" width="150" height="150" viewBox="0 0 100 100" fill="none">
        <circle cx="70" cy="70" r="40" stroke="black" strokeWidth={strokeW} />
        <circle cx="85" cy="50" r="25" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      </svg>
    );
  }
  return null;
};

const Badge = ({ icon, text }) => (
  <div className="bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1 uppercase tracking-tighter">
    {icon}
    <span className="text-white">{text}</span>
  </div>
);

const EventCard = ({ title, subtitle, color, rating, time, date, shapeType, isHearted }) => (
  <div 
    className="min-w-[300px] h-[200px] p-6 rounded-[38px] relative overflow-hidden transition-transform active:scale-95 shadow-md border border-black/5"
    style={{ backgroundColor: color }}
  >
    <CardShapes type={shapeType} />
    
    <button className="absolute top-5 right-5 w-11 h-11 bg-black rounded-full flex items-center justify-center z-30">
      <Heart size={20} className="text-white" fill={isHearted ? "white" : "none"} />
    </button>

    <div className="relative z-10 h-full flex flex-col justify-between">
      <div className="pr-14">
        <h3 className="text-[30px] font-black text-black leading-[0.82] tracking-tighter uppercase mb-1">
          {title}
        </h3>
        <p className="text-black font-bold text-[14px] leading-tight opacity-90">
          {subtitle}
        </p>
      </div>

      <div className="flex gap-1.5">
        <Badge icon={<Star size={10} className="text-[#FFD644]" fill="currentColor"/>} text={rating} />
        <Badge text={time} />
        <Badge text={date} />
      </div>
    </div>
  </div>
);

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Главная');
  
  return (
    <div className="flex flex-col min-h-screen bg-white pb-40" style={{ fontFamily: "'Arimo', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Arimo:wght@400;700;900&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        * { font-family: 'Arimo', sans-serif; -webkit-tap-highlight-color: transparent; }
      `}</style>

      {/* Шапка (Приветствие) */}
      <header className="px-6 pt-14 pb-6 flex justify-between items-start">
        <h1 className="text-[50px] font-black tracking-tighter text-black leading-none">
          Привет, Паша!
        </h1>
        <div className="mt-3 relative">
          <Bell size={34} className="text-[#FF3B30]" />
          <div className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-white border-[3px] border-[#FF3B30] rounded-full"></div>
        </div>
      </header>

      {/* Кнопки Категорий */}
      <div className="px-6 mb-10 flex flex-col gap-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['Главная', 'Сегодня', 'Волонтерство'].map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2.5 rounded-full font-black text-[15px] border-[2.2px] transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-[#FF3B30] border-[#FF3B30] text-white shadow-sm' : 'bg-white border-black text-[#FF3B30]'}`}>{cat}</button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['Олимпиады', 'Форумы', 'Еще...'].map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className="px-6 py-2.5 rounded-full font-black text-[15px] border-[2.2px] border-black text-[#FF3B30] transition-all whitespace-nowrap">{cat}</button>
          ))}
        </div>
      </div>

      {/* Основной контент (Списки карточек) */}
      {[
        { title: 'Форумы', color: '#FF3B30', events: [
          { title: 'Kuanysh Forum', sub: 'STEM Направление', color: '#FF3B30', shape: 'lightning-with-circle', rating: '4.9', time: '10:00', date: '12 Июня' },
          { title: 'Nazgul Forum', sub: 'Social Skills', color: '#FFD644', shape: 'nazgul-design', rating: '4.7', time: '14:30', date: '18 Июня' }
        ]},
        { title: 'В топе', color: '#FF3B30', events: [
          { title: 'AIMUN 2026', sub: 'Model United Nations', color: '#FFD644', shape: 'aimun-star', rating: '5.0', time: '09:00', date: 'Сертификат' },
          { title: 'ICTJ olympiad', sub: 'Math & Logic', color: '#4A80FF', shape: 'lightning-with-circle', rating: '4.8', time: '11:00', date: '25 Мая' }
        ]},
        { title: 'Волонтерство', color: '#4A80FF', events: [
          { title: 'Almaty fest', sub: 'City Event', color: '#4A80FF', shape: 'almaty-star', rating: '4.6', time: '08:00', date: 'Сертификат' },
          { title: 'Be Together', sub: 'Charity Project', color: '#FF3B30', shape: 'abstract-rings', rating: '4.9', time: '16:00', date: 'Ежедневно' }
        ]}
      ].map((section, idx) => (
        <section key={idx} className="px-6 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter" style={{ color: section.color }}>{section.title}</h2>
            <div className="flex-grow h-[1px] bg-gray-300"></div>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {section.events.map((ev, i) => (
              <EventCard 
                key={i}
                title={ev.title} 
                subtitle={ev.sub} 
                color={ev.color} 
                rating={ev.rating} 
                time={ev.time} 
                date={ev.date} 
                shapeType={ev.shape} 
                isHearted={i === 0 && idx !== 1} 
              />
            ))}
          </div>
        </section>
      ))}

      {/* Нижняя навигация */}
      <nav className="fixed bottom-8 left-6 right-6 bg-white border border-gray-100 rounded-[40px] py-4 px-10 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-50">
        <Home size={28} className="text-[#FF3B30]" strokeWidth={2.5} />
        <Calendar size={28} className="text-black" />
        <Search size={28} className="text-black" />
        <BookOpen size={28} className="text-black" />
        <Sparkles size={28} className="text-black" />
        <div className="border-[2.5px] border-black rounded-xl p-0.5">
          <User size={24} className="text-black" />
        </div>
      </nav>
    </div>
  );
}
