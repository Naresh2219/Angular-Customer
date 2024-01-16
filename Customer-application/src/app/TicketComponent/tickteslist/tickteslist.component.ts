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
    this.searchForm.get('userEmail')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(userEmail => this.ticketService.getTicketsByUserEmail(userEmail || ''))
    ).subscribe(
      data => {
        this.tickets = data;
        console.log('Tickets fetched successfully:', data);
      },
      error => {
        console.error('Error fetching tickets:', error);
      }
    );

    this.route.params.subscribe(params => {
      this.userEmail = params['email'];
      this.loadAllTickets();
    });
  }

  loadAllTickets(): void {
    this.tickets$ = this.ticketService.getAllTickets();
  }
}
