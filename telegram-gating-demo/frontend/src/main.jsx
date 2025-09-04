import React from 'react';
import ReactDOM from 'react-dom/client';
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet } from '@reown/appkit/networks';
import App from './App.jsx';
import './index.css';

// 1. Get projectId from https://cloud.reown.com
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'demo-project-id';

// 2. Set up Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet],
  projectId,
  ssr: false
});

// 3. Create the AppKit instance
createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet],
  projectId,
  metadata: {
    name: 'Developer Telegram Access',
    description: 'Gate access to Developer Telegram using Passport scores',
    url: 'https://passport.xyz',
    icons: ['https://passport.xyz/favicon.ico']
  },
  features: {
    analytics: false,
    email: false,
    socials: [],
    emailShowWallets: false
  }
});

// 4. Create QueryClient for React Query
const queryClient = new QueryClient();

// 5. Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);