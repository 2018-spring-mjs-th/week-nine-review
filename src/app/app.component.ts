import { Component } from '@angular/core';
import { QuizService } from './quiz.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from './error-modal/error-modal.component';

interface quizDisplay {
  name: string;
  numberQuestions: number;
}

type selectedQuiz = quizDisplay | undefined;

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
  constructor(private quizSvc: QuizService, private modalService: NgbModal) {
    //this.quizService = quizSvc;
  }

  quizzes: quizDisplay[] = [];

  ngOnInit() {
    this.quizSvc.getQuizzes()
      .then(data => {
        console.log(data.text());
        this.quizzes = JSON.parse(data.text());
      })
      .catch( error => {
        console.log(error);
        //this.modalService.open("ErrorModalComponent");
        //this.modalService.open(content);
        this.modalService.open(ErrorModalComponent);
      });
  }

  currentlySelectedQuiz: selectedQuiz = undefined;

  makeQuizSelected(q: quizDisplay) {
    this.currentlySelectedQuiz = q;
  }

  addQuiz() {
    let newQuiz = { name: "New Untitled Quiz", numberQuestions: 0};
    this.quizzes.push(newQuiz);
    this.currentlySelectedQuiz = newQuiz;
  }
}
