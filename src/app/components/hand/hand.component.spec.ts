import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HandComponent } from './hand.component';
import { DeckOfCardsService } from '../../services/deckofcards.service';
import { CardModel } from '../../models/card.model';
import { of } from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

const CARD: CardModel = {
  code: '8S',
  image: 'https://deckofcardsapi.com/static/img/8S.png',
  value: '8',
  suit: 'SPADES',
  upsideDown: false,
  user: 'dealer'
};
const CARD2: CardModel = {
  code: '6C',
  image: 'https://deckofcardsapi.com/static/img/6C.png',
  value: '6',
  suit: 'CLUBS',
  upsideDown: false,
  user: 'dealer'
};
enum playersEnum {
  dealer = 'dealer',
  player = 'player'
}

describe('HandComponent', () => {
  let component: HandComponent;
  let fixture: ComponentFixture<HandComponent>;
  let mockDeckOfCardsService: jasmine.SpyObj<DeckOfCardsService>;

  beforeEach(() => {
    const deckServiceSpy = jasmine.createSpyObj('DeckOfCardsService', ['getCard']);

    TestBed.configureTestingModule({
      declarations: [HandComponent],
      providers: [{ provide: DeckOfCardsService, useValue: deckServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HandComponent);
    component = fixture.componentInstance;
    mockDeckOfCardsService = TestBed.get(DeckOfCardsService) as jasmine.SpyObj<DeckOfCardsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should draw a card for dealer', () => {
    component.playerName = 'dealer';

    const mockCardData = { cards: [CARD, CARD2] };
    mockDeckOfCardsService.getCard.and.returnValue(of(mockCardData));
    component.dealerHand();
    expect(component.cards.length).toBe(2); // Assuming the dealer always draws 2 cards initially
  });

  it('should draw a card for player', () => {
    component.playerName = 'player';

    const mockCardData = { cards: [CARD] };
    mockDeckOfCardsService.getCard.and.returnValue(of(mockCardData));

    component.drawCard(playersEnum.player);
    expect(component.cards.length).toBe(1); // Assuming the player draws 1 card
  });
  it('should stand and end the game', () => {
    spyOn(component.endGame, 'emit');

    component.stand();
    expect(component.standing).toBe(true);
    expect(component.endGame.emit).toHaveBeenCalled();
  });

  it('should open all cards', () => {
    component.cards = [CARD, CARD2];

    component._openAllCards();
    expect(component.cards.every(card => !card.upsideDown)).toBe(true);
  });

  it('should drop all cards and deal new hand for dealer', () => {
    spyOn(component, 'dealerHand');

    component.drop();
    expect(component.cards.length).toBe(0);
    expect(component.dealerHand).toHaveBeenCalled();
  });

  it('should unsubscribe onDestroy', () => {
    spyOn(component.subscriptions, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscriptions.unsubscribe).toHaveBeenCalled();
  });

  it('should set playerName dealer through @Input', () => {
    component.playerName = 'dealer';
    expect(component._playerName).toContain('dealer');
  });

  it('should set playerName player through @Input', () => {
    component.playerName = 'player';
    expect(component._playerName).toContain('player');
  });

  it('should emit endGame event through @Output', () => {
    spyOn(component.endGame, 'emit');
    component.stand();
    expect(component.endGame.emit).toHaveBeenCalled();
  });

  it('should emit restartGame event through @Output', () => {
    spyOn(component.restartGame, 'emit');
    component.restartGame.emit();
    expect(component.restartGame.emit).toHaveBeenCalled();
  });

  it('should emit drawItemCard event through @Output', () => {
    spyOn(component.drawItemCard, 'emit');
    const mockCardData = { cards: [CARD] };
    mockDeckOfCardsService.getCard.and.returnValue(of(mockCardData));
    component.drawCard(playersEnum.player);
    expect(component.drawItemCard.emit).toHaveBeenCalled();
  });
});
