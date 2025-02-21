import { useAudio } from 'react-use';

export function useAudioEffects() {
  const [finishAudio, , finishAudioControls] = useAudio({ src: '/finish.mp3' });
  const [correctAudio, , correctAudioControls] = useAudio({
    src: '/correct.wav',
  });
  const [incorrectAudio, , incorrectAudioControls] = useAudio({
    src: '/incorrect.wav',
  });

  return {
    finishAudio,
    finishAudioControls,
    correctAudio,
    correctAudioControls,
    incorrectAudio,
    incorrectAudioControls,
  };
}
