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

  saveString = "";

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
    this.quizSvc.getQuizzes()
      .then(data => {
        this.quizzes = JSON.parse(data.text());
      })
      .catch(error => {
        console.log(error);
      });


  }

  saveChanges(succeed: boolean) {

    this.quizSvc.saveQuiz(succeed)
        .then(data => {
          this.saveString = data;
        })
        .catch(error => {
          this.saveString = error});
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
}
