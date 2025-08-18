import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { city } = await request.json()

  const response = NextResponse.json({ success: true })

  response.cookies.set('city', city, {
    path: '/',
    httpOnly: false,                      
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 60 * 60 * 24 * 7, 
  })

  return response
}