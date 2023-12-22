import { WheelNumber, WheelColour, Card } from "./models";

export const wheelNumbersInOrder: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
export const wheelNumbersUlti: number[] = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];


export const wheelNumbersArray: WheelNumber[] = [
  { value: 0, colour: "green", betOnNumber: 0 },
  { value: 32, colour: "red", betOnNumber: 0 },
  { value: 15, colour: "black", betOnNumber: 0 },
  { value: 19, colour: "red", betOnNumber: 0 },
  { value: 4, colour: "black", betOnNumber: 0 },
  { value: 21, colour: "red", betOnNumber: 0 },
  { value: 2, colour: "black", betOnNumber: 0 },
  { value: 25, colour: "red", betOnNumber: 0 },
  { value: 17, colour: "black", betOnNumber: 0 },
  { value: 34, colour: "red", betOnNumber: 0 },
  { value: 6, colour: "black", betOnNumber: 0 },
  { value: 27, colour: "red", betOnNumber: 0 },
  { value: 13, colour: "black", betOnNumber: 0 },
  { value: 36, colour: "red", betOnNumber: 0 },
  { value: 11, colour: "black", betOnNumber: 0 },
  { value: 30, colour: "red", betOnNumber: 0 },
  { value: 8, colour: "black", betOnNumber: 0 },
  { value: 23, colour: "red", betOnNumber: 0 },
  { value: 10, colour: "black", betOnNumber: 0 },
  { value: 5, colour: "red", betOnNumber: 0 },
  { value: 24, colour: "black", betOnNumber: 0 },
  { value: 16, colour: "red", betOnNumber: 0 },
  { value: 33, colour: "black", betOnNumber: 0 },
  { value: 1, colour: "red", betOnNumber: 0 },
  { value: 20, colour: "black", betOnNumber: 0 },
  { value: 14, colour: "red", betOnNumber: 0 },
  { value: 31, colour: "black", betOnNumber: 0 },
  { value: 9, colour: "red", betOnNumber: 0 },
  { value: 22, colour: "black", betOnNumber: 0 },
  { value: 18, colour: "red", betOnNumber: 0 },
  { value: 29, colour: "black", betOnNumber: 0 },
  { value: 7, colour: "red", betOnNumber: 0 },
  { value: 28, colour: "black", betOnNumber: 0 },
  { value: 12, colour: "red", betOnNumber: 0 },
  { value: 35, colour: "black", betOnNumber: 0 },
  { value: 3, colour: "red", betOnNumber: 0 },
  { value: 26, colour: "black", betOnNumber: 0 }
];

export const wheelColoursArray: WheelColour[] = [
  { colour: "red", betOnColour: 0 },
  { colour: "black", betOnColour: 0 }
]

export const Deck: Card[] = [
  { id: 1, value: '2', symbol: 'heart' },
  { id: 2, value: '3', symbol: 'heart' },
  { id: 3, value: '4', symbol: 'heart' },
  { id: 4, value: '5', symbol: 'heart' },
  { id: 5, value: '6', symbol: 'heart' },
  { id: 6, value: '7', symbol: 'heart' },
  { id: 7, value: '8', symbol: 'heart' },
  { id: 8, value: '9', symbol: 'heart' },
  { id: 9, value: '10', symbol: 'heart' },
  { id: 10, value: 'jack', symbol: 'heart' },
  { id: 11, value: 'queen', symbol: 'heart' },
  { id: 12, value: 'king', symbol: 'heart' },
  { id: 13, value: '1', symbol: 'heart' },

  { id: 14, value: '2', symbol: 'diamond' },
  { id: 15, value: '3', symbol: 'diamond' },
  { id: 16, value: '4', symbol: 'diamond' },
  { id: 17, value: '5', symbol: 'diamond' },
  { id: 18, value: '6', symbol: 'diamond' },
  { id: 19, value: '7', symbol: 'diamond' },
  { id: 20, value: '8', symbol: 'diamond' },
  { id: 21, value: '9', symbol: 'diamond' },
  { id: 22, value: '10', symbol: 'diamond' },
  { id: 23, value: 'jack', symbol: 'diamond' },
  { id: 24, value: 'queen', symbol: 'diamond' },
  { id: 25, value: 'king', symbol: 'diamond' },
  { id: 26, value: '1', symbol: 'diamond' },

  { id: 27, value: '2', symbol: 'club' },
  { id: 28, value: '3', symbol: 'club' },
  { id: 29, value: '4', symbol: 'club' },
  { id: 30, value: '5', symbol: 'club' },
  { id: 31, value: '6', symbol: 'club' },
  { id: 32, value: '7', symbol: 'club' },
  { id: 33, value: '8', symbol: 'club' },
  { id: 34, value: '9', symbol: 'club' },
  { id: 35, value: '10', symbol: 'club' },
  { id: 36, value: 'jack', symbol: 'club' },
  { id: 37, value: 'queen', symbol: 'club' },
  { id: 38, value: 'king', symbol: 'club' },
  { id: 39, value: '1', symbol: 'club' },

  { id: 40, value: '2', symbol: 'spade' },
  { id: 41, value: '3', symbol: 'spade' },
  { id: 42, value: '4', symbol: 'spade' },
  { id: 43, value: '5', symbol: 'spade' },
  { id: 44, value: '6', symbol: 'spade' },
  { id: 45, value: '7', symbol: 'spade' },
  { id: 46, value: '8', symbol: 'spade' },
  { id: 47, value: '9', symbol: 'spade' },
  { id: 48, value: '10', symbol: 'spade' },
  { id: 49, value: 'jack', symbol: 'spade' },
  { id: 50, value: 'queen', symbol: 'spade' },
  { id: 51, value: 'king', symbol: 'spade' },
  { id: 52, value: '1', symbol: 'spade' },
];

export function doesUserHaveSufficientCreditsToPlaceABet(credits: number, playerBet: number): boolean{
  if(credits - playerBet >= 0){
    return true;
  }
  else{
    window.alert('You have insufficient funds. Please reduce your bet or add more credits');
    return false;
  }
}
