const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

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
        neutral: colors.blueGray,
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),

    plugin(({ addVariant, e }) => {
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
