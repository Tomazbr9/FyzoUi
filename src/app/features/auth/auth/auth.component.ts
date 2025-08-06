import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss']
})
export class AuthComponent {

  loginForm: FormGroup 

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
    if(this.loginForm.valid){
      const {username, password} = this.loginForm.value;
      this.authService.login(username!, password!).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => alert('Credenciais inválidas')
      });
    }
  }

}
