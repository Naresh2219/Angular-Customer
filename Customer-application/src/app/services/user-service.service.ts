import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8083';

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<any> {
    console.log('Signup');
    return this.http.post(`${this.apiUrl}/user/signup`, user);
  }

  login(user: User): Observable<any> {
    console.log('Login');
    return this.http.post(`${this.apiUrl}/user/Login`, user);
  }

  getAllUsers(): Observable<User[]> {
    console.log('Get all users');
    return this.http.get<User[]>(`${this.apiUrl}/user/all`);
  }

  filterUsers(searchTerm: string): Observable<User[]> {
    console.log('Search');
    return this.http.get<User[]>(`${this.apiUrl}/user/search?search=${searchTerm}`);
  }

 deleteUser(user: User): Observable<any> {
  const url = `${this.apiUrl}/user/delete/${user.name}`;
  return this.http.delete(url);
}
getUserByName(name: string): Observable<User> {
    const url = `${this.apiUrl}/user/get/${name}`;
    return this.http.get<User>(url);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/user/update/${user.name}`;
    return this.http.put<User>(url, user);
  }
   updateUserWithImage(user: User, formData: FormData): Observable<User> {
  return this.http.post<User>(`${this.apiUrl}/user/update/${user.name}`, formData);
}

logout(user?: User): Observable<any>{
  const url = '${this.apiUrl}/Logout';
  return this.http.post(url, user);
}
 
}

