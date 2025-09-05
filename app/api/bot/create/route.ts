import { NextRequest, NextResponse } from 'next/server';

interface PathOption {
  path: string;
  title: string;
  recommended: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // Step 1: Fetch the URL and extract hrefs
    const hrefs = await fetchAndExtractHrefs(url);

    if (!hrefs || hrefs.length === 0) {
      return NextResponse.json({ error: 'Could not extract links from the website' }, { status: 400 });
    }

    // Step 2: Use xAI to analyze top 3 paths
    const pathOptions = await analyzePathsWithAI(url, hrefs);

    return NextResponse.json({
      success: true,
      pathOptions,
      totalHrefs: hrefs.length
    });

  } catch (error) {
    console.error('Error creating bot:', error);
    return NextResponse.json(
      { error: 'Failed to analyze website. Please try again.' },
      { status: 500 }
    );
  }
}

async function fetchAndExtractHrefs(url: string): Promise<string[]> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BotAnalyzer/1.0)',
      },
      // Add timeout
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();

    // Extract hrefs using regex (simple approach)
    const hrefRegex = /href=["']([^"']+)["']/g;
    const hrefs: string[] = [];
    let match;

    while ((match = hrefRegex.exec(html)) !== null) {
      let href = match[1];

      // Skip external links, anchors, and non-HTML files
      if (href.startsWith('http') && !href.includes(url.replace('https://', '').replace('http://', ''))) {
        continue; // External link
      }

      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        continue; // Not a page
      }

      if (href.includes('.pdf') || href.includes('.jpg') || href.includes('.png') || href.includes('.gif')) {
        continue; // Not HTML content
      }

      // Convert relative URLs to absolute
      if (!href.startsWith('http')) {
        const baseUrl = new URL(url);
        if (href.startsWith('/')) {
          href = `${baseUrl.protocol}//${baseUrl.host}${href}`;
        } else {
          href = `${baseUrl.protocol}//${baseUrl.host}/${href}`;
        }
      }

      // Remove query parameters and fragments for deduplication
      const urlObj = new URL(href);
      const cleanPath = urlObj.pathname.replace(/\/$/, ''); // Remove trailing slash

      if (cleanPath && !hrefs.includes(cleanPath)) {
        hrefs.push(cleanPath);
      }
    }

    return hrefs.slice(0, 20); // Limit to 20 paths
  } catch (error) {
    console.error('Error fetching URL:', error);
    return [];
  }
}

async function analyzePathsWithAI(baseUrl: string, hrefs: string[]): Promise<PathOption[]> {
  try {
    // Always include home page first, then sort all paths by length (shortest first)
    const allPaths = Array.from(new Set(hrefs.includes('/') ? hrefs : ['/', ...hrefs]));
    const sortedPaths = allPaths.sort((a, b) => a.length - b.length);

    // Take at least 100 paths (or all if less than 100)
    const pathsToAnalyze = sortedPaths.slice(0, Math.max(100, sortedPaths.length));

    // Send to xAI to get the top 2 most informative paths
    const XAI_API_URL = 'https://api.x.ai/v1/chat/completions';
    const XAI_API_KEY = process.env.GROK_API_KEY || process.env.XAI_API_KEY;

    let topPaths: string[] = ['/', '/about']; // Default fallback

    if (XAI_API_KEY) {
      try {
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
                content: `You are a website analyzer. Given a list of website paths, identify the TOP 2 paths that would contain the most valuable information about the site (like about, contact, services, company info, etc.). Return ONLY a JSON array with exactly 2 path strings.`
              },
              {
                role: 'user',
                content: `Here are the website paths sorted by length (shortest first):

${pathsToAnalyze.map((path, index) => `${index + 1}. ${path}`).join('\n')}

Return the TOP 2 paths that would have the most site information (about, contact, services, etc.):`
              }
            ],
            max_tokens: 100,
            temperature: 0.3,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiResponse = data.choices[0]?.message?.content || '[]';

          try {
            const parsedPaths = JSON.parse(aiResponse);
            if (Array.isArray(parsedPaths) && parsedPaths.length >= 2) {
              topPaths = parsedPaths.slice(0, 2);
            }
          } catch (parseError) {
            console.error('Failed to parse AI response for top paths:', parseError);
          }
        }
      } catch (error) {
        console.error('Error getting top paths from xAI:', error);
      }
    }

    // Create path options from all paths (at least 100)
    const pathOptions: PathOption[] = pathsToAnalyze.map(path => {
      const isRecommended = topPaths.includes(path);
      const title = path === '/'
        ? 'Home'
        : path.split('/').filter(Boolean).pop() || 'Page';

      return {
        path,
        title: title.charAt(0).toUpperCase() + title.slice(1),
        recommended: isRecommended
      };
    });

    // Sort: AI recommended first, then by path length
    return pathOptions.sort((a, b) => {
      if (a.recommended && !b.recommended) return -1;
      if (!a.recommended && b.recommended) return 1;
      return a.path.length - b.path.length;
    });

  } catch (error) {
    console.error('Error analyzing paths:', error);
    return [];
  }
}
