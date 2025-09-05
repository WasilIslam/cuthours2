import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, updateUserMessageCount, saveMessage } from '@/lib/rate-limit';
import config from '@/config.json';

const XAI_API_URL = 'https://api.x.ai/v1/chat/completions';
const XAI_API_KEY = process.env.GROK_API_KEY || process.env.XAI_API_KEY;
const MAX_MESSAGES_PER_24H = 10;

const SYSTEM_PROMPT = `You are an AI assistant for ${config.site.name}.

here is all content about the site ${config}
Be helpful and informative. Keep answers concise and short but informative. Reference our services and capabilities based on the config data provided. Keep simple english.`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Check rate limit
    const rateLimitResult = await checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: `You've reached the maximum of ${MAX_MESSAGES_PER_24H} messages per 24 hours.`,
          remaining: rateLimitResult.remaining,
          resetTime: rateLimitResult.resetTime.toISOString()
        },
        { status: 429 }
      );
    }

    if (!XAI_API_KEY) {
      return NextResponse.json(
        { error: 'xAI API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(XAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${XAI_API_KEY}`,
        'X-Client-Name': 'Cuthours-AI-Chat',
        'X-Client-Version': '1.0.0',
      },
      body: JSON.stringify({
        model: 'grok-2-1212',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message }
        ],
        max_tokens: 1024,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`xAI API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not process your request.';

    // Update user's message count and save conversation
    await updateUserMessageCount(ip);
    await saveMessage(ip, message, aiResponse);

    return NextResponse.json({
      response: aiResponse,
      remaining: rateLimitResult.remaining - 1
    });
  } catch (error) {
    console.error('xAI Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request with xAI' },
      { status: 500 }
    );
  }
}
