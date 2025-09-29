import { db } from '@/lib/firebase';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { redirect } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  const shortCode = params.shortCode;

  // Exclude favicon requests and other common files from being treated as short codes
  if (['favicon.ico', 'robots.txt', 'sitemap.xml'].includes(shortCode)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  if (!shortCode) {
    return redirect('/link-expired');
  }

  try {
    const urlDocRef = doc(db, 'urls', shortCode);
    const urlDoc = await getDoc(urlDocRef);

    if (urlDoc.exists()) {
      const data = urlDoc.data();
      const expiresAt = data.expiresAt as Timestamp;

      if (expiresAt.toMillis() > Date.now()) {
        // Using 302 as requested for temporary redirect
        return NextResponse.redirect(new URL(data.originalUrl), 302);
      }
    }

    // If doc doesn't exist or is expired, redirect to a specific page
    const expiredUrl = new URL('/link-expired', request.url);
    return NextResponse.redirect(expiredUrl);
  } catch (error) {
    console.error('Redirection error:', error);
    const errorUrl = new URL('/link-expired', request.url);
    return NextResponse.redirect(errorUrl);
  }
}
