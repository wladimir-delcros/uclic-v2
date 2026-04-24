import { cn } from '@/utils/cn';
import type { StaticImageData } from '@/interface';
import { FC } from 'react';

interface AvatarProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({ src, alt, className }) => {
  return (
    <img
      className={cn(
        'inline-block size-12 rounded-full ring-2 ring-white dark:ring-stroke-7 bg-background-2 dark:bg-background-5',
        className,
      )}
      src={typeof src === 'string' ? src : src.src}
      alt={alt}
      width={48}
      height={48}
      loading="lazy"
      decoding="async"
    />
  );
};

Avatar.displayName = 'Avatar';
export default Avatar;
