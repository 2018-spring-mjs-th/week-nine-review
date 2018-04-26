import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { QuizService } from './quiz.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
    , FormsModule
  ],
  providers: [ QuizService ],
  bootstrap: [AppComponent]
})
export class AppModule { }