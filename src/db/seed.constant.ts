import * as schema from '@/db/schema';

export const TABLES_TO_CLEAR = [
  schema.course,
  schema.lesson,
  schema.unit,
  schema.userProgress,
  schema.challenge,
  schema.challengeOption,
  schema.challengeProgress,
  schema.userSubscription,
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
  { id: 2, unitId: 1, order: 2, title: 'Numbers' },
  { id: 3, unitId: 1, order: 3, title: 'Colors' },
  { id: 4, unitId: 1, order: 4, title: 'Family' },
  { id: 5, unitId: 1, order: 5, title: 'Greetings' },
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
  {
    id: 4,
    lessonId: 2,
    order: 1,
    type: 'SELECT',
    question: 'Which one means "three"?',
  },
  {
    id: 5,
    lessonId: 2,
    order: 2,
    type: 'SELECT',
    question: 'Select "seven"',
  },
  {
    id: 6,
    lessonId: 3,
    order: 1,
    type: 'SELECT',
    question: 'Which one means "red"?',
  },
  {
    id: 7,
    lessonId: 3,
    order: 2,
    type: 'SELECT',
    question: 'Select "blue"',
  },
  {
    id: 8,
    lessonId: 4,
    order: 1,
    type: 'SELECT',
    question: 'Which means "mother"?',
  },
  {
    id: 9,
    lessonId: 4,
    order: 2,
    type: 'SELECT',
    question: 'Select "brother"',
  },
  {
    id: 10,
    lessonId: 5,
    order: 1,
    type: 'SELECT',
    question: 'Which means "hello"?',
  },
  {
    id: 11,
    lessonId: 5,
    order: 2,
    type: 'SELECT',
    question: 'Select "goodbye"',
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
    {
      challengeId: 4,
      text: 'tres',
      isCorrect: true,
    },
    {
      challengeId: 4,
      text: 'dos',
      isCorrect: false,
    },
    {
      challengeId: 4,
      text: 'uno',
      isCorrect: false,
    },
    {
      challengeId: 5,
      text: 'siete',
      isCorrect: true,
    },
    {
      challengeId: 5,
      text: 'seis',
      isCorrect: false,
    },
    {
      challengeId: 5,
      text: 'ocho',
      isCorrect: false,
    },
    {
      challengeId: 6,
      text: 'rojo',
      isCorrect: true,
    },
    {
      challengeId: 6,
      text: 'verde',
      isCorrect: false,
    },
    {
      challengeId: 6,
      text: 'azul',
      isCorrect: false,
    },
    {
      challengeId: 7,
      text: 'azul',
      isCorrect: true,
    },
    {
      challengeId: 7,
      text: 'amarillo',
      isCorrect: false,
    },
    {
      challengeId: 7,
      text: 'negro',
      isCorrect: false,
    },
    {
      challengeId: 8,
      text: 'madre',
      isCorrect: true,
    },
    {
      challengeId: 8,
      text: 'padre',
      isCorrect: false,
    },
    {
      challengeId: 8,
      text: 'hermana',
      isCorrect: false,
    },
    {
      challengeId: 9,
      text: 'hermano',
      isCorrect: true,
    },
    {
      challengeId: 9,
      text: 'tío',
      isCorrect: false,
    },
    {
      challengeId: 9,
      text: 'primo',
      isCorrect: false,
    },
    {
      challengeId: 10,
      text: 'hola',
      isCorrect: true,
    },
    {
      challengeId: 10,
      text: 'gracias',
      isCorrect: false,
    },
    {
      challengeId: 10,
      text: 'por favor',
      isCorrect: false,
    },
    {
      challengeId: 11,
      text: 'adiós',
      isCorrect: true,
    },
    {
      challengeId: 11,
      text: 'buenos días',
      isCorrect: false,
    },
    {
      challengeId: 11,
      text: 'buenas noches',
      isCorrect: false,
    },
  ];
