import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

interface quizDisplay {
  name: string;
  numberQuestions: number;
}

type selectedQuizType = quizDisplay | undefined;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'
    , '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
  ]
})
export class AppComponent {

  title = 'week-nine-review';

  color = "silver";

  isDangerous = true;

  public toggleDanger() {
    this.isDangerous = !this.isDangerous;
  }

  stupid = "Stupid";

  //quizService: QuizService;

  // TS automatic properties!!!
  constructor(private quizSvc: QuizService) {
    //this.quizService = quizSvc;
  }

  quizzes: quizDisplay[] = [];

  ngOnInit() {
    //this.quizzes = this.quizSvc.getQuizzes();
    let quizPromise = this.quizSvc.getQuizzes();

    quizPromise
        .then(
            data => {
                this.quizzes = JSON.parse(data.text());
            }
        )
        .catch(
            error => {
                this.quizzes = [];
            }
        );
  }

  selectedQuiz: selectedQuizType = undefined;

  makeQuizSelected(q: quizDisplay) {
    this.selectedQuiz = q;
  }

  addQuiz() {
    let newQuiz = { name: "New Untitled Quiz", numberQuestions: 0};
    this.quizzes.push(newQuiz);
    this.selectedQuiz = newQuiz;
  }

  public updateQuiz() {
      if (this.selectedQuiz != null) {
        let promise: Promise<string>;
        let passed = Math.floor(Math.random() * Math.floor(10));

        promise = passed < 5 ? this.quizSvc.saveQuiz(true) : this.quizSvc.saveQuiz(false);

        promise
            .then(
                text => {
                    console.log(text);
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            );
        } else {
            console.log("Select a quiz first...");
        }
  }
}
