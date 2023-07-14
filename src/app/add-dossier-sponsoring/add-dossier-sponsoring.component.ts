import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  ɵFormGroupValue,
  ɵTypedOrUntyped
} from "@angular/forms";

import {DossierSponsoring, Pack, TypePack} from 'src/app/models/sponsoring';
import {SponsoringService} from "../services/sponsoring.service";
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';
import { MessagesModalService } from '../messages-modal.service';




@Component({
  selector: 'app-add-dossier-sponsoring',
  templateUrl: './add-dossier-sponsoring.component.html',
  styleUrls: ['./add-dossier-sponsoring.component.scss']
})
export class AddDossierSponsoringComponent implements OnInit {
  selectedEventId: any;

  typePackOptions: string[] = Object.values(TypePack);

  packSections: any[] = [];

  sponsoring: DossierSponsoring = new DossierSponsoring();
  validationForm: FormGroup;
  isFormSubmitted: boolean;
  successMessage: string;
  countdown: number;
  isFormValid: boolean;
  events: Event[];
  packs: Pack[] = [];


  constructor(
    private router: Router,
    private SponsoringService: SponsoringService,
    private eventService: EventService,
    public formBuilder: UntypedFormBuilder,
    public messageService: MessagesModalService) {

  }

  ngOnInit(): void {

    this.validationForm = this.formBuilder.group({
      description: ['', Validators.required],
      titre: ['', Validators.required],
      eventId: ['', Validators.required],
      contactCoordonnees: ['', Validators.required],
      optionsPartenariat: ['', Validators.required],
      planVisibilite: ['', Validators.required],
      publicCible: ['', Validators.required],
      packs: this.buildPacks([{idPack: null, typePack: null, descritpion: null}])

    });


    this.eventService.getAllEvents().subscribe(events => {
      this.events = events.reverse();
      console.log(this.events);


    });


  }


  get form() {
    return this.validationForm.controls;
  }

  // addPackSection() {
  //   const newPackSection = {
  //     description: '',
  //     typePack: ''
  //   };
  //   this.packSections.push(newPackSection);
  // }


  addPacksField() {
    this.packsGetter.push(this.formBuilder.group({
      idPack: [" "],
      typePack: [" "],
      descritpion: [" "]
    }))
  }


  buildPacks(pack: { idPack: number | null; typePack: TypePack | null; descritpion: string | null } [] = []) {
    return this.formBuilder.array(pack.map(e => this.formBuilder.group(e)));
  }


  removePackSection(index: number) {
    this.packSections.splice(index, 1);
  }


  get packsGetter(): FormArray {
    return this.validationForm.get('packs') as FormArray;
  }


  removePackField(index: number): void {
    if (index != 0)
      this.packsGetter.removeAt(index);
  }

  AddDossier(value: any) {

    this.isFormSubmitted = true;


    if (this.validationForm.valid) {
      this.isFormValid = true;

      const event = new Event();
      event.idEvent = value.eventId;
      this.sponsoring.evenement = event;


      this.sponsoring.pack_list = [];

      value.packs.map((e: Pack) => {
        let pack = new Pack();
        pack = e;
        this.sponsoring.pack_list.push(pack)

      })


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

        this.messageService.toastSuccess("Dossier ajouté avec succées");
      }, error => this.messageService.toastError("Dossier n'est pas modifié"));
    }
  }
}
