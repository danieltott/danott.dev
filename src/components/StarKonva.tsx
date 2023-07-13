'use client';
import {Fragment, useEffect, useRef, useState} from 'react';
import { Stage, Layer, Star, Text } from 'react-konva';
import { fillColors, random, getRandom, randomScale } from './star-util';
import { Bezier, type Point } from 'bezier-js';

const STEP_RATIO = 0.02;

type StarConfig = {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  fill: string;
}

function generateShapes():[StarConfig,StarConfig,StarConfig][] {
const steps = Math.floor(window.outerHeight * STEP_RATIO)
const curve = getCurve(steps, window.outerWidth, window.outerHeight, false)
console.log({steps, l:curve.length})

  return curve.map((point:Point, i) => {
    const scaleX = randomScale(.5,1.5)
    const scaleY = getRandom(0.7, 1.3) * scaleX

    const lScaleX = randomScale(.3,.8)
    const lScaleY = getRandom(0.7, 1.3) * lScaleX

    const rScaleX = randomScale(.3,.8)
    const rScaleY = getRandom(0.7, 1.3) * rScaleX

    return [
    {

    id: i.toString(),
    x: point.x,
    y: point.y,
    rotation: Math.random() * 360,
    scaleX,
    scaleY,
    fill: random(fillColors),
    },
    { id: `${i}l`,
      fill: random(fillColors),
      x: point.x + getRandom(-60, -30),
      y: point.y + getRandom(-60, 60),
      scaleX: lScaleX,
      scaleY: lScaleY,
      rotation: Math.random() * 360,
    },
    {
      id: `${i}r`,
      fill: random(fillColors),
      x: point.x + getRandom(30, 60),
      y: point.y + getRandom(-60, 60),
      scaleX: rScaleX,
      scaleY: rScaleY,
      rotation: Math.random() * 360,
    }
  ]

  });
}

function getCurve(
  steps: number,
  width: number,
  height: number,
  flip: boolean = false
) {
  // const xLow = flip ? 14 : 0;
  // const xHigh = flip ? 100 : 86;

  const boxWidth = (width * 5) / 12;
  const boxPadding = boxWidth * 0.14;

  const xBoxStart = flip ? width - boxWidth : 0;
  const xBoxEnd = flip ? width : boxWidth;

  const xLow = flip ? xBoxStart + boxPadding : 0;
  const xHigh = flip ? width : xBoxEnd - boxPadding;

  // console.log({xBoxStart, xBoxEnd, xLow, xHigh})

  const startX = getRandom(xBoxStart + boxPadding, xBoxEnd - boxPadding);

  console.log({
    boxWidth,
    boxPadding,
    xBoxStart,
    xBoxEnd,
    xLow,
    xHigh,
    startX,
  })

  const midpoint = { x: getRandom(xLow, xHigh), y: height / 2 };

  const curve1 = new Bezier(
    { x: startX, y: 0 },
    {
      x: xBoxStart - width * .4,
      y: getRandom(height * 0.2, height * 0.4),
    },
    {
      x: xBoxEnd + width * .4,
      y: getRandom(height * 0.6, height * 0.8),
    },
    { x: getRandom(xLow, xHigh), y: height }
  );

  return curve1.getLUT(steps);

  // console.log({ x: startX, y: 0 },
  //   { x: getRandom(xBoxStart, xBoxEnd / 2), y: getRandom(height * .1, height * .4) },
  //   { x: getRandom(xBoxEnd / 2, xBoxEnd), y: getRandom(height * .10, height * .40) },
  //   midpoint)

  // var LUT1 = curve1.getLUT(steps / 2);

  // const curve2 = new Bezier(
  //   midpoint,
  //   {
  //     x: getRandom(xBoxStart, xBoxEnd / 2),
  //     y: getRandom(height * 0.6, height * 0.9),
  //   },
  //   {
  //     x: getRandom(xBoxEnd / 2, xBoxEnd),
  //     y: getRandom(height * 0.6, height * 0.9),
  //   },
  //   { x: getRandom(xLow, xHigh), y: height }
  // );

  // // console.log(midpoint,
  // //   { x: getRandom(xBoxStart, xBoxEnd / 2), y: getRandom(height * .60, height * .90) },
  // //   { x: getRandom(xBoxEnd / 2, xBoxEnd), y: getRandom(height * .60, height * .90) },
  // //   { x: getRandom(xLow, xHigh), y: height })

  // var LUT2 = curve2.getLUT(steps / 2);

  // return [...LUT1, ...LUT2];
}

const INITIAL_STATE = generateShapes();

const defaults = {
  numPoints:5,
  innerRadius:12,
  outerRadius:24,


  stroke:"#292524",
  strokeWidth:2,
  lineCap:'round',
  lineJoin:'round',
} as const

function AnimStar({
  id,
    x,
    y,
    rotation,
    scaleX,
    scaleY,
    fill,
}:StarConfig) {
  return <Star
  {...defaults}
  id={id}
  x={x}
  y={y}
  fill={fill}



  rotation={rotation}

  scaleX={scaleX}
  scaleY={scaleY}


/>
}

export default function StarCanvas() {
  const [stars, setStars] = useState(INITIAL_STATE);
  const size = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const oldSize = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });


  useEffect(() => {
    let timeout: number;
    let interval: number;
    interval = window.setInterval(() => {
      const height = window?.document?.body?.offsetHeight;
      const width = window?.document?.body?.offsetWidth;

      if(height && width ) {

        if(size.current.width !== width || size.current.height !== height) {
          window.clearTimeout(timeout);
          size.current = {width, height};



          timeout = window.setTimeout(() => {
            if(size.current.width !== oldSize.current.width || size.current.height !== oldSize.current.height) {
              oldSize.current = size.current;
              setStars(generateShapes());
            }

          },400);
        }
      }
    },100);
  },[])


  return (
    <Stage width={window.outerWidth} height={window.outerHeight}>
      <Layer>
        {stars.map(([base,left,right]) => {

          return (<Fragment key={base.id}>
          <AnimStar {...base} />
          <AnimStar {...left} />
          <AnimStar {...right} />
          </Fragment>

        )})}
      </Layer>
    </Stage>
  );
};
