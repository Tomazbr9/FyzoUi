import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Transaction } from "../models/transaction";
import { Page } from "../interface/page";
import { Balance } from "../interface/balance";
import { SummaryTransaction } from "../interface/summaryTransaction";

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private transactionsUrl = 'http://localhost:8080/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Page<Transaction>> {
    return this.http.get<Page<Transaction>>(this.transactionsUrl);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionsUrl, transaction);
  }

  getBalance(): Observable<Balance> {
    return this.http.get<Balance>(`${this.transactionsUrl}/balance`);
  }

  getExpensesByCategory(): Observable<SummaryTransaction[]>{
    return this.http.get<SummaryTransaction[]>(`${this.transactionsUrl}/summary/expense`);
  }

  getRevenuesByCategory(): Observable<SummaryTransaction[]>{
    return this.http.get<SummaryTransaction[]>(`${this.transactionsUrl}/summary/revenue`);
  }

}
