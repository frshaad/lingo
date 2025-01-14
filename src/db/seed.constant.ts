import * as schema from '@/db/schema';

export const TABLES_TO_CLEAR = [
  schema.course,
  schema.lesson,
  schema.unit,
  schema.userProgress,
  schema.challenge,
  schema.challengeOption,
  schema.challengeProgress,
];

export const COURSES: schema.Course[] = [
  { id: 1, title: 'Spanish', imageSrc: '/es.svg' },
  { id: 2, title: 'German', imageSrc: '/de.svg' },
  { id: 3, title: 'French', imageSrc: '/fr.svg' },
  { id: 4, title: 'Italian', imageSrc: '/it.svg' },
];

export const UNITS: schema.Unit[] = [
  {
    id: 1,
    courseId: 1,
    title: 'Unit 1',
    description: 'Learn the basics of the spanish',
    order: 1,
  },
];

export const LESSONS: schema.Lesson[] = [
  { id: 1, unitId: 1, order: 1, title: 'Nouns' },
  { id: 2, unitId: 1, order: 2, title: 'Verbs' },
  { id: 3, unitId: 1, order: 3, title: 'Verbs' },
  { id: 4, unitId: 1, order: 4, title: 'Verbs' },
  { id: 5, unitId: 1, order: 5, title: 'Verbs' },
];

export const CHALLENGES: schema.Challenge[] = [
  {
    id: 1,
    lessonId: 1,
    order: 1,
    type: 'SELECT',
    question: 'Which one of these is "the man"?',
  },
];

export const CHALLENGE_OPTIONS: schema.ChallengeOption[] = [
  {
    id: 1,
    challengeId: 1,
    text: 'el hombre',
    imageSrc: '/man.svg',
    audioSrc: '/es_man.mp3',
    isCorrect: true,
  },
  {
    id: 2,
    challengeId: 1,
    text: 'la mujer',
    imageSrc: '/woman.svg',
    audioSrc: '/es_woman.mp3',
    isCorrect: false,
  },
  {
    id: 3,
    challengeId: 1,
    text: 'el robot',
    imageSrc: '/robot.svg',
    audioSrc: '/es_robot.mp3',
    isCorrect: false,
  },
];
