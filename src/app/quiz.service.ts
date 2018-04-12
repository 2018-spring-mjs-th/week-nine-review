import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { reject } from 'q';
import { resolve } from 'url';

@Injectable()
export class QuizService {

  constructor(private builtInAngularHttpService: Http) { }

  public getQuizzes() {

    return this.builtInAngularHttpService.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Hard Quiz').toPromise();

  }

  public saveQuiz(succeed: boolean): Promise<string> {

    return new Promise((resolve, reject) => {

      succeed ? resolve("Quiz Saved") : reject("Error");
    });
  }

  

}
