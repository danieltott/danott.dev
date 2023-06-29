'use client';

import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useReducer } from 'react';

function random(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

const fills = [
  'fill-pink-salmon-50',
  'fill-pink-salmon-100',
  'fill-pink-salmon-200',
  'fill-pink-salmon-300',
  'fill-pink-salmon-400',
  'fill-pink-salmon-500',
  'fill-pink-salmon-600',
  'fill-pink-salmon-700',
  'fill-pink-salmon-800',
  'fill-green-metal-50',
  'fill-green-metal-100',
  'fill-green-metal-200',
  'fill-green-metal-300',
  'fill-green-metal-400',
  'fill-green-metal-500',
  'fill-green-metal-600',
  'fill-green-metal-700',
  'fill-green-metal-800',
  'fill-energy-yellow-50',
  'fill-energy-yellow-100',
  'fill-energy-yellow-200',
  'fill-energy-yellow-300',
  'fill-energy-yellow-400',
  'fill-energy-yellow-500',
  'fill-energy-yellow-600',
  'fill-energy-yellow-700',
  'fill-energy-yellow-800',
  'fill-east-bay-50',
  'fill-east-bay-100',
  'fill-east-bay-200',
  'fill-east-bay-300',
  'fill-east-bay-400',
  'fill-east-bay-500',
  'fill-east-bay-600',
  'fill-east-bay-700',
  'fill-east-bay-800',
  'fill-brick-red-50',
  'fill-brick-red-100',
  'fill-brick-red-200',
  'fill-brick-red-300',
  'fill-brick-red-400',
  'fill-brick-red-500',
  'fill-brick-red-600',
  'fill-brick-red-700',
  'fill-brick-red-800',
  'fill-coral-50',
  'fill-coral-100',
  'fill-coral-200',
  'fill-coral-300',
  'fill-coral-400',
  'fill-coral-500',
  'fill-coral-600',
  'fill-coral-700',
  'fill-coral-800',
];

const lefts = [
  'left-[50%]',
  'left-[51.72%]',
  'left-[53.44%]',
  'left-[55.16%]',
  'left-[56.88%]',
  'left-[58.6%]',
  'left-[60.32%]',
  'left-[62.04%]',
  'left-[63.76%]',
  'left-[65.48%]',
  'left-[67.2%]',
  'left-[68.92%]',
  'left-[70.64%]',
  'left-[72.36%]',
  'left-[74.08%]',
  'left-[75.8%]',
  'left-[77.52%]',
  'left-[79.24%]',
  'left-[80.96%]',
  'left-[82.68%]',
  'left-[84.4%]',
  'left-[86.12%]',
  'left-[84.4%]',
  'left-[82.68%]',
  'left-[80.96%]',
  'left-[79.24%]',
  'left-[77.52%]',
  'left-[75.8%]',
  'left-[74.08%]',
  'left-[72.36%]',
  'left-[70.64%]',
  'left-[68.92%]',
  'left-[67.2%]',
  'left-[65.48%]',
  'left-[63.76%]',
  'left-[62.04%]',
  'left-[60.32%]',
  'left-[58.6%]',
  'left-[56.88%]',
  'left-[55.16%]',
  'left-[53.44%]',
  'left-[51.72%]',
  'left-[50%]',
  'left-[48.28%]',
  'left-[46.56%]',
  'left-[44.84%]',
  'left-[43.12%]',
  'left-[41.4%]',
  'left-[39.68%]',
  'left-[37.96%]',
  'left-[36.24%]',
  'left-[34.52%]',
  'left-[32.8%]',
  'left-[31.08%]',
  'left-[29.36%]',
  'left-[27.64%]',
  'left-[25.92%]',
  'left-[24.2%]',
  'left-[22.48%]',
  'left-[20.76%]',
  'left-[19.04%]',
  'left-[17.32%]',
  'left-[15.6%]',
  'left-[13.88%]',
  'left-[12.16%]',
  'left-[10.44%]',
  'left-[8.72%]',
  'left-[7%]',
  'left-[5.28%]',
  'left-[3.56%]',
  'left-[1.84%]',
  'left-[0.12%]',
  'left-[1.84%]',
  'left-[3.56%]',
  'left-[5.28%]',
  'left-[7%]',
  'left-[8.72%]',
  'left-[10.44%]',
  'left-[12.16%]',
  'left-[13.88%]',
  'left-[15.6%]',
  'left-[17.32%]',
  'left-[19.04%]',
  'left-[20.76%]',
  'left-[22.48%]',
  'left-[24.2%]',
  'left-[25.92%]',
  'left-[27.64%]',
  'left-[29.36%]',
  'left-[31.08%]',
  'left-[32.8%]',
  'left-[34.52%]',
  'left-[36.24%]',
  'left-[37.96%]',
  'left-[39.68%]',
  'left-[41.4%]',
  'left-[43.12%]',
  'left-[44.84%]',
  'left-[46.56%]',
  'left-[48.28%]',
];

// calc((100vw - 76rem) / 2)

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomRotate() {
  return `.2 .2 1 ${getRandom(0, 360)}deg`;
}

type StarProps = {
  step: number;
  leftStart: number;
  steps: number;
};

export function Star({ step, leftStart, steps }: StarProps) {
  const fill = random(fills);

  let leftIndex = leftStart + step * Math.floor(lefts.length / steps);
  if (leftIndex > lefts.length - 1) {
    leftIndex = leftIndex - lefts.length;
  }

  return (
    <div
      style={{
        top: `${(step / (steps - 1)) * 100}%`,
        rotate: randomRotate(),
        transitionDuration: `${getRandom(20, 1200)}ms`,
        scale: getRandom(0.8, 2),
      }}
      className={clsx('absolute h-8 w-8 -translate-x-1/2', lefts[leftIndex])}
    >
      <svg
        viewBox="0 0 24 24"
        className={clsx('star scale-75 md:scale-100', fill)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>

      <svg
        viewBox="0 0 24 24"
        style={{
          rotate: randomRotate(),
          scale: getRandom(0.2, 0.8),
          filter: `hue-rotate(${getRandom(15, 180)}deg)`,
          translate: `${getRandom(-44, -34)}px 0`,
        }}
        className={clsx('star', fill)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>

      <svg
        viewBox="0 0 24 24"
        style={{
          rotate: randomRotate(),
          scale: getRandom(0.2, 0.8),
          filter: `hue-rotate(${getRandom(15, 180)}deg)`,
          translate: `${getRandom(34, 44)}px 0`,
        }}
        className={clsx('star', fill)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    </div>
  );
}

const STEP_RATIO = 0.013;

function StarList({
  leftStart,
  steps,
  flip,
  height,
}: {
  leftStart: number;
  steps: number;
  height: number;
  flip?: boolean;
}) {
  return (
    <div
      style={{ height }}
      className={clsx(
        flip ? 'right-0 -scale-x-100' : 'left-0',
        'absolute',
        'top-0',
        'z-50',
        'hidden',
        'w-full',
        'min-w-[2rem]',
        'max-w-[calc((100vw_-_80rem)_/_2_+_4rem)]',
        'text-stone-800',
        'dark:text-stone-200',
        'sm:block',
        'md:min-w-[4rem]',
        '2xl:max-w-[calc((100vw_-_64rem)_/_2_-_2rem)]'
      )}
    >
      {Array.from({ length: steps }, (_, i) => (
        <Star step={i} steps={steps} leftStart={leftStart} key={i} />
      ))}
    </div>
  );
}

type State = {
  paths: string[];
  map: Record<string, React.JSX.Element>;
};

type Action = {
  pathname: string;
  docHeight: number;
  flip?: boolean;
};

const initialState: State = {
  paths: [],
  map: {},
};

function reducer(state: State, action: Action): State {
  if (state.map[action.pathname]) {
    return state;
  }

  const leftStart = Math.floor(getRandom(0, lefts.length));
  const steps = Math.floor(action.docHeight * STEP_RATIO);

  return {
    paths: [...state.paths, action.pathname],
    map: {
      ...state.map,
      [action.pathname]: (
        <StarList
          flip={action.flip}
          height={action.docHeight}
          leftStart={leftStart}
          steps={steps}
        />
      ),
    },
  };
}

export default function Stars({ flip }: { flip?: boolean }) {
  // 0.013

  const pathname = usePathname();
  const prevPathname = useRef('');

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;

      const docHeight = window?.document?.body?.offsetHeight;
      const docWidth = window?.document?.body?.offsetWidth;

      if (docHeight && docWidth && docWidth > 640) {
        dispatch({ pathname, docHeight, flip });
      }
    }
  }, [flip, pathname]);

  if (state.paths.length) {
    return (
      <>
        {state.paths.map((path) => (
          <Transition
            key={path}
            show={pathname === path}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {state.map[path]}
          </Transition>
        ))}
      </>
    );
  }
  return null;
}
