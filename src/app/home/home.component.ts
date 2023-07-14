import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/UserService';
import { User } from '../models/user';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';
import { LogistiqueService } from '../services/logistique.service';
import { Logistique } from '../models/logistique';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events:Event[];
  currentUser:User;

 

  @ViewChild('Events') EventsBloc: ElementRef;

  @ViewChild('Contact') Contact: ElementRef;

  scrollToEvents() {
    this.EventsBloc.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToContact() {
    this.Contact.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  @ViewChild('Services') ServicesBloc: ElementRef;

  scrollToServices() {
    this.ServicesBloc.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  isScrolled = false;
 
  users : User[] ;
  logistiques : Logistique[];
  constructor(public LogistiqueService: LogistiqueService,  public userService:UserService,public eventService:EventService) { }

  ngOnInit(): void {

  
  
    
   

    this.LogistiqueService.getAllLogistiques().subscribe(logistiques => {
      this.logistiques = logistiques;
      console.log(this.logistiques);
      
     
    });

    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );


    this.eventService.getAllEvents().subscribe(events => {
      this.events = events.reverse(); // Reverse the order and limit to 6 records
      console.log(this.events);
    });

 
    
  
  }
  public isBasicExampleMenuCollapsed = true;
  images = ['assets/images/cover3.jpg','assets/images/cover2.jpg','assets/images/cover1.jpg'];


  
}
