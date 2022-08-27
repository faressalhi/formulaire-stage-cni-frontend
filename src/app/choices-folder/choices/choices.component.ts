import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChoicesService } from 'src/app/services/choices-services/choices.service';
import { Choice } from '../model/choice.model';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.css']
})
export class ChoicesComponent implements OnInit {

  choices! : any;
  errorMessage! : string;

  constructor(private choicesService : ChoicesService, private fb : FormBuilder, private toastr : ToastrService) { }


  ngOnInit(): void {
   this.handleGetChoices();
  }

  handleGetChoices() {
    this.choicesService.getChoices().subscribe({
      next: (data) => {
        this.choices = data;
      },
      error : (err) => {
        this.errorMessage = err.message;
      }
    });  
  }


  handleDeleteChoice(c: Choice) {
    let conf = confirm("Are u sure ?");
    if (!conf) return;
    this.choicesService.deleteChoice(c.idC).subscribe({
      next : data => {
        this.handleGetChoices();
        this.toastr.success("Choice deleted successfully !", "Success");
      },
      error : err => {
        this.toastr.error(err, "Error");
      }
    });
  }


}
