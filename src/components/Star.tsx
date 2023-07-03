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

// calc((100vw - 76rem) / 2)

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomRotate() {
  return `.2 .2 1 ${getRandom(0, 360)}deg`;
}

type StarProps = {
  step: number;
  left: number;
  steps: number;
};

export function Star({ step, left, steps }: StarProps) {
  const fill = random(fills);

  return (
    <div
      style={{
        top: `${(step / (steps - 1)) * 100}%`,
        rotate: randomRotate(),
        transitionDuration: `${getRandom(20, 1200)}ms`,
        scale: getRandom(0.8, 3),
        left: `${left}%`,
      }}
      className={clsx('absolute h-8 w-8 -translate-x-1/2')}
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
  steps,
  flip,
  height,
}: {
  steps: number;
  height: number;
  flip?: boolean;
}) {
  let goingUp = flip;
  const leftStart = Math.floor(getRandom(0, 90));
  const leftStep = getRandom(150, 500) / steps;
  let counter = 0;

  return (
    <div
      style={{ height }}
      className={clsx(
        flip ? 'right-0' : 'left-0',
        'absolute',
        'top-0',
        'z-10',
        'w-5/12',
        'text-stone-800',
        'dark:text-stone-600'
      )}
    >
      {Array.from({ length: steps }, (_, i) => {
        const left = leftStart + counter * leftStep;

        if (leftStart + (counter + 1) * leftStep > 86) {
          goingUp = false;
        }

        if (leftStart + (counter - 1) * leftStep < 0) {
          goingUp = true;
        }

        counter = goingUp ? counter + 1 : counter - 1;

        return <Star left={left} step={i} steps={steps} key={i} />;
      })}
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

  const steps = Math.floor(action.docHeight * STEP_RATIO);

  return {
    paths: [...state.paths, action.pathname],
    map: {
      ...state.map,
      [action.pathname]: (
        <StarList flip={action.flip} height={action.docHeight} steps={steps} />
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

      if (docHeight) {
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
