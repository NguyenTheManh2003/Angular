import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterForm, loginForm } from './auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  isloading: boolean = false;
  private authChangedSubject = new Subject<boolean>();
  authChanged: Observable<boolean> = this.authChangedSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {}

  private URL = 'http://localhost:3000/User';
  
  login(form: loginForm): Observable<any> {
    return this.http.get<any[]>('http://localhost:3000/User?email=' + form.email + '&password=' + form.password)
      .pipe(
        map(users => {
          if (users.length === 1) {
            localStorage.setItem('currentUser', JSON.stringify(users[0]));
            this.router.navigate(['']);
            this.isAuthenticated = true;
            this.authChangedSubject.next(true); // Emit change in authentication status
            return { success: true, user: users[0] };
          } else {
            this.isAuthenticated = false;
            return { success: false };
          }
        })
      );
  }
  
  getEmailFromUser(email: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.URL}?email=${email}`).pipe(
      map(users => {
        if (users.length > 0) {
          console.log('Email đã tồn tại trong cơ sở dữ liệu');
          return true;
        } else {
          return false;
        }
      })
    );
  }

  register(form: RegisterForm): Observable<any> {
    return this.http.post<any>(this.URL, form);
  }

  logout() {
    this.router.navigate(['login']);
    this.isAuthenticated = false;
    localStorage.removeItem('currentUser'); // Remove user info from local storage
    this.authChangedSubject.next(false); // Emit change in authentication status
  }

  getUserInfo(): any {
    const userInfo = localStorage.getItem('currentUser');
    return userInfo ? JSON.parse(userInfo) : null;
  }
}
