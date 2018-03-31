import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

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

    quizzes = [];

    ngOnInit() {
        this.quizzes = this.quizSvc.getQuizzes();
	}
	
	selectedQuizIndex:number;

    selectedQuiz = {
        name: "No quiz selected",
		numberQuestions: "n/a"
    };

    makeQuizSelected(q, selectedQuizIndex) {
		this.selectedQuiz = q;
		this.selectedQuizIndex = selectedQuizIndex;
    }

    addQuiz() {
        let newQuiz = {
            name: "New Untitled Quiz",
            numberQuestions: 0
        };
        this.quizzes.push(newQuiz);
        this.selectedQuiz = newQuiz;
	}
	
	handleSaveSelectedQuiz() {
		// mutation vs immutability... this is bad?
		// Actual way to do this is to create a new Quiz array and save the array... the array houses those questions...
		this.quizzes[this.selectedQuizIndex] = this.selectedQuiz;		
	}
}

