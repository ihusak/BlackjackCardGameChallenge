import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CardModel} from '../models/card.model';
import {map} from 'rxjs/operators';

export interface ScoreResponse {
  dealerBusted: boolean;
  dealerScore: number;
  playerBusted: boolean;
  playerScore: number;
  whoWin: string;
  dealerFinished?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  public playersScore(cards: CardModel[]): Observable<ScoreResponse> {
    return this.http.post(`${this.apiUrl}/score`, cards).pipe(map((res: any) => {
      return {
        dealerBusted: res.dealerBusted,
        dealerScore: res.dealerScore,
        playerBusted: res.playerBusted,
        playerScore: res.playerScore,
        whoWin: res.whoWin,
        dealerFinished: res.dealerFinished
      };
    }));
  }
}
