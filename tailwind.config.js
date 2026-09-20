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
        
        // Brand color language (LinkedIn Blue Primary Accent)
        brandBlue: '#0A66C2',         // Primary brand blue (LinkedIn)
        brandBlueHover: '#084E96',
        brandBlueBright: '#378FE9',    // Bright accent blue
        brandBlueSoft: '#70B5F9',      // Soft accent (dark mode)
        
        // Brand aliases for system compatibility
        brandGreen: '#0A66C2',       
        brandGreenHover: '#084E96',
        brandGreenBright: '#378FE9',  
        brandGreenMint: '#70B5F9',    
        
        electricCyan: '#38BDF8',       // Domain pills & tags
        aiIndigo: '#378FE9',           // AI features mapped to Blue intelligence color
        aiIndigoDark: '#70B5F9',
        
        // Text semantics
        textMainLight: '#0F172A',
        textMainDark: '#F8FAFC',
        textSubLight: '#64748B',
        textSubDark: '#94A3B8',
        textMuted: '#94A3B8',
        
        // Status semantics
        statusSuccess: '#378FE9',
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

