import { Component, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { Account } from '../../../core/models/account';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-account.html',
  styleUrl: './modal-account.scss'
})
export class ModalAccount {

  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<Account>();

  accountForm: FormGroup

  constructor() {
    this.accountForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required)
    });
  }

  submit(): void {
    if(this.accountForm.valid) {
      this.submitForm.emit(new Account(this.accountForm.value));
      this.close();
    }
  }

  close(): void {
    this.closeModal.emit();
  }

}
