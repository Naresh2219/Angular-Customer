import { Component, OnInit } from '@angular/core';
import { User } from '../../User';
import { UserService } from 'src/app/services/user-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Ticket } from '../../Ticket';

@Component({
  selector: 'app-getallusers',
  templateUrl: './getallusers.component.html',
  styleUrls: ['./getallusers.component.css']
})
export class GetallusersComponent implements OnInit {
  search = new FormControl('');
  users$: Observable<User[]> = new Observable<User[]>();
  currentUser!:User;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();

    this.search.valueChanges.subscribe(searchTerm => {
      this.users$ = this.userService.filterUsers(searchTerm || '');
    });
  }

  loadUsers(): void {
    this.users$ = this.userService.getAllUsers();
  }


  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe(
      ()=>{
        console.log('user deleted sucessfully');
        this.loadUsers();
      },
      (error:HttpErrorResponse)=>{
        console.error('error delete useer',error.message);
      }
    );
  }

  onLogoutClick(): void {
  this.userService.logout(this.currentUser).subscribe(
    (success) => {
      if (success) {
        localStorage.removeItem('currentUser');
        this.router.navigate(['Login']);
      }
    },
    (error) => {
      console.error('Logout failed');
    }
  );
}

}
