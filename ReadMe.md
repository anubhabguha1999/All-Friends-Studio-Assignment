<h1>Write a simple traffic light simulation using JavaScript and the 'config' variable below.</h1>

<h2>The traffic light controls an intersection with multiple streets, see 'config.streetNames'. Only one street is given green light at any given time. This street lets 'config.numberOfCarsPassThroughIntersectionPerSecond' cars pass through the intersection.

For the switching green, these rules apply in declining priority:

1. Rule: Each green phase has to be at least 'config.minGreenDurationInMilliSeconds' long, unless there are no cars going through the green light.

2. Rule: When a street has waited config.maxWaitForGreenInMilliSeconds' or longer it should receive green.

3. Rule: When a street has 'config.carsForGreen' or more cars waiting it should receive green.

4. Rule: When all cars have passed through green, the street that has waited the longest and has cars queued should receive green.

A function 'addCar(streetIndex)' is used to queue cars at the intersection. The function is called from somewhere else outside this scope. You can assume no thread related issues.</h2>


const config = {
  // A green phase must be at least this long
  minGreenDurationInMilliSeconds: 10000,
  // Every second this many cars go through the green light
  numberOfCarsPassThroughIntersectionPerSecond: 1,
  // If a street waited this long or longer, it should receive green
  maxWaitForGreenInMilliSeconds: 30000,
  // Number of cars that will give a street priority for the next green
  carsForGreen: 3,
  // The streets for this intersection:
  streetNames: ['A', 'B', 'C'],
}
