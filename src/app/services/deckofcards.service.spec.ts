import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {DeckOfCardsService} from './deckofcards.service';
import {CardModel} from '../models/card.model';

const EXAMPLE_CARD: CardModel = {
  code: '',
  image: '',
  value: '10',
  suit: '',
  upsideDown: false,
  user: ''
};

describe('DeckOfCardsService', () => {
  let service: DeckOfCardsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeckOfCardsService]
    });
    service = TestBed.get(DeckOfCardsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a deck', () => {
    const mockResponse = { deck_id: 'test_deck_id' };

    service.generateDeck().subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(service.deckId).toEqual('test_deck_id'); // Check if deckId is stored in localStorage
    });

    const req = httpMock.expectOne(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get a card from the deck', () => {
    const mockResponse = { cards: [EXAMPLE_CARD] };

    service.getCard().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://www.deckofcardsapi.com/api/deck/${service.deckId}/draw/?count=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
