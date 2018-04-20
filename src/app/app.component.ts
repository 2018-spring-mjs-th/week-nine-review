import { Component } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import { QuizService } from './quiz.service';

interface quizDisplay {
  name: string;
  initialName: string;
  questions: quizQuestion[];
}

interface quizQuestion {
  name: string;
  initialName: string;
}

type selectedQuizType = quizDisplay | undefined;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'
    , '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
  ], 
  animations: [

  ]
})
export class AppComponent {
  title = 'the Quiz Editor';
  color = "silver";
  isDangerous = true;
  stupid = "Stupid";
  quizzes: quizDisplay[] = [];
  selectedQuiz: selectedQuizType = undefined;
  previousSelectedQuiz: selectedQuizType = undefined;
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
      quiz.questions.map(currentQuestion => {
        currentQuestion.initialName = currentQuestion.name;
      });
    });
  }

  makeQuizSelected(q: quizDisplay) {
    if(this.selectedQuiz) {
      this.previousSelectedQuiz = this.selectedQuiz;
    }
    this.selectedQuiz = q;
  }

  addQuiz() {
    let newQuiz = { name: "New Untitled Quiz", initialName: "New Untitled Quiz", questions: []};
    this.quizzes.push(newQuiz);
    this.selectedQuiz = newQuiz;
  }
  
  cancelChanges(modifiedQuizzes: quizDisplay[]) {
    modifiedQuizzes.map(quiz => {
      quiz.name = quiz.initialName;
      quiz.questions.map(currentQuestion => {
        currentQuestion.name = currentQuestion.initialName;
      });
    });
  }

  addQuestion(questionName: string) {
    if (this.selectedQuiz && this.newQuestionName != '') {
      this.selectedQuiz.questions.push({ name: questionName, initialName: questionName});
      this.newQuestionName = '';
    }
  }

  removeQuestion(question: quizQuestion) {
    if(this.selectedQuiz) {
      this.selectedQuiz.questions = this.selectedQuiz.questions.filter(currentQuestion => {
        return currentQuestion != question;
      });
    }
  }
  
  async saveQuiz() {
    let result = await this.quizSvc.saveQuiz(true);
  }

  get numberOfEditedQuizzes() {
    if(this.selectedQuiz) {
      let numberChanges = 0;
      numberChanges = this.selectedQuiz.questions.filter(currentQuestion => {
        return currentQuestion.name != currentQuestion.initialName;
      }).length;

      if(this.selectedQuiz.initialName != this.selectedQuiz.name) {
        numberChanges++;
      }

      if(numberChanges == 0) {
        return null;
      } else {
        return numberChanges;
      }
    } else {
      return null;
    }
  }
}
