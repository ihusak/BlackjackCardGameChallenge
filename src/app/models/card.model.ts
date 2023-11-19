export class CardModel {
  code: string;
  image: string;
  value: string;
  suit: string;
  upsideDown: boolean = false;
  user: string;
  constructor(cardData: any) {
    this.code = cardData.code;
    this.image = cardData.image;
    this.value = cardData.value;
    this.suit = cardData.suit;
  }
}
