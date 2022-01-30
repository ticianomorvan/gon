import { RPSElement } from "./RPSElement";

export function getRandomRPSElement(rpsElementList: RPSElement[]) {
    return rpsElementList[Math.floor(Math.random() * rpsElementList.length)];
}