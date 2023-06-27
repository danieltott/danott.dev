import { getFeed } from '../getFeed';

export async function GET() {
  return await getFeed('rss');
}
