'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface ChartFocus {
  focusedChart: string | null;
  isFullscreen: boolean;
}

interface ChartContextType {
  chartFocus: ChartFocus;
  setFocusedChart: (chartId: string | null) => void;
  toggleFullscreen: () => void;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export function ChartProvider({ children }: { children: React.ReactNode }) {
  const [chartFocus, setChartFocus] = useState<ChartFocus>({
    focusedChart: null,
    isFullscreen: false
  });

  useEffect(() => {
    const savedFocus = localStorage.getItem('chart_focus');
    if (savedFocus) {
      setChartFocus(JSON.parse(savedFocus));
    }
  }, []);

  const setFocusedChart = (chartId: string | null) => {
    const newFocus = { ...chartFocus, focusedChart: chartId };
    setChartFocus(newFocus);
    localStorage.setItem('chart_focus', JSON.stringify(newFocus));
  };

  const toggleFullscreen = () => {
    const newFocus = { ...chartFocus, isFullscreen: !chartFocus.isFullscreen };
    setChartFocus(newFocus);
    localStorage.setItem('chart_focus', JSON.stringify(newFocus));
  };

  return (
    <ChartContext.Provider value={{ chartFocus, setFocusedChart, toggleFullscreen }}>
      {children}
    </ChartContext.Provider>
  );
}

export function useChartFocus() {
  const context = useContext(ChartContext);
  if (context === undefined) {
    throw new Error('useChartFocus must be used within a ChartProvider');
  }
  return context;
}
