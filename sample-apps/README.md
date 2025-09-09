# Passport Sample Applications

This directory contains sample applications demonstrating various Passport integrations and use cases.

## Available Samples

### 🔐 [Embed Demo](./embed-demo/)
A comprehensive Next.js application showcasing Passport Embed integration with:
- Wallet connection (MetaMask, WalletConnect, etc.)
- Real-time Passport score display
- Client-side and server-side score verification
- Score-gated access to exclusive content
- Automatic light/dark theme support

**Perfect for**: Understanding how to integrate Passport Embed into web applications

## Running Sample Apps

Each sample app is self-contained with its own dependencies and documentation. To run a sample:

1. Navigate to the sample directory:
   ```bash
   cd sample-apps/embed-demo
   ```

2. Follow the setup instructions in the sample's README

## Deployment

Sample apps can be deployed independently:

### Vercel Deployment
Each sample includes a `vercel.json` configuration for easy deployment to Vercel. You can deploy them to subdomains like:
- `embed-demo.docs.passport.xyz`
- `another-sample.docs.passport.xyz`

### Local Development
All samples are configured to run on different ports to avoid conflicts:
- Embed Demo: `http://localhost:3002`
- Main Docs: `http://localhost:3000`

## Contributing

When adding new sample apps:

1. Create a new directory under `sample-apps/`
2. Include a comprehensive README with setup instructions
3. Add a `.env.example` file with required environment variables
4. Include a `vercel.json` for deployment configuration
5. Update this main README with the new sample description

## Support

- [Passport Documentation](https://docs.passport.xyz/)
- [Developer Telegram](https://t.me/+Mcp9RsRV7tVmYjZh)
- [GitHub Issues](https://github.com/passportxyz/passport-docs/issues)