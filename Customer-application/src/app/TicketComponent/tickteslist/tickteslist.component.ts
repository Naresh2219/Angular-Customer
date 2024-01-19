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
editTicket(_t29: Ticket) {
throw new Error('Method not implemented.');
}
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
}