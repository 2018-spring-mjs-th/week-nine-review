import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

interface question {
  name: string;
}

interface quizDisplay {
  name: string;
  numberQuestions: number;
  questions: question[];
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


    // This is how to consume (or use) a Promise.
    this.quizSvc.getQuizzes()
      .then(data => {
        this.quizzes = data.json();
        console.log(data.json());
      })
      .catch(error => {
        console.log(error);
      });
  }

  selectedQuiz: selectedQuizType = undefined;
  undoQuizName: string = "";
  question: string = "";

  makeQuizSelected(q: quizDisplay) {
    this.selectedQuiz = q;
    this.undoQuizName = q.name;
  }

  addQuiz() {
    let newQuiz = { name: "New Untitled Quiz", numberQuestions: 0, questions: []};
    this.quizzes.push(newQuiz);
    this.selectedQuiz = newQuiz;
  }

  async saveChanges() {
    console.log("Winner");
  }

  public cancelChanges() {
    if (this.selectedQuiz != null) {
      this.selectedQuiz.name = this.undoQuizName;
    }
  }

  public addQuestion(quiz: quizDisplay) {
    if (this.selectedQuiz != null) {
      let newQuestion = {name: this.question};
      this.selectedQuiz.questions.push(newQuestion);
      this.selectedQuiz.numberQuestions = this.selectedQuiz.questions.length;
      this.question = "";
    }
  }

  public removeQuestion(q: question) {
    if (q != null && this.selectedQuiz != null) {
      this.selectedQuiz.questions = this.selectedQuiz.questions
                                        .filter(question => question.name != q.name);
      this.selectedQuiz.numberQuestions = this.selectedQuiz.questions.length;              
    }
  }
}
