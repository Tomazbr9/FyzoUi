import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modalTransaction.html',
  styleUrl: './modalTransaction.scss'
})
export class ModalComponent {

  showModal: boolean = false;
  modalForm: FormGroup

  constructor() {
    this.modalForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      date: new FormControl(new Date(), Validators.required),
      amount: new FormControl(0, [Validators.required, Validators.min(0)]),
      categoryId: new FormControl('', Validators.required),
      accountId: new FormControl('', Validators.required)
    });
  }
  
}
