import { distanceNumber, driveNumber } from "../global/number.js";
import { Random, Console } from "@woowacourse/mission-utils";

class RacingGame {
  constructor(cars, tryCount) {
    this.cars = cars;
    this.tryCount = tryCount;
  }

  generateRandomNum() {
    let distance = Random.pickNumberInRange(
      distanceNumber.MIN_DISTANCE_LENGTH,
      distanceNumber.MAX_DISTANCE_LENGTH
    );
    return distance;
  }

  addDistance(cars, accumulateDistance) {
    for (let car = 0; car < this.cars.length; car++) {
      let distance = this.generateRandomNum();
      accumulateDistance[car] +=
        distance >= driveNumber.MIN_DRIVE_LENGTH ? "-" : "";
      Console.print(`${this.cars[car]} : ${accumulateDistance[car]}`);
    }
    return accumulateDistance;
  }

  chooseWinner(cars, accumulateDistance, maxDistance) {
    let winner = [];
    for (let i = 0; i < cars.length; i++) {
      if (accumulateDistance[i].length === maxDistance) winner.push(cars[i]);
    }
    return winner;
  }

  racing() {
    let accumulateDistance = Array(this.cars.length).fill("");
    for (let i = 0; i < this.tryCount; i++) {
      accumulateDistance = this.addDistance(this.cars, accumulateDistance);
      Console.print("");
    }
    const maxDistance =
      accumulateDistance.length > 0
        ? Math.max(...accumulateDistance.map((str) => str.length))
        : 0;
    let winner = this.chooseWinner(this.cars, accumulateDistance, maxDistance);
    return winner;
  }
}

export default RacingGame;
