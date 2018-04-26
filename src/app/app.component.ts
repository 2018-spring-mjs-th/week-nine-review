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

  title = 'QUIZ EDITOR';

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
    console.log("Before Promise!!!");
    this.loadQuizzes();
    console.log("After Promise!!!");
      
  }

  public errorLoadingQuizzes = false;

  private loadQuizzes() {
      // This is how to consume (or use) a Promise.
      this.quizSvc.getQuizzes()
      .then(data => {
        console.log("Promise fulfilled!!!");
        this.quizzes = data.json();
        this.quizzes = this.quizzes.map(x=> ({ ...x
          , originalName: x.name 
          , originalQuestionsString: x.questions.map(x => x.name).join("~")
        }));
        //this.quizzes = this.quizzes.map(x=> ({ name: x.name, originalName: x.name, questions: x.questions }));
      })
      .catch(error => {
        this.errorLoadingQuizzes = true;
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
    let newQuiz = { name: "New Untitled Quiz", originalName: "New Untitled Quiz", questions: [], originalQuestionsString: "" };
    this.quizzes.push(newQuiz);
    this.selectedQuiz = newQuiz;
  }

  async saveChanges() {

    try {
      let result = await this.quizSvc.saveQuiz(true);
      console.log(result);

      let result2 = await this.quizSvc.saveQuiz(false);
      console.log(result2);
    }

    catch(cat) {
      console.log(cat);
    }
  }

  public cancelAllChanges() {
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
    setTimeout(x => this.isDetailsDisplayAnimating = false, 500);
  }
}
