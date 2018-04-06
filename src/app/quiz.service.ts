import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class QuizService {

  constructor(private builtInAngularHttpService: Http) { }

  public getQuizzes() {

    return this.builtInAngularHttpService.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Killer Quiz').toPromise();

    /*return [
      { name: "Quiz 1", numberQuestions: 10 }
      , { name: "Quiz 2", numberQuestions: 0 }
    ];*/
  }

  public saveQuiz(succeed: boolean): Promise<string> {  //I want saveQuiz to return a Promise of type string.
    return new Promise((resolve, reject) => {
      //run some code and either resolve it (success!) or reject it (failure :( )
      succeed ? resolve("Quiz saved") : reject("Save failed");
    });
  }

}