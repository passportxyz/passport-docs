import type { NextApiRequest, NextApiResponse } from 'next'

interface VerifyScoreRequest {
  address: string
}

interface VerifyScoreResponse {
  verified: boolean
  score?: number
  error?: string
}

interface StampsApiResponse {
  score: number
  passing_score: boolean
  threshold: number
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyScoreResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ verified: false, error: 'Method not allowed' })
  }

  const { address }: VerifyScoreRequest = req.body

  if (!address) {
    return res.status(400).json({ verified: false, error: 'Address is required' })
  }

  // Validate environment variables
  const apiKey = process.env.PASSPORT_API_KEY  // Server-side only!
  const scorerId = process.env.NEXT_PUBLIC_PASSPORT_SCORER_ID

  if (!apiKey || !scorerId) {
    console.error('Missing environment variables:', { 
      hasApiKey: !!apiKey, 
      hasScorerID: !!scorerId 
    })
    return res.status(500).json({ 
      verified: false, 
      error: 'Server configuration error - missing PASSPORT_API_KEY or SCORER_ID' 
    })
  }

  try {
    // Call Passport Stamps API v2 to verify score server-side
    const url = `https://api.passport.xyz/v2/stamps/${scorerId}/score/${address}`
    
    console.log('Verifying score for address:', address)
    console.log('API URL:', url)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.error('API response not OK:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('Error response body:', errorText)
      
      return res.status(500).json({ 
        verified: false, 
        error: `API error: ${response.status} ${response.statusText}` 
      })
    }

    const data: StampsApiResponse = await response.json()
    
    console.log('API Response:', data)

    // Check if score meets the threshold (20 or higher)
    const meetsThreshold = data.score >= 20
    
    if (meetsThreshold && data.passing_score) {
      console.log(`✅ Score verified: ${data.score} >= 20 for address ${address}`)
      return res.status(200).json({ 
        verified: true, 
        score: data.score 
      })
    } else {
      console.log(`❌ Score too low: ${data.score} < 20 for address ${address}`)
      return res.status(200).json({ 
        verified: false, 
        score: data.score 
      })
    }

  } catch (error) {
    console.error('Error verifying Passport score:', error)
    return res.status(500).json({ 
      verified: false, 
      error: 'Internal server error' 
    })
  }
}