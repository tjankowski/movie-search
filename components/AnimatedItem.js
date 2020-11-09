import React from "react";
import { motion } from "framer-motion";
import { fadeIn, hidden } from "styles/animations";

export default function AnimatedItem({ index = 0, className, children }) {
  return (
    <motion.li
      animate={fadeIn.animate(index % 10)}
      initial={fadeIn.initial}
      exit={hidden}
      className={className}
    >
      {children}
    </motion.li>
  );
}
