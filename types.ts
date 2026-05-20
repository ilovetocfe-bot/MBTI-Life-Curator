
export type MBTIType = 
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export interface ContentRecommendation {
  type: 'Movie' | 'Drama' | 'Book';
  title: string;
  reason: string;
}

export interface ItineraryItem {
  time: string;
  activity: string;
}

export interface DayPlan {
  day: number;
  items: ItineraryItem[];
}

export interface Song {
  title: string;
  artist: string;
}

export interface BalanceQuestion {
  id: number;
  option1: string;
  option2: string;
}

export interface MBTIAnalysis {
  intro: string;
  traits: string;
  contentRecs: ContentRecommendation[];
  travel: {
    destination: string;
    reason: string;
    plans: DayPlan[];
  };
  playlist: {
    genre: string;
    songs: Song[];
  };
  bingo: string[];
  balanceGame: {
    questions: BalanceQuestion[];
    resultAnalysis: string; // Analysis of what their choices mean for this MBTI
  };
}
