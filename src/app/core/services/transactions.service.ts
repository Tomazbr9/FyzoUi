import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private apiUrl = 'http://localhost:8080/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
