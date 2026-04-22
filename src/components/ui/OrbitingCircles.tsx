'use client';
import React from 'react';
import { cn } from '@/utils/cn';

const orbitKeyframes = `
@keyframes orbit {
  0% {
    transform: rotate(var(--angle, 0deg)) translateY(var(--radius, 50px))
      rotate(calc(var(--angle, 0deg) * -1));
  }
  100% {
    transform: rotate(calc(var(--angle, 0deg) + 360deg))
      translateY(var(--radius, 50px))
      rotate(calc(var(--angle, 0deg) * -1 - 360deg));
  }
}
`;

export interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircleIcons({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 100,
  path = true,
  iconSize = 36,
  speed = 1,
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;

  return (
    <>
      <style>{orbitKeyframes}</style>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden="true">
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/15"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeDasharray="3 4"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const count = React.Children.count(children);
        const angle = (360 / count) * index;
        return (
          <div
            style={
              {
                '--angle': `${angle}deg`,
                '--radius': `${radius}px`,
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: `-${iconSize / 2}px`,
                marginLeft: `-${iconSize / 2}px`,
                width: `${iconSize}px`,
                height: `${iconSize}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transformOrigin: 'center center',
                animation: `orbit ${calculatedDuration}s linear ${delay ? `-${delay}s` : '0s'} infinite ${reverse ? 'reverse' : 'normal'}`,
              } as React.CSSProperties
            }
            className={cn(className)}>
            {child}
          </div>
        );
      })}
    </>
  );
}
