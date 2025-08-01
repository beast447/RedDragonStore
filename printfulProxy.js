const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// Try loading .env from root or nested directories
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: './redDragonStore/.env', override: false });

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5050;
const BASE_URL = 'https://api.printful.com';

function authHeader(res) {
  const key = process.env.PRINTFUL_API_KEY;
  if (!key) {
    // If called without key, respond with error and log once
    if (res) {
      res.status(500).json({ error: 'PRINTFUL_API_KEY is not set' });
    }
    console.error('PRINTFUL_API_KEY environment variable is missing.');
    return null;
  }
  return 'Bearer ' + key;
}

// Single product details (define first to avoid prefix shadowing)
app.get('/api/printful/products/:id', async (req, res) => {
  const header = authHeader(res);
  if (!header) return;
  const { id } = req.params;
  try {
    const resp = await fetch(`${BASE_URL}/store/products/${id}`, {
      headers: {
        Authorization: header,
      },
    });
    const data = await resp.json();
    res.json(data.result || data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// List products
app.get('/api/printful/products', async (req, res) => {
  try {
    const header = authHeader(res);
    if (!header) return;
    const resp = await fetch(`${BASE_URL}/store/products`, {
      headers: {
        Authorization: header,
      },
    });
    const data = await resp.json();
    res.json(data.result || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create an order in Printful
app.post('/api/printful/orders', async (req, res) => {
  const header = authHeader(res);
  if (!header) return;

  try {
    const resp = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        Authorization: header,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    const data = await resp.json();
    if (!resp.ok) {
      return res.status(resp.status).json({ error: data.error || 'Printful error' });
    }
    res.json(data.result || data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Printful proxy listening on port ${PORT}`);
}); 