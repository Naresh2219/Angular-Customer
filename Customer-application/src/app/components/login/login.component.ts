import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../User';
import { UserService } from 'src/app/services/user-service.service';
import { HttpErrorResponse } from '@angular/common/http'; 
//import {loginRequest} from 'src/app/state/login.action';
//import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$")]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
    });
  }

  get r() {
    return this.form.controls;
  }

  onFormSubmit() {
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    console.log(user);
    this.userService.login(user).subscribe({
      next: (response: any) => {
        this.router.navigateByUrl(`/ticket/${response.email}`);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
      }
    });

    setTimeout(() => this.errorMessage = '', 8083);
  }
}
