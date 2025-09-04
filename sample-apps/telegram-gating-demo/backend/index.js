require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// POST /verify-passport – Verify user's Passport score via Stamps API v2
app.post('/verify-passport', async (req, res) => {
  const { address } = req.body;
  
  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    // Use API key and scorer ID from environment variables
    const apiKey = process.env.PASSPORT_API_KEY;
    const scorerId = process.env.PASSPORT_SCORER_ID;
    
    if (!apiKey || !scorerId) {
      return res.status(500).json({ error: 'Missing API key or scorer ID' });
    }

    const url = `https://api.passport.xyz/v2/stamps/${scorerId}/score/${address}`;
    
    // Call Stamps API v2 to get the latest score for this address
    const response = await fetch(url, { 
      headers: { 'X-API-KEY': apiKey } 
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if the score meets the passing threshold (20 points)
    if (data.passing_score === true || (data.score && parseFloat(data.score) >= 20)) {
      console.log(`✅ Passport score verified for ${address} (score: ${data.score})`);
      return res.json({ 
        status: 'passed', 
        score: data.score,
        telegramLink: 'https://t.me/+axtkaeHda-I3MTJh'
      });
    } else {
      console.log(`❌ Passport score too low for ${address} (score: ${data.score})`);
      return res.json({ 
        status: 'failed', 
        score: data.score,
        message: 'Score must be 20 or higher to access the Developer Telegram'
      });
    }
  } catch (err) {
    console.error('Error verifying Passport score:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /telegram-access – Protected endpoint that serves the Telegram link
app.get('/telegram-access', async (req, res) => {
  const address = req.query.address;
  
  if (!address) {
    return res.status(400).json({ error: 'Address query parameter is required' });
  }

  try {
    const apiKey = process.env.PASSPORT_API_KEY;
    const scorerId = process.env.PASSPORT_SCORER_ID;
    
    const url = `https://api.passport.xyz/v2/stamps/${scorerId}/score/${address}`;
    const response = await fetch(url, { 
      headers: { 'X-API-KEY': apiKey } 
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.passing_score === true || (data.score && parseFloat(data.score) >= 20)) {
      // Address has a passing Passport score – redirect to Telegram
      return res.redirect('https://t.me/+axtkaeHda-I3MTJh');
    } else {
      // Not allowed to access the Telegram
      return res.status(403).json({ 
        error: 'Forbidden: Passport score too low',
        currentScore: data.score,
        requiredScore: 20
      });
    }
  } catch (err) {
    console.error('Error serving protected Telegram access:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Telegram Gating Backend running at http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
});
