import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private plyerService: PlayerService){}

  logIn(){
    if(this.email == ''){
      alert('Please enter email');
      return;
    }
    if(this.password == ''){
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email, this.password);
    this.plyerService.player.email = this.email;
    this.email = '';
    this.password = '';
  }
}
