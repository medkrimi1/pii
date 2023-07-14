import { Component, OnInit, TemplateRef } from '@angular/core';
import { OffreFrs } from '../models/offre';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { LogistiqueService } from '../services/logistique.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../services/event.service';
import { OffreService } from '../services/offre.service';
import { Logistique } from '../models/logistique';

@Component({
  selector: 'app-fournisseur-offre-list',
  templateUrl: './fournisseur-offre-list.component.html',
  styleUrls: ['./fournisseur-offre-list.component.scss']
})
export class FournisseurOffreListComponent implements OnInit {
  OffreFrs: OffreFrs = {} as OffreFrs; 
  
  OffreFrss: OffreFrs[];
  searchText: string = '';
  userId:number;
  validationForm: UntypedFormGroup;
  isFormSubmitted: boolean;
  isFormValid: boolean;
  currentUser:User;
  events: Event[];
  selectedLogistiqueId: number; // new property
  logistics: Logistique[]; // new property

  constructor(private OffreService:OffreService, private eventService: EventService, public formBuilder: UntypedFormBuilder,private LogistiqueService: LogistiqueService,private modalService: NgbModal) { }

  ngOnInit(): void {

    
    
    // retrieve the list of logistics from the LogistiqueService
    this.LogistiqueService.getAllLogistiques().subscribe(logistics => {
      this.logistics = logistics;
    });

    this.validationForm = this.formBuilder.group({
      description: ['', Validators.required],
      adresseFrs: ['', Validators.required],
      prix: ['', Validators.required],
      logistique: ['', Validators.required]
    });

    this.userId = Number(localStorage.getItem('userId'));
    this.OffreService.getAllOffre().subscribe(OffreFrss => {
      this.OffreFrss = OffreFrss;
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

  filterOffreFrs(): OffreFrs[] {
    if (!this.searchText) {
      return this.OffreFrss;
    }
    return this.OffreFrss.filter(OffreFrs =>
      Object.values(OffreFrs).join(' ').toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  deleteOffre(id: number) {
    const confirmed = confirm('Are you sure you want to delete this offre?');
    if (confirmed) {
      this.OffreService.deleteOffre(id).subscribe(() => {
    
        this.OffreFrss = this.OffreFrss.filter(OffreFrs => OffreFrs.idOffre !== id);
      });
    }
  }

  openVerticalCenteredModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }

  AddOffre() {
    this.isFormSubmitted = true;
    if (this.validationForm.valid)  {
      this.OffreFrs.createurOffre = this.currentUser;
      this.isFormValid = true;
  
     
      this.LogistiqueService.getLogistiqueById(this.selectedLogistiqueId).subscribe(logistique => {
      
        this.OffreFrs.logistique = logistique;
  
     
        this.OffreService.AddOffre(this.OffreFrs).subscribe((response) => {
          this.isFormSubmitted = false;
          location.reload();
        });
      });
    }
  }
  openUpdateModal(content: TemplateRef<any>, OffreFrs: OffreFrs) {
    // assign the selected offre to the class property
    this.OffreFrs = { ...OffreFrs };
    // open the modal
    this.modalService.open(content, { centered: true }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }
}
