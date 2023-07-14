import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { User } from '../models/user';
import { FileUploadService } from '../file-upload.service';


@Component({
  selector: 'app-add-event-admin',
  templateUrl: './add-event-admin.component.html',
  styleUrls: ['./add-event-admin.component.scss']
})
export class AddEventAdminComponent implements OnInit {

 
  event: Event = new Event();
 validationForm: UntypedFormGroup;
  isFormSubmitted: boolean;
  successMessage: string;
  countdown: number;
  isFormValid: boolean;
  currentUser:User;

  constructor(
    private router: Router,
    private EventService: EventService,
    public formBuilder: UntypedFormBuilder,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {

    this.validationForm = this.formBuilder.group({
      nom: ['', Validators.required],
      lieu: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      typeEvent: ['', Validators.required],
      themeEvent: ['', Validators.required]

   
    });

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    isLoggedIn === 'true';
    if (isLoggedIn === 'true') {
     const userData = localStorage.getItem('currentUser');
     if (userData) {
       this.currentUser = JSON.parse(userData);
     }
     
     
    }
  }

  get form() {
    return this.validationForm.controls;
  }





  AddEvent() {
    this.isFormSubmitted = true;
 
  
      if (this.validationForm.valid)  {
        this.event.createur = this.currentUser;
        this.isFormValid = true;

        this.EventService.addEvent(this.event).subscribe((response) => {
       
            this.successMessage = 'ajout reussite !';
            this.countdown = 5;
            const intervalId = setInterval(() => {
              this.countdown--;
              if (this.countdown === 0) {
                clearInterval(intervalId);
                this.router.navigate(['compte/admin/evenements']);
              }
            }, 1000);
      
          this.isFormSubmitted = false;
        });
      }
   
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fileUploadService.upload(file).subscribe(response => {
      console.log(response);
      // Do something with the response, like store the file path in your event object
      this.event.image = response.path;
    });
}


}
