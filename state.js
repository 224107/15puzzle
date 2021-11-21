class State {
  puzzle = [];

  constructor(puzzle, size, order, path = "") {
    this.setPuzzle(puzzle);
    this.size = size;
    this.order = order;
    this.children = [];
    this.path = path;
  }

  canMoveLeft(p, i) {
    if (i % this.size < this.size - 1) {
      //console.log("left");

      let pc = this.copyPuzzle(p);
      let temp = pc[i + 1];
      pc[i + 1] = pc[i];
      pc[i] = temp;
      let child = new State(pc, this.size, this.order, this.path + "L");
      this.children.push(child);
      child.parent = this;
    }
  }

  canMoveRight(p, i) {
    if (i % this.size > 0) {
      //console.log("right");
      let pc = this.copyPuzzle(p);
      let temp = pc[i - 1];
      pc[i - 1] = pc[i];
      pc[i] = temp;
      let child = new State(pc, this.size, this.order, this.path + "R");
      this.children.push(child);
      child.parent = this;
    }
  }

  canMoveDown(p, i) {
    if (i - this.size >= 0) {
      //console.log("down");

      let pc = this.copyPuzzle(p);
      let temp = pc[i - this.size];
      pc[i - this.size] = pc[i];
      pc[i] = temp;
      let child = new State(pc, this.size, this.order, this.path + "D");
      this.children.push(child);
      child.parent = this;
    }
  }

  canMoveUp(p, i) {
    if (i + this.size < this.puzzle.length) {
      //console.log("up");

      let pc = this.copyPuzzle(p);
      let temp = pc[i + this.size];
      pc[i + this.size] = pc[i];
      pc[i] = temp;
      let child = new State(pc, this.size, this.order, this.path + "U");
      this.children.push(child);
      child.parent = this;
    }
  }

  expand() {
    this.findIndexOfEmpty();
    for (let i = 0; i < this.order.length; i++) {
      switch (this.order[i]) {
        case "L":
          this.canMoveLeft(this.puzzle, this.indexOfEmpty);
          break;
        case "R":
          this.canMoveRight(this.puzzle, this.indexOfEmpty);
          break;
        case "U":
          this.canMoveUp(this.puzzle, this.indexOfEmpty);
          break;
        case "D":
          this.canMoveDown(this.puzzle, this.indexOfEmpty);
          break;
      }
    }
  }

  setPuzzle(puzzle) {
    for (let i = 0; i < puzzle.length; i++) this.puzzle[i] = puzzle[i];
  }

  copyPuzzle(outp) {
    let inp = [];
    for (let i = 0; i < outp.length; i++) inp.push(outp[i]);
    return inp;
  }

  ifGoalReached() {
    let reached = true;
    let firstField = this.puzzle[0];
    for (let i = 0; i < this.puzzle.length - 1; i++) {
      if (firstField > this.puzzle[i]) reached = false;
      firstField = this.puzzle[i];
    }
    if (this.puzzle[this.puzzle.length - 1] != 0) reached = false;
    return reached;
  }

  printPuzzle() {
    for (let i = 0; i < this.size; i++) {
      let row = "";
      for (let j = 0; j < this.size; j++)
        row = row + " " + String(this.puzzle[j + i * this.size]);

      console.log(row);
    }
  }

  ifSamePuzzle(puzzle) {
    let same = true;
    for (let i = 0; i < puzzle.length; i++)
      if (this.puzzle[i] != puzzle[i]) {
        same = false;
      }
    return same;
  }

  findIndexOfEmpty() {
    for (let i = 0; this.puzzle.length; i++) {
      if (this.puzzle[i] === 0) {
        this.indexOfEmpty = i;
        break;
      }
    }
  }
}
