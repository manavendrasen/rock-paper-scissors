//declarations
const colorButton = document.querySelector(".color-button");
const colorDiv = colorButton.parentElement;
const body = document.getElementsByTagName("BODY")[0];
const options = document.querySelector(".options-user");
const userPoints = document.querySelector(".user-points");
const compPoints = document.querySelector(".comp-points");
var scoreUser = 0;
var scoreComp = 0;

//Event Listeners
colorButton.addEventListener("click", changeColor);
options.addEventListener("click", makeMove);

//logic
function changeColor(event) {
  if (colorButton.innerHTML === '<i class="fas fa-bolt"></i>') {
    // removing dark mode
    colorDiv.classList.replace("darkbtn", "lightbtn");
    document.body.classList.replace("dark-mode", "light-mode");
    colorButton.innerHTML = '<i class="fas fa-moon"></i>';
    let a = document.querySelectorAll(".options");
    for (i = 0; i < a.length; i++) {
      a[i].style.backgroundColor = "#eeeeee";
    }
  } else {
    // removing light mode
    colorDiv.classList.replace("lightbtn", "darkbtn");
    document.body.classList.replace("light-mode", "dark-mode");
    colorButton.innerHTML = '<i class="fas fa-bolt"></i>';
    let a = document.querySelectorAll(".options");
    for (i = 0; i < a.length; i++) {
      a[i].style.backgroundColor = "#37474f";
    }
  }
}

function makeMove(event) {
  const chosenOption = event.target;
  const displayUser = document.querySelector(".move-user");
  const displayComp = document.querySelector(".move-comp");

  displayUser.innerHTML = "";
  displayComp.innerHTML = "";
  let userMove = "";
  let compMove = "";

  if (chosenOption.classList.contains("rock")) {
    insertToMoveUser(
      '<img class="icon" src = "./images/rock.png" alt="rock"/>'
    );
    userMove = "rock";
  } else if (chosenOption.classList.contains("paper")) {
    insertToMoveUser(
      '<img class="icon" src = "./images/paper.png" alt="rock"/>'
    );
    userMove = "paper";
  } else if (chosenOption.classList.contains("scissor")) {
    insertToMoveUser(
      '<img class="icon" src = "./images/scissor.png" alt="rock"/>'
    );
    userMove = "scissor";
  }
  compMove = insertToMoveComp();

  [pointsOfUser, pointsOfComp] = compareMoves(userMove, compMove);
  setTimeout(() => {
    userPoints.innerText = pointsOfUser;
    compPoints.innerText = pointsOfComp;

    //game over screen

    if (pointsOfUser == 3 || pointsOfComp == 3) {
      scoreComp = 0;
      scoreUser = 0;
      document.querySelector(".modal-window").style.visibility = "visible";
      document.querySelector(".modal-window").style.opacity = "1";
      let output = document.querySelector(".result");
      let outputTitle = document.querySelector(".result-title");
      if (pointsOfUser > pointsOfComp) {
        outputTitle.innerText = "You Won!";
        output.innerText = "The world is a safer place now thanks to you.";
      } else {
        outputTitle.innerText = "You Lost";
        output.innerText =
          "The powerful Rock Paper Scissor AI took over out planet. Try again!";
      }
    }
    updateRound();
  }, 1000);
}

// to close the game over overlay
function closeModel() {
  document.querySelector(".modal-window").style.visibility = "hidden";
  document.querySelector(".modal-window").style.opacity = "0";
  const detailsDiv = document.querySelector(".details");
  detailsDiv.innerText = "";
  userPoints.innerText = 0;
  compPoints.innerText = 0;
}

//insert a move to the user move box
function insertToMoveUser(userMove) {
  const display = document.querySelector(".move-user");
  let userChosenMove = document.createElement("div");
  userChosenMove.innerHTML = userMove;
  userChosenMove.classList.add("chosen-move");
  display.appendChild(userChosenMove);
}

//insert a move to the cpmputer move box
function insertToMoveComp() {
  const display = document.querySelector(".move-comp");
  let compChosenMove = document.createElement("div");
  [ramdomlyGeneratedMove, ramdomlyGeneratedMoveInText] = chooseRandom();
  compChosenMove.innerHTML = ramdomlyGeneratedMove;
  compChosenMove.classList.add("chosen-move");
  let waiting = document.createElement("div");
  waiting.innerText = "Opponent is deciding...";
  display.appendChild(waiting);
  setTimeout(() => {
    display.removeChild(waiting);
    display.appendChild(compChosenMove);
  }, 1000);

  return ramdomlyGeneratedMoveInText;
}

//choose the move on the opponent
function chooseRandom() {
  let compChoice = Math.floor(Math.random() * 3);
  let compMove = "";
  let compMoveInText = "";
  switch (compChoice) {
    case 0:
      compMove =
        '<img class="icon" style="transform: scaleX(-1)" src = "./images/rock.png" alt="rock"/>';
      compMoveInText = "rock";
      break;
    case 1:
      compMove =
        '<img class="icon" style="transform: scaleX(-1)" src = "./images/paper.png" alt="paper"/>';
      compMoveInText = "paper";
      break;
    case 2:
      compMove =
        '<img class="icon" style="transform: scaleX(-1)" src = "./images/scissor.png" alt="scissor"/>';
      compMoveInText = "scissor";
      break;
  }
  return [compMove, compMoveInText];
}

//calculates the points
function compareMoves(userMove, compMove) {
  if (userMove === "rock" && compMove === "paper") {
    scoreComp++;
    showDetails("AI");
  } else if (userMove === "rock" && compMove === "scissor") {
    scoreUser++;
    showDetails("You");
  } else if (userMove === "paper" && compMove === "scissor") {
    scoreComp++;
    showDetails("AI");
  } else if (userMove === "paper" && compMove === "rock") {
    scoreUser++;
    showDetails("You");
  } else if (userMove === "scissor" && compMove === "rock") {
    scoreComp++;
    showDetails("AI");
  } else if (userMove === "scissor" && compMove === "paper") {
    scoreUser++;
    showDetails("You");
  } else {
    showDetails("Draw");
  }

  return [scoreUser, scoreComp];
}

function showDetails(winner) {
  const detailsDiv = document.querySelector(".details");
  detailsDiv.innerText = "Waiting for opponent's move";
  setTimeout(() => {
    if (winner === "Draw") {
      detailsDiv.innerText = "It was a draw";
    } else {
      detailsDiv.innerText = winner + " won the turn!";
    }
  }, 1000);
}
