import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TransactionsService } from '../../../core/services/transactions.service';
import { Transaction } from '../../../core/models/transaction';
import { Account } from '../../../core/models/account';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../core/services/account.service';
import { ModalComponent } from "../../modal/modalTransaction/modalTransaction";
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Page } from '../../../core/interface/page';
import { Category } from '../../../core/models/category';
import { CategoryService } from '../../../core/services/category.service';

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
  categoriesList: Category[] = []

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
      error: (error) => {
        console.error('Error fetching accounts: ', error);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categoriesList = data
        console.log(data)
      },
      error(error) {
        console.error('Error fetching categories: ', error);
      },
    })

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
