import {Component, OnInit, ViewChild} from '@angular/core';
import {DeckOfCardsService} from '../../services/deckofcards.service';
import {CardModel} from '../../models/card.model';
import {HandComponent} from '../hand/hand.component';
import {ScoreResponse, ServerService} from '../../services/server.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
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
  constructor(private deckOfCardsService: DeckOfCardsService, private serverService: ServerService) { }

  ngOnInit() {
  }
  public generateDeck() {
    this.deckOfCardsService.generateDeck().subscribe((deck) => {
      this.gameReady = true;
    });
  }
  public defineWinner() {
    const userCards: CardModel[] = [...this.dealer.cards, ...this.player.cards];
    this.serverService.playersScore(userCards).subscribe((res: ScoreResponse) => {
      this.dealerScore = res.dealerScore;
      this.playerScore = res.playerScore;
      this.dealerBusted = res.dealerBusted;
      this.playerBusted = res.playerBusted;
      this.whoWin = res.whoWin;
      if (this.player.standing && this.dealerScore < 21) {
        if (this.playerScore >= this.dealerScore) {
          this.dealer.drawCard();
        }
      }
      if (this.playerBusted) {
        this.result = true;
      }
    });
  }
  public stand() {
    this.dealer._openAllCards();
    this.defineWinner();
    this.standing = true;
  }
  public restartGame() {
    this.dealer.drop();
    this.player.drop();
    this.player.standing = false;
    this.standing = false;
    this.result = false;
  }
}
