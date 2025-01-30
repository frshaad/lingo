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

export const COURSES: (typeof schema.course.$inferInsert)[] = [
  { id: 1, title: 'Spanish', imageSrc: '/es.svg' },
  { id: 2, title: 'German', imageSrc: '/de.svg' },
  { id: 3, title: 'French', imageSrc: '/fr.svg' },
  { id: 4, title: 'Italian', imageSrc: '/it.svg' },
];

export const UNITS: (typeof schema.unit.$inferInsert)[] = [
  {
    id: 1,
    courseId: 1,
    title: 'Unit 1',
    description: 'Learn the basics of the Spanish',
    order: 1,
  },
];

export const LESSONS: (typeof schema.lesson.$inferInsert)[] = [
  { id: 1, unitId: 1, order: 1, title: 'Nouns' },
  { id: 2, unitId: 1, order: 2, title: 'Verbs' },
  { id: 3, unitId: 1, order: 3, title: 'Verbs' },
  { id: 4, unitId: 1, order: 4, title: 'Verbs' },
  { id: 5, unitId: 1, order: 5, title: 'Verbs' },
];

export const CHALLENGES: (typeof schema.challenge.$inferInsert)[] = [
  {
    id: 1,
    lessonId: 1,
    order: 1,
    type: 'SELECT',
    question: 'Which one of these is "the man"?',
  },
  {
    id: 2,
    lessonId: 1,
    order: 2,
    type: 'ASSIST',
    question: '"the man"',
  },
  {
    id: 3,
    lessonId: 1,
    order: 3,
    type: 'SELECT',
    question: 'Which one of these is "the robot"?',
  },
];

export const CHALLENGE_OPTIONS: (typeof schema.challengeOption.$inferInsert)[] =
  [
    {
      challengeId: 1,
      text: 'el hombre',
      imageSrc: '/man.svg',
      audioSrc: '/es_man.mp3',
      isCorrect: true,
    },
    {
      challengeId: 1,
      text: 'la mujer',
      imageSrc: '/woman.svg',
      audioSrc: '/es_woman.mp3',
      isCorrect: false,
    },
    {
      challengeId: 1,
      text: 'el robot',
      imageSrc: '/robot.svg',
      audioSrc: '/es_robot.mp3',
      isCorrect: false,
    },
    {
      challengeId: 2,
      text: 'el hombre',
      audioSrc: '/es_man.mp3',
      isCorrect: true,
    },
    {
      challengeId: 2,
      text: 'la mujer',
      audioSrc: '/es_woman.mp3',
      isCorrect: false,
    },
    {
      challengeId: 2,
      text: 'el robot',
      audioSrc: '/es_robot.mp3',
      isCorrect: false,
    },
    {
      challengeId: 3,
      text: 'el hombre',
      imageSrc: '/man.svg',
      audioSrc: '/es_man.mp3',
      isCorrect: false,
    },
    {
      challengeId: 3,
      text: 'la mujer',
      imageSrc: '/woman.svg',
      audioSrc: '/es_woman.mp3',
      isCorrect: false,
    },
    {
      challengeId: 3,
      text: 'el robot',
      imageSrc: '/robot.svg',
      audioSrc: '/es_robot.mp3',
      isCorrect: true,
    },
  ];
