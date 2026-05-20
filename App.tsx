
import React, { useState } from 'react';
import { MBTIType, MBTIAnalysis } from './types';
import { getMBTIAnalysis } from './services/geminiService';
import MBTISelector from './components/MBTISelector';
import MBTIResult from './components/MBTIResult';

const App: React.FC = () => {
  const [selectedMBTI, setSelectedMBTI] = useState<MBTIType | null>(null);
  const [analysis, setAnalysis] = useState<MBTIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMBTISelect = async (mbti: MBTIType) => {
    setSelectedMBTI(mbti);
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const data = await getMBTIAnalysis(mbti);
      setAnalysis(data);
    } catch (err) {
      console.error(err);
      setError("심층 분석 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedMBTI(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <header className="bg-indigo-600 text-white py-12 px-4 shadow-lg mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
            MBTI Life Curator
          </h1>
          <p className="text-indigo-100 text-lg">
            세계 최고의 심리 분석가가 제안하는 당신만을 위한 라이프스타일 가이드
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4">
        {!selectedMBTI && !isLoading && (
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">
              당신의 MBTI 유형을 선택하세요
            </h2>
            <MBTISelector onSelect={handleMBTISelect} />
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-center">
              <p className="text-xl font-medium text-slate-700">당신의 내면을 정밀 분석 중입니다...</p>
              <p className="text-slate-500 mt-2">조금만 기다려주세요. 멋진 제안을 준비하고 있어요!</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl text-center mb-8">
            <p className="mb-4">{error}</p>
            <button 
              onClick={() => handleMBTISelect(selectedMBTI!)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              다시 시도하기
            </button>
          </div>
        )}

        {analysis && selectedMBTI && (
          <MBTIResult 
            analysis={analysis} 
            mbti={selectedMBTI} 
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 py-4 px-4 flex justify-center items-center z-40">
        <p className="text-slate-500 text-sm">© 2024 MBTI Life Curator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
