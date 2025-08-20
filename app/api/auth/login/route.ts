import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the client's IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = forwarded?.split(',')[0] || realIp || request.ip || 'unknown';

    // Parse the request body
    const body = await request.json();
    const { email, password } = body;

    // Simple validation
    if (!email || !password) {
      return NextResponse.json(
        { 
          message: 'Email and password are required',
          error: 'MISSING_CREDENTIALS'
        },
        { status: 400 }
      );
    }

    // Always return IP blocked error for demo purposes
    return NextResponse.json(
      { 
        message: `Access denied: IP address ${clientIp} is blocked for security reasons. Please contact support.`,
        error: 'IP_BLOCKED',
        clientIp: clientIp,
        timestamp: new Date().toISOString()
      },
      { status: 403 }
    );

  } catch (error) {
    console.error('Login API error:', error);
    
    return NextResponse.json(
      { 
        message: 'Internal server error occurred',
        error: 'SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { 
      message: 'Method not allowed. Use POST to login.',
      error: 'METHOD_NOT_ALLOWED'
    },
    { status: 405 }
  );
}
