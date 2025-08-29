import { NextRequest, NextResponse } from 'next/server';

const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';
const GROK_API_KEY = process.env.GROK_API_KEY;

const DEMO_PROMPT = `You are a demo AI assistant for Cuthours, an AI automation company. 

IMPORTANT: This is just a demo. Cuthours specializes in:
- WhatsApp bot automation
- Web chatbot solutions  
- Gmail auto-reply systems
- Business process automation
- Customer service automation

Always mention this is a demo and that Cuthours can help with real implementations. Keep answers concise - ideally one line unless more explanation is needed. Be helpful but remind users this is just a demonstration of what Cuthours can build for them.`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!GROK_API_KEY) {
      return NextResponse.json(
        { error: 'Grok API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(GROK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [
          { role: 'system', content: DEMO_PROMPT },
          { role: 'user', content: message }
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Grok API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not process your request.';

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
