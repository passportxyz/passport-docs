// Mock implementation of Passport Embed for development
// Replace this with the actual @human.tech/passport-embed package when available

import { useState, useEffect } from 'react';

// Mock themes
export const DarkTheme = {
  background: '#1a1a1a',
  text: '#ffffff',
  primary: '#4f46e5',
  secondary: '#6b7280',
  border: '#374151'
};

export const LightTheme = {
  background: '#ffffff',
  text: '#000000',
  primary: '#4f46e5',
  secondary: '#6b7280',
  border: '#d1d5db'
};

// Mock usePassportScore hook
export const usePassportScore = ({ apiKey, scorerId, address }) => {
  const [score, setScore] = useState(0);
  const [isPassing, setIsPassing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!address || !apiKey || !scorerId) {
      return;
    }

    const fetchScore = async () => {
      setLoading(true);
      setError(null);

      try {
        // In a real implementation, this would call the Stamps API
        // For demo purposes, we'll simulate different scores
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        // Mock score based on address (for demo purposes)
        const mockScore = Math.floor(Math.random() * 40); // Random score 0-40
        setScore(mockScore);
        setIsPassing(mockScore >= 20);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScore();
  }, [address, apiKey, scorerId]);

  return { score, isPassing, loading, error };
};

// Mock PassportScoreWidget component
export const PassportScoreWidget = ({ 
  apiKey, 
  scorerId, 
  address, 
  theme = DarkTheme,
  generateSignatureCallback,
  connectWalletCallback,
  collapseMode = "shift",
  className = ""
}) => {
  const { score, isPassing, loading, error } = usePassportScore({ apiKey, scorerId, address });
  
  const styles = {
    container: {
      backgroundColor: theme.background,
      color: theme.text,
      border: `1px solid ${theme.border}`,
      borderRadius: '8px',
      padding: '20px',
      margin: '10px 0',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: theme.primary
    },
    score: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '10px 0'
    },
    status: {
      padding: '8px 12px',
      borderRadius: '4px',
      margin: '10px 0',
      fontWeight: 'bold'
    },
    passing: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    failing: {
      backgroundColor: '#ef4444',
      color: 'white'
    },
    loading: {
      color: theme.secondary
    },
    error: {
      color: '#ef4444',
      backgroundColor: '#fef2f2',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #fecaca'
    }
  };

  if (!address) {
    return (
      <div style={styles.container} className={className}>
        <div style={styles.header}>🔐 Passport Verification</div>
        <p>Please connect your wallet to check your Passport score.</p>
        {connectWalletCallback && (
          <button 
            onClick={connectWalletCallback}
            style={{
              backgroundColor: theme.primary,
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Connect Wallet
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={styles.container} className={className}>
      <div style={styles.header}>🔐 Passport Verification</div>
      
      {loading && (
        <div style={styles.loading}>
          <p>🔄 Loading your Passport score...</p>
        </div>
      )}
      
      {error && (
        <div style={styles.error}>
          <p>❌ Error loading Passport data: {error.message}</p>
        </div>
      )}
      
      {!loading && !error && (
        <>
          <div style={styles.score}>
            Score: {score}/100
          </div>
          
          <div style={{
            ...styles.status,
            ...(isPassing ? styles.passing : styles.failing)
          }}>
            {isPassing ? '✅ Score meets threshold (≥20)' : '❌ Score below threshold (≥20)'}
          </div>
          
          {!isPassing && (
            <div style={{ marginTop: '15px' }}>
              <p>To increase your score:</p>
              <ul style={{ marginLeft: '20px' }}>
                <li>Verify your GitHub account</li>
                <li>Connect your Twitter account</li>
                <li>Verify Discord membership</li>
                <li>Add ENS domain</li>
                <li>Show ETH activity</li>
              </ul>
              <p style={{ fontSize: '14px', color: theme.secondary }}>
                Visit <a href="https://app.passport.xyz" target="_blank" rel="noopener noreferrer" style={{ color: theme.primary }}>
                  app.passport.xyz
                </a> to add more stamps.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
