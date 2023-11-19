import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DeckOfCardsService} from '../../services/deckofcards.service';
import {CardModel} from '../../models/card.model';
import {HandComponent} from '../hand/hand.component';
import {ScoreResponse, ServerService} from '../../services/server.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  public gameReady: boolean = false;
  public dealerScore: number = 0;
  public playerScore: number = 0;
  public dealerBusted: boolean = false;
  public playerBusted: boolean = false;
  public whoWin: string = '';
  public standing: boolean = false;
  public result: boolean = false;
  @ViewChild('dealer', {static: false}) dealer: HandComponent;
  @ViewChild('player', {static: false}) player: HandComponent;
  private subscriptions: Subscription = new Subscription();
  constructor(private deckOfCardsService: DeckOfCardsService, private serverService: ServerService) { }

  ngOnInit() {
  }
  // generate table init
  public generateDeck() {
    this.deckOfCardsService.generateDeck().subscribe((deck) => {
      this.gameReady = true;
    });
  }
  // send all cards to server when player call action draw each card
  public defineWinner() {
    const userCards: CardModel[] = [...this.dealer.cards, ...this.player.cards];
    const playersScoreSub = this.serverService.playersScore(userCards).subscribe((res: ScoreResponse) => {
      this.dealerScore = res.dealerScore;
      this.playerScore = res.playerScore;
      this.dealerBusted = res.dealerBusted;
      this.playerBusted = res.playerBusted;
      this.whoWin = res.whoWin;
      // check if game finished but dealer score not reach 21 point
      if (this.player.standing && this.dealerScore < 21) {
        // continue draw card for dealer if dealerScore lower than playerScore
        if (this.playerScore >= this.dealerScore) {
          this.dealer.drawCard();
        }
      }
      // show result that player busted and dealer won
      if (this.playerBusted) {
        this.result = true;
      }
    });
    this.subscriptions.add(playersScoreSub);
  }
  // end game and calculate final score
  public stand() {
    // open dealer hidden card
    this.dealer._openAllCards();
    this.defineWinner();
    this.standing = true;
  }
  // reset game, dealer and player cards updated, new game
  public restartGame() {
    this.dealer.drop();
    this.player.drop();
    this.player.standing = false;
    this.standing = false;
    this.result = false;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
