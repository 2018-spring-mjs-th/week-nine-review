import { Injectable } from '@angular/core';

@Injectable()
export class QuizService {

  constructor() { }

  public getQuizzes() {
    return {
      quizzes: [
        { name: "Quiz 1", numberQuestions: 10 }
      , { name: "Quiz 2", numberQuestions: 0 }
    ]};
  }
}
