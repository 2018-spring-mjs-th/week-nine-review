import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class QuizService {

  constructor(private angularBuiltInHttpService: Http) { }

  public getQuizzes() {

    this.angularBuiltInHttpService.get('https://2017springserverless.azurewebsites.net/api/HttpTriggerJS1?name=Foo')
      .toPromise()
      .then(data => {
        console.log(data);
      })
      .catch( error => {
        console.log(error);
      });

    return {
      quizzes: [
        { name: "Quiz 1", numberQuestions: 10 }
      , { name: "Quiz 2", numberQuestions: 0 }
    ]};
  }
}
