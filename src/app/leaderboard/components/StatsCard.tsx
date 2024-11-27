import { motion, useInView } from "framer-motion";
import { Text } from "~/components/ui/Text";
import { useRef } from "react";

interface TrendValueProps {
  value: string | number;
  trend?: {
    direction: "up" | "down" | "same";
    prefix?: string;
  };
  color?: string;
  delay?: number;
  inView: boolean;
}

function TrendValue({ value, trend, color = "default", delay = 0, inView }: TrendValueProps) {
  const trendColor = trend?.direction === "up" ? "text-emerald-500" : 
                    trend?.direction === "down" ? "text-rose-500" : "";
  
  return (
    <motion.div
      className="flex items-center justify-end"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay }}
    >
      <Text 
        variant="body" 
        mono 
        weight="medium"
        className={color !== "default" ? color : undefined}
      >
        {trend?.prefix}{value}
      </Text>
      {trend && trend.direction !== "same" && (
        <motion.span
          className={`ml-2 ${trendColor}`}
          initial={{ opacity: 0, y: trend.direction === "up" ? 10 : -10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: trend.direction === "up" ? 10 : -10 }}
          transition={{ duration: 0.3, delay: delay + 0.1 }}
        >
          {trend.direction === "up" ? "↑" : "↓"}
        </motion.span>
      )}
    </motion.div>
  );
}

interface StatRowProps {
  label: string;
  value: string | number;
  trend?: {
    direction: "up" | "down" | "same";
    prefix?: string;
  };
  color?: string;
  delay?: number;
  inView: boolean;
}

function StatRow({ label, value, trend, color = "default", delay = 0, inView }: StatRowProps) {
  return (
    <motion.div 
      className="flex justify-between items-center"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay }}
    >
      <Text variant="body" color="secondary">{label}</Text>
      <TrendValue 
        value={value} 
        trend={trend} 
        color={color} 
        delay={delay} 
        inView={inView}
      />
    </motion.div>
  );
}

interface StatsCardProps {
  title: string;
  stats: Array<{
    label: string;
    value: string | number;
    trend?: {
      direction: "up" | "down" | "same";
      prefix?: string;
    };
    color?: string;
  }>;
  className?: string;
  progressValue?: number;
}

export function StatsCard({ title, stats, className = "", progressValue }: StatsCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={ref}
      className={`bg-card p-6 rounded-lg border border-border shadow-md ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      <Text variant="h4" className="mb-4">{title}</Text>
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <StatRow
            key={stat.label}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            color={stat.color}
            delay={index * 0.1}
            inView={inView}
          />
        ))}
        {progressValue !== undefined && (
          <motion.div 
            className="relative pt-2"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: stats.length * 0.1 }}
          >
            <div className="bg-muted h-2 rounded-full">
              <motion.div 
                className="bg-primary h-full rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: `${progressValue}%` } : { width: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: stats.length * 0.1,
                  ease: "easeOut"
                }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
