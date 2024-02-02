import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ticket } from 'src/app/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
   private apiUrl = 'http://localhost:8083/tickets';

  constructor(private http: HttpClient) { }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/create`, ticket);
  }

  searchTickets(userEmail: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/search?userEmail=${userEmail}`);
  }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/list`);
  }

  deleteTicket(userEmail: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${userEmail}`);
  }
 getTicketsByUserEmail(userEmail: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/open?userEmail=${userEmail}`);
  }
 deleteByTitle(title: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/delete/${title}`);
}
 getTicketById(id: string): Observable<Ticket> {
  return this.http.get<Ticket>(`${this.apiUrl}/update?id=${id}`);
}

 updateTicket(ticket: Ticket): Observable<Ticket> {
  const url = `${this.apiUrl}/tupdate/${ticket.id}`;
  return this.http.put<Ticket>(url, ticket);
}


}