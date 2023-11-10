import { Component, OnInit, ViewChild } from '@angular/core';
import { wheelNumbersInOrder, wheelNumbersUlti } from '../ultis/ultis';
import { MenuComponent } from '../menu/menu.component';
import { PlayerService } from '../services/player.service';
import { wheelNumbersArray, wheelColoursArray } from '../ultis/ultis';
import { WheelNumber, WheelColour } from '../ultis/models';


@Component({
  selector: 'app-roulete',
  templateUrl: './roulete.component.html',
  styleUrls: ['./roulete.component.css']
})



export class RouleteComponent implements OnInit {

  @ViewChild(MenuComponent) menuComponent!: MenuComponent;
  displayDiv: boolean = false;
  insufficentFunds:  boolean  = false;
  hoveredItem: any = null;
  winningNumberIndex: number = 0;
  clickedItem: any;
  isSpinning: boolean = false;
  spinIndex: number = 0;
  wheelNumbers: WheelNumber[] = structuredClone(wheelNumbersArray);
  lastBetWheelNumbers: WheelNumber[] = structuredClone(wheelNumbersArray);
  selectedNumbers: any[] = [];
  lastBetNumbers: number[] = [];
  wheelColours: WheelColour[] = structuredClone(wheelColoursArray);
  lastBetWheelColours: WheelColour[] = structuredClone(wheelColoursArray);
  selectedColours: any[] = [];
  lastBetColours: any[] = [];
  numsForDisplay: number[] = wheelNumbersInOrder;

  playerBet: number = 5;
  totalPlayerBet: number = 0;
  lastTotalPlayerBet: number = 0;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {}

  onClickNumber(event: any, index: number) {
    if(this.playerService.player.credits - this.playerBet >= 0){
      if (this.selectedNumbers.includes(index)) {
        this.selectedNumbers = this.selectedNumbers.filter(item => item !== index);
        this.playerService.updateCredits(this.playerBet);
        this.totalPlayerBet += -this.playerBet;
        this.wheelNumbers[this.findBetAmmountFromIndex(index)].betOnNumber = 0;
      }

      else {
        this.selectedNumbers.push(index);
        this.playerService.updateCredits(-this.playerBet);
        this.totalPlayerBet += this.playerBet;
        this.wheelNumbers[this.findBetAmmountFromIndex(index)].betOnNumber += this.playerBet;
        this.insufficentFunds = false;
      }
    }
    else{
      this.insufficentFunds = true;
      window.alert('You have insufficient funds. Please reduce your bet or spin the wheel!');
    }

  }

  onClickColour(event: any, colour: string, index: number) {
    if (this.selectedColours.includes(colour)) {
      this.selectedColours = this.selectedColours.filter(item => item !== colour);
      this.wheelColours[index].betOnColour = 0;
      this.playerService.updateCredits(this.playerBet);
      this.totalPlayerBet += -this.playerBet;
    } else {
      this.selectedColours.push(colour);
      this.playerService.updateCredits(-this.playerBet);
      this.totalPlayerBet += this.playerBet;
      this.wheelColours[index].betOnColour += this.playerBet;
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
    console.log(this.selectedColours);
    if (!this.isSpinning) {
      const deg = 360 + (Math.round((Math.random() * 500) / 10) * 10) * (360 / 37);
      event.target.style.setProperty('--rotation', `-${deg}deg`);
      event.target.classList.add('active');
      this.isSpinning = true;
      this.winningNumberIndex = this.findLandingPart(deg);

      setTimeout(() => {
        this.displayDiv = true;
        if (this.selectedNumbers.includes(this.wheelNumbers[this.winningNumberIndex].value)) {
          this.playerService.updateCredits(this.wheelNumbers[this.winningNumberIndex].betOnNumber * 36);

        }
        if(this.selectedColours.includes(this.wheelNumbers[this.winningNumberIndex].colour)){
          console.log(this.wheelNumbers[this.winningNumberIndex].colour)
          if(this.wheelNumbers[this.winningNumberIndex].colour === this.selectedColours[0]){
            this.playerService.updateCredits(this.wheelColours[0].betOnColour * 2);
          }
          if(this.wheelNumbers[this.winningNumberIndex].colour === this.selectedColours[1]){
            this.playerService.updateCredits(this.wheelColours[1].betOnColour * 2);
          }

        }

      }, 2000);
    }

    else {
      event.target.removeAttribute('style');
      event.target.classList.remove('active');
      this.saveLastBets();
      this.clearAllBets();
    }
  }

  wheelNumberColor(numberIndex: number) {
    const wheelNumber = this.wheelNumbers[numberIndex];
    const color = wheelNumber.colour;
    return color;
  }

  saveLastBets(){
    this.lastBetWheelNumbers = structuredClone(this.wheelNumbers);
    this.lastBetWheelColours = structuredClone(this.wheelColours);
    this.displayDiv = false;
    this.isSpinning = false;
    this.lastBetNumbers = this.selectedNumbers;
    this.lastBetColours = this.selectedColours;
    this.lastTotalPlayerBet = this.totalPlayerBet;
    this.totalPlayerBet = 0;
  }

  replayLastBet() {
    this.clearAllBets();
    this.selectedNumbers = this.lastBetNumbers;
    this.selectedColours = this.lastBetColours;
    this.wheelColours = structuredClone(this.lastBetWheelColours);
    this.wheelNumbers = structuredClone(this.lastBetWheelNumbers);
    this.totalPlayerBet = this.lastTotalPlayerBet;
    this.playerService.updateCredits(-this.totalPlayerBet);
  }

  clearAllBets() {
    this.playerService.updateCredits(this.totalPlayerBet);
    this.selectedNumbers = [];
    this.selectedColours = [];
    this.totalPlayerBet = 0;
    this.wheelNumbers.forEach((item) => {
      item.betOnNumber = 0;
    });
    this.wheelColours.forEach((item) => {
      item.betOnColour = 0;
    });
  }

  setPlayerBet(chipValue: number){
    this.playerBet = chipValue;
  }

  findBetAmmountFromIndex(displayNumber: number): number {
    const result = wheelNumbersArray.find((item) => item.value === displayNumber);
    return wheelNumbersArray.indexOf(result!);
  }
}
