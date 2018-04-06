import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { }

  public getQuizzes() {
    return this.http.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Foo').toPromise();
  }

  public saveQuiz(succeed: boolean): Promise<string> {
    return new Promise((resolve, reject) => {
      if(succeed) {
        resolve('It Worked');
      } else {
        reject(Error('Error'));
      }
    });
  }
}
