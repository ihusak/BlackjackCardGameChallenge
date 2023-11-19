import {TestBed, ComponentFixture, tick, fakeAsync} from '@angular/core/testing';
import { TableComponent } from './table.component';
import { DeckOfCardsService } from '../../services/deckofcards.service';
import { ServerService, ScoreResponse } from '../../services/server.service';
import { HandComponent } from '../hand/hand.component';
import { of } from 'rxjs';
import { CardModel } from '../../models/card.model';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

const userCards: CardModel[] = [{
  code: '9H',
  image: 'https://deckofcardsapi.com/static/img/9H.png',
  value: '9',
  suit: 'HEARTS',
  upsideDown: false,
  user: 'dealer',
}, {
  code: 'QD',
  image: 'https://deckofcardsapi.com/static/img/QD.png',
  value: 'QUEEN',
  suit: 'DIAMONDS',
  upsideDown: false,
  user: 'dealer',
}]; // Mock user cards
const scoreResponse: ScoreResponse = {
  dealerBusted: false,
  dealerScore: 9,
  playerBusted: false,
  playerScore: 0,
  whoWin: 'dealer'
}; // Mock score response

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let mockDeckOfCardsService: jasmine.SpyObj<DeckOfCardsService>;
  let mockServerService: jasmine.SpyObj<ServerService>;
  let mockHandComponent: jasmine.SpyObj<HandComponent>;

  beforeEach(async () => {
    const deckServiceSpy = jasmine.createSpyObj('DeckOfCardsService', ['generateDeck']);
    const serverServiceSpy = jasmine.createSpyObj('ServerService', ['playersScore']);

    await TestBed.configureTestingModule({
      declarations: [TableComponent, HandComponent],
      providers: [
        { provide: DeckOfCardsService, useValue: deckServiceSpy },
        { provide: ServerService, useValue: serverServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    mockDeckOfCardsService = TestBed.get(DeckOfCardsService) as jasmine.SpyObj<DeckOfCardsService>;
    mockServerService = TestBed.get(ServerService) as jasmine.SpyObj<ServerService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    mockHandComponent = jasmine.createSpyObj('HandComponent', ['drawCard', '_openAllCards', 'drop']);
    component.dealer = mockHandComponent;
    component.player = mockHandComponent;
    console.log('mockHandComponent', mockHandComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate deck when generateDeck is called', () => {
    const deck = {}; // Your mock deck object

    mockDeckOfCardsService.generateDeck.and.returnValue(of(deck));
    component.generateDeck();

    expect(component.gameReady).toBe(true);
  });

  it('should define winner correctly', () => {
    mockServerService.playersScore.and.returnValue(of(scoreResponse));
    mockServerService.playersScore(userCards).subscribe((res) => {
      component.playerScore = res.playerScore;
      component.dealerBusted = res.dealerBusted;
      component.playerBusted = res.playerBusted;
      component.whoWin = res.whoWin;
      expect(component.playerScore).toBe(scoreResponse.playerScore);
      expect(component.dealerBusted).toBe(scoreResponse.dealerBusted);
      expect(component.playerBusted).toBe(scoreResponse.playerBusted);
      expect(component.whoWin).toBe(scoreResponse.whoWin);
    });
    expect(mockServerService.playersScore).toHaveBeenCalledWith(userCards);
  });

  it('should handle stand correctly', fakeAsync(() => {
    mockHandComponent._openAllCards();
    component.standing = true;
    expect(mockHandComponent._openAllCards).toHaveBeenCalled();
    expect(component.standing).toBe(true);
  }));

  it('should restart game correctly', () => {
    mockHandComponent.drop();
    expect(mockHandComponent.drop).toHaveBeenCalled();
    expect(component.standing).toBe(false);
    expect(component.result).toBe(false);
  });
});
