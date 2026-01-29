
export type DinosaurGroup = 
  | 'Theropods' 
  | 'Sauropods' 
  | 'Stegosaurs' 
  | 'Ankylosaurs' 
  | 'Ornithopods' 
  | 'Ceratopsians' 
  | 'Pachycephalosaurs'
  | 'Spinosaurs'
  | 'Marine Reptiles'
  | 'Pterosaurs'
  | 'Crocodylomorphs';

export interface Dinosaur {
  id: string;
  name: string;
  pronunciation: string;
  meaning: string;
  period: string;
  year: number; // Discovery year
  diet: 'Carnivore' | 'Herbivore' | 'Omnivore' | 'Piscivore' | 'Insectivore';
  group: DinosaurGroup;
  length_meters: number;
  weight_tons: number;
  description: string;
  habitat: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  fun_fact: string;
  image_url: string;
  anatomy: {
    feature: string;
    description: string;
  }[];
  stats: {
    intelligence: number; // 1-10
    speed: number; // 1-10
    defense: number; // 1-10
    attack: number; // 1-10
  };
  showOnMap?: boolean;
  hipAnatomy?: 'Saurischian' | 'Ornithischian' | 'Other';
  environment?: 'Land' | 'Water' | 'Sky';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index
  explanation: string;
}

export enum AppView {
  HOME = 'HOME',
  BROWSE = 'BROWSE',
  MAP = 'MAP',
  QUIZ = 'QUIZ',
  CHAT = 'CHAT',
  DETAIL = 'DETAIL',
  PROFILE = 'PROFILE' // Simplified placeholder
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}