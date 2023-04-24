function drawTriangle(size) {

   // Your solution goes here
   for(let i = 1; i <= size; i++){
      let string = '';

      for(let j = 0; j < i; j++){
         string += '*';
      }

      console.log(string);
   }
}