'use client';

import { motion, Variants } from 'framer-motion';

type Props = {
  text: string;
  delayStart?: number;
  stagger?: number;
  duration?: number;
  className?: string;
};

const container: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const child: Variants = {
  hidden: { opacity: 0, y: '0.35em', filter: 'blur(10px)' },
  show: (duration: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function AnimatedChars({
  text,
  delayStart = 0,
  stagger = 0.025,
  duration = 0.7,
  className,
}: Props) {
  // Split by words to preserve word-wrap behavior, each word split into chars
  const words = text.split(' ');

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="show"
      custom={stagger}
      variants={container}
      transition={{ delayChildren: delayStart, staggerChildren: stagger }}
      aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split('').map((ch, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              variants={child}
              custom={duration}>
              {ch}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
