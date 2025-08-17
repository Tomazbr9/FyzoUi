import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Transaction } from '../../../core/models/transaction';
import { EventEmitter, Input } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category';
import { OnInit } from '@angular/core';
import { AccountService } from '../../../core/services/account.service';
import { Account } from '../../../core/models/account';

@Component({
  selector: 'app-transaction-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modalTransaction.html',
  styleUrl: './modalTransaction.scss'
})
export class ModalComponent implements OnInit {

  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<Transaction>();

  transactionForm: FormGroup

  categoriesList: Category[] = [];
  accountsList: Account[] = [];

  constructor(
    private categoryService: CategoryService,
    private accountService: AccountService
  ) {
    this.transactionForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      date: new FormControl(new Date(), Validators.required),
      amount: new FormControl(0, [Validators.required, Validators.min(0)]),
      categoryId: new FormControl('', Validators.required),
      accountId: new FormControl('', Validators.required),
      type: new FormControl('REVENUE', Validators.required) 
    });
  }

  submit(): void {
    if(this.transactionForm.valid) {
      this.submitForm.emit(new Transaction(this.transactionForm.value));
      this.close();
    }
  }

  close(): void {
    this.closeModal.emit();
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadAccounts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categoriesList = data;
      
      if(this.categoriesList.length > 0) {
        this.transactionForm.get('categoryId')?.setValue(this.categoriesList[0].id);
      }
    });
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe(data => {
      this.accountsList = data;
    });
  }
  
}