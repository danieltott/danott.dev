const defaultTheme = require('tailwindcss/defaultTheme');

const additionalColors = {
  'pink-salmon': {
    DEFAULT: '#FD92A5',
    50: '#FFF6F8',
    100: '#FEE2E7',
    200: '#FEBAC6',
    300: '#FD92A5',
    400: '#FC5B78',
    500: '#FB244A',
    600: '#E3042C',
    700: '#AB0321',
    800: '#740216',
    900: '#3D010C',
    950: '#220106',
  },
  'green-metal': {
    DEFAULT: '#747E40',
    50: '#DADFC0',
    100: '#D2D8B2',
    200: '#C2CA97',
    300: '#B2BC7C',
    400: '#A2AF61',
    500: '#8D994E',
    600: '#747E40',
    700: '#52592D',
    800: '#2F341A',
    900: '#0D0E07',
    950: '#000000',
  },
  'energy-yellow': {
    DEFAULT: '#FAD44E',
    50: '#FEF6D9',
    100: '#FDF1C5',
    200: '#FCE79D',
    300: '#FBDE76',
    400: '#FAD44E',
    500: '#F8C717',
    600: '#D2A506',
    700: '#9B7A04',
    800: '#654F03',
    900: '#2E2401',
    950: '#130F01',
  },
  'east-bay': {
    DEFAULT: '#3C5C7E',
    50: '#D7E1EC',
    100: '#C9D7E5',
    200: '#AEC2D8',
    300: '#92AECB',
    400: '#7699BE',
    500: '#5B84B1',
    600: '#49709A',
    700: '#3C5C7E',
    800: '#2A4058',
    900: '#182532',
    950: '#0F171F',
  },
  'brick-red': {
    DEFAULT: '#CC294B',
    50: '#F8DDE3',
    100: '#F5CCD5',
    200: '#EEAAB8',
    300: '#E7889C',
    400: '#E06680',
    500: '#D94463',
    600: '#CC294B',
    700: '#9D203A',
    800: '#6F1629',
    900: '#400D17',
    950: '#29080F',
  },
  coral: {
    DEFAULT: '#FD8649',
    50: '#FFE4D6',
    100: '#FED6C2',
    200: '#FEBC9A',
    300: '#FDA171',
    400: '#FD8649',
    500: '#FC6112',
    600: '#D34902',
    700: '#9C3602',
    800: '#642301',
    900: '#2D1000',
    950: '#110600',
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
  theme: {
    fontSize: defaultTheme.fontSize,
    extend: {
      fontFamily: {
        serif: ['var(--font-body)', ...defaultTheme.fontFamily.serif],
        freeLunch: ['var(--font-free-lunch)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ...additionalColors,
        primary: additionalColors['brick-red'],
      },

      // fontSize: {
      //   xs: ['0.8125rem', { lineHeight: '1.5rem' }],
      //   sm: ['0.875rem', { lineHeight: '1.5rem' }],
      //   base: ['1rem', { lineHeight: '1.75rem' }],
      //   lg: ['1.125rem', { lineHeight: '1.75rem' }],
      //   xl: ['1.25rem', { lineHeight: '2rem' }],
      //   '2xl': ['1.5rem', { lineHeight: '2rem' }],
      //   '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      //   '4xl': ['2rem', { lineHeight: '2.5rem' }],
      //   '5xl': ['3rem', { lineHeight: '3.5rem' }],
      //   '6xl': ['3.75rem', { lineHeight: '1' }],
      //   '7xl': ['4.5rem', { lineHeight: '1' }],
      //   '8xl': ['6rem', { lineHeight: '1' }],
      //   '9xl': ['8rem', { lineHeight: '1' }],
      // },
      typography: (theme) => {
        return {
          invert: {
            css: {
              '--tw-prose-body': 'var(--tw-prose-invert-body)',
              '--tw-prose-headings': 'var(--tw-prose-invert-headings)',
              '--tw-prose-links': 'var(--tw-prose-invert-links)',
              '--tw-prose-links-hover': 'var(--tw-prose-invert-links-hover)',
              '--tw-prose-underline': 'var(--tw-prose-invert-underline)',
              '--tw-prose-underline-hover':
                'var(--tw-prose-invert-underline-hover)',
              '--tw-prose-bold': 'var(--tw-prose-invert-bold)',
              '--tw-prose-counters': 'var(--tw-prose-invert-counters)',
              '--tw-prose-bullets': 'var(--tw-prose-invert-bullets)',
              '--tw-prose-hr': 'var(--tw-prose-invert-hr)',
              '--tw-prose-quote-borders':
                'var(--tw-prose-invert-quote-borders)',
              '--tw-prose-captions': 'var(--tw-prose-invert-captions)',
              '--tw-prose-code': 'var(--tw-prose-invert-code)',
              '--tw-prose-code-bg': 'var(--tw-prose-invert-code-bg)',
              '--tw-prose-pre-code': 'var(--tw-prose-invert-pre-code)',
              '--tw-prose-pre-bg': 'var(--tw-prose-invert-pre-bg)',
              '--tw-prose-pre-border': 'var(--tw-prose-invert-pre-border)',
              '--tw-prose-th-borders': 'var(--tw-prose-invert-th-borders)',
              '--tw-prose-td-borders': 'var(--tw-prose-invert-td-borders)',
            },
          },
          DEFAULT: {
            css: {
              '--tw-prose-body': theme('colors.stone.600'),
              '--tw-prose-headings': theme('colors.stone.900'),
              '--tw-prose-links': theme('colors.primary.700'),
              '--tw-prose-links-hover': theme('colors.primary.600'),
              '--tw-prose-underline': theme('colors.primary.500 / 0.2'),
              '--tw-prose-underline-hover': theme('colors.primary.500'),
              '--tw-prose-bold': theme('colors.stone.900'),
              '--tw-prose-counters': theme('colors.stone.900'),
              '--tw-prose-bullets': theme('colors.stone.900'),
              '--tw-prose-hr': theme('colors.stone.100'),
              '--tw-prose-quote-borders': theme('colors.stone.200'),
              '--tw-prose-captions': theme('colors.stone.400'),
              '--tw-prose-code': theme('colors.stone.700'),
              '--tw-prose-code-bg': theme('colors.stone.300 / 0.2'),
              '--tw-prose-pre-code': theme('colors.stone.100'),
              '--tw-prose-pre-bg': theme('colors.stone.900'),
              '--tw-prose-pre-border': 'transparent',
              '--tw-prose-th-borders': theme('colors.stone.200'),
              '--tw-prose-td-borders': theme('colors.stone.100'),

              '--tw-prose-invert-body': theme('colors.stone.300'),
              '--tw-prose-invert-headings': theme('colors.stone.200'),
              '--tw-prose-invert-links': theme('colors.primary.400'),
              '--tw-prose-invert-links-hover': theme('colors.primary.500'),
              '--tw-prose-invert-underline': theme('colors.primary.400 / 0.3'),
              '--tw-prose-invert-underline-hover': theme('colors.primary.400'),
              '--tw-prose-invert-bold': theme('colors.stone.200'),
              '--tw-prose-invert-counters': theme('colors.stone.200'),
              '--tw-prose-invert-bullets': theme('colors.stone.200'),
              '--tw-prose-invert-hr': theme('colors.stone.700 / 0.4'),
              '--tw-prose-invert-quote-borders': theme('colors.stone.500'),
              '--tw-prose-invert-captions': theme('colors.stone.500'),
              '--tw-prose-invert-code': theme('colors.stone.300'),
              '--tw-prose-invert-code-bg': theme('colors.stone.200 / 0.05'),
              '--tw-prose-invert-pre-code': theme('colors.stone.100'),
              '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 0.4)',
              '--tw-prose-invert-pre-border': theme('colors.stone.200 / 0.1'),
              '--tw-prose-invert-th-borders': theme('colors.stone.700'),
              '--tw-prose-invert-td-borders': theme('colors.stone.800'),

              // Base
              color: 'var(--tw-prose-body)',
              lineHeight: theme('lineHeight.7'),

              // Headings
              'h2, h3': {
                color: 'var(--tw-prose-headings)',
                fontWeight: theme('fontWeight.semibold'),
              },
              h2: {
                fontSize: theme('fontSize.xl')[0],
                lineHeight: theme('lineHeight.7'),
              },
              h3: {
                fontSize: theme('fontSize.base')[0],
                lineHeight: theme('lineHeight.7'),
              },
              ':is(h2, h3) + *': {
                marginTop: 0,
              },

              // Images
              img: {
                borderRadius: theme('borderRadius.lg'),
              },

              // Inline elements
              a: {
                color: 'var(--tw-prose-links)',
                fontWeight: theme('fontWeight.semibold'),
                textDecoration: 'underline',
                textDecorationColor: 'var(--tw-prose-underline)',
                transitionProperty: 'color, text-decoration-color',
                transitionDuration: theme('transitionDuration.150'),
                transitionTimingFunction: theme(
                  'transitionTimingFunction.in-out'
                ),
              },
              'a:hover': {
                color: 'var(--tw-prose-links-hover)',
                textDecorationColor: 'var(--tw-prose-underline-hover)',
              },
              strong: {
                color: 'var(--tw-prose-bold)',
                fontWeight: theme('fontWeight.semibold'),
              },
              code: {
                display: 'inline-block',
                color: 'var(--tw-prose-code)',
                fontSize: theme('fontSize.sm')[0],
                fontWeight: theme('fontWeight.semibold'),
                backgroundColor: 'var(--tw-prose-code-bg)',
                borderRadius: theme('borderRadius.lg'),
                paddingLeft: theme('spacing.1'),
                paddingRight: theme('spacing.1'),
              },
              'a code': {
                color: 'inherit',
              },
              ':is(h2, h3) code': {
                fontWeight: theme('fontWeight.bold'),
              },

              // Quotes
              blockquote: {
                paddingLeft: theme('spacing.6'),
                borderLeftWidth: theme('borderWidth.2'),
                borderLeftColor: 'var(--tw-prose-quote-borders)',
                fontStyle: 'italic',
              },

              // Figures
              figcaption: {
                color: 'var(--tw-prose-captions)',
                fontSize: theme('fontSize.sm')[0],
                lineHeight: theme('lineHeight.6'),
                marginTop: theme('spacing.3'),
              },
              'figcaption > p': {
                margin: 0,
              },

              // Lists
              ul: {
                listStyleType: 'disc',
              },
              ol: {
                listStyleType: 'decimal',
              },
              'ul, ol': {
                paddingLeft: theme('spacing.6'),
              },
              li: {
                paddingLeft: theme('spacing[3.5]'),
              },
              'li::marker': {
                fontSize: theme('fontSize.sm')[0],
                fontWeight: theme('fontWeight.semibold'),
              },
              'ol > li::marker': {
                color: 'var(--tw-prose-counters)',
              },
              'ul > li::marker': {
                color: 'var(--tw-prose-bullets)',
              },

              // Code blocks
              pre: {
                color: 'var(--tw-prose-pre-code)',
                fontSize: theme('fontSize.sm')[0],
                fontWeight: theme('fontWeight.medium'),
                backgroundColor: 'var(--tw-prose-pre-bg)',
                borderRadius: theme('borderRadius.lg'),
                padding: theme('spacing.8'),
                overflowX: 'auto',
                border: '1px solid',
                borderColor: 'var(--tw-prose-pre-border)',
              },
              'pre code': {
                display: 'inline',
                color: 'inherit',
                fontSize: 'inherit',
                fontWeight: 'inherit',
                backgroundColor: 'transparent',
                borderRadius: 0,
                padding: 0,
              },

              // Horizontal rules
              hr: {
                marginTop: theme('spacing.20'),
                marginBottom: theme('spacing.20'),
                borderTopWidth: '1px',
                borderColor: 'var(--tw-prose-hr)',
                '@screen lg': {
                  marginLeft: `calc(${theme('spacing.12')} * -1)`,
                  marginRight: `calc(${theme('spacing.12')} * -1)`,
                },
              },

              // Tables
              table: {
                width: '100%',
                tableLayout: 'auto',
                textAlign: 'left',
                fontSize: theme('fontSize.sm')[0],
              },
              thead: {
                borderBottomWidth: '1px',
                borderBottomColor: 'var(--tw-prose-th-borders)',
              },
              'thead th': {
                color: 'var(--tw-prose-headings)',
                fontWeight: theme('fontWeight.semibold'),
                verticalAlign: 'bottom',
                paddingBottom: theme('spacing.2'),
              },
              'thead th:not(:first-child)': {
                paddingLeft: theme('spacing.2'),
              },
              'thead th:not(:last-child)': {
                paddingRight: theme('spacing.2'),
              },
              'tbody tr': {
                borderBottomWidth: '1px',
                borderBottomColor: 'var(--tw-prose-td-borders)',
              },
              'tbody tr:last-child': {
                borderBottomWidth: 0,
              },
              'tbody td': {
                verticalAlign: 'baseline',
              },
              tfoot: {
                borderTopWidth: '1px',
                borderTopColor: 'var(--tw-prose-th-borders)',
              },
              'tfoot td': {
                verticalAlign: 'top',
              },
              ':is(tbody, tfoot) td': {
                paddingTop: theme('spacing.2'),
                paddingBottom: theme('spacing.2'),
              },
              ':is(tbody, tfoot) td:not(:first-child)': {
                paddingLeft: theme('spacing.2'),
              },
              ':is(tbody, tfoot) td:not(:last-child)': {
                paddingRight: theme('spacing.2'),
              },
            },
          },
        };
      },
    },
  },
};
