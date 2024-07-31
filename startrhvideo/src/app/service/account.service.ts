import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/users.model';
import { environment } from 'src/environments/environment';
import { Login } from '../model/login.model';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

    public get userValue() {
        return this.userSubject.value;
    }

    login(login: Login) {
        return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username: login.login, password: login.pass })
            .pipe(map(user => {
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
        

        //API + MySQL caso vá para prod algum dia
        // return this.http.post<Login>('http://127.0.0.1:5000', this.login)
        // .pipe(map(user => {
        //     localStorage.setItem('user', JSON.stringify(user));
        //     this.userSubject.next(user);
        //     return user;
        // })); 
        
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getStartUser() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`)
            .pipe(
                map((user) => user.filter(u => u.login === 'startrh'))
            );
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                
                if (id == this.userValue?.id) {
                    
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
               
                if (id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }
}