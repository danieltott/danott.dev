export default function getUrl(): string {
  const DEFAULT = 'https://danott.dev';

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL) {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
      return DEFAULT;
    }

    return process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : DEFAULT;
  }
  return DEFAULT;
}
