// Put your solution here
function divideArray(numbers) {
    let evenNums = [];
    let oddNums = [];
  
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] % 2 === 0) {
        evenNums.push(numbers[i]);
      } else {
        oddNums.push(numbers[i]);
      }
    }
  
    if (evenNums.length === 0) {
      console.log("Even numbers:\nNone");
    } else {
      evenNums.sort(function(a, b) {
        return a - b;
      });
      console.log("Even numbers:");
      console.log(evenNums.join("\n"));
    }
  
    if (oddNums.length === 0) {
      console.log("Odd numbers:\nNone");
    } else {
      oddNums.sort(function(a, b) {
        return a - b;
      });
      console.log("Odd numbers:");
      console.log(oddNums.join("\n"));
    }
}