module.exports = {
  theme: {
    extend: {
      colors: {
        cf: {
          orange: '#FF4801',
          'orange-hover': '#FF7038',
          'orange-light': 'rgba(255, 72, 1, 0.08)',
          text: '#521000',
          'text-muted': 'rgba(82, 16, 0, 0.7)',
          'text-subtle': 'rgba(82, 16, 0, 0.4)',
          'bg-page': '#F5F1EB',
          'bg-100': '#FFFBF5',
          'bg-200': '#FFFDFB',
          'bg-300': '#FEF7ED',
          border: '#EBD5C1',
          'border-light': 'rgba(235, 213, 193, 0.5)',
          success: '#16A34A',
          warning: '#EAB308',
          error: '#DC2626',
          info: '#2563EB',
          compute: '#0A95FF',
          storage: '#EE0DDB',
          ai: '#19E306',
          media: '#9616FF'
        }
      },
      fontFamily: {
        sans: [
          'FT Kunst Grotesk',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif'
        ],
        mono: ['Apercu Mono Pro', 'SF Mono', 'Fira Code', 'Consolas', 'monospace']
      },
      borderRadius: {
        cf: '12px',
        'cf-input': '8px',
        pill: '9999px'
      },
      boxShadow: {
        'cf-card': '0 1px 3px rgba(82, 16, 0, 0.04), 0 4px 12px rgba(82, 16, 0, 0.02)',
        'cf-focus': '0 0 0 3px rgba(255, 72, 1, 0.2)',
        'cf-stack':
          '1px 6px 6px 0 rgba(255,255,255,0.2) inset, 0 4px 12px 0 rgba(0,0,0,0.02), 0 2px 12px 0 rgba(0,0,0,0.03)'
      },
      letterSpacing: {
        cf: '-0.02em',
        'cf-tight': '-0.03em'
      },
      maxWidth: {
        'cf-sm': '640px',
        'cf-md': '768px',
        'cf-lg': '1024px',
        'cf-xl': '1200px',
        'cf-2xl': '1480px'
      },
      transitionTimingFunction: {
        'cf-standard': 'cubic-bezier(0, 0, 0.2, 1)',
        'cf-button': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'cf-active': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)'
      },
      transitionDuration: {
        150: '150ms',
        200: '200ms',
        500: '500ms'
      }
    }
  }
}
