import { RPSElement } from './RPSElement'

type RPSGameType = {
    userSelection: RPSElement;
    computerSelection: RPSElement;
}

export class RPSGame {
    userSelection: RPSElement;
    computerSelection: RPSElement;

    constructor({ userSelection, computerSelection }: RPSGameType) {
        this.userSelection = userSelection;
        this.computerSelection = computerSelection;
    }

    game() {
        let playerWinner: boolean | undefined;

        if (this.userSelection.strongAgainst == this.computerSelection.name) playerWinner = true
        else if (this.computerSelection.strongAgainst == this.userSelection.name) playerWinner = false
        else playerWinner = undefined;

        return playerWinner;
    }
}