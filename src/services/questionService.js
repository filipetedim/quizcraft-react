// Services
import { api } from './api';

export default {
  /**
   * Returns all the questions.
   */
  getQuestions: () => api({ endpoint: 'questions' }),

  /**
   * Returns a specific question.
   */
  getQuestion: id => api({ endpoint: `questions/${id}` }),

  /**
   * Returns a specific question.
   */
  postQuestion: data => api({ method: 'POST', endpoint: 'questions', data }),
};
