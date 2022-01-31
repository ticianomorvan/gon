import { RPSElement, rpsElements } from './RPSElement'
import { getRandomRPSElement } from './RPSUtils'

type RPSGameType = {
    userSelection: RPSElement;
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

    constructor({ userSelection }: RPSGameType) {
        this.userSelection = userSelection;
    }

    game() {
        let status: boolean | undefined;
        let computerSelection = getRandomRPSElement(rpsElements)

        if (this.userSelection.strongAgainst == computerSelection.name) status = true
        else if (computerSelection.strongAgainst == this.userSelection.name) status = false
        else status = undefined;

        const results = new RPSResults({
            status: status,
            userSelection: this.userSelection,
            computerSelection: computerSelection,
        });

        return results;
    }
}