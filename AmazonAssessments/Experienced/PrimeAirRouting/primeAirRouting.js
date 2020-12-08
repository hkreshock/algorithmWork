// write an algorithm to optimize the sets of forward/return shipping pairs that allow the aircraft to be
// optimally utilized, given a list of forward shipping routes and a list of return shipping routes.

// THE INPUT
     // maxTravelDist => an integer representing the maximum operating travel disatnce of the given aircraft.
     // forwardRouteList => a list of pairs of integers where the first integer represents the unique identifier
         // of a shipping route and the second integer represents the amount of travel distance 
         // required by this shipping route.
     // returnRouteList => a list of pairs of integers where the first integer represents the unique identifier
         // of a shipping route and the second integer represents the amount of travel distance 
         // required by this shipping route.

// THE OUTPUT
    // Return a list of pairs of integers representing the pairs of IDs of forward and return shipping routes
    // that optimally utilize the given aircraft. If no route is possible, return a list with empty pair.

// Example
    // Input:
        // maxTravelDist = 7000
        // forwardRouteList = [ [ 1, 2000 ], [ 2, 4000 ], [ 3, 6000 ] ]
        // returnRouteList = [ [ 1, 2000 ] ]
    // Output:
        // [ [ 2, 1 ] ]
    // Explanation:
        // There are only three combinations, [ 1, 1 ], [ 2, 1 ], and [ 3, 1 ], which have a total of 4000, 6000,
        // and 8000 miles. Since 6000 is the largest use that does not exceed 7000, [ 2, 1 ] is the only optimal pair.

function optimizeShippingPairs (maxTravelDist, forwardRouteList, returnRouteList) {
    // define variables
    let optimalPair = [];

    const uniqueIdentifier = 0;
    const uniqueDist = 1;

    let currentDistance = 0;
    const potentialPairs = [];
    
    // sort both lists by distance but retain unique identifier
    forwardRouteList.sort((pair1, pair2) => pair1[uniqueDist] > pair2[uniqueDist] ? 1 : -1);
    returnRouteList.sort((pair1, pair2) => pair1[uniqueDist] > pair2[uniqueDist] ? 1 : -1);

    // if either list only has one array item, adjust pair and distance accordingly
    if (forwardRouteList.length === 1) {
        optimalPair.push(forwardRouteList[0][uniqueIdentifier], 'NaN');
        currentDistance += forwardRouteList[0][1];
    }
    if (returnRouteList.length === 1) {
        if (optimalPair[1] === 'NaN') {
            const distanceLeft = maxTravelDist - currentDistance;
            if (distanceLeft - returnRouteList[0][uniqueDist] > 0) {
                optimalPair[1] = returnRouteList[0][uniqueIdentifier];
            } else {
                optimalPair = [];   // if only pair available exceeds maxTravelDist, set optimal pair to []
            }
        } else {
            optimalPair.push('NaN', returnRouteList[0][uniqueIdentifier]);
        }
        currentDistance += returnRouteList[0][uniqueDist];
    }

    // go over rest of arrays if they're longer than 1 index
    if (forwardRouteList.length > 1) {
        // if the return list only had one item, find best pair for it
        if (optimalPair[0] === 'NaN') {
            let bestIndex;
            const distanceLeft = maxTravelDist - currentDistance;
            forwardRouteList.forEach((pair, index) => {
                if (distanceLeft - pair[uniqueDist] > 0) {
                    bestIndex = index;
                }
            });
            if (bestIndex) {
                optimalPair[0] = forwardRouteList[bestIndex][uniqueIdentifier];
            } else {
                optimalPair = [];   // if no pair available, set optimal pair to []
            }
        } else {
            // JSON parse to keep returnRouteList unaffected by sort
            const highToLow = JSON.parse(JSON.stringify(returnRouteList.sort((pair1, pair2) => pair1[uniqueDist] < pair2[uniqueDist] ? 1 : -1)));
            forwardRouteList.forEach(forwardPair => {
                for (let index = 0; index < highToLow.length; index++) {
                    const returnPair = highToLow[index];
                    if (forwardPair[uniqueDist] + returnPair[uniqueDist] < maxTravelDist) {
                        potentialPairs.push({
                            forwardIndex: forwardPair[uniqueIdentifier],
                            returnIndex: returnPair[uniqueIdentifier],
                            totalDistance: forwardPair[uniqueDist] + returnPair[uniqueDist]
                        });
                    }
                }
            });
        }
    }
    if (returnRouteList.length > 1) {
        // if the forward list only had one item, find best pair for it
        if (optimalPair[1] === 'NaN') {
            let bestIndex;
            const distanceLeft = maxTravelDist - currentDistance;
            returnRouteList.forEach((pair, index) => {
                if (distanceLeft - pair[uniqueDist] > 0) {
                    bestIndex = index;
                }
            });
            if (bestIndex) {
                optimalPair[0] = returnRouteList[bestIndex][uniqueIdentifier];
            } else {
                optimalPair = [];   // if no pair available, set optimal pair to []
            }
        } else {
            // JSON parse to keep forwardRouteList unaffected by sort
            const highToLow = JSON.parse(JSON.stringify(forwardRouteList.sort((pair1, pair2) => pair1[uniqueDist] < pair2[uniqueDist] ? 1 : -1)));
            returnRouteList.forEach(returnPair => {
                for (let index = 0; index < highToLow.length; index++) {
                    const forwardPair = highToLow[index];
                    if (returnPair[uniqueDist] + forwardPair[uniqueDist] < maxTravelDist) {
                        potentialPairs.push({
                            forwardIndex: forwardPair[uniqueIdentifier],
                            returnIndex: returnPair[uniqueIdentifier],
                            totalDistance: returnPair[uniqueDist] + forwardPair[uniqueDist]
                        });
                    }
                }
            });
        }
    }
    if (potentialPairs.length > 0) {
        potentialPairs.sort((object1, object2) => object1.totalDistance < object2.totalDistance ? 1 : -1);
        optimalPair = [ potentialPairs[0].forwardIndex, potentialPairs[0].returnIndex ];
    }

    // return optimal pair
    return optimalPair;
}

