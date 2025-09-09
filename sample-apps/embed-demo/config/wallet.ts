import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'

// Get projectId from environment
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID

if (!projectId) {
  throw new Error('NEXT_PUBLIC_REOWN_PROJECT_ID is not set')
}

// Create networks array
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet]

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// Create modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'Passport Embed Demo',
    description: 'Sample app demonstrating Passport Embed integration',
    url: 'https://docs.passport.xyz',
    icons: ['https://docs.passport.xyz/favicon.ico']
  },
  features: {
    analytics: false
  }
})

export const config = wagmiAdapter.wagmiConfig