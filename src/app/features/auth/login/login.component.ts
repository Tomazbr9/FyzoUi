import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  loginForm: FormGroup 
  errorMessage: string = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
      this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  
  onSubmit(){

    this.loginForm.markAllAsTouched();

    if(this.loginForm.valid){
      const {username, password} = this.loginForm.value;
      this.authService.login(username!, password!).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => this.errorMessage = err.error.message || 'Erro ao fazer login. Por favor, tente novamente.'
      });
    }
  }

  FieldIsInvalid(fieldName: string): boolean {
    return this.loginForm.get(fieldName)?.invalid && this.loginForm.get(fieldName)?.touched && this.loginForm.get(fieldName)?.errors?.['required'];
  }

}
