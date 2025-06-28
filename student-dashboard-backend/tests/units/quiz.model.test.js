const Quiz = require('../../models/quiz_model');

describe('Quiz Model', () => {
  it('should be invalid if name is missing', () => {
    const quiz = new Quiz({ totalQuestions: 5 });

    quiz.validate((err) => {
      expect(err.errors.name).toBeDefined();
    });
  });

  it('should be valid if name and totalQuestions exist', () => {
    const quiz = new Quiz({ name: 'Math', totalQuestions: 10 });

    quiz.validate((err) => {
      expect(err).toBeNull();
    });
  });
});
