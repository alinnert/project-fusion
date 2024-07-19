import formsPlugin from '@tailwindcss/forms'
import typographyPlugin from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

/** @type { import('tailwindcss/tailwind-config').TailwindConfig } */
export default {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}', 'index.html'],

  theme: {
    fontFamily: {
      mono: ['IBM Plex Mono'],
    },

    extend: {
      colors: {
        transparent: colors.transparent,
        black: colors.black,
        white: colors.white,
        brand: colors.sky,
        accent: colors.cyan,
        important: colors.amber,
        danger: colors.rose,
        dangerAccent: colors.red,
        neutral: colors.slate,
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            'ul > li > input[type=checkbox]:first-child:last-child': {
              marginTop: 0,
              marginBottom: 0,
              marginRight: theme('spacing.4'),
            },
          },
        },
      }),
    },
  },

  plugins: [
    typographyPlugin,
    formsPlugin,

    plugin(({ addVariant, e }) => {
      addVariant('not-first', ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `.${e(`not-first${separator}${className}`)}:not(:first-child)`,
        )
      })

      addVariant('enabled', ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `.${e(`enabled${separator}${className}`)}:not(:disabled)`,
        )
      })

      addVariant('current', ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) => `.current.${e(`current${separator}${className}`)}`,
        )
      })
    }),
  ],
}
