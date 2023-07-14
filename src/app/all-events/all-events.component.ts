import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.scss']
})
export class AllEventsComponent implements OnInit {

  events : Event[] ;
  filteredEvents : Event[];
  eventTypeFilter : string = '';
  eventThemeFilter : string = '';
  nomFilter = '';
lieuFilter = '';

  constructor(public eventService:EventService) { }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(
      (events: Event[]) => {
        this.events = events;
        this.filteredEvents = events;
      }
    );
  }

  filterEvents() {
    this.filteredEvents = this.events.filter(event => {
      let eventTypeMatch = true;
      let eventThemeMatch = true;
      if (this.eventTypeFilter) {
        eventTypeMatch = event.typeEvent === this.eventTypeFilter;
      }
      if (this.eventThemeFilter) {
        eventThemeMatch = event.themeEvent === this.eventThemeFilter;
      }
      return eventTypeMatch && eventThemeMatch;
    });
  }

  onSubmit() {
    this.filteredEvents = this.events.filter(event => {
      const eventTypeFilterMatch = this.eventTypeFilter ? event.typeEvent === this.eventTypeFilter : true;
      const eventThemeFilterMatch = this.eventThemeFilter ? event.themeEvent === this.eventThemeFilter : true;
      const nomFilterMatch = this.nomFilter ? event.nom.toLowerCase().includes(this.nomFilter.toLowerCase()) : true;
      const lieuFilterMatch = this.lieuFilter ? event.lieu.toLowerCase().includes(this.lieuFilter.toLowerCase()) : true;
      return eventTypeFilterMatch && eventThemeFilterMatch && nomFilterMatch && lieuFilterMatch;
    });
  }
}