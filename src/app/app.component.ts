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

    console.log("Before Promise");
    // This is how to consume (or use) a Promise.
    this.loadQuizzes();
    console.log("After Promise!!!");
 
  }

  private loadQuizzes() {
    this.quizSvc.getQuizzes()
    .then(data => {
      this.quizzes = data.json();
      this.quizzes = this.quizzes.map(x=> ({ ...x
        , originalName: x.name
        , originalQuestionsString: x.questions.map(x => x.name).join("~")
      }));
      //this.quizzes = this.quizzes.map(x=> ({ name: x.name, originalName: x.name, questions: x.questions }));
    })
    .catch(error => {
      console.log(error);
    });
  }

  selectedQuiz: selectedQuizType = undefined;

  makeQuizSelected(q: quizDisplay) {
    this.animateDetailsDisplay();
    this.selectedQuiz = q;
  }

  addQuiz() {
    this.animateDetailsDisplay();
    let newQuiz = { name: "New Untitled Quiz", originalName: "New Untitled Quiz", questions: [], originalQuestionsString: ""};
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
    let editedQuizzes = this.quizzes.filter(x => 
      x.name !== x.originalName
      || x.originalName === "New Untitled Quiz"
      || x.originalQuestionsString !== x.questions.map(x => x.name).join("~")
    );

    return editedQuizzes.length;
  }

  isDetailsDisplayAnimating = false;

  private animateDetailsDisplay() {
    this.isDetailsDisplayAnimating = true;
    setTimeout(x => this.isDetailsDisplayAnimating = false, 5000);
  }
}


// filter.reduce returns arrays
