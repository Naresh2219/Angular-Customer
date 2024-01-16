import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service.service';
import { TicketService } from 'src/app/services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/Ticket';


@Component({
  selector: 'app-ticketupdate',
  templateUrl: './ticketupdate.component.html',
  styleUrls: ['./ticketupdate.component.css']
})
export class TicketUpdateComponent implements OnInit {

  userEmail: string = '';
  ticket: Ticket = new Ticket();

  constructor(private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userEmail = params['email'];
    });
  }

  
}