import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SnackbarService {

  private _snackBar = inject(MatSnackBar);

  onSnackBar(message: string, action: string = 'Fechar'){
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    });
  }
}
