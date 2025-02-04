import { useCallback, useState } from 'react';

import type { InitialQuizState } from '../../_types/quiz';

export function useQuizData(initialQuizState: InitialQuizState) {
  const [quizData, setQuizData] = useState<InitialQuizState>(
    () => initialQuizState
  );

  const updateQuizData = useCallback((updates: Partial<InitialQuizState>) => {
    setQuizData((previous) => ({ ...previous, ...updates }));
  }, []);

  return { quizData, updateQuizData };
}
