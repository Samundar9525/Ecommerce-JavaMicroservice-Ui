import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Show snackbar message
   * @param message - message text
   * @param isSuccess - true = green (success), false = red (error)
   */
  show(message: string, isSuccess: boolean): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: isSuccess ? ['snackbar-success'] : ['snackbar-error']
    };
    this.snackBar.open(message, '✖', config);
  }
}
