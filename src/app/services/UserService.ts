import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:9090/users/getAll');
  }

  checkEmailExists(email: string): Observable<boolean> {  
  return this.getAllUsers()
             .pipe(
               map(users => {
                 return users.some(user => user.email == email);
               })
             );

              }


  addUser(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:9090/users/add', user);
  }

  UpdateUser(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:9090/users/updateUser', user);
  }


  getUserById(id: number): Observable<User> {
    return this.http.get<User>('http://localhost:9090/users/'+id);
  }

  deleteUserById(id: number): Observable<any> {
    return this.http.delete(`http://localhost:9090/users/delete/${id}`);
  }

    getUsersLength(): Observable<number> {
    return this.http.get<User[]>('http://localhost:9090/users/getAll').pipe(
      map(users => users.length)
    );
  }


  getParticipantsLength(): Observable<number> {
    return this.getAllUsers().pipe(
      map(users => users.filter(user => user.role === 'PARTICIPANT').length)
    );
  }


  getFournisseursLength(): Observable<number> {
    return this.getAllUsers().pipe(
      map(users => users.filter(user => user.role === 'FOURNISSEUR').length)
    );
  }


  getOrganisateursLength(): Observable<number> {
    return this.getAllUsers().pipe(
      map(users => users.filter(user => user.role === 'ORGANISATEUR').length)
    );
  }

  getSponsorsLength(): Observable<number> {
    return this.getAllUsers().pipe(
      map(users => users.filter(user => user.role === 'SPONSOR').length)
    );
  }

  getStaffLength(): Observable<number> {
    return this.getAllUsers().pipe(
      map(users => users.filter(user => user.role === 'Staff').length)
    );
  }



}