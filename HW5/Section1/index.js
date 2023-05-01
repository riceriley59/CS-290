// Riley Rice 5/1/2023
// Course: CS290 Section#: 001

//This splits the string at the spaces and adds each element in the split
//into a new array. This allows us to parse the data we need from the string
function parseScores(scoresString) {
   return scoresString.split(" ");
}

//This function counts the amount of letter grades so we can see the 
//distribution of the grades
function buildDistributionArray(scoresArray) {
   //create array which will keep track of number of grades
   let gradeDistribution = [0, 0, 0, 0, 0];

   //loop through all the scores
   for (let i = 0; i < scoresArray.length; i++) {
      //get the score and turn that into an integer
      let score = parseInt(scoresArray[i]);
      
      //depending on the score add one to the corresponding grade
      if (score >= 90) {
         gradeDistribution[0]++;
      } else if (score >= 80) {
         gradeDistribution[1]++;
      } else if (score >= 70) {
         gradeDistribution[2]++;
      } else if (score >= 60) {
         gradeDistribution[3]++;
      } else {
         gradeDistribution[4]++;
      }
   }

   //return the array that has the distribution of grades
   return gradeDistribution;
}

function setTableContent(userInput) {
   //parse the data
   const scoresArray = parseScores(userInput);
   
   //get the distribution of grades from the parsed data
   const distributionArray = buildDistributionArray(scoresArray);
   
   //get the row elements from the DOM that show the amount and bars
   //as these are what we need to change
   const firstRow = document.getElementById("firstRow");
   const thirdRow = document.getElementById("thirdRow");
   
   //create strings for the html we will use
   let firstRowHTML = "";
   let thirdRowHTML = "";
 
   //loop through each grade in the grade distribution array
   for (let i = 0; i < distributionArray.length; i++) {
      //get the amount of grades
      const gradeCount = distributionArray[i];
      
      //get a pixel amount for the amount of grades by multiplying the 
      //amount of grades by 10. This will make it so the bar will rise 
      //by 10px for every grade.
      const barHeight = gradeCount * 10;

      //append to the string the html to have the correct height and class so it
      //has the right color. Then also change the grade count to the correct amount
      firstRowHTML += `<td><div style="height:${barHeight}px" class="bar${i}"></div></td>`;
      thirdRowHTML += `<td>${gradeCount}</td>`;
   }
   
   //change the innerhtml of the two elements to the strings that we created
   firstRow.innerHTML = firstRowHTML;
   thirdRow.innerHTML = thirdRowHTML;
}

// The argument can be changed for testing purposes
setTableContent("45 78 98 83 86 99 90 59");