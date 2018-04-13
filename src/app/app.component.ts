import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

interface quizDisplay {
  name: string;
  numberQuestions: number;
  questions: {name : string}[];
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
  questions: {name : string}[];


  ngOnInit() {
    
    //this.quizzes = this.quizSvc.getQuizzes();

    console.log("Before Promise");
    // This is how to consume (or use) a Promise.
    this.loadQuizzes();

  }

  private loadQuizzes() {
    this.quizSvc.getQuizzes()
    .then(data => {
      this.quizzes = data.json();
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
    let newQuiz = { name: "New Untitled Quiz", numberQuestions: 0, questions: []};
    this.quizzes.push(newQuiz);
    this.selectedQuiz = newQuiz;
  }

  async saveChanges() {
    try {
      let result = await this.quizSvc.saveQuiz(true);
      console.log(result);
      } catch(error) {
        console.log(error);
      
    }
  }

  cancelAllChanges() {

    this.loadQuizzes();
  }

  addNewQuestion() {
    let newQuestion = {name: "New Untitled Question"};
    this.questions.push(newQuestion);

  }

  remove() {

  }
  

}
