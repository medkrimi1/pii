import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';

@Component({
  selector: 'app-organisateur-event-list',
  templateUrl: './organisateur-event-list.component.html',
  styleUrls: ['./organisateur-event-list.component.scss']
})
export class OrganisateurEventListComponent implements OnInit {

  events: Event[];

  searchText: string = '';
  userId: number;
 
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events
        .filter(event => event.createur.id === this.userId)
        .reverse();
      console.log(this.events);
    });
  }
  

  filterEvents(): Event[] {
    if (!this.searchText) {
      return this.events;
    }
    return this.events.filter(event =>
      Object.values(event).join(' ').toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  deleteEvent(id: number) {
    const confirmed = confirm('Are you sure you want to delete this event?');
    if (confirmed) {
      this.eventService.deleteEventById(id).subscribe(() => {
        // remove the deleted event from the array of events
        this.events = this.events.filter(event => event.idEvent !== id);
      });
    }
  }
}
