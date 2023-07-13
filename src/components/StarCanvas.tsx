'use client';

import {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
  forwardRef,
  ReactNode,
} from 'react';
import { fillColors, random, getRandom, randomScale } from './star-util';
import { Bezier, type Point } from 'bezier-js';

const STEP_RATIO = 0.02;

function randomRotate() {
  return (getRandom(0, 360) * Math.PI) / 180;
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

  const midpoint = { x: getRandom(xLow, xHigh), y: height / 2 };

  const curve1 = new Bezier(
    { x: startX, y: 0 },
    {
      x: getRandom(xBoxStart, xBoxEnd / 2),
      y: getRandom(height * 0.1, height * 0.4),
    },
    {
      x: getRandom(xBoxEnd / 2, xBoxEnd),
      y: getRandom(height * 0.1, height * 0.4),
    },
    midpoint
  );

  // console.log({ x: startX, y: 0 },
  //   { x: getRandom(xBoxStart, xBoxEnd / 2), y: getRandom(height * .1, height * .4) },
  //   { x: getRandom(xBoxEnd / 2, xBoxEnd), y: getRandom(height * .10, height * .40) },
  //   midpoint)

  var LUT1 = curve1.getLUT(steps / 2);

  const curve2 = new Bezier(
    midpoint,
    {
      x: getRandom(xBoxStart, xBoxEnd / 2),
      y: getRandom(height * 0.6, height * 0.9),
    },
    {
      x: getRandom(xBoxEnd / 2, xBoxEnd),
      y: getRandom(height * 0.6, height * 0.9),
    },
    { x: getRandom(xLow, xHigh), y: height }
  );

  // console.log(midpoint,
  //   { x: getRandom(xBoxStart, xBoxEnd / 2), y: getRandom(height * .60, height * .90) },
  //   { x: getRandom(xBoxEnd / 2, xBoxEnd), y: getRandom(height * .60, height * .90) },
  //   { x: getRandom(xLow, xHigh), y: height })

  var LUT2 = curve2.getLUT(steps / 2);

  return [...LUT1, ...LUT2];
}



function draw(ctx: CanvasRenderingContext2D, width: number, height: number) {

  console.log('drawing');
  let star = new Path2D(
    'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
  );



    ctx.clearRect(0, 0, width, height);

    const steps = Math.floor(height * STEP_RATIO);

    const curve = [
      ...getCurve(steps, width, height),
      ...getCurve(steps, width, height, true),
    ];

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#292524';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    function drawStar(i: number) {
      const point = curve[i];
      const { x: baseX, y: baseY } = point;
      const scaleX = randomScale();
      const scaleY = scaleX * getRandom(0.7, 1);

      ctx.resetTransform();

      ctx.translate(baseX, baseY);
      ctx.fillStyle = random(fillColors);
      ctx.rotate(randomRotate());
      ctx.scale(scaleX, scaleY);
      ctx.fill(star);
      ctx.stroke(star);

      ctx.save();

      // draw left star

      const leftShift = getRandom(64, 34);

      const leftScaleX = randomScale(0.2, 0.8);
      const leftScaleY = leftScaleX * getRandom(0.6, 1);

      ctx.translate(0 - leftShift, 0);
      const leftRotate = randomRotate();
      ctx.rotate(leftRotate);
      ctx.scale(leftScaleX, leftScaleY);

      ctx.fillStyle = random(fillColors);

      ctx.fill(star);
      ctx.stroke(star);

      ctx.restore();

      // ctx.rotate(0 - leftRotate);
      // ctx.scale(1/leftScaleX, 1/leftScaleY);

      // draw right star

      const rightShift = getRandom(64, 34) + leftShift;

      const rightScaleX = randomScale(0.2, 0.8);
      const rightScaleY = rightScaleX * getRandom(0.6, 1);

      ctx.translate(rightShift, 0);
      ctx.rotate(randomRotate());
      ctx.scale(rightScaleX, rightScaleY);

      ctx.fillStyle = random(fillColors);

      ctx.fill(star);
      ctx.stroke(star);

      if (i + 1 < curve.length) {
        window.requestAnimationFrame(() => {
          drawStar(i + 1);
        });
      }
    }

    window.requestAnimationFrame(() => {
      drawStar(0);
    });


  // const baseX = (point.x / 100) * ((width * 5) / 12);
  // const baseY = (point.y / 100) * height;


}

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrame = useRef<number | null>(null);
  const isAnimating = useRef(false);
  const size = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const oldSize = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // useEffect(() => {
  //   if (size) {
  //     console.log('size changed')
  //     const {width,height} = size
  //     const canvas = canvasRef.current;
  //     if (canvas) {
  //       const ctx = canvas.getContext('2d');

  //       if (ctx) {
  //         window.requestAnimationFrame(() => {
  //           if(!isAnimating.current) {
  //             isAnimating.current = true;
  //           console.log('animating')

  //           draw(ctx, width, height);
  //           isAnimating.current = false;
  //           }
  //         })
  //       }
  //     }
  //   }
  // }, [size]);

  useEffect(() => {
    console.log('useLayoutEffect');
    function redraw(width: number, height: number) {
      if(animationFrame.current) {
        window.cancelAnimationFrame(animationFrame.current);
      }
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');

        if (ctx) {
          animationFrame.current = window.requestAnimationFrame(() => {
            draw(ctx, width, height);
          });
        }
      }
    }


    // redraw(width, height);

    const resize = () => {
      console.log('resizing');
      const {width,height} = size.current;

      const canvasEl = canvasRef.current;
      const context = canvasEl?.getContext('2d');

      if (canvasEl && context) {
        if (
          width &&
          height
        ) {
          console.log('redrawing', width, height);

          canvasEl.setAttribute('width', width.toString());
          canvasEl.setAttribute('height', height.toString());
          redraw(width, height);
        }

        // const background = context.getImageData(x, y, width, height) (a simple RGBA bitmap of type Uint8ClampedArray), then after wiping the canvas with clearRect() or whatever, restore the background image simply by passing that variable back in the opposite direction: context.putImageData(x, y, background).
      }

    };

    resize();
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
              resize();
            }

          },400);
        }
      }
    },100);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
      if (animationFrame.current) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return <CanvasEl ref={canvasRef} />;
}

export const CanvasEl = forwardRef<HTMLCanvasElement, {}>((_, ref) => {
  useEffect(() => {
    console.log('mounted');
  }, []);
  useEffect(() => {
    console.log('rendered');
  });

  return <canvas ref={ref} />;
});

CanvasEl.displayName = 'CanvasEl';
