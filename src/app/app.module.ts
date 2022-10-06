import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionsComponent } from './questions-folder/questions/questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { NewQuestionComponent } from './questions-folder/new-question/new-question.component';
import { EditQuestionComponent } from './questions-folder/edit-question/edit-question.component';
import { ToastrModule } from 'ngx-toastr';
import { ResponsesComponent } from './responses-folder/responses/responses.component';
import { EditResponseComponent } from './responses-folder/edit-response/edit-response.component';
import { NewSimpleResponseComponent } from './responses-folder/new-simple-response/new-simple-response.component';
import { NewChoicesResponseComponent } from './responses-folder/new-choices-response/new-choices-response.component';
import { ChoicesComponent } from './choices-folder/choices/choices.component';
import { NewChoiceComponent } from './choices-folder/new-choice/new-choice.component';
import { EditChoiceComponent } from './choices-folder/edit-choice/edit-choice.component';
import { CandidateFormComponent } from './candidate-view-folder/candidate-form/candidate-form.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    NavbarComponent,
    NewQuestionComponent,
    EditQuestionComponent,
    ResponsesComponent,
    EditResponseComponent,
    NewSimpleResponseComponent,
    NewChoicesResponseComponent,
    ChoicesComponent,
    NewChoiceComponent,
    EditChoiceComponent,
    CandidateFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
