const canvas = document.getElementById('2019-12-29');
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d', { antialias: false });

ctx.lineWidth = 2;
ctx.strokeStyle = '#000';
ctx.fillStyle = '#000';

const drawCircle = ({ x, y, r, c }) => {
  ctx.fillStyle = c;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
};
const drawCircleVar = ({ x, y, rs, l, f }) => {
  ctx.strokeStyle = l;
  ctx.fillStyle = f;
  ctx.beginPath();
  ctx.moveTo(x + rs[0], y);
  for (let i = 0; i < rs.length; i++) {
    const theta = 2 * Math.PI * i / rs.length;
    const dx = Math.cos(theta) * rs[i];
    const dy = Math.sin(theta) * rs[i];
    ctx.lineTo(x + dx, y + dy);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

const whiteNoise = length => Array.from({ length }, () => Math.random());
const interpolate = (arr, count) => {
  return Array.from({ length: arr.length * count }, (_v, k) => {
    const w2 = k % count;
    const w1 = count - w2;
    const i = Math.floor(k / count);
    const v1 = arr[i];
    const v2 = arr[(i + 1) % arr.length];
    return (v1 * w1 + v2 * w2) / count;
  })
};

const sample = arr => arr[Math.floor(Math.random() * arr.length)];
const colors = [3, 'a', 'c', 'e']
const sampleColor = () => `#${sample(colors)}${sample(colors)}${sample(colors)}`;
const drawCircleish = r => {
  let noise = interpolate(whiteNoise(12).map(x => r * (1 + x / 16)), 35);
  console.log(noise);
  drawCircleVar({ x: 250, y: 250, rs: noise, l: 'black', f: sampleColor() })
}
const noises = Array.from({ length: 12 }, (_, k) => ({ color: sampleColor(), noise: whiteNoise(12), r: 200 - k * 18 }));
const draw = () => {
  ctx.clearRect(0, 0, 500, 500);
  noises.forEach(({ color, noise, r }, i) => {
    const time = (new Date()).getTime() / 1000
    r += 9 * Math.sin(time + i);
    drawCircleVar({
      x: 250,
      y: 250,
      rs: interpolate(noise.map(x => r * (1 + x / 16)), 20),
      l: 'black',
      f: color,
    })
  })
}
setInterval(draw, 50)
console.log(canvas);
