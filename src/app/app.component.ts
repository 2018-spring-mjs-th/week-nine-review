import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

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

  quizzes = [];

  ngOnInit() {
    this.quizzes = this.quizSvc.getQuizzes();
  }

  selectedQuiz = { name: "No quiz selected" };

  makeQuizSelected(q) {
    this.selectedQuiz = q;
  }

  addQuiz() {
    this.quizzes.push({ name: "New Untitled Quiz", numberQuestions: 0})
  }
}
