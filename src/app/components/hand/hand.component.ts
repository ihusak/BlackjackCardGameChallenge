import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DeckOfCardsService} from '../../services/deckofcards.service';
import {CardModel} from '../../models/card.model';
import {Subscription} from 'rxjs';

enum playersEnum {
  dealer = 'dealer',
  player = 'player'
}

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit, OnDestroy {
  @Input() playerName: string = '';
  @Input() handSum: number = 0;
  @Input() busted: boolean;
  @Output() endGame: EventEmitter<any> = new EventEmitter<any>();
  @Output() restartGame: EventEmitter<any> = new EventEmitter<any>();
  @Output() drawItemCard: EventEmitter<any> = new EventEmitter<any>();
  public cards: CardModel[] = [];
  public playersEnum = playersEnum;
  public standing: boolean = false;
  public subscriptions: Subscription = new Subscription();
  constructor(private deckOfCardsService: DeckOfCardsService) { }

  ngOnInit() {
    this.dealerHand();
  }
  get _playerName() {
    return this.playerName;
  }
  public dealerHand() {
    if (this.playerName === playersEnum.dealer) {
      for (let i = 0; i <= 1; i++) {
        this.drawCard();
      }
    }
  }
  public drawCard(player?: playersEnum) {
    const getCardSub = this.deckOfCardsService.getCard().subscribe((data) => {
      this.cards = [...this.cards, new CardModel(data.cards.pop())].map((card: CardModel) => {
        card.user = player ? playersEnum.player : playersEnum.dealer;
        return card;
      });
      if (!player && this.cards.length <= 2) {
        this.cards[0].upsideDown = true;
      }
      this.drawItemCard.emit();
    });
    this.subscriptions.add(getCardSub);
    return getCardSub;
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
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
