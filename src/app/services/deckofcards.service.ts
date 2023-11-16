import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeckOfCardsService {
  private apiUrl: string = 'https://www.deckofcardsapi.com/api/deck/';
  private tableCount: number = 1;
  private cardCount: number = 1;
  constructor(private http: HttpClient) { }
  public generateDeck(): Observable<any> {
    return this.http.get(this.apiUrl + `new/shuffle/?deck_count=${this.tableCount}`).pipe(
      tap(data => localStorage.setItem('deckId', data.deck_id))
    );
  }
  public getCard(): Observable<any> {
    return this.http.get(this.apiUrl + `${this.deckId}/draw/?count=${this.cardCount}`);
  }
  get deckId(): string {
    return localStorage.getItem('deckId');
  }
}
