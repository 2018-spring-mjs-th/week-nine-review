import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { QuizService } from './quiz.service';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from './error-modal/error-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorModalComponent
  ],
  imports: [
    BrowserModule
    , FormsModule
    , HttpModule
    , NgbModule.forRoot()
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
  , entryComponents: [ErrorModalComponent]
})
export class AppModule { }
