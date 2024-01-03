import { Component, OnInit } from '@angular/core';
import { User } from '../../User';
import { UserService } from 'src/app/services/user-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User = {};
  editForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router // Inject the Router service
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const name = params['name'];
      this.loadUser(name);
    });
    this.editForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, Validators.required],
      image: [null, Validators.required]
    });
  }

  loadUser(name: string): void {
    this.userService.getUserByName(name).subscribe(
      (user) => {
        this.user = user;
        this.editForm.patchValue({
          name: user.name,
          email: user.email,
          password: user.password,
        });
      },
      (error) => {
        console.error('Error loading user:', error);
      }
    );
  }

  updateProfile(): void {
    const updatedValues = this.editForm.value;

    this.user.name = updatedValues.name;
    this.user.email = updatedValues.email;
    this.user.password = updatedValues.password;
    this.user.confirmPassword = updatedValues.confirmPassword;
    this.userService.updateUser(this.user).subscribe(
      (updatedUser) => {
        console.log('User updated:', updatedUser);
        // Navigate to the login page after successful update
        this.router.navigate(['/Login']);
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  onFormSubmit() {
    if (this.editForm.valid) {
      this.updateProfile();
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.editForm.patchValue({
      image: file,
    });
    this.editForm.get('image')?.updateValueAndValidity();
  }
}
