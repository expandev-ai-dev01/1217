import { v4 as uuidv4 } from 'uuid';
import {
  QuizSession,
  QuizQuestion,
  QuizAnswer,
  QuizResult,
  QuestionSummary,
  QuizCategory,
  StartQuizRequest,
  SubmitAnswerRequest,
} from './quizTypes';

/**
 * In-memory storage for quiz sessions
 */
const sessions = new Map<string, QuizSession>();

/**
 * Mock question bank
 */
const questionBank: QuizQuestion[] = [
  {
    questionId: uuidv4(),
    questionText: 'Qual é o nome do jutsu característico de Naruto?',
    category: QuizCategory.Jutsus,
    options: [
      { optionId: 'opt1', text: 'Rasengan' },
      { optionId: 'opt2', text: 'Chidori' },
      { optionId: 'opt3', text: 'Sharingan' },
      { optionId: 'opt4', text: 'Byakugan' },
    ],
    correctOptionId: 'opt1',
    explanation: 'Rasengan é o jutsu característico de Naruto, criado pelo Quarto Hokage.',
  },
  {
    questionId: uuidv4(),
    questionText: 'Quem foi o professor de Naruto?',
    category: QuizCategory.Personagens,
    options: [
      { optionId: 'opt1', text: 'Jiraiya' },
      { optionId: 'opt2', text: 'Kakashi' },
      { optionId: 'opt3', text: 'Iruka' },
      { optionId: 'opt4', text: 'Tsunade' },
    ],
    correctOptionId: 'opt2',
    explanation: 'Kakashi Hatake foi o sensei do Time 7, que incluía Naruto, Sasuke e Sakura.',
  },
  {
    questionId: uuidv4(),
    questionText: 'Qual é a vila de Naruto?',
    category: QuizCategory.Vilas,
    options: [
      { optionId: 'opt1', text: 'Vila da Areia' },
      { optionId: 'opt2', text: 'Vila da Folha' },
      { optionId: 'opt3', text: 'Vila da Névoa' },
      { optionId: 'opt4', text: 'Vila da Pedra' },
    ],
    correctOptionId: 'opt2',
    explanation: 'Naruto nasceu e cresceu em Konohagakure, a Vila Oculta da Folha.',
  },
  {
    questionId: uuidv4(),
    questionText: 'Qual bijuu está selado em Naruto?',
    category: QuizCategory.Historia,
    options: [
      { optionId: 'opt1', text: 'Shukaku' },
      { optionId: 'opt2', text: 'Kurama' },
      { optionId: 'opt3', text: 'Gyuki' },
      { optionId: 'opt4', text: 'Matatabi' },
    ],
    correctOptionId: 'opt2',
    explanation: 'Kurama, a Raposa de Nove Caudas, foi selada em Naruto quando ele nasceu.',
  },
  {
    questionId: uuidv4(),
    questionText: 'Qual é o clã de Sasuke?',
    category: QuizCategory.Personagens,
    options: [
      { optionId: 'opt1', text: 'Clã Hyuga' },
      { optionId: 'opt2', text: 'Clã Uchiha' },
      { optionId: 'opt3', text: 'Clã Senju' },
      { optionId: 'opt4', text: 'Clã Uzumaki' },
    ],
    correctOptionId: 'opt2',
    explanation: 'Sasuke Uchiha pertence ao famoso Clã Uchiha, conhecido pelo Sharingan.',
  },
  {
    questionId: uuidv4(),
    questionText: 'Quem é o Quinto Hokage?',
    category: QuizCategory.Historia,
    options: [
      { optionId: 'opt1', text: 'Tsunade' },
      { optionId: 'opt2', text: 'Minato' },
      { optionId: 'opt3', text: 'Hiruzen' },
      { optionId: 'opt4', text: 'Kakashi' },
    ],
    correctOptionId: 'opt1',
    explanation: 'Tsunade se tornou a Quinta Hokage após a morte do Terceiro Hokage.',
  },
  {
    questionId: uuidv4(),
    questionText: 'Qual é o jutsu de invocação de Jiraiya?',
    category: QuizCategory.Jutsus,
    options: [
      { optionId: 'opt1', text: 'Invocação: Sapos' },
      { optionId: 'opt2', text: 'Invocação: Cobras' },
      { optionId: 'opt3', text: 'Invocação: Lesmas' },
      { optionId: 'opt4', text: 'Invocação: Cães' },
    ],
    correctOptionId: 'opt1',
    explanation: 'Jiraiya tem um contrato de invocação com os sapos do Monte Myoboku.',
  },
  {
    questionId: uuidv4(),
    questionText: 'Quantas caudas tem o Kurama?',
    category: QuizCategory.Curiosidades,
    options: [
      { optionId: 'opt1', text: '7 caudas' },
      { optionId: 'opt2', text: '8 caudas' },
      { optionId: 'opt3', text: '9 caudas' },
      { optionId: 'opt4', text: '10 caudas' },
    ],
    correctOptionId: 'opt3',
    explanation: 'Kurama é a Raposa de Nove Caudas, o bijuu mais poderoso.',
  },
  {
    questionId: uuidv4(),
    questionText: 'Qual é o nome do irmão de Sasuke?',
    category: QuizCategory.Personagens,
    options: [
      { optionId: 'opt1', text: 'Madara' },
      { optionId: 'opt2', text: 'Obito' },
      { optionId: 'opt3', text: 'Itachi' },
      { optionId: 'opt4', text: 'Shisui' },
    ],
    correctOptionId: 'opt3',
    explanation: 'Itachi Uchiha é o irmão mais velho de Sasuke.',
  },
  {
    questionId: uuidv4(),
    questionText: 'Qual é o nome da técnica de cópia de Kakashi?',
    category: QuizCategory.Jutsus,
    options: [
      { optionId: 'opt1', text: 'Byakugan' },
      { optionId: 'opt2', text: 'Sharingan' },
      { optionId: 'opt3', text: 'Rinnegan' },
      { optionId: 'opt4', text: 'Tenseigan' },
    ],
    correctOptionId: 'opt2',
    explanation: 'Kakashi possui o Sharingan, que lhe permite copiar jutsus.',
  },
  {
    questionId: uuidv4(),
    questionText: 'Quem é o líder da Akatsuki?',
    category: QuizCategory.Personagens,
    options: [
      { optionId: 'opt1', text: 'Pain' },
      { optionId: 'opt2', text: 'Itachi' },
      { optionId: 'opt3', text: 'Kisame' },
      { optionId: 'opt4', text: 'Deidara' },
    ],
    correctOptionId: 'opt1',
    explanation: 'Pain (Nagato) é o líder aparente da organização Akatsuki.',
  },
  {
    questionId: uuidv4(),
    questionText: 'Qual é a vila de Gaara?',
    category: QuizCategory.Vilas,
    options: [
      { optionId: 'opt1', text: 'Vila da Folha' },
      { optionId: 'opt2', text: 'Vila da Areia' },
      { optionId: 'opt3', text: 'Vila da Névoa' },
      { optionId: 'opt4', text: 'Vila da Nuvem' },
    ],
    correctOptionId: 'opt2',
    explanation: 'Gaara é de Sunagakure, a Vila Oculta da Areia.',
  },
  {
    questionId: uuidv4(),
    questionText: 'Qual é o nome do pai de Naruto?',
    category: QuizCategory.Historia,
    options: [
      { optionId: 'opt1', text: 'Jiraiya' },
      { optionId: 'opt2', text: 'Minato' },
      { optionId: 'opt3', text: 'Hiruzen' },
      { optionId: 'opt4', text: 'Fugaku' },
    ],
    correctOptionId: 'opt2',
    explanation: 'Minato Namikaze, o Quarto Hokage, é o pai de Naruto.',
  },
  {
    questionId: uuidv4(),
    questionText: 'Qual é o jutsu proibido que Naruto aprendeu primeiro?',
    category: QuizCategory.Jutsus,
    options: [
      { optionId: 'opt1', text: 'Rasengan' },
      { optionId: 'opt2', text: 'Kage Bunshin' },
      { optionId: 'opt3', text: 'Chidori' },
      { optionId: 'opt4', text: 'Hiraishin' },
    ],
    correctOptionId: 'opt2',
    explanation: 'Kage Bunshin no Jutsu foi o primeiro jutsu proibido que Naruto aprendeu.',
  },
  {
    questionId: uuidv4(),
    questionText: 'Quantos membros originais tinha o Time 7?',
    category: QuizCategory.Curiosidades,
    options: [
      { optionId: 'opt1', text: '2' },
      { optionId: 'opt2', text: '3' },
      { optionId: 'opt3', text: '4' },
      { optionId: 'opt4', text: '5' },
    ],
    correctOptionId: 'opt3',
    explanation: 'O Time 7 tinha 4 membros: Naruto, Sasuke, Sakura e o sensei Kakashi.',
  },
];

