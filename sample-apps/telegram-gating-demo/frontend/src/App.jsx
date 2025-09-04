import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import {
  usePassportScore,
  PassportScoreWidget,
  DarkTheme,
  LightTheme
} from './lib/passport-embed-mock'; // 🔄 TEMPORARILY USING MOCK - Switch to '@human.tech/passport-embed' when package is fixed
import './App.css';

function App() {
  const { address, isConnected } = useAccount();
  const [backendStatus, setBackendStatus] = useState(null);
  const [telegramLink, setTelegramLink] = useState(null);
  const [verificationAttempted, setVerificationAttempted] = useState(false);

  // Determine system theme preference
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Use Passport hook to fetch score and passing status client-side
  const { score, isPassing, loading, error } = usePassportScore({
    apiKey: import.meta.env.VITE_PASSPORT_API_KEY || 'demo-embed-api-key',
    scorerId: import.meta.env.PASSPORT_SCORER_ID || 'demo-scorer-id',
    address: address,
  });

  // Effect: when user has a passing score, call backend to verify securely
  useEffect(() => {
    if (isPassing && address && !verificationAttempted) {
      setVerificationAttempted(true);
      
      // Trigger backend verification (fail-safe check)
      fetch('http://localhost:3001/verify-passport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address })
      })
        .then(res => res.json())
        .then(data => {
          setBackendStatus(data.status);
          if (data.status === 'passed' && data.telegramLink) {
            setTelegramLink(data.telegramLink);
          }
        })
        .catch(err => {
          console.error('Failed to verify with backend:', err);
          setBackendStatus('error');
        });
    } else if (!isPassing) {
      // Reset verification state if score drops below threshold
      setBackendStatus(null);
      setTelegramLink(null);
      setVerificationAttempted(false);
    }
  }, [isPassing, address, verificationAttempted]);

  // Function to handle signature generation (required for OAuth stamps)
  const generateSignature = async (message) => {
    try {
      if (!window.ethereum) {
        throw new Error('No wallet found');
      }
      
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, accounts[0]]
      });
      
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  };

  // UI Rendering:
  if (!isConnected) {
    return (
      <div className="app-container">
        <header className="app-header">
          <h1>🔐 Developer Telegram Access</h1>
          <p>Connect your wallet and verify your Passport score to access our exclusive Developer Telegram community.</p>
        </header>
        
        <main className="main-content">
          <div className="connect-section">
            <h2>Connect Your Wallet</h2>
            <p>You need to connect your Ethereum wallet to verify your Passport score.</p>
            <appkit-button />
            
            <div className="info-box">
              <h3>What you'll need:</h3>
              <ul>
                <li>✅ An Ethereum wallet (MetaMask, WalletConnect, etc.)</li>
                <li>✅ A Passport score of 20 or higher</li>
                <li>✅ Verified stamps in your Passport</li>
              </ul>
              
              <p>
                Don't have a Passport yet? Visit{' '}
                <a href="https://app.passport.xyz" target="_blank" rel="noopener noreferrer">
                  app.passport.xyz
                </a>{' '}
                to create one and start collecting stamps!
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🔐 Developer Telegram Access</h1>
        <p>Verify your Passport score to unlock access to our Developer Telegram community.</p>
        <div className="wallet-info">
          <strong>Connected:</strong> <code>{address}</code>
        </div>
      </header>

      <main className="main-content">
        {/* Passport Score Widget */}
        <section className="passport-section">
          <PassportScoreWidget 
            apiKey={import.meta.env.VITE_PASSPORT_API_KEY || 'demo-embed-api-key'}
            scorerId={import.meta.env.PASSPORT_SCORER_ID || 'demo-scorer-id'}
            address={address}
            theme={prefersDark ? DarkTheme : LightTheme}
            generateSignatureCallback={generateSignature}
            collapseMode="shift"
          />
        </section>

        {/* Status and Results */}
        <section className="results-section">
          {loading && (
            <div className="status-box loading">
              <h3>🔄 Loading Passport Score...</h3>
              <p>Please wait while we fetch your verification status.</p>
            </div>
          )}

          {error && (
            <div className="status-box error">
              <h3>❌ Error Loading Passport Data</h3>
              <p>Error: {error.message}</p>
              <p>Please try refreshing the page or check your connection.</p>
            </div>
          )}

          {!loading && !error && score !== undefined && (
            <div className="score-summary">
              <h3>Your Passport Score</h3>
              <div className={`score-display ${isPassing ? 'passing' : 'failing'}`}>
                <span className="score-number">{score}</span>
                <span className="score-status">
                  {isPassing ? '✅ Meets threshold!' : '❌ Below threshold'}
                </span>
              </div>
              <p className="threshold-info">
                Required score: <strong>20 points</strong>
              </p>
            </div>
          )}

          {/* Backend verification results */}
          {backendStatus === 'passed' && telegramLink && (
            <div className="status-box success">
              <h3>🎉 Access Granted!</h3>
              <p>Congratulations! Your Passport score has been verified and you now have access to our Developer Telegram.</p>
              
              <div className="telegram-access">
                <a 
                  href={telegramLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="telegram-button"
                >
                  🚀 Join Developer Telegram
                </a>
                
                <p className="telegram-info">
                  Click the button above to join our exclusive developer community. 
                  You'll get access to:
                </p>
                <ul>
                  <li>🛠️ Technical discussions and support</li>
                  <li>📢 Early access to new features and updates</li>
                  <li>🤝 Networking with other developers</li>
                  <li>💡 Exclusive tips and best practices</li>
                </ul>
              </div>
            </div>
          )}

          {backendStatus === 'failed' && (
            <div className="status-box error">
              <h3>❌ Access Denied</h3>
              <p>Your Passport score doesn't meet the minimum requirement of 20 points.</p>
              <p>Current score: <strong>{score}</strong></p>
              
              <div className="improvement-tips">
                <h4>How to improve your score:</h4>
                <ol>
                  <li>Visit <a href="https://app.passport.xyz" target="_blank" rel="noopener noreferrer">app.passport.xyz</a></li>
                  <li>Connect your social accounts (GitHub, Twitter, Discord)</li>
                  <li>Verify your ENS domain if you have one</li>
                  <li>Show your Ethereum activity and transaction history</li>
                  <li>Complete additional verification stamps</li>
                </ol>
                <p>Once you've improved your score, return here and refresh to try again!</p>
              </div>
            </div>
          )}

          {backendStatus === 'error' && (
            <div className="status-box error">
              <h3>⚠️ Verification Error</h3>
              <p>There was an error verifying your Passport score with our backend.</p>
              <p>Please try again in a moment, or contact support if the issue persists.</p>
            </div>
          )}

          {!backendStatus && isPassing && (
            <div className="status-box info">
              <h3>🔄 Verifying Access...</h3>
              <p>Your score meets the threshold. We're now verifying your access with our secure backend.</p>
            </div>
          )}

          {!backendStatus && !isPassing && score !== undefined && !loading && (
            <div className="status-box warning">
              <h3>📈 Score Too Low</h3>
              <p>You need a minimum score of 20 to access the Developer Telegram.</p>
              <p>Current score: <strong>{score}</strong> | Required: <strong>20</strong></p>
              <p>Please verify more stamps in your Passport to increase your score.</p>
            </div>
          )}
        </section>

        {/* Information Section */}
        <section className="info-section">
          <h3>About This Demo</h3>
          <p>
            This application demonstrates how to use Passport Embed and the Stamps API v2 
            to gate access to exclusive content based on a user's Passport score.
          </p>
          
          <div className="tech-stack">
            <h4>Technologies Used:</h4>
            <ul>
              <li><strong>Passport Embed:</strong> React component for score verification</li>
              <li><strong>Stamps API v2:</strong> Backend verification of Passport scores</li>
              <li><strong>Reown AppKit:</strong> Wallet connection and management</li>
              <li><strong>Vite + React:</strong> Frontend framework</li>
              <li><strong>Express.js:</strong> Backend API server</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;