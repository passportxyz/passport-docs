import { NextResponse } from 'next/server'
import { generateLlmsFullTxt } from '../../lib/llms-txt'

export const dynamic = 'force-static'

export function GET() {
  const content = generateLlmsFullTxt()
  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
