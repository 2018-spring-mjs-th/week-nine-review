import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

interface quizDisplay {
  name: string;
  //numberQuestions: number;
  questions: questionDisplay[];
  originalName: string;
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

    console.log("Before Promise");
    // This is how to consume (or use) a Promise.
    this.loadQuizzes();
    console.log("After Promise!!!");
 
  }

  private loadQuizzes() {
    this.quizSvc.getQuizzes()
    .then(data => {
      this.quizzes = data.json();
      this.quizzes = this.quizzes.map(x=> ({ ...x, originalName: x.name}));
      //this.quizzes = this.quizzes.map(x=> ({ name: x.name, originalName: x.name, questions: x.questions }));
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
    let newQuiz = { name: "New Untitled Quiz", originalName: "New Untitled Quiz", questions: []};
    this.quizzes.push(newQuiz);
    this.selectedQuiz = newQuiz;
  }

  async saveChanges() {

    try {
      let result = await this.quizSvc.saveQuiz(true);
      console.log(result);
    }

    catch(error) {
      console.log(error);
    }
  }

  addQuestion() {
    if(this.selectedQuiz != undefined) {
      let newQuestion = { name: "New Untitled Question"};
      this.selectedQuiz.questions.push(newQuestion);
    } 
  }

  removeQuestion(questionToDelete: questionDisplay) {
    if (this.selectedQuiz != undefined) {
      this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== questionToDelete);
    }
  }

  public cancelAllChanges() {
    this.loadQuizzes();
    this.selectedQuiz = undefined;
  }
  get numberOfEditedQuizzes() {
    return this.quizzes.filter(x => x.name !== x.originalName).length;
  }
}


// filter.reduce returns arrays
