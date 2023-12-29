import { Component } from '@angular/core';
import { AuthService } from '../services/AuthService/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  email: string = '';
  password: string = '';
  username: string = '';

  constructor(private auth: AuthService){}

  register(){
    if(this.email == ''){
      alert('Please enter email');
      return;
    }
    if(this.password == ''){
      alert('Please enter password');
      return;
    }
    if(this.username == ''){
      alert('Please enter username');
      return
    }

    this.auth.register(this.email, this.password, this.username);
    this.email = '';
    this.password = '';
    this.username = '';
  }
}
