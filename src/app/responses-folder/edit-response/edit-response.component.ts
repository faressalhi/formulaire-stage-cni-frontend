import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionsService } from 'src/app/services/questions-services/questions.service';
import { ResponsesService } from 'src/app/services/responses-services/responses.service';
import { ChoicesResponse } from '../model/choices-response.model';
import { ChoicesResponseType, SimpleResponseType } from '../model/EnumTypes.model';
import { SimpleResponse } from '../model/simple-response.model';

@Component({
  selector: 'app-edit-response',
  templateUrl: './edit-response.component.html',
  styleUrls: ['./edit-response.component.css']
})
export class EditResponseComponent implements OnInit {

  isSimpleResponse! : boolean;
  questions! : Array<any>;
  selectedResponse! : string;
  responseId! : any;
  response! : any;
  editSimpleResponseFormGroup! : FormGroup;
  editChoicesResponseFormGroup! : FormGroup;
  responseReceived! : any;
  choicesResponseType = ChoicesResponseType;
  simpleResponseType = SimpleResponseType;
  srtvalues! : any;
  crtvalues! : any;
  selectedResponseType! : string;


  constructor(private fb : FormBuilder, private responsesService : ResponsesService
    , private router : Router, private activatedRoute : ActivatedRoute
    , private toastr : ToastrService, private questionsService : QuestionsService) { }

  ngOnInit(): void {

    this.srtvalues = Object.values(this.simpleResponseType).filter(value => typeof value === 'string') as string[];
    this.crtvalues = Object.values(this.choicesResponseType).filter(value => typeof value === 'string') as string[];


    this.questionsService.getQuestions().subscribe({
      next : data => {
        this.questions = data;
        console.log(this.questions);

      },
      error : err => {
        this.toastr.error(err, "Error");
      }
    })
    

    this.editSimpleResponseFormGroup = this.fb.group({
      idR : this.fb.control({value: null, disabled: true}),
      simpleResponseType : this.fb.control(null),
      questionId : this.fb.control(null)
    });

    this.editChoicesResponseFormGroup = this.fb.group({
      idR : this.fb.control({value: null, disabled: true}),
      choicesResponseType : this.fb.control(null),
      questionId : this.fb.control(null)
    });


    this.responseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.responsesService.getResponse(this.responseId).subscribe({
      next : data => {
        this.responseReceived = data;






        console.log(this.responseReceived);
    
        if (this.responseReceived.simpleResponseType != null) {
          this.isSimpleResponse = true;
          this.editSimpleResponseFormGroup.patchValue({
            idR : this.responseId,
            simpleResponseType : this.responseReceived.simpleResponseType,
            questionId : this.responseReceived.questionId
          })
    
        }
        else {
          this.isSimpleResponse = false;
          this.editChoicesResponseFormGroup.patchValue({
            idR : this.responseId,
            choicesResponseType : this.responseReceived.choicesResponseType,
            questionId : this.responseReceived.questionId
          })
    
    
        }



      }, 
      error : err => {
        this.toastr.error(err, "Error");
      }
    })

  
  }

  onChange() {
    console.log(this.selectedResponseType);
  }


  handleEditSimpleResponse() {
    
    let response:any = this.editSimpleResponseFormGroup.value;
    response.idR = this.responseId;
    this.responsesService.updateSimpleResponse(response).subscribe({
      next : data => {
        this.router.navigateByUrl("/responses");
        this.toastr.success("Simple Response updated successfully !");
      },
      error : err => {
        this.toastr.error(err, "Error");
      }
    });
  }

  handleEditChoicesResponse() {
    
    let response:any = this.editChoicesResponseFormGroup.value;
    response.idR = this.responseId;
    this.responsesService.updateChoicesResponse(response).subscribe({
      next : data => {
        this.router.navigateByUrl("/responses");
        this.toastr.success("Choices Response updated successfully !");
      },
      error : err => {
        this.toastr.error(err, "Error");
      }
    });
  }

  

}
