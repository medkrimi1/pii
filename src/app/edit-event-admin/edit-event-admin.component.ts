import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';

@Component({
  selector: 'app-edit-event-admin',
  templateUrl: './edit-event-admin.component.html',
  styleUrls: ['./edit-event-admin.component.scss']
})
export class EditEventAdminComponent implements OnInit {

  validationForm: UntypedFormGroup;
  isFormSubmitted: boolean;
  successMessage: string | null = null;
  countdown: number;
  isFormValid: boolean;
  currentEvent: Event;
  event:Event;

  constructor(
    private router: Router,
    private eventService: EventService,
    private route: ActivatedRoute,
    public formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    this.eventService.getEventById(Number(eventId)).subscribe((event) => {
      this.currentEvent = event;
      this.validationForm = this.formBuilder.group({
        nom: [event.nom, Validators.required],
        lieu: [event.lieu, Validators.required],
        date: [event.date, Validators.required],
        description: [event.description, Validators.required],
        typeEvent: [event.typeEvent, Validators.required],
        themeEvent: [event.themeEvent, Validators.required]
      });
    });
  }

  get form() {
    return this.validationForm.controls;
  }

  updateEvent() {
    this.successMessage = null;
    this.isFormSubmitted = true;

    if (this.validationForm.valid) {
      this.isFormValid = true;

      // Update the current event with the form values
      this.currentEvent.nom = this.form.nom.value;
      this.currentEvent.lieu = this.form.lieu.value;
      this.currentEvent.date = this.form.date.value;
      this.currentEvent.description = this.form.description.value;
      this.currentEvent.typeEvent = this.form.typeEvent.value;
      this.currentEvent.themeEvent = this.form.themeEvent.value;

      this.eventService.updateEvent(this.currentEvent.idEvent, this.currentEvent).subscribe((response) => {
        this.successMessage = 'L\'événement a été mis à jour avec succès!';
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

  hideSuccessMessage() {
    // Set the success message to null after 5 seconds
    this.successMessage = null;
  }

  cancel() {
    this.router.navigate(['compte/admin/evenements']);
  }


}