/**
 * @summary
 * Selects 10 random questions from the question bank
 *
 * @function selectRandomQuestions
 * @module quiz
 *
 * @returns {QuizQuestion[]} Array of 10 random questions
 */
function selectRandomQuestions(): QuizQuestion[] {
  const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
}

/**
 * @summary
 * Starts a new quiz session
 *
 * @function startQuiz
 * @module quiz
 *
 * @param {StartQuizRequest} params - Start quiz parameters
 *
 * @returns {Promise<QuizSession>} Created quiz session
 *
 * @throws {Error} When question bank has insufficient questions
 */
export async function startQuiz(params: StartQuizRequest): Promise<QuizSession> {
  if (questionBank.length < 10) {
    throw new Error('Insufficient questions in question bank');
  }

  const sessionId = uuidv4();
  const questions = selectRandomQuestions();

  const session: QuizSession = {
    sessionId,
    userId: params.userId,
    startTime: new Date(),
    totalQuestions: 10,
    currentQuestionIndex: 0,
    questions,
    answers: [],
    completed: false,
  };

  sessions.set(sessionId, session);

  return session;
}

/**
 * @summary
 * Gets the current question for a session
 *
 * @function getCurrentQuestion
 * @module quiz
 *
 * @param {string} sessionId - Session identifier
 *
 * @returns {Promise<QuizQuestion | null>} Current question or null if session not found
 */
