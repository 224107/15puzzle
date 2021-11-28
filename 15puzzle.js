//rozne puzzle do testow
let puzzle3x3solved = [1, 2, 3, 4, 5, 6, 7, 8, 0];
let puzzle3x3mixed = [1, 3, 5, 9, 2, 0, 4, 8, 6];
let puzzle3x3mixed2 = [0, 2, 3, 1, 5, 6, 4, 7, 8];
let puzzle4x4solved = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
let puzzle4x4mixed = [0, 2, 3, 4, 1, 6, 7, 8, 5, 10, 11, 12, 9, 13, 14, 15];
let puzzle4x4mixed2 = [0, 1, 3, 4, 5, 2, 6, 8, 9, 10, 7, 11, 13, 14, 15, 12];
let puzzle4X4mixed3 = [1, 2, 0, 3, 5, 7, 11, 4, 9, 6, 12, 8, 13, 10, 14, 15];
let puzzle4X4mixed4 = [1, 8, 0, 3, 5, 2, 6, 4, 13, 10, 7, 12, 14, 9, 11, 15];
let puzzle4x4mixed5 = [5, 1, 2, 4, 0, 7, 3, 8, 10, 6, 11, 12, 9, 13, 14, 15];

let size = 4;

let puzzletest = new State(puzzle4x4mixed5, size, "L U D R".split(" "));

let solver = new IDFS(puzzletest);
solver.search();
let stepsNumber = solver.pathToSolution.length - 1;
for (let i = stepsNumber; i >= 0; i--) {
  solver.pathToSolution[i].printPuzzle();
  console.log("************");
}

let board = document.getElementById("board");
let btnNext = document.getElementById("next");
let solutionLbl = document.getElementById("solutionLabel");
board.style.gridTemplateColumns = `${"auto ".repeat(size)}`;
solutionLabel.textContent += solver.pathString;
let element = document.createElement("div");

btnNext.addEventListener("click", function () {
  if (stepsNumber > 0) {
    stepsNumber = stepsNumber - 1;
    displayMove(stepsNumber);
  }
});

displayMove = (step) => {
  board.innerHTML = "";
  for (let i = 0; i < size * size; i++) {
    let element = document.createElement("div");

    element.className = "grid-item";
    if (solver.pathToSolution[step].puzzle[i] === 0) {
      element.className = "grid-item empty";
    } else element.className = "grid-item";
    element.textContent = solver.pathToSolution[step].puzzle[i];
    board.append(element);
  }
};

displayMove(stepsNumber);
