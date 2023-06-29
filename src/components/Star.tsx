import clsx from 'clsx';

const STEPS = 30;

function random(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

const hueRotations = [
  // 'hue-rotate-0',
  'hue-rotate-15',
  'hue-rotate-30',
  'hue-rotate-60',
  'hue-rotate-90',
  'hue-rotate-180',
];

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

const scales = [
  'scale-[2.15]',
  'scale-[2.13]',
  'scale-[2.11]',
  'scale-[2.09]',
  'scale-[2.07]',
  'scale-[2.05]',
  'scale-[2.03]',
  'scale-[2.01]',
  'scale-[1.99]',
  'scale-[1.97]',
  'scale-[1.95]',
  'scale-[1.93]',
  'scale-[1.91]',
  'scale-[1.89]',
  'scale-[1.87]',
  'scale-[1.85]',
  'scale-[1.83]',
  'scale-[1.81]',
  'scale-[1.79]',
  'scale-[1.77]',
  'scale-[1.75]',
  'scale-[1.73]',
  'scale-[1.71]',
  'scale-[1.69]',
  'scale-[1.67]',
  'scale-[1.65]',
  'scale-[1.63]',
  'scale-[1.61]',
  'scale-[1.59]',
  'scale-[1.57]',
  'scale-[1.55]',
  'scale-[1.53]',
  'scale-[1.51]',
  'scale-[1.49]',
  'scale-[1.47]',
  'scale-[1.45]',
  'scale-[1.43]',
  'scale-[1.41]',
  'scale-[1.39]',
  'scale-[1.37]',
  'scale-[1.35]',
  'scale-[1.33]',
  'scale-[1.31]',
  'scale-[1.29]',
  'scale-[1.27]',
  'scale-[1.25]',
  'scale-[1.23]',
  'scale-[1.21]',
  'scale-[1.19]',
  'scale-[1.17]',
  'scale-[1.15]',
  'scale-[1.13]',
  'scale-[1.11]',
  'scale-[1.09]',
  'scale-[1.07]',
  'scale-[1.05]',
  'scale-[1.03]',
  'scale-[1.01]',
  'scale-[0.99]',
  'scale-[0.97]',
  'scale-[0.95]',
  'scale-[0.93]',
  'scale-[0.91]',
  'scale-[0.89]',
  'scale-[0.87]',
  'scale-[0.85]',
  'scale-[0.83]',
  'scale-[0.81]',
];

const miniscales = [
  'scale-[0.79]',
  'scale-[0.77]',
  'scale-[0.75]',
  'scale-[0.73]',
  'scale-[0.71]',
  'scale-[0.69]',
  'scale-[0.67]',
  'scale-[0.65]',
  'scale-[0.63]',
  'scale-[0.61]',
  'scale-[0.59]',
  'scale-[0.57]',
  'scale-[0.55]',
  'scale-[0.53]',
  'scale-[0.51]',
  'scale-[0.49]',
  'scale-[0.47]',
  'scale-[0.45]',
  'scale-[0.43]',
  'scale-[0.41]',
  'scale-[0.39]',
  'scale-[0.37]',
  'scale-[0.35]',
  'scale-[0.33]',
  'scale-[0.31]',
  'scale-[0.29]',
  'scale-[0.27]',
  'scale-[0.25]',
  'scale-[0.23]',
  'scale-[0.21]',
  'scale-[0.19]',
  'scale-[0.17]',
];

const rotates = [
  'rotate-0',
  'rotate-12',
  'rotate-[30deg]',
  'rotate-45',
  'rotate-[72deg]',
  'rotate-90',
  'rotate-[102deg',
  'rotate-[120deg]',
  'rotate-[135deg]',
  'rotate-[150deg]',
  'rotate-180',
];

const tops = [
  'top-[0%]',
  'top-[3%]',
  'top-[7%]',
  'top-[10%]',
  'top-[13%]',
  'top-[17%]',
  'top-[20%]',
  'top-[23%]',
  'top-[27%]',
  'top-[30%]',
  'top-[33%]',
  'top-[37%]',
  'top-[40%]',
  'top-[43%]',
  'top-[47%]',
  'top-[50%]',
  'top-[53%]',
  'top-[57%]',
  'top-[60%]',
  'top-[63%]',
  'top-[67%]',
  'top-[70%]',
  'top-[73%]',
  'top-[77%]',
  'top-[80%]',
  'top-[83%]',
  'top-[87%]',
  'top-[90%]',
  'top-[93%]',
  'top-[97%]',
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

export function generateClassName(step: number) {
  let scalesStepLength = Math.max(1, scales.length / STEPS);
  let topsStepLength = Math.max(1, tops.length / STEPS);

  let leftstep = (lefts.length / 4) * (lefts.length % step);
  return clsx(
    // random(hueRotations),
    random(
      scales
      // .slice(scalesStepLength * step, scalesStepLength * (step + 1))
    ),
    random(rotates),
    // random(tops.slice(topsStepLength * step, topsStepLength * (step + 1))),
    tops[step],
    lefts[step * Math.floor(lefts.length / STEPS)]
  );
}

export function Star({ step }: { step: number }) {
  const fill = random(fills);
  return (
    <div
      className={clsx(
        'absolute h-8 w-8 -translate-x-1/2 ',
        generateClassName(step)
      )}
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
        className={clsx(
          'star -translate-x-9',
          random(miniscales),
          fill,
          random(rotates),
          random(hueRotations)
        )}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>

      <svg
        viewBox="0 0 24 24"
        className={clsx(
          'star translate-x-9',
          random(miniscales),
          fill,
          random(rotates),
          random(hueRotations)
        )}
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

export default function Stars() {
  return (
    <div className="absolute bottom-0 left-0 top-0 z-50 hidden w-full min-w-[2rem] max-w-[calc((100vw_-_80rem)_/_2_+_4rem)] text-stone-800 dark:text-stone-200 sm:block md:min-w-[4rem] 2xl:max-w-[calc((100vw_-_64rem)_/_2_-_2rem)]">
      {Array.from({ length: STEPS }, (_, i) => (
        <Star step={i} key={i} />
      ))}
    </div>
  );
}
