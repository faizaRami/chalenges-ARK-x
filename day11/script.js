//task1
let myAge = 24
let isStudent = true
let myFavoriteColors = ["yellow", "white", "Red"]

//task2
let myName = "Faiza" + 'RAMI'
//task3
let Name = `My name is : ${myName}, myAge is : ${myAge} and
 ${isStudent ? ' i am student' : 'i am not student'}` 

//task5
let myFavoriteAnimal = 'Lion'
let myFavoriteColor = 'yellow'
let yourFavoriteAnimal = prompt("What is your favorite animal :")
let yourFavoriteColor =  prompt("What is your favorite color :")
let Animal= `${myFavoriteAnimal == yourFavoriteAnimal
              && myFavoriteColor == yourFavoriteColor
             ? 'it matches' : 'it is unmatched'}`
console.log(Animal)

//task6
let yourNumber = prompt("Enter a number :")
let Number = `${yourNumber > 0 ? 'Your number is positive' 
      : yourNumber < 0 ? 'Your number is negative' : yourNumber === 0 
        ? 'your number is zero' : null}`
console.log(Number)

//task8
let yourValue =  prompt("Enter your value :")
let Value = `${yourValue ? true : false}`
console.log(Value)