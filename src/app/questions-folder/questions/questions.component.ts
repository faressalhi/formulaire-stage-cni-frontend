import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuestionsService } from '../../services/questions-services/questions.service';
import { Question } from '../../questions-folder/model/question.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questions! : any;
  errorMessage! : string;

  constructor(private questionService : QuestionsService, private fb : FormBuilder, private toastr : ToastrService) { }


  ngOnInit(): void {
   this.handleGetQuestions();
  }

  handleGetQuestions() {
    this.questionService.getQuestions().subscribe({
      next: (data) => {
        this.questions = data;
      },
      error : (err) => {
        this.errorMessage = err.message;
      }
    });  
  }

  handleEditQuestion(q: Question) {
    
  }

  handleDeleteQuestion(q: Question) {
    let conf = confirm("Are u sure ?");
    if (!conf) return;
    this.questionService.deleteQuestion(q.idQ).subscribe({
      next : data => {
        this.handleGetQuestions();
        this.toastr.success("Question deleted successfully !", "Success");
      },
      error : err => {
        this.toastr.error(err, "Error");
      }
    });
  }



}
