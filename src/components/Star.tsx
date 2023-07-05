import clsx from 'clsx';
import { type CSSProperties } from 'react';
import type { SvgElementProps } from '@/lib/types';

function random(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

const fillColors = [
  // 'pink-salmon':
  // 50:
  '#FFF6F8',
  // 100:
  '#FEE2E7',
  // 200:
  '#FEBAC6',
  // 300:
  '#FD92A5',
  // 400:
  '#FC5B78',
  // 500:
  '#FB244A',
  // 600:
  '#E3042C',
  // 700:
  '#AB0321',
  // 800:
  '#740216',

  // 'green-metal':
  // 50:
  '#DADFC0',
  // 100:
  '#D2D8B2',
  // 200:
  '#C2CA97',
  // 300:
  '#B2BC7C',
  // 400:
  '#A2AF61',
  // 500:
  '#8D994E',
  // 600:
  '#747E40',
  // 700:
  '#52592D',
  // 800:
  '#2F341A',

  // 'energy-yellow':
  // 50:
  '#FEF6D9',
  // 100:
  '#FDF1C5',
  // 200:
  '#FCE79D',
  // 300:
  '#FBDE76',
  // 400:
  '#FAD44E',
  // 500:
  '#F8C717',
  // 600:
  '#D2A506',
  // 700:
  '#9B7A04',
  // 800:
  '#654F03',

  // 'east-bay':
  // 50:
  '#D7E1EC',
  // 100:
  '#C9D7E5',
  // 200:
  '#AEC2D8',
  // 300:
  '#92AECB',
  // 400:
  '#7699BE',
  // 500:
  '#5B84B1',
  // 600:
  '#49709A',
  // 700:
  '#3C5C7E',
  // 800:
  '#2A4058',

  // 'brick-red':
  // 50:
  '#F8DDE3',
  // 100:
  '#F5CCD5',
  // 200:
  '#EEAAB8',
  // 300:
  '#E7889C',
  // 400:
  '#E06680',
  // 500:
  '#D94463',
  // 600:
  '#CC294B',
  // 700:
  '#9D203A',
  // 800:
  '#6F1629',

  // coral:
  // 50:
  '#FFE4D6',
  // 100:
  '#FED6C2',
  // 200:
  '#FEBC9A',
  // 300:
  '#FDA171',
  // 400:
  '#FD8649',
  // 500:
  '#FC6112',
  // 600:
  '#D34902',
  // 700:
  '#9C3602',
  // 800:
  '#642301',
];

// calc((100vw - 76rem) / 2)

function getRandom(min: number, max: number, round: number = 2) {
  const num = Math.random() * (max - min) + min;
  return parseFloat(num.toFixed(round));
}

function randomRotate(rotate3d?: boolean) {
  return rotate3d
    ? `.2 .2 1 ${getRandom(0, 360)}deg`
    : `${getRandom(0, 360)}deg`;
}

type StarProps = {
  left: number;
  top: number;
  /**
   * Is this being displayed on a web page? If so, we'll add some transitions and 3d rotation.
   */
  web?: boolean;
};

export function StarSvg({
  web,
  randomize,
  left,
  top,
  randomScaleMax = 3,
  randomScaleMin = 0.8,
  style = {},
  position = 'center',
  ...props
}: SvgElementProps &
  Pick<StarProps, 'web'> & {
    randomize?: boolean;
    left?: number;
    top?: number;
    randomScaleMin?: number;
    randomScaleMax?: number;
    position?: 'left' | 'center' | 'right';
  }) {
  const fill = random(fillColors);

  const starStyle: CSSProperties = {
    position: 'absolute',
    left:
      typeof left !== 'undefined'
        ? left
        : randomize
        ? `${getRandom(0, 100)}%`
        : undefined,
    top:
      typeof top !== 'undefined'
        ? top
        : randomize
        ? `${getRandom(0, 100)}%`
        : undefined,

    ...style,
  };

  if (randomize) {
    starStyle.filter = `hue-rotate(${getRandom(15, 180)}deg)`;

    starStyle.transform = `scale(${getRandom(
      randomScaleMin,
      randomScaleMax
    )}) rotate(${randomRotate(web)})`;

    if (position === 'left') {
      starStyle.transform = `${starStyle.transform} translateX(${getRandom(
        -44,
        -34
      )}px)`;
    }

    if (position === 'right') {
      starStyle.transform = `${starStyle.transform} translateX(${getRandom(
        44,
        34
      )}px)`;
    }
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={32}
      height={32}
      strokeWidth={1}
      stroke="currentColor"
      fill={fill}
      style={starStyle}
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

export function Star({ top, left, web }: StarProps) {
  return (
    <div
      style={{
        display: 'flex',
        top: `${top}%`,
        left: `${left}%`,
        position: 'absolute',
        height: 32,
        width: 32,
        translate: '-50%',
        rotate: randomRotate(web),
        scale: `${getRandom(0.5, 3)}`,
        ...(web ? { transitionDuration: `${getRandom(20, 1200)}ms` } : {}),
      }}
    >
      <StarSvg
        top={0}
        left={0}
        className={web ? clsx('scale-75 md:scale-100') : undefined}
      />

      <StarSvg
        top={0}
        left={0}
        randomize
        randomScaleMin={0.2}
        randomScaleMax={0.8}
        position="left"
      />

      <StarSvg
        top={0}
        left={0}
        randomize
        randomScaleMin={0.2}
        randomScaleMax={0.8}
        position="right"
      />
    </div>
  );
}
