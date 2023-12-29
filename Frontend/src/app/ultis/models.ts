export interface IPlayer{
  id: string;
  username: string;
  email: string;
  credits: number;
}

export interface WheelNumber{
  value: number;
  colour: string;
  betOnNumber: number;
}

export interface WheelColour{
  colour: string;
  betOnColour: number;
}

export interface Card{
  id: number;
  value: string;
  symbol: string
}
