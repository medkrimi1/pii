
import { Logistique } from "./logistique";
import { User } from "./user";

export class OffreFrs {
    idOffre: number;
    description: string;
    prix: number;
    adresseFrs: string;
    logistique: Logistique;
    createurOffre: User;
  }
  
 