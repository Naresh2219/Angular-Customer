import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import {GetallusersComponent} from './components/getallusers/getallusers.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {TicketComponent} from './TicketComponent/ticket/ticket.component';
import {TicketUpdateComponent} from './TicketComponent/ticketupdate/ticketupdate.component';
import {TickteslistComponent} from './TicketComponent/tickteslist/tickteslist.component';
import { OpenTicketComponent } from './TicketComponent/open-ticket/open-ticket.component';


const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'Login',component:LoginComponent},
  {path:'all',component:GetallusersComponent},
  {path:'edit/:name',component:EditProfileComponent},
  { path: 'delete/:name', component: GetallusersComponent },
  {path:'nav',component:NavBarComponent},
  {path:'', redirectTo: 'nav', pathMatch:'full'},
  {path:'Logout',component:GetallusersComponent},
  { path: 'ticket', component: TicketComponent },
  { path: 'ticket/:email', component: TicketComponent },
  {path:'create',component:TicketComponent},
  { path: 'create/:email', component: TicketComponent },
  {path: 'update/:email', component:TicketUpdateComponent},
  { path: 'list', component: TickteslistComponent },
{ path: 'open/:userEmail', component: OpenTicketComponent },
{ path: 'tupdate/:id', component: TicketUpdateComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
