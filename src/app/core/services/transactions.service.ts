import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Transaction } from "../models/transaction";

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private TransactionsUrl = 'http://localhost:8080/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.http.get(this.TransactionsUrl);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.TransactionsUrl, transaction);
  }
}
