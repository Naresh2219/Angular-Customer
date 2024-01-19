import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service.service';
import { TicketService } from 'src/app/services/ticket.service';
import { ActivatedRoute , Router} from '@angular/router';
import { Ticket } from 'src/app/Ticket';
import {Location} from '@angular/common';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  userEmail: string = '';
  ticket: Ticket = new Ticket();

  constructor(
  private route: ActivatedRoute, 
  private ticketService: TicketService, 
  private location:Location,
  private router:Router
  ){ }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userEmail = params['email'];
    });
  }

  createTicket(): void {
    this.ticket.userEmail = this.userEmail;

    this.ticketService.createTicket(this.ticket)
      .subscribe(
        data => {
          console.log('Ticket created successfully:', JSON.stringify(data));
         this.router.navigate(['/open', this.userEmail]);

        },
        error => {
          console.error('Error creating ticket:', error);
        }
      );
  }
}