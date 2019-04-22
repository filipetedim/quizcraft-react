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
   * Posts a question.
   */
  postQuestion: data => api({ method: 'POST', endpoint: 'questions', data }),

  /**
   * Puts a question.
   */
  putQuestion: ({ id, data }) => api({ method: 'PUT', endpoint: `questions/${id}`, data }),
};
