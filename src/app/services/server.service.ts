import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CardModel} from '../models/card.model';

export interface ScoreResponse {
  continueDealerDraw: boolean;
  dealerBusted: boolean;
  dealerScore: number;
  playerBusted: boolean;
  playerScore: number;
  whoWin: string;
  dealerFinished: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  public playersScore(cards: CardModel[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/score`, cards);
  }
}
