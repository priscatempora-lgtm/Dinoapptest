import React from 'react';
import { Dinosaur } from '../types';
import { ChevronRight, Ruler, Scale, Drumstick } from 'lucide-react';

interface DinosaurCardProps {
  dino: Dinosaur;
  onClick: (dino: Dinosaur) => void;
  featured?: boolean;
}

const DinosaurCard: React.FC<DinosaurCardProps> = ({ dino, onClick, featured = false }) => {
  if (featured) {
    return (
      <div 
        onClick={() => onClick(dino)}
        className="group relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl cursor-pointer transform transition-all hover:scale-[1.02] duration-300"
      >
        <img 
          src={dino.image_url} 
          alt={dino.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8">
          <span className="inline-block px-3 py-1 bg-dino-orange text-white text-xs font-bold uppercase tracking-wider rounded-full w-fit mb-2">
            Featured Dinosaur
          </span>
          <h2 className="text-3xl md:text-5xl font-heading text-white mb-1">{dino.name}</h2>
          <p className="text-white/90 text-sm md:text-lg mb-4 italic">{dino.meaning}</p>
          <div className="flex items-center text-white/80 text-sm gap-4">
             <span className="flex items-center gap-1"><Ruler size={16}/> {dino.length_meters}m</span>
             <span className="flex items-center gap-1"><Scale size={16}/> {dino.weight_tons}t</span>
             <span className="flex items-center gap-1 capitalize"><Drumstick size={16}/> {dino.diet}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onClick(dino)}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 group flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={dino.image_url} 
          alt={dino.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-dino-green">
          {dino.period}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-xl font-heading text-dino-dark mb-1 group-hover:text-dino-orange transition-colors">{dino.name}</h3>
        <p className="text-xs text-gray-500 mb-3">{dino.meaning}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">{dino.description}</p>
        
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
           <span className={`text-xs font-bold px-2 py-1 rounded ${
             dino.diet === 'Carnivore' ? 'bg-red-100 text-red-700' : 
             dino.diet === 'Herbivore' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
           }`}>
             {dino.diet}
           </span>
           <ChevronRight size={20} className="text-gray-300 group-hover:text-dino-orange transform group-hover:translate-x-1 transition-all"/>
        </div>
      </div>
    </div>
  );
};

export default DinosaurCard;
