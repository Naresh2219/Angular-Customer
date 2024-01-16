import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:8083/tickets';

  constructor(private http: HttpClient) {}

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/create`, ticket);
  }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/list`);
  }

  getTicketsByUserEmail(userEmail: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/search?userEmail=${userEmail}`);
}


  getTicketByEmail(email: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/getByEmail/${email}`);
  }
}
