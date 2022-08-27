import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChoicesService } from 'src/app/services/choices-services/choices.service';
import { ResponsesService } from 'src/app/services/responses-services/responses.service';
import { Choice } from '../model/choice.model';

@Component({
  selector: 'app-edit-choice',
  templateUrl: './edit-choice.component.html',
  styleUrls: ['./edit-choice.component.css']
})
export class EditChoiceComponent implements OnInit {

  responses! : Array<any>;
  selectedResponse! : string;
  choiceId! : any;
  choice! : Choice;
  editChoiceFormGroup! : FormGroup;


  constructor(private fb : FormBuilder, private choicesService : ChoicesService
    , private router : Router, private activatedRoute : ActivatedRoute
    , private toastr : ToastrService, private responsesService : ResponsesService) { }

  ngOnInit(): void {

    this.editChoiceFormGroup = this.fb.group({
      idC : this.fb.control({value: null, disabled: true}),
      contentC : this.fb.control(null),
      scoreC : this.fb.control(null),
      choicesResponseId : this.fb.control(null)
    });


    this.choiceId = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(this.choiceId);
    

    this.responsesService.getResponses().subscribe({
      next : data => {
        this.responses = data.filter(resp => resp.type === "ChoicesResponse");
        console.log(this.responses);
      }, 
      error : err => {
        this.toastr.error(err, "Error");
      }
    });

    
    this.choicesService.getChoice(this.choiceId).subscribe({
      next : (data) => {
        this.choice = data;
        
        if(this.choice != null) {
          this.editChoiceFormGroup.patchValue({
            idC : this.choiceId,
            contentC : this.choice.contentC,
            scoreC : this.choice.scoreC
          })
        }

      },
      error : err => {
        this.toastr.error(err, "Error");
      }
    });
  
  }

  onChange() {
    console.log(this.selectedResponse);
  }


  handleEditChoice() {
    
    let choice:any = this.editChoiceFormGroup.value;
    choice.idC = this.choiceId;
    console.log(choice.idC);
    console.log(choice.contentC);
    this.choicesService.updateChoice(choice).subscribe({
      next : data => {
        this.router.navigateByUrl("/choices");
        this.toastr.success("Choice updated successfully !");
      },
      error : err => {
        this.toastr.error(err, "Error");
      }
    });
  }

}
