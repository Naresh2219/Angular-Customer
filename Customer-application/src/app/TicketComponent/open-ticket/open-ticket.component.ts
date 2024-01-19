import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/app/Ticket';

@Component({
  selector: 'app-open-ticket',
  templateUrl: './open-ticket.component.html',
  styleUrls: ['./open-ticket.component.css']
})
export class OpenTicketComponent implements OnInit {
  userEmail: string = '';
  tickets: Ticket[] = [];

  constructor(private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userEmail = params['userEmail'];
      this.loadTicketDetails();
    });
  }

  loadTicketDetails(): void {
    this.ticketService.getTicketsByUserEmail(this.userEmail)
      .subscribe(
        (data: Ticket[]) => {
          this.tickets = data;
          console.log('Tickets loaded successfully:', data);
        },
        (error: any) => {
          console.error('Error loading tickets:', error);
        }
      );
  }
}
