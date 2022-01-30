export type RPSElementType = {
    name: string;
    strongAgainst: string;
    weakAgainst: string;
}

export class RPSElement {
    name: string;
    strongAgainst: string;
    weakAgainst: string;

    constructor({ name, strongAgainst, weakAgainst }: RPSElementType) {
        this.name = name;
        this.strongAgainst = strongAgainst;
        this.weakAgainst = weakAgainst;
    }
}

// Elements
const [rpsRock, rpsPaper, rpsScissors] = ['rock', 'paper', 'scissors']

export const rock = new RPSElement({ 'name': rpsRock, strongAgainst: rpsScissors, weakAgainst: rpsPaper});
export const paper = new RPSElement({ 'name': rpsPaper, 'strongAgainst': rpsRock, weakAgainst: rpsScissors});
export const scissors = new RPSElement({ 'name': rpsScissors, 'strongAgainst': rpsPaper, 'weakAgainst': rpsRock});

export const rpsElements = [
  rock, paper, scissors
]