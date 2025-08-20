import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Transaction } from "../models/transaction";
import { Page } from "../interface/page";

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private transactionsUrl = 'http://localhost:8080/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Page<Transaction>> {
    return this.http.get<Page<Transaction>>(this.transactionsUrl);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    console.log(transaction)
    return this.http.post<Transaction>(this.transactionsUrl, transaction);
  }
}
