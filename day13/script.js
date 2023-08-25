/**********Selection sort ***********/
function selectionSort(arr) {
    const len = arr.length;

    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;

        // Find the index of the minimum element in the unsorted part of the array
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap the found minimum element with the first element of the unsorted part
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }

    return arr;
}

// Example usage
let unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = selectionSort(unsortedArray);

console.log("Select Sorted array:", sortedArray);








/**************************Bubble sort *********/
function bubbleSort(arr) {
    const len = arr.length;

    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j + 1]
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}

// Example usage
const sortedbubble = bubbleSort(unsortedArray);

console.log("bubble Sorted array:", sortedbubble);



/*******************insertion Sort */
function insertionSort(arr) {
    const len = arr.length;

    for (let i = 1; i < len; i++) {
        let currentElement = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > currentElement) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = currentElement;
    }

    return arr;
}

// Example usage

const sortedInsertion = insertionSort(unsortedArray);

console.log("Insertion Sorted array:",sortedInsertion);


/**********************Linear search **********/
function linearSearch(arr, target) {
    const len = arr.length;

    for (let i = 0; i < len; i++) {
        if (arr[i] === target) {
            return i; // Return the index where the target is found
        }
    }

    return -1; // Return -1 if the target is not found
}

// Example usage

const targetElement = 25;
const foundIndex = linearSearch(unsortedArray, targetElement);

if (foundIndex !== -1) {
    console.log(`Target element ${targetElement} found at index ${foundIndex}.`);
} else {
    console.log(`Target element ${targetElement} not found in the array.`);
}


/**********************Matrix */
// Creating a 3x3 matrix
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Accessing individual elements in the matrix
console.log(matrix[0][0]); // Output: 1
console.log(matrix[1][2]); // Output: 6

// Looping through the matrix
for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
        console.log(matrix[i][j]);
    }
}

// Modifying elements in the matrix
matrix[1][1] = 10; // Changing the value at row 1, column 1 to 10
console.log(matrix);

// Adding a new row to the matrix
matrix.push([11, 12, 13]);
console.log(matrix);

// Deleting a row from the matrix
matrix.pop(); // Removes the last row
console.log(matrix);


