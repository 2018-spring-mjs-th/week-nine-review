import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// https://ng-bootstrap.github.io/#/home
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { QuizService } from './quiz.service';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule
    , FormsModule
    , HttpModule
    , NgbModule.forRoot()
  ],
  providers: [ QuizService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