export async function getCurrentQuestion(sessionId: string): Promise<QuizQuestion | null> {
  const session = sessions.get(sessionId);

  if (!session || session.completed) {
    return null;
  }

  return session.questions[session.currentQuestionIndex];
}

/**
 * @summary
 * Submits an answer to a question
 *
 * @function submitAnswer
 * @module quiz
 *
 * @param {SubmitAnswerRequest} params - Answer submission parameters
 *
 * @returns {Promise<QuizAnswer>} Answer result with correctness and points
 *
 * @throws {Error} When session not found or invalid question
 */
export async function submitAnswer(params: SubmitAnswerRequest): Promise<QuizAnswer> {
  const session = sessions.get(params.sessionId);

  if (!session) {
    throw new Error('Session not found');
  }

  if (session.completed) {
    throw new Error('Quiz already completed');
  }

  const currentQuestion = session.questions[session.currentQuestionIndex];

  if (currentQuestion.questionId !== params.questionId) {
    throw new Error('Invalid question for current session state');
  }

  const isCorrect = currentQuestion.correctOptionId === params.selectedOptionId;
  const pointsEarned = isCorrect ? 10 : 0;

  const answer: QuizAnswer = {
    questionId: params.questionId,
    selectedOptionId: params.selectedOptionId,
    isCorrect,
    responseTime: params.responseTime,
    pointsEarned,
  };

  session.answers.push(answer);
  session.currentQuestionIndex++;

  if (session.currentQuestionIndex >= session.totalQuestions) {
    session.completed = true;
  }

  sessions.set(params.sessionId, session);

  return answer;
}

/**
 * @summary
 * Gets quiz results for a completed session
 *
 * @function getQuizResult
 * @module quiz
 *
 * @param {string} sessionId - Session identifier
 *
 * @returns {Promise<QuizResult>} Quiz results with score and performance message
 *
 * @throws {Error} When session not found or not completed
 */
export async function getQuizResult(sessionId: string): Promise<QuizResult> {
  const session = sessions.get(sessionId);

  if (!session) {
    throw new Error('Session not found');
  }

  if (!session.completed) {
    throw new Error('Quiz not completed yet');
  }

  const totalScore = session.answers.reduce((sum, answer) => sum + answer.pointsEarned, 0);
  const correctAnswers = session.answers.filter((answer) => answer.isCorrect).length;
  const completionTime = Math.floor((new Date().getTime() - session.startTime.getTime()) / 1000);

  let performanceMessage: string;
  if (totalScore === 100) {
    performanceMessage = 'Perfeito! Você é um verdadeiro especialista em Naruto!';
  } else if (totalScore >= 70) {
    performanceMessage = 'Excelente! Você tem um conhecimento avançado sobre Naruto!';
  } else if (totalScore >= 40) {
    performanceMessage = 'Bom trabalho! Você tem um conhecimento intermediário sobre Naruto.';
  } else {
    performanceMessage = 'Continue estudando! Há muito mais para aprender sobre Naruto.';
  }

  const result: QuizResult = {
    sessionId,
    totalScore,
    correctAnswers,
    completionTime,
    performanceMessage,
    endTime: new Date(),
  };

  return result;
}

/**
 * @summary
 * Gets detailed feedback for all questions in a session
 *
 * @function getQuestionSummary
 * @module quiz
 *
 * @param {string} sessionId - Session identifier
 *
 * @returns {Promise<QuestionSummary[]>} Array of question summaries with answers
 *
 * @throws {Error} When session not found or not completed
 */
export async function getQuestionSummary(sessionId: string): Promise<QuestionSummary[]> {
  const session = sessions.get(sessionId);

  if (!session) {
    throw new Error('Session not found');
  }

  if (!session.completed) {
    throw new Error('Quiz not completed yet');
  }

  const summaries: QuestionSummary[] = session.questions.map((question, index) => {
    const answer = session.answers[index];
    const selectedOption = question.options.find((opt) => opt.optionId === answer.selectedOptionId);
    const correctOption = question.options.find((opt) => opt.optionId === question.correctOptionId);

    return {
      questionText: question.questionText,
      selectedOption: selectedOption?.text || '',
      correctOption: correctOption?.text || '',
      isCorrect: answer.isCorrect,
      explanation: question.explanation,
    };
  });

  return summaries;
}
