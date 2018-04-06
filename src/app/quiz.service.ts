import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class QuizService {

  constructor(private builtInHttp: Http) { }

  public getQuizzes() {

    return this.builtInHttp
        .get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Bonkers')
        .toPromise();

    /*
    return [
      { name: "Quiz 1", numberQuestions: 10 }
      , { name: "Quiz 2", numberQuestions: 0 }
    ];
    */
  }

  public saveQuiz(succeed: boolean): Promise<string> {
      return new Promise((resolve, reject) => {
          succeed ? resolve("Quiz saved!") : reject("Nothing saved");
      });
  }

}
