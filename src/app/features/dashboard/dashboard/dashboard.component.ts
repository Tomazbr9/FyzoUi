import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TransactionsService } from '../../../core/services/transactions.service';
import { Transaction } from '../../../core/models/transaction';
import { Account } from '../../../core/models/account';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../core/services/account.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Page } from '../../../core/interface/page';
import { Category } from '../../../core/models/category';
import { CategoryService } from '../../../core/services/category.service';
import { ModalAccountComponent } from "../../modal/modal-account/modal-account";
import { ModalCategoryComponent } from '../../modal/modal-category/modal-category';
import { ModalTransactionComponent } from "../../modal/modal-transaction/modalTransaction";
import { Balance } from '../../../core/interface/balance';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ModalTransactionComponent, ModalAccountComponent, ModalCategoryComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  showTransactionModal: boolean = false;
  showAccountModal: boolean = false;
  showCategoryModal: boolean = false;

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
        next: () => {
          this.showSnackBar('Transação criada com sucesso!');
          this.loadTransactions();
          this.loadBalance();
          this.loadAccounts();
        },
        error: (error) => console.error('Error creating transaction:', error)
      });
  }

  createAccount(account: Account): void {
    this.accountService.createAccount(
      account).subscribe({
        next: () => {
          this.showSnackBar('Conta criada com sucesso!');
          this.loadAccounts();
        },
        error: (error) => console.error('Error creating account:', error)
      });
  }

  createCategory(category: Category): void {
    this.categoryService.createCategory(
      category).subscribe({
        next: () => {
          this.showSnackBar('Categoria criada com sucesso!');
          this.loadCategories();
        },
        error: (error) => console.error('Error creating category:', error)
      });
  }

  loadBalance(): void {
    this.transactionsService.getBalance().subscribe({
      next: (data: Balance) => {
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

  openCategoryModal(): void {
    this.showCategoryModal = true;
  }

  showSnackBar(message: string){
    this.snackBarService.onSnackBar(message);
  }
}
