import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function LinkExpiredPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="flex flex-col items-center justify-center gap-2 text-2xl">
            <AlertTriangle className="h-12 w-12 text-destructive" />
            Link Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The link you are trying to access is either invalid, has expired, or has been
            deleted.
          </p>
          <Button asChild>
            <Link href="/">Create a new short link</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
