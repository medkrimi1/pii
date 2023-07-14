import { User } from "./user";
import { Participation } from "./participation";
import { Logistique } from "./logistique";

export class Event {
    idEvent: number;
    nom: string;
    date: Date;
    lieu: string;
    description: string;
    typeEvent: TypeEvent;
    themeEvent: ThemeEvent;
    possibiliteStaff: boolean;
    horaireStaff: number;
    lienAcces: string;
    image: Blob;
    dossier: DossierSponsoring;
    logistique: Logistique;
    createur: User;
    participations: Participation[];
  }
  
  export enum TypeEvent {
    Presentiel = 'Presentiel',
    Hybride = 'Hybride',
    Virtuel = 'Virtuel',
    
  }
  
  export enum ThemeEvent {
    Sportif = 'Sportif',
    Culturel = 'Culturel',
    Gaming = 'Gaming',
    Fashion = 'Fashion',
    It = 'It',
    Culinaire = 'Culinaire',


  }
  
  export interface DossierSponsoring {
   
  }


 