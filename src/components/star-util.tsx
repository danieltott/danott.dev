export function random<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export const fillColors = [
  // 'pink-salmon':
  // 50:
  '#FFF6F8',
  // 100:
  '#FEE2E7',
  // 200:
  '#FEBAC6',
  // 300:
  '#FD92A5',
  // 400:
  '#FC5B78',
  // 500:
  '#FB244A',
  // 600:
  '#E3042C',
  // 700:
  '#AB0321',
  // 800:
  '#740216',

  // 'green-metal':
  // 50:
  '#DADFC0',
  // 100:
  '#D2D8B2',
  // 200:
  '#C2CA97',
  // 300:
  '#B2BC7C',
  // 400:
  '#A2AF61',
  // 500:
  '#8D994E',
  // 600:
  '#747E40',
  // 700:
  '#52592D',
  // 800:
  '#2F341A',

  // 'energy-yellow':
  // 50:
  '#FEF6D9',
  // 100:
  '#FDF1C5',
  // 200:
  '#FCE79D',
  // 300:
  '#FBDE76',
  // 400:
  '#FAD44E',
  // 500:
  '#F8C717',
  // 600:
  '#D2A506',
  // 700:
  '#9B7A04',
  // 800:
  '#654F03',

  // 'east-bay':
  // 50:
  '#D7E1EC',
  // 100:
  '#C9D7E5',
  // 200:
  '#AEC2D8',
  // 300:
  '#92AECB',
  // 400:
  '#7699BE',
  // 500:
  '#5B84B1',
  // 600:
  '#49709A',
  // 700:
  '#3C5C7E',
  // 800:
  '#2A4058',

  // 'brick-red':
  // 50:
  '#F8DDE3',
  // 100:
  '#F5CCD5',
  // 200:
  '#EEAAB8',
  // 300:
  '#E7889C',
  // 400:
  '#E06680',
  // 500:
  '#D94463',
  // 600:
  '#CC294B',
  // 700:
  '#9D203A',
  // 800:
  '#6F1629',

  // coral:
  // 50:
  '#FFE4D6',
  // 100:
  '#FED6C2',
  // 200:
  '#FEBC9A',
  // 300:
  '#FDA171',
  // 400:
  '#FD8649',
  // 500:
  '#FC6112',
  // 600:
  '#D34902',
  // 700:
  '#9C3602',
  // 800:
  '#642301',
];

export function getRandomColor() {
  return random(fillColors);
}

export function getRandom(min: number, max: number, round: number = 2) {
  const num = Math.random() * (max - min) + min;
  return parseFloat(num.toFixed(round));
}

export function randomRotate(rotate3d?: boolean) {
  return rotate3d
    ? `.2, .2, 1, ${getRandom(0, 360)}deg`
    : `${getRandom(0, 360)}deg`;
}

export function randomScale(
  randomScaleMin: number = 0.8,
  randomScaleMax: number = 4
) {
  return getRandom(randomScaleMin, randomScaleMax);
}
