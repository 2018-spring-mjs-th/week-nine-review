import { Injectable } from '@angular/core';

@Injectable()
export class QuizService {

  constructor() { }

  public getQuizzes() {
    return [
      { name: "Math Quiz", numberQuestions: 10 }
      , { name: "Java Quiz", numberQuestions: 0 }
    ];
  }

}
