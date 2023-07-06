'use client';

import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useReducer } from 'react';
import { Star } from './Star';
import { Bezier } from 'bezier-js';

// calc((100vw - 76rem) / 2)

function roundNumber(number: number, round: number = 2) {
  return parseFloat(number.toFixed(round));
}

function getRandom(min: number, max: number, round: number = 2) {
  const num = Math.random() * (max - min) + min;
  return roundNumber(num, round);
}

const STEP_RATIO = 0.02;

function StarList({
  steps,
  flip,
  height,
}: {
  steps: number;
  height: number;
  flip?: boolean;
}) {
  const xLow = flip ? 14 : 0;
  const xHigh = flip ? 100 : 86;

  const startX = flip ? getRandom(86, 100) : getRandom(0, 14);

  const lastPoint = { x: getRandom(xLow, xHigh), y: 50 };

  const curve1 = new Bezier(
    { x: startX, y: 0 },
    { x: getRandom(0, 50), y: getRandom(10, 40) },
    { x: getRandom(50, 100), y: getRandom(10, 40) },
    lastPoint
  );

  var LUT1 = curve1.getLUT(steps / 2);

  const curve2 = new Bezier(
    lastPoint,
    { x: getRandom(0, 50), y: getRandom(60, 90) },
    { x: getRandom(50, 100), y: getRandom(60, 90) },
    { x: getRandom(xLow, xHigh), y: 100 }
  );

  var LUT2 = curve2.getLUT(steps / 2);

  const LUT = [...LUT1, ...LUT2];

  return (
    <div
      style={{ height }}
      className={clsx(
        flip ? 'right-0' : 'left-0',
        'absolute',
        'overflow-y-hidden',
        'top-0',
        'z-10',
        'w-5/12',
        'text-stone-800',
        'dark:text-stone-600'
      )}
    >
      {LUT.map((point, i) => {
        return <Star left={point.x} top={point.y} key={i} web />;
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