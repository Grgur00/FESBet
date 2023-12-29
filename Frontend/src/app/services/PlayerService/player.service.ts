import { Injectable } from '@angular/core';
import { IPlayer } from '../../ultis/models';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private db: AngularFireDatabase, private auth: AuthService) {}
  player: IPlayer = {
    id: '1',
    username: 'example_username',
    email: 'mail@mail.com',
    credits: 1000
  };

  updateCredits(amount: number): void {
    this.player.credits += amount;
    this.db.object(`users/${this.player.id}/credits`).set(this.player.credits)
  }
}
