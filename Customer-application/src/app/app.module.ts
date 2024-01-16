import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { StoreModule } from '@ngrx/store';
import { GetallusersComponent } from './components/getallusers/getallusers.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TicketComponent } from './TicketComponent/ticket/ticket.component';
import { TicketUpdateComponent } from './TicketComponent/ticketupdate/ticketupdate.component';
import { TickteslistComponent } from './TicketComponent/tickteslist/tickteslist.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    GetallusersComponent,
    EditProfileComponent,
    NavBarComponent,
    TicketComponent,
    TicketUpdateComponent,
    TickteslistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
