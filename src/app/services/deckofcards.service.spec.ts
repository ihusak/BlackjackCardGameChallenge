import { TestBed } from '@angular/core/testing';

import { DeckOfCardsService } from './deckofcards.service';

describe('DeckOfCardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeckOfCardsService = TestBed.get(DeckOfCardsService);
    expect(service).toBeTruthy();
  });
});
