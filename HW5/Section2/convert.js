//Riley Rice 5/1/2023
//Course: CS290 Section#: 01

//event listener to only start allowing the user to convert
//once all the DOM elements are loaded.
window.addEventListener("DOMContentLoaded", domLoaded);

//This is the function that will handle all the conversions and inputs
//along with error messages
function domLoaded() {
   //get the two input boxes so we can add event handlers to them
   const cInput = document.getElementById("cInput");
   const fInput = document.getElementById("fInput");

   //get all the other elements that we need to adjust
   const convertButton = document.getElementById("convertButton");
   const errorMessage = document.getElementById("errorMessage");
   const weatherImage = document.getElementById("weatherImage");
   
   //add the event listeners to each text box so that
   //the clearOppositeInpout function is called everytime
   //something is inputted. This function will clear the opposite
   //text field
   cInput.addEventListener("input", clearOppositeInput);
   fInput.addEventListener("input", clearOppositeInput);
   
   //add a click event handler to the convert button
   //this will handle converting and displaying the conversions
   convertButton.addEventListener("click", () => {
      //get the celcius or farenheight inputted and 
      //convert it from a string to a float
      let celsius = parseFloat(cInput.value);
      let fahrenheit = parseFloat(fInput.value);
      
      //if they want to convert from fahrenheit to celcius
      if (!isNaN(celsius) && isNaN(fahrenheit)) {
         //get fahrenheit value and put it into the opposite boxes
         //value field
         let converted = convertCtoF(celsius);
         fInput.value = converted;

         //check to see what picture should be displayed based on the inputted
         //temperature.
         if (converted <= 32) {
            weatherImage.src = "cold.png";
            weatherImage.alt = "Cold";
         } else if (converted > 32 && converted <= 50) {
            weatherImage.src = "cool.png";
            weatherImage.alt = "Cool";
         } else {
            weatherImage.src = "warm.png";
            weatherImage.alt = "Warm";
         }

         errorMessage.innerHTML = "";
      }
      //if they want to convert from celcius to farenheit
      else if (isNaN(celsius) && !isNaN(fahrenheit)) {
         //get fahrenheit value and put it into the opposite boxes
         //value field
         cInput.value = convertFtoC(fahrenheit);

         //check to see what picture should be displayed based on the inputted
         //temperature.
         if (fahrenheit <= 32) {
            weatherImage.src = "cold.png";
            weatherImage.alt = "Cold";
         } else if (fahrenheit > 32 && fahrenheit <= 50) {
            weatherImage.src = "cool.png";
            weatherImage.alt = "Cool";
         } else {
            weatherImage.src = "warm.png";
            weatherImage.alt = "Warm";
         }
            
            errorMessage.innerHTML = "";
         }

      //if they didn't input a number
      else {
         //show that what they inputted isn't a value
         errorMessage.innerHTML = cInput.value !== "" ? cInput.value + " is not a number" : fInput.value + " is not a number";
      }
   });
}

//converts from celcuis to fahrenheit
function convertCtoF(celsius) {
   return (celsius * 9/5) + 32;
}

//converts from fahrenheit to celcius
function convertFtoC(fahrenheit) {
   return (fahrenheit - 32) * 5/9;
}

//This will clear the opposite box by checking to see 
//what box was being typed into and then clearing the other
//this is dont using the event's target attribute.
function clearOppositeInput(event) {
   if (event.target === cInput && fInput.value !== "") {
      fInput.value = "";
   }
   else if (event.target === fInput && cInput.value !== "") {
      cInput.value = "";
   }
}