/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#070b14',
        panel: '#101725',
        panel2: '#141d2d',
        line: 'rgba(171, 191, 255, 0.12)',
        accent: '#7c9cff',
        accent2: '#68e4ff',
        success: '#60d394',
        warn: '#f8b84e',
        danger: '#ff6b81',
        text: '#edf2ff',
        muted: '#94a3c4'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.28)',
        glow: '0 0 0 1px rgba(124, 156, 255, 0.16), 0 16px 50px rgba(33, 45, 75, 0.45)'
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.6rem'
      },
      backgroundImage: {
        'panel-gradient': 'linear-gradient(180deg, rgba(20,29,45,0.96) 0%, rgba(12,18,30,0.96) 100%)',
        'hero-gradient': 'radial-gradient(circle at top left, rgba(104,228,255,0.16), transparent 40%), radial-gradient(circle at top right, rgba(124,156,255,0.18), transparent 35%), linear-gradient(180deg, rgba(14,20,33,1) 0%, rgba(7,11,20,1) 100%)'
      }
    },
  },
  plugins: [],
};
