import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TransactionsService } from '../../../core/services/transactions.service';
import { Transaction } from '../../../core/models/transaction';
import { Account } from '../../../core/models/account';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../core/services/account.service';
import { ModalComponent } from "../../modal/modalTransaction/modalTransaction";
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ModalComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  showModal: boolean = false
  transactionsList: Transaction[] = [];
  accountsList: Account[] = [];

  constructor(
    private transactionsService: TransactionsService,
    private accountService: AccountService,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
    this.loadAccounts();
  }

  loadTransactions(): void {
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

  loadAccounts(): void {
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

  createTransaction(transaction: Transaction): void {
    this.transactionsService.createTransaction(
      transaction).subscribe({
        next: () => this.showSnackBar(),
        error: (error) => {
          console.error('Error creating transaction:', error);
        }
      });
  }

  openModal(): void {
    this.showModal = true;
  }

  showSnackBar(){
    this.snackBarService.onSnackBar('Transação criada com sucesso!');
  }
}
