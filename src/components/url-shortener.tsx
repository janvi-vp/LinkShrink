"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createShortUrl } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { QRCodeSVG } from 'qrcode.react';
import { Check, Clipboard, Link as LinkIcon, Loader2, PartyPopper } from 'lucide-react';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
});

type FormValues = z.infer<typeof formSchema>;

export function UrlShortener() {
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setShortUrl(null);
    setIsCopied(false);

    if (typeof window !== 'undefined') {
      const currentHost = window.location.host;
      try {
        const inputUrl = new URL(values.url);
        if (inputUrl.host === currentHost) {
          toast({
            title: 'Oops!',
            description: "You can't shrink a link that's already from this domain.",
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }
      } catch (error) {
        // Zod already validates this, but as a fallback
        toast({
          title: 'Invalid URL',
          description: 'Please check the URL and try again.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }
    }

    const result = await createShortUrl(values.url);

    if (result.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    } else if (result.shortCode) {
      const newShortUrl = `${window.location.origin}/${result.shortCode}`;
      setShortUrl(newShortUrl);
    }
    setLoading(false);
  }

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
    toast({
      title: 'Copied!',
      description: 'The short URL has been copied to your clipboard.',
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="shadow-2xl shadow-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-headline">
          <LinkIcon className="text-primary" />
          Create a Tiny URL
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Long URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="https://your-super-long-url.com/goes/here"
                        {...field}
                        className="h-12 pr-28 text-base"
                      />
                      <Button
                        type="submit"
                        disabled={loading}
                        className="absolute top-1/2 right-1.5 h-9 -translate-y-1/2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Shrinking...
                          </>
                        ) : (
                          'Shrink It!'
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        {shortUrl && (
          <div className="mt-6 rounded-lg bg-primary/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <PartyPopper className="h-5 w-5 flex-shrink-0 text-accent" />
                <p className="truncate text-lg font-semibold text-primary">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {shortUrl.replace(/^https?:\/\//, '')}
                  </a>
                </p>
              </div>
              <Button onClick={handleCopy} variant="ghost" size="icon" aria-label="Copy short URL">
                {isCopied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Clipboard className="h-5 w-5" />
                )}
              </Button>
            </div>
            <div className="flex flex-col items-center mt-4">
              <QRCodeSVG value={shortUrl} size={128} />
              <span className="mt-2 text-xs text-muted-foreground">Scan QR to visit</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Your tiny URL is ready to be shared! It will expire in 30 days.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
