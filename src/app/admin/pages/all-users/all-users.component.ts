import { Component, OnInit, TemplateRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { sha256 } from 'js-sha256';
import { DataTable } from 'simple-datatables';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  validationForm: UntypedFormGroup;
  user: User = new User();
  isFormSubmitted: boolean;
  successMessage: string;
  countdown: number;
  isFormValid: boolean;
  emailExistsError: string | null;

  users: User[] = [];
  filterText = '';

  constructor(private router: Router,
              private userService: UserService,
              public formBuilder: UntypedFormBuilder,
              private modalService: NgbModal,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.role) {
        this.filterText = params.role;
      }
    });

    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users.reverse();
      }
    );

    this.validationForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  get filteredUsers(): User[] {
    return this.users.filter(user => {
      const values = Object.values(user).join(' ').toLowerCase();
      return values.includes(this.filterText.toLowerCase());
    });
  }
  get filteredUsersCount(): number {
    return this.filteredUsers.length;
  }

  
  deleteUser(id: number) {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      this.userService.deleteUserById(id).subscribe(() => {
        location.reload();
      });
    }
  }

  AddUser(content: TemplateRef<any>) {
    const queryParams = { role: this.filterText };
    const navigationExtras = {
      queryParams: queryParams
    };

    this.modalService.open(content, { centered: true }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {
      // Handle modal dismissal
    });

    this.router.navigate([], navigationExtras);
  }

  get form() {
    return this.validationForm.controls;
  }

  onRegister(e: Event) {
    this.isFormSubmitted = true;
    this.emailExistsError = null;
    e.preventDefault();
    const email = this.form.email.value;
    this.userService.checkEmailExists(email).subscribe((exists) => {
      if (exists) {
        this.emailExistsError = 'Email existe déja';
        this.isFormSubmitted = false;
      } else if (this.validationForm.valid)  {
        this.isFormValid = true;
        // Hash the password with sha256
        const password = sha256(this.form.password.value);
        this.user.password = password;

        this.userService.addUser(this.user).subscribe((response) => {
          localStorage.setItem('isLoggedin', 'true');
          location.reload();
          this.isFormSubmitted = false;
        });
      }
    });
  }

  
}