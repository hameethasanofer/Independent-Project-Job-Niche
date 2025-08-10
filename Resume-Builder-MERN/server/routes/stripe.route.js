const express = require('express');
const dotenv = require('dotenv'); 
dotenv.config(); // Make sure .env loads before using process.env

const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // now the key will not be undefined

router.post('/create-checkout-session', async (req, res) => {
    const { template, months } = req.body;
    const priceMap = { 1: 299, 2: 499, 3: 699 };
    const price = priceMap[months] || 299;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: `Resume Template ${template} - ${months} Month(s) Access`,
                    },
                    unit_amount: price * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:5173/success?template=${template}` ,
            cancel_url: 'http://localhost:5173/cancel',
        });
        res.json({ id:session.id });
    } catch (err) {
        console.error('Stripe error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
