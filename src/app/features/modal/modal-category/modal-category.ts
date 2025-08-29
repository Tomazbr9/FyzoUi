import { Component } from '@angular/core';
import { Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../../core/models/category';

@Component({
  selector: 'app-category-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-category.html',
  styleUrl: './modal-category.scss'
})
export class ModalCategoryComponent {

  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<Category>();

  categoryForm: FormGroup;
  
  categoryTypes = [
    { value: 'EXPENSE', label: 'Despesa' },
    { value: 'REVENUE', label: 'Receita' }
  ];

  predefinedColors = [
    { value: '#EF4444', label: 'Vermelho' },
    { value: '#F97316', label: 'Laranja' },
    { value: '#F59E0B', label: 'Âmbar' },
    { value: '#10B981', label: 'Esmeralda' },
    { value: '#06B6D4', label: 'Ciano' },
    { value: '#3B82F6', label: 'Azul' },
    { value: '#6366F1', label: 'Índigo' },
    { value: '#8B5CF6', label: 'Violeta' },
    { value: '#EC4899', label: 'Rosa' },
    { value: '#64748B', label: 'Cinza' }
  ];

  icons: string[] = [
    'home',
    'shopping_cart',
    'restaurant',
    'local_grocery_store',
    'directions_car',
    'local_hospital',
    'school',
    'sports_esports',
    'movie',
    'flight_takeoff',
    'fitness_center',
    'credit_card',
    'account_balance',
    'pets',
    'child_care',
    'local_laundry_service',
    'weekend',
    'build',
    'favorite',
    'park'
  ];

  constructor() {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      icon: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      type: new FormControl('EXPENSE', Validators.required)
    });
  }

  submit(): void {
    if(this.categoryForm.valid) {
      this.submitForm.emit(new Category(this.categoryForm.value));
      this.close();
    }
  }

  close(): void {
    this.closeModal.emit();
  }

}
