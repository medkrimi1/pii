import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OffreFrs } from '../models/offre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  constructor(private http: HttpClient) { }


  getAllOffre(): Observable<OffreFrs[]> {
    return this.http.get<OffreFrs[]>('http://localhost:9090/OffreFrs/getall');
  }

  AddOffre(OffreFrs: OffreFrs): Observable<any> {
    return this.http.post<any>('http://localhost:9090/OffreFrs/add', OffreFrs);
  }
  


  deleteOffre(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:9090/OffreFrs/delete/${id}`);
  }

  updateOffre(id: number, OffreFrs: OffreFrs): Observable<any> {
    return this.http.put<any>(`http://localhost:9090/OffreFrs/update`, OffreFrs);
  }
}
