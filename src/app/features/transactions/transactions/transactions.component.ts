import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Transaction } from '../../../core/models/transaction';
import { Category } from '../../../core/models/category';
import { TransactionsService } from '../../../core/services/transactions.service';
import { Page } from '../../../core/interface/page';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class TransactionsComponent implements OnInit {

  transactionsList: Transaction[] = [];
  categoriesList: Category[] = [];

  filterForm: FormGroup;

  constructor(
    private transactionService: TransactionsService,
    private categoryService: CategoryService
  ){
    this.filterForm = new FormGroup({
      type: new FormControl(''),
      month: new FormControl(''),
      categoryId: new FormControl(''),
      accountId: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.loadTransactions()
    this.loadCategories()
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

  loadCategories(){
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => this.categoriesList = data,
      error: (error) => console.error('Error fetching categories:', error) 
    })

  }

  getCategoryById(id?: number): string {
  
    if(!id){
      return "-";
    }

    const category = this.categoriesList.find(c => c.id == id);
    return category?.name ?? "-";
  }

  applyFilters(): void {
    const type = this.filterForm.get('type')?.value;
    const month = this.filterForm.get('month')?.value;
    const categoryId = this.filterForm.get('categoryId')?.value;
    const accountId = this.filterForm.get('accountId')?.value;
    const startDate = this.filterForm.get('startDate')?.value;
    const endDate = this.filterForm.get('endDate')?.value;

    const params: any = {};

    if (type) params.type = type;
    if (month) params.month = month;
    if (categoryId) params.categoryId = categoryId;
    if (accountId) params.accountId = accountId;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
  
    this.transactionService.getTransactions(params).subscribe({
      next: (data: Page<Transaction>) => {
        this.transactionsList = data.content.map(
          (t: Object) => new Transaction(t)
        )
        
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    })
  }
  

  
  
}
