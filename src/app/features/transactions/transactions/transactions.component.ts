import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Transaction } from '../../../core/models/transaction';
import { TransactionsService } from '../../../core/services/transactions.service';
import { Page } from '../../../core/interface/page';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class TransactionsComponent implements OnInit {

  transactionsList: Transaction[] = [];

  filterForm: FormGroup;

  constructor(
    private transactionService: TransactionsService
  ){
    this.filterForm = new FormGroup({
      type: new FormControl(''),
      categoryId: new FormControl(''),
      accountId: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.loadTransactions()
  }

  loadTransactions(): void {
      this.transactionService.getTransactions().subscribe({
        next: (data: Page<Transaction>) => {
          this.transactionsList = data.content.map(
            (t: Object) => new Transaction(t)
          )
        },
        error: (error) => {
          console.error('Error fetching transactions:', error);
        }
      });
    }
  

  
  
}
