import React from 'react';
import { Home, Search, Map, GraduationCap, User, MessageCircle } from 'lucide-react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: AppView.HOME, icon: Home, label: 'Home' },
    { id: AppView.BROWSE, icon: Search, label: 'Browse' },
    { id: AppView.MAP, icon: Map, label: 'Map' },
    { id: AppView.QUIZ, icon: GraduationCap, label: 'Quiz' },
    // { id: AppView.PROFILE, icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Desktop/Tablet Sidebar (Hidden on mobile) */}
      <nav className="hidden md:flex flex-col w-24 bg-dino-green text-white h-full fixed left-0 top-0 z-50 items-center py-6 shadow-xl">
        <div className="mb-8 p-2 bg-dino-orange rounded-xl shadow-lg cursor-pointer" onClick={() => setView(AppView.HOME)}>
           <img src="https://picsum.photos/seed/logo/50/50" alt="Logo" className="w-10 h-10 rounded-lg mix-blend-multiply opacity-80" />
        </div>
        <div className="flex flex-col gap-8 w-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center p-2 w-full transition-all duration-200 ${
                currentView === item.id 
                  ? 'text-dino-amber border-r-4 border-dino-amber bg-white/10' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={28} />
              <span className="text-xs mt-1 font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
        
        <button 
           onClick={() => setView(AppView.CHAT)}
           className={`mt-auto mb-4 p-3 rounded-full transition-all shadow-lg ${
             currentView === AppView.CHAT ? 'bg-dino-amber text-dino-dark' : 'bg-dino-orange text-white hover:scale-110'
           }`}
        >
            <MessageCircle size={28} />
        </button>
      </nav>

      {/* Mobile Bottom Bar (Hidden on desktop) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 flex justify-around items-center pb-safe pt-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center justify-center p-2 w-full transition-colors ${
              currentView === item.id ? 'text-dino-green' : 'text-gray-400'
            }`}
          >
            <item.icon size={24} strokeWidth={currentView === item.id ? 2.5 : 2} />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        ))}
         <button
            onClick={() => setView(AppView.CHAT)}
            className={`flex flex-col items-center justify-center p-2 w-full transition-colors ${
              currentView === AppView.CHAT ? 'text-dino-orange' : 'text-gray-400'
            }`}
          >
            <MessageCircle size={24} strokeWidth={currentView === AppView.CHAT ? 2.5 : 2} />
            <span className="text-[10px] mt-1 font-medium">Ask AI</span>
          </button>
      </nav>
    </>
  );
};

export default Navigation;
