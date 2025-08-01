'use strict';

// Netlify Function: Create a Printful order
// Endpoint: /.netlify/functions/printful-orders
// If you keep the redirect in netlify.toml, frontend can POST to /api/printful/orders

const BASE_URL = 'https://api.printful.com';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const apiKey = process.env.PRINTFUL_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'PRINTFUL_API_KEY not set' }),
    };
  }

  try {
    const resp = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: event.body,
    });

    const data = await resp.json();
    const statusCode = resp.status;

    return {
      statusCode,
      body: JSON.stringify(data.result || data),
    };
  } catch (err) {
    console.error('Printful order error', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
