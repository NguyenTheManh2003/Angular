import { Component } from '@angular/core';
import { RegisterForm } from '../auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: RegisterForm = {
    email: '',
    password: '',
    comfirm_password: '',
  };

  errorMessage: string = '';
  confirmationMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    // Kiểm tra email trùng lặp trước khi đăng ký
    this.authService.getEmailFromUser(this.form.email).subscribe(
      emailExists => {
        if (emailExists) {
          this.errorMessage = 'Email đã tồn tại trong cơ sở dữ liệu';
        } else {
          // Nếu email không tồn tại, tiến hành đăng ký
          this.authService.register(this.form).subscribe(
            res => {
              this.confirmationMessage = 'Đăng ký thành công!'; // Thiết lập thông báo xác nhận
              // Đợi 3 giây sau đó xóa thông báo xác nhận
              setTimeout(() => {
                this.confirmationMessage = '';
                // Chuyển hướng đến trang đăng nhập
                this.router.navigate(['/login']);
              }, 3000);
            },
            error => {
              // Xử lý lỗi nếu có
              console.error('Lỗi đăng ký:', error);
              this.errorMessage = 'Đăng ký thất bại. Vui lòng thử lại sau.';
            }
          );
        }
      }
    );
  }
}