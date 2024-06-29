/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        white: '#FEFEFE',
        'gray-light': '#d3dce6'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      scrollbar: {
        thin: 'scrollbar-thin',
        none: 'scrollbar-none',
        thumb: 'scrollbar-thumb',
        track: 'scrollbar-track'
      }
    }
  },
  variants: {
    extend: {
      scrollbar: ['hover']
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.scrollbar-thin': {
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgb(31, 29, 29) white'
            // borderRadius: '20px'
          },
          '.scrollbar-webkit': {
            '&::-webkit-scrollbar': {
              width: '8px'
            },
            '&::-webkit-scrollbar-track': {
              background: 'white'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgb(31 41 55)',
              borderRadius: '20px',
              border: '1px solid white'
            }
          },
          '.scrollbar-none': {
            'scrollbar-width': 'none',
            '&::-webkit-scrollbar': {
              width: '0px'
            }
          },
          '.scrollbar-thumb': {
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '20px'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555',
              borderRadius: '20px'
            }
          },
          '.scrollbar-track': {
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
              borderRadius: '20px'
            }
          }
        },
        ['responsive', 'hover']
      )
    }
  ]
}
