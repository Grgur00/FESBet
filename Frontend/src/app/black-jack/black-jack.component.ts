import { Component } from '@angular/core';
import { Card} from '../ultis/models';
import { Deck, doesUserHaveSufficientCreditsToPlaceABet } from '../ultis/ultis';
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
  //playingDeck: Card[] = [{ id: 8, value: '9', symbol: 'heart' },{ id: 13, value: '1', symbol: 'heart' },{ id: 3, value: '4', symbol: 'heart' },{ id: 1, value: '2', symbol: 'heart' },{ id: 6, value: '7', symbol: 'heart' },]
  dealerIsBust: boolean = false;
  playerIsBust: boolean = false;
  playerBet: number = 5;
  playerHold: boolean = false;
  playerHandValue: number = 0;
  dealerHandValue: number = 0;
  showDealerFirstCard: boolean = true;
  selectedChip: number = 5;
  winLoseMessage: string = "";
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
    //this.playingDeck = [{ id: 8, value: '9', symbol: 'heart' },{ id: 13, value: '1', symbol: 'heart' },{ id: 3, value: '4', symbol: 'heart' },{ id: 1, value: '2', symbol: 'heart' },{ id: 6, value: '7', symbol: 'heart' },];
    this.playerIsBust = false;
    this.dealerIsBust = false;
    this.showDealerFirstCard = true;
    this.playerHold = false;
    this.gameInProgress = false;
  }

  holdBet() {
    this.playerHold = true;
    this.gameInProgress = false;
    if (this.playerIsBust) {
      this.winLoseMessage = "You lost";
      return;
    }
    else if (this.playerHandValue > this.dealerHandValue || (this.dealerIsBust && !this.playerIsBust)) {
      this.playerService.updateCredits(2 * this.playerBet);
      this.winLoseMessage = "You won";
      return;
    }
    else if (this.playerHandValue < this.dealerHandValue || this.playerIsBust) {
      this.winLoseMessage = "You lost";
      return;
    }
    else if(this.playerHandValue == this.dealerHandValue && !this.playerIsBust) {
      this.playerService.updateCredits(this.playerBet);
      this.winLoseMessage = "Draw";
      return;
    }

  }

  playerLogic(cardListPlayer: Card[], cardListDealer: Card[]){
    let handValue!: number;
    if(doesUserHaveSufficientCreditsToPlaceABet(this.playerService.player.credits, this.playerBet)){
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
  }

  dealerLogic(cardList: Card[]){
    let dealerHand = 0;
    while(!this.dealerIsBust && dealerHand < 17){
      this.drawCard(cardList);
      dealerHand = this.calculateTotalValue(cardList);
      if(dealerHand > 21){
        this.dealerIsBust = true;
        break;
      }
    }
    dealerHand = this.calculateTotalValue(cardList);
    this.showDealerFirstCard = false;
    this.dealerHandValue = dealerHand;
  }

  calculateTotalValue(cardList: Card[]): number {
    let handValue = 0;
    let numberOfAces = 0;

    for (const card of cardList) {
      if (card.value === '1') {
        numberOfAces++;
        handValue += 11;
      } else if (['king', 'queen', 'jack'].includes(card.value)) {
        handValue += 10;
      } else {
        handValue += parseInt(card.value, 10);
      }
    }

    while (handValue > 21 && numberOfAces > 0) {
      handValue -= 10;
      numberOfAces--;
    }

    this.numberOfAces = numberOfAces;
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


