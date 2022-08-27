import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponsesService } from 'src/app/services/responses-services/responses.service';
import { ChoicesResponse } from '../model/choices-response.model';
import { SimpleResponse } from '../model/simple-response.model';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {

  responses! : any;
  errorMessage! : string;

  constructor(private responsesService : ResponsesService, private fb : FormBuilder, private toastr : ToastrService) { }


  ngOnInit(): void {
   this.handleGetResponses();
  }

  handleGetResponses() {
    this.responsesService.getResponses().subscribe({
      next: (data) => {
        this.responses = data;
      },
      error : (err) => {
        this.errorMessage = err.message;
        this.toastr.error(err, "Error");

      }
    });  
  }

  handleDeleteResponse(r : SimpleResponse | ChoicesResponse) {
    let conf = confirm("Are u sure ?");
    if (!conf) return;
    this.responsesService.deleteResponse(r.idR).subscribe({
      next : data => {
        this.handleGetResponses();
        this.toastr.success("Response deleted !", "Success");
      },
      error : err => {
        console.log(err);
        this.toastr.error(err, "Error");
      }
    });
  }
}
