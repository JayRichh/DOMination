'use client';

import { motion } from 'framer-motion';
import { useChartFocus } from '~/contexts/ChartContext';
import { useTheme } from '~/components/ThemeProvider';
import { Maximize2, Minimize2 } from 'lucide-react';

interface ChartContainerProps {
  children: React.ReactNode;
  title: string;
  chartId: string;
  className?: string;
}

export function ChartContainer({ children, title, chartId, className = '' }: ChartContainerProps) {
  const { chartFocus, setFocusedChart, toggleFullscreen } = useChartFocus();
  const { theme } = useTheme();

  const isFocused = chartFocus.focusedChart === chartId;
  const isFullscreen = chartFocus.isFullscreen;

  const containerVariants = {
    normal: {
      width: '100%',
      height: '100%',
      position: 'relative' as const,
      zIndex: 1
    },
    focused: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 50
    }
  };

  const handleFocusClick = () => {
    if (isFocused) {
      setFocusedChart(null);
    } else {
      setFocusedChart(chartId);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      animate={isFocused ? 'focused' : 'normal'}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`
        ${className}
        ${isFocused ? 'fixed inset-0 backdrop-blur-sm' : ''}
        ${isFullscreen ? 'w-screen max-w-none' : 'w-full'}
      `}
    >
      <div className="flex items-center justify-between border-b border-border">
        <h2 className="text-2xl font-bold text-foreground tracking-tight p-4">{title}</h2>
        <div className="flex gap-2 px-4">
          <button
            onClick={handleFocusClick}
            className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
            title={isFocused ? 'Exit Focus Mode' : 'Enter Focus Mode'}
          >
            {isFocused ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>
      <div className={`
        ${isFocused ? 'h-[calc(100vh-8rem)]' : 'h-[400px] lg:h-[500px]'}
        ${isFullscreen ? 'w-screen' : 'w-full'}
        p-4
      `}>
        {children}
      </div>
    </motion.div>
  );
}

export const chartTheme = {
  background: 'transparent',
  textColor: 'hsl(var(--muted-foreground))',
  fontSize: 14,
  axis: {
    domain: {
      line: {
        stroke: 'hsl(var(--border))',
        strokeWidth: 1
      }
    },
    legend: {
      text: {
        fontSize: 14,
        fill: 'hsl(var(--foreground))',
        fontWeight: 500
      }
    },
    ticks: {
      line: {
        stroke: 'hsl(var(--border))',
        strokeWidth: 1
      },
      text: {
        fontSize: 12,
        fill: 'hsl(var(--muted-foreground))',
        fontFamily: 'var(--font-geist-sans)'
      }
    }
  },
  grid: {
    line: {
      stroke: 'hsl(var(--border))',
      strokeWidth: 1,
      strokeDasharray: '4,4'
    }
  },
  legends: {
    title: {
      text: {
        fontSize: 14,
        fill: 'hsl(var(--foreground))',
        fontWeight: 500
      }
    },
    text: {
      fontSize: 14,
      fill: 'hsl(var(--foreground))',
      fontFamily: 'var(--font-geist-sans)'
    }
  },
  tooltip: {
    container: {
      background: 'hsl(var(--card))',
      color: 'hsl(var(--card-foreground))',
      fontSize: '14px',
      fontFamily: 'var(--font-geist-sans)',
      borderRadius: '8px',
      boxShadow: '0 8px 16px -4px rgb(0 0 0 / 0.2)',
      padding: '12px 16px',
      border: '1px solid hsl(var(--border))'
    }
  },
  annotations: {
    text: {
      fontSize: 14,
      fill: 'hsl(var(--foreground))',
      fontFamily: 'var(--font-geist-sans)',
      outlineWidth: 2,
      outlineColor: 'hsl(var(--background))'
    }
  },
  crosshair: {
    line: {
      stroke: 'hsl(var(--primary))',
      strokeWidth: 1,
      strokeOpacity: 0.35
    }
  },
  dots: {
    text: {
      fontSize: 12,
      fill: 'hsl(var(--foreground))',
      fontFamily: 'var(--font-geist-sans)'
    }
  }
};
