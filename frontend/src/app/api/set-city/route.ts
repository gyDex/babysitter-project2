import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { role } = await request.json()

  const response = NextResponse.json({ success: true })

  response.cookies.set('city', role, {
    path: '/',
    httpOnly: false,                      
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 60 * 60 * 24 * 7, 
  })

  return response
}