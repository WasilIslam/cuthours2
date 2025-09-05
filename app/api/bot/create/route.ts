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
    // Always include home page first
    const allPaths = hrefs.includes('/') ? hrefs : ['/', ...hrefs];

    const commonPages = ['/', '/about', '/contact', '/services', '/products', '/blog'];
    const pathOptions: PathOption[] = [];

    // Add recommended pages that exist (always include home)
    commonPages.forEach(page => {
      if (allPaths.includes(page)) {
        pathOptions.push({
          path: page,
          title: page === '/' ? 'Home' : page.charAt(1).toUpperCase() + page.slice(2),
          recommended: true
        });
      }
    });

    // Add other available paths, sorted by path length (shorter first)
    const otherPaths = allPaths
      .filter(href => !commonPages.includes(href))
      .sort((a, b) => a.length - b.length) // Sort by length
      .slice(0, 15); // Limit to 15 additional paths

    otherPaths.forEach(href => {
      if (!pathOptions.find(p => p.path === href)) {
        const title = href.split('/').filter(Boolean).pop() || 'Page';
        pathOptions.push({
          path: href,
          title: title.charAt(0).toUpperCase() + title.slice(1),
          recommended: false
        });
      }
    });

    // Sort: recommended first, then by path length
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
