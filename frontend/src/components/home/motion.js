import { motion, useReducedMotion } from "framer-motion";

// Shared premium scroll-reveal wrapper. Respects prefers-reduced-motion.
export const Reveal = ({ children, delay = 0, y = 20, className, as = "div", ...rest }) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export const EASE = [0.22, 1, 0.36, 1];
