import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { User } from '../../User';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  
  openTickets: User[] = [];
  closedTickets: User[] = [];
  form!: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getOpenTickets().subscribe(tickets => {
      this.openTickets = tickets;
    });

    this.userService.getClosedTickets().subscribe(tickets => {
      this.closedTickets = tickets;
    });

    this.form = this.createForm(); 
  }

  onFormSubmit() {
    console.log(this.form.value);

    this.userService.saveUser(this.form.value).subscribe(
      (response: any) => {
        console.log('Saved successfully:', response);
        this.form.reset();
      },
      (error: any) => {
        console.error('Error saving user:', error);
      }
    );
  }

  private createForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      status: new FormControl('', Validators.required),
    });
  }
}
