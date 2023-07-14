import { Component, OnInit } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events-list-admin',
  templateUrl: './events-list-admin.component.html',
  styleUrls: ['./events-list-admin.component.scss']
})
export class EventsListAdminComponent implements OnInit {
  events: Event[];
  dataTable: DataTable;
  searchText: string = '';
 
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events.reverse() ;
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