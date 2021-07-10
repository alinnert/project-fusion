const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: colors.teal,
        danger: colors.rose,
        neutral: colors.blueGray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ addVariant, e }) => {
      addVariant('current', ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `.current.${e(`current${separator}${className}`)}`,
        )
      })
    }),
  ],
}
