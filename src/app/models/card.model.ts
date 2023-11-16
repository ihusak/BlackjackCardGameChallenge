export class CardModel {
  code: string;
  image: string;
  images: object;
  value: string;
  suit: string;
  upsideDown: boolean = false;
  user: string;
  constructor(cardData: any) {
    this.code = cardData.code;
    this.image = cardData.image;
    this.images = cardData.images;
    this.value = cardData.value;
  }
}
