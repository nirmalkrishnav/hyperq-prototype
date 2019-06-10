import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  loginToTheApplication() {
    this.authService.login();
  }

}
