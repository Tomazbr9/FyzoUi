import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TransactionsService } from '../../../core/services/transactions.service';
import { Transaction } from '../../../core/models/transaction';
import { Account } from '../../../core/models/account';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  transactionsList: Transaction[] = [];
  accountsList: Account[] = [];

  constructor(
    private transactionsService: TransactionsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.transactionsService.getTransactions().subscribe({
      next: (data) => {
        this.transactionsList = data.content.map(
          (t: Object) => new Transaction(t)
        ).slice(0, 5);
        
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });

    this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.accountsList = data.map(
          (a: Object) => new Account(a)
        );
        console.log(this.accountsList);
      },
      error: (error) => {
        console.error('Error fetching accounts:', error);
      }
    });

    
  }

}
