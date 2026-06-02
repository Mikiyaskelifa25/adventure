import { ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  staggerChildren?: number;
}

export default function AnimateOnScroll({ children }: AnimateOnScrollProps) {
  return <>{children}</>;
}
