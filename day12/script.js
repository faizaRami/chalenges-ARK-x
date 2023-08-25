console.log("Hello world");
const playRound=(playerSelection, computerSelection)=>{
    // Win condition
if(playerSelection==="Rock"&&computerSelection==="Scissors"||playerSelection==="Scissors"&&computerSelection==="Paper"||playerSelection==="Paper"&&computerSelection==="Rock"){
    console.log("Congratulations you WIN"+" "+playerSelection+" beats "+computerSelection);
}
// tie condition
else if(playerSelection===computerSelection){
    console.log("It's tie! "+playerSelection+" beats "+computerSelection);
}
// Lose condition

else{
    let message=" Sorry You LOSE ";
    console.log(message+" "+playerSelection+" beats "+computerSelection);
}
}
const Game=()=>{
   let  playerSelection=prompt("enter Rock, Paper or Scissors");
  let myArray = [
    "Rock",
    "Paper",
    "Scissors"
  ];
//   declare array choises
  let computerSelection = myArray[Math.floor(Math.random()*myArray.length)];
//   call function playRound
  playRound (playerSelection , computerSelection);
}
Game();

 