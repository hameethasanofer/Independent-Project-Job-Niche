import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const plans = [
    { months: 1, price: 299 },
    { months: 2, price: 499 },
    { months: 3, price: 699 },
];

const Plans = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const template = params.get('template');

    const handlePlanSelect = (plan) => {
        // Store selected month number in localStorage
        localStorage.setItem('selectedPlanMonths', plan.months.toString());

        // Redirect to payment page with plan and template info
        navigate(`/payment?template=${template}&months=${plan.months}`);
    };

    return (
        <div
            style={{
                maxWidth: 500,
                margin: '40px auto',
                padding: 24,
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
            }}
        >
            <h2 style={{ textAlign: 'center', color: '#FF6F00' }}>Choose Your Plan</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {plans.map((plan) => (
                    <li key={plan.months} style={{ margin: '24px 0', textAlign: 'center' }}>
                        <div style={{ fontSize: 20, fontWeight: 600 }}>
                            {plan.months} Month{plan.months > 1 ? 's' : ''}
                        </div>
                        <div style={{ fontSize: 18, margin: '8px 0', color: '#888' }}>₹{plan.price}</div>
                        <button
                            style={{
                                background: '#ff8c00',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 6,
                                padding: '10px 32px',
                                fontSize: 16,
                                cursor: 'pointer',
                                marginTop: 8,
                            }}
                            onClick={() => handlePlanSelect(plan)}
                        >
                            Choose Plan
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Plans;
