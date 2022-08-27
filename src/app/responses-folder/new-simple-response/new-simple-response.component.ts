import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/questions-folder/model/question.model';
import { QuestionsService } from 'src/app/services/questions-services/questions.service';
import { ResponsesService } from 'src/app/services/responses-services/responses.service';
import { SimpleResponse } from '../model/simple-response.model';
import { NgModel } from '@angular/forms';
import { SimpleResponseType } from '../model/EnumTypes.model';

@Component({
  selector: 'app-new-simple-response',
  templateUrl: './new-simple-response.component.html',
  styleUrls: ['./new-simple-response.component.css']
})
export class NewSimpleResponseComponent implements OnInit {

  newSRFormGroup! : FormGroup;
  questions! : Array<Question>; 
  selectedQuestion! : string;
  selectedResponseType! : string;
  simpleResponseType = SimpleResponseType;
  srtvalues : any;
  
  constructor(private fb : FormBuilder, private responsesService : ResponsesService
    , private router : Router, private toastr : ToastrService
    , private questionsService : QuestionsService) { }

  ngOnInit(): void {

    console.log(this.simpleResponseType);
    
    this.srtvalues = Object.values(this.simpleResponseType).filter(value => typeof value === 'string') as string[];
    
    this.questionsService.getQuestions().subscribe({
      next : data => {
        this.questions = data;
        console.log(this.questions);
      }, 
      error : err => {
        this.toastr.error(err, "Error");
      }
    });

    this.newSRFormGroup = this.fb.group({
      simpleResponseType : this.fb.control(null, [Validators.required]),
      questionId : this.fb.control(null, [Validators.required])
    });
    

  }

  onChange() {
    console.log(this.selectedQuestion);
    console.log(this.selectedResponseType);
    console.log(this.newSRFormGroup.value);    
  }




  HandleSaveSimpleResponse() {
    let simpleResponse:SimpleResponse = this.newSRFormGroup.value;
    this.responsesService.saveSimpleResponse(simpleResponse).subscribe({
      next : data => {
        this.router.navigateByUrl("/responses");
        this.toastr.success("Simple Response saved !");
      },
      error : err => {
        console.log(err);
        this.toastr.error(err, "Error");
      }
    });
  }



}
