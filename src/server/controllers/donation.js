const stripe = require('stripe')(process.env.STRIPE_SKEY);

/**
 * POST /api/stripe
 * Make a payment.
 */
export default function postStripe(req, res) {
  const stripeToken = req.body.stripeToken;
  const stripeEmail = req.body.stripeEmail;
  const amount = req.body.amount;
  const name = req.body.cardHolderName;

  stripe.charges.create({
    amount: amount * 100,
    currency: 'inr',
    source: stripeToken,
    description: `Donation from ${name}(${stripeEmail})`
  }, (err) => {
    if (err && err.type === 'StripeCardError') {
      // req.flash('errors', { msg: 'Your card has been declined.' });
      // return res.redirect('/api/stripe');
      return res.json({
        error: true,
        message: 'Your card has been declined.'
      });
    }
    // req.flash('success', { msg: 'Your card has been successfully charged.' });
    // res.redirect('/api/stripe');
    return res.json({
      error: false,
      message: 'Your card has been successfully charged.'
    });
  });
};
