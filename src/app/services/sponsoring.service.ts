import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DossierSponsoring } from '../models/sponsoring';
import {Event} from "../models/event";

@Injectable({
  providedIn: 'root'
})
export class SponsoringService {

  constructor(private http: HttpClient) { }

  getAllDossierSponsoring(): Observable<DossierSponsoring[]> {
    return this.http.get<DossierSponsoring[]>('http://localhost:9090/DossierSponsoring/getAll');
  }

  findByEventId(id : number): Observable<DossierSponsoring> {
    return this.http.get<DossierSponsoring>('http://localhost:9090/DossierSponsoring/folderByEvent/'+`${id}`);
  }


  getDossierSponsoringLength(): Observable<number> {
    return this.http.get<DossierSponsoring[]>('http://localhost:9090/DossierSponsoring/getAll').pipe(
      map(DossierSponsoring => DossierSponsoring.length)
    );
  }


  getPackslength(): Observable<number> {
    return this.getAllDossierSponsoring().pipe(
      map(dossiers => dossiers.map(dossier => dossier.pack_list.length).reduce((total, length) => total + length))
    );
  }

  creationDossierSponsoring(offre: any): Observable<any> {
    return this.http.post<any>('http://localhost:9090/DossierSponsoring/add',offre);
  }

  addDossier(dossierSponsoring: DossierSponsoring): Observable<any> {
    return this.http.post<any>('http://localhost:9090/DossierSponsoring/addFolder',dossierSponsoring);
  }

}
