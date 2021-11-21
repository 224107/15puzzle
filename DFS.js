class DFS {
  constructor(puzzleToSolve) {
    this.seen = [];
    this.open = [puzzleToSolve];
    this.solved = false;
    this.pathToSolution = [];
  }

  search() {
    if (this.open[0].ifGoalReached()) {
      console.log("solved board");
      this.solved = true;
    }
    while (this.open.length > 0 && !this.solved) {
      let current = this.open[0];
      this.seen.push(current);
      this.open.shift();
      current.expand();
      let queue = [];
      for (let i = 0; i < current.children.length; i++) {
        let currentChild = current.children[i];
        if (currentChild.ifGoalReached()) {
          console.log("goal found");
          this.solved = true;
          this.PathTrace(currentChild);
          console.log(currentChild.path, ` ${currentChild.path.length} moves`);
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
    if (!this.solved) {
      console.log("no solution");
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
