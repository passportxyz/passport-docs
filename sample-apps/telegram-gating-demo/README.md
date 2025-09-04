# Developer Telegram Access - Passport Gating Demo

This is a comprehensive sample application demonstrating how to use **Passport Embed** and the **Stamps API v2** to gate access to exclusive content based on a user's Passport score. In this case, we're protecting access to a Developer Telegram community that requires a minimum Passport score of 20 points.

## 🎯 What This Demo Shows

- **Wallet Connection**: Using Reown AppKit for seamless wallet connectivity
- **Passport Integration**: Embedding Passport verification directly in your app
- **Score-Based Gating**: Requiring users to meet a minimum Passport score (20 points)
- **Backend Verification**: Securely verifying scores server-side using Stamps API v2
- **Real-World Use Case**: Gating access to a Telegram community for developers

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Stamps API    │
│   (Vite+React)  │◄──►│   (Express)     │◄──►│   (Stamps v2)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Frontend (Vite + React)
- **Wallet Connection**: Reown AppKit with Wagmi integration
- **Passport Widget**: Embedded score verification and stamp collection
- **Real-time Updates**: Live score checking and UI updates
- **Responsive Design**: Works on desktop and mobile

### Backend (Express.js)
- **Secure Verification**: Server-side Passport score validation
- **API Endpoints**: RESTful endpoints for score verification and access control
- **Error Handling**: Comprehensive error handling and logging

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Stamps API credentials ([Get them here](https://developer.passport.xyz/))
- Reown Project ID ([Get one here](https://cloud.reown.com/))

### 🔄 Package Status

**Currently using MOCK data due to package installation issues.**

The `@human.tech/passport-embed` package has a post-install script issue (trying to access dev files not included in the published package). 

**Once the package is fixed:**
1. Install: `npm install @human.tech/passport-embed`
2. Update import in `src/App.jsx`:
   ```jsx
   // Change from:
   import { ... } from './lib/passport-embed-mock';
   // To:
   import { ... } from '@human.tech/passport-embed';
   ```
3. Use your real API keys from `.env`

**Current setup:**
- ✅ Real API keys configured in `.env`
- ✅ Backend ready for real Stamps API calls
- 🔄 Frontend using mock until package is fixed

### 1. Clone and Install

```bash
# Clone the demo (if part of a larger repo, navigate to this folder)
cd sample-apps/telegram-gating-demo

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Environment Setup

Copy the `env.example` file to `.env` in the project root and fill in your credentials:

```bash
cp env.example .env
```

Edit `.env` with your actual values:

```bash
# Stamps API Credentials
VITE_PASSPORT_API_KEY=your_embed_api_key_here      # Frontend widget (public)
PASSPORT_API_KEY=your_stamps_api_key_here          # Backend verification (private)
PASSPORT_SCORER_ID=your_scorer_id_here             # Same scorer for both

# Reown AppKit Configuration
VITE_REOWN_PROJECT_ID=your_reown_project_id_here

# Optional: Custom RPC URL
VITE_RPC_URL=https://rpc.ankr.com/eth
```

### 3. Run the Application

**Start the backend server:**
```bash
cd backend
npm start
# or for development with auto-reload:
# npm run dev (if you add nodemon)
```

**Start the frontend (in a new terminal):**
```bash
cd frontend
npm run dev
```

**Open your browser:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 🔧 Configuration Options

### Passport Scorer Configuration

When setting up your Passport Scorer in the [Developer Portal](https://developer.passport.xyz/), you can configure:

- **Scoring Threshold**: Set the minimum score required (default: 20)
- **Stamp Weights**: Customize how much each stamp contributes to the score
- **Stamp Selection**: Choose which stamps are available for verification
- **Expiration Policy**: Set how long stamps remain valid

### Embed Widget Customization

The Passport Embed widget supports various customization options:

```jsx
<PassportScoreWidget 
  apiKey={apiKey}
  scorerId={scorerId}
  address={address}
  theme={DarkTheme | LightTheme | CustomTheme}
  collapseMode="shift" | "overlay" | "off"
  generateSignatureCallback={signMessage}
  connectWalletCallback={connectWallet}
  className="custom-widget-styles"
/>
```

**Theme Options:**
- `DarkTheme`: Dark mode styling
- `LightTheme`: Light mode styling  
- Custom theme object with your brand colors

**Collapse Modes:**
- `"shift"`: Widget pushes content when expanded (default)
- `"overlay"`: Widget overlays on top of content
- `"off"`: Widget is always fully expanded

## 📚 Key Integration Points

### 1. Frontend Score Checking

```jsx
import { usePassportScore } from '@human.tech/passport-embed';

const { score, isPassing, loading, error } = usePassportScore({
  apiKey: 'your-api-key',
  scorerId: 'your-scorer-id',
  address: userAddress
});
```

### 2. Backend Verification

```javascript
// Verify score server-side using Stamps API v2
const response = await fetch(
  `https://api.passport.xyz/v2/stamps/${scorerId}/score/${address}`,
  { headers: { 'X-API-KEY': apiKey } }
);

const data = await response.json();
const hasAccess = data.passing_score === true;
```

### 3. Wallet Integration

```jsx
import { useAccount } from 'wagmi';

const { address, isConnected } = useAccount();
// Use with AppKit's <appkit-button /> for connection
```

## 🎨 Customization Examples

### Custom Theme

```jsx
const CustomTheme = {
  background: '#your-bg-color',
  text: '#your-text-color',
  primary: '#your-brand-color',
  secondary: '#your-secondary-color',
  border: '#your-border-color'
};
```

### Different Score Thresholds

Modify the backend verification logic to use different thresholds:

```javascript
// In backend/index.js
const REQUIRED_SCORE = 30; // Change from 20 to 30
const hasAccess = data.score >= REQUIRED_SCORE;
```

### Alternative Gated Content

Instead of Telegram access, you could gate:
- NFT minting
- Premium features
- Exclusive downloads
- Community forums
- Special events

## 🔍 API Endpoints

### Backend Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/verify-passport` | POST | Verify a user's Passport score |
| `/telegram-access` | GET | Protected redirect to Telegram |
| `/health` | GET | Health check endpoint |

### Request/Response Examples

**Verify Passport:**
```bash
curl -X POST http://localhost:3001/verify-passport \
  -H "Content-Type: application/json" \
  -d '{"address": "0x..."}'

# Response:
{
  "status": "passed",
  "score": "25.5",
  "telegramLink": "https://t.me/+axtkaeHda-I3MTJh"
}
```

## 🛡️ Security Considerations

### Frontend vs Backend Verification

- **Frontend**: Use `usePassportScore` for UI updates and user feedback
- **Backend**: Always verify scores server-side for sensitive operations
- **Never trust frontend-only verification** for access control

### API Key Management

- Use separate API keys for frontend and backend if possible
- Frontend keys can be public (they're in the client bundle)
- Backend keys should be kept secure and not exposed

### Rate Limiting

The Stamps API has rate limits:
- Tier 1: 125 requests per 15 minutes
- Request higher limits if needed

## 🐛 Troubleshooting

### Common Issues

**"Package not found" error for @human.tech/passport-embed:**
- The package might be in private beta
- Use the mock implementation provided in `src/lib/passport-embed-mock.js`
- Contact Passport team for access

**Wallet connection issues:**
- Ensure VITE_REOWN_PROJECT_ID is set correctly
- Check that you're using a supported wallet
- Verify network configuration (mainnet vs testnet)

**Backend verification failing:**
- Check that API keys are correct and active
- Verify scorer ID exists and is properly configured
- Check network connectivity to api.passport.xyz

**Score not updating:**
- Scores are cached and may take time to update
- Try disconnecting and reconnecting wallet
- Check that stamps were actually verified on app.passport.xyz

### Debug Mode

Add console logging to debug issues:

```jsx
// In App.jsx
console.log('Score data:', { score, isPassing, loading, error });
console.log('Backend status:', backendStatus);
```

## 🚀 Production Deployment

### Environment Variables

For production, set these environment variables:
- Use production Stamps API keys
- Set proper CORS origins in backend
- Use production RPC URLs
- Set secure session management

### Security Checklist

- [ ] API keys are secure and not exposed in frontend bundles
- [ ] Backend validates all user inputs
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented
- [ ] HTTPS is enabled
- [ ] Error messages don't leak sensitive information

## 🤝 Contributing

This is a demo application, but improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📖 Additional Resources

- [Passport Documentation](https://docs.passport.xyz/)
- [Stamps API Reference](https://docs.passport.xyz/building-with-passport/stamps/passport-api)
- [Passport Embed Guide](https://docs.passport.xyz/building-with-passport/stamps/passport-embed)
- [Reown AppKit Documentation](https://docs.reown.com/appkit/overview)
- [Developer Portal](https://developer.passport.xyz/)

## 📝 License

This demo application is provided as-is for educational and integration purposes. See the main repository license for details.

---

**Need help?** Join the [Passport Developer Telegram](https://t.me/+axtkaeHda-I3MTJh) (once you have a score of 20+! 😉)
