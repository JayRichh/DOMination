import { motion, AnimatePresence } from "framer-motion";
import { Text } from "~/components/ui/Text";
import { LeaderboardEntry } from "../types";
import { Category, categories, rankColors } from "../constants";

interface TrendIndicatorProps {
  direction: "up" | "down" | "same";
  change: number;
}

function TrendIndicator({ direction, change }: TrendIndicatorProps) {
  if (direction === "same") return null;

  const arrow = direction === "up" ? "↑" : "↓";
  const color = direction === "up" ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400";

  return (
    <motion.span
      className={`ml-2 ${color}`}
      initial={{ opacity: 0, y: direction === "up" ? 10 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {arrow} {change}
    </motion.span>
  );
}

interface LeaderboardTableProps {
  users: LeaderboardEntry[];
  selectedCategory: Category;
}

export function LeaderboardTable({ users, selectedCategory }: LeaderboardTableProps) {
  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-6 py-4 text-left">
                <Text variant="body-sm" weight="semibold" className="text-foreground">Rank</Text>
              </th>
              <th className="px-6 py-4 text-left">
                <Text variant="body-sm" weight="semibold" className="text-foreground">Player</Text>
              </th>
              <th className="px-6 py-4 text-right">
                <Text variant="body-sm" weight="semibold" className="text-foreground">
                  {categories.find(c => c.key === selectedCategory)?.label}
                </Text>
              </th>
              <th className="px-6 py-4 text-right">
                <Text variant="body-sm" weight="semibold" className="text-foreground">Challenges</Text>
              </th>
              <th className="px-6 py-4 text-right">
                <Text variant="body-sm" weight="semibold" className="text-foreground">Perfect Scores</Text>
              </th>
              <th className="px-6 py-4 text-right">
                <Text variant="body-sm" weight="semibold" className="text-foreground">Rank</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 1,
                    layoutY: { 
                      type: "spring",
                      stiffness: 800,
                      damping: 35
                    }
                  }}
                  className={`border-b border-border transition-colors relative z-10 ${
                    user.username === "YOU"
                      ? "bg-primary/10 hover:bg-primary/20"
                      : "hover:bg-muted"
                  }`}
                  style={{
                    position: "relative",
                    zIndex: users.length - index
                  }}
                >
                  <motion.td layout className="px-6 py-4 whitespace-nowrap flex items-center">
                    <span className="text-2xl">{user.avatar}</span>
                    <div className="flex items-center ml-2">
                      <Text variant="body" weight="medium" className="text-foreground">#{index + 1}</Text>
                      {user.trend && (
                        <TrendIndicator 
                          direction={user.trend.direction} 
                          change={user.trend.change}
                        />
                      )}
                    </div>
                  </motion.td>
                  <motion.td layout className="px-6 py-4 whitespace-nowrap">
                    <Text 
                      variant="body" 
                      weight="semibold"
                      className={user.username === "YOU" ? "text-primary dark:text-primary" : "text-foreground"}
                    >
                      {user.username}
                    </Text>
                  </motion.td>
                  <motion.td layout className="px-6 py-4 text-right whitespace-nowrap">
                    <motion.div
                      key={user[selectedCategory]}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <Text variant="body" mono weight="medium" className="text-foreground">
                        {selectedCategory === "score" ? user.score.toLocaleString() : user[selectedCategory]}
                      </Text>
                    </motion.div>
                  </motion.td>
                  <motion.td layout className="px-6 py-4 text-right whitespace-nowrap">
                    <motion.div
                      key={user.challenges}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <Text variant="body" mono weight="medium" className="text-foreground">{user.challenges}</Text>
                    </motion.div>
                  </motion.td>
                  <motion.td layout className="px-6 py-4 text-right whitespace-nowrap">
                    <motion.div
                      key={user.perfectScores}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <Text variant="body" mono weight="medium" className="text-foreground">{user.perfectScores}</Text>
                    </motion.div>
                  </motion.td>
                  <motion.td layout className="px-6 py-4 text-right whitespace-nowrap">
                    <Text 
                      variant="body" 
                      weight="medium" 
                      className={rankColors[user.rank]}
                    >
                      {user.rank}
                    </Text>
                  </motion.td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
