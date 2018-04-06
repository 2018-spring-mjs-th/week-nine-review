import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class QuizService {

  constructor(private builtInAngularHttpService: Http) { }

  public getQuizzes() {

    return this.builtInAngularHttpService.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Emily').toPromise();

  }

}
