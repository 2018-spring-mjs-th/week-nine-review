import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

interface quizDisplay {
  name: string;
  initialName: string;
  numberQuestions: number;
  questions: quizQuestion[];
}

interface quizQuestion {
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
  stupid = "Stupid";
  quizzes: quizDisplay[] = [];
  selectedQuiz: selectedQuizType = undefined;
  newQuestionName = '';
  
  constructor(private quizSvc: QuizService) {
    
  }
  
  ngOnInit() {
    this.loadQuizzes();
  }
  
  public toggleDanger() {
    this.isDangerous = !this.isDangerous;
  }

  private async loadQuizzes() {
    let data = await this.quizSvc.getQuizzes();
    this.quizzes = data as quizDisplay[];
    this.quizzes.map(quiz => {
      quiz.initialName = quiz.name;
    });
    console.log(this.quizzes);
  }

  makeQuizSelected(q: quizDisplay) {
    this.selectedQuiz = q;
  }

  addQuiz() {
    let newQuiz = { name: "New Untitled Quiz", initialName: "New Untitled Quiz", numberQuestions: 0, questions: []};
    this.quizzes.push(newQuiz);
    this.selectedQuiz = newQuiz;
  }
  
  cancelChanges(modifiedQuizzes: quizDisplay[]) {
    modifiedQuizzes.map(quiz => {
      quiz.name = quiz.initialName;
    });
  }

  addQuestion(questionName: string) {
    if (this.selectedQuiz && this.newQuestionName != '') {
      this.selectedQuiz.questions.push({name: questionName});
      this.newQuestionName = '';
    }
  }

  removeQuestion(questionName: string) {
    if (this.selectedQuiz) {
      this.selectedQuiz.questions = this.selectedQuiz.questions.filter(question => {
        return question.name != questionName;
      });
    }
  }
  
  async saveQuiz() {
    let result = await this.quizSvc.saveQuiz(true);
    console.log(result);
  }
}
