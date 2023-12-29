import { Component, Injectable, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { IPlayer } from '../ultis/models';
import { PlayerService } from '../services/PlayerService/player.service';
import { AuthService } from '../services/AuthService/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  credits: number = 0;

  constructor(private router: Router, private playerService: PlayerService, private auth: AuthService) {}
  player = this.playerService.player;
  ngOnInit(): void {}

}





