import type * as schema from '@/db/schema';

export const GermanUnits: (typeof schema.unit.$inferInsert)[] = [
  {
    id: 2,
    courseId: 2,
    title: 'Unit 1',
    description: 'Learn the basics of German',
    order: 1,
  },
];

export const GermanLessons: (typeof schema.lesson.$inferInsert)[] = [
  { id: 6, unitId: 2, order: 1, title: 'Nouns' },
  { id: 7, unitId: 2, order: 2, title: 'Numbers' },
  { id: 8, unitId: 2, order: 3, title: 'Colors' },
  { id: 9, unitId: 2, order: 4, title: 'Family' },
  { id: 10, unitId: 2, order: 5, title: 'Greetings' },
];

export const GermanChallenges: (typeof schema.challenge.$inferInsert)[] = [
  {
    id: 12,
    lessonId: 6,
    order: 1,
    type: 'SELECT',
    question: 'Which one of these is "the man"?',
  },
  {
    id: 13,
    lessonId: 6,
    order: 2,
    type: 'SELECT',
    question: 'Which one of these is "the Woman"?',
  },
  {
    id: 14,
    lessonId: 6,
    order: 3,
    type: 'ASSIST',
    question: '"the robot"',
  },
  {
    id: 15,
    lessonId: 7,
    order: 1,
    type: 'SELECT',
    question: 'Which one means "three"?',
  },
  {
    id: 16,
    lessonId: 7,
    order: 2,
    type: 'ASSIST',
    question: '"seven"',
  },
  {
    id: 17,
    lessonId: 8,
    order: 1,
    type: 'SELECT',
    question: 'Which one means "red"?',
  },
  {
    id: 18,
    lessonId: 8,
    order: 2,
    type: 'ASSIST',
    question: '"blue"',
  },
  {
    id: 19,
    lessonId: 9,
    order: 1,
    type: 'SELECT',
    question: 'Which means "mother"?',
  },
  {
    id: 20,
    lessonId: 9,
    order: 2,
    type: 'ASSIST',
    question: '"brother"',
  },
  {
    id: 21,
    lessonId: 10,
    order: 1,
    type: 'SELECT',
    question: 'Which means "hello"?',
  },
  {
    id: 22,
    lessonId: 10,
    order: 2,
    type: 'ASSIST',
    question: '"goodbye"',
  },
];

export const GermanChallengeOptions: (typeof schema.challengeOption.$inferInsert)[] =
  [
    {
      challengeId: 12,
      text: 'der Mann',
      imageSrc: '/man.svg',
      audioSrc: '/de/de_man.mp3',
      isCorrect: true,
    },
    {
      challengeId: 12,
      text: 'die Frau',
      imageSrc: '/woman.svg',
      audioSrc: '/de/de_woman.mp3',
      isCorrect: false,
    },
    {
      challengeId: 12,
      text: 'der Roboter',
      imageSrc: '/robot.svg',
      audioSrc: '/de/de_robot.mp3',
      isCorrect: false,
    },
    {
      challengeId: 13,
      text: 'der Mann',
      audioSrc: '/de/de_man.mp3',
      isCorrect: false,
    },
    {
      challengeId: 13,
      text: 'die Frau',
      audioSrc: '/de/de_woman.mp3',
      isCorrect: true,
    },
    {
      challengeId: 13,
      text: 'der Roboter',
      audioSrc: '/de/de_robot.mp3',
      isCorrect: false,
    },
    {
      challengeId: 14,
      text: 'der Mann',
      audioSrc: '/de/de_man.mp3',
      isCorrect: false,
    },
    {
      challengeId: 14,
      text: 'die Frau',
      audioSrc: '/de/de_woman.mp3',
      isCorrect: false,
    },
    {
      challengeId: 14,
      text: 'der Roboter',
      audioSrc: '/de/de_robot.mp3',
      isCorrect: true,
    },
    {
      challengeId: 15,
      text: 'zwei',
      audioSrc: '/de/de_two.mp3',
      isCorrect: false,
    },
    {
      challengeId: 15,
      text: 'drei',
      audioSrc: '/de/de_three.mp3',
      isCorrect: true,
    },
    {
      challengeId: 15,
      text: 'eins',
      audioSrc: '/de/de_one.mp3',
      isCorrect: false,
    },
    {
      challengeId: 16,
      text: 'sechs',
      audioSrc: '/de/de_six.mp3',
      isCorrect: false,
    },
    {
      challengeId: 16,
      text: 'acht',
      audioSrc: '/de/de_eight.mp3',
      isCorrect: false,
    },
    {
      challengeId: 16,
      text: 'sieben',
      audioSrc: '/de/de_seven.mp3',
      isCorrect: true,
    },
    {
      challengeId: 17,
      text: 'rot',
      audioSrc: '/de/de_red.mp3',
      isCorrect: true,
    },
    {
      challengeId: 17,
      text: 'grün',
      audioSrc: '/de/de_green.mp3',
      isCorrect: false,
    },
    {
      challengeId: 17,
      text: 'blau',
      audioSrc: '/de/de_blue.mp3',
      isCorrect: false,
    },

    {
      challengeId: 18,
      text: 'gelb',
      audioSrc: '/de/de_yellow.mp3',
      isCorrect: false,
    },
    {
      challengeId: 18,
      text: 'blau',
      audioSrc: '/de/de_blue.mp3',
      isCorrect: true,
    },
    {
      challengeId: 18,
      text: 'schwarz',
      audioSrc: '/de/de_black.mp3',
      isCorrect: false,
    },

    {
      challengeId: 19,
      text: 'die Mutter',
      audioSrc: '/de/de_mother.mp3',
      isCorrect: true,
    },
    {
      challengeId: 19,
      text: 'der Vater',
      audioSrc: '/de/de_father.mp3',
      isCorrect: false,
    },
    {
      challengeId: 19,
      text: 'die Schwester',
      audioSrc: '/de/de_sister.mp3',
      isCorrect: false,
    },

    {
      challengeId: 20,
      text: 'der Bruder',
      audioSrc: '/de/de_brother.mp3',
      isCorrect: true,
    },
    {
      challengeId: 20,
      text: 'der Onkel',
      audioSrc: '/de/de_uncle.mp3',
      isCorrect: false,
    },
    {
      challengeId: 20,
      text: 'der Cousin',
      audioSrc: '/de/de_cousin.mp3',
      isCorrect: false,
    },

    {
      challengeId: 21,
      text: 'danke',
      audioSrc: '/de/de_thanks.mp3',
      isCorrect: false,
    },
    {
      challengeId: 21,
      text: 'bitte',
      audioSrc: '/de/de_please.mp3',
      isCorrect: false,
    },
    {
      challengeId: 21,
      text: 'Hallo',
      audioSrc: '/de/de_hello.mp3',
      isCorrect: true,
    },

    {
      challengeId: 22,
      text: 'Auf Wiedersehen',
      audioSrc: '/de/de_goodbye.mp3',
      isCorrect: true,
    },
    {
      challengeId: 22,
      text: 'Guten Morgen',
      audioSrc: '/de/de_good_morning.mp3',
      isCorrect: false,
    },
    {
      challengeId: 22,
      text: 'Gute Nacht',
      audioSrc: '/de/de_good_night.mp3',
      isCorrect: false,
    },
  ];
