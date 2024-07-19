let rows;



//gameboard function
(function(playerChoice, computerChoice)
    {
      console.log("Gameboard created:");

      //initializes gameboard
      rows = [1, 1, 1, 1, 1, 1, 1, 1, 1];

      //computer choice
      function compChoice(computerChoice)
      {
        console.log(computerChoice);
        rows.splice(computerChoice, 1, "x");
        console.log(`Current gameboard: ${rows}`);  
      }

      //player choice
      function playChoice(playerChoice)
      {
        console.log(playerChoice);
        rows.splice(playerChoice, 1, "O");
        console.log(`Current gameboard: ${rows}`);  
      }

      //make the computer choice function available globally
      window.compChoice = compChoice;

      //make player choice function available globally
      window.playChoice = playChoice;

      console.log(`Current gameboard: ${rows}`);  
    }
)();


function createComputer(name)
{
  return {
    name,
    computerChoose: function()
    {
      //choose a random spot on the gameboard
      let compValue =  Math.floor(Math.random() * 10);
      //if the row is already filled in, re-roll the computer's value
      if(rows[compValue] == "x" || rows[compValue] == "O")
      {
        compValue =  Math.floor(Math.random() * 10);
      }
      return compValue;
    }
  }
}


function createPlayer(name)
{
  return {
    name,
    playerChoose: function()
    {
      let playerPosition = prompt("Which space do you want to pick?");

      //if the spot the player chooses is already filled, prompt the player again
      while(rows[playerPosition] == "x" || rows[playerPosition] == "O")
      {
        playerPosition = prompt("That space is already taken. Choose a different space");
      }

      return playerPosition;
    }
  }
}


//Todo: finish game function. Checks for a winner or a tie
function game()
{
  function checkWinner(rows)
  {
    if(rows[0] && rows[1] && rows[2] == "x" || rows[0] && rows[1] && rows[2] == "o")
    {
      return (console.log("Winner!!"));
    }
  }
}

//create player and computer object
let comp = createComputer("Jim");
let play = createPlayer("Alex");

//logic for the player to choose a space on the board
console.log("Player's turn to choose:")
let myChoice = play.playerChoose();
playChoice(myChoice);


console.log("Player's turn to choose:")
myChoice = play.playerChoose();
playChoice(myChoice);

console.log("Player's turn to choose:")
myChoice = play.playerChoose();
playChoice(myChoice);

game.checkWinner(rows);

//logic for the player to choose a space on the board
console.log("Player's turn to choose:")
myChoice = play.playerChoose();
playChoice(myChoice);

game.checkWinner(rows);

//logic for the computer to choose a space on the board
console.log("Computer's turn to choose:")
comp.computerChoose();
compChoice(comp.computerChoose());

//logic for the player to choose a space on the board
console.log("Player's turn to choose:")
myChoice = play.playerChoose();
playChoice(myChoice);

//logic for the computer to choose a space on the board
console.log("Computer's turn to choose:")
comp.computerChoose();
compChoice(comp.computerChoose());

//logic for the player to choose a space on the board
console.log("Player's turn to choose:")
myChoice = play.playerChoose();
playChoice(myChoice);

//logic for the computer to choose a space on the board
console.log("Computer's turn to choose:")
comp.computerChoose();
compChoice(comp.computerChoose());


