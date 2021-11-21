let puzzle2x2unsolvable = [1, 3, 2, 0];
let puzzle3x3solved = [1, 2, 3, 4, 5, 6, 7, 0, 8];
let puzzle3x3mixed = [1, 3, 5, 9, 2, 0, 4, 8, 6];
let puzzle3x3mixed2 = [0, 2, 3, 1, 5, 6, 4, 7, 8];
let puzzle4x4solved = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
let puzzle4x4mixed = [0, 2, 3, 4, 1, 6, 7, 8, 5, 10, 11, 12, 9, 13, 14, 15];
let puzzle4x4mixed2 = [0, 1, 3, 4, 5, 2, 6, 8, 9, 10, 7, 11, 13, 14, 15, 12];

let puzzletest = new State(puzzle3x3mixed2, 3, "U L D R".split(" "));

let solver = new DFS(puzzletest);
solver.search();

for (let i = solver.pathToSolution.length - 1; i >= 0; i--) {
  solver.pathToSolution[i].printPuzzle();
  console.log("************");
}
