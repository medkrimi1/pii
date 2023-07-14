import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/UserService';
import { User } from '../models/user';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {

  userId: number;
  user:User;
  currentUser:User;
  constructor(private route: ActivatedRoute,
              private EventService:UserService, private router: Router) {

  }

  ngOnInit() {

    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
      
      
     }
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.userId = parseInt(idParam);
      this.EventService.getUserById(this.userId).subscribe(
        user => {
          if (user) {
            this.user = user;
          } 
        },
      
      );
    }
  }
}
