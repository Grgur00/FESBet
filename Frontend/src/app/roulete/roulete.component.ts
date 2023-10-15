import { Component, OnInit, ViewChild } from '@angular/core';
import { wheelNumbersInOrder } from '../ultis/ultis';
import { MenuComponent } from '../menu/menu.component';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-roulete',
  templateUrl: './roulete.component.html',
  styleUrls: ['./roulete.component.css']
})



export class RouleteComponent implements OnInit {

  @ViewChild(MenuComponent) menuComponent!: MenuComponent;
  displayDiv: boolean = false;
  hoveredItem: any = null;
  winningNumber: number =0;
  clickedItem: any;

  constructor(private playerService: PlayerService) {}

  clickedItems: any[] = [];

  onClickButton(event: any, index: number) {
    if (this.clickedItems.includes(index)) {
      this.clickedItems = this.clickedItems.filter(item => item !== index);
      this.playerService.updateCredits(5);
      console.log(this.playerService.player.credits);
    } else {
      this.clickedItems.push(index);
      this.playerService.updateCredits(-5);
      console.log(this.playerService.player.credits);
    }
  }

  getBackgroundColor(number: any, index: number) {
    if (this.clickedItems.includes(index)) {
      return 'purple';
    } else if (this.hoveredItem === number) {
      return 'red';
    } else {
      return 'green';
    }
  }

  onHover(event: any) {
    this.hoveredItem = event.target;
    if (this.clickedItem !== event.target.textContent.trim()) {
      this.hoveredItem.classList.add('red');
    }
  }

  onLeave(event: any) {
    if (this.hoveredItem === event.target) {
      this.hoveredItem.classList.remove('red');
      this.hoveredItem = null;
    }
  }

  ngOnInit(): void {}

  spinRoulette(event: any): void {
    event.preventDefault();
  }

  isSpinning: boolean = false;
  spinIndex: number = 0;
  wheelNumbers: number[] = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
  numsForDisplay: number[] = wheelNumbersInOrder;

  findLandingPart(deg: number): number {
    this.spinIndex = Math.round((deg % 360 / (360 / 37)));
    return this.spinIndex;
  }

  onClick(event: any) {
    if (!this.isSpinning) {
      const deg = 360 + (Math.round((Math.random() * 500) / 10) * 10) * (360 / 37);
      event.target.style.setProperty('--rotation', `-${deg}deg`);
      event.target.classList.add('active');
      this.isSpinning = true;

      this.winningNumber = this.findLandingPart(deg);
      console.log(this.winningNumber);
      if (this.clickedItems.includes(this.wheelNumbers[this.winningNumber])) {
        this.playerService.updateCredits(180);
        console.log("dobitan sam");
      }
      else{
        console.log("nisam dobitan");
      }
      setTimeout(() => {
        this.displayDiv = true;
      }, 2000);
    }

    else {
      event.target.removeAttribute('style');
      event.target.classList.remove('active');
      this.displayDiv = false;
      this.isSpinning = false;
      this.clickedItems = [];
    }
  }
}
