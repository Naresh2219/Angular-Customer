import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:8083/api/tickets';

  constructor(private http: HttpClient) {}

  getOpenTicketsByEmail(email: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/open/${email}`);
  }

  getClosedTicketsByEmail(email: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/closed/${email}`);
  }

  createTicketByEmail(email: string, ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/create/email/${email}`, ticket);
  }

  updateTicket(updatedTicket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}`, updatedTicket);
  }

  deleteTicket(ticketId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ticketId}`);
  }
}
