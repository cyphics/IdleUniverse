export default class PhysicsComputer {

    static getRemainingTime(distanceToTravel, currentSpeed, acceleration) {
        /***
         Return time it takes to travel distance with given speed and acceleration
         d=v0t+(at^2/2)d=v0t+(at^2/2)
         =>
         t = ( -2v0 +- sqrt( pow(2v0) + 4a * 2d ) ) / 2a
         ***/
        if (distanceToTravel < 0) {
            // Throw error TODO
        }
        if (currentSpeed < 0) {
            // Throw error TODO
        }
        if (acceleration < 0) {
            // Throw error TODO
        }
        if (distanceToTravel === 0) {
            return 0
        }

        if (acceleration === 0) {
            if (currentSpeed === 0) {
                return Math.max()
            }
            return distanceToTravel / currentSpeed;
        }

        let delta = Math.sqrt(Math.pow(2 * currentSpeed, 2) + 8 * acceleration * distanceToTravel);
        let numerator_one = -2 * currentSpeed + delta;
        let numerator_two = -2 * currentSpeed - delta;
        let denominator = 2 * acceleration;

        let answer_one = numerator_one / denominator;
        let answer_two = numerator_two / denominator;

        if (answer_one > answer_two) return answer_one;
        else return answer_two;
    }

    static getTraveledDistance(initialSpeed, duration, acceleration) {
        /**
         *  Return the distance traveled at current speed, during given duration
         *   dist = init_speed * duration + 1/2 acceleration * duration^2
         */
        return initialSpeed * duration + acceleration * 0.5 * duration* duration
    }
}