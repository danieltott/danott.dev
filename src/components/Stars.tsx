'use client';

import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useReducer, CSSProperties } from 'react';
import { Star } from './Star';

// calc((100vw - 76rem) / 2)

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
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
        'overflow-y-hidden',
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
        const top = (i / (steps - 1)) * 100;

        return <Star left={left} top={top} key={i} web />;
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
