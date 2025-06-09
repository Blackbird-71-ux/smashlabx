const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../config/database');

// Create payment intent
router.post('/create-intent', async (req, res) => {
  try {
    const { amount, bookingId, clientId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: {
        bookingId,
        clientId
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating payment intent' });
  }
});

// Handle successful payment
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const { bookingId } = paymentIntent.metadata;

      // Update booking status
      await db.query(
        'UPDATE bookings SET payment_status = $1 WHERE id = $2',
        ['paid', bookingId]
      );
    }

    res.json({ received: true });
  } catch (error) {
    console.error(error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

module.exports = router; 