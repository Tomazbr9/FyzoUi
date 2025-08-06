import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable, tap} from "rxjs";

interface LoginResponse {
    token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://localhost:8080/auth';

    constructor(private http: HttpClient){}

    login(username: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${this.apiUrl}/login`, { username, password }
        ).pipe(
            tap(response => {
                localStorage.setItem('access_token', response.token);
            })
        )
    }

    register(username: string, email: string, password: string): Observable<any> {
        const body = { username, email, password, role: 'ROLE_CUSTOMER' };
        console.log('Registering user:', body);
        return this.http.post(`${this.apiUrl}/register`, body);
    }

    logout(): void {
        localStorage.removeItem('access_token');
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    }


}