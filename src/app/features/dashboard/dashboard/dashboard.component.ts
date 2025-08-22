import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TransactionsService } from '../../../core/services/transactions.service';
import { Transaction } from '../../../core/models/transaction';
import { Account } from '../../../core/models/account';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../core/services/account.service';
import { ModalComponent } from "../../modal/modal-transaction/modalTransaction";
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Page } from '../../../core/interface/page';
import { Category } from '../../../core/models/category';
import { CategoryService } from '../../../core/services/category.service';
import { ModalAccount } from "../../modal/modal-account/modal-account";
import { Balance } from '../../../core/interface/balance';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ModalComponent, ModalAccount],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  showTransactionModal: boolean = false
  showAccountModal: boolean = false
  transactionsList: Transaction[] = [];
  accountsList: Account[] = [];
  categoriesList: Category[] = [];
  balance!: Balance;

  constructor(
    private transactionsService: TransactionsService,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
    this.loadAccounts();
    this.loadCategories();
    this.loadBalance();
  }

  loadTransactions(): void {
    this.transactionsService.getTransactions().subscribe({
      next: (data: Page<Transaction>) => {
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
      next: (data: Account[]) => this.accountsList = data,
      error: (error) => console.error('Error fetching accounts: ', error)
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => this.categoriesList = data,
      error: (error) => console.error('Error fetching categories: ', error)
    })
  }

  createTransaction(transaction: Transaction): void {
    this.transactionsService.createTransaction(
      transaction).subscribe({
        next: () => this.showSnackBar('Transação criada com sucesso!'),
        error: (error) => console.error('Error creating transaction:', error)
      });
  }

  createAccount(account: Account): void {
    this.accountService.createAccount(
      account).subscribe({
        next: () => this.showSnackBar('Conta criada com sucesso!'),
        error: (error) => console.error('Error creating account:', error)
      });
  }

  loadBalance(): void {
    this.transactionsService.returnBalance().subscribe({
      next: (data: Balance) => {
        console.log(data)
        this.balance = data;
      },
      error: (error) => console.error("Error returning balance: ", error) 
    })
  }

  openTransactionModal(): void {
    this.showTransactionModal = true;
  }

  openAccountModal(): void {
    this.showAccountModal = true;
  }

  showSnackBar(message: string){
    this.snackBarService.onSnackBar(message);
  }
}
