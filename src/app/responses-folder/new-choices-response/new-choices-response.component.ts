import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/questions-folder/model/question.model';
import { QuestionsService } from 'src/app/services/questions-services/questions.service';
import { ResponsesService } from 'src/app/services/responses-services/responses.service';
import { ChoicesResponse } from '../model/choices-response.model';
import { ChoicesResponseType } from '../model/EnumTypes.model';

@Component({
  selector: 'app-new-choices-response',
  templateUrl: './new-choices-response.component.html',
  styleUrls: ['./new-choices-response.component.css']
})
export class NewChoicesResponseComponent implements OnInit {

  newCRFormGroup! : FormGroup;
  questions! : Array<Question>; 
  selectedQuestion! : string;
  selectedResponseType! : string;
  choicesResponseType = ChoicesResponseType;
  srtvalues : any;
  
  constructor(private fb : FormBuilder, private responsesService : ResponsesService
    , private router : Router, private toastr : ToastrService
    , private questionsService : QuestionsService) { }

  ngOnInit(): void {

    console.log(this.choicesResponseType);
    
    this.srtvalues = Object.values(this.choicesResponseType).filter(value => typeof value === 'string') as string[];

    this.questionsService.getQuestions().subscribe({
      next : data => {
        this.questions = data;
      }, 
      error : err => {
        this.toastr.error(err, "Error");
      }
    });

    this.newCRFormGroup = this.fb.group({
      choicesResponseType : this.fb.control(null, [Validators.required]),
      questionId : this.fb.control(null, [Validators.required])
    });
    

  }

  onChange() {
    console.log(this.selectedQuestion);
    console.log(this.selectedResponseType);
    console.log(this.newCRFormGroup.value);    
  }




  HandleSaveChoicesResponse() {
    let choicesResponse:ChoicesResponse = this.newCRFormGroup.value;
    this.responsesService.saveChoicesResponse(choicesResponse).subscribe({
      next : data => {
        this.router.navigateByUrl("/responses");
        this.toastr.success("Choices Response saved !");
      },
      error : err => {
        console.log(err);
        this.toastr.error(err, "Error");
      }
    });
  }

}
