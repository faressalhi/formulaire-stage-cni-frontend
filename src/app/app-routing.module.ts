import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditQuestionComponent } from './questions-folder/edit-question/edit-question.component';
import { NewQuestionComponent } from './questions-folder/new-question/new-question.component';
import { QuestionsComponent } from './questions-folder/questions/questions.component';
import { ResponsesComponent } from './responses-folder/responses/responses.component';
import { NewSimpleResponseComponent } from './responses-folder/new-simple-response/new-simple-response.component';
import { NewChoicesResponseComponent } from './responses-folder/new-choices-response/new-choices-response.component';
import { ChoicesComponent } from './choices-folder/choices/choices.component';
import { NewChoiceComponent } from './choices-folder/new-choice/new-choice.component';
import { EditChoiceComponent } from './choices-folder/edit-choice/edit-choice.component';



const routes: Routes = [
  { path : "questions", component : QuestionsComponent },
  { path : "new-question", component : NewQuestionComponent },
  { path : "questions/question/:id", component : EditQuestionComponent },
  { path : "responses", component : ResponsesComponent },
  { path : "new-simple-response", component : NewSimpleResponseComponent },
  { path : "new-choices-response", component : NewChoicesResponseComponent },
  { path : "choices", component : ChoicesComponent },
  { path : "new-choice", component : NewChoiceComponent },
  { path : "choices/choice/:id", component : EditChoiceComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
