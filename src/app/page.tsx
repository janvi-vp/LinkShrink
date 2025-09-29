import { UrlShortener } from '@/components/url-shortener';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent md:text-5xl">
            LinkShrink
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Shrink your long URLs into tiny, shareable links.
          </p>
        </div>
        <UrlShortener />
      </div>
    </main>
  );
}
