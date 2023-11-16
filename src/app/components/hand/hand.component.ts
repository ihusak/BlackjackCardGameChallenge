import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeckOfCardsService} from '../../services/deckofcards.service';
import {CardModel} from '../../models/card.model';
import {ServerService} from '../../services/server.service';
import {Subscribable, Subscriber} from 'rxjs';

enum playersEnum {
  dealer = 'dealer',
  player = 'player'
}

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {
  @Input() playerName: string = '';
  @Output() endGame: EventEmitter<any> = new EventEmitter<any>();
  @Output() restartGame: EventEmitter<any> = new EventEmitter<any>();
  @Output() drawItemCard: EventEmitter<any> = new EventEmitter<any>();
  public cards: CardModel[] = [];
  public playersEnum = playersEnum;
  public standing: boolean = false;
  @Input() handSum: number = 0;
  @Input() busted: boolean;
  constructor(private deckOfCardsService: DeckOfCardsService, private serverService: ServerService) { }

  ngOnInit() {
    this.dealerHand();
  }
  private dealerHand() {
    if (this.playerName === playersEnum.dealer) {
      for (let i = 0; i <= 1; i++) {
        this.drawCard();
      }
    }
  }
  public drawCard(player?: playersEnum) {
    return this.deckOfCardsService.getCard().subscribe((data) => {
      this.cards = [...this.cards, new CardModel(data.cards.pop())].map((card: CardModel) => {
        card.user = player ? playersEnum.player : playersEnum.dealer;
        return card;
      });
      if (!player && this.cards.length <= 2) {
        this.cards[0].upsideDown = true;
      }
      this.drawItemCard.emit();
    });
  }
  public stand() {
    this.standing = true;
    this.endGame.emit();
  }
  public _openAllCards() {
    this.cards.forEach((card: CardModel) => {
      card.upsideDown = false;
    });
  }
  public drop() {
    this.cards = [];
    this.dealerHand();
  }
}
