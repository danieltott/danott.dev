import type { MDXComponents } from 'mdx/types';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    p: ({ children }) => <p className="text-above-stars">{children}</p>,
    h1: ({ children }) => <h1 className="text-above-stars">{children}</h1>,
    h2: ({ children }) => <h2 className="text-above-stars">{children}</h2>,
    h3: ({ children }) => <h3 className="text-above-stars">{children}</h3>,
    h4: ({ children }) => <h4 className="text-above-stars">{children}</h4>,
    h5: ({ children }) => <h5 className="text-above-stars">{children}</h5>,
    ...components,
  };
}
