const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const scoreRouter = require('./routes/api');

const app = express();
app.use(bodyParser.json());
app.use('/api', scoreRouter); // Assuming the router is mounted at '/api'

const USERS = {
  dealer: 'dealer',
  player: 'player'
};

describe('Score Router', () => {
  it('should calculate scores and determine the winner when dealer wins', async () => {
    const cards = [
      {
        code: '2C',
        image: 'https://deckofcardsapi.com/static/img/2C.png',
        value: '2',
        suit: 'CLUBS',
        upsideDown: false,
        user: 'dealer'
      },
      {
        code: '3S',
        image: 'https://deckofcardsapi.com/static/img/3S.png',
        value: '3',
        suit: 'SPADES',
        upsideDown: false,
        user: 'dealer'
      },
      {
        code: '5D',
        image: 'https://deckofcardsapi.com/static/img/5D.png',
        value: '5',
        suit: 'DIAMONDS',
        upsideDown: false,
        user: 'dealer'
      },
      {
        code: '7D',
        image: 'https://deckofcardsapi.com/static/img/7D.png',
        value: '7',
        suit: 'DIAMONDS',
        upsideDown: false,
        user: 'dealer'
      },
      {
        code: '4C',
        image: 'https://deckofcardsapi.com/static/img/4C.png',
        value: '4',
        suit: 'CLUBS',
        upsideDown: false,
        user: 'player'
      },
      {
        code: 'JC',
        image: 'https://deckofcardsapi.com/static/img/JC.png',
        value: 'JACK',
        suit: 'CLUBS',
        upsideDown: false,
        user: 'player'
      }
    ];

    const response = await request(app)
      .post('/api/score')
      .send(cards);

    expect(response.status).toBe(200);
    expect(response.body.dealerScore).toBe(17); // Add expected dealer score
    expect(response.body.playerScore).toBe(14); // Add expected player score
    expect(response.body.dealerBusted).toBe(false); // Add expected dealer busted status
    expect(response.body.playerBusted).toBe(false); // Add expected player busted status
    expect(response.body.whoWin).toBe('dealer'); // Add expected winner
  });

  it('should calculate scores and determine the winner when player wins', async () => {
    const cards = [
      {
        code: '6D',
        image: 'https://deckofcardsapi.com/static/img/6D.png',
        value: '6',
        suit: 'DIAMONDS',
        upsideDown: false,
        user: 'dealer'
      },
      {
        code: '3S',
        image: 'https://deckofcardsapi.com/static/img/3S.png',
        value: '3',
        suit: 'SPADES',
        upsideDown: false,
        user: 'dealer'
      },
      {
        code: '5D',
        image: 'https://deckofcardsapi.com/static/img/5D.png',
        value: '5',
        suit: 'DIAMONDS',
        upsideDown: false,
        user: 'dealer'
      },
      {
        code: '7H',
        image: 'https://deckofcardsapi.com/static/img/7H.png',
        value: '7',
        suit: 'HEARTS',
        upsideDown: false,
        user: 'player'
      },
      {
        code: 'AC',
        image: 'https://deckofcardsapi.com/static/img/AC.png',
        value: 'ACE',
        suit: 'CLUBS',
        upsideDown: false,
        user: 'player'
      },
      {
        code: 'AC',
        image: 'https://deckofcardsapi.com/static/img/aceDiamonds.png',
        value: 'ACE',
        suit: 'DIAMONDS',
        upsideDown: false,
        user: 'player'
      }
    ];

    const response = await request(app)
      .post('/api/score')
      .send(cards);

    expect(response.status).toBe(200);
    expect(response.body.dealerScore).toBe(14); // Add expected dealer score
    expect(response.body.playerScore).toBe(19); // Add expected player score
    expect(response.body.dealerBusted).toBe(false); // Add expected dealer busted status
    expect(response.body.playerBusted).toBe(false); // Add expected player busted status
    expect(response.body.whoWin).toBe('player'); // Add expected winner
  });

  it('should calculate scores and determine the winner when dealer busted', async () => {
    const cards = [
      {
        code: '6D',
        image: 'https://deckofcardsapi.com/static/img/6D.png',
        value: '6',
        suit: 'DIAMONDS',
        upsideDown: false,
        user: 'dealer'
      },
      {
        code: '3S',
        image: 'https://deckofcardsapi.com/static/img/3S.png',
        value: '3',
        suit: 'SPADES',
        upsideDown: false,
        user: 'dealer'
      },
      {
        code: '5D',
        image: 'https://deckofcardsapi.com/static/img/5D.png',
        value: '5',
        suit: 'DIAMONDS',
        upsideDown: false,
        user: 'dealer'
      },
      {
        code: '10D',
        image: 'https://deckofcardsapi.com/static/img/10D.png',
        value: '10',
        suit: 'DIAMONDS',
        upsideDown: false,
        user: 'dealer'
      },
      {
        code: '7H',
        image: 'https://deckofcardsapi.com/static/img/7H.png',
        value: '7',
        suit: 'HEARTS',
        upsideDown: false,
        user: 'player'
      },
      {
        code: 'AC',
        image: 'https://deckofcardsapi.com/static/img/AC.png',
        value: 'ACE',
        suit: 'CLUBS',
        upsideDown: false,
        user: 'player'
      },
      {
        code: 'AC',
        image: 'https://deckofcardsapi.com/static/img/aceDiamonds.png',
        value: 'ACE',
        suit: 'DIAMONDS',
        upsideDown: false,
        user: 'player'
      }
    ];

    const response = await request(app)
      .post('/api/score')
      .send(cards);

    expect(response.status).toBe(200);
    expect(response.body.dealerScore).toBe(24); // Add expected dealer score
    expect(response.body.playerScore).toBe(19); // Add expected player score
    expect(response.body.dealerBusted).toBe(true); // Add expected dealer busted status
    expect(response.body.playerBusted).toBe(false); // Add expected player busted status
    expect(response.body.whoWin).toBe('player'); // Add expected winner
  });

  it('should calculate scores and determine the winner when player busted', async () => {
    const cards = [
      {
        code: '6D',
        image: 'https://deckofcardsapi.com/static/img/6D.png',
        value: '6',
        suit: 'DIAMONDS',
        upsideDown: false,
        user: 'dealer'
      },
      {
        code: '3S',
        image: 'https://deckofcardsapi.com/static/img/3S.png',
        value: '3',
        suit: 'SPADES',
        upsideDown: false,
        user: 'dealer'
      },
      {
        code: '5D',
        image: 'https://deckofcardsapi.com/static/img/5D.png',
        value: '5',
        suit: 'DIAMONDS',
        upsideDown: false,
        user: 'player'
      },
      {
        code: '10D',
        image: 'https://deckofcardsapi.com/static/img/10D.png',
        value: '10',
        suit: 'DIAMONDS',
        upsideDown: false,
        user: 'player'
      },
      {
        code: '7H',
        image: 'https://deckofcardsapi.com/static/img/7H.png',
        value: '7',
        suit: 'HEARTS',
        upsideDown: false,
        user: 'player'
      },
      {
        code: '5C',
        image: 'https://deckofcardsapi.com/static/img/5C.png',
        value: '5',
        suit: 'CLUBS',
        upsideDown: false,
        user: 'player'
      }
    ];

    const response = await request(app)
      .post('/api/score')
      .send(cards);

    expect(response.status).toBe(200);
    expect(response.body.dealerScore).toBe(9); // Add expected dealer score
    expect(response.body.playerScore).toBe(27); // Add expected player score
    expect(response.body.dealerBusted).toBe(false); // Add expected dealer busted status
    expect(response.body.playerBusted).toBe(true); // Add expected player busted status
    expect(response.body.whoWin).toBe('dealer'); // Add expected winner
  });

  it('should calculate scores correctly', () => {
    const cards = [
      {
        code: '6D',
        image: 'https://deckofcardsapi.com/static/img/6D.png',
        value: '6',
        suit: 'DIAMONDS',
        upsideDown: false,
        user: 'dealer'
      },
      {
        code: '3S',
        image: 'https://deckofcardsapi.com/static/img/3S.png',
        value: '3',
        suit: 'SPADES',
        upsideDown: false,
        user: 'dealer'
      },
      {
        code: '10D',
        image: 'https://deckofcardsapi.com/static/img/10D.png',
        value: '10',
        suit: 'DIAMONDS',
        upsideDown: false,
        user: 'player'
      },
      {
        code: '7H',
        image: 'https://deckofcardsapi.com/static/img/7H.png',
        value: '7',
        suit: 'HEARTS',
        upsideDown: false,
        user: 'player'
      },
      {
        code: 'AC',
        image: 'https://deckofcardsapi.com/static/img/AC.png',
        value: 'ACE',
        suit: 'CLUBS',
        upsideDown: false,
        user: 'player'
      },
      {
        code: 'AC',
        image: 'https://deckofcardsapi.com/static/img/aceDiamonds.png',
        value: 'ACE',
        suit: 'DIAMONDS',
        upsideDown: false,
        user: 'player'
      }
    ];
    const USER_CARDS = cards.filter((card) => card.user === USERS.player);
    const ACE_U = USER_CARDS.filter((card) => card.value === 'ACE');
    let SUM_U = USER_CARDS.reduce((sum, card) => {
      const value = card.value === 'ACE' ? 11 : isNaN(parseInt(card.value)) ? 10 : parseInt(card.value);
      if (card.upsideDown) return sum;
      sum += value;
      return sum;
    }, 0);
    expect(SUM_U).toBe(39);
    ACE_U.forEach(() => {
      if(ACE_U.length && SUM_U > 21) {
        SUM_U -= 10;
      }
    });
    expect(SUM_U).toBe(19);
    expect(ACE_U.length).toBe(2);


    const DEALER_CARDS = cards.filter((card) => card.user === USERS.dealer);
    const ACE = DEALER_CARDS.filter((card) => card.value === 'ACE');
    let SUM = DEALER_CARDS.reduce((sum, card) => {
      const value = card.value === 'ACE' ? 11 : isNaN(parseInt(card.value)) ? 10 : parseInt(card.value);
      if (card.upsideDown) return sum;
      sum += value;
      return sum;
    }, 0);
    ACE.forEach(() => {
      if(ACE.length && SUM > 21) {
        SUM -= 10;
      }
    });
    expect(SUM).toBe(9);
    expect(ACE.length).toBe(0);
  });

  it('should define winner correctly dealer has more points', () => {
    let winner = '',
      dealerScore = 21,
      playerScore = 19,
      dealerBusted = false,
      playerBusted = false;
    if(dealerScore > playerScore && !dealerBusted || playerBusted) {
      winner = USERS.dealer;
    }
    if(playerScore > dealerScore && !playerBusted || dealerBusted) {
      winner = USERS.player;
    }
    if(dealerScore === playerScore && !playerBusted && !dealerBusted) {
      winner = 'push';
    }
    expect(winner).toBe(USERS.dealer)
  });

  it('should define winner correctly player has more points', () => {
    let winner = '',
      dealerScore = 20,
      playerScore = 21,
      dealerBusted = false,
      playerBusted = false;
    if(dealerScore > playerScore && !dealerBusted || playerBusted) {
      winner = USERS.dealer;
    }
    if(playerScore > dealerScore && !playerBusted || dealerBusted) {
      winner = USERS.player;
    }
    if(dealerScore === playerScore && !playerBusted && !dealerBusted) {
      winner = 'push';
    }
    expect(winner).toBe(USERS.player)
  });

  it('should define winner correctly player has same points with dealer', () => {
    let winner = '',
      dealerScore = 21,
      playerScore = 21,
      dealerBusted = false,
      playerBusted = false;
    if(dealerScore > playerScore && !dealerBusted || playerBusted) {
      winner = USERS.dealer;
    }
    if(playerScore > dealerScore && !playerBusted || dealerBusted) {
      winner = USERS.player;
    }
    if(dealerScore === playerScore && !playerBusted && !dealerBusted) {
      winner = 'push';
    }
    expect(winner).toBe('push')
  });

  it('should define winner correctly player busted', () => {
    let winner = '',
      dealerScore = 15,
      playerScore = 24,
      dealerBusted = false,
      playerBusted = true;
    if(dealerScore > playerScore && !dealerBusted || playerBusted) {
      winner = USERS.dealer;
    }
    if(playerScore > dealerScore && !playerBusted || dealerBusted) {
      winner = USERS.player;
    }
    if(dealerScore === playerScore && !playerBusted && !dealerBusted) {
      winner = 'push';
    }
    expect(winner).toBe(USERS.dealer)
  });

  it('should define winner correctly dealer busted', () => {
    let winner = '',
      dealerScore = 28,
      playerScore = 21,
      dealerBusted = true,
      playerBusted = false;
    if(dealerScore > playerScore && !dealerBusted || playerBusted) {
      winner = USERS.dealer;
    }
    if(playerScore > dealerScore && !playerBusted || dealerBusted) {
      winner = USERS.player;
    }
    if(dealerScore === playerScore && !playerBusted && !dealerBusted) {
      winner = 'push';
    }
    expect(winner).toBe(USERS.player)
  });
});
