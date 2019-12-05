import { Distance } from './Distance';
import { Time } from './time';

export default class PhysicsComputer {
  static getRemainingTime(distanceToTravel, currentSpeed, currentAcceleration) {
    /** *
         Return Time() object === time it takes to travel distance with given speed and acceleration
         d=v0t+(at^2/2)d=v0t+(at^2/2)
         =>
         t = ( -2v0 +- sqrt( pow(2v0) + 4a * 2d ) ) / 2a
         ** */
    const distance = distanceToTravel.value();
    const speed = currentSpeed.value();
    const acceleration = currentAcceleration.value();

    if (distance < 0) {
      // Throw error TODO
    }
    if (speed < 0) {
      // Throw error TODO
    }
    if (acceleration < 0) {
      // Throw error TODO
    }
    if (distance === 0) {
      return new Time();
    }

    if (acceleration === 0) {
      if (speed === 0) {
        return Math.max();
      }
      return new Time(distance / speed);
    }

    const delta = Math.sqrt(Math.pow(2 * speed, 2) + 8 * acceleration * distance);
    const numerator_one = -2 * speed + delta;
    const numerator_two = -2 * speed - delta;
    const denominator = 2 * acceleration;

    const answer_one = numerator_one / denominator;
    const answer_two = numerator_two / denominator;

    if (answer_one > answer_two) return new Time(answer_one);
    return new Time(answer_two);
  }

  static getTraveledDistance(initialSpeed, duration, acceleration) {
    /**
         *  Return the distance traveled at current speed, during given duration
         *   dist = init_speed * duration + 1/2 acceleration * duration^2
         */
    const speed = initialSpeed.value();
    const time = duration.value();
    const acc = acceleration.value();
    return new Distance(speed * time + acc * 0.5 * time * time);
  }
}
