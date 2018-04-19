import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

interface quizDisplay {
  name: string;
  questions: questionDisplay[];
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

  private loadQuizzes() {
      // This is how to consume (or use) a Promise.
      this.quizSvc.getQuizzes()
      .then(data => {
        console.log("Promise fulfilled!!!");
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
    let newQuiz = { name: "New Untitled Quiz", questions: [] };
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
}
