import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Observable, map } from 'rxjs';
import { Participation } from '../models/participation';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('http://localhost:9090/evenement/getAll');
}


getEventsLength(): Observable<number> {
  return this.http.get<Event[]>('http://localhost:9090/evenement/getAll').pipe(
    map(Events => Events.length)
  );
}

getEventById(id: number): Observable<Event> {
  return this.http.get<Event>('http://localhost:9090/evenement/'+id);
}


addEvent(event: Event): Observable<any> {
  return this.http.post<any>('http://localhost:9090/evenement/addEvent', event);
}


addUserToEvent(userId: number, eventId: number) {
  return this.http.post<any>(
    `http://localhost:9090/evenement/participation/`,  
    null,
    {
      params: {
        userId,
        eventId
      }
    } 
  );
}

getParticipationByUserId(userId: number): Observable<Participation[]> {
  return this.http.get<Participation[]>(`http://localhost:9090/evenement/participation/${userId}`);
}


removeUserFromEvent(userId: number, eventId: number): Observable<any> {
  return this.http.delete(`http://localhost:9090/evenement/participation/${eventId}/${userId}`);
}


deleteEventById(id: number): Observable<any> {
  return this.http.delete<any>(`http://localhost:9090/evenement/${id}`);
}


updateEvent(id: number, event: Event): Observable<any> {
  return this.http.put<any>(`http://localhost:9090/evenement/UpdateEvent`, event);
}
}
