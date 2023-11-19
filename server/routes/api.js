const express = require('express');
const router = express.Router();

const USERS = {
  dealer: 'dealer',
  player: 'player'
};

router.post('/score', (req, res) => {
  const DEALER_CARDS = req.body.filter((card) => card.user === USERS.dealer);
  const USER_CARDS = req.body.filter((card) => card.user === USERS.player);
  const dealerScore = calculateSum(DEALER_CARDS);
  const playerScore = calculateSum(USER_CARDS);
  const RESULT = {
    dealerScore: dealerScore,
    playerScore: playerScore,
    dealerBusted: dealerScore > 21, // busted
    playerBusted: playerScore > 21, // busted
    whoWin: defineWinner(dealerScore, playerScore, dealerScore > 21, playerScore > 21)
  };
  res.json(RESULT);
});

function calculateSum(cards) {
  const ACE = cards.filter((card) => card.value === 'ACE');
  let SUM = cards.reduce((sum, card) => {
    const value = card.value === 'ACE' ? 11 : isNaN(parseInt(card.value)) ? 10 : parseInt(card.value);
    if (card.upsideDown) return sum;
    sum += value;
    return sum;
  }, 0);
  ACE.forEach(() => {
    if(ACE.length && SUM > 21) {
      SUM -= 10;
    }
  })
  return SUM;
}

function defineWinner(dealerScore, playerScore, dealerBusted, playerBusted) {
  let winner = '';
  if(dealerScore > playerScore && !dealerBusted || playerBusted) {
    winner = USERS.dealer;
  }
  if(playerScore > dealerScore && !playerBusted || dealerBusted) {
    winner = USERS.player;
  }
  if(dealerScore === playerScore && !playerBusted && !dealerBusted) {
    winner = 'push';
  }
  return winner;
}

module.exports = router;
