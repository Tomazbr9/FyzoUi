import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private accountsUrl = 'http://localhost:8080/accounts';
    
    constructor(private http: HttpClient){}

    getAccounts(): Observable<any> {
        return this.http.get(this.accountsUrl)
    }
}