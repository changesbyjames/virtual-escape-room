const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      height: {
        '100': '28rem',
        'c-full': 'calc(100vh - 60px - 9rem)',
        'fit': 'fit-content'
      },
      width: {
        'fit': 'fit-content'
      },
      minWidth: {
        '64': '16rem'
      },
      colors: {
        'poor-orange': '#ffa446',
        'mesmer-50': '#7cc3b80f',
        'mesmer-200': '#7cc3b81c',
        'mesmer-300': '#cbece9',
        'mesmer-400': '#7fc7bc',
        'mesmer-500': '#6ab3a7',
        'mesmer-600': '#57A397',
        'mesmer-700': '#32796e',
        'mesmer-800': '#202f28'
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        'room': '1fr 1fr 1fr 1fr 1fr',
      },
      gridTemplateRows: {
        'room': '1fr 1fr 1fr 1fr 1fr',
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui')
  ],
}
