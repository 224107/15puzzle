class BFS {
  constructor(puzzleToSolve) {
    this.seen = [];
    this.open = [puzzleToSolve];
    this.solved = false;
    this.pathToSolution = [];
    this.pathString = "";
  }

  search() {
    //najpierw sprawdza czy nie jest czasem od razu rozwiazana
    if (this.open[0].ifGoalReached()) {
      console.log("solved board");
      this.solved = true;
    }
    //glowna petla - mieli poki nie mamy rozwiazania i mamy nody w open[]
    while (this.open.length > 0 && !this.solved) {
      //current - pierwszy node z open[]
      let current = this.open[0];
      this.seen.push(current);
      this.open.shift();
      current.expand();
      //sprawdzamy dzieci currenta
      for (let i = 0; i < current.children.length; i++) {
        let currentChild = current.children[i];
        if (currentChild.ifGoalReached()) {
          console.log("goal found");
          this.solved = true;
          this.PathTrace(currentChild);
          this.pathString = currentChild.path;
          console.log(this.pathString, ` ${currentChild.path.length} moves`);
        }
        //jesli nie badalismy takiego noda wczesniej(seen[]) i nie ma go na open[] to wrzucamy go do open
        if (
          !this.listContains(this.open, currentChild) &&
          !this.listContains(this.seen, currentChild)
        ) {
          this.open.push(current.children[i]);
        }
      }
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
