
import { GoogleGenAI, Type } from "@google/genai";
import { MBTIType, MBTIAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMBTIAnalysis = async (mbti: MBTIType): Promise<MBTIAnalysis> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As the world's best MBTI Psychologist and Lifestyle Curator, provide a highly detailed analysis for the MBTI type: ${mbti}. 
    Focus on "over-immersion" and empathy. Address the user directly in Korean.
    The response must be in JSON format matching the schema provided.
    For the travel plan, create a 3-day itinerary.
    For the balance game, provide 5 extreme "this vs that" questions tailored to things this MBTI type would find difficult to choose between.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          intro: { type: Type.STRING },
          traits: { type: Type.STRING },
          contentRecs: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                title: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["type", "title", "reason"]
            }
          },
          travel: {
            type: Type.OBJECT,
            properties: {
              destination: { type: Type.STRING },
              reason: { type: Type.STRING },
              plans: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.NUMBER },
                    items: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          time: { type: Type.STRING },
                          activity: { type: Type.STRING }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          playlist: {
            type: Type.OBJECT,
            properties: {
              genre: { type: Type.STRING },
              songs: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    artist: { type: Type.STRING }
                  }
                }
              }
            }
          },
          bingo: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            minItems: 9,
            maxItems: 9
          },
          balanceGame: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.NUMBER },
                    option1: { type: Type.STRING },
                    option2: { type: Type.STRING }
                  }
                }
              },
              resultAnalysis: { type: Type.STRING, description: "A general analysis describing the struggle of these choices for this MBTI" }
            }
          }
        },
        required: ["intro", "traits", "contentRecs", "travel", "playlist", "bingo", "balanceGame"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as MBTIAnalysis;
};
