//Create dropdown menu (/button?) so player can select their game piece
//Display player/computer names
//fix bug when there is a tie -- computer gets put in infinite loop
//freeze the game when a user/the computer wins
  //Looks like it happens when the player makes the last move, then the computer tries to
  //pick a square and it can't.
  //Check for winner after each move?


let rows;
let playerValueChoice;
let compValueChoice;
let gameDivText;
let play;
let comp;
let myGame;
let playerName;
let compName;
let gameWin = false;

const resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", reset);

const statusMessage = document.querySelector(".status");


let form = document.querySelector("#selectionForm");
function submitForm(event){

   //Preventing page refresh
   event.preventDefault();
}

//Calling a function during form submission.
form.addEventListener('submit', submitForm);

const confirmButton = document.querySelector(".confirm");

confirmButton.addEventListener("click", function()
{
  playerName = document.querySelector("#pname").value;
  compName = document.querySelector("#cname").value;
  playerValueChoice = document.querySelector("#piece").value;

  //create player and computer. Initialize game.
  play = createPlayer("Alex");
  comp = createComputer("Jim");
  myGame = game(play, comp);

});

//gameboard function
(function()
    {
      //creates the 9 squares needed for the game
      let sqContainer = document.querySelector(".gameBoard");
      for(let i = 0; i <= 8; i++)
      {
        //creates square for the game
        const gameDiv = document.createElement("div");
        gameDiv.classList.add("gameBoardSquare");
      
        //creates the <p> element in the square
        gameDivText = document.createElement("p");
        gameDivText.classList.add("gameBoardText");

        gameDiv.appendChild(gameDivText);
        sqContainer.appendChild(gameDiv);
      }


      let mySquareCollection = document.getElementsByClassName("gameBoardSquare");

      //add event listener for each gameboard square
      for(let i = 0; i < mySquareCollection.length; i++)
      {
        mySquareCollection[i].setAttribute("data-index", i);
        mySquareCollection[i].addEventListener("click", function(e)
        {
          //when the user clicks a square, input that data-index value into the function that makes a choice for the user
          if(rows[e.target.getAttribute("data-index")] == "x" || rows[e.target.getAttribute("data-index")] == "O")
          {
            statusMessage.textContent = "That space is already taken. Choose a different space";
          }
          else
          {
            //if there is already a winner, prevent the player/computer from selecting a new square. Prevents an infinite loop.

            myGame(rows, playerValueChoice);
            myGame(rows, compValueChoice);

            if(gameWin == false)
            {
              playChoice(e.target.getAttribute("data-index"));
              //check for winner after player move
              myGame(rows, playerValueChoice);
              populateUI(rows);
  
  
              //then the computer chooses a space
              console.log("Computer's turn to choose:")
              comp.computerChoose();
              compChoice(comp.computerChoose());
              populateUI(rows);
            }
          }
        })
      }

      console.log("Gameboard created:");


      //initializes gameboard
      rows = ["", "", "", "", "", "", "", "", ""];
      populateUI(rows);
      

      //computer choice
      function compChoice(computerChoice)
      {
        console.log(computerChoice);
        rows.splice(computerChoice, 1, compValueChoice);
        console.log(`Current gameboard: ${rows}`);
        //populates UI with the computer's choice
        populateUI(rows);
      }

      //player choice
      function playChoice(playerChoice)
      {
        console.log(playerChoice);
        rows.splice(playerChoice, 1, playerValueChoice);
        console.log(`Current gameboard: ${rows}`);
        //populates UI with the player's choice
        populateUI(rows);
      }

      //make the computer choice function available globally
      window.compChoice = compChoice;

      //make player choice function available globally
      window.playChoice = playChoice;

      console.log(`Current gameboard: ${rows}`);
      

      //populates the gameBoard Squares with the values in the 'rows' array
      function populateUI(rows)
      {
        mySquares = document.getElementsByClassName("gameBoardText");
        for(let i = 0; i <= 8; i++)
        {
          mySquares[i].textContent = rows[i];
        }
      }
    }
)();



function createComputer(name)
{
  return {
    name,
    computerChoose: function()
    {
      //choose a random spot on the gameboard
      let compValue =  Math.floor(Math.random() * 8);
      //if the row is already filled in, re-roll the computer's value
      while(rows[compValue] == "x" || rows[compValue] == "O" && gameWin == false)
      {
        compValue =  Math.floor(Math.random() * 8);
      }
      return compValue;
    }
  }
}


function createPlayer(name)
{

  function chooseValue()
  {


      if(playerValueChoice == "x" || playerValueChoice == "X" || playerValueChoice == undefined)
      {
          playerValueChoice = "x";
          compValueChoice = "O";
        }
        else if(playerValueChoice == "o" || playerValueChoice == "O")
        {
          compValueChoice = "x"
        }
  } 

  chooseValue();
  

  return {
    name,
    playerValueChoice,
    playerChoose: function()
    {
      let playerPosition = prompt("Which space do you want to pick?");

      //if the spot the player chooses is already filled, prompt the player again
      while(rows[playerPosition] == "x" || rows[playerPosition] == "O")
      {
        playerPosition = alert("That space is already taken. Choose a different space");
      }

      return playerPosition;
    }
  }
}

function reset()
{
  //resets the rows array and updates the UI
  mySquares = document.getElementsByClassName("gameBoardText");
  gameWin = false;
  for(value in rows)
  {
    rows[value] = "";
    mySquares[value].textContent = rows[value];
    statusMessage.textContent = "Game in progress";
  }
}

function game()
{
  //checks for a winner or a tie
  return function gameOutcome(rows, value) 
  {
    function allEquals(array, value) 
    {
      return array.every(item => item === value);
    }
  
    // Debugging logs
    console.log("Rows:", rows);
    console.log("Value:", value);
  
    // Checks if three values in a row are the same
    console.log("Checking rows...");
    if(allEquals([rows[0], rows[1], rows[2]], value) 
    || allEquals([rows[3], rows[4], rows[5]], value) 
    || allEquals([rows[6], rows[7], rows[8]], value))
    {
      console.log("Row win detected");
      statusMessage.textContent = "Winner! Click the `Reset` button to play again.";
      gameWin = true;
    }
  
    // Checks if three values in a column are the same
    else if(allEquals([rows[0], rows[3], rows[6]], value) 
    || allEquals([rows[1], rows[4], rows[7]], value) 
    || allEquals([rows[2], rows[5], rows[8]], value))
    {
      console.log("Column win detected");
      statusMessage.textContent = "Winner! Click the `Reset` button to play again.";
      gameWin = true;
    }
  
    // Checks if three values in a diagonal are the same
    else if(allEquals([rows[0], rows[4], rows[8]], value) 
    || allEquals([rows[2], rows[4], rows[6]], value))
    {
      console.log("Diagonal win detected");
      statusMessage.textContent = "Winner! Click the `Reset` button to play again.";
      gameWin = true;
    }
  
    // Checks if there are no empty cells left, indicating a tie
    else if(!rows.includes(""))
    {
      console.log("Tie detected");
      statusMessage.textContent = "It's a tie! Click the `Reset` button to play again.";
      gameWin = true;
    }
    else
    {
      console.log("No win or tie detected");
    }
  }
}

//check for a winner
myGame(rows, playerValueChoice);
myGame(rows, compValueChoice);


