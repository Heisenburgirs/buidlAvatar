module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    screens: {
      "sm": "250px",
      "base": "420px",
      "md": "768px",
      "lg": "1100px",
      "xl": "1400px"
    },
    extend: {
      backgroundColor: {  // If you also want to use them for other utilities (like borderColor, textColor, etc.) just copy them over to those as well.
        'background': '#11232f',
        'surface': '#1b374a',
        'secondary-surface': '#0e1a23',
        'primary': '#e54de5',
        'secondary': '#16dbbe',
        'tertiary': '#ffc900',
        'positive': '#46ffc8',
        'tentative': '#ffd464',
        'destructive': '#ff4444',
        'green': '#16dbbe',
      },
      textColor: {
        'white': '#fff1e2',
        'blue': '#92bcd8',
        'green': '#16dbbe',
        'tertiary': '#ffc900',
      },
      borderRadius: {
        '5': '5px',
        '10': '10px',
        '15': '15px'
      },
      borderOpacity: {
        '10': '0.1',
      },
      borderColor: {
        'green': '#16dbbe',
        'surface': '#1b374a',
        'secondary-surface': '#0e1a23',
        'primary': '#e54de5',
        'secondary': '#16dbbe',
        'tertiary': '#ffc900',
        'positive': '#46ffc8',
        'tentative': '#ffd464',
        'destructive': '#ff4444',
      },
      fontSize: {
        '14': '14px',
        '16': '16px',
        '20': '20px'
      }
    },
  },
  variants: {},
  plugins: [],
}