import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { PlayerService } from '../PlayerService/player.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if(localStorage.getItem('token')){
    return true;
  }
  router.navigate(['/Login']);
  return false;
};
