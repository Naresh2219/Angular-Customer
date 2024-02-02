import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/app/Ticket';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ticketupdate',
  templateUrl: './ticketupdate.component.html',
  styleUrls: ['./ticketupdate.component.css']
})
export class TicketUpdateComponent implements OnInit {

  ticket: Ticket = {
    id: '',
    title: '',
    description: '',
    status: ''
  };

  updateSuccess: boolean = false;
  ticketForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private fb: FormBuilder,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadTicketDetails(id);
    });

    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['']
    });
  }

  loadTicketDetails(id: string): void {
    this.ticketService.getTicketById(id)
      .subscribe(
        (data: Ticket) => {
          this.ticket = data;
          this.ticketForm.patchValue({
            title: this.ticket.title,
            description: this.ticket.description,
            status: this.ticket.status
          });

          console.log('Ticket loaded successfully:', data);
        },
        (error: any) => {
          console.error('Error loading ticket:', error);
        }
      );
  }

  updateTicket(): void {
  const ticketupdate = this.ticketForm.value;

  this.ticket.title = ticketupdate.title;
  this.ticket.description = ticketupdate.description;
  this.ticket.status = ticketupdate.status;
  this.ticketService.updateTicket(this.ticket).subscribe(
    (response:any)=>{
    console.log('update successfully',response);
     this.router.navigate(['/open', this.ticket.userEmail]);
  },
    (error:any)=>{
      console.error('failes update',error);
    }
    );
  }
}

