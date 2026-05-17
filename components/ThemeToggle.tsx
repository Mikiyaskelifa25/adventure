"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

const THEME_CYCLE = ["system", "light", "dark"] as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-2 w-9 h-9" />;
  }

  const current = theme || "system";
  const next = THEME_CYCLE[(THEME_CYCLE.indexOf(current as typeof THEME_CYCLE[number]) + 1) % THEME_CYCLE.length];

  const Icon = current === "system" ? Monitor : current === "dark" ? Sun : Moon;

  return (
    <button
      onClick={() => setTheme(next)}
      className="p-2 w-10 h-10 flex items-center justify-center rounded-full transition-all bg-stone-100/80 dark:bg-black/20 backdrop-blur-sm border border-black/5 dark:border-white/10 hover:bg-stone-200 dark:hover:bg-white/10 group"
      title={`Theme: ${current} → ${next}`}
    >
      <Icon size={18} className="group-hover:text-primary transition-colors" />
    </button>
  );
}
