import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class QuizService {

  constructor(private buildInAngularService: Http) { }

  public getQuizzes() {

    return this.buildInAngularService.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Qiao').toPromise();

  }

  public saveQuiz(succeed: boolean): Promise<string> {

    return new Promise((resolve, reject) => {
      // run some code and either resolve it (success) or reject it (falure)
      succeed ? resolve("Quiz Saved!!!") : reject("Quiz Failed!!!");

    });

  }

}
