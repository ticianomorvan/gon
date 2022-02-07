import { RPSElement, rpsElements } from './RPSElement'
import { getRandomRPSElement } from './RPSUtils'

type RPSGameType = {
    userSelection: RPSElement;
    computerLastSelection: RPSElement;
}

export type RPSResultsType = {
    status: boolean | undefined;
    userSelection: RPSElement;
    computerSelection: RPSElement;
}

export class RPSResults {
    status: boolean | undefined;
    userSelection: RPSElement;
    computerSelection: RPSElement;

    constructor({ status, userSelection, computerSelection }: RPSResultsType) {
        this.status = status;
        this.userSelection = userSelection;
        this.computerSelection = computerSelection;
    }

    show() {
        return {
            status: this.status,
            userSelection: this.userSelection,
            computerSelection: this.computerSelection,
        }
    }
}

export class RPSGame {
    userSelection: RPSElement;
    computerLastSelection: RPSElement;

    constructor({ userSelection, computerLastSelection }: RPSGameType) {
        this.userSelection = userSelection;
        this.computerLastSelection = computerLastSelection;
    }

    setComputerNewSelection() {
        let computerSelection = getRandomRPSElement(rpsElements);
        if (computerSelection === this.computerLastSelection) {
            computerSelection = this.setComputerNewSelection()
        }

        return computerSelection;
    }

    game() {
        let status: boolean | undefined;
        let computerNewSelection = this.setComputerNewSelection()

        if (this.userSelection.strongAgainst == computerNewSelection.name) status = true
        else if (computerNewSelection.strongAgainst == this.userSelection.name) status = false
        else status = undefined;

        const results = new RPSResults({
            status: status,
            userSelection: this.userSelection,
            computerSelection: computerNewSelection,
        });

        return results;
    }
}