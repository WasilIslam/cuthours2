import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { doc, setDoc, collection } from 'firebase/firestore';
import crypto from 'crypto';

interface BotData {
  id: string;
  websiteUrl: string;
  paths: string[];
  content: {
    raw: string;
    aiProcessed: string; // JSON string with structured data from xAI
    pages: {
      url: string;
      title: string;
      content: string;
      extractedAt: Date;
    }[];
  };
  metadata: {
    totalPages: number;
    contentLength: number;
    createdAt: Date;
    userIp: string;
    recommendedPaths: string[];
  };
}

export async function POST(request: NextRequest) {
  try {
    const { url, paths } = await request.json();

    if (!url || !paths || !Array.isArray(paths)) {
      return NextResponse.json({ error: 'URL and paths are required' }, { status: 400 });
    }

    // Get user IP for bot identification
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Always include home page if not already in paths
    const pathsWithHome = paths.includes('/') ? paths : ['/', ...paths];

    // Step 1: Extract content from selected pages
    const extractedData = await extractContentFromPages(url, pathsWithHome);

    if (!extractedData.raw) {
      return NextResponse.json({ error: 'Failed to extract content from pages' }, { status: 400 });
    }

    // Step 2: Create bot ID and save to Firebase
    const botId = crypto.randomUUID();
    const botData: BotData = {
      id: botId,
      websiteUrl: url,
      paths: pathsWithHome,
      content: extractedData,
      metadata: {
        totalPages: extractedData.pages.length,
        contentLength: extractedData.raw.length,
        createdAt: new Date(),
        userIp: ip,
        recommendedPaths: pathsWithHome.filter(path => ['/', '/about', '/contact', '/services', '/products', '/blog'].includes(path))
      }
    };

    // Save to Firebase
    await setDoc(doc(db, 'bots', botId), botData);

    return NextResponse.json({
      success: true,
      bot: botData
    });

  } catch (error) {
    console.error('Error extracting content:', error);
    return NextResponse.json(
      { error: 'Failed to create bot. Please try again.' },
      { status: 500 }
    );
  }
}

async function extractContentFromPages(baseUrl: string, paths: string[]): Promise<{
  raw: string;
  aiProcessed: string;
  pages: { url: string; title: string; content: string; extractedAt: Date }[];
}> {
  try {
    const allContent: string[] = [];
    const pages: { url: string; title: string; content: string; extractedAt: Date }[] = [];

    for (const path of paths) {
      try {
        const fullUrl = path.startsWith('http') ? path : `${baseUrl.replace(/\/$/, '')}${path}`;
        const response = await fetch(fullUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; BotAnalyzer/1.0)',
          },
          signal: AbortSignal.timeout(10000), // Increased timeout
        });

        if (!response.ok) continue;

        const html = await response.text();

        // Extract title
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : `Page: ${path}`;

        // Extract text content (simple approach - remove HTML tags)
        const textContent = html
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        if (textContent.length > 100) { // Only include substantial content
          const pageContent = `Page: ${path}\n\n${textContent}\n\n---\n\n`;
          allContent.push(pageContent);

          pages.push({
            url: fullUrl,
            title: title,
            content: textContent,
            extractedAt: new Date()
          });
        }

        // Add delay to be respectful to the server
        await new Promise(resolve => setTimeout(resolve, 800));

      } catch (error) {
        console.error(`Error extracting content from ${path}:`, error);
        continue;
      }
    }

    // Increased content limit to 500KB
    const combinedContent = allContent.join('');
    const rawContent = combinedContent.length > 500000
      ? combinedContent.substring(0, 500000) + '...'
      : combinedContent;

    return {
      raw: rawContent,
      aiProcessed: await processContentWithAI(pages),
      pages
    };

  } catch (error) {
    console.error('Error extracting content:', error);
    return {
      raw: '',
      aiProcessed: JSON.stringify({ error: 'Content extraction failed' }),
      pages: []
    };
  }
}

async function processContentWithAI(pages: { url: string; title: string; content: string; extractedAt: Date }[]): Promise<string> {
  // Just return the raw pages data as JSON - let xAI handle the processing during chat
  return JSON.stringify({
    websiteData: pages.map(page => ({
      title: page.title,
      url: page.url,
      content: page.content,
      extractedAt: page.extractedAt
    })),
    totalPages: pages.length,
    processedAt: new Date().toISOString()
  });
}
