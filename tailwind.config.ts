import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable dark mode using class strategy
  theme: {
    extend: {
      colors: {
        background: 'var(--background)', // Use CSS variable for background
        foreground: 'var(--foreground)', // Use CSS variable for foreground
        secondback: 'var(--secondback)',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'], // Add your custom font family
      },
    },
  },
  plugins: [],
} satisfies Config;