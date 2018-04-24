import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class QuizService {

  constructor(private angularBuiltInHttpService: Http) { }

  public getQuizzes() {

    return this.angularBuiltInHttpService.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name1=Foo')
      .toPromise();

    // return [
    //     { name: "Quiz 1", numberQuestions: 10 }
    //   , { name: "Quiz 2", numberQuestions: 0 }
    // ];
  }

  public saveQuiz(succeed: boolean): Promise<string> {

    let p = new Promise<string>((resolve, reject) => {

      succeed ? resolve("Quiz saved!") : reject("Save failed!")

    });

    return p;
  }
}
