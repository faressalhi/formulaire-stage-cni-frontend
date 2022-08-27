import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Question } from '../../questions-folder/model/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http : HttpClient) { }

  public getQuestions() : Observable<Array<Question>> {
    return this.http.get<Array<Question>>(environment.backendHost+"/questions");
  }

  public getQuestion(id : string) : Observable<Question> {
    return this.http.get<Question>(environment.backendHost+"/questions/"+id);
  }

  public searchQuestions(keyword : string) : Observable<Array<Question>> {
    return this.http.get<Array<Question>>(environment.backendHost+"/questions/search?keyword="+keyword);
  } 

  //  saving a Question
  public saveQuestion(question : Question) : Observable<Question> {
    return this.http.post<Question>(environment.backendHost+"/questions", question);
  } 

  public updateQuestion(question: Question) : Observable<Question> {
    console.log(question.idQ);
    
    return this.http.put<Question>(environment.backendHost+"/questions/"+question.idQ, question);
  }

  public deleteQuestion(id : string) {
    return this.http.delete(environment.backendHost+"/questions/"+id);
  } 

}
