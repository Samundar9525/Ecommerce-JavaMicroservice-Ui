import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;
  isSignIn = true;

  constructor(private fb: FormBuilder,private routes:Router,private userservice:UsersService,  private snackbar: SnackbarService) {
    sessionStorage.removeItem("user_id")
    sessionStorage.removeItem("cart_id")
    sessionStorage.removeItem("user_name")
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [true]
    });

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  toggleForm(signIn: boolean) {
    this.isSignIn = signIn;
  }

  onLogin(): void {
  if (this.loginForm.invalid) {
    this.snackbar.show('Please fill all required fields correctly.', false);
    return;
  }
  const loginPayload = {
    name: this.loginForm.value.username,
    email: this.loginForm.value.password
  };

  this.userservice.login(loginPayload).subscribe({
    next: (res: any) => {
      if (res?.status === 'success') {
        sessionStorage.setItem('user_name', res.name);
        sessionStorage.setItem('user_id', res.id);
        this.snackbar.show('Login successful!', true);

        this.userservice.getCartData().subscribe(cart => {
          console.log(cart)
          console.log(cart.cartId)

          sessionStorage.setItem('cart_id', cart.cartId);
          this.routes.navigate(['/dashboard']);
        })
      }
    },
    error: (err) => {
      this.snackbar.show('Invalid credentials. Please try again.', false);
    },
    complete: () => {
      console.log('Login API call completed');
    }
  });
}


  onSignup() {
    if (this.signupForm.valid) {
      console.log('Signup Data:', this.signupForm.value);
    }
  }
}
