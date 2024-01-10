import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/app/Ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  openTickets: Ticket[] = [];
  closedTickets: Ticket[] = [];
  newTicket: Ticket = {} as Ticket;
  selectedTicket: Ticket = {} as Ticket;
  isUpdateFormVisible: boolean = false;
  updateForm: FormGroup;
  createForm: FormGroup;

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required]
    });

    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    const userId = 'userId';

    this.ticketService.getOpenTickets(userId).subscribe(openTickets => {
      this.openTickets = openTickets;
    });

    this.ticketService.getClosedTickets(userId).subscribe(closedTickets => {
      this.closedTickets = closedTickets;
    });
  }

  createTicket() {
    if (this.createForm.valid) {
      const newTicketValues = this.createForm.value;

      this.ticketService.createTicket('userId', newTicketValues).subscribe((createdTicket) => {
        this.openTickets.push(createdTicket);
        this.createForm.reset();
      });
    }
  }

  updateTicket(ticket: Ticket) {
    this.selectedTicket = { ...ticket };
    this.updateForm.patchValue({
      title: this.selectedTicket.title,
      description: this.selectedTicket.description,
      status: this.selectedTicket.status,
    });
    this.isUpdateFormVisible = true;
  }

saveUpdatedTicket(): boolean {
  if (this.selectedTicket && this.selectedTicket._id) {
    const updatedValues = this.updateForm.value;
    this.selectedTicket.title = updatedValues.title;
    this.selectedTicket.description = updatedValues.description;
    this.selectedTicket.status = updatedValues.status;

    this.ticketService.updateTicket(this.selectedTicket).subscribe(
      updatedTicket => {
        const index = this.openTickets.findIndex(t => t._id === this.selectedTicket._id);
        if (index !== -1) {
          this.openTickets[index] = updatedTicket;
        }

        this.selectedTicket = {} as Ticket;
        this.updateForm.reset();
        this.isUpdateFormVisible = false;
      },
      error => {
        console.error('Update failed:', error);
      }
    );

    return true;
  } else {
    console.error('Selected ticket or ticket ID is undefined.');
    return false;
  }
}

  cancelUpdate() {
    this.selectedTicket = {} as Ticket;
    this.updateForm.reset();
    this.isUpdateFormVisible = false;
  }

  deleteTicket(ticketId: string) {
    this.ticketService.deleteTicket(ticketId).subscribe(() => {
      this.openTickets = this.openTickets.filter(t => t._id !== ticketId);
    });
  }

isTicketValid(ticket: Ticket): boolean {
    return (
      ticket.title && ticket.title.trim() !== '' &&
      ticket.status && ticket.status.trim() !== ''
    );
  }

}
