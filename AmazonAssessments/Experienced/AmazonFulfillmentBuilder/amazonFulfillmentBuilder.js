// Given n ropes of different lengths, we need to connect these ropes into one rope. We can connect only 2 ropes
// at a time. The cost required to connect 2 ropes is equal to sum of their lengths. The length of this connected
// rope is also equal to the sum of their lengths. This process is repeated until n ropes are connected into a
// single rope. Find the min possible cost required to connect all ropes.

// THE INPUT
     // Array of ropes's legnths

// THE OUTPUT
    // Number that represents minimum cost to combine all the ropes

// Example
    // Input:
        // [ 8, 4, 6, 12 ]
    // Output:
        // 58
    // Explanation:
        // 1. Connect the ropes of length 4 and 6 (cost is 10). Ropes after connecting: [ 8, 10, 12 ]
        // 2. Connect the ropes of length 8 and 10 (cost is 18). Ropes after connecting: [ 18, 12 ]
        // 3. Connect the ropes of length 18 and 12 (cost is 30)
        // Total cost to connect the ropes is 10 + 18 + 30 = 58

function minimumCost (ropeLengthArray) {
    // set a counter
    let count = ropeLengthArray.length;
    // sort array to have numbers smallest to largest
    let currentArray = ropeLengthArray.sort((a, b) => a - b);
    let currentCost = 0;

    while (count > 1) {
        const newNumber = currentArray[0] + currentArray[1];
        currentArray = currentArray.slice(2, currentArray.length);
        currentArray.push(newNumber);
        // sort array to have numbers smallest to largest
        currentArray = currentArray.sort((a, b) => a - b);
        count --;
        currentCost += newNumber;
    }
    return currentCost;
}

// TEST CASES

console.log(minimumCost([ 8, 4, 6, 12 ]));
// Expect 58

console.log(minimumCost([ 20, 4, 8, 2 ]));
// Expect 54

console.log(minimumCost([ 1, 2, 5, 10, 35, 89 ]));
// Expect 224

console.log(minimumCost([ 2, 2, 3, 3 ]));
// Expect 20

// RUNTIME
    // The time complexity would be O(log n) because the run time is dependent on the logarithm of the count