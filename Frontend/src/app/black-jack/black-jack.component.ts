import { Component } from '@angular/core';
import { Card} from '../ultis/models';
import { Deck } from '../ultis/ultis';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-black-jack',
  templateUrl: './black-jack.component.html',
  styleUrls: ['./black-jack.component.css']
})
export class BlackJackComponent {

  numberOfAces: number = 0
  playerCards!: Card[];
  cardListDealer: Card[] = [];
  cardListPlayer: Card[] = [];
  playingDeck: Card[] = structuredClone(Deck);
  delerIsBust: boolean = false;
  playerIsBust: boolean = false;
  playerBet: number = 5;
  playerHold: boolean = false;
  playerHandValue: number = 0;
  dealerHandValue: number = 0;
  showDealerFirstCard: boolean = true;
  selectedChip: number = 5;
  message: string = "";
  gameInProgress: boolean = false;

  constructor(private playerService: PlayerService) {}

  // Function to get a random card from the deck
  getRandomCard(): Card {
    const randomIndex = Math.floor(Math.random() * Deck.length);
    return Deck[randomIndex];
  }

  // Function for adding cards
  drawCard(cardList: Card[]) {
    if (this.playingDeck.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.playingDeck.length);
      const drawnCard = this.playingDeck.splice(randomIndex, 1)[0];
      cardList.push(drawnCard);
    }
  }
  clearAllCards(){
    this.cardListDealer = [];
    this.playerHandValue = 0;
    this.dealerHandValue = 0;
    this.cardListPlayer = [];
    this.playingDeck = structuredClone(Deck);
    this.playerIsBust = false;
    this.delerIsBust = false;
    this.showDealerFirstCard = true;
    this.playerHold = false;
    this.gameInProgress = false;
  }

  holdBet() {
    this.playerHold = true;
    if (this.playerIsBust) {
      this.message = "You lost"
      return;
    }
    else if (this.playerHandValue > this.dealerHandValue || (this.delerIsBust && !this.playerIsBust)) {
      this.playerService.updateCredits(2 * this.playerBet);
      this.message = "You won"
      return;
    }
    else if (this.playerHandValue < this.dealerHandValue || this.playerIsBust) {
      this.message = "You lost"
      return;
    }
    else {
      this.message = "You lost"
      return;
    }

  }

  playerLogic(cardListPlayer: Card[], cardListDealer: Card[]){
    let handValue!: number;
    if(this.showDealerFirstCard){
      this.gameInProgress = true;
      this.dealerLogic(cardListDealer);
      this.playerService.updateCredits(-this.playerBet);
      this.numberOfAces = 0;
    }
    if(!this.playerIsBust && !this.playerHold){
      this.drawCard(cardListPlayer)
      handValue = this.calculateTotalValue(cardListPlayer);
      if(handValue > 21){
        this.playerIsBust = true;
        this.numberOfAces = 0;
      }
    }
    this.playerHandValue = handValue;
  }
  dealerLogic(cardList: Card[]){
    let dealerHand = 0;
    while(!this.delerIsBust && dealerHand < 17){
      console.log(this.playingDeck)
      this.drawCard(cardList);
      dealerHand = this.calculateTotalValue(cardList);
      if(dealerHand > 21){
        this.delerIsBust = true;
        break;
      }
    }
    this.showDealerFirstCard = false;
    this.dealerHandValue = dealerHand;
  }

    calculateTotalValue(cardList: Card[]): number {
    return this.checkForAces(cardList.reduce((total, card) => {
      if (card.value === '1' && total + 11 < 21) {
        this.numberOfAces++;
        return total + 11;
      }
      else if (['king', 'queen', 'jack'].includes(card.value)) {
        return total + 10;
      }
      else {
        return total + parseInt(card.value, 10);
      }
    }, 0));
  }

  checkForAces(handValue: number): number {
    while (handValue > 21 && this.numberOfAces > 0) {
      handValue = handValue - 10;
      this.numberOfAces--;
    }
    return handValue;
  }

  setPlayerBet(chipValue: number) {
    this.playerBet = chipValue;
    this.selectedChip = chipValue;
  }

  getChipSize(chipValue: number): string {
    return this.selectedChip === chipValue ? 'scale(1.25)' : 'scale(1)';
  }
}


