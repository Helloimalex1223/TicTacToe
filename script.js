let rows;
let playerValueChoice;
let compValueChoice;
let gameDivText;


//gameboard function
(function()
    {
      console.log("Gameboard created:");

      //initializes gameboard
      rows = [1, 1, 1, 1, 1, 1, 1, 1, 1];

      //computer choice
      function compChoice(computerChoice)
      {
        console.log(computerChoice);
        rows.splice(computerChoice, 1, compValueChoice);
        console.log(`Current gameboard: ${rows}`);  
      }

      //player choice
      function playChoice(playerChoice)
      {
        console.log(playerChoice);
        rows.splice(playerChoice, 1, playerValueChoice);
        console.log(`Current gameboard: ${rows}`);  
      }

      //make the computer choice function available globally
      window.compChoice = compChoice;

      //make player choice function available globally
      window.playChoice = playChoice;

      console.log(`Current gameboard: ${rows}`);
      
      
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
        gameDivText.textContent = "X";

        gameDiv.appendChild(gameDivText);
        sqContainer.appendChild(gameDiv);

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
      let compValue =  Math.floor(Math.random() * 10);
      //if the row is already filled in, re-roll the computer's value
      while(rows[compValue] == "x" || rows[compValue] == "O")
      {
        compValue =  Math.floor(Math.random() * 10);
      }
      return compValue;
    }
  }
}


function createPlayer(name)
{

  function chooseValue()
  {
    playerValueChoice = prompt("Do you want to be X or O?");
    if(playerValueChoice == "x")
    {
      compValueChoice = "O";
    }
    else
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
        playerPosition = prompt("That space is already taken. Choose a different space");
      }

      return playerPosition;
    }
  }
}


function game()
{

  function reset()
  {
    for(value in rows)
    {
      rows[value] = 1;
    }
    console.log("Gameboard has been reset");
    console.log(`Current gameboard: ${rows}`);
    console.log(`Your game piece is an: ${playerValueChoice}`);

  }

  //checks for a winner or a tie
  return function gameOutcome(rows, value)
  {
    console.log("Winner checked for");

    function allEquals(array, value) 
    {
      return array.every(item => item === value);
    }
    

    //checks if three values in a row are the same
    if(allEquals([rows[0], rows[1], rows[2]], value) 
    || allEquals([rows[3], rows[4], rows[5]], value) 
    || allEquals([rows[6], rows[7], rows[8]], value))
    {
      console.log("Winner!!");
      //resets gameboard
      reset();
    }

    //checks if three values in a column are the same
    else if(allEquals([rows[0], rows[3], rows[6]], value) 
    || allEquals([rows[1], rows[4], rows[7]], value) 
    || allEquals([rows[2], rows[5], rows[8]], value))
    {
      console.log("Winner!!");
      //resets gameboard
      reset();
    }

    //checks if three values in a diagonal are the same
    else if(allEquals([rows[0], rows[4], rows[8]], value) 
    || allEquals([rows[2], rows[4], rows[6]], value))
    {
      console.log("Winner!!");
      //resets gameboard
      reset();
    }
    
    //TODO: if none of the array spaces are the placeholder value, and there still isn't a winner, it's a tie.
    else if(!rows.includes(1))
    {
      console.log("No more moves allowed :(. It's a tie!");
      //resets gameboard
      reset();
    }  
  }
}


//create player and computer object
// let play = createPlayer("Alex");
// let comp = createComputer("Jim");


//initialize game
let myGame = game(play, comp);

//logic for the player to choose a space on the board

  console.log("Player's turn to choose:")
  let myChoice = play.playerChoose();
  playChoice(myChoice);
  
  //check for a winner
  myGame(rows, playerValueChoice);


//logic for the computer to choose a space on the board
  console.log("Computer's turn to choose:")
  comp.computerChoose();
  compChoice(comp.computerChoose());

//check for a winner
  myGame(rows, playerValueChoice);



//todo



