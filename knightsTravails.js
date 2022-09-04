class Graph {
  constructor() {
    this.vertices = [];
    this.adjacent = {};
    this.edges = 0;
  }

  addVertex(v) {
    this.vertices.push(v);
    this.adjacent[v] = [];
  }

  addEdge(v, w) {
    this.adjacent[v].push(w);
    this.adjacent[w].push(v);
    this.edges++;
  }

  //knightMoves
  knightMoves(end, start = this.vertices[0]) {
    // debugger;
    let adj = this.adjacent;

    const queue = [];
    queue.push(start);

    const discovered = [];
    discovered[start] = true;

    const edges = [];
    edges[start] = 0;

    const predecessors = [];
    predecessors[start] = null;

    const buildPath = (end, start, predecessors) => {
      const stack = [];
      stack.push(end);

      let u = predecessors[end];

      while (u != start) {
        stack.push(u);
        u = predecessors[u];
      }

      stack.push(start);

      // let path = `[${stack.reverse().join("]-[")}]`;
      let path = `[${stack.join("]-[")}]`;

      return path;
    };

    while (queue.length) {
      let v = queue.shift();

      if (v[0] === end[0] && v[1] === end[1]) {
        //maybe need to change strict equality between two arrays
        return {
          distance: edges[end],
          path: buildPath(end, start, predecessors),
        };
      }

      for (let i = 0; i < adj[v].length; i++) {
        if (!discovered[adj[v][i]]) {
          discovered[adj[v][i]] = true;
          queue.push(adj[v][i]);
          edges[adj[v][i]] = edges[v] + 1;
          predecessors[adj[v][i]] = v;
        }
      }
    }
    return false;
  }
}

// prettier-ignore
const gameboard = [
  [0,7], [1,7], [2,7], [3,7], [4,7], [5,7], [6,7], [7,7],

  [0,6], [1,6], [2,6], [3,6], [4,6], [5,6], [6,6], [7,6],

  [0,5], [1,5], [2,5], [3,5], [4,5], [5,5], [6,5], [7,5],

  [0,4], [1,4], [2,4], [3,4], [4,4], [5,4], [6,4], [7,4],

  [0,3], [1,3], [2,3], [3,3], [4,3], [5,3], [6,3], [7,3],

  [0,2], [1,2], [2,2], [3,2], [4,2], [5,2], [6,2], [7,2],

  [0,1], [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1],

  [0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0]
]

// prettier-ignore
const possibleMoves = [
  [-1,  2],
  [ 1,  2],
  [-2,  1],
  [ 2,  1],
  [-2, -1],
  [ 2, -1],
  [-1, -2],
  [ 1, -2],
];

function getValidSpots(position) {
  let spots = [];
  possibleMoves.forEach((move) => {
    if (
      position[0] + move[0] > -1 &&
      position[0] + move[0] < 8 &&
      position[1] + move[1] > -1 &&
      position[1] + move[1] < 8
    ) {
      spots.push([position[0] + move[0], position[1] + move[1]]);
    }
  });
  return spots;
}

const g = new Graph();
gameboard.forEach((spot) => g.addVertex(spot));
g.vertices.forEach((vertex) => {
  let moves = getValidSpots(vertex);
  moves.forEach((move) => g.addEdge(vertex, move));
});

const results = [
  JSON.stringify(g.knightMoves([0, 0], [1, 2])),
  JSON.stringify(g.knightMoves([0, 0], [1, 2])),
  JSON.stringify(g.knightMoves([3, 3], [0, 0])),
];

const container = document.querySelector(".container");

results.forEach((result) => {
  const div = document.createElement("div");
  div.innerHTML = result;
  container.appendChild(div);
});
