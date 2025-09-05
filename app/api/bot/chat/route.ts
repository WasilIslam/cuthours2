import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, botId, botContent } = await request.json();

    if (!message || !botId || !botContent) {
      return NextResponse.json({ error: 'Message, botId, and botContent are required' }, { status: 400 });
    }

    // Extract AI processed JSON string from the bot content object
    const aiProcessedJson = typeof botContent === 'string'
      ? null
      : botContent.aiProcessed;

    // Parse the JSON string
    let parsedData = null;
    if (aiProcessedJson) {
      try {
        parsedData = JSON.parse(aiProcessedJson);
      } catch (error) {
        console.error('Failed to parse AI processed data:', error);
      }
    }

    // Use xAI completions API for chat
    const response = await generateResponseWithXAI(message, parsedData, botContent);

    return NextResponse.json({
      success: true,
      response: response
    });

  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}

async function generateResponseWithXAI(userMessage: string, parsedData: any, botContent: any): Promise<string> {
  try {
    const XAI_API_URL = 'https://api.x.ai/v1/chat/completions';
    const XAI_API_KEY = process.env.GROK_API_KEY || process.env.XAI_API_KEY;

    if (!XAI_API_KEY) {
      throw new Error('xAI API key not configured');
    }

    // Prepare context from raw page content - let xAI handle understanding
    let contextInfo = '';
    if (parsedData && parsedData.websiteData) {
      const websiteData = parsedData.websiteData;

      // Send all raw page content to xAI
      contextInfo = `Website Content:\n\n`;

      websiteData.forEach((page: any, index: number) => {
        contextInfo += `=== PAGE ${index + 1}: ${page.title} ===\n`;
        contextInfo += `URL: ${page.url}\n\n`;
        contextInfo += `CONTENT:\n${page.content}\n\n`;
        contextInfo += `--- END OF PAGE ---\n\n`;
      });

      // Limit to reasonable size for API (xAI can handle up to ~100K tokens)
      if (contextInfo.length > 50000) {
        contextInfo = contextInfo.substring(0, 50000) + '\n\n[Content truncated for API limits]';
      }
    } else {
      // Fallback to raw content
      const rawContent = typeof botContent === 'string'
        ? botContent
        : botContent.raw || '';
      contextInfo = rawContent.substring(0, 10000);
    }

    const response = await fetch(XAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-2-1212',
        messages: [
          {
            role: 'system',
            content: `You are Ali, a professional website guide. Hello! I am Ali, I will guide you about this site. Be professional and strictly stick to the provided website content. Respond in 2 lines maximum unless the answer requires more clarification. Use short, easiest English.`
          },
          {
            role: 'user',
            content: `Website content:
${contextInfo}

Question: ${userMessage}

Please answer based ONLY on the website content provided above. Keep response short and professional.`
          }
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`xAI API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not process your request.';

    return aiResponse;

  } catch (error) {
    console.error('Error generating response with xAI:', error);

    // Fallback responses as Ali
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I am Ali, I will guide you about this site. What would you like to know?";
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
      return "For contact information, please check the contact section of the website.";
    }

    if (lowerMessage.includes('about') || lowerMessage.includes('company')) {
      return "I can help you learn about this company. Please ask about specific services or information.";
    }

    return "I can answer questions about this website. Please ask about specific content or services.";
  }
}
