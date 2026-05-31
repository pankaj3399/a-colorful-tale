/** @type {import('tailwindcss').Config} */
export default {
  // Only scan the admin app so utilities are generated for it; the marketing
  // site keeps its own hand-written CSS.
  content: ['./src/admin/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        admin: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  // Disable the global Preflight reset so Tailwind's base styles don't bleed
  // into the marketing site. A scoped reset lives in admin/admin.css instead.
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
