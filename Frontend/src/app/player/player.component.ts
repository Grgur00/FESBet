import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { IPlayer } from '../ultis/models';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent {
constructor(private playerService: PlayerService){}

player: IPlayer = this.playerService.player;


}
