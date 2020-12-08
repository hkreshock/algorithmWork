// Amazon Fresh is running a promotion in which customers receive prizes for purchasing a secret combination of fruits.
// The combination will change each day, and the team running the promotion wants to use a code list to make it easy
// to change the combination. The code list contains groups of fruits. Both the order of the groups within the code
// list and the order of the fruits within the groups matter. However, between the groups of fruits, any number, and
// type of fruit is allowable. The term "anything" is used to allow for any type of fruit to appear in that location
// within the group.

// Consider the following secret code list: [[apple, apple], [banana, anything, banana]]
// Based on the above secret code list, a customer who made either of the following purchases would win the prize:
// orange, apple, apple, banana, orange, banana
// apple, apple, orange, orange, banana, apple, banana, banana

// Write an algorithm to output 1 if the customer is a winner else output 0.

// THE INPUT
    // codeList => a list of lists of strings representing the order and grouping of specific fruits that must
        // be purchased in order to win the prize for the day
    // shoppingCart => a list of strings representing the order in which a customer purchases fruit

// THE OUTPUT
    // Return an integer 1 if the customer is a winner else return 0

// NOTES
    // 'anything' in the codeList represents that any fruit can be ordered in place of 'anything' in the group.
        // 'anything' has to be something, it cannot be "nothing."
    // 'anything' must represent one and only one fruit.
    // If secret code list is empty then it is assumed that the customer is a winner.

// Example
    // Input:
        // codeList = [ [ apple, apple ], [ banana, anything, banana ] ]
        // shoppingCart = [ banana, orange, banana, apple, apple ]
    // Output:
        // 0
    // Explanation:
        // codeList contains two groups - [apple, apple] and [banana, anything, banana]. The second group contains
        // 'anything' so any fruit can be ordered in place of 'anything' in the shoppingCart. The customer is a
        // winner as the customer has added fruits in the order of fruits in the groups and the order of groups in
        // the codeList is also maintained in the shoppingCart

function findTheWinner (codeList, shoppingCart) {
}

// TEST CASES

console.log(findTheWinner(
    [ [ 'apple', 'apple' ], [ 'banana', 'anything', 'banana' ] ],
    [ 'orange', 'apple', 'apple', 'banana', 'orange', 'banana' ]
));
// Expect 1

console.log(findTheWinner(
    [ [ 'apple', 'apple' ], [ 'banana', 'anything', 'banana' ] ],
    [ 'banana', 'orange', 'banana', 'apple', 'apple' ]
));
// Expect 0

console.log(findTheWinner(
    [ [ 'apple', 'apple' ], [ 'banana', 'anything', 'banana' ] ],
    [ 'apple', 'banana', 'apple', 'banana', 'orange', 'banana' ]
));
// Expect 0

console.log(findTheWinner(
    [ [ 'apple', 'apple' ], [ 'apple', 'apple', 'banana' ] ],
    [ 'apple', 'apple', 'apple', 'banana' ]
));
// Expect 0

console.log(findTheWinner(
    [ [ 'apple', 'apple' ], [ 'banana', 'anything', 'banana' ] ],
    [ 'orange', 'apple', 'apple', 'banana', 'orange', 'banana' ]
));
// Expect 1

console.log(findTheWinner(
    [ [ 'apple', 'apple' ], [ 'banana', 'anything', 'banana' ] ],
    [ 'apple', 'apple', 'orange', 'orange', 'banana', 'apple', 'banana', 'banana' ]
));
// Expect 1

console.log(findTheWinner(
    [ [ 'apple', 'orange' ], [ 'orange', 'banana', 'orange' ] ],
    [ 'apple', 'orange', 'banana', 'orange', 'orange', 'banana', 'orange', 'grape' ]
));
// Expect 1

console.log(findTheWinner(
    [ [ 'anything', 'anything', 'anything', 'apple' ], [ 'banana', 'anything', 'banana' ] ],
    [ 'orange', 'apple', 'banana', 'orange', 'apple', 'orange', 'orange', 'banana', 'apple', 'banana' ]
));
// Expect 1

console.log(findTheWinner(
    [ [ 'anything', 'apple' ], [ 'banana', 'anything', 'banana' ] ],
    [ 'orange', 'grapes', 'apple', 'orange', 'orange', 'banana', 'apple', 'banana', 'banana' ]
));
// Expect 1

// RUNTIME
    // 