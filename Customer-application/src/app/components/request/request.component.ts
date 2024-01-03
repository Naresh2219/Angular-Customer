import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  openTickets: any[] = [];
  closedTickets: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchOpenTickets();
    this.fetchClosedTickets();
  }

  fetchOpenTickets() {
    this.userService.getOpenTickets().subscribe(
      (data: any[]) => {
        this.openTickets = data;
      },
      (error: any) => {
        console.error('Error fetching open tickets:', error);
      }
    );
  }

  fetchClosedTickets() {  // <-- Corrected method name
    this.userService.getClosedTickets().subscribe(
      (data: any[]) => {
        this.closedTickets = data;
      },
      (error: any) => {
        console.error('Error fetching closed tickets:', error);
      }
    );
  }
}
