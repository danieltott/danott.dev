import { type CSSProperties } from 'react';
import type { SvgElementProps } from '@/lib/types';
import { fillColors, random, randomRotate, getRandom } from './star-util';

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
    ...style,
  };

  if (randomize) {
    if (web) {
      starStyle.filter = `hue-rotate(${getRandom(15, 180)}deg)`;
    }

    starStyle.transform = `scale(${getRandom(
      randomScaleMin,
      randomScaleMax
    )}) rotate(${randomRotate(web)})`;

    if (position === 'left') {
      starStyle.transform = `${starStyle.transform} translateX(${getRandom(
        -64,
        -34
      )}px)`;
    }

    if (position === 'right') {
      starStyle.transform = `${starStyle.transform} translateX(${getRandom(
        64,
        34
      )}px)`;
    }
  }

  return (
    <svg aria-hidden="true" fill={fill} style={starStyle} {...props}>
      <use href="#starSvg" />
    </svg>
  );
}

export function Star({ top, left, web }: StarProps) {
  return (
    <div
      style={{
        top: `${top}%`,
        left: `${left}%`,
        rotate: randomRotate(web),
        scale: `${getRandom(0.5, 3)}`,
        ...(web ? { transitionDuration: `${getRandom(20, 1200)}ms` } : {}),
      }}
    >
      <StarSvg className={web ? 'scale-75 md:scale-100' : undefined} />

      <StarSvg
        randomize
        randomScaleMin={0.2}
        randomScaleMax={0.8}
        position="left"
      />

      <StarSvg
        randomize
        randomScaleMin={0.2}
        randomScaleMax={0.8}
        position="right"
      />
    </div>
  );
}
