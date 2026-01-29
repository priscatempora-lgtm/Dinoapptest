
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import DinosaurCard from './components/DinosaurCard';
import FossilMap from './components/FossilMap';
import QuizModule from './components/QuizModule';
import ChatAssistant from './components/ChatAssistant';
import { AppView, Dinosaur } from './types';
import { DINOSAURS } from './constants';
import { ArrowLeft, Brain, Calendar, Globe, Ruler, Clock, Cloud, Bone, Utensils, Box } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [selectedDino, setSelectedDino] = useState<Dinosaur | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Filter States for Browse View
  const [filterEra, setFilterEra] = useState<string>('All');
  const [filterHip, setFilterHip] = useState<string>('All');
  const [filterDiet, setFilterDiet] = useState<string>('All');
  const [filterEnv, setFilterEnv] = useState<string>('All');

  // Clock Effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDinoSelect = (dino: Dinosaur) => {
    setSelectedDino(dino);
    setCurrentView(AppView.DETAIL);
  };

  // Helper to get Daily Featured Dinosaur based on date
  const getDailyFeature = () => {
    const today = new Date();
    // Create a seed based on day, month, and year to ensure it only changes at midnight
    const seed = today.getDate() + (today.getMonth() * 31) + (today.getFullYear() * 366);
    const index = seed % DINOSAURS.length;
    return DINOSAURS[index];
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME: {
        const featuredDino = getDailyFeature();
        
        return (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-24">
            
            {/* Top Slab: Time & Era */}
            <div className="bg-dino-dark text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border-b-4 border-dino-orange">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-full">
                    <Clock size={32} className="text-dino-amber" />
                  </div>
                  <div>
                    <h2 className="text-xs uppercase tracking-widest text-dino-amber font-bold">Current Era</h2>
                    <p className="text-2xl font-heading">Cenozoic Era</p>
                  </div>
               </div>
               <div className="text-center md:text-right">
                  <p className="text-3xl font-mono font-bold tracking-tight">
                    {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <p className="text-sm text-white/60">
                    {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
               </div>
            </div>

            {/* Daily Feature */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                 <span className="bg-dino-green text-white px-2 py-1 rounded text-xs font-bold uppercase">Daily Feature</span>
                 <h2 className="text-xl font-bold text-dino-dark">Dinosaur of the Day</h2>
              </div>
              <DinosaurCard dino={featuredDino} onClick={handleDinoSelect} featured />
            </section>

            {/* 4 Colorful Tabs */}
            <section className="grid grid-cols-2 gap-4">
                <button className="h-32 rounded-3xl bg-blue-500/80 backdrop-blur-md shadow-lg flex flex-col items-center justify-center text-white hover:scale-[1.02] transition-transform">
                    <span className="text-4xl font-heading mb-2">A-Z</span>
                    <span className="text-sm font-bold opacity-90">Dictionary</span>
                </button>
                <button className="h-32 rounded-3xl bg-purple-500/80 backdrop-blur-md shadow-lg flex flex-col items-center justify-center text-white hover:scale-[1.02] transition-transform">
                    <Box size={40} className="mb-2" />
                    <span className="text-sm font-bold opacity-90">3D View</span>
                </button>
                <button className="h-32 rounded-3xl bg-dino-orange/80 backdrop-blur-md shadow-lg flex flex-col items-center justify-center text-white hover:scale-[1.02] transition-transform">
                    <Brain size={40} className="mb-2" />
                    <span className="text-sm font-bold opacity-90">Your Dino</span>
                </button>
                <button className="h-32 rounded-3xl bg-red-500/80 backdrop-blur-md shadow-lg flex flex-col items-center justify-center text-white hover:scale-[1.02] transition-transform">
                    <Ruler size={40} className="mb-2" />
                    <span className="text-sm font-bold opacity-90">Comparison</span>
                </button>
            </section>
          </div>
        );
      }

      case AppView.BROWSE: {
        const filteredDinos = DINOSAURS.filter(dino => {
            const eraMatch = filterEra === 'All' || dino.period.includes(filterEra);
            // Simple mapping for hip anatomy filter logic if data is missing, though we added it to types
            const hipMatch = filterHip === 'All' || dino.hipAnatomy === filterHip; 
            const dietMatch = filterDiet === 'All' || dino.diet === filterDiet;
            const envMatch = filterEnv === 'All' || dino.environment === filterEnv;
            return eraMatch && hipMatch && dietMatch && envMatch;
        });

        return (
          <div className="max-w-7xl mx-auto pb-24 animate-in fade-in">
            <h1 className="text-3xl font-heading text-dino-dark mb-6">Dinosaur Database</h1>
            
            {/* Filters Section */}
            <div className="mb-8 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><Calendar size={10}/> Era</label>
                    <select 
                        className="w-full p-2 bg-gray-50 rounded-lg text-sm border-none focus:ring-2 focus:ring-dino-green"
                        value={filterEra}
                        onChange={(e) => setFilterEra(e.target.value)}
                    >
                        <option value="All">All Eras</option>
                        <option value="Triassic">Triassic</option>
                        <option value="Jurassic">Jurassic</option>
                        <option value="Cretaceous">Cretaceous</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><Bone size={10}/> Hip Anatomy</label>
                    <select 
                        className="w-full p-2 bg-gray-50 rounded-lg text-sm border-none focus:ring-2 focus:ring-dino-green"
                        value={filterHip}
                        onChange={(e) => setFilterHip(e.target.value)}
                    >
                        <option value="All">All Hips</option>
                        <option value="Saurischian">Saurischian (Lizard)</option>
                        <option value="Ornithischian">Ornithischian (Bird)</option>
                        <option value="Other">Other (Reptiles)</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><Utensils size={10}/> Diet</label>
                    <select 
                        className="w-full p-2 bg-gray-50 rounded-lg text-sm border-none focus:ring-2 focus:ring-dino-green"
                        value={filterDiet}
                        onChange={(e) => setFilterDiet(e.target.value)}
                    >
                        <option value="All">All Diets</option>
                        <option value="Carnivore">Carnivore</option>
                        <option value="Herbivore">Herbivore</option>
                        <option value="Omnivore">Omnivore</option>
                        <option value="Piscivore">Piscivore (Fish)</option>
                        <option value="Insectivore">Insectivore</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><Cloud size={10}/> Environment</label>
                    <select 
                        className="w-full p-2 bg-gray-50 rounded-lg text-sm border-none focus:ring-2 focus:ring-dino-green"
                        value={filterEnv}
                        onChange={(e) => setFilterEnv(e.target.value)}
                    >
                        <option value="All">All Environments</option>
                        <option value="Land">Land</option>
                        <option value="Water">Water</option>
                        <option value="Sky">Sky</option>
                    </select>
                </div>
            </div>

            {/* Grid - Adjusted to be smaller (more columns) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredDinos.map(dino => (
                <div key={dino.id} className="transform hover:scale-[1.02] transition-transform">
                    <DinosaurCard dino={dino} onClick={handleDinoSelect} />
                </div>
              ))}
            </div>
            
            {filteredDinos.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    <p>No dinosaurs found matching these criteria.</p>
                    <button 
                        onClick={() => {setFilterEra('All'); setFilterHip('All'); setFilterDiet('All'); setFilterEnv('All');}}
                        className="mt-2 text-dino-orange hover:underline font-bold"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
          </div>
        );
      }

      case AppView.MAP: {
        return (
          <div className="h-full w-full flex flex-col items-center justify-center pb-20 md:pb-0 animate-in fade-in">
             <FossilMap onSelectDino={handleDinoSelect} />
          </div>
        );
      }

      case AppView.QUIZ: {
        return (
          <div className="h-[calc(100vh-6rem)] pb-20 md:pb-0">
             <QuizModule />
          </div>
        );
      }

      case AppView.CHAT: {
        return (
           <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-4rem)] pb-20 md:pb-0 md:p-6 max-w-4xl mx-auto">
              <ChatAssistant />
           </div>
        );
      }

      case AppView.DETAIL: {
        if (!selectedDino) return null;
        const dino = selectedDino;
        const chartData = [
          { subject: 'Intel', A: dino.stats.intelligence, fullMark: 10 },
          { subject: 'Speed', A: dino.stats.speed, fullMark: 10 },
          { subject: 'Attack', A: dino.stats.attack, fullMark: 10 },
          { subject: 'Defense', A: dino.stats.defense, fullMark: 10 },
        ];

        return (
          <div className="max-w-5xl mx-auto pb-24 animate-in slide-in-from-bottom-8 duration-500">
            <button 
              onClick={() => setCurrentView(AppView.BROWSE)}
              className="mb-4 flex items-center gap-2 text-gray-500 hover:text-dino-green font-bold transition-colors"
            >
              <ArrowLeft size={20} /> Back to Browse
            </button>

            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden">
              <div className="relative h-64 md:h-96">
                <img src={dino.image_url} alt={dino.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                   <div>
                      <h1 className="text-4xl md:text-6xl font-heading text-white mb-2">{dino.name}</h1>
                      <p className="text-white/80 text-xl font-mono">{dino.pronunciation}</p>
                   </div>
                </div>
              </div>

              <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Stats & Quick Facts */}
                <div className="lg:col-span-2 space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold text-dino-dark mb-4 border-b border-gray-100 pb-2">Overview</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {dino.description}
                    </p>
                    <div className="mt-6 p-4 bg-dino-amber/10 rounded-xl border border-dino-amber/30 text-dino-dark flex gap-3">
                       <span className="text-2xl">💡</span>
                       <p className="font-medium italic">{dino.fun_fact}</p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-dino-dark mb-4 border-b border-gray-100 pb-2">Anatomy Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {dino.anatomy.map((item, idx) => (
                         <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                            <h4 className="font-bold text-dino-green mb-1">{item.feature}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                         </div>
                       ))}
                    </div>
                  </section>

                   <section>
                    <h2 className="text-2xl font-bold text-dino-dark mb-4 border-b border-gray-100 pb-2">Species Stats</h2>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis angle={30} domain={[0, 10]} />
                          <Radar name={dino.name} dataKey="A" stroke="#2D5A27" fill="#2D5A27" fillOpacity={0.6} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </section>
                </div>

                {/* Right Column: Metadata */}
                <div className="space-y-6">
                   <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm text-dino-orange"><Calendar size={20} /></div>
                        <div>
                           <div className="text-xs text-gray-500 uppercase font-bold">Time Period</div>
                           <div className="font-bold text-dino-dark">{dino.period}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm text-dino-green"><Globe size={20} /></div>
                        <div>
                           <div className="text-xs text-gray-500 uppercase font-bold">Location</div>
                           <div className="font-bold text-dino-dark">{dino.location.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm text-blue-500"><Ruler size={20} /></div>
                        <div>
                           <div className="text-xs text-gray-500 uppercase font-bold">Size</div>
                           <div className="font-bold text-dino-dark">{dino.length_meters}m / {dino.weight_tons}t</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm text-purple-500"><Bone size={20} /></div>
                        <div>
                           <div className="text-xs text-gray-500 uppercase font-bold">Hip Anatomy</div>
                           <div className="font-bold text-dino-dark">{dino.hipAnatomy || 'N/A'}</div>
                        </div>
                      </div>
                   </div>

                   <button 
                     onClick={() => setCurrentView(AppView.CHAT)}
                     className="w-full py-4 bg-dino-orange text-white rounded-xl font-heading text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                   >
                     <Brain /> Ask DinoBuddy
                   </button>
                </div>
              </div>
            </div>
          </div>
        );
      }

      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-dino-offwhite flex font-body">
      {/* Navigation */}
      <Navigation currentView={currentView} setView={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-24 p-4 md:p-8 overflow-y-auto h-screen relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
