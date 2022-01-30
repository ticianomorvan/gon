import { useState } from "react";

// RPS Utilities
import { RPSElement } from "./RockPaperScissors/RPSElement";
import { RPSGame } from "./RockPaperScissors/RPSGame";
import { rpsElements, rock, paper, scissors } from "./RockPaperScissors/RPSElement";
import { getRandomRPSElement } from "./RockPaperScissors/RPSUtils";

// Icons
import { FaRegHandRock, FaRegHandPaper, FaRegHandScissors } from 'react-icons/fa';

const App = () => {
  const [userSelection, setUserSelection] = useState<RPSElement>(rock);
  const [computerSelection, setComputerSelection] = useState<RPSElement>(scissors);
  const [winner, setWinner] = useState<boolean | undefined>(undefined);
  const [winnerText, setWinnerText] = useState('');
  const gameElements = document.getElementsByClassName('rps-element');

  function setRPSElement(gameElement: RPSElement, gameElementName: string) {
    const gameElementHTML = document.getElementById(`rps-element-${gameElementName}`) as HTMLLIElement;
    setUserSelection(gameElement);
    resetRPSElement();
    gameElementHTML.classList.add('selected')
  }

  function resetRPSElement() {
    for (let i = 0; i < 3; i++) {
      gameElements.item(i)?.classList.remove('selected')
    }
  }

  function showWinner(winner: boolean | undefined, computerSelection: RPSElement) {
    if (winner === true) return `You win!, the computer lost using ${computerSelection.name}.`;
    else if (winner === false) return `You lost!, the computer won using ${computerSelection.name}.`;
    else return `You withdrawed with the computer! Try again!`
  }

  function playRPSGame() {
    setComputerSelection(getRandomRPSElement(rpsElements));
    const rpsGame = new RPSGame({ userSelection: userSelection, computerSelection: computerSelection});
    console.log(computerSelection.name)
    console.log(userSelection.strongAgainst === computerSelection.name)
    console.log(rpsGame.game())
    setWinner(rpsGame.game())
    setWinnerText(showWinner(winner, computerSelection))
  }

  return (
    <main 
      className="bg-gray-800 text-white w-full h-screen flex flex-col justify-center items-center"
    >
      <section id="rps-title" className="text-center mb-8">
        <h1 className="text-3xl font-bold">GON</h1>
        <h2 className="text-gray-300">A rock, paper, scissors mini-game</h2>
      </section>
      <section id="rps-element-section" className="text-center">
        <h3 className="text-xl pb-0">Select one option!</h3>
        <ul id="rps-element-container" className="p-4 flex">
          <li id="rps-element-rock" onClick={() => setRPSElement(rock, 'rock')} className="rps-element selected">
            <FaRegHandRock className="rps-element-icon" />
          </li>
          <li id="rps-element-paper" onClick={() => setRPSElement(paper, 'paper')} className="rps-element">
            <FaRegHandPaper className="rps-element-icon" />
          </li>
          <li id="rps-element-scissors" onClick={() => setRPSElement(scissors, 'scissors')} className="rps-element">
            <FaRegHandScissors className="rps-element-icon" />
          </li>
        </ul>
      </section>
      <button
        className="py-1 px-3 border rounded-sm transition duration-150 bg-green-700 hover:bg-green-800"
        onClick={() => { playRPSGame() }}
      >
        Play!
      </button>
      <p className="p-4 m-4 rounded-lg text-xl">
        {winnerText}
      </p>
    </main>
  )
}

export default App;
