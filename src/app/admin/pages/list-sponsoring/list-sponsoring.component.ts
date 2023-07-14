import {AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { DataTable } from 'simple-datatables';
import {DossierSponsoring, Pack, TypePack} from 'src/app/models/sponsoring';
import { SponsoringService } from 'src/app/services/sponsoring.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {Event} from "../../../models/event";
import {Router} from "@angular/router";
import { MessagesModalService } from 'src/app/messages-modal.service';



@Component({
  selector: 'app-list-sponsoring',
  templateUrl: './list-sponsoring.component.html',
  styleUrls: ['./list-sponsoring.component.scss']
})
export class ListSponsoringComponent implements OnInit {
  selectedEventId: any;
  isFormValid: boolean;
  typePackOptions: string[] = Object.values(TypePack);
  DossierSponsorings: DossierSponsoring[] ;
  validationForm:FormGroup;
  sponsoring: DossierSponsoring = new DossierSponsoring();

  isFormSubmitted: boolean;
  successMessage: string;
  countdown: number;
  events: Event[];

  dataTable: DataTable;
  selectedSponsoring: DossierSponsoring;

  constructor(public sponsoringService:SponsoringService,
              private router: Router,
              private modalService: NgbModal,
              public formBuilder: FormBuilder,
              private eventService: EventService,
              private SponsoringService: SponsoringService,
              private cd: ChangeDetectorRef,
              private messageService: MessagesModalService
  ) { }



  ngOnInit(): void {
    this.sponsoringService.getAllDossierSponsoring().subscribe(
      (DossierSponsorings: DossierSponsoring[]) => {
        this.DossierSponsorings = DossierSponsorings;
      }
    );

    this.validationForm = this.formBuilder.group({
      description: ["", Validators.required],
      titre: ["", Validators.required],
      eventId: ["", Validators.required],
      contactCoordonnees: ["", Validators.required],
      optionsPartenariat: ["", Validators.required],
      planVisibilite: ["", Validators.required],
      publicCible: ["", Validators.required],
      packs: this.formBuilder.array([])
    });




    this.eventService.getAllEvents().subscribe(events => {
      this.events = events.reverse();
    });


  }

  modifyFolder(value: any) {
    this.isFormSubmitted = true;


    this.isFormValid = true;

    const event = new Event();
    event.idEvent = value.eventId;
    this.sponsoring.evenement = event;


    this.sponsoring.pack_list = value.packs;

    this.sponsoring.titre = value.titre;
    this.sponsoring.description = value.description;
    this.sponsoring.contactCoordonnees = value.contactCoordonnees;
    this.sponsoring.optionsPartenariat= value.optionsPartenariat;
    this.sponsoring.planVisibilite = value.planVisibilite;
    this.sponsoring.publicCible = value.publicCible;
    this.sponsoring.idDossier = this.selectedSponsoring.idDossier;



    this.SponsoringService.addDossier(this.sponsoring).subscribe((response) => {

      this.successMessage = 'ajout reussite !';
      this.countdown = 5;
      const intervalId = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(intervalId);
          this.router.navigate(['compte/admin/sponsoring']);
        }
      }, 1000);

      this.isFormSubmitted = false;
      this.modalService.dismissAll();
      this.sponsoringService.getAllDossierSponsoring().subscribe(
        (DossierSponsorings: DossierSponsoring[]) => {
          this.DossierSponsorings = DossierSponsorings;
        });
    });
    this.messageService.toastSuccess("Dossier modifier avec succées")




  }

  addPacksField() {
    this.packsGetter.push(this.formBuilder.group({
      idPack: [" ", null],
      typePack: [" ", null],
      descritpion: [" " , null]
    }))
  }

  buildPacks(pack: { idPack: number | null; typePack: TypePack | null; descritpion: string | null} []=[] ) {
    return this.formBuilder.array(pack.map(e => this.formBuilder.group(e)));
  }

  get packsGetter(): FormArray {
    return this.validationForm.get('packs') as FormArray;
  }

  selectItem(sponsoring: DossierSponsoring, content: TemplateRef<any>) {
    this.selectedSponsoring = sponsoring;
    this.modalService.open(content , {size : 'lg'});
  }

  closeAndOpenModal2(modal2: TemplateRef<any>) {
    this.modalService.dismissAll(); // Ferme le modal actuel
    this.packsGetter.clear();
    this.modalService.open(modal2, { size: "lg" });
    // @ts-ignore
    this.validationForm.get("description").value = this.selectedSponsoring.description;

    // @ts-ignore
    this.validationForm.get("titre").value = this.selectedSponsoring.titre;

    // @ts-ignore
    this.validationForm.get("eventId").value = this.selectedSponsoring?.evenement?.idEvent;



    // @ts-ignore
    this.validationForm.get("optionsPartenariat").value = this.selectedSponsoring.optionsPartenariat;


    // @ts-ignore
    this.validationForm.get("contactCoordonnees").value = this.selectedSponsoring.contactCoordonnees;

    // @ts-ignore
    this.validationForm.get("publicCible").value = this.selectedSponsoring.publicCible;

    // @ts-ignore
    this.validationForm.get("planVisibilite").value = this.selectedSponsoring.planVisibilite;


    this.selectedSponsoring.pack_list.map(e => this.packsGetter.push(this.formBuilder.group({
      idPack: [e.idPack, null],
      typePack: [e.typePack , null],
      descritpion: [e.descritpion , null]
    })))
    this.cd.detectChanges();



  }

  removePackField(index: number): void {
    if (index != 0)
      this.packsGetter.removeAt(index);

  }
}
