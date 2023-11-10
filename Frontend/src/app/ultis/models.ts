export interface IPlayer{
  id: number;
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
