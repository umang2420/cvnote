import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  users: any;
  loginForm: FormGroup;
  constructor(private service: UserDataService, private Route: Router) {
    this.loginForm = new FormGroup({
      UserName: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  loginValue() {
    this.service.getUserData().subscribe((result) => {
      this.users = result;
      let userId: any;
      this.users.forEach((element:any)=>{
        if (element.UserName === this.loginForm.value.UserName && element.Password === this.loginForm.value.Password) {
          alert('User found');
          userId = element.id;
          sessionStorage.setItem('loginData', JSON.stringify(element));
          this.Route.navigate(['/cv', userId]);
        }
      })
      })
  }
  get UserName() {
    return this.loginForm.get('UserName');
  }

  get Password() {
    return this.loginForm.get('Password');
  }
}
