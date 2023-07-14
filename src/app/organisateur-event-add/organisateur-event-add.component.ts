import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { Event } from '../models/event';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-organisateur-event-add',
  templateUrl: './organisateur-event-add.component.html',
  styleUrls: ['./organisateur-event-add.component.scss']
})
export class OrganisateurEventAddComponent implements OnInit {

 
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
    public formBuilder: UntypedFormBuilder
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
                this.router.navigate(['mon-compte/evenements']);
              }
            }, 1000);
      
          this.isFormSubmitted = false;
        });
      }
   
  }

}
