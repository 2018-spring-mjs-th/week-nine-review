import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

interface quizDisplay {
  name: string;
  original_name: string;
  numberQuestions: number;
  questions: questionDisplay[];
  original_question_String: string;
}

interface questionDisplay {
  name: string;
}

type selectedQuizType = quizDisplay | undefined;

type selectedQuestionType = questionDisplay | undefined;

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

  private loadQuizzes() {
      // This is how to consume (or use) a Promise.
      this.quizSvc.getQuizzes()
      .then(data => {
        console.log("Promise fulfilled!!!");
        this.quizzes = data.json();
        this.quizzes = this.quizzes.map(x => (
          { ...x, 
            original_name: x.name,
            original_question_String: x.questions.map(x => x.name).join("~")
          }
        ));
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
    let newQuiz = { name: "New Untitled Quiz", original_name: "New Untitled Quiz", numberQuestions: 0, questions: [], original_question_String: ""};
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

  questions : questionDisplay[] = [];

  addQuestion() {
    if (this.selectedQuiz) {
      let newQuestion = { name: "New Untitled Question" };
      this.selectedQuiz.questions.push(newQuestion);
    }
  }

  get numberOfEditedQuizzes() {
    return this.quizzes.filter(x => 
      x.name !== x.original_name || x.name === "New Untitled Quiz" || x.original_question_String !== x.questions.map(x => x.name).join("~")
    ).length;
  }

  removeQuestion(q: questionDisplay) {
    if (this.selectedQuiz) {
      this.selectedQuiz.questions = this.selectedQuiz.questions.filter((question) => question !== q);
    }
  }
}
