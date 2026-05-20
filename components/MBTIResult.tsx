
import React, { useState } from 'react';
import { MBTIType, MBTIAnalysis, DayPlan } from '../types';

interface MBTIResultProps {
  analysis: MBTIAnalysis;
  mbti: MBTIType;
  onReset: () => void;
}

const MBTIResult: React.FC<MBTIResultProps> = ({ analysis, mbti, onReset }) => {
  // Bingo State
  const [checkedBingo, setCheckedBingo] = useState<boolean[]>(new Array(9).fill(false));
  const toggleBingo = (idx: number) => {
    const next = [...checkedBingo];
    next[idx] = !next[idx];
    setCheckedBingo(next);
  };

  // Travel Tabs State
  const [activeDay, setActiveDay] = useState(1);

  // Balance Game State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showGameResult, setShowGameResult] = useState(false);

  const handleBalanceChoice = (choice: number) => {
    const nextAnswers = [...answers, choice];
    setAnswers(nextAnswers);
    if (currentQuestionIdx < analysis.balanceGame.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setShowGameResult(true);
    }
  };

  const restartBalanceGame = () => {
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setShowGameResult(false);
  };

  const bingoCount = checkedBingo.filter(b => b).length;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Intro Header */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
          <div className="flex justify-between items-start mb-4">
            <span className="px-4 py-1 bg-white/20 rounded-full text-sm font-bold backdrop-blur-sm">
              심층 분석 결과
            </span>
            <button 
              onClick={onReset}
              className="text-white/80 hover:text-white transition-colors text-sm underline underline-offset-4"
            >
              다시 검사하기
            </button>
          </div>
          <h1 className="text-5xl font-black mb-4">{mbti}</h1>
          <p className="text-2xl font-bold text-indigo-100">{analysis.intro}</p>
        </div>
        <div className="p-8">
          <h3 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
            <span className="w-2 h-8 bg-indigo-500 mr-3 rounded-full"></span>
            당신은 어떤 사람인가요?
          </h3>
          <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
            {analysis.traits}
          </p>
        </div>
      </div>

      {/* Grid Layout for Content & Music */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
            🎬 맞춤형 콘텐츠 추천
          </h3>
          <div className="space-y-6">
            {analysis.contentRecs.map((item, idx) => (
              <div key={idx} className="border-l-4 border-indigo-200 pl-4 py-1">
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">{item.type}</span>
                <h4 className="text-lg font-bold text-slate-800 mt-1">{item.title}</h4>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border-t-8 border-purple-500">
          <h3 className="text-2xl font-bold mb-4 text-slate-800 flex items-center">
            🎵 추천 플레이리스트
          </h3>
          <p className="text-purple-600 font-bold mb-6 italic">"{analysis.playlist.genre}" 장르가 어울리는 날</p>
          <div className="space-y-4">
            {analysis.playlist.songs.map((song, idx) => (
              <div key={idx} className="flex items-center group p-3 hover:bg-purple-50 rounded-xl transition-colors border border-transparent hover:border-purple-100">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mr-4 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{song.title}</h4>
                  <p className="text-sm text-slate-500">{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Travel Section - Multi-day */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="bg-indigo-50 p-8 border-b border-indigo-100">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">✈️ 추천 여행지: {analysis.travel.destination}</h3>
          <p className="text-slate-600">{analysis.travel.reason}</p>
        </div>
        <div className="p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center">
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-bold mr-3">J's Itinerary</span>
              <h4 className="text-xl font-bold text-slate-800">갓벽한 추천 일정표</h4>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {analysis.travel.plans.map((p) => (
                <button
                  key={p.day}
                  onClick={() => setActiveDay(p.day)}
                  className={`px-6 py-2 rounded-lg font-bold transition-all ${
                    activeDay === p.day 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Day {p.day}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative border-l-2 border-indigo-100 ml-4 space-y-8 animate-in fade-in slide-in-from-left-2 duration-300" key={activeDay}>
            {analysis.travel.plans.find(p => p.day === activeDay)?.items.map((item, idx) => (
              <div key={idx} className="relative pl-8">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-indigo-500"></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                  <span className="text-indigo-600 font-bold whitespace-nowrap">{item.time}</span>
                  <span className="text-slate-700 font-medium">{item.activity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fun Elements (Bingo & Balance) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Interactive Bingo Card */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">🧩 {mbti} 빙고판</h3>
            <span className="text-xs font-bold px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full">
              {bingoCount} / 9
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 aspect-square">
            {analysis.bingo.map((item, idx) => (
              <button
                key={idx} 
                onClick={() => toggleBingo(idx)}
                className={`relative group rounded-xl p-3 flex items-center justify-center text-center text-xs sm:text-sm font-medium transition-all duration-300 border-2 ${
                  checkedBingo[idx] 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg scale-[0.98]' 
                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-indigo-300 hover:bg-white'
                }`}
              >
                <span className="relative z-10">{item}</span>
                {checkedBingo[idx] && (
                  <div className="absolute top-1 right-1">
                    <svg className="w-4 h-4 text-indigo-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
          <p className="text-center text-slate-400 text-xs mt-6 italic">체크할수록 당신은 찐 {mbti}!</p>
        </div>

        {/* Enhanced 5-step Balance Game */}
        <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col h-full min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="text-2xl">⚖️</span> 밸런스 게임
            </h3>
            {!showGameResult && (
              <span className="text-sm font-medium text-slate-400">
                {currentQuestionIdx + 1} / {analysis.balanceGame.questions.length}
              </span>
            )}
          </div>

          {!showGameResult ? (
            <div className="flex-1 flex flex-col justify-between">
              <div className="mb-4 bg-slate-100 h-1.5 w-full rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-500" 
                  style={{ width: `${((currentQuestionIdx + 1) / analysis.balanceGame.questions.length) * 100}%` }}
                ></div>
              </div>

              <div className="flex-1 flex flex-col justify-center items-center py-6 text-center animate-in fade-in slide-in-from-right-4 duration-300" key={currentQuestionIdx}>
                <h4 className="text-lg font-bold text-slate-700 mb-8 leading-snug">
                   {analysis.balanceGame.questions[currentQuestionIdx].option1} 
                   <span className="block text-slate-300 font-black my-4 text-2xl italic">VS</span> 
                   {analysis.balanceGame.questions[currentQuestionIdx].option2}
                </h4>
                
                <div className="w-full space-y-3">
                  <button 
                    onClick={() => handleBalanceChoice(1)}
                    className="w-full p-4 bg-white border-2 border-indigo-500 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    A 선택
                  </button>
                  <button 
                    onClick={() => handleBalanceChoice(2)}
                    className="w-full p-4 bg-white border-2 border-purple-500 text-purple-600 font-bold rounded-2xl hover:bg-purple-600 hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    B 선택
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6">🏆</div>
              <h4 className="text-2xl font-black text-slate-800 mb-4">밸런스 게임 완료!</h4>
              <div className="bg-slate-50 p-6 rounded-2xl mb-6 border border-slate-100">
                <p className="text-slate-600 leading-relaxed italic">
                  "{analysis.balanceGame.resultAnalysis}"
                </p>
              </div>
              <button 
                onClick={restartBalanceGame}
                className="text-indigo-600 font-bold hover:underline"
              >
                다시 하기
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button 
          onClick={onReset}
          className="bg-slate-800 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-xl hover:shadow-2xl flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          다른 MBTI 분석해보기
        </button>
      </div>
    </div>
  );
};

export default MBTIResult;
