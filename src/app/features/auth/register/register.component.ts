import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ){
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if(this.registerForm.valid){
      const { username, email, password } = this.registerForm.value;
      this.authService.register(username!, email!, password!).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => alert('Falha ao registrar usuário')
      })  
    }
  }

}
