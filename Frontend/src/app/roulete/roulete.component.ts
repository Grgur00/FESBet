import { Component, OnInit, ViewChild } from '@angular/core';
import { wheelNumbersInOrder, wheelNumbersUlti } from '../ultis/ultis';
import { MenuComponent } from '../menu/menu.component';
import { PlayerService } from '../services/player.service';
import { wheelNumbersArray } from '../ultis/ultis';
import { WheelNumber } from '../ultis/models';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-roulete',
  templateUrl: './roulete.component.html',
  styleUrls: ['./roulete.component.css']
})



export class RouleteComponent implements OnInit {

  @ViewChild(MenuComponent) menuComponent!: MenuComponent;
  displayDiv: boolean = false;
  hoveredItem: any = null;
  winningNumber: number = 0;
  clickedItem: any;
  isSpinning: boolean = false;
  spinIndex: number = 0;
  wheelNumbers: WheelNumber[] = wheelNumbersArray;
  clickedNumbers: any[] = [];
  clickedClours: any[] = [];
  numsForDisplay: number[] = wheelNumbersInOrder;

  playerBet: number = 0;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {}

  onClickNumber(event: any, index: number) {
    if (this.clickedNumbers.includes(index)) {
      this.clickedNumbers = this.clickedNumbers.filter(item => item !== index);
      this.playerService.updateCredits(5);
      this.playerBet += -5;
    } else {
      this.clickedNumbers.push(index);
      this.playerService.updateCredits(-5);
      this.playerBet += 5;
    }
  }

  onClickColour(event: any, colour: string) {
    if (this.clickedClours.includes(colour)) {
      this.clickedClours = this.clickedClours.filter(item => item !== colour);
      this.playerService.updateCredits(5);
      this.playerBet += -5;
    } else {
      this.clickedClours.push(colour);
      this.playerService.updateCredits(-5);
      this.playerBet += 5;
    }
  }

  getBackgroundColor(number: any, index: number) {
    const buttonValue = this.numsForDisplay[index];
    const color = this.wheelNumberColor(index);
    if (this.clickedNumbers.includes(index)) {
      return 'purple';
    } else if (this.hoveredItem === buttonValue) {
      return 'gold';
    } else {
      return color;
    }
  }

  onHover(event: any) {
    this.hoveredItem = event.target;
    if (this.clickedItem !== event.target.textContent.trim()) {
      this.hoveredItem.classList.add('gold');
    }
  }

  onLeave(event: any) {
    if (this.hoveredItem === event.target) {
      this.hoveredItem.classList.remove('gold');
      this.hoveredItem = null;
    }
  }

  spinRoulette(event: any): void {
    event.preventDefault();
  }

  findLandingPart(deg: number): number {
    this.spinIndex = Math.round((deg % 360 / (360 / 37)));
    return this.spinIndex;
  }

  onClickWheel(event: any) {
    if (!this.isSpinning) {
      const deg = 360 + (Math.round((Math.random() * 500) / 10) * 10) * (360 / 37);
      event.target.style.setProperty('--rotation', `-${deg}deg`);
      event.target.classList.add('active');
      this.isSpinning = true;

      this.winningNumber = this.findLandingPart(deg);
      console.log(this.winningNumber);

      setTimeout(() => {
        this.displayDiv = true;
        if (this.clickedNumbers.includes(this.wheelNumbers[this.winningNumber].value)) {
          this.playerService.updateCredits(180);
        }
        if(this.clickedClours.includes(this.wheelNumbers[this.winningNumber].colour)){
          this.playerService.updateCredits(10);
        }

      }, 2000);
    }

    else {
      event.target.removeAttribute('style');
      event.target.classList.remove('active');
      this.displayDiv = false;
      this.isSpinning = false;
      this.clickedNumbers = [];
      this.clickedClours = [];
      this.playerBet = 0;
    }
  }

  wheelNumberColor(numberIndex: number) {
    const wheelNumber = this.wheelNumbers[numberIndex];
    const color = wheelNumber.colour;
    return color;
  }

  onClickRed(event: any) {
    if (this.displayDiv) {
      return;
    }
    const redButton = event.target;
    redButton.classList.toggle('clicked');
  }

  onClickBlack(event: any) {
    if (this.displayDiv) {
      return;
    }
    const blackButton = event.target;
    blackButton.classList.toggle('clicked');
  }

}


