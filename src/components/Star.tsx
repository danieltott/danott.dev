import type { SvgElementProps } from '@/lib/types';
import clsx from 'clsx';
import { random } from './star-util';

export const fillColors = [
  'fill-pink-salmon-300',
  'fill-pink-salmon-400',
  'fill-pink-salmon-500',
  'fill-pink-salmon-600',

  'fill-green-metal-300',
  'fill-green-metal-400',
  'fill-green-metal-500',
  'fill-green-metal-600',

  'fill-energy-yellow-300',
  'fill-energy-yellow-400',
  'fill-energy-yellow-500',
  'fill-energy-yellow-600',

  'fill-east-bay-300',
  'fill-east-bay-400',
  'fill-east-bay-500',
  'fill-east-bay-600',

  'fill-brick-red-300',
  'fill-brick-red-400',
  'fill-brick-red-500',
  'fill-brick-red-600',

  'fill-coral-300',
  'fill-coral-400',
  'fill-coral-500',
  'fill-coral-600',
];

export default function Star({
  randomRotate = true,
  randomFill = false,
  className,
  ...props
}: SvgElementProps & {
  randomRotate?: boolean;
  randomFill?: boolean;
}) {
  const rotation = randomRotate ? Math.floor(Math.random() * 360) : 0;
  let fill = '';
  if (randomFill) {
    fill = random(fillColors);
  }

  return (
    <svg
      style={{ rotate: `${rotation}deg` }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      className={clsx(
        fill,
        'h-6 w-6 stroke-stone-800 dark:stroke-stone-200',
        className
      )}
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}
