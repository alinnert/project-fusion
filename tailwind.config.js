const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

/** @type { import('tailwindcss/tailwind-config').TailwindConfig } */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'

  theme: {
    fontFamily: {
      sans: ['Source Sans Pro'],
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
        neutral: colors.blueGray,
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
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),

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
