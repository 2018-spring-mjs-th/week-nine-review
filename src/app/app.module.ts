import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { QuizService } from './quiz.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent
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
