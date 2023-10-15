import { Injectable } from '@angular/core';
import { IPlayer } from '../ultis/Player-model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  player: IPlayer = {
    username: 'example_username',
    credits: 1000,
    asObservable: function (): unknown {
      throw new Error('Function not implemented.');
    }
  };

  updateCredits(amount: number): void {
    this.player.credits += amount;
      }

  constructor() { }
}
