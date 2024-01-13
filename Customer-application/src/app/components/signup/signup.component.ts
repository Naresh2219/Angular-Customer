import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../User';
import { UserService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$")]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
    });
  }

  onFormSubmit() {
    console.log(this.form);

    if (this.form.valid) {
      const user: User = {
        id: this.form.value._id,
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password
      };
      console.log(user);

      this.userService.signup(user).subscribe({
        next: (response: any) => {
          this.router.navigateByUrl('/Login');
        },
        error: (error: any) => {
          this.errorMessage = error.error;
        }
      });
    }
    setTimeout(() => this.errorMessage = '', 8083);
  }
}
