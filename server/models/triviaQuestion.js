const { FETCH_QUESTION, FETCH_TOKEN } = require("../api/index");

class TriviaQuestion {
  constructor({
    question = null,
    possibleAnswers = null,
    correctAnswer = null
  }) {
    this.question = question;
    this.possibleAnswers = possibleAnswers;
    this.correctAnswer = correctAnswer;
  }
  static async init(category, token) {
    const question = await FETCH_QUESTION(category, token);
    return question;
  }
  getQuestion() {
    return this.question;
  }
  getPossibleAnswers() {
    return this.possibleAnswers;
  }
  getCorrectAnswer() {
    return this.correctAnswer;
  }
}


module.exports = TriviaQuestion;