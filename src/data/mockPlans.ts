export interface Resource {
  title: string;
  url: string;
}

export interface DayPlan {
  day: number;
  content: string;
  resources: Resource[];
  isMilestone: boolean;
}

export interface LearningPlan {
  id: string;
  userId?: string;
  goal: string;
  currentLevel: string;
  dailyHours: number;
  days: DayPlan[];
  createdAt: string;
  updatedAt: string;
}

export const generateMockPlan = (goal: string, currentLevel: string, dailyHours: number): LearningPlan => {
  const now = new Date().toISOString();
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    goal,
    currentLevel,
    dailyHours,
    days: Array.from({ length: 15 }, (_, i) => ({
      day: i + 1,
      content: `Learn the fundamentals of ${goal} - Part ${i + 1}`,
      resources: [
        {
          title: `${goal} Tutorial - Part ${i + 1}`,
          url: 'https://example.com/tutorial-1'
        },
        {
          title: `Practice Exercises - Day ${i + 1}`,
          url: 'https://example.com/exercises-1'
        }
      ],
      isMilestone: (i + 1) % 5 === 0
    })),
    createdAt: now,
    updatedAt: now
  };
};