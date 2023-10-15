/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      'philosopher': ['Philosopher-Regular', 'sans-serif'],
    },
    colors: {
      sea: '#20b2aa',
      retro: '#ac3834',
    }
  },
};
export const plugins = [];
