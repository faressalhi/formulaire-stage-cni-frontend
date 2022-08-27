import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question } from '../../questions-folder/model/question.model';
import { QuestionsService } from '../../services/questions-services/questions.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {

  newQuestionFormGroup! : FormGroup;

  constructor(private fb : FormBuilder, private questionsService : QuestionsService
    , private router : Router, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.newQuestionFormGroup = this.fb.group({
      contentQ : this.fb.control(null, [Validators.required]),
      ordreQ : this.fb.control(null, [Validators.required])
    });
  }

  handleSaveQuestion() {
    let question:Question = this.newQuestionFormGroup.value;
    this.questionsService.saveQuestion(question).subscribe({
      next : data => {
        this.router.navigateByUrl("/questions");
        this.toastr.success("Question saved successfully!", "Success");
      },
      error : err => {
        this.toastr.error(err, "Error");
      }
    });
  }



}
 