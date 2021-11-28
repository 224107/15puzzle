class IDFS {
  constructor(puzzleToSolve) {
    this.seen = [];
    this.puzzleToSolve = puzzleToSolve;
    this.open = [puzzleToSolve];
    this.solved = false;
    this.pathToSolution = [];
    this.pathString = "";
    this.level = 1;
  }

  search() {
    if (this.puzzleToSolve.ifGoalReached()) {
      console.log("solved board");
      this.solved = true;
      return true;
    }
    // for (let level = 1; level < 13; level++) {
    //   this.DDFS(level);
    //   this.open = [this.puzzleToSolve];
    //   this.seen = [];
    // }
    do {
      this.DDFS(this.level);
      this.open = [this.puzzleToSolve];
      this.seen = [];
      this.level++;
    } while (!this.solved);

    if (!this.solved) {
      console.log("no solution");
    }
  }

  DDFS(depth) {
    while (this.open.length > 0 && !this.solved) {
      let current = this.open[0];
      this.seen.push(current);
      this.open.shift();
      if (current.path.length < depth) {
        current.expand();
        let queue = [];
        for (let i = 0; i < current.children.length; i++) {
          let currentChild = current.children[i];
          if (currentChild.ifGoalReached()) {
            console.log("goal found");
            this.solved = true;
            this.PathTrace(currentChild);
            this.pathString = currentChild.path;
            console.log(this.pathString, ` ${currentChild.path.length} moves`);
          }
          if (
            !this.listContains(this.open, currentChild) &&
            !this.listContains(this.seen, currentChild)
          ) {
            queue.push(current.children[i]);
          }
        }
        for (let i = queue.length - 1; i >= 0; i--) this.open.unshift(queue[i]);
      }
    }
  }
  listContains(list, item) {
    let contains = false;
    for (let i = 0; i < list.length; i++) {
      if (list[i].ifSamePuzzle(item.puzzle)) contains = true;
    }
    return contains;
  }

  PathTrace(currentChild) {
    this.pathToSolution.push(currentChild);
    while (currentChild.parent) {
      currentChild = currentChild.parent;
      this.pathToSolution.push(currentChild);
    }
  }
}
