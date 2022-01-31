export type RPSElementType = {
    name: string;
    strongAgainst: string;
}

export class RPSElement {
    name: string;
    strongAgainst: string;

    constructor({ name, strongAgainst }: RPSElementType) {
        this.name = name;
        this.strongAgainst = strongAgainst;
    }
}

// Elements
const [rpsRock, rpsPaper, rpsScissors] = ['rock', 'paper', 'scissors']

export const rock = new RPSElement({ 'name': rpsRock, strongAgainst: rpsScissors});
export const paper = new RPSElement({ 'name': rpsPaper, 'strongAgainst': rpsRock});
export const scissors = new RPSElement({ 'name': rpsScissors, 'strongAgainst': rpsPaper});

export const rpsElements = [
  rock, paper, scissors
]