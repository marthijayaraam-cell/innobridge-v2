/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Slate neutrals
        slateDark: '#0F172A',
        slateLightBg: '#F8FAFC',
        slateDarkBg: '#0B1120',
        slateLightCard: '#FFFFFF',
        slateDarkCard: '#111827',
        slateDarkElevated: '#1E293B',
        borderLight: '#E2E8F0',
        borderDark: '#334155',
        
        // Brand color language (Green Primary Accent)
        brandGreen: '#16A34A',       // Primary brand green
        brandGreenHover: '#15803D',
        brandGreenBright: '#22C55E',  // Bright accent green
        brandGreenMint: '#4ADE80',    // Soft mint accent (dark mode)
        
        brandBlue: '#2563EB',         // Secondary actions, links, informational elements
        brandBlueHover: '#1D4ED8',
        electricCyan: '#38BDF8',       // Domain pills & tags only
        aiIndigo: '#22C55E',           // AI features mapped to Green intelligence color
        aiIndigoDark: '#4ADE80',
        
        // Text semantics
        textMainLight: '#0F172A',
        textMainDark: '#F8FAFC',
        textSubLight: '#64748B',
        textSubDark: '#94A3B8',
        textMuted: '#94A3B8',
        
        // Status semantics
        statusSuccess: '#22C55E',
        statusWarning: '#F59E0B',
        statusError: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        cardHover: '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        aiGlow: '0 0 20px -3px rgba(34, 197, 94, 0.25)',
        aiGlowDark: '0 0 25px -3px rgba(74, 222, 128, 0.3)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}

