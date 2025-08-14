import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TransactionsService } from '../../../core/services/transactions.service';
import { Transaction } from '../../transactions/transaction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  transactionsList: Transaction[] = [];

  constructor(private transactionsService: TransactionsService) {}

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
  }

}
