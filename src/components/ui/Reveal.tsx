'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'span' | 'li' | 'h2' | 'h3' | 'p';
  once?: boolean;
  margin?: string;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: (custom: { duration: number }) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: custom.duration,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  className,
  as = 'div',
  once = true,
  margin = '-80px',
}: Props) {
  const MotionComp = motion[as] as typeof motion.div;

  return (
    <MotionComp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: margin as `${number}px` }}
      variants={variants}
      custom={{ duration }}
      transition={{ delay }}>
      {children}
    </MotionComp>
  );
}
