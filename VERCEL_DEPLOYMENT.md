# Deploying Passport Embed Sample App to Vercel

This guide explains how to deploy the Passport Embed sample app (`sample-apps/embed-demo`) as a separate Vercel project.

## Option 1: Deploy via Vercel CLI (Recommended)

### Prerequisites
- Install Vercel CLI: `npm i -g vercel`
- Have Vercel account connected to your GitHub

### Steps

1. **Navigate to the sample app directory:**
   ```bash
   cd sample-apps/embed-demo
   ```

2. **Deploy using Vercel CLI:**
   ```bash
   vercel --prod
   ```

3. **Configure environment variables in Vercel dashboard:**
   - `NEXT_PUBLIC_PASSPORT_API_KEY` - Your Passport Embed API key
   - `NEXT_PUBLIC_PASSPORT_SCORER_ID` - Your Passport Scorer ID  
   - `PASSPORT_API_KEY` - Your Passport Stamps API key (for server-side verification)
   - `NEXT_PUBLIC_REOWN_PROJECT_ID` - Your Reown (WalletConnect) project ID

## Option 2: Deploy via Vercel Dashboard

### Steps

1. **Create New Project** in Vercel dashboard
2. **Import from GitHub** - select the passport-docs repository
3. **Configure Build Settings:**
   - Framework Preset: `Next.js`
   - Root Directory: `sample-apps/embed-demo`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Add Environment Variables** (same as Option 1)
5. **Deploy**

## Option 3: Using Custom Vercel Config

Use the provided `vercel-embed-sample.json` configuration:

```bash
# From repository root
vercel --local-config vercel-embed-sample.json
```

## Environment Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_PASSPORT_API_KEY` | Passport Embed API key (public) | `pk_live_...` |
| `NEXT_PUBLIC_PASSPORT_SCORER_ID` | Scorer ID for both client and server | `1` |
| `PASSPORT_API_KEY` | Stamps API key (server-only) | `sk_live_...` |
| `NEXT_PUBLIC_REOWN_PROJECT_ID` | Reown project ID | `abc123...` |

## Getting Your Credentials

- **Passport API Keys & Scorer ID**: [Passport Developer Portal](https://developer.passport.xyz/)
- **Reown Project ID**: [Reown Cloud](https://cloud.reown.com/)

## Updating Documentation

Once deployed, update the tutorial placeholder link:

1. Replace `PLACEHOLDER_SAMPLE_APP_LINK` in the tutorial with your Vercel deployment URL
2. Update any other references to the sample app with the live URL

## Troubleshooting

### Build Fails
- Ensure all environment variables are set in Vercel dashboard
- Check that the root directory is set to `sample-apps/embed-demo`

### Runtime Errors
- Verify API keys are valid and have correct permissions
- Check that Reown project ID matches your configuration
- Ensure scorer ID exists and is accessible with your API key

### CORS Issues
- Add your Vercel domain to Reown project settings
- Verify Passport API key has correct domain restrictions