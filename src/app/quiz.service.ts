import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

interface quizDisplay {
  name: string;
  numberQuestions: number;
}

type selectedQuizType = quizDisplay | undefined;

@Injectable()
export class QuizService {

  constructor(private builtInAngularHttpService: Http) { }

  public getQuizzes() {

    return this.builtInAngularHttpService.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Hard Quiz').toPromise();

  }

  public saveQuiz(selectedQuiz: selectedQuizType): Promise<string> {
     
    return new Promise((resolve, reject) => {
      if (selectedQuiz === undefined) {
        reject("Error: Cannot save without selecting a quiz!!!");
      } else {
        resolve(`Save to quiz ${selectedQuiz.name} succeeded!`);
      }

      // Run some code and either resolve it (success) or reject it (failure).
      //succeed ? resolve("Quiz Saved!") : reject("Save Failed!");
    });
  }
}
