import { Injectable } from '@angular/core';
import {  CanActivate, Router,  } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router) {}

  canActivate(): boolean {
    const loginData = sessionStorage.getItem('loginData');
    if (loginData) {
      return true;
    } else {
      this.route.navigate(['/']);
      return false;
    }
  }
}
