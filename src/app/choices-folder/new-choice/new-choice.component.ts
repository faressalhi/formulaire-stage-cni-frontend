import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChoicesService } from 'src/app/services/choices-services/choices.service';
import { ResponsesService } from 'src/app/services/responses-services/responses.service';
import { Choice } from '../model/choice.model';

@Component({
  selector: 'app-new-choice',
  templateUrl: './new-choice.component.html',
  styleUrls: ['./new-choice.component.css']
})
export class NewChoiceComponent implements OnInit {

  newChoiceFormGroup! : FormGroup;
  responses! : Array<any>; 
  selectedResponse! : string;
  selectedResponseType! : string;
  
  constructor(private fb : FormBuilder, private choicesService : ChoicesService
    , private router : Router, private toastr : ToastrService
    , private responsesService : ResponsesService) { }

  ngOnInit(): void {

   // console.log(this.simpleResponseType);
    
    
    this.responsesService.getResponses().subscribe({
      next : data => {
        this.responses = data.filter(resp => resp.type==="ChoicesResponse");
        console.log(this.responses);
      }, 
      error : err => {
        this.toastr.error(err, "Error");
      }
    });

    this.newChoiceFormGroup = this.fb.group({
      contentC : this.fb.control(null, [Validators.required]),
      scoreC : this.fb.control(null, [Validators.required]),
      choicesResponseId : this.fb.control(null, [Validators.required])
    });
    

  }

  onChange() {
    console.log(this.selectedResponse);
    console.log(this.selectedResponseType);
    console.log(this.newChoiceFormGroup.value);    
  }




  HandleSaveChoice() {
    let choice:Choice = this.newChoiceFormGroup.value;
    this.choicesService.saveChoice(choice).subscribe({
      next : data => {
        this.router.navigateByUrl("/choices");
        this.toastr.success("Choice saved successfully!", "Success");
      },
      error : err => {
        console.log(err);
        this.toastr.error(err, "Error");
      }
    });
  }


}
