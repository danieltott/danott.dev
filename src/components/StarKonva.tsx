'use client';
import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Star, Group } from 'react-konva';
import { fillColors, random, getRandom, randomScale } from './star-util';
import { Bezier, type Point } from 'bezier-js';
import Konva from 'konva';

const STEP_RATIO = 0.02;

type StarConfig = {
  id: string;
  x: number;
  y: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  fill: string;
};

type GroupConfig = {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  offsetX: number;
  offsetY: number;
};

type Config = [StarConfig, StarConfig, StarConfig, GroupConfig];

function generateShapes(width: number, height: number): Config[] {
  const steps = Math.floor(height * STEP_RATIO);

  const mapFn = (
    idPrefix: string,
    i: number,
    point: Point
  ): [StarConfig, StarConfig, StarConfig, GroupConfig] => {
    const id = `${idPrefix}-${i}`;

    const scaleX = randomScale(0.3, 1.5);
    const scaleY = getRandom(0.6, 1.4) * scaleX;

    const lScaleX = randomScale(0.3, 0.8);
    const lScaleY = getRandom(0.7, 1.3) * lScaleX;

    const rScaleX = randomScale(0.3, 0.8);
    const rScaleY = getRandom(0.7, 1.3) * rScaleX;

    return [
      {
        id: `${id}-b`,
        x: 0,
        y: 0,
        rotation: Math.random() * 360,
        fill: random(fillColors),
      },
      {
        id: `${id}-l`,
        fill: random(fillColors),
        x: getRandom(-60, -30),
        y: getRandom(-60, 60),
        scaleX: lScaleX,
        scaleY: lScaleY,
        rotation: Math.random() * 360,
      },
      {
        id: `${id}-r`,
        fill: random(fillColors),
        x: getRandom(30, 60),
        y: getRandom(-60, 60),
        scaleX: rScaleX,
        scaleY: rScaleY,
        rotation: Math.random() * 360,
      },
      {
        id: `${id}-l`,
        x: point.x,
        y: point.y,
        scaleX,
        scaleY,
        rotation: Math.random() * 360,
        offsetX: getRandom(-10, 10),
        offsetY: getRandom(-10, 10),
      },
    ];
  };

  const curve1 = getCurve(steps, width, height, false);
  const curve2 = getCurve(steps, width, height, true);

  return [
    ...curve1.map((point, i) => mapFn('LEFT', i, point)),
    ...curve2.map((point, i) => mapFn('RIGHT', i, point)),
  ];
}

function getCurve(
  steps: number,
  width: number,
  height: number,
  flip: boolean = false
) {
  // const xLow = flip ? 14 : 0;
  // const xHigh = flip ? 100 : 86;

  // const boxWidth = (width * 5) / 12;
  // const boxPadding = boxWidth * 0.14;

  // const xBoxStart = flip ? width - boxWidth : 0;
  // const xBoxEnd = flip ? width : boxWidth;

  let xLow:number;
  let xHigh:number;

  // console.log({xBoxStart, xBoxEnd, xLow, xHigh})

  if (width > 1408) {
    xLow = flip ? width - (width - 1120) / 2 : 0;
    xHigh = flip ? width : (width - 1120) / 2;

  } else {
    xLow = flip ? width - 64 : 0;
    xHigh = flip ? width : 64;
  }

  const xWidth = xHigh - xLow;

  const xStart = getRandom(xLow, xHigh);
  const percentage = xWidth * .4

  console.log({
    xLow,
    xHigh,
    xWidth,
    xStart,
    percentage,
  })

  // console.log({
  //   boxWidth,
  //   boxPadding,
  //   xBoxStart,
  //   xBoxEnd,
  //   xLow,
  //   xHigh,
  //   xStart,
  // });

  const curve1 = new Bezier(
    { x: xStart, y: 0 },
    {
      x: xLow - xWidth,
      y: getRandom(0, height/2),
    },
    {
      x: xHigh + xWidth,
      y: getRandom(height/2,height),
    },
    { x: getRandom(xLow, xHigh), y: height }
  );

  return curve1.getLUT(steps);
}

function ChildStar({ config }: { config: StarConfig }) {
  const [savedConfig] = useState<StarConfig>(config);
  return (
    <Star
      listening={false}
      numPoints={5}
      innerRadius={12}
      outerRadius={24}
      strokeWidth={2}
      stroke="#292524"
      lineCap="round"
      lineJoin="round"
      {...savedConfig}
    />
  );
}

function AnimGroup({ config }: { config: Config }) {
  const [base, left, right, { id, ...group }] = config;

  const groupRef = useRef<Konva.Group | null>(null);

  const oldConfig = useRef<Omit<GroupConfig, 'id'>>({
    x: 0,
    y: 0,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    const node = groupRef.current;
    if (
      node &&
      (oldConfig.current.x !== group.x ||
        oldConfig.current.y !== group.y ||
        oldConfig.current.rotation !== group.rotation ||
        oldConfig.current.scaleX !== group.scaleX ||
        oldConfig.current.scaleY !== group.scaleY)
    ) {
      node.to({
        duration: 1,
        easing: Konva.Easings.EaseInOut,
        onFinish: () => {
          oldConfig.current = {
            ...group,
          };
        },
        ...group,
      });
    }
  }, [group]);

  return (
    <Group
      listening={false}
      id="id"
      ref={(node) => {
        groupRef.current = node;
      }}
    >
      <ChildStar config={base} />
      <ChildStar config={left} />
      <ChildStar config={right} />
    </Group>
  );
}

export default function StarCanvas() {
  const [stars, setStars] = useState<Config[]>([]);
  const [windowSize, setWindowSize] = useState({
    width: window.document.body.offsetWidth,
    height: window.document.body.offsetHeight,
  });
  const size = useRef<{ width: number; height: number }>({
    width: window.document.body.offsetWidth,
    height: window.document.body.offsetHeight,
  });
  const oldSize = useRef<{ width: number; height: number }>({
    width: window.document.body.offsetWidth,
    height: window.document.body.offsetHeight,
  });

  useEffect(() => {
    setStars(generateShapes(size.current.width, size.current.height));

    let timeout: number;
    let interval: number;
    interval = window.setInterval(() => {
      const height = window.document.body.offsetHeight;
      const width = window.document.body.offsetWidth;

      if (height && width) {
        if (size.current.width !== width || size.current.height !== height) {
          window.clearTimeout(timeout);
          size.current = { width, height };

          timeout = window.setTimeout(() => {
            if (
              size.current.width !== oldSize.current.width ||
              size.current.height !== oldSize.current.height
            ) {
              oldSize.current = size.current;
              setStars(generateShapes(size.current.width, size.current.height));
              setWindowSize(size.current);
            }
          }, 100);
        }
      }
    }, 50);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Stage width={windowSize.width} height={windowSize.height}>
      <Layer>
        {stars.map((config) => {
          return <AnimGroup config={config} key={config[3].id} />;
        })}
      </Layer>
    </Stage>
  );
}
