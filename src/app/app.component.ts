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
    
    //this.quizzes = this.quizSvc.getQuizzes(); This sets up .quizzes

    // This is how to consume a Promise.
    this.quizSvc.getQuizzes() //If getQuizzes works, then do this, else, if it's an error, catch the error.
      .then(data => {         //This defines a funciton that uses "data" as a parameter to do something.
      this.quizzes = JSON.parse(data.text()); //can also say data.json();
      })
      .catch(error => {
        console.log(error);
      });
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
