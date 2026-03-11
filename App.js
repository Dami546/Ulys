import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Bell, Home, Calendar, Search, User, Heart, Sparkles, Star, BookOpen, ChevronRight, ArrowLeft, Play, CheckCircle2, Check, X, MessageCircle, Trophy, Clock, BellRing, ExternalLink } from 'lucide-react';

/**
 * Декоративные контурные фигуры для карточек.
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
  <div className="bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1 uppercase tracking-tighter shrink-0">
    {icon}
    <span className="text-white whitespace-nowrap">{text}</span>
  </div>
);

const EventCard = ({ id, title, subtitle, color, rating, time, date, shapeType, isHearted, onToggleHeart, onClick }) => (
  <div 
    onClick={() => onClick && onClick()}
    className="w-[280px] h-[190px] shrink-0 p-6 rounded-[38px] relative overflow-hidden transition-transform active:scale-95 shadow-md border border-black/5 cursor-pointer"
    style={{ backgroundColor: color }}
  >
    <CardShapes type={shapeType} />
    
    <button 
      onClick={(e) => {
        e.stopPropagation();
        onToggleHeart(id);
      }}
      className="absolute top-5 right-5 w-11 h-11 bg-black rounded-full flex items-center justify-center z-30 hover:scale-110 transition-transform cursor-pointer"
    >
      <Heart size={20} className="text-white" fill={isHearted ? "white" : "none"} />
    </button>

    <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
      <div className="pr-14">
        <h3 className="text-[24px] font-black text-black leading-[0.82] tracking-tighter uppercase mb-1">
          {title}
        </h3>
        <p className="text-black font-bold text-[13px] leading-tight opacity-90">
          {subtitle}
        </p>
      </div>

      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
        <Badge icon={<Star size={10} className="text-[#FFD644]" fill="currentColor"/>} text={rating} />
        <Badge text={time} />
        <Badge text={date} />
      </div>
    </div>
  </div>
);

const DetailScreen = ({ event, onBack, isHearted, onToggleHeart, onApply, isApplied }) => {
  return (
    <div className="fixed inset-0 z-[1000] bg-white overflow-y-auto animate-in fade-in slide-in-from-right duration-300">
      <div className="max-w-[500px] mx-auto min-h-screen pb-10 flex flex-col">
        <header className="px-6 pt-10 pb-6 flex items-center gap-4">
          <button onClick={onBack} className="p-1 -ml-1 active:scale-90 transition-transform">
            <ArrowLeft size={32} strokeWidth={2.5} className="text-black" />
          </button>
          <h1 className="text-[32px] font-black tracking-tighter text-black uppercase leading-none">
            {event.title}
          </h1>
        </header>

        <div className="px-6 mb-6">
          <div className="relative aspect-video rounded-[40px] overflow-hidden bg-gray-100 shadow-xl group cursor-pointer">
            <img 
              src={event.image} 
              alt="Preview" 
              className="w-full h-full object-cover grayscale-[10%]"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop"; }}
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play size={30} className="text-black fill-black ml-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 flex-grow">
          <div className="bg-[#FFD644] rounded-[40px] p-8 shadow-sm">
            <p className="text-black font-bold text-[16px] leading-[1.6] whitespace-pre-wrap">
              {event.description}
            </p>
          </div>
        </div>

        <div className="px-6 mt-8 flex gap-3 items-center">
          <div 
            onClick={!isApplied ? onApply : undefined}
            className={`flex-grow h-[85px] rounded-full flex items-center justify-between px-8 shadow-lg transition-all duration-500 ease-out border-2 cursor-pointer relative overflow-hidden apply-button-container ${
                isApplied 
                ? 'bg-black border-black opacity-100' 
                : 'bg-[#FFD644] border-black/5'
            }`}
          >
            <div className="flex items-center gap-3 relative z-10 pointer-events-none">
              <span className={`text-[19px] font-black uppercase tracking-tighter transition-colors duration-500 ${isApplied ? 'text-[#FFD644]' : 'text-black underline underline-offset-4 decoration-2'}`}>
                {isApplied ? 'Заявка отправлена' : 'Подать Заявку'}
              </span>
              {isApplied ? (
                  <Check size={24} className="text-[#FFD644] animate-in zoom-in duration-300" strokeWidth={4} />
              ) : (
                  <div className="arrow-icon">
                    <ChevronRight size={22} className="text-black" strokeWidth={3} />
                  </div>
              )}
            </div>
            
            <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleHeart(event.id);
                }}
                className={`w-[48px] h-[48px] rounded-full flex items-center justify-center border border-black/5 transition-transform active:scale-90 relative z-20 ${isApplied ? 'bg-[#FFD644]' : 'bg-black'}`}
              >
                 <Heart size={18} className={isApplied ? 'text-black' : 'text-white'} fill={isHearted ? (isApplied ? "black" : "white") : "none"} />
            </button>
          </div>

          {!isApplied && (
            <button 
              onClick={onApply}
              className="h-[85px] px-6 bg-black rounded-[40px] text-white font-black text-[15px] uppercase tracking-tighter hover:scale-105 active:scale-90 transition-all shadow-xl"
            >
              ЖМЯК!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const NotificationOverlay = ({ notifications, onBack, onOpenDetails }) => {
  const [activeTab, setActiveTab] = useState('Все');
  const tabs = ['Все', 'Заявки', 'Фидбэк', 'Достижения'];

  const filtered = activeTab === 'Все' 
    ? notifications 
    : notifications.filter(n => n.category === activeTab);

  const getIcon = (type) => {
    switch(type) {
      case '✅': return <CheckCircle2 className="text-green-500" size={24} />;
      case '❌': return <X className="text-red-500" size={24} strokeWidth={3} />;
      case '📩': return <MessageCircle className="text-blue-500" size={24} />;
      case '⏰': return <Clock className="text-orange-500" size={24} />;
      case '🏆': return <Trophy className="text-[#FFD644]" size={24} />;
      default: return <BellRing className="text-gray-400" size={24} />;
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-white overflow-y-auto animate-in fade-in slide-in-from-bottom-8 duration-300">
      <div className="max-w-[500px] mx-auto min-h-screen pb-20">
        <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
             <button onClick={onBack} className="p-1 -ml-1 active:scale-90 transition-transform">
                <ArrowLeft size={32} strokeWidth={2.5} className="text-black" />
              </button>
              <h1 className="text-[32px] font-black tracking-tighter text-black uppercase leading-none">Уведомления</h1>
          </div>
          <div className="w-10 h-10 bg-[#FFD644] rounded-full flex items-center justify-center font-black border-2 border-black">
            {notifications.length}
          </div>
        </header>

        <div className="px-6 mb-8 flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-black text-[14px] uppercase tracking-tighter transition-all border-2 ${
                activeTab === tab ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="px-6 space-y-4">
          {filtered.length > 0 ? filtered.map((notif, idx) => (
            <div key={idx} className="bg-gray-50 rounded-[32px] p-6 border border-black/5 hover:border-black/20 transition-all group">
              <div className="flex gap-4 items-start mb-3">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                  {getIcon(notif.icon)}
                </div>
                <div className="flex-grow">
                  <h4 className="font-black uppercase tracking-tighter text-[17px] leading-tight mb-1">{notif.title}</h4>
                  <p className="text-gray-600 font-bold text-[14px] leading-snug">{notif.text}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{notif.time}</span>
                {notif.hasAction && (
                    <button 
                        onClick={() => onOpenDetails(notif)}
                        className="bg-black text-white px-6 py-2 rounded-full font-black text-[12px] uppercase tracking-tighter active:scale-95 transition-transform group-hover:bg-[#FF3B30]"
                    >
                        Посмотреть
                    </button>
                )}
              </div>
            </div>
          )) : (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell size={40} className="text-gray-300" />
              </div>
              <p className="font-black text-gray-400 uppercase tracking-tighter">Здесь пока пусто</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NotificationModal = ({ notification, onClose }) => {
    if (!notification) return null;
    return (
        <div className="fixed inset-0 z-[3000] bg-black/40 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200">
            <div className="w-full max-w-[500px] bg-white rounded-t-[50px] p-10 animate-in slide-in-from-bottom-full duration-300 shadow-2xl">
                <div className="w-16 h-1.5 bg-gray-200 rounded-full mx-auto mb-8"></div>
                
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 border-2 border-black/5">
                        <span className="text-4xl">{notification.icon}</span>
                    </div>
                    
                    <h2 className="text-[28px] font-black uppercase tracking-tighter text-black mb-4 leading-tight">
                        {notification.title}
                    </h2>
                    
                    <div className="bg-[#FFD644]/20 border border-[#FFD644]/50 rounded-[32px] p-6 mb-8 w-full">
                        <p className="text-black font-bold text-[16px] leading-relaxed italic">
                            {notification.detailText || notification.text}
                        </p>
                    </div>

                    <button 
                        onClick={onClose}
                        className="w-full bg-black text-[#FFD644] py-6 rounded-full font-black text-[18px] uppercase tracking-tighter active:scale-95 transition-transform shadow-xl"
                    >
                        Понятно, круто!
                    </button>
                </div>
            </div>
        </div>
    );
};

// Добавляем вспомогательный компонент для экрана календаря
const CalendarScreen = ({ events, onEventClick, heartedIds, onToggleHeart }) => {
  const [selectedDate, setSelectedDate] = useState('Сегодня');
  
  // Массив дней для горизонтального календаря (на основе твоих данных)
  const days = [
    { day: 'Пн', date: '28' },
    { day: 'Вт', date: '29' },
    { day: 'Ср', date: '30' },
    { day: 'Чт', date: '01' },
    { day: 'Пт', date: '02' },
    { day: 'Сб', date: '03', isToday: true },
    { day: 'Вс', date: '04' },
  ];

  // Фильтрация событий по выбранной дате (сопоставляем с полем date в массиве)
  const filteredEvents = events.filter(ev => {
    if (selectedDate === 'Сегодня') return ev.isToday;
    return ev.date.includes(selectedDate); // Простой поиск по числу
  });

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Горизонтальный календарь */}
      <div className="flex justify-between items-center mb-10 px-2">
        {days.map((d, i) => (
          <div 
            key={i} 
            onClick={() => setSelectedDate(d.isToday ? 'Сегодня' : d.date)}
            className={`flex flex-col items-center gap-3 cursor-pointer transition-all ${selectedDate === d.date || (selectedDate === 'Сегодня' && d.isToday) ? '' : 'opacity-60'}`}
          >
            <span className="text-[18px] font-bold text-black">{d.day}</span>
            <div className={`w-12 h-16 rounded-[18px] flex items-center justify-center text-[18px] font-black transition-all ${selectedDate === d.date || (selectedDate === 'Сегодня' && d.isToday) ? 'bg-[#FF3B30] text-white shadow-lg scale-110' : 'text-black'}`}>
              {d.date}
            </div>
          </div>
        ))}
      </div>

      {/* Список карточек для выбранной даты */}
      <div className="space-y-6 flex flex-col items-center">
        {filteredEvents.length > 0 ? filteredEvents.map(ev => (
          <div key={ev.id} className="w-full flex justify-center">
            <EventCard 
              {...ev}
              subtitle={ev.sub}
              shapeType={ev.shape}
              isHearted={heartedIds.includes(ev.id)}
              onToggleHeart={onToggleHeart}
              onClick={() => onEventClick(ev)}
            />
          </div>
        )) : (
          <div className="py-20 text-center opacity-30">
            <Calendar size={48} className="mx-auto mb-2" />
            <p className="font-black uppercase tracking-tighter">Событий нет</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Главная');
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  
  const [heartedIds, setHeartedIds] = useState(['ev-6', 'ev-8']); 
  const [appliedEvents, setAppliedEvents] = useState([]); 
  const [viewingEvent, setViewingEvent] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeNotification, setActiveNotification] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [currentView, setCurrentView] = useState('home'); 

  const dropdownRef = useRef(null);
  const moreButtonRef = useRef(null);

  const categories = ['Главная', 'Сегодня', 'Волонтерство', 'Олимпиады', 'Форумы'];
  const moreItems = ['Хакатоны', 'Стажировки', 'Курсы', 'Клубы', 'Конференции'];

  const notificationsData = [
    {
      category: 'Заявки',
      icon: '✅',
      title: 'Заявка принята!',
      text: 'Поздравляем! Ваша кандидатура одобрена для участия в Digital Bridge 2026.',
      detailText: 'Вы успешно прошли отбор! Ваша почта подтверждена. Пожалуйста, скачайте входной QR-код в личном кабинете и возьмите с собой удостоверение личности. Ждем вас в Конгресс-центре Астаны!',
      time: '10 МИН НАЗАД',
      hasAction: true
    },
    {
      category: 'Достижения',
      icon: '🏆',
      title: 'Новый уровень!',
      text: 'Проект получил приз зрительских симпатий. Вам начислено 500 баллов.',
      detailText: 'Ваш проект "Smart City Solution" набрал 1,240 голосов! Это абсолютный рекорд сезона. На ваш счет зачислено 500 Ulys-коинов, которые можно обменять на мерч в магазине приложений.',
      time: '1 ЧАС НАЗАД',
      hasAction: true
    },
    {
      category: 'Фидбэк',
      icon: '📩',
      title: 'Отзыв ментора',
      text: 'Профессор Аскаров оставил подробный комментарий по вашему решению.',
      detailText: '«Павел, ваше решение рекомендовано к внедрению. Отличная работа с данными и архитектурой! Советую обратить внимание на масштабируемость БД во второй фазе. Свяжитесь со мной для обсуждения публикации.»',
      time: '3 ЧАСА НАЗАД',
      hasAction: true
    },
    {
      category: 'Заявки',
      icon: '❌',
      title: 'Статус обновлен',
      text: 'К сожалению, ваша заявка на Google STEP отклонена.',
      time: 'ВЧЕРА',
      hasAction: false
    },
    {
      category: 'Напоминания',
      icon: '⏰',
      title: 'Уже сегодня!',
      text: 'Не забудьте: Финал хакатона Decentralized начинается через 2 часа.',
      detailText: 'Сбор команд в 10:00. Убедитесь, что у вас установлен актуальный билд проекта и заряжены ноутбуки. Питчинг начнется ровно в 11:30 в главном зале.',
      time: 'СЕГОДНЯ, 08:00',
      hasAction: true
    },
    {
      category: 'Достижения',
      icon: '🏆',
      title: 'Финалист!',
      text: 'Пользователь прошёл финал олимпиады ISTJ. Вы в ТОП-10!',
      detailText: 'Фантастический результат! Вы заняли 4-е место из 5,000 участников по всему Казахстану. Вам открыт доступ к закрытому чату победителей и сертификат международного образца.',
      time: '2 ДНЯ НАЗАД',
      hasAction: true
    }
  ];

  const allEventsData = [
    { 
      id: 'ev-1', 
      section: 'Форумы', 
      title: 'Astana Forum', 
      sub: 'Digital Bridge 2026', 
      color: '#FF3B30', 
      shape: 'lightning-with-circle', 
      rating: '5.0', 
      time: '09:00', 
      date: '25 Октября', 
      isToday: false,
      description: "Digital Bridge — главное технологическое событие региона, где встречаются стартапы, инвесторы и лидеры IT-индустрии. На форуме проходят выступления мировых экспертов, презентации инновационных проектов и обсуждения будущего технологий. Участники могут узнать о развитии искусственного интеллекта, финтеха и цифровой экономики, а также познакомиться с людьми, которые создают новые технологические продукты. Это отличное место, чтобы вдохновиться идеями и найти единомышленников." ,
      image: "https://www.akorda.kz/public/assets/media/uploadMedia/1697090388_KZ1_5669.jpg_2.jpg"
    },
    { 
      id: 'ev-2', 
      section: 'Форумы', 
      title: 'Central Asia Tech', 
      sub: 'Networking & Expo', 
      color: '#FFD644', 
      shape: 'nazgul-design', 
      rating: '4.7', 
      time: '14:30', 
      date: '18 Июня', 
      isToday: false,
      description: "Добро пожаловать на главную площадку нетворкинга! Мы создаем условия для твоего роста: знакомься с инвесторами и изучай кейсы.",
      image: "https://dknews.kz/storage/news/2025-11/HoiUlSy7fp1QKh6tX1IQ3u3IRP1w6pXUr8AJUqFt.jpg"
    },
    { 
      id: 'ev-3', 
      section: 'Хакатоны', 
      title: 'Decentralized', 
      sub: 'Web3 & Blockchain', 
      color: '#4A80FF', 
      shape: 'abstract-rings', 
      rating: '4.9', 
      time: '10:00', 
      date: 'Сегодня', 
      isToday: true,
      description: "Готов бросить вызов системе? 48 часов кодинга, где ты и твоя команда создадите будущее на Web3.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000"
    },
    { 
      id: 'ev-4', 
      section: 'Курсы', 
      title: 'Google UX Design', 
      sub: 'Professional Certificate', 
      color: '#FF3B30', 
      shape: 'nazgul-design', 
      rating: '4.9', 
      time: 'Онлайн', 
      date: 'Сен 2026', 
      isToday: false,
      description: "Учись создавать интерфейсы, которыми будут пользоваться миллионы! Освоишь Figma и основы UX-исследований.",
      image: "https://lh3.googleusercontent.com/ajzo5c1pfilAu0NGaGIinoznycYiMNu1LDvUXz3PQ1D390vPRfaAgJNlY41S69-y6wdXlw1HS5dA9vpeOgptyvKsO3NmHR2wj5gHokY"
    },
    { 
      id: 'ev-5', 
      section: 'Конференции', 
      title: 'AIMUN 2026', 
      sub: 'United Nations Model', 
      color: '#FFD644', 
      shape: 'aimun-star', 
      rating: '5.0', 
      time: '09:00', 
      date: 'Декабрь 2026', 
      isToday: false,
      description: "Форум для будущих дипломатов и глобальных лидеров. Научись вести переговоры и решать мировые конфликты.",
      image: "https://www.montana-zug.ch/hs-fs/hubfs/IMZ-MUN2024_3G2A6708.jpg?width=2000&height=1333&name=IMZ-MUN2024_3G2A6708.jpg"
    },
    { 
      id: 'ev-6', 
      section: 'Олимпиады', 
      title: 'ISTJ olympiad', 
      sub: 'Math & Logic Challenge', 
      color: '#4A80FF', 
      shape: 'lightning-with-circle', 
      rating: '4.8', 
      time: '11:00', 
      date: '25 Мая', 
      isToday: false,
      description: "Математика — это язык будущего. Прими участие в интеллектуальном вызове и докажи свой уровень мастерства.",
      image: "https://png.pngtree.com/thumb_back/fw800/background/20251127/pngtree-a-hand-writing-complex-mathematical-equations-and-graphs-on-blackboard-image_20633177.webp"
    },
    { 
      id: 'ev-7', 
      section: 'Клубы', 
      title: 'Startup Almaty', 
      sub: 'Клуб Инвесторов', 
      color: '#4A80FF', 
      shape: 'almaty-star', 
      rating: '4.6', 
      time: '19:00', 
      date: 'Сегодня', 
      isToday: true,
      description: "Закрытые питч-сессии стартапов перед бизнес-ангелами. Узнай, как привлечь первые инвестиции.",
      image: "https://lh3.googleusercontent.com/proxy/uSIYfk-29Lv2b0f9x3W0BHXPwkLq33UFle38YLorYlXloqhPiDpPYglKxkiNVRDL-HRLVl0lWiN1bq7vl33YWfJ3h62hrjpSn1aq3w"
    },
    { 
      id: 'ev-8', 
      section: 'Стажировки', 
      title: 'Google STEP', 
      sub: 'Internship: Software Eng', 
      color: '#FFD644', 
      shape: 'abstract-rings', 
      rating: '5.0', 
      time: 'Full-time', 
      date: 'Лето 2026', 
      isToday: false,
      description: "Стажировка STEP создана специально для талантливых студентов младших курсов. Работай над реальными проектами Google.",
      image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220720121505/google2.jpg"
    },
    { 
      id: 'ev-9', 
      section: 'Стажировки', 
      title: 'Kaspi Lab', 
      sub: 'Data Science & Analytics', 
      color: '#4A80FF', 
      shape: 'lightning-with-circle', 
      rating: '4.8', 
      time: 'Part-time', 
      date: 'Июль 2026', 
      isToday: false,
      description: "Погрузись в анализ данных самого успешного финтех-проекта! Учись строить предиктивные модели.",
      image: "https://the-steppe.com/wp-content/uploads/2018/12/f6f07f957ddd5b76b33796b3d381134a.jpg"
    },
    { 
      id: 'ev-10', 
      section: 'Волонтерство', 
      title: 'ECO SCORE', 
      sub: 'Чистый город 2026', 
      color: '#FF3B30', 
      shape: 'abstract-rings', 
      rating: '4.9', 
      time: '08:00', 
      date: 'Сегодня', 
      isToday: true,
      description: "Лидерство — это ответственность. Присоединяйся к экологическому движению Buginde и сделай свой город чище.",
      image: "https://www.ecoscore.space/img/logo.png"
    }
  ];
  const toggleHeart = (id) => {
    setHeartedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const groupedFavorites = useMemo(() => {
    const favorites = allEventsData.filter(e => heartedIds.includes(e.id));
    const groups = {};
    favorites.forEach(event => {
      if (!groups[event.section]) groups[event.section] = [];
      groups[event.section].push(event);
    });
    return groups;
  }, [heartedIds]);

  const handleApply = (id) => {
    if (appliedEvents.includes(id)) return;
    setAppliedEvents(prev => [...prev, id]);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const sectionsToRender = useMemo(() => {
    if (activeCategory === 'Главная') {
      return [
        { title: 'Форумы', color: '#FF3B30', events: allEventsData.filter(e => e.section === 'Форумы') },
        { title: 'В топе', color: '#FF3B30', events: allEventsData.filter(e => 
            ['Олимпиады', 'Хакатоны', 'Стажировки', 'Курсы'].includes(e.section)
          ).sort((a, b) => b.rating - a.rating).slice(0, 5) 
        },
        { title: 'Волонтерство', color: '#4A80FF', events: allEventsData.filter(e => e.section === 'Волонтерство') }
      ];
    }
    if (activeCategory === 'Сегодня') {
      return [{ title: 'События на сегодня', color: '#FF3B30', events: allEventsData.filter(e => e.isToday) }];
    }
    const filtered = allEventsData.filter(e => e.section === activeCategory);
    return filtered.length > 0 ? [{ title: activeCategory, color: '#FF3B30', events: filtered }] : [];
  }, [activeCategory]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (!showDropdown && moreButtonRef.current) {
      const rect = moreButtonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX
      });
    }
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          moreButtonRef.current && !moreButtonRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white pb-32 max-w-[1440px] mx-auto overflow-x-hidden relative" style={{ fontFamily: "'Arimo', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Arimo:wght@400;700;900&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        * { font-family: 'Arimo', sans-serif; -webkit-tap-highlight-color: transparent; }
        
        .dropdown-animate { animation: fadeInScale 0.15s ease-out forwards; }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(8px); }
        }

        .apply-button-container:hover .arrow-icon {
          animation: arrowBounce 0.8s infinite ease-in-out;
        }

        .apply-button-container:hover { transform: scale(1.02); }
        .apply-button-container:active { transform: scale(0.98); }
      `}</style>

      {toastVisible && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[10001] bg-black text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={24} className="text-[#FFD644]" />
          <span className="font-black uppercase tracking-tighter text-[16px]">Заявка успешно отправлена! 🚀</span>
        </div>
      )}

      {showNotifications && (
        <NotificationOverlay 
          notifications={notificationsData} 
          onBack={() => setShowNotifications(false)} 
          onOpenDetails={(notif) => setActiveNotification(notif)}
        />
      )}

      {activeNotification && (
          <NotificationModal 
            notification={activeNotification} 
            onClose={() => setActiveNotification(null)} 
          />
      )}

      {viewingEvent && (
        <DetailScreen 
          event={viewingEvent} 
          onBack={() => setViewingEvent(null)}
          isHearted={heartedIds.includes(viewingEvent.id)}
          onToggleHeart={toggleHeart}
          isApplied={appliedEvents.includes(viewingEvent.id)}
          onApply={() => handleApply(viewingEvent.id)}
        />
      )}

      <div className="w-full px-4 sm:px-8 md:px-12">
        <header className="pt-10 sm:pt-14 pb-8 flex justify-between items-start">
          <h1 className="text-[38px] sm:text-[50px] font-black tracking-tighter text-black leading-none">
            {currentView === 'home' ? 'Привет, Паша!' : currentView === 'favorites' ? 'Избранное' : 'Календарь'}
          </h1>
          {currentView === 'home' && (
            <button 
              onClick={() => setShowNotifications(true)}
              className="mt-3 relative hover:scale-110 transition-transform p-2 active:scale-90"
            >
              <Bell size={34} className="text-[#FF3B30]" />
              <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-black border-[3px] border-white rounded-full flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-[#FFD644] rounded-full"></div>
              </div>
            </button>
          )}
        </header>

        {currentView === 'home' && (
           <div className="animate-in fade-in duration-500">
             <div className="mb-8 relative">
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 px-0.5 items-center">
                  {categories.map((cat) => (
                    <button 
                      key={cat} 
                      onClick={() => setActiveCategory(cat)} 
                      className={`px-5 py-2.5 rounded-full font-black text-[14px] sm:text-[15px] border-[2.2px] transition-all whitespace-nowrap active:scale-90 ${
                        activeCategory === cat 
                        ? 'bg-[#FF3B30] border-[#FF3B30] text-white shadow-lg' 
                        : 'bg-white border-black text-[#FF3B30]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                  <button 
                    ref={moreButtonRef}
                    onClick={toggleDropdown}
                    className={`px-5 py-2.5 rounded-full font-black text-[14px] sm:text-[15px] border-[2.2px] border-black transition-all whitespace-nowrap active:scale-90 flex items-center gap-1 ${
                      showDropdown ? 'bg-black text-white' : 'bg-white text-black'
                    }`}
                  >
                    Еще...
                  </button>
                </div>

                {showDropdown && (
                  <div 
                    ref={dropdownRef}
                    className="fixed z-[9999] w-52 bg-white border-2 border-black rounded-[28px] shadow-2xl overflow-hidden dropdown-animate"
                    style={{ top: `${dropdownPos.top}px`, left: `${dropdownPos.left}px` }}
                  >
                    <div className="p-2 space-y-1">
                      {moreItems.map((item) => (
                        <button 
                          key={item}
                          className={`w-full text-left px-5 py-3.5 text-[14px] font-bold rounded-2xl flex items-center justify-between transition-colors ${
                            activeCategory === item ? 'bg-[#FF3B30] text-white' : 'text-black hover:bg-gray-100'
                          }`}
                          onClick={() => {
                            setActiveCategory(item);
                            setShowDropdown(false);
                          }}
                        >
                          {item}
                          <ChevronRight size={14} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative z-10">
                {sectionsToRender.map((section, idx) => (
                  <section key={idx} className="mb-10 sm:mb-12">
                    <div className="flex items-center gap-4 mb-5">
                      <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter shrink-0" style={{ color: section.color }}>
                        {section.title}
                      </h2>
                      <div className="flex-grow h-[1px] bg-gray-200"></div>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 px-1">
                      {section.events.map((ev) => (
                        <EventCard 
                          key={ev.id} 
                          id={ev.id}
                          title={ev.title}
                          subtitle={ev.sub} 
                          color={ev.color}
                          rating={ev.rating}
                          time={ev.time}
                          date={ev.date}
                          shapeType={ev.shape} 
                          isHearted={heartedIds.includes(ev.id)} 
                          onToggleHeart={toggleHeart}
                          onClick={() => setViewingEvent(ev)}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
           </div>
        )}

        {currentView === 'favorites' && (
           <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {Object.keys(groupedFavorites).length > 0 ? 
               Object.entries(groupedFavorites).map(([catName, events]) => (
                 <section key={catName} className="mb-12">
                   <div className="flex items-center gap-4 mb-6">
                     <h2 className="text-2xl font-black uppercase tracking-tighter text-[#FF3B30]">
                       {catName}
                     </h2>
                     <div className="flex-grow h-[1.5px] bg-gray-200"></div>
                   </div>
                   <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 px-1">
                     {events.map((ev) => (
                       <EventCard
                         key={ev.id}
                         {...ev}
                         subtitle={ev.sub}
                         shapeType={ev.shape}
                         isHearted={true}
                         onToggleHeart={toggleHeart}
                         onClick={() => setViewingEvent(ev)}
                       />
                     ))}
                   </div>
                 </section>
               )) : (
               <div className="flex flex-col items-center justify-center py-32 opacity-20">
                 <Heart size={80} strokeWidth={1} />
                 <p className="font-black uppercase tracking-tighter mt-4">Пусто</p>
               </div>
             )}
           </div>
        )}

        {currentView === 'calendar' && (
          <CalendarScreen 
            events={allEventsData}
            onEventClick={setViewingEvent}
            heartedIds={heartedIds}
            onToggleHeart={toggleHeart}
          />
        )}
      </div>

      <div className="fixed bottom-6 left-0 right-0 flex justify-center px-4 z-[99]">
        <nav className="w-full max-w-[500px] bg-white border border-gray-100 rounded-[40px] py-4 px-10 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
          <button onClick={() => { setCurrentView('home'); setViewingEvent(null); }}>
            <Home size={26} className={currentView === 'home' ? "text-[#FF3B30]" : "text-black"} strokeWidth={2.5} />
          </button>
          
          <button onClick={() => { setCurrentView('calendar'); setViewingEvent(null); }}>
            <Calendar size={26} className={currentView === 'calendar' ? "text-[#FF3B30]" : "text-black"} strokeWidth={2.5} />
          </button>

          <button><Search size={26} className="text-black" /></button>
          
          <button onClick={() => { setCurrentView('favorites'); setViewingEvent(null); }}>
            <BookOpen size={26} className={currentView === 'favorites' ? "text-[#FF3B30]" : "text-black"} strokeWidth={2.5} />
          </button>
          
          <button><Sparkles size={26} className="text-black" /></button>
          <button className="border-[2.5px] border-black rounded-xl p-0.5"><User size={22} className="text-black" /></button>
        </nav>
      </div>
    </div>
  );
}
