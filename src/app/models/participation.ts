import { User } from "./user";
import { Event } from "./event";

export class Participation {
  idparticipation: number;
  date: Date;
  utilisateur: User;
  evenement: Event;
}