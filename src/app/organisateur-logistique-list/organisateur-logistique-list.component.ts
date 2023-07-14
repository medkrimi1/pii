import { Component, OnInit, TemplateRef } from '@angular/core';
import { LogistiqueService } from '../services/logistique.service';
import { Logistique } from '../models/logistique';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';

@Component({
  selector: 'app-organisateur-logistique-list',
  templateUrl: './organisateur-logistique-list.component.html',
  styleUrls: ['./organisateur-logistique-list.component.scss']
})
export class OrganisateurLogistiqueListComponent implements OnInit {

  logistique: Logistique = new Logistique();
  logistiques: Logistique[];
  searchText: string = '';
  userId:number;
  validationForm: UntypedFormGroup;
  isFormSubmitted: boolean;
  isFormValid: boolean;
  currentUser:User;
  events: Event[];
  eventss: Event[];
  selectedEventId: number; // new property

 

  constructor(private eventService: EventService, public formBuilder: UntypedFormBuilder,private LogistiqueService: LogistiqueService,private modalService: NgbModal) { }

  ngOnInit(): void {

    this.eventService.getAllEvents().subscribe(events => {
      this.eventss = events;
    });
    
    this.validationForm = this.formBuilder.group({
      description: ['', Validators.required],
      evenement: ['', Validators.required]
     
  
    });
   

    this.userId = Number(localStorage.getItem('userId'));
    this.LogistiqueService.getAllLogistiques().subscribe(logistiques => {
      this.logistiques = logistiques;
      console.log(this.logistiques);
      
     
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



  filterLogistiques(): Logistique[] {
    if (!this.searchText) {
      return this.logistiques;
    }
    return this.logistiques.filter(logistique =>
      Object.values(logistique).join(' ').toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


  deleteLogistique(id: number) {
    const confirmed = confirm('Are you sure you want to delete this logistique?');
    if (confirmed) {
      this.LogistiqueService.deleteLogistiqueById(id).subscribe(() => {
        // remove the deleted event from the array of events
        this.logistiques = this.logistiques.filter(Logistique => Logistique.idLogistique !== id);
      });
    }
  }


  openVerticalCenteredModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }

  AddLogistique() {
    this.isFormSubmitted = true;
 
  
      if (this.validationForm.valid)  {
        this.logistique.createurLogistique = this.currentUser;
        this.isFormValid = true;

     



        this.eventService.getEventById(this.selectedEventId).subscribe(Event => {
      
          this.logistique.evenement = Event;
    
       
          this.LogistiqueService.addLogistique(this.logistique).subscribe((response) => {
            this.isFormSubmitted = false;
            location.reload();
          });
        });
        location.reload();
      }

      
   
  }
  
}
