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
  streetNames: ["A", "B", "C"],
};

// Initialize queue for each street
const queue = {};
for (const streetName of config.streetNames) {
  queue[streetName] = [];
}

// Function to add car to street queue
function addCar(streetIndex) {
  queue[config.streetNames[streetIndex]].push(Date.now());
}

// Function to determine which street should have the green light
function getNextGreenStreet() {
  let maxWaitTime = 0;
  let nextGreenStreet = null;

  // Loop through all streets
  for (const streetName of config.streetNames) {
    const streetQueue = queue[streetName];
    const waitTime = Date.now() - streetQueue[0];

    // Rule 2: If a street has waited too long, it should receive green
    if (waitTime >= config.maxWaitForGreenInMilliSeconds) {
      return streetName;
    }

    // Rule 3: If a street has enough cars waiting, it should receive green
    if (streetQueue.length >= config.carsForGreen) {
      return streetName;
    }

    // Keep track of the street that has waited the longest and has cars queued
    if (streetQueue.length > 0 && waitTime > maxWaitTime) {
      maxWaitTime = waitTime;
      nextGreenStreet = streetName;
    }
  }

  // Rule 4: If all streets have no cars queued, return null
  if (maxWaitTime === 0 && nextGreenStreet === null) {
    return null;
  }

  // Otherwise, return the street with the longest wait time
  return nextGreenStreet;
}

// Function to switch the traffic light to a new street
function switchGreenLight() {
  const currentGreenStreet = getNextGreenStreet();

  // If there is no street that should have the green light, do nothing
  if (currentGreenStreet === null) {
    console.log("No green light at the moment");
    return;
  }

  console.log(`Green light is now on street ${currentGreenStreet}`);

  // Remove cars from the queue for the current green street
  const streetQueue = queue[currentGreenStreet];
  const numCarsToPass = Math.min(
    streetQueue.length,
    config.numberOfCarsPassThroughIntersectionPerSecond
  );
  streetQueue.splice(0, numCarsToPass);

  // Call this function again after a minimum green duration
  setTimeout(switchGreenLight, config.minGreenDurationInMilliSeconds);
}

// Start the simulation
switchGreenLight();

// Add some cars to the queues for testing purposes
addCar(0);
addCar(0);
addCar(1);
