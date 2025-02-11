/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'base-blue': "#28A2FF",
        dark: "#14213F",
        'dark-blue': "#006FB3",
        'light-gray': '#F7F7F7',
        gray: '#7F7F7F',
        red: '#FF2600',
        'dark-red': '#D20101'
      },
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
        title: ['"Unbounded"', 'sans-serif'],
      },
      borderRadius: {
        base: '10px',
        light: '15px',
        medium: '20px',
        large: '25px'
      },
      boxShadow: {
        down: '0 4px 10px rgba(0, 0, 0, 0.05)',
        up: '0 -4px 10px rgba(0, 0, 0, 0.05)',
        center: '0 0 4px rgba(0, 0, 0, 0.08)',
        inner: 'inset 0 0 4px rgba(0, 0, 0, 0.05)'
      }
    },
  },
  plugins: [],
};
