import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Participation } from '../models/participation';

@Component({
  selector: 'app-participation-list',
  templateUrl: './participation-list.component.html',
  styleUrls: ['./participation-list.component.scss']
})
export class ParticipationListComponent implements OnInit {
  participations: Participation[] = [];
  userId: number;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));

    this.eventService.getParticipationByUserId(this.userId).subscribe(participations => {
      this.participations = participations.reverse();
    });
  }
}