import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/UserService';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  public email: string;
  public password: string;
  public rememberMe: boolean;
  public alert: string;
  public myemail: string;
  public users: User[];
  public returnUrl: any;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    // Get all users
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );

    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.router.navigate(['/compte']);
    }

    // Get the return url
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  login() {
    // Find the user by email
    const user = this.users.find(u => u.email === this.email);
  
    if (!user) {
      this.alert = 'Invalid email or password';
    } else {
      const hashedPassword = sha256(this.password); // Hash the user input password
      if (user.password !== hashedPassword) {
        this.alert = 'Invalid email or password';
      } else {
        let userData: any;
        this.userService.getUserById(user.id).subscribe(
          (data: any) => {
            userData = data;
  
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(userData));
            localStorage.setItem('userId', userData.id.toString());
            localStorage.setItem('role', user.role);
          
  
            // Check the user's role and navigate to the appropriate route
            if (userData.role === 'ADMIN') {
              this.router.navigate(['/compte/admin/dashboard']);
            } else {
              this.router.navigate(['/mon-compte']);
            }
          },
          (error) => {
            console.log(error);
            this.alert = 'Error occurred while fetching user details';
          }
        );
      }
    }
  }

}