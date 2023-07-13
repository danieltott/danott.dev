'use client';
import {useState} from 'react';
import { Stage, Layer, Star, Text } from 'react-konva';
import { fillColors, random, getRandom, randomScale } from './star-util';
import { Bezier, type Point } from 'bezier-js';

const STEP_RATIO = 0.02;

function generateShapes() {

  const curve = getCurve(Math.floor(window.outerHeight * STEP_RATIO), window.outerWidth, window.outerHeight, false)

  return curve.map((point:Point, i) => {
    const scaleX = randomScale()
    const scaleY = getRandom(0.7, 1.3) * scaleX

    return {
    id: i.toString(),
    x: point.x,
    y: point.y,
    rotation: Math.random() * 180,
    scaleX,
    scaleY,
    fill: random(fillColors),

  }});
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

export default function StarCanvas() {
  const [stars, setStars] = useState(INITIAL_STATE);



  return (
    <Stage width={window.outerWidth} height={window.outerHeight}>
      <Layer>
        {stars.map((star) => {

          return (
          <Star
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            numPoints={5}
            innerRadius={12}
            outerRadius={24}
            fill={star.fill}

            stroke="#292524"
            strokeWidth={2}
            lineCap='round'
            lineJoin='round'


            rotation={star.rotation}

            scaleX={star.scaleX}
            scaleY={star.scaleY}


          />
        )})}
      </Layer>
    </Stage>
  );
};
