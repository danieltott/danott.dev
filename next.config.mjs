import nextMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrism from '@mapbox/rehype-prism';
import analyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
    // mdxRs: true,
  },
  async redirects() {
    return [
      // # redirect search to duckduckgo
      {
        permanent: true,
        source: '/thoughts/feed',
        destination: '/thoughts/feed.rss',
      },
      {
        permanent: true,
        source: '/search',
        destination: 'https://duckduckgo.com/?q=:term+site%3Adtott.com',
        has: [
          {
            type: 'query',
            key: 'term',
            value: '(?<term>.*)',
          },
        ],
      },

      {
        permanent: true,
        source: '/thoughts/search',
        destination: '/thoughts',
      },

      {
        permanent: true,
        source: '/thoughts/:year/:month/:date/:slug',
        destination: '/thoughts/:slug-:year-:month-:date',

        // # Fix up some whoopsies
      },
      {
        permanent: true,
        source: '/thoughts/styling-react-components-talk',
        destination: '/thoughts/2020/02/12/styling-react-components-talk',
      },
      {
        permanent: true,
        source: '/thoughts/2007/09/10/css-tips-1-use-a-reset',
        destination: '/thoughts/2007/09/10/css-tip-1-use-a-reset',
      },

      {
        source: '/thoughts/2007/09/10/css-tips-1-use-a-reset',
        destination: '/thoughts/2007/09/10/css-tip-1-use-a-reset',
        permanent: true,
      },
      {
        source: '/index.php',
        has: [
          {
            type: 'query',
            key: 'p',
            value: '(?<p>.*)',
          },
        ],
        destination: '/:p',
        permanent: true,
      },
    ];
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrism, { ignoreMissing: true }]],
  },
});

const withBundleAnalyzer = analyzer({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
});

export default withBundleAnalyzer(withMDX(nextConfig));
