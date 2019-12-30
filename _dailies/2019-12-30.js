const WIDTH = 50;
const HEIGHT = 50;

const board = Array.from({ length: WIDTH * HEIGHT }, () => 0);
const teams = [
  { color: 'black' },
  { color: 'red' },
  { color: 'green' },
  { color: 'blue' },
  { color: 'cyan' },
  { color: 'magenta' },
  { color: 'yellow' },
  { color: '#42c9e5' },
  { color: '#f68ec3' },
  { color: 'white' },
];
const players = [
  { x: 25, y: 25, team: 1 },
  { x: 25, y: 25, team: 2 },
  { x: 25, y: 25, team: 3 },
  { x: 25, y: 25, team: 4 },
  { x: 25, y: 25, team: 5 },
  { x: 25, y: 25, team: 6 },
  { x: 25, y: 25, team: 7 },
  { x: 25, y: 25, team: 8 },
  { x: 25, y: 25, team: 9 },
]

const mod = (n, m) => (n % m) + (n < 0 && m);

const xyToI = (x, y) => mod(x, WIDTH) + WIDTH * mod(y, HEIGHT);
const get = (x, y) => board[xyToI(x, y)];
const set = (x, y, v) => board[xyToI(x, y)] = v;

const canvas = document.getElementById('2019-12-30');
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');

const step = () => {
  // move players
  for (let p of players) {
    let r = Math.random();
    if (r < 0.25) {
      p.x = mod(p.x - 1, WIDTH);
    } else if (r < 0.5) {
      p.x = mod(p.x + 1, WIDTH);
    } else if (r < 0.75) {
      p.y = mod(p.y - 1, HEIGHT);
    } else {
      p.y = mod(p.y + 1, HEIGHT);
    }
  }

  // mark locations
  for (let p of players) {
    set(p.x, p.y, p.team);
  }

  // render
  ctx.filStyle = 'blue';
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      const team = get(x, y);
      ctx.fillStyle = teams[team].color;
      ctx.fillRect(x * 10, y * 10, 8, 8);
    }
  }
};

setInterval(step, 1000 / 60);