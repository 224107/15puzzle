//rozne puzzle do testow
let puzzle3x3solved = [1, 2, 3, 4, 5, 6, 7, 8, 0];
let puzzle3x3mixed = [1, 3, 5, 9, 2, 0, 4, 8, 6];
let puzzle3x3mixed2 = [0, 2, 3, 1, 5, 6, 4, 7, 8];
let puzzle4x4solved = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
let puzzle4x4mixed = [0, 2, 3, 4, 1, 6, 7, 8, 5, 10, 11, 12, 9, 13, 14, 15];
let puzzle4x4mixed2 = [0, 1, 3, 4, 5, 2, 6, 8, 9, 10, 7, 11, 13, 14, 15, 12];
let puzzle4X4mixed3 = [1, 2, 0, 3, 5, 7, 11, 4, 9, 6, 12, 8, 13, 10, 14, 15];
let puzzle4X4mixed4 = [1, 8, 0, 3, 5, 2, 6, 4, 13, 10, 7, 12, 14, 9, 11, 15];
let puzzle4x4mixed5 = [1, 2, 3, 0, 5, 6, 7, 4, 9, 10, 11, 8, 13, 14, 15, 12];

let size, puzzle, order, algorithm, solver, stepsNumber;

let submitBtn = document.getElementById("submitBtn");
let solutionDiv = document.querySelector(".solver");
let formDiv = document.querySelector(".form");
let board = document.getElementById("board");
let btnNext = document.getElementById("next");
let solutionLabel = document.getElementById("solutionLabel");
let element = document.createElement("div");

let displayingSolution = (puzzleArr, size, order, alg) => {
  let puzzletest = new State(
    [1, 2, 3, 4, 0, 6, 7, 5, 8],
    3,
    "R U L D".split(" ")
  );
  // let puzzletest = new State(
  //   puzzleArr.split(" ").map(Number),
  //   size,
  //   order.split(" ")
  // );
  console.log(alg);
  switch (alg) {
    case "BFS":
      solver = new BFS(puzzletest);
      break;
    case "DFS":
      solver = new DFS(puzzletest);
      break;
    case "IDFS":
      solver = new IDFS(puzzletest);
      break;
  }
  solver.search();
  stepsNumber = solver.pathToSolution.length - 1;
  for (let i = stepsNumber; i >= 0; i--) {
    solver.pathToSolution[i].printPuzzle();
    console.log("************");
  }

  board.style.gridTemplateColumns = `${"auto ".repeat(size)}`;
  solutionLabel.textContent += solver.pathString;

  displayMove(stepsNumber);
};

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

btnNext.addEventListener("click", function () {
  if (stepsNumber > 0) {
    stepsNumber = stepsNumber - 1;
    displayMove(stepsNumber);
  } else {
    window.location.reload();
  }
});

submitBtn.addEventListener("click", function () {
  formDiv.classList.add("hidden");
  solutionDiv.classList.remove("hidden");
  size = document.getElementById("size").value;
  puzzle = document.getElementById("puzzle").value;
  order = document.getElementById("order").value;
  algorithm = document.getElementById("algorithm").value;

  console.log(size, puzzle, order, algorithm);
  displayingSolution(puzzle, size, order, algorithm);
});
