import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/user';
import { MessagesModalService } from '../messages-modal.service';
import { SponsoringService } from '../services/sponsoring.service';
import { DossierSponsoring, Pack } from '../models/sponsoring';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
  eventId: number;
  userId: number;
  isLoggedIn:boolean;
  currentUser:User;
  dossier: DossierSponsoring;
  
  event:Event;
  constructor(private route: ActivatedRoute,
              private EventService:EventService, private router: Router,private modalService: NgbModal,
            
              private sponsoringService: SponsoringService,
              public messageService: MessagesModalService) {

  }
  participated: boolean = false;



cancelParticipation() {
  const userId = localStorage.getItem('userId');
  if (userId) {
    this.EventService.removeUserFromEvent(
      Number(userId),
      this.eventId
    ).subscribe(() => {
      console.log('User removed from event');
      this.participated = false;
    });
  }
  location.reload();
}



ngOnInit(): void {
  
 
 
  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    this.eventId = parseInt(idParam);
    this.EventService.getEventById(this.eventId).subscribe(
      event => {
        if (event) {
          this.event = event;
          this.checkParticipation();
        } else {
          this.router.navigate(['/']); 
        }
      },
      error => {
        console.log(error);
        this.router.navigate(['/']); 
      }
    );
  } else {
    this.router.navigate(['/']); 
  }
  this.sponsoringService.findByEventId(this.eventId).subscribe(e =>  this.dossier = e );

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  isLoggedIn === 'true';
  if (isLoggedIn === 'true') {
   const userData = localStorage.getItem('currentUser');
   if (userData) {
     this.currentUser = JSON.parse(userData);
   }
   
   
  }
}



checkParticipation(): void {
  
  const userId = localStorage.getItem('userId');
  if (userId) {
    this.EventService.getParticipationByUserId(Number(userId)).subscribe(
      participations => {
        this.participated = participations.some(participation => participation.evenement.idEvent === this.eventId);
      },
      error => {
        console.log(error);
      }
    );
  }
}

  

  public isBasicExampleMenuCollapsed = true;

  addParticipation() {
    const userId = localStorage.getItem('userId');
  
    if (userId) {
      this.EventService.addUserToEvent(
        Number(userId), 
        this.eventId
      ).subscribe(() => {
     
      });
    } 
    location.reload();   
  }


  openVerticalCenteredModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }


  closeAndOpenModal(modal2: any) {
    this.modalService.dismissAll();
    this.modalService.open(modal2, {size: 'lg'})
  }


  create(value: any) {
    let userId = localStorage.getItem("userId");
    let user = new User();
    user.id = Number(userId);
    value.user = user;
    let pack = new Pack();
    pack.idPack = value.idPack;
    value.pack= pack;
    let dossier = new DossierSponsoring();
    dossier.idDossier = this.dossier.idDossier;
    value.dossierSponsoring = dossier;
    this.sponsoringService.creationDossierSponsoring(value).subscribe(e => {
      this.messageService.toastSuccess("offre ajouté avec succées");
      this.modalService.dismissAll();
      }, error => {
      this.messageService.toastError("l'offre n'est pas ajouté");
      }
    );

  }
  openLg(content:any) {
    this.modalService.open(content, { size: 'lg' });
  }


}
