import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Choice } from 'src/app/choices-folder/model/choice.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChoicesService {

  constructor(private http : HttpClient) { }

  public getChoices() : Observable<Array<any>> {
    return this.http.get<Array<any>>(environment.backendHost+"/choices");
  }
  
  public saveChoice(choice : Choice) : Observable<Choice> {
    return this.http.post<Choice>(environment.backendHost+"/choices", choice);
  }

  public getChoice(id : string) : Observable<Choice> {
    return this.http.get<Choice>(environment.backendHost+"/choices/"+id);
  }


  public updateChoice(choice: any) : Observable<Choice> {
    console.log("from service"+choice.idC);
    return this.http.put<Choice>(environment.backendHost+"/choices/"+choice.idC, choice);
  }

  public deleteChoice(id : string) {
    return this.http.delete(environment.backendHost+"/choices/"+id);
  } 
}
