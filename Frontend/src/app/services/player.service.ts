import { Injectable } from '@angular/core';
import { IPlayer } from '../ultis/models';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  player: IPlayer = {
    id: 0,
    username: 'example_username',
    email: 'mail@mail.com',
    credits: 1000
  };

  updateCredits(amount: number): void {
    this.player.credits += amount;
      }

  constructor() { }
}
