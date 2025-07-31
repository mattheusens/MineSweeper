let body = document.body;
let tileMap = [];

for (let i = 0; i < 50; i++) {
  el = document.createElement("div");
  el.classList = "tile";

  p = document.createElement("p");
  p.classList = "tile-text";
  p.innerHTML = "0";
  el.appendChild(p);

  body.appendChild(el);
  tileMap.push(0);
}

let divs = document.getElementsByClassName("tile");
let ps = document.getElementsByClassName("tile-text");

let endOverlay = document.getElementById("end-overlay");
let endText = document.getElementById("end-text");
let endButton = document.getElementById("play-again");

endButton.addEventListener("click", () => {
  ResetGame();
});

function ResetGame() {
  for (let i = 0; i < 50; i++) {
    tileMap.pop();
  }

  for (let i = 0; i < 50; i++) {
    tileMap.push(0);

    ps[i].classList.add("hidden");
    ps[i].innerHTML = "0";
    if (ps[i].classList.contains("red")) ps[i].classList.remove("red");
  }

  GenerateBombs(10);
  GenerateNumbers();

  endOverlay.classList.add("hidden");
}

function GenerateBombs(count) {
  while (count > 0) {
    let index = Math.floor(Math.random() * 50);
    if (index == 50) index = 49;

    if (tileMap[index] == 0) {
      tileMap[index] = -1;
      ps[index].innerHTML = "B";
      ps[index].classList.add("red");
      count--;
    }
  }
}

function GenerateNumbers() {
  for (let i = 0; i < 50; i++) {
    if (tileMap[i] == -1) {
      let indexUsed = ChooseIndexUsage(i);

      for (let j = 0; j < indexUsed.length; j++) {
        if (indexUsed[j] >= 0 && indexUsed[j] < 50) {
          if (tileMap[indexUsed[j]] != -1) {
            tileMap[indexUsed[j]]++;
            ps[indexUsed[j]].innerHTML = tileMap[indexUsed[j]];
          }
        }
      }
    }
  }
}

function ChooseIndexUsage(i) {
  if (i % 10 == 0) {
    return [i - 10, i - 9, i + 1, i + 10, i + 11];
  } else if ((i + 1) % 10 == 0) {
    return [i - 11, i - 10, i - 1, i + 9, i + 10];
  } else {
    return [i - 11, i - 10, i - 9, i - 1, i + 1, i + 9, i + 10, i + 11];
  }
}

GenerateBombs(10);
GenerateNumbers();

function EndGame() {
  endOverlay.classList.remove("hidden");
  endText.innerHTML = "Game Over, You Lost!";
}

function FixTiles() {
  for (let i = 0; i < divs.length; i++) {
    ps[i].classList.add("hidden");
    divs[i].addEventListener("click", () => {
      ps[i].classList.remove("hidden");

      if (tileMap[i] == -1) {
        EndGame();
      }
    });
  }
}

FixTiles();
