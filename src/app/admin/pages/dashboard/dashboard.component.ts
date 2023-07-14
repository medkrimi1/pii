import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/UserService';
import { EventService } from 'src/app/services/event.service';
import { LogistiqueService } from 'src/app/services/logistique.service';
import { SponsoringService } from 'src/app/services/sponsoring.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  preserveWhitespaces: true
})
export class DashboardComponent implements OnInit {
  users : User[] ;
  usersLength:number;
  participantsLength:number;
  fournisseursLength:number;
  organisateursLength:number;
  sponsorsLength:number;
  StaffLength:number;
  EventsLength:number;
  DossierSponsoringLength:number;
  packsLength:number;
  LogistiqueLength:number;

  /**
   * NgbDatepicker
   */
  currentDate: NgbDateStruct;

  constructor(public logistiqueservice : LogistiqueService, public userService:UserService, public EventService:EventService, public DossierSponsoringService:SponsoringService , private router: Router, private calendar: NgbCalendar) {}

  ngOnInit(): void {

   

    this.userService.getUsersLength().subscribe(length => {
      this.usersLength = length;
    });


    this.userService.getParticipantsLength().subscribe(length => {
      this.participantsLength = length;
    });



    this.userService.getFournisseursLength().subscribe(length => {
      this.fournisseursLength = length;
    });


    this.userService.getStaffLength().subscribe(length => {
      this.StaffLength = length;
    });

  


    this.logistiqueservice.getAllLogistiquesLength().subscribe(length => {
      this.LogistiqueLength = length;
    });


    this.userService.getOrganisateursLength().subscribe(length => {
      this.organisateursLength = length;
    });


    this.userService.getSponsorsLength().subscribe(length => {
      this.sponsorsLength = length;
    });

  
    this.EventService.getEventsLength().subscribe(length => {
      this.EventsLength = length;
    });

    this.DossierSponsoringService.getDossierSponsoringLength().subscribe(length => {
      this.DossierSponsoringLength = length;
    });


   


    this.DossierSponsoringService.getPackslength().subscribe(length => {
      this.packsLength = length;
    });
    
  }



    

  

  }


 



