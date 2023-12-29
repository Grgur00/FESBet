import { Component } from '@angular/core';
import { PlayerService } from '../services/PlayerService/player.service';
import { IPlayer } from '../ultis/models';
import { AuthService } from '../services/AuthService/auth.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent {
constructor(private playerService: PlayerService, private auth: AuthService){}

player: IPlayer = this.playerService.player;


logOut(){
  this.auth.signOut()
}

}
