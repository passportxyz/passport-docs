import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { PassportScoreWidget, usePassportScore, DarkTheme, LightTheme } from '@human.tech/passport-embed'

export default function Home() {
  const { address, isConnected } = useAccount()
  const [verifiedScore, setVerifiedScore] = useState<{ score: number; isPassing: boolean } | null>(null)
  
  useEffect(() => {
    if (address && isConnected) {
      console.log('🔍 Starting score verification for address:', address)
      fetch('/api/verify-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address })
      })
        .then(res => res.json())
        .then(data => {
          console.log('📊 Score verification response:', data)
          if (data.verified) {
            const numericScore = parseFloat(data.score)
            setVerifiedScore({
              score: numericScore,
              isPassing: numericScore >= 20
            })
            console.log('✅ Score verified:', { score: numericScore, isPassing: numericScore >= 20 })
          } else {
            console.log('❌ Score verification failed:', data)
            setVerifiedScore(null)
          }
        })
        .catch(err => {
          console.error('🚨 Score verification error:', err)
          setVerifiedScore(null)
        })
    } else {
      console.log('⏸️ No address or not connected - clearing verified score')
      setVerifiedScore(null)
    }
  }, [address, isConnected])

  if (!isConnected) {
    return (
      <div className="container">
        <div className="fixed-wallet-button">
          <w3m-button />
        </div>
        <div className="header-section">
          <div className="passport-logo">
            <img 
              src="https://app.passport.xyz/assets/scoreLogoLoading.svg" 
              alt="Passport Logo"
              className="passport-logo-svg"
            />
          </div>
          <h1 className="title">Passport Embed Demo</h1>
          <p className="subtitle">Connect your wallet to check your Passport score</p>
        </div>
        <div className="main-content">
          <div className="card connect-card">
            <h3>Ready to get started?</h3>
            <p>Connect your Ethereum wallet to view your Unique Humanity Score.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="fixed-wallet-button">
        <w3m-button />
      </div>
      <div className="header-section">
        <div className="passport-logo">
          <img 
            src="https://app.passport.xyz/assets/scoreLogoLoading.svg" 
            alt="Passport Logo"
            className="passport-logo-svg"
          />
        </div>
        <h1 className="title">Passport Embed Demo</h1>
        <p className="subtitle">Build your Unique Humanity Score to unlock exclusive access</p>
        <div className="header-buttons">
          <a 
            href="https://tally.so/r/3X81KL" 
            target="_blank" 
            rel="noopener noreferrer"
            className="header-button primary"
          >
            Partner with us
          </a>
          <a 
            href="https://docs.passport.xyz/building-with-passport/stamps/passport-embed/introduction" 
            target="_blank" 
            rel="noopener noreferrer"
            className="header-button secondary"
          >
            Docs
          </a>
        </div>
      </div>
      <div className="main-content">
        <div className="explanation-column">
          <h2 className="explanation-title">How Passport Embed Works</h2>
          <div className="explanation-section">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Connect Your Wallet</h3>
              <p>Users start by connecting their Ethereum wallet. If the wallet is already connected on your site, the widget will pull in the wallet context and skip this step.</p>
            </div>
          </div>
          <div className="explanation-section">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Automatic Web3 Stamps</h3>
              <p>As soon as Embed loads with the wallet context, it will automatically verify any web3 Stamps that the user qualifies for.</p>
            </div>
          </div>
          <div className="explanation-section">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Build Up Your Score</h3>
              <p>If the user's score is still below the threshold, the widget will walk users through pages of different Stamps that they can verify to build up their score.</p>
            </div>
          </div>
          <div className="explanation-section">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Unlock Access</h3>
              <p>Once your score meets your defined threshold (20+ recommended), they'll be granted access to the protected program..</p>
            </div>
          </div>
          <div className="explanation-note">
            <h4>Security First</h4>
            <p>Your score should be verified both client-side for display and server-side using Passport's Stamps API to prevent tampering.</p>
          </div>
        </div>
        <div className="widget-column">
          <div className="card">
            <div className="wallet-address">
              Connected: {address?.slice(0, 8)}...{address?.slice(-6)}
            </div>
            <div className="passport-widget-container">
              <PassportScoreWidget
                apiKey={process.env.NEXT_PUBLIC_EMBED_API_KEY!}
                scorerId={process.env.NEXT_PUBLIC_PASSPORT_SCORER_ID!}
                address={address}
                theme={DarkTheme}
              />
            </div>
          </div>
          
          
          {/* Access panel - always shown */}
          <div className={verifiedScore && verifiedScore.isPassing ? "unlock-section" : "locked-section"}>
            {verifiedScore && verifiedScore.isPassing ? (
              // Unlocked state
              <>
                <h2 className="unlock-title">🎉 Access Unlocked!</h2>
                <p className="unlock-description">
                  Congratulations! Your Unique Humanity Score of {verifiedScore.score.toFixed(2)} meets our threshold. 
                  You now have access to exclusive features.
                </p>
                <a 
                  href="https://t.me/+Mcp9RsRV7tVmYjZh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="unlock-button"
                >
                  Join Exclusive Telegram 🚀
                </a>
              </>
            ) : (
              // Locked state
              <>
                <h2 className="locked-title">🔒 Access Locked</h2>
                <p className="locked-description">
                  {verifiedScore 
                    ? `Your current score of ${verifiedScore.score.toFixed(2)} is below our threshold. Build your score to 20 or higher to unlock exclusive access.`
                    : "Build your Unique Humanity Score to 20 or higher to unlock access to exclusive features."
                  }
                </p>
                <div className="locked-button">
                  Minimum Score Required: 20.00
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

