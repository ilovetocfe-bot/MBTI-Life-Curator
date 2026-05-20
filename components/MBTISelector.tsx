
import React from 'react';
import { MBTIType } from '../types';

interface MBTISelectorProps {
  onSelect: (mbti: MBTIType) => void;
}

const mbtis: MBTIType[] = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

const MBTISelector: React.FC<MBTISelectorProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {mbtis.map((mbti) => (
        <button
          key={mbti}
          onClick={() => onSelect(mbti)}
          className="group relative h-24 sm:h-32 flex flex-col items-center justify-center bg-slate-50 border-2 border-slate-100 rounded-2xl hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300 overflow-hidden shadow-sm"
        >
          <span className="text-xl sm:text-2xl font-black text-slate-700 group-hover:text-indigo-600 transition-colors">
            {mbti}
          </span>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </button>
      ))}
    </div>
  );
};

export default MBTISelector;
