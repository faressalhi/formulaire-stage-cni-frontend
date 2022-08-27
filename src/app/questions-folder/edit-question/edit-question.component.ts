import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question } from '../../questions-folder/model/question.model';
import { QuestionsService } from '../../services/questions-services/questions.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  questionId! : any;
  question! : Question;
  editQuestionFormGroup! : FormGroup;


  constructor(private fb : FormBuilder, private questionsService : QuestionsService, private router : Router, private activatedRoute : ActivatedRoute, private toastr : ToastrService) { }

  ngOnInit(): void {

    this.editQuestionFormGroup = this.fb.group({
      idQ : this.fb.control({value: null, disabled: true}),
      contentQ : this.fb.control(null, [Validators.required]),
      ordreQ : this.fb.control(null, [Validators.required])
    });


    this.questionId = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(this.questionId);
    
    this.questionsService.getQuestion(this.questionId).subscribe({
      next : (data) => {
        this.question = data;
        
        if(this.question != null) {
          this.editQuestionFormGroup.patchValue({
            idQ : this.questionId,
            contentQ : this.question.contentQ,
            ordreQ : this.question.ordreQ
          })
        }

      },
      error : err => {
        alert("error getting question : \n error : "+err.message);
      }
    });
  
  }


  handleEditQuestion() {
    
    let question:Question = this.editQuestionFormGroup.value;
    question.idQ = this.questionId;
    console.log(question.idQ);
    console.log(question.contentQ);
    this.questionsService.updateQuestion(question).subscribe({
      next : data => {
        this.router.navigateByUrl("/questions");
        this.toastr.success("Question updated successfully !");
      },
      error : err => {
        this.toastr.error(err, "Error");
      }
    });
  }

  
}
