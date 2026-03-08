import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Bell, Home, Calendar, Search, User, Heart, Sparkles, Star, BookOpen, ChevronRight, ArrowLeft, Play, CheckCircle2, Check } from 'lucide-react';

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

/**
 * Экран детального просмотра мероприятия
 */
const DetailScreen = ({ event, onBack, isHearted, onToggleHeart, onApply, isApplied }) => {
  return (
    <div className="fixed inset-0 z-[1000] bg-white overflow-y-auto animate-in fade-in slide-in-from-right duration-300">
      <div className="max-w-[500px] mx-auto min-h-screen pb-10 flex flex-col">
        {/* Шапка */}
        <header className="px-6 pt-10 pb-6 flex items-center gap-4">
          <button onClick={onBack} className="p-1 -ml-1 active:scale-90 transition-transform">
            <ArrowLeft size={32} strokeWidth={2.5} className="text-black" />
          </button>
          <h1 className="text-[32px] font-black tracking-tighter text-black uppercase leading-none">
            {event.title}
          </h1>
        </header>

        {/* Видео-плеер */}
        <div className="px-6 mb-6">
          <div className="relative aspect-video rounded-[40px] overflow-hidden bg-gray-100 shadow-xl group cursor-pointer">
            <img 
              src={event.image || "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop"} 
              alt="Preview" 
              className="w-full h-full object-cover grayscale-[10%]"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play size={30} className="text-black fill-black ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Описание */}
        <div className="px-6 flex-grow">
          <div className="bg-[#FFD644] rounded-[40px] p-8 shadow-sm">
            <p className="text-black font-bold text-[16px] leading-[1.6] whitespace-pre-wrap">
              {event.description}
            </p>
          </div>
        </div>

        {/* Нижняя плашка действий */}
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

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Главная');
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [heartedIds, setHeartedIds] = useState(['ev-6', 'ev-8']); 
  const [appliedEvents, setAppliedEvents] = useState([]); 
  const [viewingEvent, setViewingEvent] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);

  const dropdownRef = useRef(null);
  const moreButtonRef = useRef(null);

  const categories = ['Главная', 'Сегодня', 'Волонтерство', 'Олимпиады', 'Форумы'];
  const moreItems = ['Хакатоны', 'Стажировки', 'Курсы', 'Клубы', 'Конференции'];

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
      description: "Стань частью будущего цифрового Казахстана! На Buginde тебя ждут встречи с основателями глобальных единорогов и презентации прорывных технологий. Прокачай свои лидерские качества в мире IT и найди единомышленников для реализации самых смелых идей. Твой путь к успеху начинается здесь!",
      image: "https://images.unsplash.com/photo-1540575861501-7ad05823c23d?q=80&w=1000"
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
      description: "Добро пожаловать на главную площадку нетворкинга! Мы создаем условия для твоего роста: знакомься с инвесторами, изучай кейсы успешных стартапов и развивай потенциал лидера. Интерактивные сессии и экспо-зона помогут тебе увидеть, как технологии меняют регион прямо сейчас.",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000"
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
      description: "Готов бросить вызов системе? 48 часов кодинга, где ты и твоя команда создадите будущее на Web3. Разрабатывай dApps, решай сложные алгоритмические задачи и соревнуйся за призовой фонд. Прояви свои навыки инженера и стань легендой в блокчейн-сообществе!",
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
      description: "Учись создавать интерфейсы, которыми будут пользоваться миллионы! В рамках этого курса ты освоишь Figma, основы UX-исследований и прототипирование. Интерактивные задания от экспертов Google помогут тебе раскрыть творческий потенциал и получить сертификат мирового уровня.",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=1000"
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
      description: "Форум для будущих дипломатов и глобальных лидеров. Здесь ты научишься вести переговоры на английском, отстаивать свою позицию и решать мировые конфликты. Участие в модели ООН — это твой шанс развить критическое мышление и стать частью международного сообщества.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000"
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
      description: "Математика — это язык будущего. Прими участие в интеллектуальном вызове, где логика и нестандартное мышление ценятся превыше всего. Докажи свой уровень мастерства в STEM и получи уникальную возможность выиграть образовательный грант в топовый технический вуз.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000"
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
      description: "Место встречи идей и капитала. Участвуй в закрытых питч-сессиях, слушай советы опытных менторов и учись презентовать свои проекты. Это твоя площадка для старта в большой бизнес и реальная возможность найти поддержку для своего будущего единорога.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000"
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
      description: "Твой пропуск в мир BigTech! Стажировка STEP создана специально для талантливых студентов младших курсов. Работай над реальными проектами Google под руководством топовых инженеров, развивай навыки программирования и почувствуй, что значит менять мир кодом.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000"
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
      description: "Погрузись в анализ данных самого успешного финтех-проекта! Учись строить предиктивные модели, работать с SQL и Python на реальных данных миллионов пользователей. Прокачай свои аналитические способности и стань востребованным специалистом в индустрии данных.",
      image: "https://images.unsplash.com/photo-1551288049-bbdac8626ad1?q=80&w=1000"
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
      description: "Лидерство — это ответственность. Присоединяйся к экологическому движению Buginde и сделай свой город чище. За активное участие ты не только принесешь пользу природе, но и получишь бонусные баллы в системе, которые откроют доступ к эксклюзивным курсам.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000"
    },
    { 
      id: 'ev-11', 
      section: 'Курсы', 
      title: 'Stanford AI', 
      sub: 'Machine Learning Course', 
      color: '#FFD644', 
      shape: 'aimun-star', 
      rating: '4.9', 
      time: 'Заочно', 
      date: 'Октябрь 2026', 
      isToday: false,
      description: "Учись у лучших умов планеты. Глубокое погружение в мир нейронных сетей и ИИ на основе легендарной программы Stanford Online. Проходи видеоуроки, решай практические задачи и получи диплом, который подтвердит твой высокий потенциал в области технологий будущего.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000"
    }
  ];

  const handleApply = (id) => {
    if (appliedEvents.includes(id)) return;
    setAppliedEvents(prev => [...prev, id]);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const toggleHeart = (id) => {
    setHeartedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
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

        /* АНИМАЦИЯ СТРЕЛКИ ТОЛЬКО ПРИ НАВЕДЕНИИ НА КОНТЕЙНЕР */
        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(8px); }
        }

        .apply-button-container:hover .arrow-icon {
          animation: arrowBounce 0.8s infinite ease-in-out;
        }

        /* Эффект увеличения при наведении */
        .apply-button-container:hover {
          transform: scale(1.02);
        }
        .apply-button-container:active {
          transform: scale(0.98);
        }
      `}</style>

      {/* УВЕДОМЛЕНИЕ */}
      {toastVisible && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[10001] bg-black text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)] animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={24} className="text-[#FFD644]" />
          <span className="font-black uppercase tracking-tighter text-[16px]">Заявка успешно отправлена! 🚀</span>
        </div>
      )}

      {/* ЭКРАН ДЕТАЛЕЙ */}
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

      {/* ШАПКА И КОНТЕНТ */}
      <div className="w-full px-4 sm:px-8 md:px-12">
        <header className="pt-10 sm:pt-14 pb-8 flex justify-between items-start">
          <h1 className="text-[38px] sm:text-[50px] font-black tracking-tighter text-black leading-none">Привет, Паша!</h1>
          <button className="mt-3 relative hover:scale-110 transition-transform">
            <Bell size={34} className="text-[#FF3B30]" />
            <div className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-white border-[3px] border-[#FF3B30] rounded-full"></div>
          </button>
        </header>

        {/* КАТЕГОРИИ */}
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

          {/* ВЫПАДАЮЩЕЕ МЕНЮ */}
          {showDropdown && (
             <div 
               ref={dropdownRef}
               className="fixed z-[9999] w-52 bg-white border-2 border-black rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden dropdown-animate"
               style={{ top: `${dropdownPos.top}px`, left: `${dropdownPos.left}px` }}
             >
               <div className="p-2 space-y-1">
                 {moreItems.map((item) => (
                   <button 
                     key={item}
                     className={`w-full text-left px-5 py-3.5 text-[14px] font-bold rounded-2xl flex items-center justify-between transition-colors ${
                       activeCategory === item 
                       ? 'bg-[#FF3B30] text-white' 
                       : 'text-black hover:bg-gray-100'
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

        {/* СПИСОК МЕРОПРИЯТИЙ */}
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

      {/* Навигация */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center px-4 z-[99]">
        <nav className="w-full max-w-[500px] bg-white border border-gray-100 rounded-[40px] py-4 px-10 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
          <button onClick={() => setActiveCategory('Главная')}><Home size={26} className={activeCategory === 'Главная' ? "text-[#FF3B30]" : "text-black"} strokeWidth={2.5} /></button>
          <button><Calendar size={26} className="text-black" /></button>
          <button><Search size={26} className="text-black" /></button>
          <button><BookOpen size={26} className="text-black" /></button>
          <button><Sparkles size={26} className="text-black" /></button>
          <button className="border-[2.5px] border-black rounded-xl p-0.5"><User size={22} className="text-black" /></button>
        </nav>
      </div>
    </div>
  );
}
