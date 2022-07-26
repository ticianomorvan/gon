import { useEffect, useState, ReactElement } from "react";

// RPS Utilities
import { RPSElement } from "./RockPaperScissors/RPSElement";
import { RPSGame, RPSResultsType } from "./RockPaperScissors/RPSGame";
import { rock, paper, scissors } from "./RockPaperScissors/RPSElement";

// Icons
import {
  FaHandRock, FaHandPaper, FaHandScissors, 
  FaRegHandRock, FaRegHandPaper, FaRegHandScissors
} from 'react-icons/fa';
import { IconType } from "react-icons/lib";

// Anime.js
import anime from "animejs";

const App = () => {
  // User variables
  const [userSelection, setUserSelection] = useState<RPSElement>(rock);
  const [userDisplay, setUserDisplay] = useState<ReactElement<IconType>>(<FaHandRock className="rps-animation-element rps-element-user" />)

  // Computer variables
  const [computerSelection, setComputerSelection] = useState<RPSElement>(paper);
  const [computerDisplay, setComputerDisplay] = useState<ReactElement<IconType>>(<FaHandRock className="rps-animation-element rps-element-computer" />)
  // Winner variables
  const [winner, setWinner] = useState<boolean | undefined>(undefined);
  const [winnerText, setWinnerText] = useState(`You haven't played yet...`);

  // Game elements
  const gameElements = document.getElementsByClassName('rps-element');

  // Set RPS Element as active (orange)
  function setRPSElement(gameElement: RPSElement, gameElementName: string) {
    const gameElementHTML = document.getElementById(`rps-element-${gameElementName}`) as HTMLLIElement;
    setUserSelection(gameElement);
    resetRPSElement();
    gameElementHTML.classList.add('selected')
  }

  // Reset RPS Elements state
  function resetRPSElement() {
    for (let i = 0; i < 3; i++) {
      gameElements.item(i)?.classList.remove('selected')
    }
  }

  // Main function, creates a RPSGame instance and updates computer, user and winner variables.
  function playRPSGame() {
    const rpsGame = new RPSGame({ userSelection: userSelection, computerLastSelection: computerSelection });
    const results = rpsGame.game()
    setWinner(results.status);
    setWinnerText(showWinner({
      status: results.status,
      userSelection: results.userSelection,
      computerSelection: results.computerSelection
    }))
    setComputerSelection(results.computerSelection);
    setUserDisplay(displayElements(results.userSelection, true));
    setComputerDisplay(displayElements(results.computerSelection, false))
  }

  // Returns the winner text in case of Win, Lose or Tie
  function showWinner({ status, userSelection, computerSelection }: RPSResultsType) {
    if (status) return `You <b>won</b> using <u>${userSelection.name}</u> against ${computerSelection.name}.`;
    else if (status === false) return `You <b>lost</b> using ${userSelection.name} against <u>${computerSelection.name}</u>.`;
    else return `You <b>tied!</b>`
  }

  // Returns the winner text's background color based in the result
  function displayWinner(status: boolean | undefined) {
    if (status) return `bg-green-600`;
    else if (status === false) return `bg-red-600`;
    else return `bg-gray-600`
  }

  // Returns the icon that will display in place of the user and computer selections
  function displayElements(element: RPSElement, isComputer: boolean) {
    const elementClass = `rps-animation-element ${isComputer ? 'rps-element-user' : 'rps-element-computer'}`;
    if (element.name === 'rock') return <FaHandRock className={elementClass} />
    else if (element.name === 'paper') return <FaHandPaper className={elementClass} />
    else return <FaHandScissors className={elementClass} />
  }

  useEffect(() => {
    const winnerTextParagraph = document.getElementById('winner-text') as HTMLParagraphElement;
    winnerTextParagraph.innerHTML = winnerText
  }, [winnerText])

  useEffect(() => {
    const userDisplayIcon = document.getElementsByClassName('rps-element-user');
    const computerDisplayIcon = document.getElementsByClassName('rps-element-computer');
    anime({
      targets: userDisplayIcon,
      translateX: ['10px', '0px', '10px', '0px'],
      duration: 900
    });
    anime({
      targets: computerDisplayIcon,
      translateX: ['10px', '0px', '10px', '0px'],
      duration: 900
    });
  }, [winner])

  return (
    <main 
      className="bg-gray-800 text-white w-full h-screen flex flex-col justify-center items-center"
    >
      <section id="rps-title-section" className="text-center">
        <h1 className="text-3xl font-bold">GON</h1>
        <h2 className="text-gray-300">A rock, paper, scissors mini-game</h2>
      </section>
      <section id="rps-animation-section" className="flex m-4">
        <div style={{transform: 'scaleX(-1)'}}>
          { userDisplay }
        </div>
        { computerDisplay }
      </section>
      <section id="rps-element-section" className="text-center">
        <ul id="rps-element-container" className="flex p-2">
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
        <h3 className="text-sm mb-3 text-gray-400">Tip: select an option!</h3>
        <button
          className="py-2 px-3 w-6/12 border rounded-2xl transition duration-150 bg-green-700 hover:bg-green-800 hover:scale-105"
          onClick={() => { playRPSGame() }}
        >
          Play!
        </button>
      </section>
      <section id="rps-text-section" className={`text-center m-4 rounded-md ${displayWinner(winner)}`}>
        <p id="winner-text" className="sm:text-lg lg:text-xl p-4">
        </p>
      </section>
      <footer>
        <p className="opacity-50">
          Made with
          {' '}
          <b className="text-red-600">🖤</b>
          {' '}
          by
          {' '}
          <a
            href="https://socials.ticianomorvan.me"
            target="_blank"
            rel="noreferrer"
            className="text-blue-300 underline"
          >
            Ticiano Morvan
          </a>
        </p>
      </footer>
    </main>
  )
}

export default App;
