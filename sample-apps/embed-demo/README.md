# Passport Embed Demo

A sample Next.js application demonstrating how to integrate Passport Embed to gate access to exclusive content based on a user's Passport score.

## Features

- 🔐 **Wallet Connection**: Connect with MetaMask, WalletConnect, and other popular wallets
- 📊 **Passport Score Display**: Show user's current Passport score using the official Embed widget
- ✅ **Client-side Verification**: Real-time score checking with `usePassportScore` hook
- 🛡️ **Server-side Verification**: Backend validation using Stamps API v2 for security
- 🎯 **Score-gated Access**: Unlock Telegram access when score reaches 20+
- 🎨 **Theme Support**: Automatic light/dark mode based on system preference

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Passport API credentials
- Reown (WalletConnect) project ID

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your credentials:
   ```bash
   # Passport Configuration  
   NEXT_PUBLIC_EMBED_API_KEY=your_embed_api_key_here
   NEXT_PUBLIC_PASSPORT_SCORER_ID=your_scorer_id_here

   # Server-side API Key (for backend Stamps API verification - keep secret!)
   PASSPORT_API_KEY=your_stamps_api_key_here

   # Reown (WalletConnect) Configuration
   NEXT_PUBLIC_REOWN_PROJECT_ID=your_reown_project_id_here
   ```

### Getting Your Credentials

#### Passport API Keys
1. Visit [Passport Developer Portal](https://developer.passport.xyz/)
2. Create an account and generate API keys
3. Create a Scorer with a threshold of 20
4. Note your Scorer ID

#### Reown Project ID
1. Visit [Reown Cloud](https://cloud.reown.com/)
2. Create a new project
3. Copy your Project ID

### Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3002](http://localhost:3002) in your browser

## How It Works

### 1. Wallet Connection
Users connect their Ethereum wallet using Reown AppKit, which supports MetaMask, WalletConnect, Coinbase Wallet, and more.

### 2. Passport Score Display
The app displays the user's Passport score using the official `@human.tech/passport-embed` widget, which shows:
- Current score
- Individual stamps
- Progress toward threshold
- Options to verify additional stamps

### 3. Score Verification
The app uses a two-tier verification system:
- **Client-side**: `usePassportScore` hook for real-time updates
- **Server-side**: Backend API route validates score using Stamps API v2

### 4. Access Control
When a user's verified score reaches 20 or higher, they unlock access to the exclusive Developer Telegram channel.

## Project Structure

```
embed-demo/
├── config/
│   └── wallet.ts          # Wallet configuration
├── pages/
│   ├── api/
│   │   └── verify-score.ts # Backend verification API
│   ├── _app.tsx           # App wrapper with providers
│   └── index.tsx          # Main application page
├── styles/
│   └── globals.css        # Global styles
├── .env.example           # Environment variables template
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Key Components

### Client-side Integration
```tsx
import { usePassportScore, PassportScoreWidget } from '@human.tech/passport-embed'

const { score, isPassing, loading, error } = usePassportScore({
  apiKey: process.env.NEXT_PUBLIC_EMBED_API_KEY!,
  scorerId: process.env.NEXT_PUBLIC_PASSPORT_SCORER_ID!,
  address: userAddress,
})
```

### Server-side Verification
```typescript
// API route: /api/verify-score
const response = await fetch(`https://api.passport.xyz/v2/stamps/${scorerId}/score/${address}`, {
  headers: { 'X-API-KEY': apiKey }
})
const data = await response.json()
const verified = data.score >= 20 && data.passing_score
```

## Deployment

### Vercel Deployment
This sample app can be deployed to Vercel alongside the main docs site:

1. Add a `vercel.json` configuration:
   ```json
   {
     "buildCommand": "cd sample-apps/embed-demo && npm run build",
     "outputDirectory": "sample-apps/embed-demo/.next"
   }
   ```

2. Set environment variables in Vercel dashboard

3. Deploy to a subdomain like `embed-demo.docs.passport.xyz`

## Security Considerations

- **Never trust client-side verification alone** - Always validate scores server-side
- **Environment variables** - Keep API keys secure and use appropriate prefixes
- **Rate limiting** - Consider adding rate limits to your verification endpoint
- **Authentication** - In production, verify user owns the wallet address being checked

## Troubleshooting

### Common Issues

**"Missing environment variables" error**
- Ensure all required env vars are set in `.env.local`
- Check that both `PASSPORT_API_KEY` and `NEXT_PUBLIC_PASSPORT_API_KEY` are set

**Wallet connection issues**
- Verify your `NEXT_PUBLIC_REOWN_PROJECT_ID` is correct
- Ensure you're accessing the app via HTTP/HTTPS (not file://)

**Score not loading**
- Check browser console for API errors  
- Verify your Scorer ID exists and is active
- Ensure API keys have proper permissions

### Debug Mode
Add console logs to see API responses:
```bash
# Check the browser console and terminal output for debugging info
```

## Next Steps

- Customize the UI/styling to match your brand
- Add more sophisticated access controls
- Integrate with your existing authentication system
- Add analytics and monitoring
- Consider implementing SIWE (Sign-In with Ethereum) for additional security

## Support

- [Passport Documentation](https://docs.passport.xyz/)
- [Developer Telegram](https://t.me/+Mcp9RsRV7tVmYjZh) (unlock it with this demo!)
- [GitHub Issues](https://github.com/passportxyz/passport-docs/issues)