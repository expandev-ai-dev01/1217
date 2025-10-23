/**
 * @interface QuizSession
 * @description Represents a quiz session entity
 *
 * @property {string} sessionId - Unique session identifier (UUID)
 * @property {string} userId - User identifier (UUID)
 * @property {Date} startTime - Session start timestamp
 * @property {number} totalQuestions - Total number of questions (always 10)
 * @property {number} currentQuestionIndex - Current question index (0-9)
 * @property {QuizQuestion[]} questions - Array of questions for this session
 * @property {QuizAnswer[]} answers - Array of user answers
 * @property {boolean} completed - Whether quiz is completed
 */
export interface QuizSession {
  sessionId: string;
  userId: string;
  startTime: Date;
  totalQuestions: number;
  currentQuestionIndex: number;
  questions: QuizQuestion[];
  answers: QuizAnswer[];
  completed: boolean;
}

/**
 * @interface QuizQuestion
 * @description Represents a quiz question
 *
 * @property {string} questionId - Unique question identifier (UUID)
 * @property {string} questionText - Question text (max 500 characters)
 * @property {QuizCategory} category - Question category
 * @property {QuizOption[]} options - Array of 4 answer options
 * @property {string} correctOptionId - ID of the correct option
 * @property {string} [explanation] - Optional explanation for the correct answer
 */
export interface QuizQuestion {
  questionId: string;
  questionText: string;
  category: QuizCategory;
  options: QuizOption[];
  correctOptionId: string;
  explanation?: string;
}

/**
 * @interface QuizOption
 * @description Represents an answer option
 *
 * @property {string} optionId - Unique option identifier
 * @property {string} text - Option text
 */
export interface QuizOption {
  optionId: string;
  text: string;
}

/**
 * @interface QuizAnswer
 * @description Represents a user's answer to a question
 *
 * @property {string} questionId - Question identifier
 * @property {string} selectedOptionId - Selected option identifier
 * @property {boolean} isCorrect - Whether answer is correct
 * @property {number} responseTime - Time taken to answer (seconds)
 * @property {number} pointsEarned - Points earned (10 or 0)
 */
export interface QuizAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  responseTime: number;
  pointsEarned: number;
}

/**
 * @interface QuizResult
 * @description Represents quiz completion results
 *
 * @property {string} sessionId - Session identifier
 * @property {number} totalScore - Total score (0-100)
 * @property {number} correctAnswers - Number of correct answers (0-10)
 * @property {number} completionTime - Total time in seconds
 * @property {string} performanceMessage - Performance feedback message
 * @property {Date} endTime - Completion timestamp
 */
export interface QuizResult {
  sessionId: string;
  totalScore: number;
  correctAnswers: number;
  completionTime: number;
  performanceMessage: string;
  endTime: Date;
}

/**
 * @interface QuestionSummary
 * @description Detailed summary of a question and answer
 *
 * @property {string} questionText - Question text
 * @property {string} selectedOption - User's selected option text
 * @property {string} correctOption - Correct option text
 * @property {boolean} isCorrect - Whether user answered correctly
 * @property {string} [explanation] - Optional explanation
 */
export interface QuestionSummary {
  questionText: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
  explanation?: string;
}

/**
 * @enum QuizCategory
 * @description Quiz question categories
 */
export enum QuizCategory {
  Personagens = 'Personagens',
  Jutsus = 'Jutsus',
  Vilas = 'Vilas',
  Historia = 'História',
  Curiosidades = 'Curiosidades',
}

/**
 * @interface StartQuizRequest
 * @description Request to start a new quiz session
 *
 * @property {string} userId - User identifier
 */
export interface StartQuizRequest {
  userId: string;
}

/**
 * @interface SubmitAnswerRequest
 * @description Request to submit an answer
 *
 * @property {string} sessionId - Session identifier
 * @property {string} questionId - Question identifier
 * @property {string} selectedOptionId - Selected option identifier
 * @property {number} responseTime - Time taken to answer (seconds)
 */
export interface SubmitAnswerRequest {
  sessionId: string;
  questionId: string;
  selectedOptionId: string;
  responseTime: number;
}
