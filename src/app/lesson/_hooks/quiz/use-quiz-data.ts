import { useCallback, useState } from 'react';

import type { InitialQuizState } from '../../_types/quiz';

export function useQuizData(initialQuizState: InitialQuizState) {
  const [quizData, setQuizData] = useState<InitialQuizState>(() => ({
    ...initialQuizState,
    percentage:
      initialQuizState.percentage === 100 ? 0 : initialQuizState.percentage,
    selectedOption: initialQuizState.status === 'completed' ? 0 : undefined,
  }));

  const updateQuizData = useCallback((updates: Partial<InitialQuizState>) => {
    setQuizData((previous) => ({ ...previous, ...updates }));
  }, []);

  return { quizData, updateQuizData };
}
