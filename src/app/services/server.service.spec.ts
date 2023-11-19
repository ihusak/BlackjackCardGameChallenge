import { TestBed } from '@angular/core/testing';

import {ScoreResponse, ServerService} from './server.service';
import {CardModel} from '../models/card.model';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

const EXAMPLE_RESPONSE: ScoreResponse = {
  dealerBusted: false,
  dealerScore: 10,
  playerBusted: false,
  playerScore: 0,
  whoWin: ''
};

const EXAMPLE_CARD: CardModel = {
  code: '',
  image: '',
  value: '10',
  suit: '',
  upsideDown: false,
  user: ''
};

describe('ServerService', () => {
  let service: ServerService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [ServerService]
    }).compileComponents();
    service = TestBed.get(ServerService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return score value', () => {
    const mockCards: CardModel[] = [EXAMPLE_CARD]; // Mock card data

    const mockResponse: ScoreResponse = EXAMPLE_RESPONSE;
    service.playersScore(mockCards).subscribe((response: ScoreResponse) => {
      expect(response).toEqual(EXAMPLE_RESPONSE);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/score');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
