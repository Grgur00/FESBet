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
  winningNumberIndex: number = 0;
  clickedItem: any;
  isSpinning: boolean = false;
  spinIndex: number = 0;
  wheelNumbers: WheelNumber[] = wheelNumbersArray;
  selectedNumbers: any[] = [];
  lastBetNumbers: number[] = [];
  selectedColours: any[] = [];
  lastBetColours: any[] = [];
  numsForDisplay: number[] = wheelNumbersInOrder;

  playerBet: number = 5;
  totalPlayerBet: number = 0;
  lastPlayerBet: number = 0;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {}

  onClickNumber(event: any, index: number) {
    if (this.selectedNumbers.includes(index)) {
      this.selectedNumbers = this.selectedNumbers.filter(item => item !== index);
      this.playerService.updateCredits(this.playerBet);
      this.totalPlayerBet += -this.playerBet;
      this.wheelNumbers[this.findBetAmmountFromIndex(index)].betOnNumber += -this.playerBet;
      console.log(this.wheelNumbers);
      
    } else {
      this.selectedNumbers.push(index);
      this.wheelNumbers[index].betOnNumber += this.playerBet;
      this.playerService.updateCredits(-this.playerBet);
      this.totalPlayerBet += this.playerBet;
      this.wheelNumbers[this.findBetAmmountFromIndex(index)].betOnNumber += this.playerBet;
      console.log(this.wheelNumbers);
    }
  }

  onClickColour(event: any, colour: string) {
    if (this.selectedColours.includes(colour)) {
      this.selectedColours = this.selectedColours.filter(item => item !== colour);
      console.log(this.selectedColours);
      this.playerService.updateCredits(this.playerBet);
      this.totalPlayerBet += -this.playerBet;
    } else {
      this.selectedColours.push(colour);
      this.playerService.updateCredits(-this.playerBet);
      this.totalPlayerBet += this.playerBet;
    }
  }

  getBackgroundColorNumber(index: number) {
    const buttonValue = this.numsForDisplay[index];
    const color = this.wheelNumberColor(index);
    if (this.selectedNumbers.includes(index)) {
      return 'purple';
    } else if (this.hoveredItem === buttonValue) {
      return 'gold';
    } else {
      return color;
    }
  }


  getBackgroundColorColoursButton(colour: string) {
    if (this.selectedColours.includes(colour)) {
      return 'purple';
    } else if (this.hoveredItem === colour) {
      return 'gold';
    } else {
      return colour;
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
      this.winningNumberIndex = this.findLandingPart(deg);
      console.log(this.winningNumberIndex);

      setTimeout(() => {
        this.displayDiv = true;
        if (this.selectedNumbers.includes(this.wheelNumbers[this.winningNumberIndex].value)) {
          this.playerService.updateCredits(180);
        }
        if(this.selectedColours.includes(this.wheelNumbers[this.winningNumberIndex].colour)){
          this.playerService.updateCredits(10);
        }

      }, 2000);
    }

    else {
      event.target.removeAttribute('style');
      event.target.classList.remove('active');
      this.displayDiv = false;
      this.isSpinning = false;
      this.lastBetNumbers = this.selectedNumbers;
      this.lastBetColours = this.selectedColours;
      this.selectedNumbers = [];
      this.selectedColours = [];
      this. lastPlayerBet = this.playerBet;
      this.totalPlayerBet = 0;
    }
  }

  wheelNumberColor(numberIndex: number) {
    const wheelNumber = this.wheelNumbers[numberIndex];
    const color = wheelNumber.colour;
    return color;
  }

  replayLastBet() {
    this.clearAllBets();
    this.selectedNumbers = this.lastBetNumbers;
    this.selectedColours = this.lastBetColours;
    this.playerBet = this.lastPlayerBet;
    this.playerService.updateCredits(-this.playerBet);
  }
  
  clearAllBets() {
    this.playerService.updateCredits(this.playerBet);
    this.selectedNumbers = [];
    this.selectedColours = [];
    this.playerBet = 0;
    this.totalPlayerBet = 0;
  }

  setPlayerBet(chipValue: number){
    this.playerBet = chipValue;
  }

  findBetAmmountFromIndex(displayNumber: number): number {
    const result = wheelNumbersArray.find((item) => item.value === displayNumber);
    console.log(wheelNumbersArray.indexOf(result!))
    return wheelNumbersArray.indexOf(result!);
  }
}


