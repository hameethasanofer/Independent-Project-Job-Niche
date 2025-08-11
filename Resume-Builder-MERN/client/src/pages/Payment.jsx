import React from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51RXFfjQ2COMIl2gXw5lch7lGQFOJ8SwJRYw7zougEIs4paak59qedRIVy2DTKU5Jr15mDTFfWoVa5gXHIbySF0kI000Q5aZr6l');

const Payment = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const template = params.get('template');
  const months = params.get('months');

  const handleStripePayment = async () => {
    try {
      const stripe = await stripePromise;

      // Call your backend to create a Checkout Session
     const response = await fetch('http://localhost:5001/api/stripe/create-checkout-session', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template, months })
      });

      const session = await response.json();

      if (!session.id) {
        throw new Error('Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '60px auto',
        padding: 24,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.10)'
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#FF6F00' }}>Payment</h2>
      <p style={{ textAlign: 'center' }}>
        You selected <b>Template {template}</b> for <b>{months} month(s)</b>.
      </p>
      <button
        style={{
          background: '#635bff',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '12px 36px',
          fontSize: 18,
          cursor: 'pointer',
          display: 'block',
          margin: '32px auto 0 auto'
        }}
        onClick={handleStripePayment}
      >
        Pay with Stripe
      </button>
    </div>
  );
};

export default Payment;
