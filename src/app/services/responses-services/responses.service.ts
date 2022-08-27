import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChoicesResponse } from 'src/app/responses-folder/model/choices-response.model';
import { SimpleResponse } from 'src/app/responses-folder/model/simple-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponsesService {

  constructor(private http : HttpClient) { }

  public getResponses() : Observable<Array<any>> {
    return this.http.get<Array<any>>(environment.backendHost+"/responses");
  }

  public getResponse(id : string) : Observable<any> {
    return this.http.get<any>(environment.backendHost+"/responses/"+id);
  }

  public saveSimpleResponse(simpleResponse : SimpleResponse) : Observable<SimpleResponse> {
    return this.http.post<SimpleResponse>(environment.backendHost+"/responses/simpleresponse", simpleResponse);
  }

  public saveChoicesResponse(choicesResponse : ChoicesResponse) : Observable<ChoicesResponse> {
    return this.http.post<ChoicesResponse>(environment.backendHost+"/responses/choicesresponse", choicesResponse);
  }

  public updateSimpleResponse(simpleResponse: SimpleResponse) : Observable<SimpleResponse> {
    console.log(simpleResponse.idR);    
    return this.http.put<SimpleResponse>(environment.backendHost+"/responses/simpleresponse/"+simpleResponse.idR, simpleResponse);
  }

  public updateChoicesResponse(choicesResponse: ChoicesResponse) : Observable<ChoicesResponse> {
    console.log(choicesResponse.idR);
    
    return this.http.put<ChoicesResponse>(environment.backendHost+"/responses/choicesresponse/"+choicesResponse.idR, choicesResponse);
  }

  public deleteResponse(id : string) {
    return this.http.delete(environment.backendHost+"/responses/"+id);
  } 

  /*
  
  public getQuestion(id : string) : Observable<Question> {
    return this.http.get<Question>(environment.backendHost+"/questions/"+id);
  }

  public searchQuestions(keyword : string) : Observable<Array<Question>> {
    return this.http.get<Array<Question>>(environment.backendHost+"/questions/search?keyword="+keyword);
  } 

  public updateQuestion(question: Question) : Observable<Question> {
    console.log(question.idQ);
    
    return this.http.put<Question>(environment.backendHost+"/questions/"+question.idQ, question);
  }


  */
}
