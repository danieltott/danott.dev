'use client';

import { useRef, useEffect, useState } from 'react';
import {
  fillColors,
  random,
  randomRotate,
  getRandom,
  randomScale,
} from './star-util';
import { Bezier } from 'bezier-js';

const STEP_RATIO = 0.02;

function getCurve(steps: number, flip: boolean = false) {
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

  return [...LUT1, ...LUT2];
}

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>();

  useEffect(() => {
    let star = new Path2D(
      'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
    );
    if (size) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');

        if (ctx) {
          const steps = Math.floor(size.height * STEP_RATIO);

          const curve = getCurve(steps);

          ctx.lineWidth = 1;
          ctx.strokeStyle = '#292524';
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          curve.forEach((point) => {
            const baseX = (point.x / 100) * ((size.width * 5) / 12);
            const baseY = (point.y / 100) * size.height;
            const scale = randomScale();

            ctx.resetTransform();

            ctx.translate(baseX, baseY);
            ctx.fillStyle = random(fillColors);
            ctx.rotate((getRandom(0, 360) * Math.PI) / 180);
            ctx.scale(scale, scale);
            ctx.fill(star);
            ctx.stroke(star);

            // draw left star

            const leftShift = getRandom(64, 34);

            const leftScale = randomScale(0.2, 0.8);

            ctx.translate(0 - leftShift, 0);
            ctx.scale(leftScale, leftScale);

            ctx.fillStyle = random(fillColors);

            ctx.fill(star);
            ctx.stroke(star);

            // draw right star

            const rightShift = getRandom(64, 34) + leftShift;

            const rightScale = randomScale(0.2, 0.8) / leftScale;

            ctx.translate(rightShift, 0);
            ctx.scale(rightScale, rightScale);

            ctx.fillStyle = random(fillColors);

            ctx.fill(star);
            ctx.stroke(star);
          });
        }
      }
    }
  }, [size]);

  useEffect(() => {
    const height = window?.document?.body?.offsetHeight;
    const width = window?.document?.body?.offsetWidth;

    if (height && width) {
      setSize({ width, height });
    }
  }, []);

  if (size) {
    const { width, height } = size;
    return <canvas width={width} height={height} ref={canvasRef} />;
  }
  return null;
}
