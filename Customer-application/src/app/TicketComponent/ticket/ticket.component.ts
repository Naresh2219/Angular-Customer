import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service.service';
import { TicketService } from 'src/app/services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/Ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  userEmail: string = '';
  ticket: Ticket = new Ticket();

  constructor(private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit(): void {
    // Access the 'email' parameter from the route
    this.route.params.subscribe(params => {
      this.userEmail = params['email'];
    });
  }

  createTicket(): void {
    this.ticket.userEmail = this.userEmail;

    this.ticketService.createTicket(this.ticket)
      .subscribe(
        data => {
          console.log('Ticket created successfully:', data);
        },
        error => {
          console.error('Error creating ticket:', error);
        }
      );
  }
}