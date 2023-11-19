import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DeckOfCardsService} from '../../services/deckofcards.service';
import {CardModel} from '../../models/card.model';
import {Observable, Subscription} from 'rxjs';

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
  // name of player ('dealer', 'player')
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
    // when init component draw dealer cards
    if (this.playerName === this.playersEnum.dealer) {
      this.dealerHand();
    }
  }
  // getter of player name
  get _playerName() {
    return this.playerName;
  }
  // init two calls to get dealer cards
  public dealerHand() {
    if (this.playerName === playersEnum.dealer) {
      for (let i = 0; i <= 1; i++) {
        this.drawCard();
      }
    }
  }
  // drawCard function call deckOfCardsService.getCard method that return card from api
  // argument define for what player get card
  public drawCard(player?: playersEnum) {
    const getCardSub = this.deckOfCardsService.getCard().subscribe((data) => {
      this.cards = [...this.cards, new CardModel(data.cards.pop())].map((card: CardModel) => {
        card.user = player ? playersEnum.player : playersEnum.dealer;
        return card;
      });
      // hide first card for dealer
      if (!player && this.cards.length <= 2) {
        this.cards[0].upsideDown = true;
      }
      // emit calculate result parent function
      this.drawItemCard.emit();
    });
    this.subscriptions.add(getCardSub);
  }
  // end game action
  public stand() {
    this.standing = true;
    this.endGame.emit();
  }
  // open component cards
  public _openAllCards() {
    this.cards.forEach((card: CardModel) => {
      card.upsideDown = false;
    });
  }
  // reset game
  public drop() {
    this.cards = [];
    // re init dealer hand
    this.dealerHand();
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
