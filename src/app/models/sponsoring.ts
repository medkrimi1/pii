export enum TypePack {
  GOLD = "GOLD",
  SILVER = "SILVER",
  BRONZE = "BRONZE"
}



export class Pack {
  idPack: number;
  typePack: TypePack;
  descritpion: string;
  offreSponsoringSet: {
    idOffre: number;

    description: string;

    prix: string;

    adresseSponsor: string;

    packSet: Pack[];

    user:{
      id: number;
      nom: string;
      prenom: string;
      tel: number;
      email: string;
      password: string;
      role: string;
    };
  }[]

  constructor() {
  }
}

export interface DossierSponsoring {
  idDossier: number;
  description: string;
  titre: string;
  publicCible: string;
  planVisibilite: string;
  optionsPartenariat: string;
  contactCoordonnees: string;
  evenement: {
    idEvent: number;
    nom: string;
    // ... rest of the Evenement properties
  }
  pack_list: Pack[]
}
export class DossierSponsoring {
  idDossier: number;
  description: string;

  titre: string;

  publicCible: string;
  planVisibilite: string;
  optionsPartenariat: string;
  contactCoordonnees: string;
  event: {
    idEvent: number;
    nom: string;
    // ... rest of the Evenement properties
  }
  pack_list: Pack[]
}
