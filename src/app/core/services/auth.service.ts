import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable, tap} from "rxjs";
import { User } from "../models/user";
import { LoginResponse } from "../interface/loginResponse";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://localhost:8080/auth';

    constructor(private http: HttpClient){}

    login(user: User): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${this.apiUrl}/login`, { ...user }
        ).pipe(
            tap(response => {
                localStorage.setItem('access_token', response.token);
            })
        )
    }

    register(user: User): Observable<User> {
        const body = { ...user, role: 'ROLE_CUSTOMER' };
        return this.http.post(`${this.apiUrl}/register`, body);
    }

    logout(): void {
        localStorage.removeItem('access_token');
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    }


}