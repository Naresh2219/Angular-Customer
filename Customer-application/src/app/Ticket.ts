import{User} from './User';
export interface Ticket {
  _id?: string;
  title: string;
  description: string;
  status: string;
 user?: User;
}
