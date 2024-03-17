import { Component } from '@angular/core';
import { loginForm } from '../auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  submit() {
    this.authService.login(this.form)
      .subscribe(
        result => {
          if (result.success) {
            alert('Đăng nhập thành công');
            // Redirect to home page or any other page
          } else {
            alert('Đăng nhập thất bại');
            // Handle failed login (e.g., display error message)
          }
        },
        error => {
          console.error('An error occurred during login:', error);
          alert('Đã xảy ra lỗi trong quá trình đăng nhập');
          // Handle error (e.g., display error message)
        }
      );
  }
  
  
    
}
