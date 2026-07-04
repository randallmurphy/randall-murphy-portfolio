import type { StaticImageData } from 'next/image';

export const toSrc = (img: StaticImageData | string): string =>
  typeof img === 'string' ? img : img.src;
