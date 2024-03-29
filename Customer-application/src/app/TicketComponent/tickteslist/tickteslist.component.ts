import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/app/Ticket';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tickteslist',
  templateUrl: './tickteslist.component.html',
  styleUrls: ['./tickteslist.component.css']
})
export class TickteslistComponent implements OnInit {

  userEmail: string = '';
  searchForm!: FormGroup;
  tickets: Ticket[] = [];
  tickets$: Observable<Ticket[]> = new Observable<Ticket[]>();

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      userEmail: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.userEmail = params['email'];
      this.loadAllTickets();
    });

    this.searchForm.get('userEmail')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(userEmail => this.ticketService.getTicketsByUserEmail(userEmail))
      )
      .subscribe(tickets => {
        this.tickets = tickets;
      });
  }

  loadAllTickets(): void {
    this.tickets$ = this.ticketService.getAllTickets();
  }

  deleteTicket(userEmail: string | undefined): void {
    if (userEmail) {
      this.ticketService.deleteTicket(userEmail).subscribe(
        (response: any) => {
          console.log('Ticket deleted successfully:', response);
          this.loadAllTickets();
        },
        (error: any) => {
          console.error('Error deleting ticket:', error);
        }
      );
    } else {
      console.error('User email is undefined');
    }
  }

  editTicket(ticket: Ticket): void {
    // Implement your logic here to edit the ticket
    console.log('Editing ticket:', ticket);
  }
  searchTickets(userEmail: string | null): void {
  if (userEmail) {
    this.tickets$ = this.ticketService.getTicketsByUserEmail(userEmail);
  } else {
    this.loadAllTickets();
  }
}
}