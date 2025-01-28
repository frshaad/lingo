import { useAudio } from 'react-use';

export function useAudioEffects() {
  const [finishAudio] = useAudio({ src: '/finish.mp3', autoPlay: true });
  const [correctAudio, , correctControls] = useAudio({ src: '/correct.wav' });
  const [incorrectAudio, , incorrectControls] = useAudio({
    src: '/incorrect.wav',
  });

  return {
    finishAudio,
    correctAudio,
    correctControls,
    incorrectAudio,
    incorrectControls,
  };
}
