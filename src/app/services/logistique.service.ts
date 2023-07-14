import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Logistique } from '../models/logistique';

@Injectable({
  providedIn: 'root'
})
export class LogistiqueService {

  constructor(private http: HttpClient) { }

  getAllLogistiques(): Observable<Logistique[]> {
    return this.http.get<Logistique[]>('http://localhost:9090/logistique/GetAll');
  }

  getAllLogistiquesLength(): Observable<number> {
    return this.getAllLogistiques().pipe(
      map(logistiques => logistiques.length)
    );
  }

  addLogistique(logistique: Logistique): Observable<any> {
    return this.http.post<any>('http://localhost:9090/logistique/add', logistique);
  }
  


  deleteLogistiqueById(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:9090/logistique/delete/${id}`);
  }

  getLogistiqueById(id: number): Observable<Logistique> {
    return this.http.get<Logistique>(`http://localhost:9090/logistique/Get/${id}`);
  }

}