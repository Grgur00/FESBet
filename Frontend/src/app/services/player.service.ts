import { Injectable } from '@angular/core';
import { IPlayer } from '../ultis/models';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor() {}
  player: IPlayer = {
    id: 0,
    username: 'example_username',
    email: 'mail@mail.com',
    credits: 1000
  };

  updateCredits(amount: number): void {
    this.player.credits += amount;
  }

  createUser(newUser: IPlayer){
    this.player = newUser;
  }

  createNewPlayer(email: string, username: string) {
    const credits = 1000; // Give 1000 credits to new users
    const newPlayerData = {
      username: username,
      email: email,
      credits: credits
    };
  }


}