// TEST CASES

// basic test
console.log(optimizeShippingPairs(
    7000,
    [ [ 1, 2000 ], [ 2, 4000 ], [ 3, 6000 ] ],
    [ [ 1, 2000 ] ]
));
// Expect [ 2, 1 ]

// testing if order matters + basic
console.log(optimizeShippingPairs(
    7000,
    [ [ 1, 2000 ] ],
    [ [ 1, 6000 ], [ 2, 2000 ], [ 3, 4000 ] ]
));
// Expect [ 1, 3 ]

// testing optimal runtime with 1 pair each
console.log(optimizeShippingPairs(
    7000,
    [ [ 1, 2000 ] ],
    [ [ 1, 2000 ] ]
));
// Expect [ 1, 1 ]

// testing 1 pair each but exceeds max travel distance
console.log(optimizeShippingPairs(
    7000,
    [ [ 1, 6000 ] ],
    [ [ 1, 2000 ] ]
));
// Expect []

// multiple in both lists
console.log(optimizeShippingPairs(
    11000,
    [ [ 1, 2000 ], [ 2, 4000 ], [ 3, 10000 ] ],
    [ [ 1, 2000 ], [ 2, 4000 ], [ 3, 6000 ] ]
));
// Expect [ 2, 3 ]

// multiple in both lists but reversing lists from prior test ^^
console.log(optimizeShippingPairs(
    11000,
    [ [ 1, 2000 ], [ 2, 4000 ], [ 3, 6000 ] ],
    [ [ 1, 2000 ], [ 2, 4000 ], [ 3, 10000 ] ]
));
// Expect [ 3, 2 ]

// RUNTIME
    // At best can have runtime of O(1) at worst a runtime of O(n^2). O(1) comes if there is only one array per 
    // forwardRouteList and returnRouteList. O(n^2) occurs if both the forwardRouteList and returnRouteList have
    // multiple arrays within them, forcing the funciton for run a for loop inside a forEach loop twice.