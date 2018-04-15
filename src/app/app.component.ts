import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

interface quizDisplay {
  name: string;
  originalName: string;
  questions: questionDisplay[];
  originalQuestionsString: string;
}

interface questionDisplay {
  name: string;
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

    console.log("Before async call for data!");
    
    this.loadQuizzes();

    console.log("After async call for data!");
  }

  private loadQuizzes() {
    // This is how to consume (or use) a Promise.
    this.quizSvc.getQuizzes()
    .then(data => {
      console.log("Got data!");
      this.quizzes = data.json().map(x => ({ ...x, originalName: x.name, originalQuestionsString: x.questions.map(y => y.name).join("") }));
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
    let newQuiz = { name: "New Untitled Quiz", originalName: "New Untitled Quiz", questions: [], originalQuestionsString: "" };
    this.quizzes.push(newQuiz);
    this.selectedQuiz = newQuiz;
  }

  cancelAllChanges() {
    this.loadQuizzes();
    this.selectedQuiz = undefined;
  }

  removeQuestion(q: questionDisplay) {
    if (this.selectedQuiz) {
      this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== q);
    }
  }

  addQuestion() {
    if (this.selectedQuiz) {
      this.selectedQuiz.questions.push({ name: "New Untitled Question" });
    }
  }

  get numberOfEditedQuizzes(): number {
      return this.quizzes.filter(x => x.name !== x.originalName 
        || x.originalName === "New Untitled Quiz"
        || x.originalQuestionsString !== x.questions.map(y => y.name).join("")
      ).length;  
  }
}
