export const LESSON_CONSTANTS = {
  INDENTATION_PATTERN: {
    PATTERN: [0, 1, 2, 1, 0, -1, -2, -1],
    CYCLE_LENGTH: 8,
  },
  LESSON_SPACING: {
    LESSON: 40,
    VERTICAL: {
      NORMAL: 6,
      FIRST_UNCOMPLETED: 14,
    },
  },
  SIZES: {
    ICON: 16,
    PROGRESS: 24,
  },
} as const;
