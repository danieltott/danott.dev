import { type NextRequest } from 'next/server';

import {
  getRandomColor,
  getRandom,
  randomScale,
  randomRotate,
} from '@/components/star-util';
import { Bezier, type Point } from 'bezier-js';

const STEP_RATIO = 0.035;

type StarConfig = {
  id: string;
  x: number;
  y: number;
  rotate: string;
  scale: number;
  fill: string;
  translateX: number;
  translateY: number;
};

type GroupConfig = {
  id: string;
  x: number;
  y: number;
  rotate: string;
  scale: number;
};

type Config = [StarConfig, StarConfig, StarConfig, GroupConfig];

const WIDTH_CUTOFF = 1024;
// const WIDTH_CUTOFF = 9999;

function generateShapes(width: number, height: number): Config[] {
  const steps = Math.floor(height * STEP_RATIO);

  const mapFn = (
    idPrefix: string,
    i: number,
    point: Point
  ): [StarConfig, StarConfig, StarConfig, GroupConfig] => {
    const id = `${idPrefix}-${i}`;

    const scale = randomScale(0.8, 2.5);

    const lScale = randomScale(0.4, 0.8);

    const rScale = randomScale(0.4, 0.8);

    return [
      {
        id: `${id}-b`,
        x: 0,
        y: 0,
        rotate: `${getRandom(0, 360)}deg`,
        fill: getRandomColor(),
        scale: 1,
        translateX: 0,
        translateY: 0,
      },
      {
        id: `${id}-l`,
        fill: getRandomColor(),
        x: 0,
        y: 0,
        scale: lScale,
        rotate: `.2, .2, 1, ${getRandom(0, 180)}deg`,
        translateX: getRandom(-20, 20),
        translateY: getRandom(-20, 0),
      },
      {
        id: `${id}-r`,
        fill: getRandomColor(),
        x: 0,
        y: 0,
        scale: rScale,
        rotate: `.2, .2, 1, ${getRandom(180, 360)}deg`,
        translateX: getRandom(-20, 20),
        translateY: getRandom(0, 20),
      },
      {
        id: `${id}-l`,
        x: point.x,
        y: point.y,
        scale,
        rotate: randomRotate(true),
      },
    ];
  };

  const curve1 = getCurve(steps, width, height);

  return curve1.map((point, i) => mapFn('LEFT', i, point));
}

function getCurve(steps: number, width: number, height: number) {
  let xLow: number;
  let xHigh: number;
  let xStart: number;
  let xStop: number;
  let xPointA: number;
  let xPointB: number;

  const startAtLeft = Math.random() > 0.5;

  if (width < WIDTH_CUTOFF) {
    xLow = 0;
    xHigh = width;
    xStart = 0;
    xStop = width;
    xPointA = width * 2.75;
    xPointB = 0 - width * 1.75;
  } else {
    xLow = 0;
    xHigh = width;
    xStart = getRandom(xLow, (xHigh - WIDTH_CUTOFF) / 2);
    xStop = getRandom(xHigh - (xHigh - WIDTH_CUTOFF) / 2, xHigh);
    xPointA = xHigh * 2.75;
    xPointB = 0 - xHigh * 1.75;
  }

  const curve1 = new Bezier(
    { x: startAtLeft ? xStart : xStop, y: 0 },
    {
      x: startAtLeft ? xPointA : xPointB,
      y: getRandom(0, height / 2),
    },
    {
      x: startAtLeft ? xPointB : xPointA,
      y: getRandom(height / 2, height),
    },
    { x: startAtLeft ? xStop : xStart, y: height }
  );

  return curve1.getLUT(steps);
}

function ChildStar(config: StarConfig) {
  return [
    `<use`,
    `href="#star"`,
    `x="${config.x}"`,
    `y="${config.y}"`,
    `style="fill:${config.fill};
  transform:
    translate(${config.translateX}px, ${config.translateY}px)
    ${
      config.rotate.indexOf(',') === -1
        ? `rotate(${config.rotate})`
        : `rotate3d(${config.rotate})`
    }
    translate(${0 - config.translateX}px, ${0 - config.translateY}px)
    scale(${config.scale});"`,
    `/>`,
  ].join(' ');
}

function Group(config: Config) {
  const [base, left, right, group] = config;

  return [
    `<g style="transform:translate(${group.x}px, ${group.y}px) rotate3d(${group.rotate}) scale(${group.scale})">`,
    ChildStar(base),
    ChildStar(left),
    ChildStar(right),
    `</g>`,
  ].join('');
}

// function AnimGroup({ config }: { config: Config }) {
//   const [base, left, right, group] = config;

//   return (
//     <Group listening={false} {...group}>
//       <ChildStar config={base} />
//       <ChildStar config={left} />
//       <ChildStar config={right} />
//     </Group>
//   );
// }

// function Star() {
//   return (<path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />)
// }

// #292524

export async function GET(request: NextRequest) {
  const width = parseInt(request.nextUrl.searchParams.get('w') || '0', 10);
  const height = parseInt(request.nextUrl.searchParams.get('h') || '0', 10);

  const stars = generateShapes(width, height);

  return new Response(
    `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 ${width} ${height}">
    <style>
    path {
    stroke:#292524;
    stroke-width: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
    }
    </style>
    <defs>
    <path id="star" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </defs>

    ${stars.map(Group).join('')}

  </svg>
    `,
    {
      headers: {
        'content-type': 'image/svg+xml; charset=utf-8',
      },
    }
  );
}

// export function Stars() {

//   const [stars, setStars] = useState<Config[]>([]);
//   const [windowSize, setWindowSize] = useState({
//     width: window.document.body.offsetWidth,
//     height: window.document.body.offsetHeight,
//   });
//   const size = useRef<{ width: number; height: number }>({
//     width: window.document.body.offsetWidth,
//     height: window.document.body.offsetHeight,
//   });
//   const oldSize = useRef<{ width: number; height: number }>({
//     width: window.document.body.offsetWidth,
//     height: window.document.body.offsetHeight,
//   });

//   useEffect(() => {
//     setStars(generateShapes(size.current.width, size.current.height));

//     let timeout: number;

//     const interval = window.setInterval(() => {
//       const height = window.document.body.offsetHeight;
//       const width = window.document.body.offsetWidth;

//       if (height && width) {
//         if (size.current.width !== width || size.current.height !== height) {
//           window.clearTimeout(timeout);
//           size.current = { width, height };

//           timeout = window.setTimeout(() => {
//             console.log('resizing!');
//             if (
//               size.current.width !== oldSize.current.width ||
//               size.current.height !== oldSize.current.height
//             ) {
//               oldSize.current = size.current;
//               setStars(generateShapes(size.current.width, size.current.height));
//               setWindowSize(size.current);
//             }
//           }, 300);
//         }
//       }
//     }, 200);

//     return () => {
//       clearInterval(interval);
//       clearTimeout(timeout);
//     };
//   }, []);

// return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//   <Star />
// </svg>)
// }
