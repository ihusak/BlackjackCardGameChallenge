import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CardComponent} from './card.component';
import {CardModel} from '../../models/card.model';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cards', () => {
    const card1: CardModel = {
      code: '8S',
      image: 'https://deckofcardsapi.com/static/img/8S.png',
      value: '8',
      suit: 'SPADES',
      upsideDown: false,
      user: 'dealer'
    };
    const card2: CardModel = {
      code: '6C',
      image: 'https://deckofcardsapi.com/static/img/6C.png',
      value: '6',
      suit: 'CLUBS',
      upsideDown: false,
      user: 'dealer'
    };
    component.cards = [card1, card2];
    fixture.detectChanges();

    const cardElements = fixture.nativeElement.querySelectorAll('.card'); // Assuming a class '.card' in your HTML
    expect(cardElements.length).toBe(2);

    const firstCard = cardElements[0].innerHTML.trim();
    const secondCard = cardElements[1].innerHTML.trim();

    expect(firstCard).toContain(card1.image);
    expect(secondCard).toContain(card2.image);
  });
});
