import { motion } from "framer-motion";
import { Text } from "~/components/ui/Text";
import { Category, TimeFrame, categories, timeframes } from "../constants";

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted/80"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
}

interface FilterGroupProps<T> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
}

function FilterGroup<T extends string>({ 
  label, 
  options, 
  value, 
  onChange, 
  getLabel 
}: FilterGroupProps<T>) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Text variant="body-sm" color="secondary" weight="medium">{label}</Text>
      <motion.div 
        className="inline-flex p-1 bg-muted rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {options.map((option) => (
          <FilterButton
            key={option}
            active={value === option}
            onClick={() => onChange(option)}
          >
            {getLabel(option)}
          </FilterButton>
        ))}
      </motion.div>
    </div>
  );
}

interface FilterButtonsProps {
  timeframe: TimeFrame;
  category: Category;
  onTimeframeChange: (timeframe: TimeFrame) => void;
  onCategoryChange: (category: Category) => void;
}

export function FilterButtons({ 
  timeframe, 
  category, 
  onTimeframeChange, 
  onCategoryChange 
}: FilterButtonsProps) {
  return (
    <div className="flex flex-col gap-8 mb-12">
      <motion.div 
        className="flex flex-col items-center space-y-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Text variant="h4" color="secondary">Filter Rankings</Text>
        <div className="h-1 w-20 bg-primary rounded-full"/>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <FilterGroup
          label="Time Period"
          options={timeframes}
          value={timeframe}
          onChange={onTimeframeChange}
          getLabel={(t) => t}
        />

        <FilterGroup
          label="Sort By"
          options={categories.map(c => c.key)}
          value={category}
          onChange={onCategoryChange}
          getLabel={(c) => categories.find(cat => cat.key === c)?.label || c}
        />
      </div>
    </div>
  );
}
